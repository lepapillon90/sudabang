'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS, ROUTES } from '@/constants';
import { Room } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useMessages } from '@/hooks/useMessages';
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';
import { Button } from '@/components/ui/Button';

export default function RoomDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const { user } = useAuth();

    // Room Data State
    const [room, setRoom] = useState<Room | null>(null);
    const [loadingRoom, setLoadingRoom] = useState(true);

    // Messages Hook
    const { messages, loading: loadingMessages, sendMessage } = useMessages(id);

    // Fetch Room Data
    useEffect(() => {
        const fetchRoom = async () => {
            if (!id) return;
            try {
                const roomRef = doc(db, COLLECTIONS.ROOMS, id);
                const roomSnap = await getDoc(roomRef);

                if (roomSnap.exists()) {
                    const data = roomSnap.data();
                    // Convert Timestamp to Date for initial fetch if needed, 
                    // but here we just need basic metadata like name.
                    setRoom({ id: roomSnap.id, ...data } as Room);
                } else {
                    alert('존재하지 않는 채팅방입니다.');
                    router.push(ROUTES.ROOMS);
                }
            } catch (error) {
                console.error('Error fetching room:', error);
                alert('채팅방 정보를 불러오는데 실패했습니다.');
            } finally {
                setLoadingRoom(false);
            }
        };

        fetchRoom();
    }, [id, router]);

    const handleSendMessage = async (content: string) => {
        if (!user) {
            alert('로그인이 필요합니다.');
            return;
        }
        await sendMessage(user, content);
    };

    if (loadingRoom) {
        return <div className="flex h-screen items-center justify-center">Loading Room...</div>;
    }

    if (!room) return null;

    return (
        <div className="flex flex-col h-[100dvh] bg-white max-w-4xl mx-auto shadow-sm">
            {/* Header */}
            <div className="h-16 border-b flex items-center justify-between px-6 bg-white sticky top-0 z-10">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{room.name}</h1>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {room.category}
                    </span>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    className="hover:bg-gray-200"
                    onClick={() => router.push(ROUTES.ROOMS)}
                >
                    나가기
                </Button>
            </div>

            {/* Message List Area */}
            <MessageList messages={messages} />

            {/* Input Area */}
            <MessageInput onSend={handleSendMessage} disabled={!user} />
        </div>
    );
}
