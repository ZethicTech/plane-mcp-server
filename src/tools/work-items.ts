import { ToolDef, nullable, nullableInt, nullableNum, nullableStringArray } from './registry.js';

const WS = '/api/v1/workspaces/{__ws}';

export const workItemTools: ToolDef[] = [
  {
    name: 'list_work_items',
    description:
      'List work items (issues) in a project. Supports filtering by priority, state, state_group, assignees, labels, dates, cycle, and module. Use expand=relations,assignees,labels for richer data. Results are paginated — use the cursor from the response to fetch the next page. When linking to a work item, use the format: {PLANE_BASE_URL}/{workspace_slug}/browse/{project_identifier}-{sequence_id}/',
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
        assignees: nullable('string'),
        created_by: nullable('string'),
        labels: nullable('string'),
        priority: nullable('string'),
        state: nullable('string'),
        subscriber: nullable('string'),
        target_date: nullable('string'),
        start_date: nullable('string'),
        type: nullable('string'),
        external_id: nullable('string'),
        external_source: nullable('string'),
        state_group: nullable('string'),
        cycle: nullable('string'),
        module: nullable('string'),
        archived: { type: ['boolean', 'null'], description: 'Include archived work items.' },
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/issues/`,
    pathParams: ['project_id'],
    queryParams: [
      'cursor',
      'expand',
      'fields',
      'order_by',
      'per_page',
      'assignees',
      'created_by',
      'labels',
      'priority',
      'state',
      'state_group',
      'subscriber',
      'target_date',
      'start_date',
      'type',
      'cycle',
      'module',
      'archived',
      'external_id',
      'external_source',
    ],
  },
  {
    name: 'create_work_item',
    description:
      'Create a new work item (issue) in a project. Requires project_id from list_projects. Use list_states to get state_id, get_workspace_members for assignee UUIDs, and list_labels for label UUIDs. Dates should be YYYY-MM-DD format. Priority is one of: urgent, high, medium, low, none.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'name'],
      properties: {
        project_id: { type: 'string' },
        name: { type: 'string' },
        description_html: nullable('string'),
        priority: nullable('string'),
        state_id: nullable('string'),
        assignees: nullableStringArray(),
        labels: nullableStringArray(),
        start_date: nullable('string'),
        target_date: nullable('string'),
        parent_id: nullable('string'),
        estimate_point: nullableNum(),
        sort_order: nullableNum(),
        type_id: nullable('string'),
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'POST',
    pathTemplate: `${WS}/projects/{project_id}/issues/`,
    pathParams: ['project_id'],
    bodyRenames: { state_id: 'state', parent_id: 'parent', type_id: 'type' },
  },
  {
    name: 'retrieve_work_item',
    description:
      'Retrieve a single work item by its UUID. Use expand=relations,assignees,labels for full details. If you have a human-readable identifier like DEV-42, use retrieve_work_item_by_identifier instead.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        expand: nullable('string'),
        fields: nullable('string'),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/`,
    pathParams: ['project_id', 'work_item_id'],
    queryParams: ['expand', 'fields'],
  },
  {
    name: 'update_work_item',
    description:
      'Update an existing work item. Only include fields you want to change — omitted fields are left unchanged. Use list_states for state_id, get_workspace_members for assignee UUIDs, list_labels for label UUIDs.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
        name: nullable('string'),
        description_html: nullable('string'),
        priority: nullable('string'),
        state_id: nullable('string'),
        assignees: nullableStringArray(),
        labels: nullableStringArray(),
        start_date: nullable('string'),
        target_date: nullable('string'),
        parent_id: nullable('string'),
        estimate_point: nullableNum(),
        sort_order: nullableNum(),
        type_id: nullable('string'),
        external_source: nullable('string'),
        external_id: nullable('string'),
      },
    },
    method: 'PATCH',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/`,
    pathParams: ['project_id', 'work_item_id'],
    bodyRenames: { state_id: 'state', parent_id: 'parent', type_id: 'type' },
  },
  {
    name: 'delete_work_item',
    description: 'Delete a work item by its UUID.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'work_item_id'],
      properties: {
        project_id: { type: 'string' },
        work_item_id: { type: 'string' },
      },
    },
    method: 'DELETE',
    pathTemplate: `${WS}/projects/{project_id}/issues/{work_item_id}/`,
    pathParams: ['project_id', 'work_item_id'],
  },
  {
    name: 'search_work_items',
    description:
      'Search for work items across the entire workspace by text query. Matches against item names and descriptions. Use this when you need to find items without knowing the project_id. When linking to a work item, use the format: {PLANE_BASE_URL}/{workspace_slug}/browse/{project_identifier}-{sequence_id}/',
    inputSchema: {
      type: 'object',
      required: ['query'],
      properties: {
        query: { type: 'string', description: 'The search text to look for in work items.' },
        expand: nullable('string'),
        fields: nullable('string'),
        order_by: nullable('string'),
        external_id: nullable('string'),
        external_source: nullable('string'),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/search/issues/`,
    pathParams: [],
    handler: async (client, args) => {
      const queryParams: Record<string, string> = { search: String(args.query) };
      if (args.expand) queryParams.expand = String(args.expand);
      if (args.fields) queryParams.fields = String(args.fields);
      if (args.order_by) queryParams.order_by = String(args.order_by);
      if (args.external_id) queryParams.external_id = String(args.external_id);
      if (args.external_source) queryParams.external_source = String(args.external_source);
      return client.get(client.workspacePath('search/issues/'), queryParams);
    },
  },
  {
    name: 'retrieve_work_item_by_identifier',
    description:
      'Retrieve a work item by its human-readable identifier (e.g. "DEV-42"). Provide the project identifier (e.g. "DEV") and the issue sequence number (e.g. 42).',
    inputSchema: {
      type: 'object',
      required: ['project_identifier', 'issue_identifier'],
      properties: {
        project_identifier: {
          type: 'string',
          description: 'The project identifier prefix (e.g. "DEV").',
        },
        issue_identifier: { type: 'integer', description: 'The issue sequence number (e.g. 42).' },
        expand: nullable('string'),
        fields: nullable('string'),
        external_id: nullable('string'),
        external_source: nullable('string'),
        order_by: nullable('string'),
      },
    },
    method: 'GET',
    pathTemplate: `${WS}/issues/`,
    pathParams: [],
    handler: async (client, args) => {
      const projectIdentifier = String(args.project_identifier);
      const issueIdentifier = String(args.issue_identifier);
      const queryParams: Record<string, string> = {};
      if (args.expand) queryParams.expand = String(args.expand);
      if (args.fields) queryParams.fields = String(args.fields);
      if (args.external_id) queryParams.external_id = String(args.external_id);
      if (args.external_source) queryParams.external_source = String(args.external_source);
      if (args.order_by) queryParams.order_by = String(args.order_by);
      return client.get(
        client.workspacePath(`issues/${projectIdentifier}-${issueIdentifier}/`),
        Object.keys(queryParams).length > 0 ? queryParams : undefined,
      );
    },
  },
];
