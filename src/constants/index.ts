// 앱에서 사용하는 상수 정의

// 관심사/카테고리 목록
export const CATEGORIES = [
    { id: 'stocks', label: '주식/투자', emoji: '📈' },
    { id: 'reading', label: '독서', emoji: '📚' },
    { id: 'exercise', label: '운동/건강', emoji: '💪' },
    { id: 'coding', label: '개발/IT', emoji: '💻' },
    { id: 'language', label: '언어학습', emoji: '🌍' },
    { id: 'career', label: '커리어', emoji: '💼' },
    { id: 'lifestyle', label: '라이프스타일', emoji: '🌟' },
    { id: 'other', label: '기타', emoji: '📝' },
] as const;

// 앱 정보
export const APP_INFO = {
    name: '수다방',
    description: '혼자보다 함께, 수다처럼 편하게 성장하는 자기계발 커뮤니티',
    version: '0.1.0',
};

// 라우트 경로
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    ONBOARDING: '/onboarding',
    FEED: '/feed',
    ROOMS: '/rooms',
    ROOM_DETAIL: (id: string) => `/rooms/${id}`,
    GOALS: '/goals',
    PROFILE: '/profile',
    SETTINGS: '/settings',
} as const;

// Firebase 컬렉션 이름
export const COLLECTIONS = {
    USERS: 'users',
    ROOMS: 'rooms',
    MESSAGES: 'messages',
    GOALS: 'goals',
    POSTS: 'posts',
    COMMENTS: 'comments',
} as const;
