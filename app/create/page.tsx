'use client';

import React, { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';

export default function CreateMemory() {
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // 画像ファイル用
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // プレビュー用
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 現在地取得
  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  };

  // 画像が選択された時の処理
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // 画面に仮表示するためのURL
    }
  };

  // 保存処理
  const handleSave = async () => {
    if (!title || !coords || !imageFile) return alert('タイトル、位置情報、写真は必須だよ！');
    setLoading(true);

    try {
      // 1. 画像を Storage にアップロード
      const fileExtension = imageFile.name.split('.').pop(); // jpgとかpngを取得
      const fileName = `${Date.now()}.${fileExtension}`; // 例: 1774631019043.png

      const { data: storageData, error: storageError } = await supabase.storage
        .from('memory-images')
        .upload(fileName, imageFile);

      if (storageError) {
        console.error('Storageのエラー詳細:', storageError); // これを足す！
        throw storageError;
        }

      // 2. アップロードした画像の公開URLを取得
      const { data: urlData } = supabase.storage
        .from('memory-images')
        .getPublicUrl(fileName);

      const imageUrl = urlData.publicUrl;

      // 3. DB（memoriesテーブル）にデータを保存
      const { error: dbError } = await supabase
        .from('memories')
        .insert([{ 
          title, 
          memo, 
          lat: coords.lat, 
          lng: coords.lng, 
          image_url: imageUrl // 本物の画像URLを保存！
        }]);

      if (dbError) throw dbError;

      alert('✨ 写真付きカプセル生成完了！');
      // リセット処理
      setTitle(''); setMemo(''); setCoords(null); setImageFile(null); setPreviewUrl(null);
    } catch (err: any) {
      alert('エラーが発生しました: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-md mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/40">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">思い出をカプセルに</h1>

        <div className="space-y-6">
          <input 
            type="text" placeholder="タイトル" value={title}
            className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea 
            placeholder="思い出メモ" value={memo}
            className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 h-24 focus:ring-2 focus:ring-cyan-400 outline-none resize-none"
            onChange={(e) => setMemo(e.target.value)}
          />

          <button onClick={getGeoLocation} className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full shadow-lg active:scale-95 transition-all">
            {coords ? `📍 取得完了 (${coords.lat.toFixed(3)})` : '📍 現在地を記録する'}
          </button>

          {/* 画像アップロード部分 */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center text-slate-400 hover:bg-white/50 transition-all cursor-pointer overflow-hidden aspect-video flex items-center justify-center"
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span>📷 写真をアップロード</span>
            )}
            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageChange} />
          </div>

          <button 
            onClick={handleSave} disabled={loading}
            className="w-full py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? '生成中...' : 'カプセルを生成する'}
          </button>
        </div>
      </div>
    </div>
  );
}