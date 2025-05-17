# AI 开发助理 VS Code 插件

这是一个示例 VS Code 插件，提供生成任务、扫描代码、生成报告和发布文章的命令。

## 本地运行

1. 安装依赖并编译
   ```bash
   cd my-ai-assistant
   npm install
   npm run compile
   ```
2. 设置 OpenAI API 密钥（请将 `OPENAI_API_KEY` 替换为你的实际密钥）
   ```bash
   export OPENAI_API_KEY=your-key-here
   ```
3. 在 VS Code 中按 <kbd>F5</kbd> 启动调试，会打开新的 Extension Development Host 窗口。
4. 在命令面板中执行以下任一命令体验插件：
   - `AI: 生成代码/测试/文档`
   - `AI: 扫描并质量提醒`
   - `AI: 自动生成报告`
   - `AI: 发布公众号文章`
