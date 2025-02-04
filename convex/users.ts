import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrUpdateUser = mutation({
  args: {
    email: v.string(),
    phoneNumber: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .first();

    if (existingUser) {
      return await ctx.db.patch(existingUser._id, {
        email: args.email,
        phoneNumber: args.phoneNumber,
      });
    }

    return await ctx.db.insert("users", {
      name: "",
      email: args.email,
      clerkId: args.clerkId,
      phoneNumber: args.phoneNumber,
      created_at: Date.now()
    });
  },
});

export const getUser = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();
  },
});

export const syncUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      return await ctx.db.patch(existingUser._id, {
        clerkId: args.clerkId,
        name: args.name,
      });
    }

    return await ctx.db.insert("users", {
      ...args,
      phoneNumber: "",
      created_at: Date.now(),
    });
  },
});