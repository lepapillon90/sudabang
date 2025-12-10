'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { APP_INFO, ROUTES } from '@/constants';

export function Navbar() {
    const { user, signOut } = useAuth();
    const pathname = usePathname();
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
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* 로고 */}
                <div className="flex items-center">
                    <Link href={ROUTES.HOME} className="flex items-center gap-2">
                        <span className="text-2xl">☕</span>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">
                            {APP_INFO.name}
                        </span>
                    </Link>
                </div>

                {/* 데스크탑 메뉴 */}
                <div className="hidden md:flex items-center gap-8">
                    {user ? (
                        <>
                            <Link href="/home" className={linkClass('/home')}>홈</Link>
                            <Link href={ROUTES.FEED} className={linkClass(ROUTES.FEED)}>피드</Link>
                            <Link href={ROUTES.ROOMS} className={linkClass(ROUTES.ROOMS)}>채팅방</Link>
                            <Link href={ROUTES.GOALS} className={linkClass(ROUTES.GOALS)}>목표</Link>
                        </>
                    ) : (
                        <>
                            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-blue-600">소개</a>
                            <a href="#reviews" className="text-sm font-medium text-gray-600 hover:text-blue-600">후기</a>
                        </>
                    )}
                </div>

                {/* 우측 버튼 (로그인/로그아웃) */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <span className="text-sm text-gray-700">
                                안녕하세요, <strong>{user.displayName}</strong>님!
                            </span>
                            <Button size="sm" variant="ghost" onClick={handleSignOut}>
                                로그아웃
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href={ROUTES.LOGIN}>
                                <Button size="sm" variant="ghost">로그인</Button>
                            </Link>
                            <Link href={ROUTES.SIGNUP}>
                                <Button size="sm">시작하기</Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* 모바일 메뉴 버튼 */}
                <div className="flex md:hidden">
                    <button
                        type="button"
                        className="text-gray-700"
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
                <div className="md:hidden border-t bg-white">
                    <div className="space-y-1 px-4 py-3">
                        {user ? (
                            <>
                                <Link
                                    href="/home"
                                    className={`block py-2 text-base font-medium ${isActive('/home') ? 'text-blue-600' : 'text-gray-700'}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    홈
                                </Link>
                                <Link
                                    href={ROUTES.FEED}
                                    className={`block py-2 text-base font-medium ${isActive(ROUTES.FEED) ? 'text-blue-600' : 'text-gray-700'}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    피드
                                </Link>
                                <Link
                                    href={ROUTES.ROOMS}
                                    className={`block py-2 text-base font-medium ${isActive(ROUTES.ROOMS) ? 'text-blue-600' : 'text-gray-700'}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    채팅방
                                </Link>
                                <Link
                                    href={ROUTES.GOALS}
                                    className={`block py-2 text-base font-medium ${isActive(ROUTES.GOALS) ? 'text-blue-600' : 'text-gray-700'}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    목표
                                </Link>
                                <div className="border-t my-2 pt-2">
                                    <div className="text-sm text-gray-500 mb-2">{user.displayName}님</div>
                                    <Button fullWidth variant="outline" onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}>
                                        로그아웃
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href={ROUTES.LOGIN} onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button fullWidth variant="ghost" className="mb-2">로그인</Button>
                                </Link>
                                <Link href={ROUTES.SIGNUP} onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button fullWidth>시작하기</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
