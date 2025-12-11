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
    QueryConstraint
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Room, RoomCategory } from '@/types';
import { COLLECTIONS } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';

export function useRooms(category?: RoomCategory | 'all') {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        setLoading(true);

        const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];

        if (category && category !== 'all') {
            constraints.unshift(where('category', '==', category));
        }

        const q = query(collection(db, COLLECTIONS.ROOMS), ...constraints);

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const roomData = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name,
                        description: data.description,
                        category: data.category,
                        creatorId: data.creatorId,
                        memberIds: data.memberIds,
                        memberCount: data.memberCount,
                        imageURL: data.imageURL,
                        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
                    };
                }) as Room[];
                setRooms(roomData);
                setLoading(false);
            },
            (err) => {
                console.error('Error fetching rooms:', err);
                setError('채팅방을 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [category]);

    const createRoom = async (name: string, description: string, category: RoomCategory) => {
        if (!user) throw new Error('로그인이 필요합니다.');

        try {
            const newRoom = {
                name,
                description,
                category,
                creatorId: user.uid,
                memberIds: [user.uid],
                memberCount: 1,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            const docRef = await addDoc(collection(db, COLLECTIONS.ROOMS), newRoom);
            return docRef.id;
        } catch (err) {
            console.error('Error creating room:', err);
            throw err;
        }
    };

    return { rooms, loading, error, createRoom };
}
