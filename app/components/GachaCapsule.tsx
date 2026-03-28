'use client';

// 🔵 どこでも使える「ガチャカプセル」部品
export default function GachaCapsule({ size = "medium", active = true }) {
  // サイズ設定（タブ用は小さめ、メイン用は大きく）
  const sizeClass = size === "large" ? "w-40 h-40 border-[6px]" : "w-7 h-7 border-2";
  const innerClass = size === "large" ? "h-[19px] top-[75px]" : "h-[3px] top-[13px]";
  const lightClass = size === "large" ? "w-6 h-6 top-4 right-4" : "w-1.5 h-1.5 top-1.5 right-1.5";

  return (
    <div className={`relative ${sizeClass} rounded-full transition-all duration-500 shadow-2xl ${
      active ? 'border-cyan-400 bg-cyan-100/40 backdrop-blur-sm' : 'border-slate-300 bg-white'
    }`}>
      {/* 上半球（色付き部分） */}
      <div className={`absolute top-0 left-0 right-0 bottom-1/2 rounded-t-full ${
        active ? 'bg-cyan-400/80' : 'bg-slate-300'
      }`}></div>
      
      {/* 真ん中の合わせ目 */}
      <div className={`absolute left-[-4px] right-[-4px] bg-white border-y border-slate-300/50 ${innerClass}`}></div>

      {/* プラスチックの光沢 */}
      <div className={`absolute bg-white/60 rounded-full ${lightClass}`}></div>
    </div>
  );
}