import type * as vscode from 'vscode'
import { insertConsoleStatement } from './commands/console-log/consoleLog'
import { addRegionToSelection } from './commands/addRegionToSelection'

export function activate(context: vscode.ExtensionContext) {
  const addRegion = addRegionToSelection()
  const insertConsoleLog = insertConsoleStatement('Log') // Register console.log command
  const insertConsoleWarn = insertConsoleStatement('Warn') // Register console.warn command
  const insertConsoleInfo = insertConsoleStatement('Info') // Register console.info command
  const insertConsoleDebug = insertConsoleStatement('Debug') // Register console.debug command
  const insertConsoleDir = insertConsoleStatement('Dir') // Register console.dir command

  context.subscriptions.push(addRegion)
  context.subscriptions.push(insertConsoleLog)
  context.subscriptions.push(insertConsoleWarn)
  context.subscriptions.push(insertConsoleInfo)
  context.subscriptions.push(insertConsoleDebug)
  context.subscriptions.push(insertConsoleDir)
}

export function deactivate() {

}
