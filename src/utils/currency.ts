/**
 * '
 * 格式化美元货币
 */
export function formatUSDCurrency(locales: Intl.LocalesArgument, value: number | bigint | Intl.StringNumericLiteral) {
  return new Intl.NumberFormat(locales, { style: 'currency', currency: 'USD' }).format(value)
}
