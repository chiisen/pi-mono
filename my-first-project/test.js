#!/usr/bin/env node

const assert = require('assert');
const { sum } = require('./index.js');

console.log('執行測試...\n');

// 測試兩數相加
assert.strictEqual(sum(5, 3), 8, '兩數相加失敗');
console.log('✓ 兩數相加: sum(5, 3) = 8');

// 測試多數字相加
assert.strictEqual(sum(1, 2, 3, 4, 5), 15, '多數字相加失敗');
console.log('✓ 多數字相加: sum(1, 2, 3, 4, 5) = 15');

// 測試小數
assert.strictEqual(sum(1.5, 2.5), 4, '小數相加失敗');
console.log('✓ 小數相加: sum(1.5, 2.5) = 4');

// 測試負數
assert.strictEqual(sum(-5, 3), -2, '負數相加失敗');
console.log('✓ 負數相加: sum(-5, 3) = -2');

// 測試單一數字
assert.strictEqual(sum(10), 10, '單一數字失敗');
console.log('✓ 單一數字: sum(10) = 10');

// 測試無參數
assert.strictEqual(sum(), 0, '無參數失敗');
console.log('✓ 無參數: sum() = 0');

console.log('\n✅ 所有測試通過！');