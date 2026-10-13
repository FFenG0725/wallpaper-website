// 数据统计卡片组件
const stats = [
  { value: '10,000+', label: '精选壁纸', color: 'text-indigo-500' },
  { value: '8K', label: '最高分辨率', color: 'text-pink-500' },
  { value: '25+', label: '壁纸分类', color: 'text-purple-500' },
  { value: '每日', label: '更新频率', color: 'text-orange-500' }
]

export default function Stats() {
  return (
    // 容器：最大宽度 80rem 居中 + 上移 24px（-mt-6）让卡片浮到 Hero 上 + 相对定位 z-10 显示在 Hero 之上
    <section className="max-w-7xl mx-auto px-6 -mt-6 relative z-10">
      {/* 卡片：4 列网格（移动端 2 列）+ 白底 + 圆角 1rem + 大阴影 + 内边距 24px */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-xl p-6">
        {stats.map((item, i) => (
          // 单格：文字居中
          <div key={i} className="text-center">
            {/* 数字：30px / 加粗 / 颜色由数据决定（item.color 拼进 className） */}
            <div className={`text-3xl font-bold ${item.color}`}>{item.value}</div>
            {/* 标签：14px / 灰色 / 上边距 4px */}
            <div className="text-sm text-gray-500 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
