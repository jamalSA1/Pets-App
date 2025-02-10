import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  args: {
    contentType: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.generateUploadUrl();
    return url;  // Return the URL directly
  },
});

export const getUrl = query({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.storage.getUrl(args.storageId);
    } catch (error) {
      console.error('Error getting URL:', error);
      return null;
    }
  },
});