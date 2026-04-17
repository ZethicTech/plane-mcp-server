# Plane MCP

[![npm](https://img.shields.io/npm/v/@zethictech/plane-mcp-server)](https://www.npmjs.com/package/@zethictech/plane-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org)

Connect Claude to your Plane workspace to manage projects, work items, cycles, modules, and more — directly from Claude.

### How is this different from the official Plane MCP?

The [official Plane MCP server](https://github.com/makeplane/plane-mcp-server) is Python-based and supports both cloud and self-hosted Plane instances. It offers OAuth, hosted HTTP endpoints (`mcp.plane.so`), and Redis-backed sessions. This package is a **lightweight Node.js alternative**:

- **Zero infrastructure** — runs locally via `npx`, no Python/Docker/Redis needed
- **Single dependency** — just `@modelcontextprotocol/sdk`, installs in seconds
- **Optimized tool count** — 77 core tools by default (vs 80+ in the official server) tuned for reliable AI model tool selection, with an opt-in extended mode for full 108-tool coverage
- **Bulk operations** — `bulk_create_work_items` with automatic rate-limit handling (not in the official server)

Use the official server if you need OAuth or hosted HTTP transport. Use this one if you want a fast, minimal Node.js MCP that works over stdio.

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
        "DEFAULT_WORKSPACE_SLUG": "your-workspace-slug",
        "PLANE_MCP_EXTENDED": "false"
      }
    }
  }
}
```

> Set `PLANE_MCP_EXTENDED` to `"true"` to enable all 108 tools (admin, archives, intake, time tracking, etc.). Leave as `"false"` or omit for the default 77 core tools.

Restart Claude Desktop after saving.

### Claude Code

```bash
claude mcp add plane \
  --command npx \
  --args "@zethictech/plane-mcp-server" \
  --env PLANE_BASE_URL=https://your-plane-instance.com \
  --env PLANE_API_KEY=YOUR_PLANE_API_KEY \
  --env DEFAULT_WORKSPACE_SLUG=your-workspace-slug \
  --env PLANE_MCP_EXTENDED=false
```

> Add `--env PLANE_MCP_EXTENDED=true` for the full 108-tool set.

### Environment Variables

| Variable                 | Required | Description                                         |
| ------------------------ | -------- | --------------------------------------------------- |
| `PLANE_BASE_URL`         | Yes      | Your Plane instance URL                             |
| `PLANE_API_KEY`          | Yes      | Personal Plane API token                            |
| `DEFAULT_WORKSPACE_SLUG` | Yes      | Workspace slug from your Plane URL                  |
| `PLANE_MCP_EXTENDED`     | No       | Set to `true` to enable all 108 tools (default: 77) |

---

## Available Tools

By default, the server exposes **77 core tools** — optimized for reliable tool selection by AI models. Set `PLANE_MCP_EXTENDED=true` to enable all 108 tools including admin, archive, and niche features.

### Core Tools (always available)

| Category          | Tools                                                                      |
| ----------------- | -------------------------------------------------------------------------- |
| Projects          | list, create, retrieve, update, delete projects; get members               |
| Work Items        | list, search, create, update, delete; retrieve by identifier (e.g. DEV-42) |
| States & Labels   | list, create, retrieve, update, delete states and labels                   |
| Cycles            | list, create, retrieve, update, delete; manage cycle work items; transfer  |
| Modules           | list, create, retrieve, update, delete; manage module work items           |
| Epics             | list, create, retrieve, update, delete epics                               |
| Milestones        | list, create, retrieve, update, delete; manage milestone work items        |
| Initiatives       | list, create, retrieve, update, delete initiatives                         |
| Comments          | list, create, retrieve, update, delete comments on work items              |
| Relations & Links | manage work item relations and external links                              |
| Activities        | list work item activities (audit log)                                      |
| Pages             | create, retrieve pages (workspace or project)                              |
| Workspace         | get current user, get members                                              |
| Bulk Operations   | `bulk_create_work_items` — create many items with rate-limit handling      |

### Extended Tools (`PLANE_MCP_EXTENDED=true`)

| Category             | Tools                                                    |
| -------------------- | -------------------------------------------------------- |
| Project Admin        | get/update project features; project worklog summary     |
| Workspace Admin      | get/update workspace features                            |
| Cycle Archives       | archive, unarchive, list archived cycles                 |
| Module Archives      | archive, unarchive, list archived modules                |
| Work Item Types      | list, create, retrieve, update, delete work item types   |
| Work Item Properties | list, create, retrieve, update, delete custom properties |
| Intake               | list, create, retrieve, update, delete intake work items |
| Time Tracking        | list, create, update, delete work logs                   |
| Activities (extra)   | retrieve individual activity entries                     |

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
