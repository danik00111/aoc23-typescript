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
const data = input.split('\n');
function part1() {
    const calibs = data.map(x => {
        const numbers = x.replaceAll(/[a-zA-Z]/g, '');
        const calib = numbers.charAt(0) + numbers.slice(-1);
        return calib;
    });
    return calibs.reduce((a, v) => (a + Number(v)), 0);
}
;
function part2() {
    const calibs = data.map(x => {
        const fixed = x.replaceAll('oneight', '18').replaceAll('twone', '21').replaceAll('threeight', '38')
            .replaceAll('fiveight', '58').replaceAll('sevenine', '79').replaceAll('eightwo', '82')
            .replaceAll('eighthree', '83').replaceAll('nineight', '98').replaceAll('zerone', '01')
            .replaceAll('zero', '0').replaceAll('one', '1').replaceAll('two', '2').replaceAll('three', '3').replaceAll('four', '4')
            .replaceAll('five', '5').replaceAll('six', '6').replaceAll('seven', '7').replaceAll('eigh', '8').replaceAll('nine', '9');
        // you're not on my level. 😈
        const numbers = fixed.replaceAll(/[a-zA-Z]/g, '');
        const calib = numbers.charAt(0) + numbers.slice(-1);
        return calib;
    });
    return calibs.reduce((a, v) => (a + Number(v)), 0);
}
;
console.log(part1());
console.log(part2());
