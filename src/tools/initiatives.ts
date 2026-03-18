import { ToolDef, nullable, nullableObject } from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const initiativeTools: ToolDef[] = [
  {
    name: 'list_initiatives',
    description: 'List all initiatives in the workspace.',
    inputSchema: {
      type: 'object',
      properties: {
        params: nullableObject(),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/initiatives/`,
    pathParams: [],
  },
  {
    name: 'create_initiative',
    description: 'Create a new initiative.',
    inputSchema: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        description_html: nullable('string'),
        start_date: nullable('string'),
        end_date: nullable('string'),
        logo_props: nullableObject(),
        state: nullable('string'),
        lead: nullable('string'),
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/initiatives/`,
    pathParams: [],
  },
  {
    name: 'retrieve_initiative',
    description: 'Retrieve an initiative by ID.',
    inputSchema: {
      type: 'object',
      required: ['initiative_id'],
      properties: {
        initiative_id: { type: 'string' },
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/initiatives/{initiative_id}/`,
    pathParams: ['initiative_id'],
  },
  {
    name: 'update_initiative',
    description: 'Update an initiative by ID.',
    inputSchema: {
      type: 'object',
      required: ['initiative_id'],
      properties: {
        initiative_id: { type: 'string' },
        name: nullable('string'),
        description_html: nullable('string'),
        start_date: nullable('string'),
        end_date: nullable('string'),
        logo_props: nullableObject(),
        state: nullable('string'),
        lead: nullable('string'),
      },
    },
    method: 'PATCH',
    pathTemplate: `${WS}/initiatives/{initiative_id}/`,
    pathParams: ['initiative_id'],
  },
  {
    name: 'delete_initiative',
    description: 'Delete an initiative by ID.',
    inputSchema: {
      type: 'object',
      required: ['initiative_id'],
      properties: {
        initiative_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/initiatives/{initiative_id}/`,
    pathParams: ['initiative_id'],
  },
];
