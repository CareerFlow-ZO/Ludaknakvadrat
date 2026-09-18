import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const FREE_COOKIE = "lnk_free_video_day";
const FREE_LIMIT_SECONDS = 300;

function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

export async function POST(req: Request) {
  const body = await req.json();
  const duration = Number(body?.duration || 0);

  if (!body?.hasImage || !body?.hasAudio) {
    return NextResponse.json({ error: "Upload both an image and a music file." }, { status: 400 });
  }

  const jar = await cookies();
  const today = todayUTC();
  const freeUsedToday = jar.get(FREE_COOKIE)?.value === today;
  const freeEligible = duration > 0 && duration <= FREE_LIMIT_SECONDS && !freeUsedToday;

  if (!freeEligible && !body?.paid) {
    return NextResponse.json({
      error: "payment_required",
      message: duration > FREE_LIMIT_SECONDS
        ? "Songs over 5 minutes require a paid generation."
        : "Your free daily video has already been used."
    }, { status: 402 });
  }

  if (freeEligible) {
    const response = NextResponse.json({
      ok: true,
      free: true,
      demo: true,
      message: "Your free daily AI video has been accepted."
    });

    response.cookies.set(FREE_COOKIE, today, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 36
    });

    return response;
  }

  return NextResponse.json({
    ok: true,
    free: false,
    demo: true,
    message: "Paid AI video accepted."
  });
}
