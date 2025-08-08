"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sampleinput = fs.readFileSync(path.join(__dirname, '.', 'sampleinput.txt'), 'utf8');
const input = fs.readFileSync(path.join(__dirname, '.', 'input.txt'), 'utf8');
const data = [
    '.'.repeat(142).split(''),
    ...input.split('\n').map(x => ['.', ...x.split(''), '.']),
    '.'.repeat(142).split(''),
]; // manually added cushions to prevent errors
const gridSlice = (grid, up, left, width, height) => grid.slice(up, up + height).map(x => x.slice(left, left + width));
function numCount(grid, up, left, size) {
    const num = parseInt(gridSlice(grid, up, left, size, 1)[0].join(''));
    const numRegion = gridSlice(grid, up - 1, left - 1, size + 2, 3);
    const chars = numRegion.flat().join('').replace(/\.|[0-9]/g, "");
    return [num, chars.length > 0];
}
;
function part1() {
    let scanningNumber = 0;
    let sum = 0;
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[0].length; x++) {
            if (parseInt(data[y][x]) + 1) {
                scanningNumber++;
            }
            else {
                if (scanningNumber) {
                    const num = (numCount(data, y, x - scanningNumber, scanningNumber));
                    if (num[1])
                        sum += num[0];
                }
                ;
                scanningNumber = 0; // ok i'm very sure this breaks on some edge cases (literally heheeheheh) oh nvm i added cushions all good
            }
            ;
        }
        ;
    }
    ;
    return sum;
}
;
const data2 = [
    ...data.map(x => ['.', '.', '.', ...x, '.', '.', '.']),
]; // m o r e   c u s h i o n s
function regionparse(region) {
    const the = region.replace(/[^\.,\d,\*\n]{1}/, '.');
    const paddedregion = ['.........', ...the.split('\n').map(x => '.' + x + '.'), '.........'].map(x => x.split(''));
    // copypaste from part1
    let scanningNumber = 0;
    let nums = [];
    for (let y = 0; y < paddedregion.length; y++) {
        for (let x = 0; x < paddedregion[0].length; x++) {
            if (parseInt(paddedregion[y][x]) + 1) {
                scanningNumber++;
            }
            else {
                if (scanningNumber) {
                    const num = (numCount(paddedregion, y, x - scanningNumber, scanningNumber));
                    if (num[1])
                        nums.push(num[0]);
                }
                ;
                scanningNumber = 0; // ok i'm very sure this breaks on some edge cases (literally heheeheheh) oh nvm i added cushions all good
            }
            ;
        }
        ;
    }
    ;
    return nums;
}
function part2() {
    let sum = 0;
    for (let y = 0; y < data2.length; y++) {
        for (let x = 0; x < data2[0].length; x++) {
            if (data2[y][x] == '*') {
                const region = gridSlice(data2, y - 1, x - 3, 7, 3).map((yy, yi) => yy.map((xx, xi) => (xx == '*' ? (xi == 3 && yi == 1 ? '*' : '.') : xx)).join('')).join('\n'); // relies on the fact numbers are at most 3 digit
                const nums = regionparse(region);
                if (nums.length == 2)
                    sum += nums[0] * nums[1];
            }
            ;
        }
        ;
    }
    ;
    return sum;
}
console.log(part1());
console.log(part2());
// I'M FREEEEEEEEEEEE!!!!!!!!!!!!!YEAAAAHHHHHHHHHHHH
