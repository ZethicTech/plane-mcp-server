import { ToolDef, nullable, nullableInt, nullableNum } from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const labelTools: ToolDef[] = [
  {
    name: 'list_labels',
    description:
      'List all labels in a project. Call this to get label UUIDs needed for creating or filtering work items.',
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
    pathTemplate: `${WS}/projects/{project_id}/labels/`,
    pathParams: ['project_id'],
    queryParams: ['cursor', 'expand', 'fields', 'order_by', 'per_page'],
  },
  {
    name: 'create_label',
    description: 'Create a new label in a project.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'name'],
      properties: {
        project_id: { type: 'string' },
        name: { type: 'string' },
        color: nullable('string'),
        parent: nullable('string'),
        sort_order: nullableNum(),
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/labels/`,
    pathParams: ['project_id'],
  },
  {
    name: 'retrieve_label',
    description: 'Retrieve a label by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'label_id'],
      properties: {
        project_id: { type: 'string' },
        label_id: { type: 'string' },
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/labels/{label_id}/`,
    pathParams: ['project_id', 'label_id'],
  },
  {
    name: 'update_label',
    description: 'Update a label by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'label_id'],
      properties: {
        project_id: { type: 'string' },
        label_id: { type: 'string' },
        name: nullable('string'),
        color: nullable('string'),
        parent: nullable('string'),
        sort_order: nullableNum(),
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'PATCH',
    pathTemplate: `${WS}/projects/{project_id}/labels/{label_id}/`,
    pathParams: ['project_id', 'label_id'],
  },
  {
    name: 'delete_label',
    description: 'Delete a label by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'label_id'],
      properties: {
        project_id: { type: 'string' },
        label_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/labels/{label_id}/`,
    pathParams: ['project_id', 'label_id'],
  },
];
