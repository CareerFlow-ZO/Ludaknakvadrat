import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE = "lnk_free_video_day";

function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

export async function GET() {
  const jar = await cookies();
  const usedOn = jar.get(COOKIE)?.value || "";
  const today = todayUTC();

  return NextResponse.json({
    freeAvailable: usedOn !== today,
    usedOn: usedOn || null,
    limitSeconds: 300
  });
}
