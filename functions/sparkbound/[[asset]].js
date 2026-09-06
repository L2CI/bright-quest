// Keep answer-bearing source server-only even while the Pages asset directory is '.'.
export function onRequest(context) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(context.request.url).pathname).replace(/\/{2,}/g, "/");
  } catch {
    return new Response("Invalid path", { status: 400 });
  }
  if (/\/content\.js(?:[/.]|$)/i.test(pathname)) {
    return new Response("Not found", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" }
    });
  }
  return context.next();
}
