import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface MessageInputProps {
    onSend: (content: string) => Promise<void>;
    disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
    const [text, setText] = useState('');
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || sending) return;

        setSending(true);
        try {
            await onSend(text);
            setText('');
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setSending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="메시지를 입력하세요..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50"
                disabled={disabled || sending}
            />
            <Button
                type="submit"
                disabled={!text.trim() || disabled || sending}
                className="rounded-full px-6"
                isLoading={sending}
            >
                전송
            </Button>
        </form>
    );
}
