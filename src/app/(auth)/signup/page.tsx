'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES, COLLECTIONS } from '@/constants';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { User } from '@/types';
import { getAuthErrorMessage } from '@/utils/authErrors';

export default function SignupPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // 10초 타임아웃 설정
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('TIMEOUT')), 10000)
        );

        try {
            console.log('Starting signup process...');

            // Promise.race로 타임아웃 적용
            await Promise.race([
                (async () => {
                    // 1. Firebase Auth 사용자 생성
                    console.log('Creating user with auth...');
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
                    console.log('User created:', user.uid);

                    // 2. 프로필 업데이트 (이름)
                    console.log('Updating profile...');
                    await updateProfile(user, {
                        displayName: name,
                    });

                    // 3. Firestore에 사용자 정보 저장
                    console.log('Saving to Firestore...');
                    const newUser: User = {
                        uid: user.uid,
                        email: user.email || '',
                        displayName: name,
                        photoURL: '',
                        interests: [],
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    };

                    await setDoc(doc(db, COLLECTIONS.USERS, user.uid), {
                        ...newUser,
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                    });
                    console.log('Firestore saved.');
                })(),
                timeout
            ]);

            console.log('Redirecting to Home...');
            router.push(ROUTES.HOME);
        } catch (err: any) {
            console.error('Signup Error:', err);
            if (err.message === 'TIMEOUT') {
                setError('요청 시간이 초과되었습니다. 네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.');
            } else {
                setError(getAuthErrorMessage(err.code || err.message));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        수다방과 함께 성장을 시작하세요!
                    </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                    <Input
                        label="이름"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="홍길동"
                    />
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
                        placeholder="6자 이상 입력해주세요"
                        minLength={6}
                    />

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <Button type="submit" fullWidth isLoading={loading}>
                        가입하기
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    이미 계정이 있으신가요?{' '}
                    <Link href={ROUTES.LOGIN} className="font-medium text-blue-600 hover:text-blue-500">
                        로그인
                    </Link>
                </p>
            </div>
        </div>
    );
}
