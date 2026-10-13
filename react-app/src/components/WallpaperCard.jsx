// 单张壁纸卡片
// 接收 props：item（壁纸数据）、index（用于动画延迟）、onPreview（点击预览回调）
import { useState } from 'react'
import { getImageUrl } from '../data/wallpapers'

export default function WallpaperCard({ item, index, onPreview }) {
  // 实际图片分辨率，img 加载完成后从 naturalWidth/Height 拿到
  // null 表示还没加载完，此时显示「...」占位
  const [realSize, setRealSize] = useState(null)

  // 处理点击：如果点击的是下载按钮则不触发预览
  const handleClick = (e) => {
    if (e.target.closest('.download-btn')) return
    onPreview(item)
  }

  // 图片加载完成后读取真实分辨率
  const handleLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target
    if (naturalWidth && naturalHeight) {
      setRealSize({ w: naturalWidth, h: naturalHeight })
    }
  }

  return (
    // 卡片容器：自定义 CSS 类 .wallpaper-card（圆角 + 阴影 + 悬浮上浮 + 遮罩渐显）
    // animationDelay 让每张卡片错峰淡入（index * 0.05s）
    <div
      className="wallpaper-card"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={handleClick}
    >
      {/* 图片：懒加载，加载完触发 handleLoad 拿真实分辨率 */}
      <img
        src={getImageUrl(item, item.w, item.h)}
        alt={item.title}
        loading="lazy"
        onLoad={handleLoad}
      />
      {/* 悬浮遮罩层：自定义 CSS 类 .card-overlay（默认透明，悬浮渐显） */}
      <div className="card-overlay">
        {/* 分类标签：自定义 CSS 类 .card-tag（左上角胶囊形半透明黑底白字） */}
        <span className="card-tag">{item.category}</span>
        {/* 卡片信息：标题 + 分辨率，悬浮时从下方滑入 */}
        <div className="card-info">
          {/* 标题：18px / 加粗 */}
          <h3 className="font-semibold text-lg">{item.title}</h3>
          {/* 分辨率文字：12px / 白色半透明 / 上边距 4px */}
          <p className="text-xs text-white/70 mt-1">
            {realSize ? `${realSize.w} × ${realSize.h}` : '...'} · 高清
          </p>
        </div>
      </div>
      {/* 下载按钮：自定义 CSS 类 .download-btn（右上角圆形按钮，悬浮才显示） */}
      <a
        className="download-btn"
        href={getImageUrl(item, 1920, 1080)}
        download
        title="下载壁纸"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 下载图标：20×20 / 描边样式 */}
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </a>
    </div>
  )
}
