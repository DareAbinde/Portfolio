import { del, get, list } from "@vercel/blob";

const retentionMs = 30 * 24 * 60 * 60 * 1000;
const transcriptPrefix = "dare-llm-transcripts/";

async function readJson(pathname: string) {
  const result = await get(pathname, { access: "private" }).catch(() => null);
  if (!result?.stream) return null;
  return new Response(result.stream).json().catch(() => null) as Promise<{ updatedAt?: string } | null>;
}

export async function GET(request: Request) {
  const expectedSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (expectedSecret && authHeader !== "Bearer " + expectedSecret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cutoff = Date.now() - retentionMs;
  let deleted = 0;
  let cursor: string | undefined;
  let hasMore = true;

  while (hasMore) {
    const page = await list({ prefix: transcriptPrefix, cursor, limit: 1000 });
    for (const blob of page.blobs) {
      const data = await readJson(blob.pathname);
      const timestamp = typeof data?.updatedAt === "string" ? Date.parse(data.updatedAt) : blob.uploadedAt?.getTime?.() ?? NaN;
      if (Number.isFinite(timestamp) && timestamp < cutoff) {
        await del(blob.pathname);
        deleted += 1;
      }
    }
    hasMore = page.hasMore;
    cursor = page.cursor;
  }

  console.log("Deleted " + deleted + " expired DARE LLM transcript(s).");
  return Response.json({ deleted });
}

async function sendVercelResponse(response: any, result: Response) {
  result.headers.forEach((value, key) => response.setHeader(key, value));
  response.status(result.status).send(await result.text());
}

export default async function handler(request: any, response: any) {
  if (request.method !== "GET") {
    return response.status(405).json({ error: "Method not allowed" });
  }
  const result = await GET(new Request("https://dareabinde.com/api/cleanup-dare-llm", {
    headers: { authorization: request.headers.authorization || "" },
  }));
  return sendVercelResponse(response, result);
}
