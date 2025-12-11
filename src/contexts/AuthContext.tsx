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
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
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
        console.log('AuthContext: Initializing...');
        let mounted = true;

        // 5초 타임아웃: Firebase가 응답하지 않으면 로딩 해제
        const timeoutId = setTimeout(() => {
            if (mounted && loading) {
                console.error('AuthContext: Auth initialization timed out.');
                setLoading(false);
            }
        }, 5000);

        let unsubscribeFirestore: (() => void) | null = null;

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
            console.log('AuthContext: Auth state changed', firebaseUser ? 'User logged in' : 'User logged out');
            clearTimeout(timeoutId);

            // Cleanup previous listener
            if (unsubscribeFirestore) {
                unsubscribeFirestore();
                unsubscribeFirestore = null;
            }

            if (firebaseUser) {
                // Connect Firestore Listeners
                const userRef = doc(db, COLLECTIONS.USERS, firebaseUser.uid);

                unsubscribeFirestore = onSnapshot(userRef, async (docSnap) => {
                    if (docSnap.exists()) {
                        // Real-time update
                        if (mounted) setUser(docSnap.data() as User);
                    } else {
                        // Create new user doc if missing (and logic allows)
                        // Note: SignupPage also creates doc, but onSnapshot will handle the update.
                        if (firebaseUser.displayName) {
                            const newUser: User = {
                                uid: firebaseUser.uid,
                                email: firebaseUser.email || '',
                                displayName: firebaseUser.displayName || '사용자',
                                photoURL: firebaseUser.photoURL || '',
                                interests: [],
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            };
                            await setDoc(userRef, {
                                ...newUser,
                                createdAt: serverTimestamp(),
                                updatedAt: serverTimestamp(),
                            });
                        }
                    }
                    if (mounted) setLoading(false);
                }, (error) => {
                    console.error('AuthContext: Firestore listen error', error);
                    if (mounted) setLoading(false);
                });

            } else {
                if (mounted) setUser(null);
                if (mounted) setLoading(false);
            }
        });

        return () => {
            mounted = false;
            clearTimeout(timeoutId);
            unsubscribe();
            if (unsubscribeFirestore) unsubscribeFirestore();
        };
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
