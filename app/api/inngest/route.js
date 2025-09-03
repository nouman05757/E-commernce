// app/api/inngest/route.js
import { serve } from "inngest/next";
import {
  inngest,
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
} from "@/config/inngest";

// Vercel serverless API route
export const { GET, POST } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdation, syncUserDeletion],
});
