import { describe, it, expect } from 'vitest';
import { workItemTools } from '../tools/work-items.js';
import { executeToolDef } from '../tools/registry.js';
import { PlaneClient } from '../plane-client.js';

const searchTool = workItemTools.find((t) => t.name === 'search_work_items')!;

function mockGetClient() {
  const captured = { path: '', params: undefined as Record<string, string> | undefined };
  const client = {
    get: async (path: string, queryParams?: Record<string, string>) => {
      captured.path = path;
      captured.params = queryParams;
      return { issues: [] };
    },
    workspacePath: (subpath: string) => `/api/v1/workspaces/test-ws/${subpath.replace(/^\//, '')}`,
  } as unknown as PlaneClient;
  return { client, captured };
}

describe('search_work_items', () => {
  it('calls the issues/search endpoint with workspace-wide search by default', async () => {
    const { client, captured } = mockGetClient();

    await executeToolDef(searchTool, client, { query: 'login bug' });

    expect(captured.path).toBe('/api/v1/workspaces/test-ws/issues/search/');
    expect(captured.params).toEqual({ search: 'login bug', workspace_search: 'true' });
  });

  it('scopes search to a project and passes limit when provided', async () => {
    const { client, captured } = mockGetClient();

    await executeToolDef(searchTool, client, {
      query: 'login bug',
      project_id: 'proj-uuid',
      limit: 25,
    });

    expect(captured.path).toBe('/api/v1/workspaces/test-ws/issues/search/');
    expect(captured.params).toEqual({
      search: 'login bug',
      workspace_search: 'false',
      project_id: 'proj-uuid',
      limit: '25',
    });
  });

  it('only accepts parameters supported by the Plane search endpoint', () => {
    const properties = Object.keys(
      (searchTool.inputSchema as { properties: Record<string, unknown> }).properties,
    );
    expect(properties.sort()).toEqual(['limit', 'project_id', 'query']);
  });
});
