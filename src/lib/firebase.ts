// Firebase 설정 파일
// Firebase Console에서 프로젝트 생성 후 아래 값들을 .env.local에 설정하세요

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase 설정 (환경 변수에서 가져옴)
// Firebase 설정 (환경 변수에서 가져옴)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 디버깅: 설정 확인
console.log('Firebase Init Config:', {
  apiKey: firebaseConfig.apiKey ? 'Set' : 'Missing',
  projectId: firebaseConfig.projectId,
});

// Firebase 앱 초기화 (중복 초기화 방지)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Firestore 초기화 (오프라인 문제 해결을 위한 설정 추가)
// experimentalForceLongPolling: 웹소켓 연결이 불안정할 때 폴링 강제 사용
import { initializeFirestore, memoryLocalCache } from 'firebase/firestore';

export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  localCache: memoryLocalCache(), // 디스크 캐시(IndexedDB) 비활성화 -> 메모리 캐시 사용
});
export const storage = getStorage(app);

export default app;
