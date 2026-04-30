# Pi-mono 快速入門指南

## 安裝

### 全域安裝

```bash
npm install -g @mariozechner/pi-coding-agent
```

### 验证安装

```bash
pi -v  # 查看版本
pi     # 启动互动模式
```

## 配置 API Key

### 方式 1: 環境變數

```bash
# Anthropic (推荐)
export ANTHROPIC_API_KEY=sk-ant-...
pi

# OpenAI
export OPENAI_API_KEY=sk-...
pi

# Google Gemini
export GOOGLE_API_KEY=...
pi --model gemini-2.0-flash
```

### 方式 2: OAuth 登入（需訂閱）

```bash
pi
/login  # 選擇供應商
```

支援的訂閱：
- Anthropic Claude Pro/Max
- OpenAI ChatGPT Plus/Pro
- GitHub Copilot
- Google Gemini CLI

## 建立第一個專案

### 範例 1: Node.js CLI 工具

```bash
# 1. 建立專案目錄
mkdir my-first-project
cd my-first-project

# 2. 啟動 pi
pi "幫我建立一個簡單的 Node.js CLI 工具，功能是計算兩數之和"
```

pi 會自動：
- 建立專案結構
- 寫入程式碼
- 初始化 npm
- 安裝相依套件

### 範例 2: Express Web Server

```bash
pi "建立一個 express web server，有 /health 和 /api/user 兩個 endpoint"
```

### 範例 3: Python 資料處理

```bash
pi "建立一個 Python 脚本，讀取 CSV 檔案並計算平均值"
```

## 常用指令

### 互動模式指令

| 指令 | 描述 |
|------|------|
| `/login`, `/logout` | OAuth 登入/登出 |
| `/model` | 切換模型 (Ctrl+L) |
| `/settings` | 設定選項 |
| `/resume` | 恢復之前的 session |
| `/new` | 新 session |
| `/tree` | 查看會話樹 |
| `/fork` | 從歷史建立分支 |
| `/copy` | 複製最後回應 |
| `/export [file]` | 匯出 session 到 HTML |
| `/quit` | 退出 |

### 快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| Ctrl+C | 清除輸入（兩次退出） |
| Ctrl+L | 切換模型 |
| Ctrl+P | 循環模型 |
| Shift+Tab | 切換思考層級 |
| Ctrl+O | 收合/展開工具輸出 |
| Escape | 取消/中止 |
| `@` | 搜尋並引用檔案 |

## 模型選擇

### 切換模型

```bash
# 互動模式
/model

# CLI 指定
pi --model claude-sonnet-4-20250514
pi --model openai/gpt-4o
pi --model gemini-2.0-flash
```

### 查看可用模型

```bash
pi --list-models
```

### 思考層級

```bash
pi --thinking high  # 高思考深度
pi --model sonnet:high "解決這個複雜問題"
```

層級：`off`, `minimal`, `low`, `medium`, `high`, `xhigh`

## Session 管理

### 恢復 Session

```bash
pi -c                  # 恢復最近的 session
pi -r                  # 選擇特定 session
pi --session <id>      # 使用指定 session
```

### 分支 Session

```bash
# 互動模式
/fork   # 從之前的訊息建立新 session
/clone  # 複製當前分支
/tree   # 瀏覽會話樹

# CLI
pi --fork <session-id>
```

## 常見問題

### 模型不支援錯誤

```
Error: 500 {"type":"error","error":{"type":"api_error","message":"your current token plan not support model"}}
```

**解決方案**：
```bash
# 切換到支援的模型
pi --model claude-sonnet-4-20250514

# 或使用其他 API key
export ANTHROPIC_API_KEY=sk-ant-...
pi
```

### API Key 未設定

```bash
# 檢查環境變數
echo $ANTHROPIC_API_KEY

# 設定 API key
export ANTHROPIC_API_KEY=sk-ant-...
```

### Session 檔案位置

Session 自動儲存於：
```
~/.pi/agent/sessions/
```

## 進階功能

### 編輯器功能

- **檔案引用**: `@` 搜尋檔案並引用
- **路徑補全**: Tab 補全路徑
- **多行輸入**: Shift+Enter
- **貼上圖片**: Ctrl+V (macOS), Alt+V (Windows)
- **執行 Bash**: `!command` 執行並輸出，`!!command` 不輸出

### 非互動模式

```bash
# Print 模式（輸出後退出）
pi -p "總結這個程式碼庫"

# 搭配管道
cat README.md | pi -p "總結這段文字"

# JSON 模式
pi --mode json "分析程式碼"
```

### 唯讀模式

```bash
pi --tools read,grep,find,ls -p "審查程式碼"
```

### 限制工具

```bash
# 僅使用指定工具
pi --tools read,bash

# 禁用所有工具
pi --no-tools
```

## 參考資源

- [官方網站](https://pi.dev)
- [GitHub](https://github.com/badlogic/pi-mono)
- [Discord](https://discord.com/invite/3cU7Bz4UPx)
- [Providers 說明](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/providers.md)
- [Extensions 指南](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/extensions.md)

## 下一步

1. 建立您的第一個專案
2. 瀏覽 `/tree` 了解 session 歷史
3. 使用 `/fork` 實驗不同解決方案
4. 探索 [Pi Packages](https://www.npmjs.com/search?q=keywords:pi-package) 找適合的擴充功能
5. 加入 [Discord](https://discord.com/invite/3cU7Bz4UPx) 社群