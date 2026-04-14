import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Google Trends 多国家对比链接生成器",
  description:
    "输入关键词，选择时间区间和国家分组，快速生成 Google Trends 对比链接。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50 antialiased">{children}</body>
    </html>
  );
}
