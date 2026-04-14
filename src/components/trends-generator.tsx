"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResultsPanel } from "@/components/results-panel";
import { COUNTRY_GROUPS, TIME_RANGES, CountryGroup, TimeRange } from "@/lib/constants";
import { generateTrendsLinks, GeneratedLink } from "@/lib/generate-links";
import { cn } from "@/lib/utils";

export function TrendsGenerator() {
  const [keyword, setKeyword] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<CountryGroup | null>(null);
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([]);
  const [error, setError] = useState("");

  function handleGenerate() {
    setError("");

    if (!keyword.trim()) {
      setError("请输入关键词");
      return;
    }
    if (!selectedTimeRange) {
      setError("请选择时间区间");
      return;
    }
    if (!selectedGroup) {
      setError("请选择国家分组");
      return;
    }

    const links = generateTrendsLinks(
      keyword.trim(),
      selectedTimeRange.value,
      selectedGroup.countries
    );
    setGeneratedLinks(links);
  }

  const isReady = keyword.trim() && selectedTimeRange && selectedGroup;

  return (
    <div className="space-y-6">
      {/* Keyword Input */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">关键词</label>
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="输入关键词，如 happy horse ai"
          onKeyDown={(e) => e.key === "Enter" && isReady && handleGenerate()}
        />
      </div>

      {/* Time Range */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">时间区间</label>
        <div className="flex flex-wrap gap-2">
          {TIME_RANGES.map((tr) => (
            <button
              key={tr.key}
              onClick={() => setSelectedTimeRange(tr)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
                selectedTimeRange?.key === tr.key
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
              )}
            >
              {tr.label}
            </button>
          ))}
        </div>
      </div>

      {/* Country Group */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">国家分组</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COUNTRY_GROUPS.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedGroup(group)}
              className={cn(
                "text-left rounded-xl border p-4 transition-all",
                selectedGroup?.id === group.id
                  ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                  : "border-gray-200 bg-white hover:border-blue-300"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div
                  className={cn(
                    "text-sm font-semibold",
                    selectedGroup?.id === group.id ? "text-blue-700" : "text-gray-900"
                  )}
                >
                  分组 {group.id}
                </div>
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                    selectedGroup?.id === group.id
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  )}
                >
                  {selectedGroup?.id === group.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">{group.name}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {group.countries.map((c) => (
                  <span
                    key={c.code}
                    className="text-[11px] font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded"
                  >
                    {c.code}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{group.scenario}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Generate Button */}
      <Button
        variant="primary"
        size="lg"
        onClick={handleGenerate}
        disabled={!isReady}
        className="w-full"
      >
        <TrendingUp className="h-4 w-4" />
        生成对比链接
      </Button>

      {/* Results */}
      {generatedLinks.length > 0 && (
        <div className="pt-2 border-t border-gray-100">
          <ResultsPanel
            links={generatedLinks}
            groupName={selectedGroup!.name}
            timeRangeLabel={selectedTimeRange!.label}
            keyword={keyword.trim()}
          />
        </div>
      )}
    </div>
  );
}
