import type { PlaneClient } from '../plane-client.js';

export interface ToolDef {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  pathTemplate: string;
  pathParams: string[];
  queryParams?: string[];
  handler?: (client: PlaneClient, args: Record<string, unknown>) => Promise<unknown>;
}

function annotationsForTool(name: string) {
  if (/^(list_|retrieve_|get_|search_)/.test(name)) {
    return { readOnlyHint: true, destructiveHint: false, openWorldHint: true };
  }
  if (/^(delete_|remove_|archive_)/.test(name)) {
    return { readOnlyHint: false, destructiveHint: true, openWorldHint: true };
  }
  return { readOnlyHint: false, destructiveHint: false, openWorldHint: true };
}

export const getToolAnnotations = annotationsForTool;

function buildPath(template: string, args: Record<string, unknown>): string {
  let path = template;
  for (const [key, value] of Object.entries(args)) {
    path = path.replace(`{${key}}`, String(value));
  }
  return path;
}

export async function executeToolDef(
  def: ToolDef,
  client: PlaneClient,
  args: Record<string, unknown>,
): Promise<unknown> {
  if (def.handler) {
    return def.handler(client, args);
  }

  const pathArgs: Record<string, unknown> = {};
  for (const p of def.pathParams) {
    pathArgs[p] = args[p];
  }
  // Always inject workspace slug for path template substitution
  if (args.__ws) {
    pathArgs.__ws = args.__ws;
  }

  const queryParams: Record<string, string> = {};
  if (def.queryParams) {
    for (const q of def.queryParams) {
      if (args[q] !== undefined && args[q] !== null) {
        queryParams[q] = String(args[q]);
      }
    }
  }

  // Params object pattern: some tools pass a generic `params` dict as query params
  if (args.params && typeof args.params === 'object' && !Array.isArray(args.params)) {
    for (const [k, v] of Object.entries(args.params as Record<string, unknown>)) {
      if (v !== undefined && v !== null) {
        queryParams[k] = String(v);
      }
    }
  }

  const bodyArgs: Record<string, unknown> = {};
  const skipKeys = new Set([...def.pathParams, ...(def.queryParams || []), 'params', '__ws']);
  for (const [key, value] of Object.entries(args)) {
    if (!skipKeys.has(key) && value !== undefined && value !== null) {
      bodyArgs[key] = value;
    }
  }

  const path = buildPath(def.pathTemplate, pathArgs);

  switch (def.method) {
    case 'GET':
      return client.get(path, Object.keys(queryParams).length > 0 ? queryParams : undefined);
    case 'POST':
      return client.post(path, bodyArgs);
    case 'PATCH':
      return client.patch(path, bodyArgs);
    case 'DELETE':
      return client.delete(path);
  }
}

export function nullable(type: string): Record<string, unknown> {
  return { anyOf: [{ type }, { type: 'null' }], default: null };
}

export function nullableInt(): Record<string, unknown> {
  return { anyOf: [{ type: 'integer' }, { type: 'null' }], default: null };
}

export function nullableNum(): Record<string, unknown> {
  return { anyOf: [{ type: 'number' }, { type: 'null' }], default: null };
}

export function nullableBool(): Record<string, unknown> {
  return { anyOf: [{ type: 'boolean' }, { type: 'null' }], default: null };
}

export function nullableStringArray(): Record<string, unknown> {
  return { anyOf: [{ items: { type: 'string' }, type: 'array' }, { type: 'null' }], default: null };
}

export function nullableObjectArray(): Record<string, unknown> {
  return {
    anyOf: [
      { items: { additionalProperties: true, type: 'object' }, type: 'array' },
      { type: 'null' },
    ],
    default: null,
  };
}

export function nullableObject(): Record<string, unknown> {
  return {
    anyOf: [{ additionalProperties: true, type: 'object' }, { type: 'null' }],
    default: null,
  };
}
