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
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 로그인 상태면 리다이렉트되므로, 여기는 비로그인 상태일 때만 보임
  if (user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          함께 성장하는 즐거움,<br />
          <span className="text-blue-600">수다방</span>에서 시작하세요
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl">
          혼자하면 힘든 자기계발, 이제는 함께하세요.<br />
          서로 응원하고 기록하며 더 나은 나를 만들어갑니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm font-medium">
          <Link href={ROUTES.SIGNUP} className="flex-1">
            <Button size="lg" fullWidth className="h-14 text-lg">
              3초 만에 시작하기
            </Button>
          </Link>
          <Link href={ROUTES.LOGIN} className="flex-1">
            <Button size="lg" variant="outline" fullWidth className="h-14 text-lg">
              로그인
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">이런 기능들이 있어요</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-transparant hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2">관심사별 수다방</h3>
              <p className="text-gray-600">주식, 독서, 운동...<br />관심사가 같은 사람들과 대화하세요.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-transparant hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">목표 달성 트래커</h3>
              <p className="text-gray-600">나만의 목표를 설정하고<br />진행 상황을 시각적으로 확인하세요.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-transparant hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">성장 기록 피드</h3>
              <p className="text-gray-600">오늘의 배움을 기록하고<br />서로의 성장을 응원해주세요.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
