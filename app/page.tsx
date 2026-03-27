'use client';

import React from 'react';
import Script from 'next/script';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-box': any;
      'a-camera': any;
    }
  }
}

export default function ARPage() {
  return (
    <main style={{ width: '100vw', height: '100vh', margin: 0, overflow: 'hidden' }}>
      {/* A-Frame本体を最優先で読み込む */}
      <Script 
        src="https://aframe.io/releases/1.3.0/aframe.min.js" 
        strategy="beforeInteractive"
      />
      {/* AR.jsを次に読み込む */}
      <Script 
        src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"
        strategy="afterInteractive"
      />

      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; trackingMethod: best;"
        vr-mode-ui="enabled: false"
      >
        {/* 葛西臨海公園の座標に設置 */}
        <a-box
          gps-entity-place="latitude: 35.653051; longitude: 139.877172;"
          scale="10 10 10"
          material="color: #00e5ff; opacity: 0.8;"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
        ></a-box>

        <a-camera gps-camera rotation-reader></a-camera>
      </a-scene>

      {/* 動作確認用のオーバーレイ */}
      <div style={{
        position: 'absolute', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 1000,
        color: 'white',
        background: 'rgba(0,0,0,0.5)',
        padding: '10px',
        borderRadius: '5px'
      }}>
        カメラが映らない場合はページを再読み込みしてください
      </div>
    </main>
  );
}