# Plane MCP

[![npm](https://img.shields.io/npm/v/@zethictech/plane-mcp-server)](https://www.npmjs.com/package/@zethictech/plane-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org)

Connect Claude to your Plane workspace to manage projects, work items, cycles, modules, and more — directly from Claude.

## Prerequisites

You need a **Plane API key**. To generate one:

1. Go to `https://<your-plane-host>/<workspace>/settings/account/api-tokens`
2. Click **Add personal access token**
3. Copy the token

You also need your **workspace slug** (the URL path segment for your workspace, e.g. `my-workspace`).

---

## Setup

Install the package from npm and configure Claude Desktop or Claude Code to use it. The MCP server runs locally on each user's machine — no hosted infrastructure required.

### How it works

```
Your machine                              Cloud
┌─────────────────────────────┐
│ Claude Desktop / Claude Code│
│   ↕ stdio (stdin/stdout)    │
│ plane-mcp-server (Node.js)  │ ──HTTP──→  Plane Instance
└─────────────────────────────┘            (plane.company.com)
```

Each user runs the server locally via `npx`. The server receives tool calls from Claude over stdio and calls the Plane REST API directly using the user's API key.

### Claude Desktop

Add to your `claude_desktop_config.json`:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "plane": {
      "command": "npx",
      "args": ["-y", "@zethictech/plane-mcp-server"],
      "env": {
        "PLANE_BASE_URL": "https://your-plane-instance.com",
        "PLANE_API_KEY": "YOUR_PLANE_API_KEY",
        "DEFAULT_WORKSPACE_SLUG": "your-workspace-slug"
      }
    }
  }
}
```

Restart Claude Desktop after saving.

### Claude Code

```bash
claude mcp add plane \
  --command npx \
  --args "@zethictech/plane-mcp-server" \
  --env PLANE_BASE_URL=https://your-plane-instance.com \
  --env PLANE_API_KEY=YOUR_PLANE_API_KEY \
  --env DEFAULT_WORKSPACE_SLUG=your-workspace-slug
```

### Environment Variables

| Variable                 | Required | Description                        |
| ------------------------ | -------- | ---------------------------------- |
| `PLANE_BASE_URL`         | Yes      | Your Plane instance URL            |
| `PLANE_API_KEY`          | Yes      | Personal Plane API token           |
| `DEFAULT_WORKSPACE_SLUG` | Yes      | Workspace slug from your Plane URL |

---

## Available Tools (110)

| Category             | Tools                                                                             |
| -------------------- | --------------------------------------------------------------------------------- |
| Projects             | list, create, update, delete projects; get/update features; get members           |
| Work Items           | list, search, create, update, delete; retrieve by identifier (e.g. DEV-42)        |
| Work Item Types      | list, create, update, delete work item types                                      |
| Work Item Properties | list, create, update, delete custom properties                                    |
| States & Labels      | list, create, update, delete states and labels                                    |
| Cycles               | list, create, update, delete, archive/unarchive cycles; manage cycle work items   |
| Modules              | list, create, update, delete, archive/unarchive modules; manage module work items |
| Epics                | list, create, update, delete epics                                                |
| Milestones           | list, create, update, delete milestones; manage milestone work items              |
| Initiatives          | list, create, update, delete initiatives                                          |
| Intake               | list, create, update, delete intake work items                                    |
| Comments             | list, create, update, delete comments on work items                               |
| Relations & Links    | manage work item relations and external links                                     |
| Time Tracking        | create, update, list, delete work logs; get project worklog summary               |
| Pages                | create, retrieve project and workspace pages                                      |
| Workspace            | get current user, get members, get/update workspace features                      |
| Bulk Operations      | `bulk_create_work_items` — create many items with automatic rate-limit handling   |

---

## Troubleshooting

**Server not starting?**

- Verify all three environment variables are set (`PLANE_BASE_URL`, `PLANE_API_KEY`, `DEFAULT_WORKSPACE_SLUG`)
- Check that your Plane instance URL has no trailing slash
- Run `npx @zethictech/plane-mcp-server --version` to verify the package loads

**Stale npx cache?**

```bash
npx --yes @zethictech/plane-mcp-server
```

**API errors?**

- Ensure your API key is valid and has access to the workspace
- Check that the workspace slug matches the URL path in your Plane instance

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions and how to add new tools.

## License

MIT
