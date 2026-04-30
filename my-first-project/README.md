# Sum CLI

一個簡單的 Node.js CLI 工具，計算兩數之和。

## 專案結構

```
├── package.json    # 專案設定
└── index.js        # CLI 主程式
```

## 使用方式

### 直接執行

```bash
node index.js 5 3      # 輸出: 8
node index.js 10.5 4.5 # 輸出: 15
```

### 顯示幫助

```bash
node index.js --help
```

### 安裝後全域使用

```bash
npm link
sum 5 3                # 輸出: 8
```

## 功能

- 接受兩個數字參數，輸出相加結果
- 支援整數與小數
- 包含 `-h/--help` 幫助訊息
- 輸入驗證與錯誤提示