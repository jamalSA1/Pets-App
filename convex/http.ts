import { httpAction, internalAction } from "./_generated/server";
import { httpRouter } from "convex/server";
import { api, internal } from "./_generated/api";

const http = httpRouter();


export const ClerkUsersWebhook = httpAction(async (ctx, request) => {
  const { data, type } = await request.json();

  try {
    switch (type) {
      case 'user.created':
        await ctx.runMutation(api.users.createUser, {
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address ?? "",
          name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
          phoneNumber: data.phone_numbers[0]?.phone_number ?? "",
        });
        break;
    }
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Webhook error", { status: 500 });
  }
});


http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: ClerkUsersWebhook,
});

// https://energetic-panther-715.convex.site/clerk-users-webhook

export default http;