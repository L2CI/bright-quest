import { familyAuthEnabled, json } from "../../_lib/family-auth.js";

export async function onRequestGet(context) {
  return json({
    enabled: familyAuthEnabled(context.env),
    legacyEnabled: context.env.BQ_LEGACY_API_ENABLED === "true",
    signupEnabled: context.env.BQ_SIGNUP_ENABLED === "true"
  });
}
