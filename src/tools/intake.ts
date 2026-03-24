import { ToolDef, nullableObject } from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const intakeTools: ToolDef[] = [
  {
    name: 'list_intake_work_items',
    description: 'List all intake work items in a project.',
    inputSchema: {
      type: 'object',
      required: ['project_id'],
      properties: {
        project_id: { type: 'string' },
        params: nullableObject(),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/intake-issues/`,
    pathParams: ['project_id'],
  },
  {
    name: 'create_intake_work_item',
    description: 'Create a new intake work item.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'data'],
      properties: {
        project_id: { type: 'string' },
        data: { additionalProperties: true, type: 'object' },
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/intake-issues/`,
    pathParams: ['project_id'],
    handler: async (client, args) => {
      const path = client.workspacePath(`projects/${args.project_id}/intake-issues/`);
      return client.post(path, args.data as Record<string, unknown>);
    },
  },
  {
    name: 'retrieve_intake_work_item',
    description: 'Retrieve an intake work item by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        params: nullableObject(),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/intake-issues/{work_item_id}/`,
    pathParams: ['project_id', 'work_item_id'],
  },
  {
    name: 'update_intake_work_item',
    description: 'Update an intake work item by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id', 'data'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        data: { additionalProperties: true, type: 'object' },
      },
    },
    method: 'PATCH',
    pathTemplate: `${WS}/projects/{project_id}/intake-issues/{work_item_id}/`,
    pathParams: ['project_id', 'work_item_id'],
    handler: async (client, args) => {
      const path = client.workspacePath(
        `projects/${args.project_id}/intake-issues/${args.work_item_id}/`,
      );
      return client.patch(path, args.data as Record<string, unknown>);
    },
  },
  {
    name: 'delete_intake_work_item',
    description: 'Delete an intake work item by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/intake-issues/{work_item_id}/`,
    pathParams: ['project_id', 'work_item_id'],
  },
];
