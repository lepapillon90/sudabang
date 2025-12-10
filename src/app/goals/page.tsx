'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGoals } from '@/hooks/useGoals';
import { Button } from '@/components/ui/Button';
import { CreateGoalModal } from '@/components/features/CreateGoalModal';
import { GoalCard } from '@/components/features/GoalCard';
import Link from 'next/link';
import { ROUTES } from '@/constants';

export default function GoalsPage() {
    const { user } = useAuth();
    const { goals, loading, error, updateProgress, deleteGoal } = useGoals();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
                <h2 className="text-xl font-bold mb-4">로그인이 필요한 서비스입니다</h2>
                <p className="text-gray-600 mb-6">나만의 목표를 설정하고 달성해보고 싶다면?</p>
                <Link href={ROUTES.LOGIN}>
                    <Button>로그인 하러 가기</Button>
                </Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-10">
                {error}
            </div>
        );
    }

    const completedGoals = goals.filter(g => g.isCompleted).length;
    const totalGoals = goals.length;
    const totalProgress = totalGoals > 0
        ? Math.round(goals.reduce((acc, curr) => acc + curr.progress, 0) / totalGoals)
        : 0;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* 헤더 섹션 */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-10 text-white mb-8 shadow-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                            {user.displayName}님의 성장 대시보드
                        </h1>
                        <p className="text-blue-100 mb-6">
                            오늘도 한 걸음 더 성장해보세요! 🌱
                        </p>
                    </div>
                    <Button
                        className="bg-white text-blue-600 hover:bg-blue-50"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + 새 목표
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                        <div className="text-2xl font-bold">{totalGoals}</div>
                        <div className="text-xs sm:text-sm text-blue-100">전체 목표</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                        <div className="text-2xl font-bold">{completedGoals}</div>
                        <div className="text-xs sm:text-sm text-blue-100">달성 완료</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                        <div className="text-2xl font-bold">{totalProgress}%</div>
                        <div className="text-xs sm:text-sm text-blue-100">평균 달성률</div>
                    </div>
                </div>
            </div>

            {/* 목표 리스트 */}
            <h2 className="text-xl font-bold text-gray-900 mb-4">진행 중인 목표</h2>

            {goals.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 mb-4">아직 설정된 목표가 없습니다.</p>
                    <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                        지금 첫 목표를 시작해보세요!
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {goals.map((goal) => (
                        <GoalCard
                            key={goal.id}
                            goal={goal}
                            onUpdateProgress={updateProgress}
                            onDelete={deleteGoal}
                        />
                    ))}
                </div>
            )}

            <CreateGoalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
