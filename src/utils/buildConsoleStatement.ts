import { getRandomColor } from './getRandomColor'

export function buildConsoleStatement(selectedText: string, currentLineNumber: number): string {
  const randomColor = getRandomColor(10)

  if (selectedText && (selectedText.toLowerCase() === 'error' || selectedText.toLowerCase() === 'err')) {
    return `console.error('%c🚀[${selectedText}]-${currentLineNumber}:', 'color: ${randomColor}', ${selectedText});\n`
  }
  else {
    return selectedText
      ? `console.log('%c🚀[${selectedText}]-${currentLineNumber}:', 'color: ${randomColor}', ${selectedText});\n`
      : `console.log(' %c🚀[]-${currentLineNumber}:', 'color: ${randomColor}',);`
  }
}
