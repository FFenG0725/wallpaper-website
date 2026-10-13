// App 根组件
// 集中管理：当前选中的分类、当前预览的壁纸
// 通过 props 把状态和回调下发给子组件（状态提升模式）
import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Categories from './components/Categories'
import WallpaperGrid from './components/WallpaperGrid'
import Modal from './components/Modal'
import Footer from './components/Footer'

export default function App() {
  // 当前激活的分类（在 Categories 和 WallpaperGrid 之间共享）
  const [activeCategory, setActiveCategory] = useState('全部')
  // 当前正在预览的壁纸（null 表示关闭）
  const [previewItem, setPreviewItem] = useState(null)
  // 搜索关键词（在 Navbar 和 WallpaperGrid 之间共享）
  const [searchKeyword, setSearchKeyword] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
      />
      <Hero />
      <Stats />

      <Categories
        active={activeCategory}
        onChange={setActiveCategory}
      />

      <WallpaperGrid
        activeCategory={activeCategory}
        searchKeyword={searchKeyword}
        onPreview={setPreviewItem}
      />

      <Footer />

      <Modal
        item={previewItem}
        onClose={() => setPreviewItem(null)}
      />
    </div>
  )
}
