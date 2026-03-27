'use client';

export default function ARPage() {
  return (
    <main style={{ width: '100vw', height: '100vh', margin: 0, overflow: 'hidden' }}>
      {/* 1. Next.jsの機能を使わず、直接HTMLタグでライブラリを叩き込む */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/aframevr/aframe@master/dist/aframe-v1.3.0.min.css" />
      <script src="https://aframe.io/releases/1.3.0/aframe.min.js" async></script>
      <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js" async></script>

      {/* 2. ARシーンの設定 */}
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; trackingMethod: best; videoTexture: true;"
        vr-mode-ui="enabled: false"
        style={{ width: '100%', height: '100%' }}
      >
        {/* 葛西臨海公園の座標（巨大な箱） */}
        <a-box
          gps-entity-place="latitude: 35.653051; longitude: 139.877172;"
          scale="15 15 15"
          material="color: #00e5ff; opacity: 0.7; transparent: true;"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 4000"
        ></a-box>

        <a-camera gps-camera rotation-reader></a-camera>
      </a-scene>

      {/* 案内表示 */}
      <div style={{
        position: 'absolute', bottom: '30px', width: '100%', textAlign: 'center', 
        zIndex: 999, color: 'white', fontFamily: 'sans-serif', fontSize: '14px'
      }}>
        カメラが映らない場合はページを3回ほどリロードしてください
      </div>
    </main>
  );
}