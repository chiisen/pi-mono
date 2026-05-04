# Sum CLI

一個簡單的 Node.js CLI 工具，計算多個數字之和。

## 專案結構

```
├── package.json    # 專案設定
├── index.js        # CLI 主程式
└── test.js         # 測試檔案
```

## 使用方式

### 直接執行

```bash
node index.js 5 3           # 輸出: 8
node index.js 1 2 3 4 5      # 輸出: 15
node index.js 10.5 4.5       # 輸出: 15
```

### 顯示幫助

```bash
node index.js --help
```

### 安裝後全域使用

```bash
npm link
sum 5 3                     # 輸出: 8
```

## 執行測試

```bash
npm test
```

## 功能

- 接受多個數字參數，輸出相加結果
- 支援整數與小數
- 支援負數
- 包含 `-h/--help` 幫助訊息
- 輸入驗證與明確錯誤提示

## 授權

[MIT](LICENSE)

## 貢獻

歡迎提交 Issue 或 Pull Request！