import { describe, it, expect } from 'vitest';
import { ALL_TOOLS } from '../server.js';
import { getToolAnnotations } from '../tools/registry.js';

describe('ALL_TOOLS', () => {
  it('registers 110 tools', () => {
    expect(ALL_TOOLS.length).toBe(110);
  });

  it('has no duplicate tool names', () => {
    const names = ALL_TOOLS.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('every tool has required fields', () => {
    for (const tool of ALL_TOOLS) {
      expect(tool.name).toBeTruthy();
      expect(tool.description).toBeTruthy();
      expect(tool.inputSchema).toBeTruthy();
      expect(tool.inputSchema.type).toBe('object');
    }
  });

  it('includes key tools', () => {
    const names = new Set(ALL_TOOLS.map((t) => t.name));
    expect(names.has('list_projects')).toBe(true);
    expect(names.has('create_work_item')).toBe(true);
    expect(names.has('get_me')).toBe(true);
    expect(names.has('bulk_create_work_items')).toBe(true);
    expect(names.has('search_work_items')).toBe(true);
    expect(names.has('retrieve_work_item_by_identifier')).toBe(true);
  });
});

describe('getToolAnnotations', () => {
  it('marks list_* tools as read-only', () => {
    const ann = getToolAnnotations('list_projects');
    expect(ann.readOnlyHint).toBe(true);
    expect(ann.destructiveHint).toBe(false);
  });

  it('marks retrieve_* tools as read-only', () => {
    const ann = getToolAnnotations('retrieve_work_item');
    expect(ann.readOnlyHint).toBe(true);
  });

  it('marks get_* tools as read-only', () => {
    const ann = getToolAnnotations('get_me');
    expect(ann.readOnlyHint).toBe(true);
  });

  it('marks search_* tools as read-only', () => {
    const ann = getToolAnnotations('search_work_items');
    expect(ann.readOnlyHint).toBe(true);
  });

  it('marks delete_* tools as destructive', () => {
    const ann = getToolAnnotations('delete_project');
    expect(ann.destructiveHint).toBe(true);
    expect(ann.readOnlyHint).toBe(false);
  });

  it('marks remove_* tools as destructive', () => {
    const ann = getToolAnnotations('remove_work_item_from_cycle');
    expect(ann.destructiveHint).toBe(true);
  });

  it('marks archive_* tools as destructive', () => {
    const ann = getToolAnnotations('archive_cycle');
    expect(ann.destructiveHint).toBe(true);
  });

  it('marks create_* tools as interactive', () => {
    const ann = getToolAnnotations('create_work_item');
    expect(ann.readOnlyHint).toBe(false);
    expect(ann.destructiveHint).toBe(false);
  });

  it('marks update_* tools as interactive', () => {
    const ann = getToolAnnotations('update_project');
    expect(ann.readOnlyHint).toBe(false);
    expect(ann.destructiveHint).toBe(false);
  });
});
