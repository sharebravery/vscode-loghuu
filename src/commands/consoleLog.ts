// commands/loghuu.consoleLog.ts
import * as vscode from 'vscode';
import { getRandomColor } from '../utils/getRandomColor';

export function insertConsoleStatement() {

    const disposable = vscode.commands.registerCommand('loghuu.consoleLog', async () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            // 获取当前选中的文本
            const selectedText = editor.document.getText(editor.selection);
            // 获取当前行的行号
            const currentLineNumber = editor.selection.active.line;

            // 生成随机颜色，最多尝试10次
            const randomColor = getRandomColor(10);

            // 构造要插入的 console 语句
            let consoleStatement: string;
            if (selectedText && (selectedText.toLowerCase() === 'error' || selectedText.toLowerCase() === 'err')) {
                consoleStatement = `\nconsole.error('%c[${selectedText}]-${currentLineNumber}:', 'color: ${randomColor}', ${selectedText});`;
            } else {
                consoleStatement = selectedText
                    ? `\nconsole.log('%c[${selectedText}]-${currentLineNumber}:', 'color: ${randomColor}', ${selectedText});`
                    : `console.log(' %c[]-${currentLineNumber}:', 'color: ${randomColor}',);`;
            }

            // 获取当前光标位置
            const currentPosition = editor.selection.active;

            await editor.edit(async editBuilder => {
                if (selectedText) {
                    // 如果有选中文本，则插入到下一行
                    await editBuilder.insert(new vscode.Position(currentLineNumber + 1, 0), consoleStatement);

                    const secondCommaIndex = consoleStatement.indexOf(',', consoleStatement.indexOf(',') + 1);
                    const openBracketPosition = new vscode.Position(currentLineNumber + 1, secondCommaIndex + 1);

                    const closeBracketPosition = new vscode.Position(currentLineNumber + 1, consoleStatement.indexOf(')') - 1);
                    editor.selection = new vscode.Selection(openBracketPosition, closeBracketPosition);
                } else {
                    // 如果没有选中文本，则插入到当前行
                    await editBuilder.insert(currentPosition, consoleStatement);

                    const firstPosition = new vscode.Position(currentPosition.line, consoleStatement.indexOf('[') + 1);

                    const secondCommaIndex = consoleStatement.indexOf(',', consoleStatement.indexOf(',') + 1);
                    const openBracketPosition = new vscode.Position(currentPosition.line, secondCommaIndex + 1);

                    editor.selections = [
                        new vscode.Selection(openBracketPosition, openBracketPosition),
                        new vscode.Selection(firstPosition, firstPosition),
                    ];
                }
            });

        }

    });

    return disposable;
}
