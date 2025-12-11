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
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-slate-900/80 hover:border-amber-500/30">
            <div className="flex justify-between items-start mb-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-amber-400 border border-slate-700">
                    {categoryInfo?.emoji} {categoryInfo?.label}
                </span>
                <button
                    onClick={() => onDelete(goal.id)}
                    className="text-slate-500 hover:text-red-400 text-sm transition-colors"
                >
                    삭제
                </button>
            </div>

            <h3 className="text-lg font-bold text-slate-100 mb-2">
                {goal.title}
            </h3>

            {goal.targetDate && (
                <p className="text-sm text-slate-400 mb-4 font-light">
                    📅 {goal.targetDate.toLocaleDateString()}까지
                </p>
            )}

            <div className="space-y-4">
                <ProgressBar progress={goal.progress} showLabel />

                <div className="flex justify-between gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleDecrement}
                        className="flex-1 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                        disabled={goal.progress <= 0}
                    >
                        -10%
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleIncrement}
                        className="flex-1 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                        disabled={goal.progress >= 100}
                    >
                        +10%
                    </Button>
                </div>
            </div>

            {goal.isCompleted && (
                <div className="mt-4 text-center py-2 bg-amber-500/10 text-amber-400 rounded-lg text-sm font-medium border border-amber-500/20">
                    🎉 목표 달성 완료!
                </div>
            )}
        </div>
    );
}
