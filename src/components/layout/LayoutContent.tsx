'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function LayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // 채팅방 상세 페이지(/rooms/식별자)인지 확인
    // /rooms는 목록이므로 제외
    const isChatRoom = pathname?.startsWith('/rooms/') && pathname !== '/rooms';

    if (isChatRoom) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-950 text-slate-200">
            <Navbar />
            <main className="flex-1 selection:bg-amber-500/30">
                {children}
            </main>
            <Footer />
        </div>
    );
}
