import { requestParentPinRecovery, recoveryErrorResponse } from "../../_lib/parent-pin-recovery.js";

export async function onRequestPost(context) {
  try {
    return await requestParentPinRecovery(context);
  } catch (error) {
    return recoveryErrorResponse(error);
  }
}
