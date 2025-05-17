import * as vscode from 'vscode';
import { callOpenAI } from './api';
import prompts from './prompts';

export function activate(context: vscode.ExtensionContext) {
  // 生成任务（代码/测试/文档）
  context.subscriptions.push(
    vscode.commands.registerCommand('ai.generateTask', async () => {
      const desc = await vscode.window.showInputBox({ prompt: '描述你的任务' });
      if (!desc) { return; }
      const prompt = prompts.generateTask.replace('{{task}}', desc);
      const result = await callOpenAI(prompt);
      vscode.window.showInformationMessage('AI 助理已生成结果，打开输出面板查看。');
      const out = vscode.window.createOutputChannel('AI Assistant');
      out.show(); out.appendLine(result);
    })
  );

  // 扫描代码质量
  context.subscriptions.push(
    vscode.commands.registerCommand('ai.scanCode', async () => {
      const prompt = prompts.scanCode;
      const code = vscode.workspace.textDocuments.map(d => d.getText()).join('\n\n');
      const result = await callOpenAI(prompt + '\n\n```ts\n' + code + '\n```');
      const out = vscode.window.createOutputChannel('AI Scan');
      out.show(); out.appendLine(result);
    })
  );

  // 自动生成报告文档
  context.subscriptions.push(
    vscode.commands.registerCommand('ai.generateDocs', async () => {
      const desc = await vscode.window.showInputBox({ prompt: '报告主题（如“边缘云资源规划”）' });
      if (!desc) { return; }
      const prompt = prompts.generateDocs.replace('{{topic}}', desc);
      const result = await callOpenAI(prompt);
      const doc = await vscode.workspace.openTextDocument({ language: 'markdown', content: result });
      vscode.window.showTextDocument(doc);
    })
  );

  // 发布公众号文章
  context.subscriptions.push(
    vscode.commands.registerCommand('ai.publishArticle', async () => {
      const title = await vscode.window.showInputBox({ prompt: '文章标题' });
      const body = await vscode.window.showInputBox({ prompt: '文章内容（Markdown）', value: '' });
      if (!title || !body) { return; }
      const prompt = prompts.publishArticle
        .replace('{{title}}', title)
        .replace('{{body}}', body);
      await callOpenAI(prompt);
      vscode.window.showInformationMessage('文章已通过 API 提交，稍后检查公众号后台。');
    })
  );
}

export function deactivate() {}
