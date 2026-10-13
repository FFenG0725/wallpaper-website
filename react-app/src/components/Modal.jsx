// 壁纸预览模态框（Radix Dialog 版）
// 交互行为全部交给 Radix：Esc 关闭、点遮罩关闭、锁定背景滚动、焦点圈定与还原
// 受控写法和 Switch 同一套契约：open + onOpenChange 必须成对出现
// 外部 API 不变：item（当前壁纸，null 即关闭）+ onClose（关闭回调），App 无需改动
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { getImageUrl } from '../data/wallpapers'

// 焦点环：键盘 Tab 时才出现（focus-visible），鼠标点击不显示
const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2'

export default function Modal({ item, onClose }) {
  // 大图实际分辨率，img 加载完后从 naturalWidth/Height 拿到
  const [realSize, setRealSize] = useState(null)

  // 切换壁纸时重置分辨率，避免显示上一张的值
  useEffect(() => {
    setRealSize(null)
  }, [item])

  // 未选中壁纸时不渲染，避免 item.title / getImageUrl(item) 空引用
  if (!item) return null

  // 图片加载完成时读取真实分辨率
  const handleLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target
    if (naturalWidth && naturalHeight) {
      setRealSize({ w: naturalWidth, h: naturalHeight })
    }
  }

  return (
    // Dialog.Root：状态容器，受控传 open + onOpenChange
    // item 为 null 时 open=false，整个弹窗不渲染
    <Dialog.Root
      open={!!item}
      onOpenChange={(open) => {
        // Esc / 点遮罩 / 点关闭按钮都会走到这里，统一交给父组件
        if (!open) onClose()
      }}
    >
      <Dialog.Portal>
        {/* 遮罩层：固定全屏 / 黑色 80% 透明 + 模糊 / 沿用原有入场动画 */}
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm modal-enter" />

        {/* 内容层：固定全屏 flex 居中 / Radix 自动处理滚动锁定 */}
        <Dialog.Content className="fixed inset-0 z-[70] flex items-center justify-center p-4 focus:outline-none">
          {/* 内容容器：最大宽度 64rem / 全宽 / flex 列布局 + 居中 */}
          <div className="relative max-w-5xl w-full flex flex-col items-center">
            {/* 关闭按钮：Dialog.Close 点击自动触发 onOpenChange(false) / asChild 把样式挂到我们的 button 上 */}
            <Dialog.Close
              asChild
              className={`absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition ${focusRing}`}
            >
              {/* 关闭 × 图标：20×20 / 描边 / aria-label 提供无障碍名称 */}
              <button aria-label="关闭预览">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Dialog.Close>

            {/* 大图：最大宽 100% / 最大高 75vh / 圆角 + 大阴影 + 入场动画 */}
            <img
              src={getImageUrl(item, 1600, 1000)}
              alt={item.title}
              className="max-w-full max-h-[75vh] w-auto rounded-2xl shadow-2xl modal-img-enter"
              onLoad={handleLoad}
            />

            {/* 标题 + 下载按钮区：上边距 16px / 两端对齐 */}
            <div className="mt-4 w-full flex items-center justify-between text-white">
              <div>
                {/* Dialog.Title：读屏必需的弹窗标题（外观和普通 h3 一样） */}
                <Dialog.Title className="text-lg font-semibold">{item.title}</Dialog.Title>
                {/* Dialog.Description：弹窗描述，消除 Radix 的无障碍警告 */}
                <Dialog.Description className="text-sm text-white/60">
                  {realSize ? `${realSize.w} × ${realSize.h}` : '...'} · {item.category}
                </Dialog.Description>
              </div>
              {/* 下载按钮：靛蓝填充 / 圆角胶囊 / 悬停变深 */}
              <a
                href={getImageUrl(item, 1920, 1080)}
                download
                className={`px-6 py-2.5 bg-indigo-500 rounded-full font-medium hover:bg-indigo-600 transition ${focusRing}`}
              >
                下载
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
