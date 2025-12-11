import React from 'react';

interface Option {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: readonly Option[]; // readonly 추가하여 const 배열 허용
    error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = '', label, options, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    className={`
            w-full rounded-lg border border-slate-700 px-4 py-2 text-sm bg-slate-900 text-slate-200
            focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500
            disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1 text-xs text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';
