// 壁纸网格容器
// 负责管理：当前分类、当前已显示数量、排序方式、加载更多
// 通过 useState 管理状态，通过 useEffect 在分类变化时重置
import { useState, useEffect, useMemo } from 'react'
import * as Switch from '@radix-ui/react-switch'
import { wallpapers } from '../data/wallpapers'
import WallpaperCard from './WallpaperCard'

const PAGE_SIZE = 8

// 根据视口宽度返回列数（移动端 2 / 平板 3 / 桌面 4）
function getColumnCount() {
  if (typeof window === 'undefined') return 4
  const w = window.innerWidth
  if (w < 768) return 2
  if (w < 1024) return 3
  return 4
}

export default function WallpaperGrid({ activeCategory, searchKeyword = '', onPreview }) {
  // 已显示的条数（用于加载更多）
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  // 排序方式
  const [sort, setSort] = useState('最新')
  // 仅看横屏（Radix Switch 受控：checked + onCheckedChange 成对出现）
  const [onlyLandscape, setOnlyLandscape] = useState(false)
  // 当前列数（响应式）
  const [columns, setColumns] = useState(getColumnCount)

  // 分类切换 或 搜索关键词变化 或 横屏筛选切换 时重置已显示数量
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [activeCategory, searchKeyword, onlyLandscape])

  // 窗口尺寸变化时更新列数
  useEffect(() => {
    const onResize = () => setColumns(getColumnCount())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // 按分类筛选 + 按关键词搜索 + 排序
  const filtered = useMemo(() => {
    let list =
      activeCategory === '全部'
        ? wallpapers
        : wallpapers.filter((w) => w.category === activeCategory)

    const kw = searchKeyword.trim().toLowerCase()
    if (kw) {
      list = list.filter((w) =>
        w.title.toLowerCase().includes(kw) ||
        w.category.toLowerCase().includes(kw)
      )
    }

    // 仅横屏：宽大于高才算横版壁纸
    if (onlyLandscape) {
      list = list.filter((w) => w.w > w.h)
    }

    if (sort === '热门') {
      list = [...list].reverse()
    }
    return list
  }, [activeCategory, searchKeyword, sort, onlyLandscape])

  const visibleList = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleLoadMore = () => {
    setVisibleCount((c) => c + PAGE_SIZE)
  }

  // 瀑布流分配算法：每张图加到当前最矮的列
  // 这样点击「加载更多」时，新图会自然接在已有内容的末尾
  // （加到当前最矮的列，不会像 CSS columns 那样把所有图重新平衡打散）
  const distributedColumns = useMemo(() => {
    const cols = Array.from({ length: columns }, () => [])
    const heights = Array(columns).fill(0)

    visibleList.forEach((item) => {
      // 找最矮的列
      const minCol = heights.indexOf(Math.min(...heights))
      cols[minCol].push(item)
      // 估算这张图渲染后的高度，更新该列累计高度
      // 公式：图片宽高比 * 估算列宽 + 卡片其他高度
      const aspectRatio = item.h / item.w
      const estCardHeight = aspectRatio * 280 + 80
      heights[minCol] += estCardHeight
    })
    return cols
  }, [visibleList, columns])

  return (
    // 主区域：最大宽 80rem 居中 / 内边距 / 下内边距 80px
    <main id="gallery" className="max-w-7xl mx-auto px-6 pb-20">
      {/* 头部：flex 两端对齐 + 下边距 32px */}
      <div className="flex items-end justify-between mb-8">
        <div>
          {/* 标题：30px 加粗 */}
          <h2 className="text-3xl font-bold">最新壁纸</h2>
          {/* 副信息：灰色 / 上边距 4px */}
          <p className="text-gray-500 mt-1">
            共 {filtered.length} 张壁纸
            {/* 搜索时显示当前关键词：靛蓝色 / 左边距 8px */}
            {searchKeyword && (
              <span className="ml-2 text-indigo-500">
                · 关键词「{searchKeyword}」
              </span>
            )}
          </p>
        </div>
        {/* 右侧：横屏筛选（Radix Switch）+ 排序按钮组 */}
        <div className="flex items-center gap-6">
          {/* Radix Switch：Root 承载状态与键盘交互（Space 可切换），Thumb 是滑块
              data-state 是样式与状态的桥梁：开启时轨道变靛蓝、滑块右移 */}
          <div className="flex items-center gap-2">
            <Switch.Root
              id="landscape-switch"
              checked={onlyLandscape}
              onCheckedChange={setOnlyLandscape}
              className="relative h-6 w-11 rounded-full bg-gray-300 transition-colors data-[state=checked]:bg-indigo-500 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <Switch.Thumb className="block size-4 translate-x-1 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-6" />
            </Switch.Root>
            {/* label 通过 htmlFor 关联 Root，点击文字也能切换（无障碍名称） */}
            <label
              htmlFor="landscape-switch"
              className="text-sm text-gray-500 cursor-pointer select-none"
            >
              仅横屏
            </label>
          </div>
          {/* 排序按钮组：flex / 间距 8px / 14px */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">排序：</span>
            {['最新', '热门', '下载量'].map((s) => (
              // 激活：浅靛蓝底 + 靛蓝字 / 未激活：灰色字 + 悬停浅灰底 */}
              <button
                key={s}
                onClick={() => setSort(s)}
                className={
                  sort === s
                    ? 'px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 font-medium'
                    : 'px-3 py-1.5 rounded-lg hover:bg-gray-100 text-gray-600'
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 壁纸网格 */}
      {visibleList.length === 0 ? (
        // 空状态：居中 / 大上下内边距 / 灰色文字 */}
        <div className="text-center py-20 text-gray-400">
          {searchKeyword
            ? `未找到标题包含「${searchKeyword}」的壁纸`
            : '该分类下暂无壁纸'}
        </div>
      ) : (
        // 瀑布流：flex 横向 / 列间距 20px */}
        <div className="flex gap-5">
          {distributedColumns.map((colItems, colIdx) => (
            // 单列：等宽 flex-1 / 纵向堆叠 / 卡片间距 20px */}
            <div key={colIdx} className="flex-1 flex flex-col gap-5">
              {colItems.map((item, i) => (
                <WallpaperCard
                  key={item.id}
                  item={item}
                  index={i}
                  onPreview={onPreview}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* 加载更多：居中 / 上边距 48px */}
      <div className="text-center mt-12">
        {hasMore ? (
          // 可加载按钮：白底 / 靛蓝边框 + 靛蓝字 / 胶囊形 / 悬停反色 / 300ms 过渡 */}
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-white border-2 border-indigo-500 text-indigo-500 font-semibold rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300"
          >
            加载更多
          </button>
        ) : (
          // 到底提示：浅灰底 / 灰字 / 胶囊形 / 禁用样式 */}
          <span className="px-8 py-3 inline-block bg-gray-100 text-gray-400 font-medium rounded-full cursor-not-allowed">
            已经到底啦
          </span>
        )}
      </div>
    </main>
  )
}
