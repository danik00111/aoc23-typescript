import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(__dirname, '.', 'input.txt'), 'utf8');
const data = input.split('\n').map(x=>x.split(': ')[1].replaceAll('  ', ' ').split(' | '));

const winningnumbers = data.map(x=>x[1].split(' ').filter( y=>x[0].split(' ').includes(y) ));
// i checked and there are no duplicate numbers anywhere yay

function part1():number {
  const points = winningnumbers.map(x=>Math.floor(2**(x.length-1)));
  return points.reduce((a,v)=>a+v,0);
};

function part2():number|any {
  const winnumcounts = winningnumbers.map(x=>x.length);
  const cardcounts:number[] = Array(winnumcounts.length).fill(1);
  for(let i=0; i<winnumcounts.length; i++) {
    for(let j=0;j<winnumcounts[i];j++) {
      const cardToAdd = j+i+1;
      cardcounts[cardToAdd]+= cardcounts[i];
    };
  };
  return cardcounts.reduce((a,v)=>a+v,0);
};

console.log(part1());
console.log(part2());