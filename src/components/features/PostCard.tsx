'use client';

import React from 'react';
import { Post } from '@/types';
import { CATEGORIES } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface PostCardProps {
    post: Post;
    onDelete: (id: string) => void;
    onLike: (id: string) => void;
}

export function PostCard({ post, onDelete, onLike }: PostCardProps) {
    const { user } = useAuth();
    const categoryInfo = CATEGORIES.find(c => c.id === post.category);
    const isOwner = user?.uid === post.authorId;

    const timeAgo = post.createdAt
        ? formatDistanceToNow(post.createdAt, { addSuffix: true, locale: ko })
        : '방금 전';

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-slate-900/80 hover:border-amber-500/30">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-amber-500 font-bold text-xs border border-slate-700">
                        {post.authorName[0]}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-200">
                            {post.authorName}
                        </div>
                        <div className="text-xs text-slate-500">
                            {timeAgo}
                        </div>
                    </div>
                </div>

                {isOwner && (
                    <button
                        onClick={() => onDelete(post.id)}
                        className="text-slate-500 hover:text-red-400 text-xs transition-colors"
                    >
                        삭제
                    </button>
                )}
            </div>

            <div className="mb-3">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-800 text-amber-400 border border-slate-700">
                    {categoryInfo?.emoji} {categoryInfo?.label}
                </span>
            </div>

            <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed mb-4 font-light">
                {post.content}
            </p>

            {post.imageURL && (
                <div className="mb-4 rounded-lg overflow-hidden border border-slate-800">
                    <img src={post.imageURL} alt="게시글 이미지" className="w-full h-auto object-cover" />
                </div>
            )}

            <div className="flex items-center space-x-4 border-t border-slate-800/50 pt-3">
                <button
                    onClick={() => onLike(post.id)}
                    className="flex items-center text-slate-500 hover:text-amber-400 text-sm transition-colors group"
                >
                    <span className="mr-1 group-hover:scale-110 transition-transform">❤️</span>
                    {post.likeCount}
                </button>
                <button className="flex items-center text-slate-500 hover:text-amber-400 text-sm transition-colors">
                    <span className="mr-1">💬</span>
                    {post.commentCount}
                </button>
            </div>
        </div>
    );
}
