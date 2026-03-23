import { ToolDef, nullable, nullableObject } from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const cycleTools: ToolDef[] = [
  {
    name: 'list_cycles',
    description: 'List all cycles in a project.',
    inputSchema: {
      type: 'object',
      required: ['project_id'],
      properties: {
        project_id: { type: 'string' },
        params: nullableObject(),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/cycles/`,
    pathParams: ['project_id'],
  },
  {
    name: 'create_cycle',
    description: 'Create a new cycle in a project.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'name', 'owned_by'],
      properties: {
        project_id: { type: 'string' },
        name: { type: 'string' },
        owned_by: { type: 'string' },
        description: nullable('string'),
        start_date: nullable('string'),
        end_date: nullable('string'),
        external_source: nullable('string'),
        external_id: nullable('string'),
        timezone: nullable('string'),
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/cycles/`,
    pathParams: ['project_id'],
  },
  {
    name: 'retrieve_cycle',
    description: 'Retrieve a cycle by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'cycle_id'],
      properties: {
        project_id: { type: 'string' },
        cycle_id: { type: 'string' },
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/cycles/{cycle_id}/`,
    pathParams: ['project_id', 'cycle_id'],
  },
  {
    name: 'update_cycle',
    description: 'Update a cycle by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'cycle_id'],
      properties: {
        project_id: { type: 'string' },
        cycle_id: { type: 'string' },
        name: nullable('string'),
        description: nullable('string'),
        start_date: nullable('string'),
        end_date: nullable('string'),
        owned_by: nullable('string'),
        external_source: nullable('string'),
        external_id: nullable('string'),
        timezone: nullable('string'),
      },
    },
    method: 'PATCH',
    pathTemplate: `${WS}/projects/{project_id}/cycles/{cycle_id}/`,
    pathParams: ['project_id', 'cycle_id'],
  },
  {
    name: 'delete_cycle',
    description: 'Delete a cycle by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'cycle_id'],
      properties: {
        project_id: { type: 'string' },
        cycle_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/cycles/{cycle_id}/`,
    pathParams: ['project_id', 'cycle_id'],
  },
  {
    name: 'list_cycle_work_items',
    description:
      'List all work items in a specific cycle. Requires project_id and cycle_id \u2014 call list_cycles first to get the cycle_id.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'cycle_id'],
      properties: {
        project_id: { type: 'string' },
        cycle_id: { type: 'string' },
        params: nullableObject(),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/cycles/{cycle_id}/cycle-issues/`,
    pathParams: ['project_id', 'cycle_id'],
  },
  {
    name: 'add_work_items_to_cycle',
    description: 'Add work items to a cycle.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'cycle_id', 'issue_ids'],
      properties: {
        project_id: { type: 'string' },
        cycle_id: { type: 'string' },
        issue_ids: { items: { type: 'string' }, type: 'array' },
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/cycles/{cycle_id}/cycle-issues/`,
    pathParams: ['project_id', 'cycle_id'],
  },
  {
    name: 'remove_work_item_from_cycle',
    description: 'Remove a work item from a cycle.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'cycle_id', 'work_item_id'],
      properties: {
        project_id: { type: 'string' },
        cycle_id: { type: 'string' },
        work_item_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/cycles/{cycle_id}/cycle-issues/{work_item_id}/`,
    pathParams: ['project_id', 'cycle_id', 'work_item_id'],
  },
  {
    name: 'transfer_cycle_work_items',
    description: 'Transfer work items from one cycle to another.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'cycle_id', 'new_cycle_id'],
      properties: {
        project_id: { type: 'string' },
        cycle_id: { type: 'string' },
        new_cycle_id: { type: 'string' },
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/cycles/{cycle_id}/transfer-issues/`,
    pathParams: ['project_id', 'cycle_id'],
  },
  {
    name: 'archive_cycle',
    description: 'Archive a cycle.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'cycle_id'],
      properties: {
        project_id: { type: 'string' },
        cycle_id: { type: 'string' },
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/cycles/{cycle_id}/archive/`,
    pathParams: ['project_id', 'cycle_id'],
  },
  {
    name: 'unarchive_cycle',
    description: 'Unarchive a cycle.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'cycle_id'],
      properties: {
        project_id: { type: 'string' },
        cycle_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/cycles/{cycle_id}/archive/`,
    pathParams: ['project_id', 'cycle_id'],
  },
  {
    name: 'list_archived_cycles',
    description: 'List all archived cycles in a project.',
    inputSchema: {
      type: 'object',
      required: ['project_id'],
      properties: {
        project_id: { type: 'string' },
        params: nullableObject(),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/archived-cycles/`,
    pathParams: ['project_id'],
  },
];
