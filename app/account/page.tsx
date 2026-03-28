'use client';

import React from 'react';
import Link from 'next/link';
import GachaCapsule from '../components/GachaCapsule'; // 👈 巨大ガチャカプセルを再利用！

export default function AccountPage() {
  // ダミーデータ（本来はSupabaseのAuthから取得）
  const user = {
    name: "所沢のSE",
    age: 23,
    joined: "2024.04",
    capsulesHandled: 42 // これまで扱った思い出カプセルの数（ダミー）
  };

  const goals = [
    { title: "Java Gold 取得", date: "2026.08", status: "LEARNING" },
    { title: "年収 500万円 達成", date: "2026.12", status: "TARGET" },
    { title: "自作ARアプリ 公開", date: "2026.03", status: "V1.0 DONE!" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 pt-16 font-sans text-slate-900 pb-32">
      <div className="max-w-md mx-auto">
        
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black italic tracking-tighter text-slate-950">
            MY <span className="text-cyan-500">STATUS</span>
          </h1>
          <button className="text-xs font-bold text-slate-400 bg-white px-4 py-2 rounded-full border border-slate-100 active:scale-95">
            EDIT
          </button>
        </div>

        {/* 👤 プロフィール & 巨大ガチャカプセル */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-white mb-8">
          <div className="flex items-center gap-8 mb-8">
            {/* ここで巨大ガチャカプセルを「プロフィールアイコン」として再利用！ */}
            <div className="flex-shrink-0 animate-float-slow">
              <GachaCapsule size="large" active={true} />
            </div>
            
            <div className="flex-grow">
              <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-1">Status: active</p>
              <h2 className="text-2xl font-black text-slate-950 tracking-tight">{user.name}</h2>
              <p className="text-slate-500 text-sm font-semibold">Age: {user.age} / Joined: {user.joined}</p>
            </div>
          </div>

          {/* 実績セクション */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <p className="text-4xl mb-1">💊</p>
              <p className="text-3xl font-black text-cyan-600">{user.capsulesHandled}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capsules</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-center flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-cyan-400 flex items-center justify-center text-cyan-400 text-xl font-bold mb-1">
                G
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Java Gold</p>
            </div>
          </div>
        </div>

        {/* 🎯 2026年 目標リスト */}
        <div className="bg-slate-950 rounded-[2.5rem] p-8 shadow-xl mb-8">
          <h3 className="text-xl font-black text-white italic mb-6 tracking-tight">2026 GOALS</h3>
          
          <div className="space-y-4">
            {goals.map((goal, index) => (
              <div key={index} className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div>
                  <p className="text-sm font-bold text-white">{goal.title}</p>
                  <p className="text-[10px] font-medium text-slate-400">{goal.date} DUE</p>
                </div>
                <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider ${
                  goal.status.includes('DONE') ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-300'
                }`}>
                  {goal.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 設定ボタン類 */}
        <Link href="/" className="block w-full text-center py-4 bg-white rounded-2xl border border-slate-100 font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all text-sm">
          ログアウト
        </Link>

      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}