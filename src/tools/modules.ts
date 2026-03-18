import { ToolDef, nullable, nullableStringArray, nullableObject } from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const moduleTools: ToolDef[] = [
  {
    name: 'list_modules',
    description: 'List all modules in a project.',
    inputSchema: {
      type: 'object',
      required: ['project_id'],
      properties: {
        project_id: { type: 'string' },
        params: nullableObject(),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/modules/`,
    pathParams: ['project_id'],
  },
  {
    name: 'create_module',
    description: 'Create a new module in a project.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'name'],
      properties: {
        project_id: { type: 'string' },
        name: { type: 'string' },
        description: nullable('string'),
        start_date: nullable('string'),
        target_date: nullable('string'),
        status: nullable('string'),
        lead: nullable('string'),
        members: nullableStringArray(),
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/modules/`,
    pathParams: ['project_id'],
  },
  {
    name: 'retrieve_module',
    description: 'Retrieve a module by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'module_id'],
      properties: {
        project_id: { type: 'string' },
        module_id: { type: 'string' },
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/modules/{module_id}/`,
    pathParams: ['project_id', 'module_id'],
  },
  {
    name: 'update_module',
    description: 'Update a module by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'module_id'],
      properties: {
        project_id: { type: 'string' },
        module_id: { type: 'string' },
        name: nullable('string'),
        description: nullable('string'),
        start_date: nullable('string'),
        target_date: nullable('string'),
        status: nullable('string'),
        lead: nullable('string'),
        members: nullableStringArray(),
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'PATCH',
    pathTemplate: `${WS}/projects/{project_id}/modules/{module_id}/`,
    pathParams: ['project_id', 'module_id'],
  },
  {
    name: 'delete_module',
    description: 'Delete a module by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'module_id'],
      properties: {
        project_id: { type: 'string' },
        module_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/modules/{module_id}/`,
    pathParams: ['project_id', 'module_id'],
  },
  {
    name: 'list_module_work_items',
    description: 'List all work items in a module.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'module_id'],
      properties: {
        project_id: { type: 'string' },
        module_id: { type: 'string' },
        params: nullableObject(),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/modules/{module_id}/module-issues/`,
    pathParams: ['project_id', 'module_id'],
  },
  {
    name: 'add_work_items_to_module',
    description: 'Add work items to a module.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'module_id', 'issue_ids'],
      properties: {
        project_id: { type: 'string' },
        module_id: { type: 'string' },
        issue_ids: { items: { type: 'string' }, type: 'array' },
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/modules/{module_id}/module-issues/`,
    pathParams: ['project_id', 'module_id'],
  },
  {
    name: 'remove_work_item_from_module',
    description: 'Remove a work item from a module.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'module_id', 'work_item_id'],
      properties: {
        project_id: { type: 'string' },
        module_id: { type: 'string' },
        work_item_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/modules/{module_id}/module-issues/{work_item_id}/`,
    pathParams: ['project_id', 'module_id', 'work_item_id'],
  },
  {
    name: 'archive_module',
    description: 'Archive a module.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'module_id'],
      properties: {
        project_id: { type: 'string' },
        module_id: { type: 'string' },
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/modules/{module_id}/archive/`,
    pathParams: ['project_id', 'module_id'],
  },
  {
    name: 'unarchive_module',
    description: 'Unarchive a module.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'module_id'],
      properties: {
        project_id: { type: 'string' },
        module_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/modules/{module_id}/archive/`,
    pathParams: ['project_id', 'module_id'],
  },
  {
    name: 'list_archived_modules',
    description: 'List all archived modules in a project.',
    inputSchema: {
      type: 'object',
      required: ['project_id'],
      properties: {
        project_id: { type: 'string' },
        params: nullableObject(),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/archived-modules/`,
    pathParams: ['project_id'],
  },
];
