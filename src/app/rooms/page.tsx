'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { CreateRoomModal } from '@/components/features/CreateRoomModal';
import { useRooms } from '@/hooks/useRooms';
import { CATEGORIES, ROUTES } from '@/constants';
import { RoomCategory } from '@/types';

export default function RoomsPage() {
    const { user } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState<RoomCategory | 'all'>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { rooms, loading, error } = useRooms(selectedCategory);

    const categoryOptions = [
        { value: 'all', label: '🌈 전체 보기' },
        ...CATEGORIES.map(c => ({
            value: c.id,
            label: `${c.emoji} ${c.label}`
        }))
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-400"></div>
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

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-white mb-2">채팅방 목록</h1>
                    <p className="text-slate-400">
                        관심 있는 주제의 방에서 <span className="text-amber-400">깊이 있는 대화</span>를 나눠보세요.
                    </p>
                </div>

                {user && (
                    <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold border-none shadow-lg shadow-amber-900/20">
                        + 새로운 방 만들기
                    </Button>
                )}
            </div>

            <div className="mb-6 max-w-xs">
                <Select
                    options={categoryOptions}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as RoomCategory | 'all')}
                />
            </div>

            {rooms.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-slate-800 backdrop-blur-sm">
                    <p className="text-slate-500 mb-4">아직 개설된 채팅방이 없습니다.</p>
                    {user && (
                        <Button variant="outline" onClick={() => setIsModalOpen(true)} className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                            첫 번째 방을 만들어보세요!
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {rooms.map((room) => {
                        const categoryInfo = CATEGORIES.find(c => c.id === room.category);

                        return (
                            <Link
                                key={room.id}
                                href={ROUTES.ROOM_DETAIL(room.id)}
                                className="block group"
                            >
                                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800/80 hover:border-amber-500/30 hover:shadow-amber-900/20">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-amber-400 border border-slate-700">
                                            {categoryInfo?.emoji} {categoryInfo?.label}
                                        </span>
                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                            {room.memberCount}명 참여중
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors mb-2">
                                        {room.name}
                                    </h3>

                                    {room.description && (
                                        <p className="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed font-light">
                                            {room.description}
                                        </p>
                                    )}

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-800/50">
                                        <span className="text-xs text-slate-600">
                                            {room.createdAt ? room.createdAt.toLocaleDateString() : '방금 전'}
                                        </span>
                                        <span className="text-xs font-medium text-amber-500/80 group-hover:text-amber-400 transition-colors">
                                            입장하기 →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            <CreateRoomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
