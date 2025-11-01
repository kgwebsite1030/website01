function formatUSDCurrency(locales: Intl.LocalesArgument, value: number | bigint | Intl.StringNumericLiteral) {
  return new Intl.NumberFormat(locales, { style: 'currency', currency: 'USD' }).format(value)
}

/**
 * 格式化美元货币
 * @param value 面额
 * @returns $99.99
 */
export function formatCurrency(value: number) {
  return formatUSDCurrency('en', value)
}
