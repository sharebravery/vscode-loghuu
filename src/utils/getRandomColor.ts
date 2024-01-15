/**
 * 生成亮色随机颜色
 *
 * @param {number} [maxAttempts]
 * @return {*}  {string}
 */
export function getRandomColor(maxAttempts: number = 10): string {
  const isLightColor = (color: string): boolean => {
    // 解析颜色
    const rgb = Number.parseInt(color.substring(1), 16)
    const r = (rgb >> 16) & 0xFF
    const g = (rgb >> 8) & 0xFF
    const b = (rgb >> 0) & 0xFF

    // 计算亮度
    const brightness = (r * 299 + g * 587 + b * 114) / 1000

    // 判断亮度，可调整阈值
    return brightness > 128
  }

  let color: string

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // 生成随机颜色
    color = `#${Math.floor(Math.random() * 16777215).toString(16)}`

    // 如果是亮色，返回颜色
    if (isLightColor(color))
      return color
  }

  // 如果尝试次数超过限制，返回默认颜色
  return '#5662f6'
}
