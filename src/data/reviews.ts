import { Review } from '../types';

export const reviews: Review[] = [
  // 山野草のレビュー
  {
    id: 'r1',
    productId: '1',
    userName: '山田花子',
    rating: 5,
    comment: 'とても元気な苗が届きました。梱包も丁寧で、説明書も付いていて初心者の私でも安心して育てられそうです。',
    date: '2024-12-15',
    helpful: 12,
    verified: true
  },
  {
    id: 'r2',
    productId: '1',
    userName: '田中太郎',
    rating: 4,
    comment: '花がとても美しいです。ただ、思っていたより小さめの苗でした。でも成長が楽しみです。',
    date: '2024-11-28',
    helpful: 8,
    verified: true
  },
  {
    id: 'r3',
    productId: '2',
    userName: '佐藤美咲',
    rating: 5,
    comment: '九重の山野草を探していました！なかなか手に入らない品種なので、購入できて嬉しいです。丁寧な育て方の説明もありがとうございます。',
    date: '2024-12-01',
    helpful: 15,
    verified: true
  },
  {
    id: 'r4',
    productId: '3',
    userName: '鈴木一郎',
    rating: 5,
    comment: '山歩きで見かけて気になっていた花です。自宅の庭で育てられるなんて夢のようです。大切に育てます。',
    date: '2024-11-20',
    helpful: 10,
    verified: true
  },
  {
    id: 'r5',
    productId: '4',
    userName: '高橋京子',
    rating: 4,
    comment: '日陰でも育つとのことで購入。確かに日陰でも元気に育っています。もう少し大きな株だと嬉しかったです。',
    date: '2024-12-10',
    helpful: 6,
    verified: true
  },
  
  // コーヒーのレビュー
  {
    id: 'r6',
    productId: '7',
    userName: '伊藤健二',
    rating: 5,
    comment: '久住高原の風を感じるような爽やかな味わいです。朝の一杯に最適！リピート決定です。',
    date: '2024-12-20',
    helpful: 18,
    verified: true
  },
  {
    id: 'r7',
    productId: '7',
    userName: '山本恵美',
    rating: 5,
    comment: 'カフェで飲んで美味しかったので通販でも購入。家でも同じ味を楽しめて幸せです。',
    date: '2024-12-05',
    helpful: 14,
    verified: true
  },
  {
    id: 'r8',
    productId: '8',
    userName: '中村洋平',
    rating: 4,
    comment: '苦味と酸味のバランスが絶妙です。ただ、もう少し深煎りも選べると嬉しいです。',
    date: '2024-11-25',
    helpful: 9,
    verified: true
  },
  {
    id: 'r9',
    productId: '9',
    userName: '小林美穂',
    rating: 5,
    comment: 'オーガニックで安心して飲めます。味も優しくて、毎日飲んでも飽きません。プレゼントにも喜ばれました。',
    date: '2024-12-18',
    helpful: 20,
    verified: true
  },
  {
    id: 'r10',
    productId: '10',
    userName: '渡辺直美',
    rating: 5,
    comment: '深煎りなのに苦すぎず、コクがあって美味しいです。ミルクとの相性も抜群！',
    date: '2024-12-12',
    helpful: 11,
    verified: true
  },
  
  // ケーキのレビュー
  {
    id: 'r11',
    productId: '11',
    userName: '斎藤雅子',
    rating: 5,
    comment: 'しっとりとした生地で、甘さ控えめで大人の味。コーヒーとの相性が最高です。また注文します！',
    date: '2024-12-22',
    helpful: 16,
    verified: true
  },
  {
    id: 'r12',
    productId: '12',
    userName: '加藤浩',
    rating: 4,
    comment: '季節のフルーツがたっぷりで贅沢なタルトでした。少し値段は高めですが、その価値はあります。',
    date: '2024-12-08',
    helpful: 7,
    verified: true
  },
  
  // 追加のレビュー
  {
    id: 'r13',
    productId: '1',
    userName: '木村さくら',
    rating: 3,
    comment: '花は綺麗ですが、育て方が少し難しいです。初心者には向かないかも。',
    date: '2024-10-15',
    helpful: 4,
    verified: false
  },
  {
    id: 'r14',
    productId: '5',
    userName: '松本大輝',
    rating: 5,
    comment: '春になると見事な花を咲かせてくれます。去年購入して今年も咲きました！',
    date: '2024-11-30',
    helpful: 22,
    verified: true
  },
  {
    id: 'r15',
    productId: '6',
    userName: '井上真理',
    rating: 4,
    comment: '香りがとても良いです。玄関先に植えたら、通るたびに癒されます。',
    date: '2024-12-03',
    helpful: 13,
    verified: true
  }
];