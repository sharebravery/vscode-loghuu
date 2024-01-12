import * as vscode from 'vscode';

/**
 * 生成随机颜色
 *
 * @return {*}  {string}
 */
function getRandomColor(): string {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "loghuu" is now active!');

	let disposable = vscode.commands.registerCommand('loghuu.consoleLog', async () => {
		// 获取当前活动的编辑器
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			// 获取当前选中的文本
			const selectedText = editor.document.getText(editor.selection);

			// 获取当前行的行号
			const currentLineNumber = editor.selection.active.line;

			// 获取当前行的文本
			const currentLineText = editor.document.lineAt(currentLineNumber).text;

			// 生成随机颜色
			const randomColor = getRandomColor();

			// 构造要插入的 console.log 语句
			const consoleStatement = selectedText
				? `\nconsole.log('%c${selectedText}', 'color: ${randomColor}');`
				: `console.log('%c${currentLineText}', 'color: ${randomColor}');`;

			// 获取当前光标位置
			const currentPosition = editor.selection.active;

			// 插入 console.log 语句
			await editor.edit(async editBuilder => {
				if (selectedText) {
					// 如果有选中文本，则插入到下一行
					await editBuilder.insert(new vscode.Position(currentLineNumber + 1, 0), consoleStatement);
					// 获取括号内的位置
					const openBracketPosition = new vscode.Position(currentLineNumber + 1, consoleStatement.indexOf('('));
					const closeBracketPosition = new vscode.Position(currentLineNumber + 1, consoleStatement.indexOf(')') - 1);
					// 将光标定位到括号内并选中括号内的内容
					editor.selection = new vscode.Selection(openBracketPosition, closeBracketPosition);
				} else {
					// 如果没有选中文本，则插入到当前行
					await editBuilder.insert(currentPosition, consoleStatement);
					// 获取括号内的位置
					const openBracketPosition = new vscode.Position(currentPosition.line, consoleStatement.indexOf('(') + 2);
					const closeBracketPosition = new vscode.Position(currentPosition.line, consoleStatement.indexOf(')') - 1);
					// 将光标定位到括号内并选中括号内的内容
					editor.selection = new vscode.Selection(openBracketPosition, closeBracketPosition);
				}
			});

			vscode.window.showInformationMessage('Inserted console.log statement with random color.');
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
