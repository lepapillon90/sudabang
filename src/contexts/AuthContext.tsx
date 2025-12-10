'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User as FirebaseUser,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { User } from '@/types';
import { COLLECTIONS } from '@/constants';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithGoogle: async () => { },
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {
                // Firestore에서 사용자 정보 조회
                const userRef = doc(db, COLLECTIONS.USERS, firebaseUser.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    // 기존 사용자
                    setUser(userSnap.data() as User);
                } else {
                    // 신규 사용자 - Firestore에 저장
                    const newUser: User = {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email || '',
                        displayName: firebaseUser.displayName || '사용자',
                        photoURL: firebaseUser.photoURL || '',
                        interests: [],
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    };

                    // Date 객체는 Firestore 저장 시 변환이 필요할 수 있으나, 
                    // 여기서는 클라이언트 상태 관리를 위해 그대로 둠.
                    // 실제 저장 시에는 serverTimestamp()를 사용하는 것이 좋음.
                    await setDoc(userRef, {
                        ...newUser,
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                    });

                    setUser(newUser);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Google Sign-in error:', error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error('Sign-out error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
