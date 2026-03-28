'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// 👈 ヘルパーを使わず、一番標準的なクライアントを使います
import { createClient } from '@supabase/supabase-js';
import GachaCapsule from '../components/GachaCapsule';

// 💡 コンポーネントの外で初期化
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 🔐 ログイン実行
　const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    });

    console.log("Auth Response:", { data, error }); // 👈 ここが Console に出れば勝ちです！

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      console.log("3. 成功！セッションを同期します");
      
      // 🔄 一旦ルーターをリフレッシュしてCookieを確定させる
      router.refresh(); 

      // 🕒 ほんの少し（100ms）だけ待ってから遷移（SEの微調整ｗ）
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    }
};
    

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) alert(error.message);
    else alert('確認メールを送りました（設定による）！');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        
        <div className="flex flex-col items-center mb-12 animate-float-slow">
          <GachaCapsule size="large" active={true} />
          <h1 className="mt-8 text-4xl font-black italic tracking-tighter text-slate-950 text-center">
            MEMORY <span className="text-cyan-500">CAPSULE</span>
          </h1>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-white">
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
              placeholder="Email"
              required
            />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
              placeholder="Password"
              required
            />
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-slate-950 text-white font-black rounded-2xl shadow-xl active:scale-95 transition-transform"
            >
              {loading ? 'WAIT...' : 'SIGN IN'}
            </button>
          </form>

          <button onClick={handleSignUp} className="mt-6 w-full text-xs font-bold text-cyan-500 underline">
            Create Account
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}