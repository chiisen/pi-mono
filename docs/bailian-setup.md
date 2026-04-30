# Pi-mono 百煉 API Key 配置指南

本指南說明如何將 Pi-mono (pi coding agent) 連接至阿里雲百煉 (DashScope) API。

## 前置準備

1. 取得百煉 API Key（Coding Plan 或標準版）
2. 確認已安裝 pi：`npm install -g @mariozechner/pi-coding-agent`

## 配置步驟

### 1. 建立/編輯模型配置檔

配置檔位置：`~/.pi/agent/models.json`

```json
{
    "providers": {
        "bailian": {
            "baseUrl": "https://coding-intl.dashscope.aliyuncs.com/v1",
            "api": "openai-completions",
            "apiKey": "DASHSCOPE_API_KEY",
            "models": [
                {
                    "id": "glm-5",
                    "name": "GLM-5 (Bailian)"
                }
            ]
        }
    }
}
```

### 2. 設定預設模型

配置檔位置：`~/.pi/agent/settings.json`

```json
{
    "lastChangelogVersion": "0.70.6",
    "defaultProvider": "bailian",
    "defaultModel": "glm-5"
}
```

### 3. 設定環境變數

```bash
# 方式 A：環境變數（apiKey 欄位填 "DASHSCOPE_API_KEY")
export DASHSCOPE_API_KEY="sk-xxxxx"

# 方式 B：直接寫入 API Key（apiKey 欄位填實際值）
# 不需設定環境變數
```

### 4. 啟動並切換模型

```bash
pi
/model  # 選擇 Bailian provider 下的模型
```

## API 端點說明

| 端點 | 用途 |
|------|------|
| `https://dashscope.aliyuncs.com/compatible-mode/v1` | OpenAI 相容端點（標準版） |
| `https://coding-intl.dashscope.aliyuncs.com/v1` | Coding Plan 國際端點 |

## 支援的百煉模型

### GLM 系列（已驗證）
- `glm-5` - GLM-5 ✅

### Qwen 系列
- `qwen-plus` - Qwen Plus
- `qwen-turbo` - Qwen Turbo
- `qwen-max` - Qwen Max
- `qwen3.5-plus` - Qwen 3.5 Plus（支援思考模式）
- `qwen3-coder-plus` - Qwen 3 Coder Plus
- `qwen3-coder-next` - Qwen 3 Coder Next

### 其他
- `kimi-k2.5` - Kimi K2.5
- `MiniMax-M2.5` - MiniMax M2.5

> **注意**：模型可用性取決於您的 Coding Plan 訂閱版本，請在百煉控制台確認可用模型。

## 配置欄位說明

| 檔案 | 欄位 | 說明 |
|------|------|------|
| models.json | `baseUrl` | API 端點 URL |
| models.json | `api` | API 類型：`openai-completions`（OpenAI 相容） |
| models.json | `apiKey` | API Key，支援三種格式：`"ENV_VAR"` 環境變數、直接值、`"!command"` 執行指令 |
| models.json | `models.id` | 模型 ID，需與百煉控制台一致 |
| settings.json | `defaultProvider` | 預設 provider 名稱 |
| settings.json | `defaultModel` | 預設模型 ID，需與 models.json 中的 `id` 一致 |

## 常見問題

### 預設模型變成 minimax

**原因**：`settings.json` 的 `defaultModel` 與 `models.json` 的模型 `id` 不一致。

**解決**：確保兩者完全匹配：
- `models.json` → `"id": "glm-5"`
- `settings.json` → `"defaultModel": "glm-5"`

### 模型不存在錯誤

確認 `models` 中的 `id` 與百煉控制台顯示的模型名稱一致。

### API Key 效

- 檢查 API Key 是否正確
- 確認 API Key 有權限存取該模型
- Coding Plan 需使用 Coding Plan 專用端點

### 連線失敗

- 檢查 `baseUrl` 是否正確
- 確認網路可存取阿里雲服務

## 參考資源

- [百煉控制台](https://bailian.console.aliyun.com/)
- [DashScope API 文檔](https://help.aliyun.com/document_detail/2712195.html)
- [Pi-mono Providers 文檔](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/providers.md)
- [Pi-mono Models 文檔](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/models.md)