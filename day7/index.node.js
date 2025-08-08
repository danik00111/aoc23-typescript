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
var Handpower;
(function (Handpower) {
    Handpower[Handpower["fiveof"] = 6] = "fiveof";
    Handpower[Handpower["fourof"] = 5] = "fourof";
    Handpower[Handpower["fullhouse"] = 4] = "fullhouse";
    Handpower[Handpower["threeof"] = 3] = "threeof";
    Handpower[Handpower["twopair"] = 2] = "twopair";
    Handpower[Handpower["pair"] = 1] = "pair";
    Handpower[Handpower["high"] = 0] = "high";
    Handpower[Handpower["null"] = -1] = "null";
})(Handpower || (Handpower = {}));
;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const input = fs.readFileSync(path.join(__dirname, '.', 'input.txt'), 'utf8');
const data = input.split('\n').map(x => x.split(' ')).map(([hand, bid]) => [hand, Number(bid)]);
function HandType(hand) {
    const cards = hand.split('');
    const counter = {}; // so that typescript shuts up. typescript?more like ts tststspmotspmosybaupmopmopmopmopmots🥀
    cards.forEach(x => { counter[x] = (counter[x] || 0) + 1; });
    const handtype = Object.values(counter).sort((a, b) => b - a).join(''); // ts(typescript) pmo
    switch (handtype) {
        case '5': return Handpower.fiveof;
        case '41': return Handpower.fourof;
        case '32': return Handpower.fullhouse;
        case '311': return Handpower.threeof;
        case '221': return Handpower.twopair;
        case '2111': return Handpower.pair;
        case '11111': return Handpower.high;
        default: return Handpower.null;
    }
    ;
}
;
function leSuperDuperEpicShtepicGrandHandComparerTheFirst(a, b) {
    const cardpower = 'AKQJT98765432'.split('');
    if (HandType(b) < HandType(a))
        return 1;
    if (HandType(a) < HandType(b))
        return -1;
    for (let i = 0; i < 5; i++) {
        if (cardpower.indexOf(a[i]) < cardpower.indexOf(b[i]))
            return 1;
        if (cardpower.indexOf(b[i]) < cardpower.indexOf(a[i]))
            return -1;
    }
    ;
    return 0;
}
; // order weakest to strongest
function JokeredHandType(hand) {
    const cards = hand.split('');
    const possiblehandtypes = [];
    const ranks = 'AKQJT98765432'.split('');
    for (const rank of ranks)
        possiblehandtypes.push(HandType(hand.replaceAll('J', rank)));
    return Math.max(...possiblehandtypes);
}
;
function leSuperDuperEpicShtepicGrandHandComparerTheSecond(a, b) {
    const cardpower = 'AKQT98765432J'.split('');
    if (JokeredHandType(b) < JokeredHandType(a))
        return 1;
    if (JokeredHandType(a) < JokeredHandType(b))
        return -1;
    for (let i = 0; i < 5; i++) {
        if (cardpower.indexOf(a[i]) < cardpower.indexOf(b[i]))
            return 1;
        if (cardpower.indexOf(b[i]) < cardpower.indexOf(a[i]))
            return -1;
    }
    ;
    return 0;
}
; // order weakest to strongest
function part1() {
    const sorted = data.sort((a, b) => leSuperDuperEpicShtepicGrandHandComparerTheFirst(a[0], b[0]));
    return sorted.map((x, i) => x[1] * (i + 1)).reduce((a, v) => a + v, 0);
}
;
function part2() {
    const sorted = data.sort((a, b) => leSuperDuperEpicShtepicGrandHandComparerTheSecond(a[0], b[0]));
    return sorted.map((x, i) => x[1] * (i + 1)).reduce((a, v) => a + v, 0);
}
;
console.log(part1());
console.log(part2());
