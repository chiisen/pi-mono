
# 整理這份文件 https://zhuanlan.zhihu.com/p/2004665077618458930 為繁體中文的 .md 格式讓我下載，內容務必簡單明瞭



以下是整理後的文件內容，已轉換為繁體中文的 Markdown 格式，內容簡單明瞭：

```markdown
# 下一代Agent架构——Pi Agent Core 设计逻辑深度解析

項目地址：[GitHub - pi-mono](https://github.com/badlogic/pi-mono)

> **核心哲學**: _"一個自主代理僅僅是 LLM + 工具 + 循環。"_
> — Mario Zechner

## 一、Pi 的反直覺立場

在當前 Agent 框架生態中，大多數項目在做**加法**：更多工具、更長提示詞、更複雜的規劃鏈、更多子 Agent。Pi 的創作者 Mario Zechner 認為這是一條弯路。他的核心論點是：

> _"前沿模型已經被 RL 訓練得足夠理解'編碼 Agent'是什麼。你不需要 10,000 token 的系統提示詞。"_

| 對比維度 | Claude Code | Codex | Pi  |
| --- | --- | --- | --- |
| 系統提示詞 | 約 10,000+ tokens | 適中  | < 1,000 tokens |
| 內置工具數 | 數十個 | 適中  | 4 個 (read/write/edit/bash) |
| Plan Mode | 有（黑盒子 Agent） | 有   | 無（用文件代替） |
| MCP 支持 | 有   | 有   | 無（用 CLI 工具代替） |
| Sub-Agent | 有（不可觀測） | —   | 無（通過 bash 自我調用） |

## 二、架構分層：5 個文件構成的運行時

`pi-agent-core` 的全部源碼只有 **5 個文件、約 1,500 行代碼**。

## 三、類型系統：少即是多

### 3.1 AgentMessage — 應用狀態與模型上下文的分離

這是整個設計最精妙的抽象：

```typescript
export interface CustomAgentMessages {
    // 默認為空 - 應用通過聲明合併擴展
}

export type AgentMessage = Message | CustomAgentMessages[keyof CustomAgentMessages];
```

### 3.2 AgentLoopConfig — 可插拔的行為注入

```typescript
export interface AgentLoopConfig extends SimpleStreamOptions {
    model: Model<any>;
    convertToLlm: (messages: AgentMessage[]) => Message[] | Promise<Message[]>;
    transformContext?: (messages: AgentMessage[], signal?: AbortSignal) => Promise<AgentMessage[]>;
    getSteeringMessages?: () => Promise<AgentMessage[]>;
    getFollowUpMessages?: () => Promise<AgentMessage[]>;
    getApiKey?: (provider: string) => Promise<string | undefined> | string | undefined;
}
```

### 3.3 AgentEvent — 細粒度的生命週期事件

```typescript
export type AgentEvent =
    | { type: "agent_start" }
    | { type: "agent_end"; messages: AgentMessage[] }
    | { type: "turn_start" }
    | { type: "turn_end"; message: AgentMessage; toolResults: ToolResultMessage[] }
    | { type: "message_start"; message: AgentMessage }
    | { type: "message_update"; message: AgentMessage; assistantMessageEvent: AssistantMessageEvent }
    | { type: "message_end"; message: AgentMessage }
    | { type: "tool_execution_start"; toolCallId: string; toolName: string; args: any }
    | { type: "tool_execution_update"; toolCallId: string; toolName: string; args: any; partialResult: any }
    | { type: "tool_execution_end"; toolCallId: string; toolName: string; result: any; isError: boolean };
```

## 四、核心循環：雙層 While 的精密設計

### 4.1 入口：`agentLoop` vs `agentLoopContinue`

| 函數  | 用途  | 前置條件 |
| --- | --- | --- |
| agentLoop(prompts, context, config) | 用戶發了新消息 | 可以從空上下文開始 |
| agentLoopContinue(context, config) | 重試/恢復 | 上下文最後一條非 assistant |

### 4.2 雙層循環結構

這是 `runLoop()` 的完整控制流——它是理解 Pi Agent 的關鍵。

### 4.3 流式應答處理

`streamAssistantResponse()` 是 AgentMessage → Message 轉換的唯一邊界。

## 五、Agent 類：狀態容器 + 消息隊列

### 5.1 兩種隊列模式

Agent 類引入了思考周到的隊列機制。

### 5.2 `prompt()` vs `continue()` vs `steer()` vs `followUp()`

| 方法  | 調用時機 | 效果  |
| --- | --- | --- |
| prompt(msg) | Agent 空閒時 | 開一輪新對話 |
| continue() | Agent 空閒時 | 從當前狀態續接（重試/消費隊列） |
| steer(msg) | Agent 工作時 | 中斷當前工具鏈，插入消息 |
| followUp(msg) | 任何時候 | 排隊到 Agent 完成後執行 |
| abort() | Agent 工作時 | 取消當前 LLM 調用 |

### 5.3 錯誤恢復

Agent 類在 `catch` 中構造了一個完整的 `AssistantMessage`，確保錯誤狀態也會成為上下文歷史的一部分。

## 六、Proxy Stream：帶寬優化的客戶端重建

這個模塊為 Web 應用場景設計（瀏覽器 → 代理服務器 → LLM）。核心創新是 **帶寬優化**。

## 七、設計哲學總結

### 7.1 "不做什麼"比"做什麼"更重要

| 刻意不做 | 理由  |
| --- | --- |
| 無 Plan Mode | 用文件 PLAN.md 替代。有完整可觀測性，可版本控制，可跨會話共享 |
| 無 MCP 支持 | MCP 工具描述占 7-9% 上下文窗口。用 CLI + README 通過 bash 調用，按需加載 |
| 無 Sub-Agent | "黑盒中的黑盒"，失去可觀測性。通過 bash 自我調用，保留完整輸出可見性 |
| 無 maxSteps | 循環自然結束。 |

### 7.2 核心設計原則

- 極簡主義
- 可觀測性
- 可干預性
- 最晚轉換
- 自我進化

### 7.3 寫給開發者：何時借鑒 Pi 的設計

* ✅ **你的 Agent 需要高可觀測性** → 學習 Pi 的三層事件系統
* ✅ **你在構建編碼/CLI Agent** → 學習"4 工具 + bash"的極簡策略
* ✅ **你需要跨 Provider 會話遷移** → 學習 `convertToLlm` 的最晚轉換模式
* ✅ **你需要用戶中途干預** → 學習 Steering/FollowUp 雙隊列機制
* ❌ **你需要複雜的多 Agent 編排** → Pi 的設計理念與此不符
```

這份 Markdown 文件已經整理完成，您可以根據需要進行下載或使用。



1. [下一代Agent架构——Pi Agent Core 设计逻辑深度解析 - 知乎](https://zhuanlan.zhihu.com/p/2004665077618458930)

