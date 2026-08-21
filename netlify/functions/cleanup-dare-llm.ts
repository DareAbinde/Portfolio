import type { Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const retentionMs = 30 * 24 * 60 * 60 * 1000;

export default async () => {
  const store = getStore("dare-llm-transcripts");
  const cutoff = Date.now() - retentionMs;
  let deleted = 0;

  for await (const page of store.list({ paginate: true })) {
    for (const blob of page.blobs) {
      const record = await store.getWithMetadata(blob.key, { type: "json", consistency: "strong" }).catch(() => null);
      const updatedAt = typeof record?.metadata?.updatedAt === "string" ? Date.parse(record.metadata.updatedAt) : NaN;
      const storedUpdatedAt = record?.data && typeof record.data === "object" && typeof record.data.updatedAt === "string" ? Date.parse(record.data.updatedAt) : NaN;
      const timestamp = Number.isFinite(updatedAt) ? updatedAt : storedUpdatedAt;
      if (Number.isFinite(timestamp) && timestamp < cutoff) {
        await store.delete(blob.key);
        deleted += 1;
      }
    }
  }

  console.log(`Deleted ${deleted} expired DARE LLM transcript(s).`);
  return new Response(JSON.stringify({ deleted }), { headers: { "Content-Type": "application/json" } });
};

export const config: Config = { schedule: "@daily" };
