export const MAX_COMPARE_ITEMS = 5;

export const GOOGLE_TRENDS_BASE_URL = "https://trends.google.com/trends/explore";

export interface TimeRange {
  key: string;
  label: string;
  value: string;
}

export const TIME_RANGES: TimeRange[] = [
  { key: "now-1d", label: "过去 1 天", value: "now 1-d" },
  { key: "now-7d", label: "过去 7 天", value: "now 7-d" },
  { key: "today-1m", label: "过去 30 天", value: "today 1-m" },
  { key: "today-3m", label: "过去 90 天", value: "today 3-m" },
  { key: "today-12m", label: "过去 12 个月", value: "today 12-m" },
  { key: "today-5y", label: "过去 5 年", value: "today 5-y" },
];

export interface Country {
  code: string;
  name: string;
  language: string;
}

export interface CountryGroup {
  id: string;
  name: string;
  description: string;
  scenario: string;
  countries: Country[];
}

export const COUNTRY_GROUPS: CountryGroup[] = [
  {
    id: "A",
    name: "发达市场高价值语言组",
    description: "看关键词是否进入核心发达市场与高价值语言环境",
    scenario: "判断是否优先做高价值语言版本 · 判断词是否进入成熟市场",
    countries: [
      { code: "US", name: "美国", language: "英语" },
      { code: "ES", name: "西班牙", language: "西班牙语" },
      { code: "DE", name: "德国", language: "德语" },
      { code: "FR", name: "法国", language: "法语" },
      { code: "JP", name: "日本", language: "日语" },
    ],
  },
  {
    id: "B",
    name: "搜索体量扩散组",
    description: "看关键词是否在主要语言与较大搜索人口市场形成扩散",
    scenario: "判断词是否开始跨语言扩散 · 判断哪些语言更值得先铺 SEO",
    countries: [
      { code: "US", name: "美国", language: "英语" },
      { code: "MX", name: "墨西哥", language: "西班牙语" },
      { code: "BR", name: "巴西", language: "葡萄牙语" },
      { code: "FR", name: "法国", language: "法语" },
      { code: "DE", name: "德国", language: "德语" },
    ],
  },
];
