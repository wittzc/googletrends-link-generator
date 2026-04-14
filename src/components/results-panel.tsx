"use client";

import { useState } from "react";
import { Copy, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GeneratedLink } from "@/lib/generate-links";
import { cn } from "@/lib/utils";

interface ResultsPanelProps {
  links: GeneratedLink[];
  groupName: string;
  timeRangeLabel: string;
  keyword: string;
}

function LinkCard({ link }: { link: GeneratedLink }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for non-HTTPS
      const el = document.createElement("textarea");
      el.value = link.url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              链接 {link.linkIndex}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {link.countryNames.map((name, i) => (
              <span
                key={link.countries[i]}
                className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
              >
                <span className="font-mono text-gray-400 text-[10px]">{link.countries[i]}</span>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-gray-50 px-3 py-2">
        <p className="text-xs text-gray-500 font-mono break-all leading-relaxed">
          {link.url}
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopy}
          className={cn(
            "flex-1 transition-all",
            copied && "bg-green-100 text-green-700 hover:bg-green-100"
          )}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              已复制
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              复制链接
            </>
          )}
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => window.open(link.url, "_blank")}
          className="flex-1"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          打开链接
        </Button>
      </div>
    </div>
  );
}

export function ResultsPanel({ links, groupName, timeRangeLabel, keyword }: ResultsPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">生成结果</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            关键词「{keyword}」· {groupName} · {timeRangeLabel}
          </p>
        </div>
        {links.length > 1 && (
          <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            已自动拆分为 {links.length} 条链接
          </span>
        )}
      </div>

      <div className="space-y-3">
        {links.map((link) => (
          <LinkCard key={link.linkIndex} link={link} />
        ))}
      </div>
    </div>
  );
}
