'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { usePosts } from '@/hooks/usePosts';
import { CATEGORIES } from '@/constants';
import { RoomCategory } from '@/types';

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
    const { createPost } = usePosts();
    const [content, setContent] = useState('');
    const [category, setCategory] = useState<RoomCategory>('other');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createPost(content, category);
            onClose();
            // 입력 초기화
            setContent('');
            setCategory('other');
        } catch (error) {
            console.error(error);
            alert('게시글 작성에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const categoryOptions = CATEGORIES.map(c => ({
        value: c.id,
        label: `${c.emoji} ${c.label}`
    }));

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="게시글 작성하기">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Select
                    label="카테고리"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as RoomCategory)}
                    options={categoryOptions}
                />

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                        내용
                    </label>
                    <textarea
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[150px]"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="오늘의 성장 기록을 남겨보세요! (질문, 팁 공유, 공부 인증 등)"
                        required
                    />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        취소
                    </Button>
                    <Button type="submit" isLoading={loading}>
                        게시하기
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
