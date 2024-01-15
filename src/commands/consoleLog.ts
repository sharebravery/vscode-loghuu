// commands/loghuu.consoleLog.ts
import * as vscode from 'vscode'
import { getRandomColor } from '../utils/getRandomColor'

export function insertConsoleStatement() {
  const disposable = vscode.commands.registerCommand('loghuu.consoleLog', async () => {
    const editor = vscode.window.activeTextEditor

    if (editor) {
      // 获取当前选中的文本
      const selectedText = editor.document.getText(editor.selection)
      // 获取当前行的行号和内容
      const currentLineNumber = editor.selection.active.line
      const currentLineText = editor.document.lineAt(currentLineNumber).text

      // 生成随机颜色，最多尝试10次
      const randomColor = getRandomColor(10)

      // 构造要插入的 console 语句
      let consoleStatement: string
      if (selectedText && (selectedText.toLowerCase() === 'error' || selectedText.toLowerCase() === 'err')) {
        consoleStatement = `console.error('%c[${selectedText}]-${currentLineNumber}:', 'color: ${randomColor}', ${selectedText});\n`
      }
      else {
        consoleStatement = selectedText
          ? `console.log('%c[${selectedText}]-${currentLineNumber}:', 'color: ${randomColor}', ${selectedText});\n`
          : `console.log(' %c[]-${currentLineNumber}:', 'color: ${randomColor}',);`
      }

      // 获取当前光标位置
      const currentPosition = editor.selection.active

      // 获取当前行的缩进
      const currentLineIndentation = currentLineText.match(/^\s*/)?.[0] || ''

      await editor.edit(async (editBuilder) => {
        if (selectedText) {
          // 如果有选中文本，则插入到下一行，并保持相同的缩进
          await editBuilder.insert(new vscode.Position(currentLineNumber + 1, 0), currentLineIndentation + consoleStatement)

          const secondCommaIndex = consoleStatement.indexOf(',', consoleStatement.indexOf(',') + 1)
          const openBracketPosition = new vscode.Position(currentLineNumber + 1, currentLineIndentation.length + secondCommaIndex + 1)

          const closeBracketPosition = new vscode.Position(currentLineNumber + 1, currentLineIndentation.length + consoleStatement.indexOf(')'))
          editor.selection = new vscode.Selection(openBracketPosition, closeBracketPosition)
        }
        else {
          // 如果没有选中文本，则插入到当前行
          await editBuilder.insert(currentPosition, consoleStatement)

          const lightLength = editor.selection.active.character

          const firstCommaIndex = lightLength + consoleStatement.indexOf('[') + 1

          const firstPosition = new vscode.Position(currentPosition.line, firstCommaIndex)

          const secondPosition = new vscode.Position(currentPosition.line, firstCommaIndex + 23 + currentLineNumber.toString().length)

          editor.selections = [
            new vscode.Selection(firstPosition, firstPosition),
            new vscode.Selection(secondPosition, secondPosition),
          ]
        }
      })
    }
  })

  return disposable
}
