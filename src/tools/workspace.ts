import { ToolDef, nullableBool } from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const workspaceTools: ToolDef[] = [
  {
    name: 'get_me',
    description: 'Get the currently authenticated user.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
    method: 'GET',
    pathTemplate: '/api/v1/users/me/',
    pathParams: [],
  },
  {
    name: 'get_workspace_members',
    description: 'Get all workspace members with their user IDs. Call this to find assignee IDs before creating or filtering work items by assignee.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
    method: 'GET',
    pathTemplate: `${WS}/members/`,
    pathParams: [],
  },
  {
    name: 'get_workspace_features',
    description: 'Get workspace features.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
    method: 'GET',
    pathTemplate: `${WS}/features/`,
    pathParams: [],
  },
  {
    name: 'update_workspace_features',
    description: 'Update workspace features.',
    inputSchema: {
      type: 'object',
      properties: {
        project_grouping: nullableBool(),
        initiatives: nullableBool(),
        teams: nullableBool(),
        customers: nullableBool(),
        wiki: nullableBool(),
        pi: nullableBool(),
      },
    },
    method: 'PATCH',
    pathTemplate: `${WS}/features/`,
    pathParams: [],
  },
];
