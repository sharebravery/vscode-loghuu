/* eslint-disable no-template-curly-in-string */
// utils/buildConsoleStatement.ts
import * as vscode from 'vscode'
import { getRandomColor } from './getRandomColor'

export function buildConsoleStatement(selectedText: string, currentLineNumber: number, commandType: string): string {
  const config = vscode.workspace.getConfiguration('Loghuu')

  const randomColor = getRandomColor()
  const prefix = config.get('prefix') as string
  const templateString = config.get('templateString') as string

  if (selectedText && (selectedText.toLowerCase() === 'error' || selectedText.toLowerCase() === 'err')) {
    return templateString
      ? templateString.replace('${selectedText}', selectedText).replace('${currentLineNumber}', currentLineNumber.toString())
      : `console.error('%c[${selectedText}]-${currentLineNumber}:', 'color: ${randomColor}', ${selectedText});\n`
  }
  else {
    return templateString
      ? templateString.replace('${selectedText}', selectedText).replace('${currentLineNumber}', currentLineNumber.toString())
      : selectedText
        ? `console.${commandType.toLowerCase()}('%c${prefix}[${selectedText}]-${currentLineNumber}:', 'color: ${randomColor}', ${selectedText});\n`
        : `console.${commandType.toLowerCase()}(' %c${prefix}[]-${currentLineNumber}:', 'color: ${randomColor}',);`
  }
}
