import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    created_at: v.number(),
  }),
  pets: defineTable({
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
    userId: v.string(), // Reference to the user who created the pet
    created_at: v.number(),
  }),
  user_preferences: defineTable({
    has_seen_onboarding: v.boolean(),
  }),
});