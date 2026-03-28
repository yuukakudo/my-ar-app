'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    // 📍 MAPのパスは "/"
    { name: 'MAP', href: '/', icon: '📍' },
    { name: 'LIST', href: '/list', icon: <GachaCapsuleIcon active={pathname === '/list'} /> },
    { name: 'ME', href: '/account', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 pb-safe z-[100] shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          // 💡 ここで「今このタブが選ばれているか」を厳密に判定
          const isActive = pathname === item.href;

          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${
                isActive ? 'text-cyan-500 scale-105' : 'text-slate-400'
              }`}
            >
              {/* アイコン部分の出し分け */}
              <span className="text-xl mb-1 flex items-center justify-center h-7">
                {/* LISTだけは自作コンポーネントなのでisActiveを渡す */}
                {item.name === 'LIST' ? (
                  <GachaCapsuleIcon active={isActive} />
                ) : (
                  item.icon
                )}
              </span>
              <span className={`text-[10px] font-black tracking-tighter uppercase ${
                isActive ? 'opacity-100' : 'opacity-60'
              }`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// 🔵 自作のガチャカプセルアイコン・コンポーネント
interface CapsuleProps { active: boolean; }
function GachaCapsuleIcon({ active }: CapsuleProps) {
  return (
    <div className={`relative w-7 h-7 rounded-full border-2 transition-colors ${
      active ? 'border-cyan-400 bg-cyan-100' : 'border-slate-300 bg-white'
    }`}>
      {/* カプセルの「上半球（透明または色付き）」部分の演出 */}
      <div className={`absolute top-0 left-0 right-0 h-3.5 rounded-t-full ${
        active ? 'bg-cyan-400' : 'bg-slate-300'
      }`}></div>
      
      {/* カプセルの「真ん中の合わせ目（ヒンジ）」の演出 */}
      <div className="absolute top-[13px] left-[-2px] right-[-2px] h-[3px] bg-white border-y border-slate-300/50"></div>

      {/* 光沢の演出（プラスチック感） */}
      <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white/70 rounded-full"></div>
    </div>
  );
}