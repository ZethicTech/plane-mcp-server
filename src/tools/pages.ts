import { ToolDef, nullable, nullableInt, nullableBool, nullableObject } from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const pageTools: ToolDef[] = [
  {
    name: 'create_workspace_page',
    description: 'Create a new workspace page.',
    inputSchema: {
      type: 'object',
      required: ['name', 'description_html'],
      properties: {
        name: { type: 'string' },
        description_html: { type: 'string' },
        access: nullableInt(),
        color: nullable('string'),
        is_locked: nullableBool(),
        archived_at: nullable('string'),
        view_props: nullableObject(),
        logo_props: nullableObject(),
        external_id: nullable('string'),
        external_source: nullable('string'),
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/pages/`,
    pathParams: [],
  },
  {
    name: 'retrieve_workspace_page',
    description: 'Retrieve a workspace page by ID.',
    inputSchema: {
      type: 'object',
      required: ['page_id'],
      properties: {
        page_id: { type: 'string' },
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/pages/{page_id}/`,
    pathParams: ['page_id'],
  },
  {
    name: 'create_project_page',
    description: 'Create a new project page.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'name', 'description_html'],
      properties: {
        project_id: { type: 'string' },
        name: { type: 'string' },
        description_html: { type: 'string' },
        access: nullableInt(),
        color: nullable('string'),
        is_locked: nullableBool(),
        archived_at: nullable('string'),
        view_props: nullableObject(),
        logo_props: nullableObject(),
        external_id: nullable('string'),
        external_source: nullable('string'),
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/pages/`,
    pathParams: ['project_id'],
  },
  {
    name: 'retrieve_project_page',
    description: 'Retrieve a project page by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'page_id'],
      properties: {
        project_id: { type: 'string' },
        page_id: { type: 'string' },
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/pages/{page_id}/`,
    pathParams: ['project_id', 'page_id'],
  },
];
