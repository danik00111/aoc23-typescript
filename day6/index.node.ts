import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(__dirname, '.', 'input.txt'), 'utf8');
const d = input.split('\n').map(x=>x.split(/\ +/).slice(1).map(Number));


function part1():number {
  const data = d[0].map((x,i)=>[x,d[1][i]]);
  console.log(data);
  const leeways = data.map(([time,distance])=>{
    let winways = 0;
    for(let i=0;i<time;i++) if(i*(time-i)>distance) winways++;
    return winways;
  });
  return leeways.reduce((a,v)=>a*v,1);
};
function part2():number {
  const [time, distance] = d.map(x=>Number(x.join('')));
  let winways = 0;
  for(let i=0;i<time;i++) if(i*(time-i)>distance) winways++;
  return winways;
};

console.log(part1());
console.log(part2());