import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("pets").collect()
  }
});

export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const petId = ctx.db.normalizeId("pets", args.id);
    if (!petId) return null;
    return await ctx.db.get(petId);
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

export const create = mutation({
  args: {
    name: v.string(),
    species: v.string(),
    gender: v.string(),
    color: v.string(),
    age: v.number(),
    price: v.number(),
    description: v.string(),
    images: v.array(v.string()),
    image_url: v.string(),
    video: v.string(),
    userId: v.string(),
    storageId: v.optional(v.string()), // Add this line
  },
  handler: async (ctx, args) => {
    // Get the storage URL if storageId is provided
    let imageUrl = args.image_url;
    if (args.storageId) {
      const storageUrl = await ctx.storage.getUrl(args.storageId);
      if (storageUrl) {
        imageUrl = storageUrl;
      }
    }

    return await ctx.db.insert("pets", {
      ...args,
      image_url: imageUrl,
      created_at: Date.now(),
    });
  },
});