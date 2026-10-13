// 底部 Footer
export default function Footer() {
  return (
    // 外层：深灰底 + 灰字（#1f2937 / #9ca3af） */}
    <footer className="bg-gray-900 text-gray-400">
      {/* 内容区：最大宽 80rem 居中 / 内边距 48px / 2×2 网格（桌面 4 列）/ 列间距 32px */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* 第 1 栏：跨 2 列（移动端）/ 跨 1 列（桌面） */}
        <div className="col-span-2 md:col-span-1">
          {/* Logo 区：flex / 间距 8px / 下边距 16px */}
          <div className="flex items-center gap-2 mb-4">
            {/* 小猫图标：36×36 / 圆角 / 粉橙渐变 / 阴影 */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-400 via-rose-400 to-orange-400 flex items-center justify-center shadow-lg shadow-pink-200">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 9 L2.5 3 L8 5.5 Z" />
                <path d="M19 9 L21.5 3 L16 5.5 Z" />
                <circle cx="12" cy="13" r="7" />
                <circle cx="9.3" cy="11.5" r="0.9" fill="#fff" />
                <circle cx="14.7" cy="11.5" r="0.9" fill="#fff" />
                <path d="M11 14 L13 14 L12 15 Z" fill="#fbcfe8" />
                <path d="M10.5 15.5 Q12 16.8 13.5 15.5" stroke="#fff" fill="none" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="6.5" y1="13.5" x2="3.5" y2="13" stroke="#fff" strokeWidth="0.4" strokeLinecap="round" />
                <line x1="6.5" y1="14.5" x2="3.8" y2="15" stroke="#fff" strokeWidth="0.4" strokeLinecap="round" />
                <line x1="17.5" y1="13.5" x2="20.5" y2="13" stroke="#fff" strokeWidth="0.4" strokeLinecap="round" />
                <line x1="17.5" y1="14.5" x2="20.2" y2="15" stroke="#fff" strokeWidth="0.4" strokeLinecap="round" />
              </svg>
            </div>
            {/* 站名：白字 / 20px / 加粗 */}
            <span className="text-white text-xl font-bold">壁纸画廊</span>
          </div>
          {/* 介绍：14px / 行高 1.625 */}
          <p className="text-sm leading-relaxed">
            分享高清美图，点亮你的桌面生活。所有壁纸均可免费下载。
          </p>
        </div>

        {/* 第 2 栏：分类列表 */}
        <div>
          {/* 栏标题：白字 / 加粗 / 下边距 16px */}
          <h4 className="text-white font-semibold mb-4">分类</h4>
          {/* 列表：行间距 8px / 14px */}
          <ul className="space-y-2 text-sm">
            {/* 链接：悬停变白 / 过渡 */}
            <li><a href="#" className="hover:text-white transition">风景自然</a></li>
            <li><a href="#" className="hover:text-white transition">动漫卡通</a></li>
            <li><a href="#" className="hover:text-white transition">抽象艺术</a></li>
            <li><a href="#" className="hover:text-white transition">极简风格</a></li>
          </ul>
        </div>

        {/* 第 3 栏：关于列表 */}
        <div>
          <h4 className="text-white font-semibold mb-4">关于</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">关于我们</a></li>
            <li><a href="#" className="hover:text-white transition">投稿须知</a></li>
            <li><a href="#" className="hover:text-white transition">版权声明</a></li>
            <li><a href="#" className="hover:text-white transition">联系我们</a></li>
          </ul>
        </div>

        {/* 第 4 栏：社交链接 */}
        <div>
          <h4 className="text-white font-semibold mb-4">关注我们</h4>
          {/* 图标组：flex / 间距 12px */}
          <div className="flex gap-3">
            {/* 社交圆形按钮：36×36 / 圆形 / 深灰底 / 悬停变靛蓝 */}
            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-500 transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231z" /></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-500 transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.251 0-3.661.012-4.941.071-4.358.198-6.781 2.621-6.979 6.979-.059 1.28-.07 1.69-.07 4.941 0 3.251.012 3.661.07 4.941.198 4.358 2.621 6.781 6.979 6.979 1.28.059 1.69.071 4.941.071 3.251 0 3.661-.012 4.941-.07 4.358-.198 6.781-2.622 6.979-6.979.059-1.28.07-1.69.07-4.941 0-3.251-.012-3.661-.07-4.941-.198-4.358-2.621-6.781-6.979-6.979-1.28-.059-1.69-.071-4.941-.071zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-10.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* 底栏：上边框 + 内边距 16px / 居中 / 14px */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm">
          © 2026 壁纸画廊 · 仅供学习交流使用
        </div>
      </div>
    </footer>
  )
}
