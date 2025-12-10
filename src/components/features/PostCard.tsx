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
        <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {post.authorName[0]}
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-gray-900">
                            {post.authorName}
                        </div>
                        <div className="text-xs text-gray-500">
                            {timeAgo}
                        </div>
                    </div>
                </div>

                {isOwner && (
                    <button
                        onClick={() => onDelete(post.id)}
                        className="text-gray-400 hover:text-red-500 text-xs"
                    >
                        삭제
                    </button>
                )}
            </div>

            <div className="mb-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                    {categoryInfo?.emoji} {categoryInfo?.label}
                </span>
            </div>

            <p className="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed mb-4">
                {post.content}
            </p>

            {post.imageURL && (
                <div className="mb-4 rounded-lg overflow-hidden">
                    <img src={post.imageURL} alt="게시글 이미지" className="w-full h-auto object-cover" />
                </div>
            )}

            <div className="flex items-center space-x-4 border-t pt-3">
                <button
                    onClick={() => onLike(post.id)}
                    className="flex items-center text-gray-500 hover:text-blue-600 text-sm transition-colors"
                >
                    <span className="mr-1">❤️</span>
                    {post.likeCount}
                </button>
                <button className="flex items-center text-gray-500 hover:text-blue-600 text-sm transition-colors">
                    <span className="mr-1">💬</span>
                    {post.commentCount}
                </button>
            </div>
        </div>
    );
}
