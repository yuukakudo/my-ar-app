'use client';

import React, { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import GachaCapsule from '../components/GachaCapsule';

// 🎯 スクショのカラム名に100%合わせた型定義
interface Memory {
  id: string;
  created_at: string;
  title: string | null;
  memo: string | null;        // 👈 description から memo に修正
  lat: number;               // 👈 latitude から lat に修正
  lng: number;               // 👈 longitude から lng に修正
  image_url: string | null;
  location_name: string | null;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Memory[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    
    // Supabaseからデータを取得
    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .ilike('location_name', `%${query}%`)
      .order('created_at', { ascending: false }); // 💡 最新順に並べる

    if (!error && data) {
      setResults(data as Memory[]); 
    } else {
      setResults([]);
    }
    
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 pb-32">
      <h1 className="text-3xl font-black italic tracking-tighter text-slate-950 mb-8">
        FIND <span className="text-cyan-500">MEMORIES</span>
      </h1>

      {/* 🔍 検索フォーム */}
      <form onSubmit={handleSearch} className="mb-10">
        <div className="relative">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="場所やキーワードを入力..."
            className="w-full py-5 px-8 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border-none font-bold text-slate-900 focus:ring-2 focus:ring-cyan-500 transition-all outline-none"
          />
          <button 
            type="submit" 
            disabled={isSearching}
            className="absolute right-4 top-3 p-2 bg-slate-950 text-white rounded-full w-10 h-10 flex items-center justify-center active:scale-90 transition-transform disabled:opacity-50"
          >
            {isSearching ? '...' : 'Go'}
          </button>
        </div>
      </form>

      {/* 📍 検索結果リスト */}
      <div className="space-y-6">
        {isSearching ? (
          <p className="text-center text-slate-400 font-bold mt-20 animate-pulse">Searching...</p>
        ) : results.length > 0 ? (
          results.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-[2.5rem] shadow-lg border border-white flex items-center gap-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex-shrink-0">
                <GachaCapsule size="small" active={true} />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">
                  {item.title || 'Memory'} 
                </span>
                <h4 className="text-xl font-black text-slate-900 tracking-tight">
                  {item.location_name || 'Unknown Location'}
                </h4>
                {/* 💡 memo を表示 */}
                <p className="text-sm text-slate-500 font-semibold">{item.memo}</p>
                {/* 💡 lat / lng を表示（?. は不要になりました） */}
                <p className="text-[8px] text-slate-300 mt-1 font-mono uppercase">
                  Location: {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
                </p>
              </div>
            </div>
          ))
        ) : (
          query && !isSearching && (
            <div className="text-center mt-20">
              <p className="text-4xl mb-4">🏮</p>
              <p className="text-slate-400 font-bold">No memories found in "{query}"...</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}