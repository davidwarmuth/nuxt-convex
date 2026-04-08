import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => ctx.db.query("tasks").collect(),
});

export const getByStatus = query({
  args: { isCompleted: v.boolean() },
  handler: async (ctx, { isCompleted }) => ctx.db.query("tasks").filter((q) => q.eq(q.field("isCompleted"), isCompleted)).collect(),
});

export const create = mutation({
  args: { text: v.string() },
  handler: async (ctx, { text }) =>
    await ctx.db.insert("tasks", { text, isCompleted: false }),
});

export const update = mutation({
  args: { id: v.id("tasks"), text: v.string(), isCompleted: v.boolean() },
  handler: async (ctx, { id, text, isCompleted }) =>
    await ctx.db.patch(id, { text, isCompleted }),
});

export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, { id }) => await ctx.db.delete(id),
});
