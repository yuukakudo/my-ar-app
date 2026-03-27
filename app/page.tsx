'use client';

import React from 'react'; // Reactを明示的にインポート

// Next.js(TypeScript)に新しいタグを教える呪文
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-box': any;
      'a-camera': any;
      'a-entity': any;
    }
  }
}

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function ARPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="fixed inset-0 overflow-hidden bg-black">
      {/* 1. ARライブラリの読み込み */}
      <Script 
        src="https://aframe.io/releases/1.3.0/aframe.min.js" 
        strategy="beforeInteractive" 
      />
      <Script 
        src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js" 
        strategy="afterInteractive" // ここを少し遅らせて確実に読み込む
      />
      
      {/* 2. ARシーン（カメラと物体の設定） */}
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
        vr-mode-ui="enabled: false"
      >
        {/* 青い光る箱（あなたの今いる場所に現れます） */}
        <a-box
          gps-entity-place="latitude: 35.653051; longitude: 139.877172;" 
          scale="5 5 5"
          material="color: #00e5ff; opacity: 0.8; transparent: true;"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
        ></a-box>

        <a-camera gps-camera rotation-reader></a-camera>
      </a-scene>

      {/* 3. 画面上の案内表示 */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 text-white font-bold shadow-2xl">
          ARカプセルをスキャン中...
        </div>
      </div>
    </main>
  );
}