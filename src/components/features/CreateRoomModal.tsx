'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useRooms } from '@/hooks/useRooms';
import { CATEGORIES } from '@/constants';
import { RoomCategory } from '@/types';

interface CreateRoomModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateRoomModal({ isOpen, onClose }: CreateRoomModalProps) {
    const { createRoom } = useRooms();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<RoomCategory>('other');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createRoom(name, description, category);
            onClose();
            // 입력 초기화
            setName('');
            setDescription('');
            setCategory('other');
        } catch (error) {
            console.error(error);
            alert('채팅방 생성에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const categoryOptions = CATEGORIES.map(c => ({
        value: c.id,
        label: `${c.emoji} ${c.label}`
    }));

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="새로운 채팅방 만들기">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="채팅방 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="예: 주식 초보 모임"
                    required
                />

                <Select
                    label="카테고리"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as RoomCategory)}
                    options={categoryOptions}
                />

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                        설명 (선택)
                    </label>
                    <textarea
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="채팅방에 대해 간단히 설명해주세요."
                    />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        취소
                    </Button>
                    <Button type="submit" isLoading={loading}>
                        만들기
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
