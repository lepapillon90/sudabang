'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@/constants';

export default function RoomDetailPage() {
    const params = useParams();
    const id = params.id as string;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">채팅방 상세 (준비 중)</h1>
            <p className="mb-8 text-gray-600">Room ID: {id}</p>

            <Link
                href={ROUTES.ROOMS}
                className="text-blue-600 hover:underline"
            >
                목록으로 돌아가기
            </Link>
        </div>
    );
}
