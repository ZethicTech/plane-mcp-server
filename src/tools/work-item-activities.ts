import { ToolDef, nullable, nullableInt } from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const workItemActivityCoreTools: ToolDef[] = [
  {
    name: 'list_work_item_activities',
    description: 'List all activities (history/audit log) for a work item.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        cursor: nullable('string'),
        expand: nullable('string'),
        fields: nullable('string'),
        order_by: nullable('string'),
        per_page: nullableInt(),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/activities/`,
    pathParams: ['project_id', 'work_item_id'],
    queryParams: ['cursor', 'expand', 'fields', 'order_by', 'per_page'],
  },
];

export const workItemActivityExtendedTools: ToolDef[] = [
  {
    name: 'retrieve_work_item_activity',
    description: 'Retrieve a single activity entry by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id', 'activity_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        activity_id: { type: 'string' },
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/activities/{activity_id}/`,
    pathParams: ['project_id', 'work_item_id', 'activity_id'],
  },
];
