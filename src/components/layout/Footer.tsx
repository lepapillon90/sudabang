export function Footer() {
    return (
        <footer className="bg-white border-t py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900">수다방 ☕</h3>
                        <p className="text-sm text-gray-500">
                            함께 웃고 떠들며 성장하는<br />
                            우리들의 따뜻한 커뮤니티
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">서비스</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-blue-600">기능 소개</a></li>
                            <li><a href="#" className="hover:text-blue-600">요금제</a></li>
                            <li><a href="#" className="hover:text-blue-600">자주 묻는 질문</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">회사</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-blue-600">팀 소개</a></li>
                            <li><a href="#" className="hover:text-blue-600">채용</a></li>
                            <li><a href="#" className="hover:text-blue-600">블로그</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">고객센터</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>contact@sudabang.com</li>
                            <li>운영시간: 평일 10:00 - 18:00</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t pt-8 text-center text-xs text-gray-400">
                    &copy; 2024 Sudabang. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
