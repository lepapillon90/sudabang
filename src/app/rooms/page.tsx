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

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">채팅방 목록</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        관심 있는 주제의 방에 참여해보세요!
                    </p>
                </div>

                {user && (
                    <Button onClick={() => setIsModalOpen(true)}>
                        + 방 만들기
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
                <div className="text-center py-20 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 mb-4">아직 개설된 채팅방이 없습니다.</p>
                    {user && (
                        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                            첫 번째 방을 만들어보세요!
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rooms.map((room) => {
                        const categoryInfo = CATEGORIES.find(c => c.id === room.category);

                        return (
                            <Link
                                key={room.id}
                                href={ROUTES.ROOM_DETAIL(room.id)}
                                className="block group"
                            >
                                <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-all hover:border-blue-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                            {categoryInfo?.emoji} {categoryInfo?.label}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            👁️ {room.memberCount}명
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                                        {room.name}
                                    </h3>

                                    {room.description && (
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {room.description}
                                        </p>
                                    )}

                                    <div className="mt-4 flex items-center text-xs text-gray-400">
                                        <span>개설일: {room.createdAt ? room.createdAt.toLocaleDateString() : '방금 전'}</span>
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
