#!/usr/bin/env node

// 匯出函式供測試使用
function sum(...nums) {
  return nums.reduce((s, n) => s + n, 0);
}

module.exports = { sum };

// 只在直接執行時運行 CLI
if (require.main === module) {
  const args = process.argv.slice(2);

// 顯示幫助訊息
if (args.includes('-h') || args.includes('--help') || args.length === 0) {
  console.log(`
使用方式: sum <數字1> [數字2] [數字3] ...

範例:
  sum 5 3        # 輸出: 8
  sum 10 20 30   # 輸出: 60
  sum 1 2 3 4 5  # 輸出: 15

選項:
  -h, --help     顯示幫助訊息
`);
  process.exit(0);
}

// 解析數字並驗證
const numbers = [];
for (let i = 0; i < args.length; i++) {
  const num = parseFloat(args[i]);
  if (isNaN(num)) {
    console.error(`錯誤: 第 ${i + 1} 個參數 '${args[i]}' 不是有效的數字`);
    process.exit(1);
  }
  numbers.push(num);
}

// 計算並輸出結果
const result = numbers.reduce((acc, num) => acc + num, 0);
console.log(result);
}