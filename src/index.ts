import type * as vscode from 'vscode'
import { insertConsoleStatement } from './commands/consoleLog'
import { addRegionToSelection } from './commands/addRegionToSelection'

export function activate(context: vscode.ExtensionContext) {
  const addRegion = addRegionToSelection()
  const insertConsole = insertConsoleStatement()

  context.subscriptions.push(addRegion)
  context.subscriptions.push(insertConsole)
}

export function deactivate() {

}
