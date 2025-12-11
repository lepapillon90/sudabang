# 🛠️ Technology Roadmap

## 1. Frontend Architecture
- [x] **Next.js 14 (App Router)**: 최신 리액트 프레임워크 기반
- [x] **Tailwind CSS v4 + PostCSS**: 모던한 스타일링 시스템
- [ ] **PWA (Progressive Web App)**:
    - `next-pwa` 도입으로 앱 설치 경험 제공
    - 오프라인 지원 (Service Worker) 강화
- [ ] **State Management**:
    - 현재: React Context API (MVP에 적합)
    - 향후: 복잡도 증가 시 `Zustand` 또는 `Recoil` 도입 검토
- [ ] **Performance**:
    - 이미지 최적화 (Next/Image 심화)
    - Code Splitting 및 Dynamic Import 적용

## 2. Backend & Infrastructure (Firebase)
- [x] **Firestore**: NoSQL DB 구조 최적화
- [x] **Authentication**: Social Login (Google) + Email
- [ ] **Cloud Functions**:
    - 썸네일 자동 생성 (Image Resizing)
    - 사용자 삭제 시 관련 데이터(글, 댓글) 정리 트리거
    - 푸시 알림 발송 로직 (FCM)
- [ ] **Security Rules**:
    - 더 정교한 DB 보안 규칙 수립 (예: 본인 글만 수정 가능, 특정 등급 이상만 접근 가능)

## 3. DevOps & Quality Assurance
- [x] **Deployment**: Vercel을 통한 자동 배포
- [ ] **CI/CD Pipeline**:
    - GitHub Actions 도입
    - PR 시 자동 린트(Lint) 및 빌드 테스트
- [ ] **Testing**:
    - Unit Test: `Jest` + `React Testing Library`
    - E2E Test: `Playwright` 또는 `Cypress` (자동화된 시나리오 테스트)
- [ ] **Monitoring**:
    - Sentry 도입 (실시간 에러 트래킹)

## 4. Mobile Strategy
- [ ] **React Native**:
    - Next.js 코드를 기반으로 모바일 앱으로 전환 (Code Sharing)
    - Expo framework 활용하여 빠른 배포
