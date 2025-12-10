// 사용자 타입 정의
export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    interests: string[]; // 관심사 목록
    createdAt: Date;
    updatedAt: Date;
}

// 채팅방 타입 정의
export interface Room {
    id: string;
    name: string;
    description: string;
    category: RoomCategory;
    creatorId: string;
    memberIds: string[];
    memberCount: number;
    imageURL?: string;
    createdAt: Date;
    updatedAt: Date;
}

// 채팅방 카테고리
export type RoomCategory =
    | 'stocks'      // 주식
    | 'reading'     // 독서
    | 'exercise'    // 운동
    | 'coding'      // 개발
    | 'language'    // 언어
    | 'career'      // 커리어
    | 'lifestyle'   // 라이프스타일
    | 'other';      // 기타

// 메시지 타입 정의
export interface Message {
    id: string;
    roomId: string;
    senderId: string;
    senderName: string;
    senderPhotoURL?: string;
    content: string;
    type: 'text' | 'image' | 'system';
    createdAt: Date;
}

// 목표 타입 정의
export interface Goal {
    id: string;
    userId: string;
    title: string;
    description?: string;
    category: RoomCategory;
    targetDate?: Date;
    isCompleted: boolean;
    progress: number; // 0-100
    createdAt: Date;
    updatedAt: Date;
}

// 피드 게시글 타입 정의
export interface Post {
    id: string;
    authorId: string;
    authorName: string;
    authorPhotoURL?: string;
    content: string;
    imageURL?: string;
    category: RoomCategory;
    likeCount: number;
    commentCount: number;
    createdAt: Date;
    updatedAt: Date;
}

// 댓글 타입 정의
export interface Comment {
    id: string;
    postId: string;
    authorId: string;
    authorName: string;
    authorPhotoURL?: string;
    content: string;
    createdAt: Date;
}
