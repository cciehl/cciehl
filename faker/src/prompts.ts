export default {
  generateTask: `
给你一段任务描述，生成：
1. 对应的 TypeScript/JavaScript 代码补丁或测试用例
2. 相关注释或 README 片段
3. 合理的 commit message 或 PR 描述

任务：{{task}}
`,
  scanCode: `
帮我扫描下面的 TypeScript 代码，指出：
- 变量/函数拼写或风格问题
- 复杂度过高的函数需重构
- 缺失的测试用例建议
输出分点列表。
`,
  generateDocs: `
请根据以下主题，生成一份结构完整的 Markdown 报告：
主题：{{topic}}
目录：
1. 背景与问题
2. 方法与思路
3. 关键步骤
4. 结论与建议
`,
  publishArticle: `
你是微信公众号自动排版助手。
根据下面的标题和 Markdown 正文，生成符合公众号格式的图文消息 JSON：
标题：《{{title}}》
正文：
{{body}}
`
};
