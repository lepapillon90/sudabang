'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useGoals } from '@/hooks/useGoals';
import { CATEGORIES } from '@/constants';
import { RoomCategory } from '@/types';

interface CreateGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateGoalModal({ isOpen, onClose }: CreateGoalModalProps) {
    const { createGoal } = useGoals();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<RoomCategory>('other');
    const [targetDate, setTargetDate] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const date = targetDate ? new Date(targetDate) : undefined;
            await createGoal(title, category, date);
            onClose();
            // 입력 초기화
            setTitle('');
            setCategory('other');
            setTargetDate('');
        } catch (error) {
            console.error(error);
            alert('목표 생성에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const categoryOptions = CATEGORIES.map(c => ({
        value: c.id,
        label: `${c.emoji} ${c.label}`
    }));

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="새로운 목표 설정">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="목표 내용"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="예: 매일 30분 독서하기"
                    required
                />

                <Select
                    label="카테고리"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as RoomCategory)}
                    options={categoryOptions}
                />

                <Input
                    label="목표일 (선택)"
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                />

                <div className="flex justify-end space-x-3 mt-6">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        취소
                    </Button>
                    <Button type="submit" isLoading={loading}>
                        설정하기
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
