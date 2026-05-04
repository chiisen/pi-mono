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

## pi CLI 功能說明

```
pi - AI 程式代理，具備 read、bash、edit、write 工具

用法：
  pi [選項] [@檔案...] [訊息...]

命令：
  pi install <來源> [-l]     安裝擴充套件來源並加入設定
  pi remove <來源> [-l]      從設定中移除擴充套件來源
  pi uninstall <來源> [-l]    remove 的別名
  pi update [來源|self|pi]   更新 pi 及已安裝的擴充套件
  pi list                      列出設定中已安裝的擴充套件
  pi config                    開啟 TUI 以啟用/停用套件資源
  pi <命令> --help          顯示 install/remove/uninstall/update/list 的說明

選項：
  --provider <名稱>              供應商名稱（預設：google）
  --model <模式>                模型模式或 ID（支援「provider/id」格式與選用的「:<thinking>」）
  --api-key <金鑰>              API 金鑰（預設使用環境變數）
  --system-prompt <文字>        系統提示詞（預設：程式代理提示詞）
  --append-system-prompt <文字>  將文字或檔案內容附加至系統提示詞（可多次使用）
  --mode <模式>                  輸出模式：text（預設）、json 或 rpc
  --print, -p                    非互動模式：處理提示後結束
  --continue, -c                 繼續前一個工作階段
  --resume, -r                   選擇要恢復的工作階段
  --session <路徑|id>           使用指定的工作階段檔案或部分 UUID
  --fork <路徑|id>               將指定工作階段複製為新工作階段
  --session-dir <目錄>           工作階段儲存與查找目錄
  --no-session                   不儲存工作階段（暫時性）
  --models <模式>                以逗號分隔的模型模式，用於 Ctrl+P 循環切換
                                 支援萬用字元（anthropic/*, *sonnet*）與模糊比對
  --no-tools, -nt                預設停用所有工具（內建與擴充套件）
  --no-builtin-tools, -nbt       預設停用內建工具，但保留擴充/自訂工具啟用
  --tools, -t <工具>             以逗號分隔的工具名稱允許清單
                                 適用於內建、擴充與自訂工具
  --thinking <等級>             設定思考等級：off, minimal, low, medium, high, xhigh
  --extension, -e <路徑>         載入擴充套件檔案（可多次使用）
  --no-extensions, -ne           停用擴充套件自動探索（明確 -e 路徑仍有效）
  --skill <路徑>                 載入技能檔案或目錄（可多次使用）
  --no-skills, -ns               停用技能探索與載入
  --prompt-template <路徑>        載入提示模板檔案或目錄（可多次使用）
  --no-prompt-templates, -np     停用提示模板探索與載入
  --theme <路徑>                 載入主題檔案或目錄（可多次使用）
  --no-themes                    停用主題探索與載入
  --no-context-files, -nc        停用 AGENTS.md 與 CLAUDE.md 探索與載入
  --export <檔案>                將工作階段匯出為 HTML 並結束
  --list-models [搜尋]           列出可用模型（可選模糊搜尋）
  --verbose                      強制詳細啟動（覆蓋 quietStartup 設定）
  --offline                      停用啟動時的網路操作（同 PI_OFFLINE=1）
  --help, -h                     顯示此說明
  --version, -v                  顯示版本號

擴充套件可註冊額外的旗標（例如 plan-mode 擴充套件的 --plan）。

範例：
  # 互動模式
  pi

  # 帶初始提示的互動模式
  pi "列出 src/ 中的所有 .ts 檔案"

  # 在初始訊息中包含檔案
  pi @prompt.md @image.png "天空是什麼顏色？"

  # 非互動模式（處理後結束）
  pi -p "列出 src/ 中的所有 .ts 檔案"

  # 多則訊息（互動模式）
  pi "讀取 package.json" "我們有哪些相依套件？"

  # 繼續前一個工作階段
  pi --continue "我們討論了什麼？"

  # 使用不同模型
  pi --provider openai --model gpt-4o-mini "幫我重構這段程式碼"

  # 使用帶供應商前綴的模型（不需 --provider）
  pi --model openai/gpt-4o "幫我重構這段程式碼"

  # 使用帶思考等級簡寫的模型
  pi --model sonnet:high "解決這個複雜問題"

  # 限制模型循環切換至特定模型
  pi --models claude-sonnet,claude-haiku,gpt-4o

  # 使用萬用字元限制特定供應商
  pi --models "github-copilot/*"

  # 以固定思考等級循環切換模型
  pi --models sonnet:high,haiku:low

  # 以特定思考等級啟動
  pi --thinking high "解決這個複雜問題"

  # 唯讀模式（無法修改檔案）
  pi --tools read,grep,find,ls -p "檢視 src/ 中的程式碼"

  # 將工作階段匯出為 HTML
  pi --export ~/.pi/agent/sessions/--path--/session.jsonl
  pi --export session.jsonl output.html
```

### 環境變數

| 變數 | 說明 |
|------|------|
| `ANTHROPIC_API_KEY` | Anthropic Claude API 金鑰 |
| `ANTHROPIC_OAUTH_TOKEN` | Anthropic OAuth 權杖（API 金鑰的替代方案） |
| `OPENAI_API_KEY` | OpenAI GPT API 金鑰 |
| `AZURE_OPENAI_API_KEY` | Azure OpenAI API 金鑰 |
| `AZURE_OPENAI_BASE_URL` | Azure OpenAI/Cognitive Services 基礎 URL |
| `AZURE_OPENAI_RESOURCE_NAME` | Azure OpenAI 資源名稱（基礎 URL 的替代方案） |
| `AZURE_OPENAI_API_VERSION` | Azure OpenAI API 版本（預設：v1） |
| `AZURE_OPENAI_DEPLOYMENT_NAME_MAP` | Azure OpenAI 模型=部署對應（逗號分隔） |
| `DEEPSEEK_API_KEY` | DeepSeek API 金鑰 |
| `GEMINI_API_KEY` | Google Gemini API 金鑰 |
| `GROQ_API_KEY` | Groq API 金鑰 |
| `CEREBRAS_API_KEY` | Cerebras API 金鑰 |
| `XAI_API_KEY` | xAI Grok API 金鑰 |
| `FIREWORKS_API_KEY` | Fireworks API 金鑰 |
| `OPENROUTER_API_KEY` | OpenRouter API 金鑰 |
| `AI_GATEWAY_API_KEY` | Vercel AI Gateway API 金鑰 |
| `ZAI_API_KEY` | ZAI API 金鑰 |
| `MISTRAL_API_KEY` | Mistral API 金鑰 |
| `MINIMAX_API_KEY` | MiniMax API 金鑰 |
| `MOONSHOT_API_KEY` | Moonshot AI API 金鑰 |
| `OPENCODE_API_KEY` | OpenCode Zen/OpenCode Go API 金鑰 |
| `KIMI_API_KEY` | Kimi For Coding API 金鑰 |
| `CLOUDFLARE_API_KEY` | Cloudflare API 權杖（Workers AI 與 AI Gateway） |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 帳號 ID（兩者皆需要） |
| `CLOUDFLARE_GATEWAY_ID` | Cloudflare AI Gateway slug（AI Gateway 需要） |
| `XIAOMI_API_KEY` | 小米 MiMo Token Plan API 金鑰 |
| `AWS_PROFILE` | Amazon Bedrock 使用的 AWS 設定檔 |
| `AWS_ACCESS_KEY_ID` | Amazon Bedrock 的 AWS 存取金鑰 |
| `AWS_SECRET_ACCESS_KEY` | Amazon Bedrock 的 AWS 金鑰 |
| `AWS_BEARER_TOKEN_BEDROCK` | Bedrock API 金鑰（bearer token） |
| `AWS_REGION` | Amazon Bedrock 的 AWS 區域（例如 us-east-1） |
| `PI_CODING_AGENT_DIR` | 設定目錄（預設：~/.pi/agent） |
| `PI_CODING_AGENT_SESSION_DIR` | 工作階段儲存目錄（會被 --session-dir 覆蓋） |
| `PI_PACKAGE_DIR` | 覆蓋套件目錄（用於 Nix/Guix store 路徑） |
| `PI_OFFLINE` | 設為 1/true/yes 時停用啟動時的網路操作 |
| `PI_TELEMETRY` | 設為 1/true/yes 或 0/false/no 覆蓋安裝遙測設定 |
| `PI_SHARE_VIEWER_URL` | /share 命令的基礎 URL（預設：https://pi.dev/session/） |

### 內建工具名稱

| 工具 | 說明 |
|------|------|
| `read` | 讀取檔案內容 |
| `bash` | 執行 bash 命令 |
| `edit` | 使用尋找/取代編輯檔案 |
| `write` | 寫入檔案（建立/覆蓋） |
| `grep` | 搜尋檔案內容（唯讀，預設停用） |
| `find` | 以萬用字元模式尋找檔案（唯讀，預設停用） |
| `ls` | 列出目錄內容（唯讀，預設停用） |

## 參考資源

- [GitHub Repository](https://github.com/badlogic/pi-mono)
- [Discord 社群](https://discord.com/invite/3cU7Bz4UPx)