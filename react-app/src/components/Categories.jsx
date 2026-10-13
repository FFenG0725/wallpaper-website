// 分类筛选组件
// 通过 props 接收当前分类和切换回调，体现单向数据流
import { categories } from '../data/wallpapers'

export default function Categories({ active, onChange }) {
  return (
    // 容器：最大宽度 80rem 居中 + 左右内边距 24px + 上下内边距 64px
    <section id="categories" className="max-w-7xl mx-auto px-6 py-12">
      {/* 标题：30px 字号 / 加粗 / 居中 / 下边距 8px */}
      <h2 className="text-3xl font-bold text-center mb-2">浏览分类</h2>
      {/* 副标题：灰色 / 居中 / 下边距 40px */}
      <p className="text-gray-500 text-center mb-10">按风格快速找到你喜欢的壁纸</p>

      {/* 按钮组：flex 横向排布 + 内容过多自动换行 + 居中 + 间距 12px */}
      <div className="flex flex-wrap justify-center gap-8">
        {categories.map((cat) => {
          const isActive = active === cat
          return (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              className={
                isActive
                  ? 'px-5 py-2 rounded-full bg-indigo-500 text-white text-sm font-medium shadow-md shadow-indigo-200'
                  : 'px-5 py-2 rounded-full bg-white text-gray-700 text-sm font-medium border border-gray-200 hover:border-indigo-300 hover:text-indigo-500 transition'
              }
            >
              {cat}
            </button>
          )
        })}
      </div>
    </section>
  )
}
