#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from '../src/server.js';
import { PlaneClient } from '../src/plane-client.js';

const PLANE_BASE_URL = process.env.PLANE_BASE_URL || '';
const DEFAULT_WORKSPACE_SLUG = process.env.DEFAULT_WORKSPACE_SLUG || '';
const PLANE_API_KEY = process.env.PLANE_API_KEY || '';

if (!PLANE_BASE_URL) {
  console.error('FATAL: PLANE_BASE_URL environment variable is required');
  process.exit(1);
}
if (!PLANE_API_KEY) {
  console.error('FATAL: PLANE_API_KEY environment variable is required');
  process.exit(1);
}
if (!DEFAULT_WORKSPACE_SLUG) {
  console.error('FATAL: DEFAULT_WORKSPACE_SLUG environment variable is required');
  process.exit(1);
}

const client = new PlaneClient({
  baseUrl: PLANE_BASE_URL,
  workspaceSlug: DEFAULT_WORKSPACE_SLUG,
  apiKey: PLANE_API_KEY,
});

const server = createServer(() => client);
const transport = new StdioServerTransport();
await server.connect(transport);
