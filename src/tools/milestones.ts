import { ToolDef, nullable, nullableObject } from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const milestoneTools: ToolDef[] = [
  {
    name: 'list_milestones',
    description:
      'List all milestones in a project. Milestones represent key delivery dates or goals. Returns milestone IDs needed for managing milestone work items.',
    inputSchema: {
      type: 'object',
      required: ['project_id'],
      properties: {
        project_id: { type: 'string' },
        params: nullableObject(),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/milestones/`,
    pathParams: ['project_id'],
  },
  {
    name: 'create_milestone',
    description: 'Create a new milestone in a project.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'title'],
      properties: {
        project_id: { type: 'string' },
        title: { type: 'string' },
        target_date: nullable('string'),
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/milestones/`,
    pathParams: ['project_id'],
  },
  {
    name: 'retrieve_milestone',
    description: 'Retrieve a milestone by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'milestone_id'],
      properties: {
        project_id: { type: 'string' },
        milestone_id: { type: 'string' },
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/milestones/{milestone_id}/`,
    pathParams: ['project_id', 'milestone_id'],
  },
  {
    name: 'update_milestone',
    description: 'Update a milestone by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'milestone_id'],
      properties: {
        project_id: { type: 'string' },
        milestone_id: { type: 'string' },
        title: nullable('string'),
        target_date: nullable('string'),
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'PATCH',
    pathTemplate: `${WS}/projects/{project_id}/milestones/{milestone_id}/`,
    pathParams: ['project_id', 'milestone_id'],
  },
  {
    name: 'delete_milestone',
    description: 'Delete a milestone by ID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'milestone_id'],
      properties: {
        project_id: { type: 'string' },
        milestone_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/milestones/{milestone_id}/`,
    pathParams: ['project_id', 'milestone_id'],
  },
  {
    name: 'list_milestone_work_items',
    description: 'List all work items in a milestone.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'milestone_id'],
      properties: {
        project_id: { type: 'string' },
        milestone_id: { type: 'string' },
        params: nullableObject(),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/milestones/{milestone_id}/milestone-issues/`,
    pathParams: ['project_id', 'milestone_id'],
  },
  {
    name: 'add_work_items_to_milestone',
    description: 'Add work items to a milestone.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'milestone_id', 'issue_ids'],
      properties: {
        project_id: { type: 'string' },
        milestone_id: { type: 'string' },
        issue_ids: { items: { type: 'string' }, type: 'array' },
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/milestones/{milestone_id}/milestone-issues/`,
    pathParams: ['project_id', 'milestone_id'],
  },
  {
    name: 'remove_work_items_from_milestone',
    description: 'Remove work items from a milestone.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'milestone_id', 'issue_ids'],
      properties: {
        project_id: { type: 'string' },
        milestone_id: { type: 'string' },
        issue_ids: { items: { type: 'string' }, type: 'array' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/milestones/{milestone_id}/milestone-issues/`,
    pathParams: ['project_id', 'milestone_id'],
    handler: async (client, args) => {
      const path = client.workspacePath(
        `projects/${args.project_id}/milestones/${args.milestone_id}/milestone-issues/`,
      );
      return client.request('DELETE', path, { issue_ids: args.issue_ids });
    },
  },
];
