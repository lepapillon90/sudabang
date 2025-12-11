import { useState, useEffect } from 'react';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp,
    where,
    limit,
    Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Message, User } from '@/types';
import { COLLECTIONS } from '@/constants';

export function useMessages(roomId: string) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!roomId) return;

        setLoading(true);

        // 1. roomId에 해당하는 메시지 컬렉션 참조 (서브컬렉션 사용 권장하지만, 데이터 모델 문서에 따라 유연하게 대처)
        // 여기서는 데이터 모델 문서의 'Subcollection of room'을 따름: rooms/{roomId}/messages
        const messagesRef = collection(db, COLLECTIONS.ROOMS, roomId, 'messages');

        // 2. 쿼리 생성 (생성일순 정렬)
        const q = query(
            messagesRef,
            orderBy('createdAt', 'asc'),
            limit(100) // 최근 100개만 (성능 최적화)
        );

        // 3. 실시간 리스너 등록
        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const newMessages = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        // Firestore Timestamp를 JS Date로 변환
                        createdAt: data.createdAt instanceof Timestamp
                            ? data.createdAt.toDate()
                            : new Date(),
                    } as Message;
                });
                setMessages(newMessages);
                setLoading(false);
            },
            (err) => {
                console.error('Error fetching messages:', err);
                setError('메시지를 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [roomId]);

    // 메시지 전송 함수
    const sendMessage = async (user: User, content: string, type: 'text' | 'image' = 'text') => {
        if (!content.trim() && type === 'text') return;

        try {
            const messagesRef = collection(db, COLLECTIONS.ROOMS, roomId, 'messages');
            await addDoc(messagesRef, {
                roomId,
                senderId: user.uid,
                senderName: user.displayName,
                senderPhotoURL: user.photoURL || '',
                content: content.trim(),
                type,
                createdAt: serverTimestamp(),
            });
        } catch (err) {
            console.error('Error sending message:', err);
            throw new Error('메시지 전송 실패');
        }
    };

    return { messages, loading, error, sendMessage };
}
