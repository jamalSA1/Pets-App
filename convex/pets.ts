import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query(async (ctx) => {
  return await ctx.db.query("pets").collect();
});

export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const petId = ctx.db.normalizeId("pets", args.id);
    if (!petId) return null;
  },
});

export const getUserPreference = query(async (ctx) => {
  const preferences = await ctx.db
    .query("user_preferences")
    .first();
  return preferences?.has_seen_onboarding ?? false;
});

export const setUserPreference = mutation(async (ctx) => {
  const existing = await ctx.db
    .query("user_preferences")
    .first();

  if (existing) {
    await ctx.db.patch(existing._id, { has_seen_onboarding: true });
  } else {
    await ctx.db.insert("user_preferences", { has_seen_onboarding: true });
  }
});