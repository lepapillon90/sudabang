'use client';

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/home');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  // 로그인 상태면 리다이렉트되므로, 여기는 비로그인 상태일 때만 보임
  if (user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200 selection:bg-amber-500/30">

      {/* 히어로 섹션 (Hero Section) */}
      <section className="relative flex-1 flex flex-col justify-center items-center text-center px-4 py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium uppercase tracking-wider mb-4 backdrop-blur-sm">
            ✨ Premium Community for Growth
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            성장하는 사람들의<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              품격 있는 대화
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            당신의 가치를 알아보는 사람들과 함께하세요.<br />
            기록하고, 공유하고, 더 나은 당신을 마주하는 곳.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mx-auto pt-8">
            <Link href={ROUTES.SIGNUP} className="flex-1">
              <Button
                className="w-full h-14 text-lg font-medium shadow-lg shadow-amber-900/20"
              >
                시작하기 <span className="ml-2">→</span>
              </Button>
            </Link>
            <Link href={ROUTES.LOGIN} className="flex-1">
              <Button
                variant="outline"
                className="w-full h-14 text-lg font-medium border-slate-700 text-slate-300 hover:bg-slate-800/50 hover:text-white"
              >
                로그인
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 푸터 (Footer) */}
      <footer className="py-10 text-center text-slate-600 text-sm border-t border-slate-900 bg-slate-950">
        <p>© 2025 SUDABANG. All rights reserved.</p>
      </footer>
    </div>
  );
}
