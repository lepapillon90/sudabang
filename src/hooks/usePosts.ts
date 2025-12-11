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
    deleteDoc,
    updateDoc,
    increment
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Post, RoomCategory } from '@/types';
import { COLLECTIONS } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';

export function usePosts(category?: RoomCategory | 'all') {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        setLoading(true);

        let q = query(
            collection(db, COLLECTIONS.POSTS),
            orderBy('createdAt', 'desc')
        );

        if (category && category !== 'all') {
            q = query(
                collection(db, COLLECTIONS.POSTS),
                where('category', '==', category),
                orderBy('createdAt', 'desc')
            );
        }

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const postData = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
                    };
                }) as Post[];
                setPosts(postData);
                setLoading(false);
            },
            (err) => {
                console.error('Error fetching posts:', err);
                setError('게시글을 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [category]);

    const createPost = async (content: string, category: RoomCategory, imageURL?: string) => {
        if (!user) throw new Error('로그인이 필요합니다.');

        try {
            const newPost = {
                authorId: user.uid,
                authorName: user.displayName,
                authorPhotoURL: user.photoURL,
                content,
                category,
                imageURL: imageURL || null,
                likeCount: 0,
                commentCount: 0,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            await addDoc(collection(db, COLLECTIONS.POSTS), newPost);
        } catch (err) {
            console.error('Error creating post:', err);
            throw err;
        }
    };

    const deletePost = async (postId: string) => {
        if (!user) throw new Error('로그인이 필요합니다.');
        try {
            await deleteDoc(doc(db, COLLECTIONS.POSTS, postId));
        } catch (err) {
            console.error('Error deleting post:', err);
            throw err;
        }
    };

    const likePost = async (postId: string) => {
        if (!user) throw new Error('로그인이 필요합니다.');
        const postRef = doc(db, COLLECTIONS.POSTS, postId);
        await updateDoc(postRef, {
            likeCount: increment(1)
        });
    };

    return { posts, loading, error, createPost, deletePost, likePost };
}
