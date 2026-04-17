import { ToolDef, nullable, nullableInt, nullableBool, nullableObject } from './registry.js';

export const pageTools: ToolDef[] = [
  {
    name: 'create_page',
    description:
      'Create a new page. If project_id is provided, creates a project page; otherwise creates a workspace page.',
    inputSchema: {
      type: 'object',
      required: ['name', 'description_html'],
      properties: {
        project_id: nullable('string'),
        name: { type: 'string' },
        description_html: { type: 'string' },
        access: nullableInt(),
        color: nullable('string'),
        is_locked: nullableBool(),
        archived_at: nullable('string'),
        view_props: nullableObject(),
        logo_props: nullableObject(),
        external_id: nullable('string'),
        external_source: nullable('string'),
      },
    },
    method: 'POST',
    pathTemplate: '', // unused — custom handler
    pathParams: [],
    handler: async (client, args) => {
      const body: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(args)) {
        if (k !== 'project_id' && v !== undefined && v !== null) {
          body[k] = v;
        }
      }
      const projectId = args.project_id ? String(args.project_id) : null;
      const path = projectId
        ? client.workspacePath(`projects/${projectId}/pages/`)
        : client.workspacePath('pages/');
      return client.post(path, body);
    },
  },
  {
    name: 'retrieve_page',
    description:
      'Retrieve a page by ID. If project_id is provided, retrieves a project page; otherwise retrieves a workspace page.',
    inputSchema: {
      type: 'object',
      required: ['page_id'],
      properties: {
        project_id: nullable('string'),
        page_id: { type: 'string' },
      },
    },
    method: 'GET',
    pathTemplate: '', // unused — custom handler
    pathParams: [],
    handler: async (client, args) => {
      const pageId = String(args.page_id);
      const projectId = args.project_id ? String(args.project_id) : null;
      const path = projectId
        ? client.workspacePath(`projects/${projectId}/pages/${pageId}/`)
        : client.workspacePath(`pages/${pageId}/`);
      return client.get(path);
    },
  },
];
