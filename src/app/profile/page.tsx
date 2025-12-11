'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { COLLECTIONS, ROUTES } from '@/constants';
import Link from 'next/link';
import { usePosts } from '@/hooks/usePosts';
import { PostCard } from '@/components/features/PostCard';
import { useGoals } from '@/hooks/useGoals';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [loading, setLoading] = useState(false);

    // 내 활동 데이터 가져오기 (비효율적일 수 있지만 MVP 레벨에서 필터링 사용)
    const { posts } = usePosts('all');
    const { goals } = useGoals();

    const myPosts = posts.filter(p => p.authorId === user?.uid);
    const myGoals = goals; // useGoals는 이미 내 목표만 가져옴

    useEffect(() => {
        if (user) {
            setNewName(user.displayName || '');
        }
    }, [user]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setLoading(true);

        try {
            // 1. Firebase Auth 프로필 업데이트
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: newName,
                });
            }

            // 2. Firestore User 문서 업데이트
            const userRef = doc(db, COLLECTIONS.USERS, user.uid);
            await updateDoc(userRef, {
                displayName: newName,
            });

            setIsEditing(false);
            alert('프로필이 업데이트되었습니다.');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('프로필 업데이트에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || !user) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">내 프로필</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 왼쪽 컬럼: 프로필 정보 */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border shadow-sm text-center">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 mx-auto mb-4">
                            {newName ? newName[0] : user.email?.[0]}
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <Input
                                    label="이름"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <div className="flex gap-2 justify-center">
                                    <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                                        취소
                                    </Button>
                                    <Button type="submit" size="sm" isLoading={loading}>
                                        저장
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{user.displayName}</h2>
                                <p className="text-sm text-gray-500 mb-4">{user.email}</p>
                                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                    프로필 수정
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-4">📊 활동 요약</h3>
                        <ul className="space-y-2 text-sm text-blue-800">
                            <li className="flex justify-between">
                                <span>작성한 글</span>
                                <span className="font-bold">{myPosts.length}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>설정한 목표</span>
                                <span className="font-bold">{myGoals.length}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>달성한 목표</span>
                                <span className="font-bold">{myGoals.filter(g => g.isCompleted).length}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 오른쪽 컬럼: 탭/리스트 */}
                <div className="md:col-span-2 space-y-8">
                    {/* 내 목표 */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-gray-900">🎯 진행 중인 목표</h2>
                            <Link href={ROUTES.GOALS} className="text-sm text-blue-600 hover:underline">
                                전체보기
                            </Link>
                        </div>
                        {myGoals.length > 0 ? (
                            <div className="space-y-4">
                                {myGoals.slice(0, 3).map(goal => (
                                    <div key={goal.id} className="bg-white p-4 rounded-xl border">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-medium">{goal.title}</span>
                                            <span className="text-blue-600 font-bold">{goal.progress}%</span>
                                        </div>
                                        <ProgressBar progress={goal.progress} height="sm" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">아직 설정한 목표가 없습니다.</p>
                        )}
                    </section>

                    {/* 내가 쓴 글 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">📝 내가 쓴 글</h2>
                        {myPosts.length > 0 ? (
                            <div className="space-y-4">
                                {myPosts.map(post => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        onLike={() => { }} // 프로필에서는 좋아요 기능 제한적/또는 구현 필요
                                        onDelete={() => { }} // 삭제 로직 전달 필요하지만 간소화
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">작성한 게시글이 없습니다.</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
