import React from 'react';
import { Message } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface MessageItemProps {
    message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
    const { user } = useAuth();
    const isMyMessage = user?.uid === message.senderId;

    // 시간 포맷팅 (예: 오전 10:30)
    const formattedTime = new Intl.DateTimeFormat('ko-KR', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).format(message.createdAt);

    return (
        <div className={`flex w-full mb-4 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[70%] ${isMyMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* 프로필 이미지 (상대방일 경우만) */}
                {!isMyMessage && (
                    <div className="flex-shrink-0 mr-2">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                            {message.senderPhotoURL ? (
                                <img src={message.senderPhotoURL} alt={message.senderName} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-xs font-bold text-gray-600">{message.senderName[0]}</span>
                            )}
                        </div>
                    </div>
                )}

                <div className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}>
                    {/* 이름 (상대방일 경우만) */}
                    {!isMyMessage && (
                        <span className="text-xs text-gray-500 mb-1 ml-1">{message.senderName}</span>
                    )}

                    <div className="flex items-end gap-2">
                        {/* 내 메시지일 때 시간 표시 (왼쪽) */}
                        {isMyMessage && (
                            <span className="text-[10px] text-gray-400 min-w-fit mb-1">{formattedTime}</span>
                        )}

                        {/* 말풍선 */}
                        <div
                            className={`px-4 py-2 rounded-2xl text-sm break-all ${isMyMessage
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                                }`}
                        >
                            {message.content}
                        </div>

                        {/* 상대방 메시지일 때 시간 표시 (오른쪽) */}
                        {!isMyMessage && (
                            <span className="text-[10px] text-gray-400 min-w-fit mb-1">{formattedTime}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
