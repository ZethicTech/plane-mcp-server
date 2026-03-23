import { ToolDef, nullable, nullableInt, nullableObject } from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const workLogTools: ToolDef[] = [
  {
    name: 'list_work_logs',
    description:
      'List time-tracking entries for a work item. Requires project_id and work_item_id.',
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
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/worklogs/`,
    pathParams: ['project_id', 'work_item_id'],
  },
  {
    name: 'create_work_log',
    description: 'Create a time-tracking entry for a work item.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        duration: nullableInt(),
        description: nullable('string'),
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/worklogs/`,
    pathParams: ['project_id', 'work_item_id'],
  },
  {
    name: 'update_work_log',
    description: 'Update a time-tracking entry.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id', 'work_log_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        work_log_id: { type: 'string' },
        duration: nullableInt(),
        description: nullable('string'),
      },
    },
    method: 'PATCH',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/worklogs/{work_log_id}/`,
    pathParams: ['project_id', 'work_item_id', 'work_log_id'],
  },
  {
    name: 'delete_work_log',
    description: 'Delete a time-tracking entry.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id', 'work_log_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        work_log_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/worklogs/{work_log_id}/`,
    pathParams: ['project_id', 'work_item_id', 'work_log_id'],
  },
];
