'use client';

import React, { useEffect, useState } from 'react';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp,
    where,
    doc,
    updateDoc,
    deleteDoc,
    Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Goal, RoomCategory } from '@/types';
import { COLLECTIONS } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';

export function useGoals() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setGoals([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        // 내 목표만 조회
        const q = query(
            collection(db, COLLECTIONS.GOALS),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const goalData = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
                        targetDate: data.targetDate?.toDate ? data.targetDate.toDate() : undefined,
                    };
                }) as Goal[];
                setGoals(goalData);
                setLoading(false);
            },
            (err) => {
                console.error('Error fetching goals:', err);
                setError('목표를 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    const createGoal = async (title: string, category: RoomCategory, targetDate?: Date) => {
        if (!user) throw new Error('로그인이 필요합니다.');

        try {
            const newGoal = {
                userId: user.uid,
                title,
                category,
                targetDate: targetDate ? Timestamp.fromDate(targetDate) : null,
                isCompleted: false,
                progress: 0,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            await addDoc(collection(db, COLLECTIONS.GOALS), newGoal);
        } catch (err) {
            console.error('Error creating goal:', err);
            throw err;
        }
    };

    const updateProgress = async (goalId: string, progress: number) => {
        try {
            const goalRef = doc(db, COLLECTIONS.GOALS, goalId);
            await updateDoc(goalRef, {
                progress,
                isCompleted: progress >= 100,
                updatedAt: serverTimestamp(),
            });
        } catch (err) {
            console.error('Error updating progress:', err);
            throw err;
        }
    };

    const deleteGoal = async (goalId: string) => {
        try {
            await deleteDoc(doc(db, COLLECTIONS.GOALS, goalId));
        } catch (err) {
            console.error('Error deleting goal:', err);
            throw err;
        }
    };

    return { goals, loading, error, createGoal, updateProgress, deleteGoal };
}
