# pi-mono

> **尋找 pi 程式代理 (coding agent)？** 請參閱 **[packages/coding-agent](https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent)** 的安裝與使用說明。

## 簡介

**pi-mono** 是一套用於建構 AI 代理程式與管理 LLM 部署的工具集。此 Monorepo 包含多個核心套件，提供從 LLM API 整合、代理執行環境到使用者介面的完整解決方案。

### 核心套件

| 套件 | 描述 |
|------|------|
| **@mariozechner/pi-ai** | 統一的多供應商 LLM API（支援 OpenAI、Anthropic、Google 等） |
| **@mariozechner/pi-agent-core** | 代理執行環境，支援工具呼叫與狀態管理 |
| **@mariozechner/pi-coding-agent** | 互動式程式代理 CLI |
| **@mariozechner/pi-mom** | Slack Bot，將訊息委派給 pi 程式代理處理 |
| **@mariozechner/pi-tui** | 終端機 UI 套件，支援差異渲染 |
| **@mariozechner/pi-web-ui** | AI 聊天介面的 Web 元件 |
| **@mariozechner/pi-pods** | 管理 GPU Pods 上 vLLM 部署的 CLI |

### 專案資訊

- **官方網站**: [pi.dev](https://pi.dev)
- **原始碼**: [github.com/badlogic/pi-mono](https://github.com/badlogic/pi-mono)
- **授權**: MIT License
- **狀態**: ![GitHub stars](https://img.shields.io/github/stars/badlogic/pi-mono) ![Build status](https://img.shields.io/github/actions/workflow/status/badlogic/pi-mono/ci.yml?branch=main)

## 開發環境

```bash
npm install          # 安裝所有相依套件
npm run build        # 建置所有套件
npm run check        # Lint、格式化與型別檢查
./test.sh            # 執行測試（略過需要 API Key 的測試）
./pi-test.sh         # 從原始碼執行 pi（可從任意目錄執行）
```

> **注意**: `npm run check` 需先執行 `npm run build`。web-ui 套件使用 `tsc`，需相依套件的 `.d.ts` 檔案。

## 貢獻指南

詳見 [CONTRIBUTING.md](https://github.com/badlogic/pi-mono/blob/main/CONTRIBUTING.md) 與 [AGENTS.md](https://github.com/badlogic/pi-mono/blob/main/AGENTS.md)（適用於人類與 AI 代理）。

## 安裝方式

### 全域安裝 (推薦)

```bash
npm install -g @mariozechner/pi-coding-agent
```

### 設定 API Key

```bash
export ANTHROPIC_API_KEY=sk-ant-...
pi
```

### 使用現有訂閱

```bash
pi
/login  # 選擇供應商進行 OAuth 登入
```

### 驗證安裝

```bash
pi -v  # 檢視版本
pi     # 啟動互動模式
```

> **支援平台**: macOS、Linux、Windows、Termux (Android)。詳見 [docs/windows.md](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/windows.md)。

## 參考資源

- [GitHub Repository](https://github.com/badlogic/pi-mono)
- [Discord 社群](https://discord.com/invite/3cU7Bz4UPx)