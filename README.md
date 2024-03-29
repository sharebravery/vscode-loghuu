# Loghuu - VSCode Console Region

Loghuu is a Visual Studio Code extension that enhances console logging by providing colorful log statements with regions for better code organization.

## Features

- Insert `console.log` statements with visible colors.
- Automatically add regions around selected code.
- Support for `console.warn`, `console.info`, `console.debug`, and `console.dir`.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or use the keyboard shortcut `Ctrl+Shift+X`.
3. Search for "Loghuu".
4. Click the Install button for "Loghuu" by ShareBravery.

## Usage

### Insert Console.log Statement

1. Select the code you want to log.
2. Press `Ctrl+L` (or `Cmd+L` on macOS) to insert a `console.log` statement with visible colors.

### Add Region to Selection

1. Select the code you want to wrap with a region.
2. Press `Ctrl+Shift+R` to add a region around the selected code.

### Additional Commands

- ~~`Ctrl+L+W` (or `Cmd+L+W` on macOS): Insert `console.warn` statement.~~
- ~~`Ctrl+L+I` (or `Cmd+L+I` on macOS): Insert `console.info` statement.~~
- ~~`Ctrl+L+D` (or `Cmd+L+D` on macOS): Insert `console.debug` statement.~~
- ~~`Ctrl+L+R` (or `Cmd+L+R` on macOS): Insert `console.dir` statement.~~

## Configuration

- The extension automatically adapts to the theme's brightness (light or dark).
- If the selected text is 'error' or 'err', it will use `console.error` instead of `console.log`.

### Prefix

- **Key**: `loghuu.prefix`
- **Type**: String
- **Default**: "🚀"
- **Description**: A custom prefix for the log statement.

### Template String

- **Key**: `loghuu.templateString`
- **Type**: String
- **Default**: "console.log('%c${prefix}[${selectedText}]-${currentLineNumber}:', 'color: ${randomColor}', ${selectedText});\n"
- **Description**: Custom template string for the `console.log` statement. You can use variables like `${prefix}`, `${selectedText}`, `${currentLineNumber}`, and `${randomColor}`.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## License

[MIT](LICENSE) License © 2022 [sharebravery](https://github.com/sharebravery)
