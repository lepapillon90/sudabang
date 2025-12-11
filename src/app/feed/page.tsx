'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { CreatePostModal } from '@/components/features/CreatePostModal';
import { PostCard } from '@/components/features/PostCard';
import { usePosts } from '@/hooks/usePosts';
import { CATEGORIES } from '@/constants';
import { RoomCategory } from '@/types';
import Link from 'next/link';
import { ROUTES } from '@/constants';

export default function FeedPage() {
    const { user } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState<RoomCategory | 'all'>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { posts, loading, error, deletePost, likePost } = usePosts(selectedCategory);

    const categoryOptions = [
        { value: 'all', label: '🌈 전체 보기' },
        ...CATEGORIES.map(c => ({
            value: c.id,
            label: `${c.emoji} ${c.label}`
        }))
    ];

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
                <h2 className="text-xl font-bold mb-4">로그인이 필요한 서비스입니다</h2>
                <p className="text-gray-600 mb-6">성장하는 사람들의 이야기를 만나보세요!</p>
                <Link href={ROUTES.LOGIN}>
                    <Button>로그인 하러 가기</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-white mb-2">피드</h1>
                    <p className="text-slate-400 text-sm">
                        성장하는 사람들의 <span className="text-amber-400">매일의 기록</span>
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold border-none shadow-lg shadow-amber-900/20">
                    + 글쓰기
                </Button>
            </div>

            <div className="mb-6 sticky top-0 bg-slate-950/95 backdrop-blur z-10 py-3 border-b border-slate-800">
                <Select
                    options={categoryOptions}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as RoomCategory | 'all')}
                />
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-400"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-400 py-10">
                    {error}
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-slate-800 backdrop-blur-sm">
                    <p className="text-slate-500 mb-4">아직 게시글이 없습니다.</p>
                    <Button variant="outline" onClick={() => setIsModalOpen(true)} className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                        첫 번째 이야기를 들려주세요!
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onDelete={deletePost}
                            onLike={likePost}
                        />
                    ))}
                </div>
            )}

            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
