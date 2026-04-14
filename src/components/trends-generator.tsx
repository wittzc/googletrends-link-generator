"use client";

import { useState, useRef, useEffect } from "react";
import { TrendingUp, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResultsPanel } from "@/components/results-panel";
import { COUNTRY_GROUPS, TIME_RANGES, CountryGroup, TimeRange } from "@/lib/constants";
import { generateTrendsLinks, GeneratedLink } from "@/lib/generate-links";
import { cn } from "@/lib/utils";

const HISTORY_KEY = "gt_keyword_history";
const MAX_HISTORY = 8;

function loadHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveToHistory(keyword: string) {
  const prev = loadHistory().filter((k) => k !== keyword);
  const next = [keyword, ...prev].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}

function removeFromHistory(keyword: string) {
  const next = loadHistory().filter((k) => k !== keyword);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}

export function TrendsGenerator() {
  const [keyword, setKeyword] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<CountryGroup | null>(null);
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([]);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load history on mount (client-only)
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setShowHistory(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredHistory = keyword.trim()
    ? history.filter((k) => k.toLowerCase().includes(keyword.toLowerCase()) && k !== keyword.trim())
    : history;

  function handleGenerate() {
    setError("");
    setShowHistory(false);

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

    saveToHistory(keyword.trim());
    setHistory(loadHistory());

    const links = generateTrendsLinks(
      keyword.trim(),
      selectedTimeRange.value,
      selectedGroup.countries
    );
    setGeneratedLinks(links);
  }

  function handleSelectHistory(kw: string) {
    setKeyword(kw);
    setShowHistory(false);
    inputRef.current?.focus();
  }

  function handleRemoveHistory(e: React.MouseEvent, kw: string) {
    e.stopPropagation();
    removeFromHistory(kw);
    setHistory(loadHistory());
  }

  const isReady = keyword.trim() && selectedTimeRange && selectedGroup;

  return (
    <div className="space-y-6">
      {/* Keyword Input */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">关键词</label>
        <div className="relative">
          <Input
            ref={inputRef}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="输入关键词，如 happy horse ai"
            onFocus={() => history.length > 0 && setShowHistory(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && isReady) handleGenerate();
              if (e.key === "Escape") setShowHistory(false);
            }}
          />

          {/* History Dropdown */}
          {showHistory && filteredHistory.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden"
            >
              <div className="px-3 py-1.5 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  最近输入
                </span>
              </div>
              {filteredHistory.map((kw) => (
                <div
                  key={kw}
                  className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer group"
                  onMouseDown={() => handleSelectHistory(kw)}
                >
                  <span className="text-sm text-gray-700">{kw}</span>
                  <button
                    className="text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded"
                    onMouseDown={(e) => handleRemoveHistory(e, kw)}
                    title="删除"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
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
