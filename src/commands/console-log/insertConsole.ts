// 在 commands/loghuu.consoleLog.ts 中
import * as vscode from 'vscode'
import { buildConsoleStatement } from '../../utils/buildConsoleStatement'

export function insertConsoleStatement() {
  return insertConsole('log')
}

export function insertConsoleWarn() {
  return insertConsole('warn')
}

export function insertConsoleInfo() {
  return insertConsole('info')
}

export function insertConsoleDebug() {
  return insertConsole('debug')
}

export function insertConsoleDir() {
  return insertConsole('dir')
}

function insertConsole(type: string) {
  const disposable = vscode.commands.registerCommand(`loghuu.console${type.charAt(0).toUpperCase() + type.slice(1)}`, async () => {
    const editor = vscode.window.activeTextEditor

    if (editor) {
      const selectedText = editor.document.getText(editor.selection)
      const currentLineNumber = editor.selection.active.line
      const currentLineText = editor.document.lineAt(currentLineNumber).text
      const currentPosition = editor.selection.active
      const currentLineIndentation = currentLineText.match(/^\s*/)?.[0] || ''

      await editor.edit(async (editBuilder) => {
        if (selectedText) {
          const consoleStatement = buildConsoleStatement(selectedText, currentLineNumber + 2, type)

          await editBuilder.insert(new vscode.Position(currentLineNumber + 1, 0), currentLineIndentation + consoleStatement)

          const secondCommaIndex = consoleStatement.indexOf(',', consoleStatement.indexOf(',') + 1)
          const openBracketPosition = new vscode.Position(currentLineNumber + 1, currentLineIndentation.length + secondCommaIndex + 1)

          const closeBracketPosition = new vscode.Position(currentLineNumber + 1, currentLineIndentation.length + consoleStatement.indexOf(')'))
          editor.selection = new vscode.Selection(openBracketPosition, closeBracketPosition)
        }
        else {
          const consoleStatement = buildConsoleStatement(selectedText, currentLineNumber + 1, type)

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
