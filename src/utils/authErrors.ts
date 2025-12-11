export function getAuthErrorMessage(code: string): string {
    switch (code) {
        case 'auth/user-not-found':
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
            return '이메일 또는 비밀번호가 올바르지 않습니다.';
        case 'auth/email-already-in-use':
            return '이미 사용 중인 이메일입니다.';
        case 'auth/weak-password':
            return '비밀번호는 6자 이상이어야 합니다.';
        case 'auth/network-request-failed':
            return '네트워크 연결을 확인해주세요.';
        case 'auth/too-many-requests':
            return '너무 많은 시도가 감지되었습니다. 잠시 후 다시 시도해주세요.';
        case 'auth/configuration-not-found':
            return '서버 인증 설정이 비활성화되어 있습니다. 관리자에게 문의하세요.';
        case 'auth/invalid-email':
            return '유효하지 않은 이메일 형식입니다.';
        case 'auth/popup-closed-by-user':
            return '로그인 창이 닫혔습니다. 다시 시도해주세요.';
        default:
            return '로그인/회원가입 중 오류가 발생했습니다. (' + code + ')';
    }
}
