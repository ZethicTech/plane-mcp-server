import { ToolDef, nullable, nullableInt } from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const workItemCommentTools: ToolDef[] = [
  {
    name: 'list_work_item_comments',
    description: 'List all comments on a work item.',
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
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/comments/`,
    pathParams: ['project_id', 'work_item_id'],
    queryParams: ['cursor', 'expand', 'fields', 'order_by', 'per_page'],
  },
  {
    name: 'create_work_item_comment',
    description: 'Add a comment to a work item.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id', 'comment_html'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        comment_html: { type: 'string', description: 'The comment body in HTML format.' },
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/comments/`,
    pathParams: ['project_id', 'work_item_id'],
  },
  {
    name: 'retrieve_work_item_comment',
    description: 'Retrieve a single comment by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id', 'comment_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        comment_id: { type: 'string' },
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/comments/{comment_id}/`,
    pathParams: ['project_id', 'work_item_id', 'comment_id'],
  },
  {
    name: 'update_work_item_comment',
    description: 'Update a comment on a work item.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id', 'comment_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        comment_id: { type: 'string' },
        comment_html: nullable('string'),
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'PATCH',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/comments/{comment_id}/`,
    pathParams: ['project_id', 'work_item_id', 'comment_id'],
  },
  {
    name: 'delete_work_item_comment',
    description: 'Delete a comment from a work item.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id', 'comment_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        comment_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/comments/{comment_id}/`,
    pathParams: ['project_id', 'work_item_id', 'comment_id'],
  },
];
