#!/usr/bin/env node

const args = process.argv.slice(2);

// 顯示幫助訊息
if (args.includes('-h') || args.includes('--help') || args.length === 0) {
  console.log(`
使用方式: sum <數字1> <數字2>

範例:
  sum 5 3     # 輸出: 8
  sum 10 20   # 輸出: 30

選項:
  -h, --help  顯示幫助訊息
`);
  process.exit(0);
}

// 解析數字
const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);

// 驗證輸入
if (isNaN(num1) || isNaN(num2)) {
  console.error('錯誤: 請輸入有效的數字');
  process.exit(1);
}

// 計算並輸出結果
const result = num1 + num2;
console.log(result);