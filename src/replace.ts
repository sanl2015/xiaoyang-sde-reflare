import { Middleware } from '../types/middleware';
import { ReplaceEntry } from '../types/replace';

export const useReplace: Middleware = async (context, next) => {
  const { request, response, options } = context;
  if (options.replace === undefined) {
    await next();
    return;
  }

  const path = new URL(request.url).pathname;
  const matches: ReplaceEntry[] = [];
  for (const patch of options.replace) {
    if (patch.replace.length > 0 && (patch.path === undefined || patch.path.test(path))) {
      patch.replace.forEach((entry) => {
        matches.push(entry);
      });
    }
  }

  if (matches.length > 0) {
    let data = await response.text();
    matches.forEach(({ from, to }) => {
      data = data.replaceAll(from, to);
    });
    context.response = new Response(data, response);
  }

  await next();
};
