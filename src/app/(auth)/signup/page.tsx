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

        try {
            // 1. Firebase Auth 사용자 생성
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. 프로필 업데이트 (이름)
            await updateProfile(user, {
                displayName: name,
            });

            // 3. Firestore에 사용자 정보 저장
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

            router.push(ROUTES.HOME);
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError('이미 사용 중인 이메일입니다.');
            } else if (err.code === 'auth/weak-password') {
                setError('비밀번호는 6자 이상이어야 합니다.');
            } else {
                setError('회원가입 중 오류가 발생했습니다.');
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
