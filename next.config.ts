/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! 警告 !!
    // プロジェクトに型エラーがあっても、ビルド（デプロイ）を強制的に進める設定
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLintのエラーも無視する設定（念のため）
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;