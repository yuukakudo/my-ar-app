'use client';

import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from 'next/navigation'; // Linkの代わりにuseRouterを使用
import GachaCapsule from './components/GachaCapsule';

export default function ArHomePage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🌍 座標から地名を特定して保存画面へ飛ばすメインロジック
  const handleMemorize = () => {
    if (!navigator.geolocation) {
      alert("位置情報がサポートされていません");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        // 逆ジオコーディングAPI（OpenStreetMap）を叩く
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
          { headers: { 'Accept-Language': 'ja' } }
        );
        const data = await res.json();
        const cityName = data.address.city || data.address.town || data.address.village || data.address.suburb || "不明な地点";

        // クエリパラメータに緯度・経度・特定した地名を乗せて /create へ遷移
        // これで /create 側のページで地名を表示・保存できるようになります！
        router.push(`/create?lat=${latitude}&lng=${longitude}&location=${encodeURIComponent(cityName)}`);
      } catch (error) {
        console.error("地名取得エラー:", error);
        router.push(`/create?lat=${latitude}&lng=${longitude}`); // 失敗しても座標だけは渡す
      }
    }, (error) => {
      alert("位置情報の取得に失敗しました");
      setLoading(false);
    });
  };

  if (!mounted) return null;

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      <Webcam
        audio={false}
        className="absolute inset-0 w-full h-full object-cover"
        videoConstraints={{ facingMode: "environment" }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="animate-float-slow">
          <GachaCapsule size="large" active={true} />
        </div>
        
        <div className="mt-12 px-6 py-2 bg-black/30 backdrop-blur-lg rounded-full border border-white/20">
          <p className="text-white font-black tracking-[0.2em] text-[10px] uppercase">
            {loading ? 'Analyzing Location...' : 'Scanning Tokorozawa...'}
          </p>
        </div>
      </div>

      {/* 📍 投稿ボタン：Linkからbuttonに変更してロジックを噛ませる */}
      <div className="absolute bottom-28 left-0 right-0 flex justify-center px-8">
        <button 
          onClick={handleMemorize}
          disabled={loading}
          className="w-full max-w-xs py-5 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-black rounded-[2rem] shadow-[0_10px_40px_rgba(6,182,212,0.4)] text-center text-lg active:scale-95 transition-transform disabled:opacity-50"
        >
          {loading ? 'GETTING GEO...' : 'MEMORIZE HERE'}
        </button>
      </div>

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