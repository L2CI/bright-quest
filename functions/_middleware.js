// The root middleware intentionally covers all Pages requests. A path-specific
// /tools/* function alone can be bypassed by an encoded slash before asset lookup.
// Public game assets, documentation and API handling continue through next().
export function onRequest(context) {
  let pathname;
  try {
    pathname = new URL(context.request.url).pathname;
    for (let depth = 0; depth === 0 || /%[0-9a-f]{2}/i.test(pathname); depth++) {
      if (depth >= 8) throw new Error('Too many encodings');
      pathname = decodeURIComponent(pathname);
    }
    if (/[\u0000-\u001f\u007f]/.test(pathname)) throw new Error('Invalid path');
    const segments = [];
    for (const segment of pathname.replace(/\\/g, '/').split('/')) {
      if (!segment || segment === '.') continue;
      if (segment === '..') segments.pop();
      else segments.push(segment);
    }
    pathname = '/' + segments.join('/');
  } catch {
    return reject(400, 'Invalid path', context.request.method);
  }
  const privatePrefix = /^\/(?:tools|functions|_lib)(?:\/|$)/i.test(pathname);
  const fixture = /^\/__(?:sparkbound|skyforge|beacon|dragon(?:-grove)?)(?:[-_/]|$)/i.test(pathname);
  // Retain Sparkbound's existing answer-bank exclusion, including encoded paths.
  const sparkboundAnswers = /^\/sparkbound(?:\/|$)/i.test(pathname) && /\/content\.js(?:[/.]|$)/i.test(pathname);
  if (privatePrefix || fixture || sparkboundAnswers) return reject(404, 'Not found', context.request.method);
  return context.next();
}

function reject(status, message, method) {
  return new Response(method === 'HEAD' ? null : message, {
    status,
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' }
  });
}
