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
const d = input.split('\n').map(x => x.split(/\ +/).slice(1).map(Number));
function part1() {
    const data = d[0].map((x, i) => [x, d[1][i]]);
    console.log(data);
    const leeways = data.map(([time, distance]) => {
        let winways = 0;
        for (let i = 0; i < time; i++)
            if (i * (time - i) > distance)
                winways++;
        return winways;
    });
    return leeways.reduce((a, v) => a * v, 1);
}
;
function part2() {
    const [time, distance] = d.map(x => Number(x.join('')));
    let winways = 0;
    for (let i = 0; i < time; i++)
        if (i * (time - i) > distance)
            winways++;
    return winways;
}
;
console.log(part1());
console.log(part2());
