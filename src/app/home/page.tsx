'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/hooks/usePosts';
import { useGoals } from '@/hooks/useGoals';
import { useRooms } from '@/hooks/useRooms';
import { PostCard } from '@/components/features/PostCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/constants';

export default function HomePage() {
    const { user } = useAuth();
    const { posts } = usePosts('all');
    const { goals } = useGoals();
    const { rooms } = useRooms('all');

    // 데이터 요약 (최근 3개 등)
    const recentPosts = posts.slice(0, 3);
    const myGoals = goals.slice(0, 3);
    const recommendedRooms = rooms.slice(0, 4);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mb-4"></div>
                <p className="text-slate-400">로그인 정보를 확인 중입니다...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
            {/* 1. 웰컴 섹션 (Welcome Section) */}
            <section>
                <h1 className="text-3xl font-serif font-bold text-white mb-2">
                    반가워요, <span className="text-amber-400">{user.displayName}</span>님! 👋
                </h1>
                <p className="text-slate-400 mt-1">
                    오늘도 수다방에서 함께 성장해볼까요?
                </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 왼쪽 컬럼 (피드) (Left Column - Feed) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* 최근 피드 (Recent Feed) */}
                    <section>
                        <div className="flex justify-between items-end mb-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                🔥 실시간 인기 피드
                            </h2>
                            <Link href={ROUTES.FEED} className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
                                더보기
                            </Link>
                        </div>
                        {recentPosts.length > 0 ? (
                            <div className="space-y-4">
                                {recentPosts.map(post => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        onDelete={() => { }} // 홈에서는 삭제 기능 비활성 또는 별도 처리
                                        onLike={() => { }} // 홈에서는 좋아요 기능 비활성 또는 별도 처리
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-sm">
                                <p className="text-slate-500">아직 올라온 글이 없어요.</p>
                            </div>
                        )}
                    </section>
                </div>

                {/* 오른쪽 컬럼 (목표, 채팅방) (Right Column - Goals, Rooms) */}
                <div className="space-y-8">
                    {/* 내 목표 (My Goals) */}
                    <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-lg backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                🎯 내 목표
                            </h2>
                            <Link href={ROUTES.GOALS}>
                                <span className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer">
                                    관리
                                </span>
                            </Link>
                        </div>

                        {myGoals.length > 0 ? (
                            <div className="space-y-5">
                                {myGoals.map(goal => (
                                    <div key={goal.id}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-slate-200">{goal.title}</span>
                                            <span className="text-amber-400 font-bold">{goal.progress}%</span>
                                        </div>
                                        <ProgressBar progress={goal.progress} height="sm" />
                                    </div>
                                ))}
                                {myGoals.length < goals.length && (
                                    <p className="text-center text-xs text-slate-500 mt-2">
                                        외 {goals.length - myGoals.length}개의 목표가 더 있어요
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-sm text-slate-500 mb-4">설정된 목표가 없습니다.</p>
                                <Link href={ROUTES.GOALS}>
                                    <Button size="sm" fullWidth className="bg-amber-600 hover:bg-amber-500 text-white border-none">
                                        목표 설정하기
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </section>

                    {/* 추천 채팅방 (Recommended Rooms) */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                💬 추천 채팅방
                            </h2>
                            <Link href={ROUTES.ROOMS} className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
                                전체보기
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {recommendedRooms.map(room => (
                                <Link
                                    key={room.id}
                                    href={ROUTES.ROOM_DETAIL(room.id)}
                                    className="group block p-4 bg-slate-800/40 border border-white/5 rounded-2xl hover:bg-slate-800/60 hover:border-amber-500/50 hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.15)] transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                                    <h3 className="font-semibold text-slate-200 text-sm truncate mb-2">
                                        {room.name}
                                    </h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full">
                                            {room.category}
                                        </span>
                                        <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                                            {room.memberCount}명
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
