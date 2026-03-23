# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- ESLint 9 + Prettier for code quality enforcement
- Lint and format checks in CI pipeline
- Node 20/22 test matrix in CI
- npm audit in CI for vulnerability detection
- `exports` field in package.json for proper ESM resolution
- TypeScript declaration files (.d.ts) in published package
- Improved tool descriptions with LLM guidance (when to use, required IDs, cross-references)
- CHANGELOG.md
- CONTRIBUTING.md

### Changed

- Enhanced tool descriptions across work-items, states, labels, workspace, cycles, modules, epics, milestones, relations, and work-logs

## [1.0.5] - 2025-06-01

### Added

- Auto-create GitHub Release on npm publish

### Fixed

- Match repository URL casing to GitHub org (ZethicTech)

## [1.0.4] - 2025-05-31

### Fixed

- OIDC trusted publishing for npm (upgraded npm CLI, fixed permissions)

## [1.0.3] - 2025-05-31

### Changed

- Switch to OIDC trusted publishing instead of npm token

## [1.0.2] - 2025-05-30

### Added

- Tests, CI/CD pipeline, CLI flags, and package metadata

## [1.0.0] - 2025-05-30

### Added

- Pure TypeScript rewrite of Plane MCP server
- 110 tools covering projects, work items, states, labels, cycles, modules, epics, milestones, initiatives, intake, comments, relations, links, activities, properties, types, work logs, pages, and workspace
- Declarative ToolDef pattern for consistent tool definitions
- PlaneClient HTTP client with native fetch
- Bulk create with rate limiting (600ms pacing) and exponential backoff on 429
- Tool annotations (read-only, destructive, interactive)
- Automatic workspace slug injection
- Null stripping from request bodies
- 5MB response size limit
- CLI entry point (`plane-mcp-server`)

[Unreleased]: https://github.com/ZethicTech/plane-mcp-server/compare/v1.0.5...HEAD
[1.0.5]: https://github.com/ZethicTech/plane-mcp-server/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/ZethicTech/plane-mcp-server/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/ZethicTech/plane-mcp-server/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/ZethicTech/plane-mcp-server/compare/v1.0.0...v1.0.2
[1.0.0]: https://github.com/ZethicTech/plane-mcp-server/releases/tag/v1.0.0
