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
const input = fs.readFileSync(path.join(__dirname, '.', 'input.txt'), 'utf8');
const data = input.split('\n').map(x => x.split(': ')[1].replaceAll('  ', ' ').split(' | '));
const winningnumbers = data.map(x => x[1].split(' ').filter(y => x[0].split(' ').includes(y)));
// i checked and there are no duplicate numbers anywhere yay
function part1() {
    const points = winningnumbers.map(x => Math.floor(2 ** (x.length - 1)));
    return points.reduce((a, v) => a + v, 0);
}
;
function part2() {
    const winnumcounts = winningnumbers.map(x => x.length);
    const cardcounts = Array(winnumcounts.length).fill(1);
    for (let i = 0; i < winnumcounts.length; i++) {
        for (let j = 0; j < winnumcounts[i]; j++) {
            const cardToAdd = j + i + 1;
            cardcounts[cardToAdd] += cardcounts[i];
        }
        ;
    }
    ;
    return cardcounts.reduce((a, v) => a + v, 0);
}
;
console.log(part1());
console.log(part2());
