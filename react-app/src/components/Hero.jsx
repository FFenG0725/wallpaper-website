// Hero 横幅组件
// 背景为多张壁纸从左往右无限滚动的图片墙 + 渐变蒙版
import { wallpapers, getImageUrl } from '../data/wallpapers'

// 复制一份壁纸列表，用于无缝滚动衔接
//（track 宽度 = 列表总宽，translateX(-50%) 刚好走完一份列表长度）
const marqueeList = [...wallpapers, ...wallpapers]

export default function Hero() {
  return (
    // Hero 区：相对定位 + 溢出隐藏（裁切滚动图片超出部分）
    <section className="relative overflow-hidden">
      {/* 背景滚动层：绝对定位铺满 + 自定义 .hero-marquee-track（flex 横向 + 无限滚动动画） */}
      <div className="absolute inset-0 hero-marquee-track">
        {marqueeList.map((item, i) => (
          // 单张缩略图块：自定义 .hero-marquee-item（固定 240×180 + flex-shrink-0 不被压缩） */}
          <div key={i} className="hero-marquee-item">
            <img
              src={getImageUrl(item, 240, 180)}
              alt={item.title}
              width={240}
              height={180}
              // 不用 lazy：滚动时触发懒加载会造成卡顿
              // 不用 alt 之外的属性，让浏览器一次性解码完
            />
          </div>
        ))}
      </div>

      {/* 黑色蒙版：纯色半透明，不用 backdrop-blur（blur 在滚动元素上会持续重新计算导致严重卡顿） */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* 圆点装饰：绝对铺满 / 透明度 10% / radial-gradient 画白色小圆点，每 40px 重复一次 */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* 内容层：相对定位（在蒙版之上）/ 最大宽度居中 + 内边距大（移动 96 / 桌面 128）/ 文字居中白色 */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center text-white">
        {/* 顶部小标签：内联块 / 内边距 / 12px / 半透明白底 + 模糊 / 圆角胶囊 */}
        <span className="inline-block px-4 py-1 mb-6 text-xs font-medium bg-white/20 backdrop-blur rounded-full">
          精选高清壁纸 · 每日更新
        </span>
        {/* 主标题：移动 36px / 桌面 60px / 加粗 / 行高紧凑 / 下边距 24px */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          发现属于你的
          {/* 移动端换行 / 桌面隐藏 */}
          <br className="md:hidden" />
          {/* 「桌面之美」四字：自定义 .text-shimmer（七色彩虹渐变 + 流动动画） */}
          <span className="text-shimmer">
            {' '}桌面之美
          </span>
        </h1>
        {/* 描述：最大宽 42rem 居中 / 白色 80% 透明 / 18px / 下边距 40px */}
        <p className="max-w-2xl mx-auto text-white/80 text-lg mb-10">
          海量 4K / 8K 高清壁纸，覆盖风景、动漫、抽象、极简等多种风格，让你的桌面与众不同
        </p>

        {/* CTA 按钮组：flex 横向 / 移动端纵向 sm:flex-row / 居中 / 间距 16px */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* 主按钮：白底 / 靛蓝字 / 胶囊形 / 悬停变黄+变深灰+放大1.1+按下缩小0.95 / 300ms 过渡 / 大阴影 */}
          <a
            href="#gallery"
            className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-yellow-300 hover:text-gray-900 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg"
          >
            浏览壁纸
          </a>
          {/* 次按钮：透明 / 半透明白边 / 白字 / 胶囊形 / 悬停背景变亮+放大1.1+按下缩小0.95 / 300ms 过渡 */}
          <a
            href="#categories"
            className="px-8 py-3 border-2 border-white/60 text-white font-semibold rounded-full hover:bg-white/10 hover:scale-110 active:scale-95 transition-all duration-300"
          >
            查看分类
          </a>
        </div>
      </div>

      {/* 底部水平过渡条
          高度 32px (h-8)，覆盖 Stats 卡片 -mt-6 (24px) 上移到 Hero 上的范围，
          避免左右两侧露出底部滚动图片造成"漏光" */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-50"></div>
    </section>
  )
}
