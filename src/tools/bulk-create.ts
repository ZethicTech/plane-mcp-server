import type { PlaneClient } from '../plane-client.js';
import { ToolDef } from './registry.js';

const MAX_BULK_ITEMS = 100;
const PACING_MS = 600;
const MAX_RETRIES = 5;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function createOneItem(
  client: PlaneClient,
  projectId: string,
  item: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const apiPath = client.workspacePath(`projects/${projectId}/issues/`);

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await client.post(apiPath, item);
      return result as Record<string, unknown>;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.startsWith('Plane API error 429')) {
        if (attempt === MAX_RETRIES) {
          throw new Error(`Rate limited after ${MAX_RETRIES} retries`, { cause: err });
        }
        const waitSec = Math.min(5 * Math.pow(2, attempt), 60);
        await sleep(waitSec * 1000);
        continue;
      }
      throw err;
    }
  }

  throw new Error('Unexpected: exceeded retry loop');
}

async function handleBulkCreate(
  client: PlaneClient,
  args: Record<string, unknown>,
): Promise<unknown> {
  const projectId = args.project_id as string;
  const items = args.items as Record<string, unknown>[];

  if (!projectId || !UUID_RE.test(projectId)) {
    throw new Error('Invalid project_id: must be a valid UUID');
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('items must be a non-empty array');
  }

  if (items.length > MAX_BULK_ITEMS) {
    throw new Error(`items array exceeds maximum of ${MAX_BULK_ITEMS}`);
  }

  const created: { id: string; name: string; sequence_id: number }[] = [];
  const failures: { index: number; name: string; error: string }[] = [];

  for (let i = 0; i < items.length; i++) {
    try {
      const result = await createOneItem(client, projectId, items[i]);
      created.push({
        id: result.id as string,
        name: result.name as string,
        sequence_id: result.sequence_id as number,
      });
    } catch (err) {
      failures.push({
        index: i,
        name: (items[i].name as string) || `item[${i}]`,
        error: err instanceof Error ? err.message : String(err),
      });
    }

    if (i < items.length - 1) {
      await sleep(PACING_MS);
    }
  }

  const summary = `Created ${created.length} items. Failures: ${failures.length}.`;
  const detail =
    failures.length > 0
      ? `\n${JSON.stringify(created)}\nFailures:\n${JSON.stringify(failures)}`
      : `\n${JSON.stringify(created)}`;

  return summary + detail;
}

export const bulkCreateTools: ToolDef[] = [
  {
    name: 'bulk_create_work_items',
    description:
      'Create multiple work items at once with automatic rate limiting and retry on 429. Pass an array of items — each with the same fields as create_work_item. Returns created IDs and any failures. Use this instead of calling create_work_item in a loop for 10+ items.',
    inputSchema: {
      type: 'object',
      required: ['project_id', 'items'],
      properties: {
        project_id: { type: 'string', description: 'UUID of the project' },
        items: {
          type: 'array',
          description: 'Work items to create',
          items: {
            type: 'object',
            required: ['name'],
            properties: {
              name: { type: 'string' },
              state: { type: 'string', description: 'State UUID' },
              priority: {
                type: 'string',
                enum: ['urgent', 'high', 'medium', 'low', 'none'],
              },
              labels: { type: 'array', items: { type: 'string' } },
              description_html: { type: 'string' },
              parent: { type: 'string', description: 'Parent issue UUID' },
            },
          },
        },
      },
    },
    method: 'POST',
    pathTemplate: '',
    pathParams: [],
    handler: handleBulkCreate,
  },
];
