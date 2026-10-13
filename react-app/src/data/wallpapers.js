// 壁纸数据源
// 现在支持两种图片来源：
//   1. src 字段：本地图片路径，推荐。把图片放到 public/images/ 下，src 写成 '/images/文件名.jpg'
//   2. seed 字段：走 picsum.photos 占位图（当 src 为空时兜底）
// 想用自己的图片就填 src；想用占位图就删掉 src 留 seed。

export const categories = [
  '全部',
  '风景',
  '动漫',
  '抽象',
  '极简',
  '动物',
  '城市',
  '科技'
]

export const wallpapers = [
  // —— 原有 12 张 ——
  { id: 1,  title: '宁静湖泊', category: '风景', src: '/images/lake.jpg',      seed: 'lake1',  w: 800, h: 1000 },
  { id: 2,  title: '城市霓虹', category: '城市', src: '/images/city.jpg',      seed: 'city1',  w: 800, h: 600  },
  { id: 3,  title: '极简几何', category: '极简', src: '/images/minimal.jpg',  seed: 'mini1',  w: 800, h: 800  },
  { id: 4,  title: '山林晨雾', category: '风景', src: '/images/mountain.jpg', seed: 'mount1', w: 800, h: 1100 },
  { id: 5,  title: '动漫少女', category: '动漫', src: '/images/anime.jpg',    seed: 'anime1', w: 800, h: 1000 },
  { id: 6,  title: '色彩流体', category: '抽象', src: '/images/abstract.jpg', seed: 'abs1',  w: 800, h: 600  },
  { id: 7,  title: '科技未来', category: '科技', src: '/images/tech.jpg',     seed: 'tech1',  w: 800, h: 900  },
  { id: 8,  title: '小猫写真', category: '动物', src: '/images/cat.jpg',      seed: 'cat1',   w: 800, h: 800  },
  { id: 9,  title: '雪山日出', category: '风景', src: '/images/snowmount.jpg',seed: 'mount2', w: 800, h: 1000 },
  { id: 10, title: '夜空银河', category: '风景', src: '/images/galaxy.jpg',   seed: 'sky1',   w: 800, h: 1200 },
  { id: 11, title: '未来城市', category: '城市', src: '/images/future.jpg',  seed: 'city2',  w: 800, h: 1000 },
  { id: 12, title: '抽象油画', category: '抽象', src: '/images/oil.jpg',     seed: 'abs2',   w: 800, h: 800  },
  // —— 新增 8 张 ——
  { id: 13, title: '原始森林', category: '风景', src: '/images/forest.jpg',  seed: 'forest1', w: 800, h: 1000 },
  { id: 14, title: '荒漠落日', category: '风景', src: '/images/desert.jpg',  seed: 'desert1', w: 800, h: 700  },
  { id: 15, title: '深海蔚蓝', category: '风景', src: '/images/ocean.jpg',   seed: 'ocean1',  w: 800, h: 1100 },
  { id: 16, title: '花卉特写', category: '动物', src: '/images/flower.jpg', seed: 'flower1', w: 800, h: 900  },
  { id: 17, title: '飞鸟剪影', category: '动物', src: '/images/bird.jpg',    seed: 'bird1',   w: 800, h: 800  },
  { id: 18, title: '太空星云', category: '科技', src: '/images/space.jpg',   seed: 'space1',  w: 800, h: 1200 },
  { id: 19, title: '霓虹街景', category: '城市', src: '/images/neon.jpg',    seed: 'neon1',   w: 800, h: 1000 },
  { id: 20, title: '艺术涂鸦', category: '抽象', src: '/images/art.jpg',     seed: 'art1',    w: 800, h: 800  },
  // —— 你自己下载的 wallhaven 三张 ——
  { id: 21, title: '小猫写真', category: '动物', src: '/images/wallhaven-4vqgm8.jpg', seed: 'wh1', w: 1920, h: 1200 },
  { id: 22, title: '雪山日出', category: '风景', src: '/images/wallhaven-d8e1ll.jpg', seed: 'wh2', w: 5120, h: 2880 },
  { id: 23, title: '动漫少年', category: '动漫', src: '/images/wallhaven-yj6w17.jpg', seed: 'wh3', w: 1920, h: 1200 }
]

// 生成图片 URL
// 优先使用本地 src 路径；如果没填 src，就走 picsum.photos 占位图
export function getImageUrl(item, w, h) {
  if (item.src) return item.src
  return `https://picsum.photos/seed/${item.seed}/${w}/${h}`
}
