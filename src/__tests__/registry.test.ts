import { describe, it, expect } from 'vitest';
import { executeToolDef, ToolDef } from '../tools/registry.js';
import { PlaneClient } from '../plane-client.js';

describe('executeToolDef', () => {
  it('does not include __ws in request body', async () => {
    let capturedPath = '';
    let capturedBody: Record<string, unknown> | undefined;

    const mockClient = {
      post: async (path: string, body: Record<string, unknown>) => {
        capturedPath = path;
        capturedBody = body;
        return { ok: true };
      },
      getWorkspaceSlug: () => 'test-ws',
    } as unknown as PlaneClient;

    const tool: ToolDef = {
      name: 'test_tool',
      description: 'test',
      inputSchema: { type: 'object', properties: {} },
      method: 'POST',
      pathTemplate: '/api/v1/workspaces/{__ws}/projects/',
      pathParams: [],
    };

    await executeToolDef(tool, mockClient, {
      __ws: 'test-ws',
      name: 'Test Project',
    });

    expect(capturedPath).toBe('/api/v1/workspaces/test-ws/projects/');
    expect(capturedBody).toEqual({ name: 'Test Project' });
    expect(capturedBody).not.toHaveProperty('__ws');
  });

  it('extracts path params from args', async () => {
    let capturedPath = '';

    const mockClient = {
      get: async (path: string) => {
        capturedPath = path;
        return {};
      },
    } as unknown as PlaneClient;

    const tool: ToolDef = {
      name: 'retrieve_project',
      description: 'test',
      inputSchema: { type: 'object', properties: {} },
      method: 'GET',
      pathTemplate: '/api/v1/workspaces/{__ws}/projects/{project_id}/',
      pathParams: ['project_id'],
    };

    await executeToolDef(tool, mockClient, {
      __ws: 'my-ws',
      project_id: 'abc-123',
    });

    expect(capturedPath).toBe('/api/v1/workspaces/my-ws/projects/abc-123/');
  });

  it('renames body keys via bodyRenames', async () => {
    let capturedBody: Record<string, unknown> | undefined;

    const mockClient = {
      post: async (_path: string, body: Record<string, unknown>) => {
        capturedBody = body;
        return { ok: true };
      },
    } as unknown as PlaneClient;

    const tool: ToolDef = {
      name: 'update_tool',
      description: 'test',
      inputSchema: { type: 'object', properties: {} },
      method: 'POST',
      pathTemplate: '/api/v1/workspaces/{__ws}/projects/{project_id}/issues/',
      pathParams: ['project_id'],
      bodyRenames: { state_id: 'state', parent_id: 'parent' },
    };

    await executeToolDef(tool, mockClient, {
      __ws: 'ws',
      project_id: 'p1',
      state_id: 'state-uuid',
      parent_id: 'parent-uuid',
      name: 'Test Issue',
    });

    expect(capturedBody).toEqual({
      state: 'state-uuid',
      parent: 'parent-uuid',
      name: 'Test Issue',
    });
    expect(capturedBody).not.toHaveProperty('state_id');
    expect(capturedBody).not.toHaveProperty('parent_id');
  });

  it('throws on conflicting body arguments from bodyRenames', async () => {
    const mockClient = {
      post: async () => ({ ok: true }),
    } as unknown as PlaneClient;

    const tool: ToolDef = {
      name: 'update_tool',
      description: 'test',
      inputSchema: { type: 'object', properties: {} },
      method: 'POST',
      pathTemplate: '/api/v1/workspaces/{__ws}/projects/{project_id}/issues/',
      pathParams: ['project_id'],
      bodyRenames: { state_id: 'state' },
    };

    await expect(
      executeToolDef(tool, mockClient, {
        __ws: 'ws',
        project_id: 'p1',
        state_id: 'state-uuid-from-id',
        state: 'state-uuid-direct',
      }),
    ).rejects.toThrow(/Conflicting body arguments.*state_id.*state/);
  });

  it('uses custom handler when provided', async () => {
    let handlerCalled = false;

    const mockClient = {} as PlaneClient;

    const tool: ToolDef = {
      name: 'custom_tool',
      description: 'test',
      inputSchema: { type: 'object', properties: {} },
      method: 'GET',
      pathTemplate: '',
      pathParams: [],
      handler: async () => {
        handlerCalled = true;
        return 'custom result';
      },
    };

    const result = await executeToolDef(tool, mockClient, {});
    expect(handlerCalled).toBe(true);
    expect(result).toBe('custom result');
  });
});
