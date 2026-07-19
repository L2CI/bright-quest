import { assertFamilyAuthEnabled, errorResponse, getSession, json, rotateSession, sessionCookie } from "../../_lib/family-auth.js";

export async function onRequestPost(context) {
  try {
    assertFamilyAuthEnabled(context.env);
    const session = await getSession(context);
    const rotated = await rotateSession(context.env, session, null);
    return json({ ok: true }, 200, { "set-cookie": sessionCookie(rotated.token, rotated.expires, context.request) });
  } catch (error) {
    return errorResponse(error);
  }
}
