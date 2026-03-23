# Contributing

Thanks for your interest in contributing to the Plane MCP server!

## Prerequisites

- Node.js >= 20
- npm

## Setup

```bash
git clone https://github.com/ZethicTech/plane-mcp-server.git
cd plane-mcp-server
npm install
```

## Development

```bash
# Run in dev mode (requires env vars)
npm run dev

# Type-check
npm run typecheck

# Run tests
npm test

# Lint
npm run lint

# Format
npm run format:fix
```

## Adding a New Tool

1. Find or create the appropriate file in `src/tools/` (e.g., `work-items.ts` for work item tools).

2. Add a `ToolDef` object to the exported array:

```typescript
{
  name: 'verb_noun',                    // e.g. list_work_items, create_cycle
  description: 'When to use this tool, what IDs are needed, and where to get them.',
  inputSchema: {
    type: 'object',
    required: ['project_id'],
    properties: {
      project_id: { type: 'string' },
      // Use nullable('string'), nullableInt(), etc. for optional fields
    },
  },
  method: 'GET',                        // GET, POST, PATCH, DELETE
  pathTemplate: `${WS}/projects/{project_id}/your-endpoint/`,
  pathParams: ['project_id'],
  queryParams: ['cursor', 'per_page'],  // Optional: fields sent as query params
}
```

3. Import and spread the array in `src/server.ts`:

```typescript
import { yourTools } from './tools/your-file.js';

const ALL_TOOLS: ToolDef[] = [
  ...yourTools,
  // ...existing tools
];
```

4. Run `npm run lint && npm test` to verify.

## Tool Description Guidelines

Good descriptions tell the LLM:

- **When** to use the tool
- **What IDs** are needed and **where** to get them
- Any key parameter details (date formats, enum values)

Example: _"Create a new cycle (sprint) in a project. The owned_by field requires a user UUID — get it from get_workspace_members or get_me. Dates should be YYYY-MM-DD format."_

## Code Style

- ESLint + Prettier enforce style automatically
- Run `npm run format:fix` before committing
- TypeScript strict mode is enabled

## Pull Requests

1. Fork the repo and create a feature branch
2. Make your changes
3. Ensure `npm run lint && npm run typecheck && npm test` all pass
4. Open a PR against `main`
