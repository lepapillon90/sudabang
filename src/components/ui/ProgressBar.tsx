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
                    <span className="text-xs font-medium text-blue-700 dark:text-white">
                        달성률
                    </span>
                )}
                {showLabel && (
                    <span className="text-xs font-medium text-blue-700 dark:text-white">
                        {normalizedProgress}%
                    </span>
                )}
            </div>
            <div className={`w-full bg-gray-200 rounded-full dark:bg-gray-700 ${heights[height]}`}>
                <div
                    className={`${color} ${heights[height]} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${normalizedProgress}%` }}
                ></div>
            </div>
        </div>
    );
}
