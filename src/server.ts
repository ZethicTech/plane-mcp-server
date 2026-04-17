import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { PlaneClient } from './plane-client.js';
import { ToolDef, executeToolDef, getToolAnnotations } from './tools/registry.js';

// Import core tool definitions
import { projectCoreTools, projectAdminTools } from './tools/projects.js';
import { workItemTools } from './tools/work-items.js';
import { stateTools } from './tools/states.js';
import { labelTools } from './tools/labels.js';
import { cycleCoreTools, cycleArchiveTools } from './tools/cycles.js';
import { moduleCoreTools, moduleArchiveTools } from './tools/modules.js';
import { epicTools } from './tools/epics.js';
import { milestoneTools } from './tools/milestones.js';
import { initiativeTools } from './tools/initiatives.js';
import { intakeTools } from './tools/intake.js';
import { pageTools } from './tools/pages.js';
import { workspaceCoreTools, workspaceAdminTools } from './tools/workspace.js';
import { workItemCommentTools } from './tools/work-item-comments.js';
import { workItemLinkTools } from './tools/work-item-links.js';
import { workItemRelationTools } from './tools/work-item-relations.js';
import {
  workItemActivityCoreTools,
  workItemActivityExtendedTools,
} from './tools/work-item-activities.js';
import { workItemPropertyTools } from './tools/work-item-properties.js';
import { workItemTypeTools } from './tools/work-item-types.js';
import { workLogTools } from './tools/work-logs.js';
import { bulkCreateTools } from './tools/bulk-create.js';

function buildToolList(): ToolDef[] {
  const isExtended = process.env.PLANE_MCP_EXTENDED === 'true';

  const tools: ToolDef[] = [
    // Core tools — always included
    ...projectCoreTools,
    ...workItemTools,
    ...stateTools,
    ...labelTools,
    ...cycleCoreTools,
    ...moduleCoreTools,
    ...epicTools,
    ...milestoneTools,
    ...initiativeTools,
    ...pageTools,
    ...workspaceCoreTools,
    ...workItemCommentTools,
    ...workItemLinkTools,
    ...workItemRelationTools,
    ...workItemActivityCoreTools,
    ...bulkCreateTools,
  ];

  // Extended tools — only when PLANE_MCP_EXTENDED=true
  if (isExtended) {
    tools.push(
      ...projectAdminTools,
      ...workspaceAdminTools,
      ...cycleArchiveTools,
      ...moduleArchiveTools,
      ...workItemTypeTools,
      ...workItemPropertyTools,
      ...intakeTools,
      ...workLogTools,
      ...workItemActivityExtendedTools,
    );
  }

  return tools;
}

// All tools in one array
const ALL_TOOLS: ToolDef[] = buildToolList();

// Build lookup map
const toolMap = new Map<string, ToolDef>();
for (const tool of ALL_TOOLS) {
  toolMap.set(tool.name, tool);
}

export function createServer(resolveClient: () => PlaneClient): Server {
  const server = new Server(
    { name: 'plane-mcp-server', version: process.env.PACKAGE_VERSION ?? '0.0.0' },
    { capabilities: { tools: {} } },
  );

  const cachedToolsList = ALL_TOOLS.map((tool) => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema,
    annotations: getToolAnnotations(tool.name),
  }));

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'get_server_version',
          description: 'Returns the Plane MCP server name and version.',
          inputSchema: { type: 'object', properties: {} },
        },
        ...cachedToolsList,
      ],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === 'get_server_version') {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              { name: 'plane-mcp-server', version: process.env.PACKAGE_VERSION ?? '0.0.0' },
              null,
              2,
            ),
          },
        ],
      };
    }

    const tool = toolMap.get(name);

    if (!tool) {
      return {
        content: [{ type: 'text', text: `Unknown tool: ${name}` }],
        isError: true,
      };
    }

    try {
      const client = resolveClient();

      // For non-custom-handler tools, inject workspace slug into path
      const resolvedArgs = { ...(args || {}), __ws: client.getWorkspaceSlug() };

      const result = await executeToolDef(tool, client, resolvedArgs);

      const text = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
      return { content: [{ type: 'text', text }] };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: 'text', text: `Error: ${message}` }],
        isError: true,
      };
    }
  });

  return server;
}

export { ALL_TOOLS };
