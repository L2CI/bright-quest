import { familyAuthEnabled, json } from "../../_lib/family-auth.js";
import { recoveryAvailable } from "../../_lib/parent-pin-recovery.js";
import { familyPasswordRecoveryAvailable } from "../../_lib/family-password-recovery.js";

export async function onRequestGet(context) {
  return json({
    enabled: familyAuthEnabled(context.env),
    experienceUpliftEnabled: context.env.BQ_EXPERIENCE_UPLIFT_ENABLED === "true",
    parentPinRecoveryEnabled: recoveryAvailable(context.env),
    familyPasswordRecoveryEnabled: familyPasswordRecoveryAvailable(context.env),
    legacyEnabled: context.env.BQ_LEGACY_API_ENABLED === "true",
    signupEnabled: context.env.BQ_SIGNUP_ENABLED === "true"
  });
}
