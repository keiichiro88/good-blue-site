# 開発計画詳細

## 🎯 即座に対応すべき事項（今週中）

### 1. セキュリティ対策
```typescript
// 在庫管理画面へのアクセスを一時的に制限
// src/App.tsx に追加
const isDevMode = import.meta.env.DEV;
const showInventory = currentCategory === 'inventory' && !selectedProduct && isDevMode;
```

### 2. 環境変数の設定
```env
# .env.example
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. 利用規約・プライバシーポリシー
- [ ] 利用規約ページの作成
- [ ] プライバシーポリシーページの作成
- [ ] Cookie使用に関する通知

## 📋 Phase 1 詳細タスク

### バックエンドプロジェクト構造
```
goodblue-backend/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── product.controller.ts
│   │   ├── order.controller.ts
│   │   └── user.controller.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── product.model.ts
│   │   ├── order.model.ts
│   │   └── category.model.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── product.routes.ts
│   │   └── order.routes.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── email.service.ts
│   │   └── payment.service.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   └── validators.ts
│   └── app.ts
├── prisma/
│   └── schema.prisma
├── tests/
├── .env.example
├── package.json
└── tsconfig.json
```

### データベーススキーマ（Prisma）
```prisma
// prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(CUSTOMER)
  orders    Order[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Int
  stock       Int
  category    Category @relation(fields: [categoryId], references: [id])
  categoryId  String
  images      Image[]
  orderItems  OrderItem[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Order {
  id         String      @id @default(cuid())
  user       User        @relation(fields: [userId], references: [id])
  userId     String
  items      OrderItem[]
  total      Int
  status     OrderStatus @default(PENDING)
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt
}

enum Role {
  CUSTOMER
  ADMIN
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}
```

## 🔐 セキュリティチェックリスト

### 必須実装項目
- [ ] HTTPS強制
- [ ] CORS設定
- [ ] Rate Limiting
- [ ] SQL Injection対策（Prisma使用）
- [ ] XSS対策
- [ ] CSRF対策
- [ ] パスワードハッシュ化（bcrypt）
- [ ] 環境変数での秘密情報管理
- [ ] ログの適切な管理（個人情報除外）

### 決済セキュリティ
- [ ] PCI DSS準拠（Stripe使用で簡略化）
- [ ] カード情報の非保持
- [ ] 3Dセキュア対応

## 🧪 テスト戦略

### 単体テスト
- Jest + Supertest（バックエンド）
- Vitest（フロントエンド）
- カバレッジ目標: 80%以上

### 統合テスト
- E2Eテスト（Playwright）
- 主要な購入フローのテスト
- 複数ブラウザでのテスト

### 負荷テスト
- k6 or Apache JMeter使用
- 同時接続数: 100ユーザー想定
- レスポンスタイム目標: 95%tile < 1秒

## 📱 モバイルアプリ展開（将来計画）

### 選択肢
1. **React Native**
   - 既存のReactコードを活用
   - クロスプラットフォーム対応

2. **PWA（Progressive Web App）**
   - 開発コスト最小
   - アプリストア不要

3. **Flutter**
   - 高パフォーマンス
   - 完全な作り直し必要

**推奨**: まずはPWAとして対応し、需要に応じてネイティブアプリ開発

## 💰 概算費用

### 開発費用（外注の場合）
- Phase 1-2: 200-300万円
- Phase 3-4: 100-150万円

### 運用費用（月額）
- サーバー費用: 1-3万円
- 決済手数料: 売上の3.6%（Stripe）
- メール送信: 1万円程度
- 監視ツール: 5千円程度

### 自社開発の場合
- 開発者人件費（6ヶ月）
- ツール・サービス費用のみ

---

*この計画は柔軟に調整可能です。優先順位や予算に応じて最適化していきましょう。*