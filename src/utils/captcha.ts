export function generateCaptcha(length: number = 6): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let captcha = ''
  for (let i = 0; i < length; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return captcha
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomColor(min: number, max: number): string {
  const r = randomInt(min, max)
  const g = randomInt(min, max)
  const b = randomInt(min, max)
  return `rgb(${r}, ${g}, ${b})`
}

export function renderCaptchaToDataURL(
  text: string,
  width: number = 140,
  height: number = 48,
): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx)
    return ''

  // background
  ctx.fillStyle = randomColor(230, 255)
  ctx.fillRect(0, 0, width, height)

  // interference lines
  const lineCount = 4
  for (let i = 0; i < lineCount; i++) {
    ctx.strokeStyle = randomColor(100, 200)
    ctx.lineWidth = randomInt(1, 2)
    ctx.beginPath()
    ctx.moveTo(randomInt(0, width / 3), randomInt(0, height))
    ctx.bezierCurveTo(
      randomInt(0, width),
      randomInt(0, height),
      randomInt(0, width),
      randomInt(0, height),
      randomInt((2 * width) / 3, width),
      randomInt(0, height),
    )
    ctx.stroke()
  }

  // characters
  const charCount = text.length
  const baseX = width / (charCount + 1)
  for (let i = 0; i < charCount; i++) {
    const fontSize = randomInt(Math.max(18, Math.floor(height * 0.6)), Math.floor(height * 0.8))
    const angle = (randomInt(-30, 30) * Math.PI) / 180
    ctx.save()
    ctx.font = `${fontSize}px system-ui, -apple-system, Segoe UI, Roboto, Arial`
    ctx.fillStyle = randomColor(30, 160)
    ctx.textBaseline = 'middle'
    const x = baseX * (i + 1)
    const y = height / 2 + randomInt(-2, 2)
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.fillText(text[i], -fontSize / 3, 0)
    ctx.restore()
  }

  // noise dots
  const dotCount = Math.floor((width * height) / 80)
  for (let i = 0; i < dotCount; i++) {
    ctx.fillStyle = randomColor(120, 220)
    ctx.fillRect(randomInt(0, width), randomInt(0, height), 1, 1)
  }

  return canvas.toDataURL('image/png')
}
