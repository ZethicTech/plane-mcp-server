import { ToolDef, nullable, nullableInt } from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const workItemRelationTools: ToolDef[] = [
  {
    name: 'list_work_item_relations',
    description: 'List all relations for a work item.',
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
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/relations/`,
    pathParams: ['project_id', 'work_item_id'],
    queryParams: ['cursor', 'expand', 'fields', 'order_by', 'per_page'],
  },
  {
    name: 'create_work_item_relation',
    description: 'Create a relation between two work items.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id', 'related_issue', 'relation_type'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        related_issue: { type: 'string', description: 'UUID of the related work item.' },
        relation_type: { type: 'string', description: 'Type of relation (e.g. "blocked_by", "blocks", "duplicate", "relates_to").' },
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/relations/`,
    pathParams: ['project_id', 'work_item_id'],
  },
  {
    name: 'remove_work_item_relation',
    description: 'Remove a relation between two work items.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id', 'related_issue'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        related_issue: { type: 'string', description: 'UUID of the related work item to unlink.' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/relations/{related_issue}/`,
    pathParams: ['project_id', 'work_item_id', 'related_issue'],
  },
];
