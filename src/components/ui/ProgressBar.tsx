import React from 'react';

interface ProgressBarProps {
    progress: number; // 0 to 100
    height?: 'sm' | 'md' | 'lg';
    color?: string;
    showLabel?: boolean;
}

export function ProgressBar({
    progress,
    height = 'md',
    color = 'bg-blue-600',
    showLabel = false
}: ProgressBarProps) {
    const normalizedProgress = Math.min(100, Math.max(0, progress));

    const heights = {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
    };

    return (
        <div className="w-full">
            <div className="flex justify-between mb-1">
                {showLabel && (
                    <span className="text-xs font-medium text-slate-400">
                        달성률
                    </span>
                )}
                {showLabel && (
                    <span className="text-xs font-medium text-amber-400">
                        {normalizedProgress}%
                    </span>
                )}
            </div>
            <div className={`w-full bg-slate-800 rounded-full ${heights[height]}`}>
                <div
                    className={`${color === 'bg-blue-600' ? 'bg-gradient-to-r from-amber-500 to-amber-600' : color} ${heights[height]} rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(245,158,11,0.3)]`}
                    style={{ width: `${normalizedProgress}%` }}
                ></div>
            </div>
        </div>
    );
}
