import { mutation, query } from "./_generated/server";

export const list = query(async (ctx) => {
  return await ctx.db.query("pets").collect();
});

export const getById = query(async (ctx, { id }: { id: string }) => {
  return await ctx.db.get(id as any);
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