'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { APP_INFO, ROUTES } from '@/constants';

export function Navbar() {
    const { user, signOut } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // 인증이 필요 없는 경로에서는 네비게이션 바를 다르게 보여줄 수도 있음
    // 현재는 간단하게 처리

    const isActive = (path: string) => pathname === path;
    const linkClass = (path: string) =>
        `text-sm font-medium transition-colors hover:text-blue-600 ${isActive(path) ? 'text-blue-600' : 'text-gray-600'
        }`;

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push('/');
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* 로고 */}
                <div className="flex items-center">
                    <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">☕</span>
                        <span className="text-xl font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                            {APP_INFO.name}
                        </span>
                    </Link>
                </div>

                {/* 데스크탑 메뉴 */}
                <div className="hidden md:flex items-center gap-8">
                    {user ? (
                        <>
                            <Link href="/home" className={`text-sm font-medium transition-all duration-300 hover:text-amber-400 ${isActive('/home') ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>홈</Link>
                            <Link href={ROUTES.ROOMS} className={`text-sm font-medium transition-all duration-300 hover:text-amber-400 ${isActive(ROUTES.ROOMS) ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>채팅방</Link>
                            <Link href={ROUTES.FEED} className={`text-sm font-medium transition-all duration-300 hover:text-amber-400 ${isActive(ROUTES.FEED) ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>피드</Link>
                            <Link href={ROUTES.GOALS} className={`text-sm font-medium transition-all duration-300 hover:text-amber-400 ${isActive(ROUTES.GOALS) ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>목표</Link>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </div>

                {/* 우측 버튼 (로그인/로그아웃) */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <span className="text-sm text-slate-400">
                                안녕하세요, <strong className="text-white">{user.displayName}</strong>님!
                            </span>
                            <Button size="sm" variant="ghost" onClick={handleSignOut} className="text-slate-400 hover:text-white hover:bg-slate-800">
                                로그아웃
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href={ROUTES.LOGIN}>
                                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800">로그인</Button>
                            </Link>
                            <Link href={ROUTES.SIGNUP}>
                                <Button size="sm" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold border-none">시작하기</Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* 모바일 메뉴 버튼 */}
                <div className="flex md:hidden">
                    <button
                        type="button"
                        className="text-slate-400 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="sr-only">메뉴 열기</span>
                        {isMobileMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* 모바일 메뉴 패널 */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-slate-800 bg-slate-950">
                    <div className="space-y-1 px-4 py-3">
                        {user ? (
                            <>
                                <Link
                                    href="/home"
                                    className={`block py-2 text-base font-medium ${isActive('/home') ? 'text-amber-400' : 'text-slate-400'}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    홈
                                </Link>
                                <Link
                                    href={ROUTES.ROOMS}
                                    className={`block py-2 text-base font-medium ${isActive(ROUTES.ROOMS) ? 'text-amber-400' : 'text-slate-400'}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    채팅방
                                </Link>
                                <Link
                                    href={ROUTES.FEED}
                                    className={`block py-2 text-base font-medium ${isActive(ROUTES.FEED) ? 'text-amber-400' : 'text-slate-400'}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    피드
                                </Link>
                                <Link
                                    href={ROUTES.GOALS}
                                    className={`block py-2 text-base font-medium ${isActive(ROUTES.GOALS) ? 'text-amber-400' : 'text-slate-400'}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    목표
                                </Link>
                                <div className="border-t border-slate-800 my-2 pt-2">
                                    <div className="text-sm text-slate-500 mb-2">{user.displayName}님</div>
                                    <Button fullWidth variant="outline" onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }} className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white">
                                        로그아웃
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href={ROUTES.LOGIN} onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button fullWidth variant="ghost" className="mb-2 text-slate-400 hover:text-white hover:bg-slate-800">로그인</Button>
                                </Link>
                                <Link href={ROUTES.SIGNUP} onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button fullWidth className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold">시작하기</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
