'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/constants';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
    const router = useRouter();
    const { signInWithGoogle } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push(ROUTES.HOME);
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/invalid-credential') {
                setError('이메일 또는 비밀번호가 올바르지 않습니다.');
            } else {
                setError('로그인 중 오류가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            await signInWithGoogle();
            router.push(ROUTES.HOME);
        } catch (err) {
            console.error(err);
            setError('구글 로그인 중 오류가 발생했습니다.');
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">로그인</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        수다방에 오신 것을 환영합니다!
                    </p>
                </div>

                <form onSubmit={handleEmailLogin} className="space-y-6">
                    <Input
                        label="이메일"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="example@email.com"
                    />
                    <Input
                        label="비밀번호"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                    />

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <Button type="submit" fullWidth isLoading={loading}>
                        로그인
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">또는</span>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    fullWidth
                    onClick={handleGoogleLogin}
                    disabled={loading}
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        className="mr-2 h-4 w-4"
                    />
                    Google로 계속하기
                </Button>

                <p className="text-center text-sm text-gray-600">
                    계정이 없으신가요?{' '}
                    <Link href={ROUTES.SIGNUP} className="font-medium text-blue-600 hover:text-blue-500">
                        회원가입
                    </Link>
                </p>
            </div>
        </div>
    );
}
