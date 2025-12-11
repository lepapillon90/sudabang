import { APP_INFO } from '@/constants';

export function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-950 py-12">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <p className="text-center text-xs leading-5 text-slate-500">
                    &copy; 2025 {APP_INFO.name}, Inc. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
