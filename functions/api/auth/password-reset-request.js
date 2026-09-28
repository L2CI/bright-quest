import { requestFamilyPasswordRecovery, passwordRecoveryErrorResponse } from "../../_lib/family-password-recovery.js";

export async function onRequestPost(context) {
  try {
    return await requestFamilyPasswordRecovery(context);
  } catch (error) {
    return passwordRecoveryErrorResponse(error);
  }
}
