import { ToolDef, nullable, nullableInt, nullableNum } from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const stateTools: ToolDef[] = [
  {
    name: 'list_states',
    description: 'List all states (statuses) in a project.',
    inputSchema: {
      type: 'object',
      required: ['project_id'],
      properties: {
        project_id: { type: 'string' },
        cursor: nullable('string'),
        expand: nullable('string'),
        fields: nullable('string'),
        order_by: nullable('string'),
        per_page: nullableInt(),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/states/`,
    pathParams: ['project_id'],
    queryParams: ['cursor', 'expand', 'fields', 'order_by', 'per_page'],
  },
  {
    name: 'create_state',
    description: 'Create a new state in a project.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'name', 'color'],
      properties: {
        project_id: { type: 'string' },
        name: { type: 'string' },
        color: { type: 'string', description: 'Hex color code (e.g. "#eb5757").' },
        description: nullable('string'),
        group: nullable('string'),
        sequence: nullableNum(),
        is_triage: nullable('boolean'),
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/states/`,
    pathParams: ['project_id'],
  },
  {
    name: 'retrieve_state',
    description: 'Retrieve a state by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'state_id'],
      properties: {
        project_id: { type: 'string' },
        state_id: { type: 'string' },
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/states/{state_id}/`,
    pathParams: ['project_id', 'state_id'],
  },
  {
    name: 'update_state',
    description: 'Update a state by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'state_id'],
      properties: {
        project_id: { type: 'string' },
        state_id: { type: 'string' },
        name: nullable('string'),
        color: nullable('string'),
        description: nullable('string'),
        group: nullable('string'),
        sequence: nullableNum(),
        is_triage: nullable('boolean'),
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'PATCH',
    pathTemplate: `${WS}/projects/{project_id}/states/{state_id}/`,
    pathParams: ['project_id', 'state_id'],
  },
  {
    name: 'delete_state',
    description: 'Delete a state by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'state_id'],
      properties: {
        project_id: { type: 'string' },
        state_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/states/{state_id}/`,
    pathParams: ['project_id', 'state_id'],
  },
];
