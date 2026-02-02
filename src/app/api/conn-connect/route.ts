import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing env vars",
        hasUrl: Boolean(url),
        hasServiceKey: Boolean(serviceKey),
      },
      { status: 500 }
    );
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });

  // Minimal connectivity check:
  // If you haven't created tables yet, we can still hit the API by querying a known system view
  // But easiest is to just attempt a no-op call on a table you know exists.
  // If you don't have tables yet, create a tiny 'healthcheck' table (instructions below).
  const { data, error } = await supabase.from("healthcheck").select("id").limit(1);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, sample: data ?? [] });
}
