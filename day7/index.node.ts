enum Handpower { 'fiveof'=6, 'fourof'=5, 'fullhouse'=4, 'threeof'=3, 'twopair'=2, 'pair'=1, 'high'=0, 'null'=-1 };

import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(__dirname, '.', 'input.txt'), 'utf8');
const data:[string,number][] = input.split('\n').map(x=>x.split(' ')).map(([hand,bid])=>[hand,Number(bid)]);

function HandType(hand:string):Handpower {
  const cards = hand.split('');
  const counter:any = {}; // so that typescript shuts up. typescript?more like ts tststspmotspmosybaupmopmopmopmopmots🥀
  cards.forEach(x=>{ counter[x] = (counter[x]||0) + 1 });
  const handtype = Object.values(counter).sort((a:any,b:any)=>b-a).join(''); // ts(typescript) pmo
  switch(handtype) {
    case '5': return Handpower.fiveof;
    case '41': return Handpower.fourof;
    case '32': return Handpower.fullhouse;
    case '311': return Handpower.threeof;
    case '221': return Handpower.twopair;
    case '2111': return Handpower.pair;
    case '11111': return Handpower.high;
    default: return Handpower.null;
  };
};
function leSuperDuperEpicShtepicGrandHandComparerTheFirst(a:string, b:string):-1|0|1 {
  const cardpower = 'AKQJT98765432'.split('');
  if(HandType(b) < HandType(a)) return 1;
  if(HandType(a) < HandType(b)) return -1;
  for(let i=0; i<5; i++) {
    if(cardpower.indexOf(a[i]) < cardpower.indexOf(b[i])) return 1;
    if(cardpower.indexOf(b[i]) < cardpower.indexOf(a[i])) return -1;
  };
  return 0;
}; // order weakest to strongest

function JokeredHandType(hand:string):number {
  const cards = hand.split('');
  const possiblehandtypes = [];
  const ranks = 'AKQJT98765432'.split('');
  for(const rank of ranks) possiblehandtypes.push(HandType(hand.replaceAll('J',rank)));
  return Math.max(...possiblehandtypes);
};
function leSuperDuperEpicShtepicGrandHandComparerTheSecond(a:string, b:string):-1|0|1 {
  const cardpower = 'AKQT98765432J'.split('');
  if(JokeredHandType(b) < JokeredHandType(a)) return 1;
  if(JokeredHandType(a) < JokeredHandType(b)) return -1;
  for(let i=0; i<5; i++) {
    if(cardpower.indexOf(a[i]) < cardpower.indexOf(b[i])) return 1;
    if(cardpower.indexOf(b[i]) < cardpower.indexOf(a[i])) return -1;
  };
  return 0;
}; // order weakest to strongest

function part1():number|any {
  const sorted = data.sort((a,b) => leSuperDuperEpicShtepicGrandHandComparerTheFirst(a[0], b[0]));
  return sorted.map((x,i)=>x[1]*(i+1)).reduce((a,v)=>a+v,0);
};
function part2():number|any {
  const sorted = data.sort((a,b) => leSuperDuperEpicShtepicGrandHandComparerTheSecond(a[0], b[0]));
  return sorted.map((x,i)=>x[1]*(i+1)).reduce((a,v)=>a+v,0);
};

console.log(part1());
console.log(part2());