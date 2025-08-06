是的，这是一个很常见的问题：LLM 在生成 React 代码时容易“Hooks 泛化”，把本该是普通工具函数（utils）的内容也写成自定义 Hook（如 `useFormatDate`, `useUtils` 等），导致不必要的复杂性和耦合。

### ✅ 简短有效的提示词（Prompt 技巧）

你可以在提示中加入以下**简短、明确的指令**，有效抑制 Hooks 泛化：

---

#### ✅ 推荐提示词（中英文可选）：

> **"Use plain utility functions instead of custom hooks for logic that does not use React lifecycle or state."**

> **"Only use hooks when necessary (e.g. useEffect, useState). For pure logic, write simple functions in utils."**

> **"Avoid creating custom hooks for pure utility functions. Keep utils simple and reusable."**

> **"Prefer plain JavaScript functions for formatting, calculations, or data processing."**

---

#### 中文提示（更直接）：

> **“工具函数请用普通函数实现，不要包装成 useXxx 的 Hook，除非用到 useState、useEffect 等 React 特性。”**

> **“纯逻辑处理写成 utils 的普通函数，不要滥用自定义 Hook。”**

> **“非组件状态或副作用的逻辑，不要用 hooks。”**

---

### ✅ 额外建议（工程层面）

1. **目录结构引导**：
   明确告诉 LLM 项目结构，例如：
   ```
   src/
     utils/
       formatDate.js
       calculateTax.js
     hooks/
       useAuth.js
       useApi.js
   ```
   并说明：“utils 目录放纯函数，hooks 目录才放自定义 Hook”。

2. **命名约束**：
   加一句：“只有以 `use` 开头的文件或函数才应该是 Hook”。

3. **示例引导（Few-shot）**：
   给一个例子：
   ```js
   // utils/formatDate.js
   export const formatDate = (date) => new Intl.DateTimeFormat('zh-CN').format(date);
   ```

---

### ✅ 总结

最有效的**一句话提示**是：

> **“纯工具逻辑用普通函数，不要写成 Hook，除非用到 React 状态或副作用。”**

这句话简短、清晰，能显著减少 LLM 的 Hooks 泛化倾向。

如果你在用 ChatGPT / Claude / 通义等模型，加上这句，输出质量会立刻改善。