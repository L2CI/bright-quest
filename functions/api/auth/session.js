import { assertFamilyAuthEnabled, clearSessionCookie, errorResponse, getSession, json, sessionSummary, sha256 } from "../../_lib/family-auth.js";

export async function onRequestGet(context) {
  try {
    assertFamilyAuthEnabled(context.env);
    const session = await getSession(context);
    return json(await sessionSummary(context.env, session));
  } catch (error) {
    if (error.status === 401) return json({ authenticated: false });
    return errorResponse(error);
  }
}

export async function onRequestDelete(context) {
  try {
    assertFamilyAuthEnabled(context.env);
    const cookie = context.request.headers.get("cookie") || "";
    const token = cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith("bq_session="))?.slice(11) || "";
    if (token) await context.env.DB.prepare("DELETE FROM family_sessions WHERE id = ?").bind(await sha256(token)).run();
    return json({ ok: true }, 200, { "set-cookie": clearSessionCookie(context.request) });
  } catch (error) {
    return errorResponse(error);
  }
}
