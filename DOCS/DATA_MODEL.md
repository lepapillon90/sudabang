# 🗂️ Data Model (데이터 모델)

> 수다방(Sudabang) 앱의 데이터베이스 스키마 및 TypeScript 인터페이스 구조

---

## 1. 개요
- **Database**: Firebase Firestore (NoSQL)
- **Type Definition**: `src/types/index.ts`
- **ID 생성**: Firestore Auto-generated ID 사용

---

## 2. 컬렉션 구조 (Collections)

### `users` (사용자)
가입한 사용자 정보
```typescript
interface User {
  uid: string;           // Firebase Auth UID (Document ID)
  email: string;         // 이메일
  displayName: string;   // 닉네임 (실명)
  photoURL?: string;     // 프로필 사진 URL
  interests: string[];   // 관심사 태그 목록
  createdAt: Timestamp;  // 가입일
  updatedAt: Timestamp;  // 수정일
}
```

### `rooms` (채팅방)
개설된 채팅방 정보
```typescript
interface Room {
  id: string;            // Auto ID
  name: string;          // 채팅방 이름
  description: string;   // 설명
  category: RoomCategory;// 카테고리 (stocks, reading, exercise...)
  creatorId: string;     // 개설자 UID
  memberIds: string[];   // 참여자 UID 목록 (배열)
  memberCount: number;   // 참여자 수 (denormalized for performance)
  imageURL?: string;     // 커버 이미지
  createdAt: Timestamp;  // 개설일
  updatedAt: Timestamp;  // 수정일
}
```

### `goals` (목표)
사용자의 개인 목표
```typescript
interface Goal {
  id: string;            // Auto ID
  userId: string;        // 소유자 UID
  title: string;         // 목표 제목
  description?: string;  // 상세 설명
  category: RoomCategory;// 관련 카테고리
  targetDate?: Timestamp;// 목표 달성일
  isCompleted: boolean;  // 완료 여부
  progress: number;      // 진행률 (0~100)
  createdAt: Timestamp;  // 생성일
  updatedAt: Timestamp;  // 수정일
}
```

---

## 3. 열거형 (Enums / Types)

### RoomCategory
채팅방 및 목표 카테고리
- `stocks` (주식/투자)
- `reading` (독서)
- `exercise` (운동/건강)
- `coding` (개발/IT)
- `language` (언어학습)
- `career` (커리어)
- `lifestyle` (라이프스타일)
- `other` (기타)

---

## 4. 향후 추가 예정 모델

### `messages` (메시지)
채팅방 내 메시지 (Subcollection of room or Top-level)
```typescript
interface Message {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  content: string;
  type: 'text' | 'image' | 'system';
  createdAt: Timestamp;
}
```

### `posts` (피드 게시글)
커뮤니티 피드
```typescript
interface Post {
  id: string;
  authorId: string;
  content: string;
  imageURL?: string;
  category: RoomCategory;
  likeCount: number;
  commentCount: number;
  createdAt: Timestamp;
}
```
