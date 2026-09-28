import { completeParentPinRecovery, recoveryErrorResponse } from "../../_lib/parent-pin-recovery.js";

export async function onRequestPost(context) {
  try {
    return await completeParentPinRecovery(context);
  } catch (error) {
    return recoveryErrorResponse(error);
  }
}
