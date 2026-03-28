'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Webcam from 'react-webcam';
import dynamic from 'next/dynamic';
const MapDisplay = dynamic(() => import('./MapDisplay'), { ssr: false });

interface Memory {
  id: string; title: string; memo: string;
  lat: number; lng: number; image_url: string; created_at: string;
}

export default function MemoryListPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isArMode, setIsArMode] = useState(false); // ARモードの状態管理

  useEffect(() => { fetchMemories(); }, []);

  const fetchMemories = async () => {
    setLoading(true);
    const { data } = await supabase.from('memories').select('*').order('created_at', { ascending: false });
    if (data) setMemories(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 font-sans text-slate-900">
      {/* --- 一覧表示部分はさっきと同じ --- */}
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black tracking-tight italic text-slate-800">MY CAPSULES</h1>
          <Link href="/" className="px-5 py-2.5 bg-cyan-500 text-white rounded-full shadow-lg text-sm font-bold">＋ NEW</Link>
        </div>
        <MapDisplay memories={memories} />

        <div className="grid grid-cols-2 gap-4">
          {memories.map((item) => (
            <div key={item.id} onClick={() => setSelectedMemory(item)} className="group bg-white rounded-3xl p-4 shadow-md border border-slate-100 cursor-pointer overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                <div className={`w-2 h-2 rounded-full ${item.image_url ? 'bg-cyan-400 animate-pulse' : 'bg-slate-200'}`}></div>
                <span className="text-[10px] text-slate-300 font-mono">{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
              <h2 className="text-sm font-bold text-slate-700 truncate">{item.title}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* 🖼️ 詳細 & ARモーダル */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md" onClick={() => {setSelectedMemory(null); setIsArMode(false);}}>
          <div className="relative bg-white w-full h-full md:max-w-md md:h-[80vh] md:rounded-[3rem] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            
            {!isArMode ? (
              /* --- 通常の詳細表示 --- */
              <div className="flex flex-col h-full">
                <div className="aspect-[3/4] bg-slate-100 relative">
                  {selectedMemory.image_url ? <img src={selectedMemory.image_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300 italic">No Image</div>}
                  <button onClick={() => setSelectedMemory(null)} className="absolute top-6 right-6 w-10 h-10 bg-black/20 text-white rounded-full flex items-center justify-center font-bold">×</button>
                </div>
                <div className="p-8 flex-1">
                  <h2 className="text-2xl font-black text-slate-800 mb-2">{selectedMemory.title}</h2>
                  <p className="text-slate-600 text-sm mb-6">{selectedMemory.memo || "思い出の記録はありません。"}</p>
                  <button 
                    onClick={() => setIsArMode(true)}
                    className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-black rounded-2xl shadow-xl shadow-cyan-200 animate-bounce"
                  >
                    VIEW IN AR
                  </button>
                </div>
              </div>
            ) : (
              /* --- 🚀 ARモード：カメラ起動 --- */
              <div className="relative w-full h-full bg-black">
                <Webcam 
                  audio={false}
                  className="w-full h-full object-cover"
                  videoConstraints={{ facingMode: "environment" }} // 背面カメラ優先
                />
                
                {/* 浮かんでいるカプセルの演出 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-xl rounded-full border-4 border-white/50 shadow-[0_0_50px_rgba(255,255,255,0.5)] flex items-center justify-center animate-float">
                    <div className="text-4xl">💎</div>
                  </div>
                  <div className="mt-8 px-6 py-3 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 text-center">
                    <p className="text-white font-bold text-lg">{selectedMemory.title}</p>
                    <p className="text-cyan-300 text-[10px] font-mono tracking-widest">CAPSULE CONNECTED</p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsArMode(false)}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 bg-white/20 backdrop-blur-md text-white border border-white/40 rounded-full font-bold"
                >
                  CLOSE AR
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 浮遊アニメーションのCSS（本来はglobals.cssに書くのが理想ですが、練習用にここに） */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}