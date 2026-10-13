// 顶部导航栏组件
// 受控搜索框：通过 props 接收当前值 + onChange 回调（状态提升到 App）
export default function Navbar({ searchKeyword = '', onSearchChange }) {
  // 处理输入：交给父组件管理状态，本组件无内部 state
  const handleInput = (e) => {
    onSearchChange?.(e.target.value)
  }
  // 处理回车：跳到画廊区，让用户立刻看到搜索结果
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
    }
  }
  // 清空搜索
  const handleClear = () => {
    onSearchChange?.('')
    // 让搜索框重新获得焦点，方便继续输入
    document.getElementById('nav-search-input')?.focus()
  }

  return (
    // 头部：sticky 吸顶 / 最高层级 z-50 / 毛玻璃 + 半透明白底 / 底部细边框
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-100">
      {/* 导航：最大宽 80rem 居中 + 内边距 / flex 两端对齐 */}
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo 链接：flex 横向 + 间距 / .group 让子元素能用 group-hover 触发联动 */}
        <a href="#" className="flex items-center gap-2 group">
          {/* 小猫脸图标容器：36×36 / 圆角 / 粉橙渐变背景 / 阴影 / 悬停旋转 6° / 300ms 过渡 */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-400 via-rose-400 to-orange-400 flex items-center justify-center shadow-lg shadow-pink-200 group-hover:rotate-6 transition-transform duration-300">
            {/* 可爱小猫脸 SVG */}
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              {/* 左耳 */}
              <path d="M5 9 L2.5 3 L8 5.5 Z" />
              {/* 右耳 */}
              <path d="M19 9 L21.5 3 L16 5.5 Z" />
              {/* 圆脸 */}
              <circle cx="12" cy="13" r="7" />
              {/* 左眼（白色） */}
              <circle cx="9.3" cy="11.5" r="0.9" fill="#fff" />
              {/* 右眼（白色） */}
              <circle cx="14.7" cy="11.5" r="0.9" fill="#fff" />
              {/* 鼻子（粉色小三角） */}
              <path d="M11 14 L13 14 L12 15 Z" fill="#fbcfe8" />
              {/* 嘴巴（微笑曲线） */}
              <path d="M10.5 15.5 Q12 16.8 13.5 15.5" stroke="#fff" fill="none" strokeWidth="0.7" strokeLinecap="round" />
              {/* 左胡须 */}
              <line x1="6.5" y1="13.5" x2="3.5" y2="13" stroke="#fff" strokeWidth="0.4" strokeLinecap="round" />
              <line x1="6.5" y1="14.5" x2="3.8" y2="15" stroke="#fff" strokeWidth="0.4" strokeLinecap="round" />
              {/* 右胡须 */}
              <line x1="17.5" y1="13.5" x2="20.5" y2="13" stroke="#fff" strokeWidth="0.4" strokeLinecap="round" />
              <line x1="17.5" y1="14.5" x2="20.2" y2="15" stroke="#fff" strokeWidth="0.4" strokeLinecap="round" />
            </svg>
          </div>
          {/* 站名：20px / 加粗 / 字距收紧 */}
          <span className="text-xl font-bold tracking-tight">壁纸画廊</span>
        </a>

        {/* 桌面菜单：md 以上显示（移动端 hidden）/ flex 横向 / 间距 32px / 14px 加粗 */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {/* 菜单项：悬停变靛蓝 / 颜色过渡 */}
          <li><a href="#" className="hover:text-indigo-500 transition-colors">首页</a></li>
          <li><a href="#gallery" className="hover:text-indigo-500 transition-colors">壁纸</a></li>
          <li><a href="#categories" className="hover:text-indigo-500 transition-colors">分类</a></li>
          <li><a href="#" className="hover:text-indigo-500 transition-colors">关于</a></li>
        </ul>

        {/* 右侧：搜索框 + 头像 / flex 横向 / 间距 12px */}
        <div className="flex items-center gap-3">
          {/* 搜索框：sm 以上显示 / 灰色胶囊形 / 内边距 / 宽 16rem / 聚焦时显示靛蓝光圈 */}
          <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-indigo-200 transition">
            {/* 搜索图标：16×16 灰色 */}
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {/* 输入框：透明背景 / 无外框 / 14px / 左边距 8px / flex-1 占满剩余宽 */}
            <input
              id="nav-search-input"
              type="text"
              value={searchKeyword}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="搜索壁纸标题..."
              className="bg-transparent outline-none text-sm ml-2 flex-1"
            />
            {/* 清除按钮：20×20 圆形 / 灰底白字 / 悬停变深 */}
            {searchKeyword && (
              <button
                onClick={handleClear}
                className="ml-1 w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center hover:bg-gray-400 transition"
                title="清空搜索"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {/* 头像按钮：40×40 圆形 / 靛蓝粉渐变 / 白字 / 悬停放大 1.05 */}
          <button className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white flex items-center justify-center hover:scale-105 transition-transform">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
