import { ToolDef, nullable, nullableInt } from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const workItemLinkTools: ToolDef[] = [
  {
    name: 'list_work_item_links',
    description: 'List all links attached to a work item.',
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
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/links/`,
    pathParams: ['project_id', 'work_item_id'],
    queryParams: ['cursor', 'expand', 'fields', 'order_by', 'per_page'],
  },
  {
    name: 'create_work_item_link',
    description: 'Add a link to a work item.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id', 'url'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        url: { type: 'string', description: 'The URL of the link.' },
        title: nullable('string'),
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/links/`,
    pathParams: ['project_id', 'work_item_id'],
  },
  {
    name: 'retrieve_work_item_link',
    description: 'Retrieve a single link by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id', 'link_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        link_id: { type: 'string' },
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/links/{link_id}/`,
    pathParams: ['project_id', 'work_item_id', 'link_id'],
  },
  {
    name: 'update_work_item_link',
    description: 'Update a link on a work item.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id', 'link_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        link_id: { type: 'string' },
        url: nullable('string'),
        title: nullable('string'),
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'PATCH',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/links/{link_id}/`,
    pathParams: ['project_id', 'work_item_id', 'link_id'],
  },
  {
    name: 'delete_work_item_link',
    description: 'Delete a link from a work item.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id', 'link_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        link_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/links/{link_id}/`,
    pathParams: ['project_id', 'work_item_id', 'link_id'],
  },
];
