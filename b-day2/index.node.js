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
const data = input.split('\n').map(x => {
    const grabs = x.split(': ')[1].split('; ').map(y => y.split(', ').reduce((count, v) => {
        const amount = Number(v.split(' ')[0]);
        const color = v.split(' ')[1];
        switch (color) { // ts is stupid
            case 'red':
                count.r = amount;
                break;
            case 'green':
                count.g = amount;
                break;
            case 'blue':
                count.b = amount;
                break;
        }
        return count;
    }, { r: 0, g: 0, b: 0 }));
    return grabs;
});
function part1() {
    const maxpulls = data.map(x => x.reduce((a, v) => ({
        r: Math.max(a.r, v.r),
        g: Math.max(a.g, v.g),
        b: Math.max(a.b, v.b),
    }), { r: 0, g: 0, b: 0 }));
    const possiblepulls = maxpulls.map((x, i) => [i + 1, (x.r <= 12 && x.g <= 13 && x.b <= 14)]);
    return possiblepulls.reduce((a, v) => (a + (Number(v[0]) * Number(v[1]))), 0);
}
;
function part2() {
    const maxpulls = data.map(x => x.reduce((a, v) => ({
        r: Math.max(a.r, v.r),
        g: Math.max(a.g, v.g),
        b: Math.max(a.b, v.b),
    }), { r: 0, g: 0, b: 0 }));
    const powers = maxpulls.map(x => (x.r * x.g * x.b));
    return powers.reduce((a, v) => a + v, 0);
}
;
console.log(part1());
console.log(part2());
