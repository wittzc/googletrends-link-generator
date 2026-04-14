import { TrendsGenerator } from "@/components/trends-generator";

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Google Trends 多国家对比链接生成器
          </h1>
          <p className="text-gray-500 text-base">
            输入关键词，选择时间区间和国家分组，快速生成 Google Trends 对比链接
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <TrendsGenerator />
        </div>

        {/* Footer Disclaimers */}
        <div className="mt-6 rounded-xl bg-amber-50 border border-amber-100 p-4 space-y-1.5">
          <p className="text-xs font-medium text-amber-800">使用说明</p>
          <ul className="space-y-1">
            <li className="text-xs text-amber-700 flex items-start gap-1.5">
              <span className="mt-0.5 shrink-0">·</span>
              Google Trends 显示的是相对搜索兴趣，不代表实际搜索量
            </li>
            <li className="text-xs text-amber-700 flex items-start gap-1.5">
              <span className="mt-0.5 shrink-0">·</span>
              单条链接最多支持 5 个对比项，超出时自动拆分为多条链接
            </li>
            <li className="text-xs text-amber-700 flex items-start gap-1.5">
              <span className="mt-0.5 shrink-0">·</span>
              如关键词过冷，Google Trends 可能无法正常出图，建议切换更长时间区间
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
