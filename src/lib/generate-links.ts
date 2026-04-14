import { GOOGLE_TRENDS_BASE_URL, MAX_COMPARE_ITEMS } from "./constants";

export interface GeneratedLink {
  url: string;
  countries: string[];
  countryNames: string[];
  linkIndex: number;
}

export function generateTrendsLinks(
  keyword: string,
  timeRangeValue: string,
  countries: { code: string; name: string }[]
): GeneratedLink[] {
  // Deduplicate by code
  const seen = new Set<string>();
  const unique = countries.filter(({ code }) => {
    if (seen.has(code)) return false;
    seen.add(code);
    return true;
  });

  // Split into chunks of MAX_COMPARE_ITEMS
  const chunks: (typeof unique)[] = [];
  for (let i = 0; i < unique.length; i += MAX_COMPARE_ITEMS) {
    chunks.push(unique.slice(i, i + MAX_COMPARE_ITEMS));
  }

  // Correct Google Trends URL format:
  // date=now+7-d,now+7-d,...&geo=US,ES,DE,...&q=keyword,keyword,...
  // q and geo are comma-separated, positionally matched per comparison item.
  return chunks.map((chunk, idx) => {
    const n = chunk.length;
    const encodedKeyword = keyword.trim().replace(/ /g, "+");
    const encodedDate = timeRangeValue.replace(/ /g, "+");

    const dateParam = Array(n).fill(encodedDate).join(",");
    const geoParam = chunk.map((c) => c.code).join(",");
    const qParam = Array(n).fill(encodedKeyword).join(",");

    const url = `${GOOGLE_TRENDS_BASE_URL}?date=${dateParam}&geo=${geoParam}&q=${qParam}`;

    return {
      url,
      countries: chunk.map((c) => c.code),
      countryNames: chunk.map((c) => c.name),
      linkIndex: idx + 1,
    };
  });
}
