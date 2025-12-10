'use client';

import React from 'react';
import { Goal } from '@/types';
import { CATEGORIES } from '@/constants';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';

interface GoalCardProps {
    goal: Goal;
    onUpdateProgress: (id: string, progress: number) => void;
    onDelete: (id: string) => void;
}

export function GoalCard({ goal, onUpdateProgress, onDelete }: GoalCardProps) {
    const categoryInfo = CATEGORIES.find(c => c.id === goal.category);

    const handleIncrement = () => {
        const newProgress = Math.min(100, goal.progress + 10);
        onUpdateProgress(goal.id, newProgress);
    };

    const handleDecrement = () => {
        const newProgress = Math.max(0, goal.progress - 10);
        onUpdateProgress(goal.id, newProgress);
    };

    return (
        <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {categoryInfo?.emoji} {categoryInfo?.label}
                </span>
                <button
                    onClick={() => onDelete(goal.id)}
                    className="text-gray-400 hover:text-red-500 text-sm"
                >
                    삭제
                </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {goal.title}
            </h3>

            {goal.targetDate && (
                <p className="text-sm text-gray-500 mb-4">
                    📅 {goal.targetDate.toLocaleDateString()}까지
                </p>
            )}

            <div className="space-y-3">
                <ProgressBar progress={goal.progress} showLabel />

                <div className="flex justify-between gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleDecrement}
                        className="flex-1"
                        disabled={goal.progress <= 0}
                    >
                        -10%
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleIncrement}
                        className="flex-1"
                        disabled={goal.progress >= 100}
                    >
                        +10%
                    </Button>
                </div>
            </div>

            {goal.isCompleted && (
                <div className="mt-4 text-center py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                    🎉 목표 달성 완료!
                </div>
            )}
        </div>
    );
}
