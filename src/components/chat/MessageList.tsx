import React, { useEffect, useRef } from 'react';
import { Message } from '@/types';
import { MessageItem } from './MessageItem';

interface MessageListProps {
    messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    // 새 메시지가 오면 스크롤을 맨 아래로 이동
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-2">
            {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <p>아직 메시지가 없습니다.</p>
                    <p className="text-sm">첫 번째 메시지를 남겨보세요!</p>
                </div>
            ) : (
                messages.map((msg) => (
                    <MessageItem key={msg.id} message={msg} />
                ))
            )}
            <div ref={bottomRef} />
        </div>
    );
}
