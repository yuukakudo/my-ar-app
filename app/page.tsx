'use client';

import React, { useState } from 'react';

export default function CreateMemory() {
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);

  // 現在地を取得する関数
  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      {/* ポケポケ風：ガラスのようなヘッダー */}
      <div className="max-w-md mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/40">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">思い出をカプセルに</h1>

        <div className="space-y-6">
          {/* タイトル入力 */}
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">タイトル</label>
            <input 
              type="text" 
              className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              placeholder="例：所沢の夕暮れ"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* メモ入力 */}
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">思い出メモ</label>
            <textarea 
              className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              placeholder="どんなことがあった？"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>

          {/* 位置情報取得ボタン */}
          <button 
            onClick={getGeoLocation}
            className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full shadow-lg shadow-cyan-200 active:scale-95 transition-transform"
          >
            {coords ? `📍 取得完了 (${coords.lat.toFixed(3)})` : '📍 現在地を記録する'}
          </button>

          {/* 写真選択（見た目だけ） */}
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-400 hover:bg-white/50 transition-all cursor-pointer">
            📷 写真をアップロード
          </div>

          {/* 登録ボタン */}
          <button className="w-full py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 transition-colors">
            カプセルを生成する
          </button>
        </div>
      </div>
    </div>
  );
}