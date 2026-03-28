'use client';

import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import Link from 'next/link';
import GachaCapsule from './components/GachaCapsule';

export default function ArHomePage() {
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでのみ実行（ハイドレーションエラー防止）
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* 🎥 背景：ARカメラ */}
      <Webcam
        audio={false}
        className="absolute inset-0 w-full h-full object-cover"
        videoConstraints={{ facingMode: "environment" }}
      />

      {/* ✨ 演出：画面中央に浮かぶメインカプセル */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="animate-float-slow">
          {/* 💡 ここでさっきのコンポーネントを large サイズで呼び出す！ */}
          <GachaCapsule size="large" active={true} />
        </div>
        
        <div className="mt-12 px-6 py-2 bg-black/30 backdrop-blur-lg rounded-full border border-white/20">
          <p className="text-white font-black tracking-[0.2em] text-[10px] uppercase">
            Scanning Tokorozawa...
          </p>
        </div>
      </div>

      {/* 📍 投稿ボタン（フローティング） */}
      <div className="absolute bottom-28 left-0 right-0 flex justify-center px-8">
        <Link 
          href="/create" 
          className="w-full max-w-xs py-5 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-black rounded-[2rem] shadow-[0_10px_40px_rgba(6,182,212,0.4)] text-center text-lg active:scale-95 transition-transform"
        >
          MEMORIZE HERE
        </Link>
      </div>

      {/* 💡 装飾：UIオーバーレイ */}
      <div className="absolute top-12 left-8">
        <h1 className="text-white font-black italic text-2xl tracking-tighter drop-shadow-md">
          TOKOROZAWA<br/><span className="text-cyan-400">FIELD</span>
        </h1>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(8deg); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}