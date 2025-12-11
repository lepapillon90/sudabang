# 🎨 Design System

> 수다방(Sudabang) 앱의 디자인 시스템 및 컴포넌트 가이드

---

## 1. 개요 (Overview)
- **Framework**: Tailwind CSS v4
- **Theme**: Premium Dark (Slate & Amber)
- **Icon Set**: Lucide React / Emoji
- **Font**: Inter (Body), Serif (Headings)

---

## 2. 색상 팔레트 (Color Palette)
Premium Dark 테마를 사용하여 고급스럽고 몰입감 있는 경험을 제공합니다.

### 배경색 (Deep Night)
- **Main**: `bg-slate-950` (#020617) - 전체 페이지 배경
- **Card**: `bg-slate-900/50` (Glassmorphism) - 카드, 컨테이너 배경 (유리 효과)
- **Overlay**: `bg-black/40` - 모달 뒷배경 오버레이

### 강조색 (Amber)
- **Primary**: `text-amber-400`, `bg-amber-500` - 주요 강조, 버튼, 아이콘
- **Gradient**: `from-amber-500 to-amber-600` - 브랜드 그라디언트
- **Glow**: `shadow-amber-900/20` - 은은한 발광 효과

### 텍스트 (Slate)
- **Headings**: `text-white` (#FFFFFF) - 주요 타이틀
- **Body**: `text-slate-200` (#E2E8F0) - 본문 텍스트
- **Muted**: `text-slate-400` (#94A3B8) - 부가 정보, 캡션

### Feedback
- **Success**: `text-amber-400` (목표 달성 - 브랜드 컬러 통일)
- **Error**: `text-red-400` (에러 메시지)

---

## 3. 타이포그래피 (Typography)
**Inter**를 기본으로 하되, 감성적인 전달을 위해 **Serif**를 헤드라인에 사용합니다.

| 용도 | 스타일 | Tailwind Class |
|------|--------|----------------|
| Hero Title | Serif 48~72px | `font-serif text-5xl md:text-7xl font-bold` |
| Page Title | Serif 30px | `font-serif text-3xl font-bold` |
| Section Title | Sans 20px | `text-xl font-bold` |
| Card Title | Sans 18px | `text-lg font-bold text-slate-100` |
| Body Text | Sans 16px | `text-base text-slate-200` |
| Small Text | Sans 14px | `text-sm text-slate-400` |

---

## 4. UI 컴포넌트 (Components)

### Glass Card
- **스타일**: 배경 투명도와 블러 효과를 조합하여 깊이감 형성
- **Class**: `bg-slate-900/50 border border-slate-800 backdrop-blur-sm`
- **Hover**: `hover:bg-slate-900/80 hover:border-amber-500/30`

### Button
- **위치**: `src/components/ui/Button.tsx`
- **Primary**: Amber Gradient (`bg-gradient-to-r from-amber-500 to-amber-600`)
- **Outline**: Slate Border (`border-slate-700 text-slate-300 hover:text-white`)
- **Ghost**: Transparent (`hover:bg-slate-800/50`)

```tsx
<Button variant="primary" className="shadow-lg shadow-amber-900/20">
  시작하기
</Button>
```

### Input / Select
- **위치**: `src/components/ui/Input.tsx`, `src/components/ui/Select.tsx`
- **스타일**: Dark Slate 배경, Amber Focus Ring
- **Class**: `bg-slate-900 border-slate-700 text-slate-200 focus:ring-amber-500`

### ProgressBar
- **위치**: `src/components/ui/ProgressBar.tsx`
- **Track**: `bg-slate-800`
- **Indicator**: Amber Gradient (`from-amber-500 to-amber-600`)

---
