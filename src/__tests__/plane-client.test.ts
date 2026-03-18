import { describe, it, expect } from 'vitest';
import { PlaneClient } from '../plane-client.js';

describe('PlaneClient', () => {
  const client = new PlaneClient({
    baseUrl: 'https://plane.example.com',
    workspaceSlug: 'my-workspace',
    apiKey: 'test-key',
  });

  it('strips trailing slash from baseUrl', () => {
    const c = new PlaneClient({
      baseUrl: 'https://plane.example.com/',
      workspaceSlug: 'ws',
      apiKey: 'key',
    });
    expect(c.workspacePath('projects/')).toBe('/api/v1/workspaces/ws/projects/');
  });

  it('builds workspace paths', () => {
    expect(client.workspacePath('projects/')).toBe(
      '/api/v1/workspaces/my-workspace/projects/',
    );
  });

  it('builds workspace paths stripping leading slash', () => {
    expect(client.workspacePath('/members/')).toBe(
      '/api/v1/workspaces/my-workspace/members/',
    );
  });

  it('returns workspace slug', () => {
    expect(client.getWorkspaceSlug()).toBe('my-workspace');
  });
});
