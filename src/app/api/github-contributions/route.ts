import { NextResponse } from "next/server";

const username = "honore-models";
const sourceUrl = `https://github-contributions-api.jogruber.de/v4/${username}?y=last`;

export async function GET() {
  try {
    const response = await fetch(sourceUrl, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`GitHub contribution service returned ${response.status}`);
    }

    const data = await response.json();
    const contributions = Array.isArray(data.contributions)
      ? data.contributions.map(
          (day: { date?: unknown; count?: unknown; level?: unknown }) => ({
            date: typeof day.date === "string" ? day.date : "",
            count: typeof day.count === "number" ? day.count : 0,
            level:
              typeof day.level === "number" && day.level >= 0 && day.level <= 4
                ? day.level
                : 0,
          })
        )
      : [];

    if (!contributions.length) throw new Error("No contribution data returned");

    return NextResponse.json(
      {
        username,
        total: contributions.reduce((sum: number, day: { count: number }) => sum + day.count, 0),
        contributions,
      },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch {
    return NextResponse.json(
      { error: "GitHub activity is temporarily unavailable." },
      { status: 502 }
    );
  }
}
