import {
  ToolDef,
  nullable,
  nullableBool,
  nullableStringArray,
  nullableObject,
} from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const workItemTypeTools: ToolDef[] = [
  {
    name: 'list_work_item_types',
    description: 'List all work item types in a project.',
    inputSchema: {
      type: 'object',
      required: ['project_id'],
      properties: {
        project_id: { type: 'string' },
        params: nullableObject(),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/issue-types/`,
    pathParams: ['project_id'],
  },
  {
    name: 'create_work_item_type',
    description: 'Create a new work item type in a project.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'name'],
      properties: {
        project_id: { type: 'string' },
        name: { type: 'string' },
        description: nullable('string'),
        project_ids: nullableStringArray(),
        is_epic: nullableBool(),
        is_active: nullableBool(),
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/issue-types/`,
    pathParams: ['project_id'],
  },
  {
    name: 'retrieve_work_item_type',
    description: 'Retrieve a work item type by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_type_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_type_id: { type: 'string' },
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/issue-types/{work_item_type_id}/`,
    pathParams: ['project_id', 'work_item_type_id'],
  },
  {
    name: 'update_work_item_type',
    description: 'Update a work item type by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_type_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_type_id: { type: 'string' },
        name: nullable('string'),
        description: nullable('string'),
        project_ids: nullableStringArray(),
        is_epic: nullableBool(),
        is_active: nullableBool(),
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'PATCH',
    pathTemplate: `${WS}/projects/{project_id}/issue-types/{work_item_type_id}/`,
    pathParams: ['project_id', 'work_item_type_id'],
  },
  {
    name: 'delete_work_item_type',
    description: 'Delete a work item type by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_type_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_type_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/issue-types/{work_item_type_id}/`,
    pathParams: ['project_id', 'work_item_type_id'],
  },
];
