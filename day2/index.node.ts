import * as fs from 'fs';
import * as path from 'path';
type Count = { r:number, g:number, b:number };

const input = fs.readFileSync(path.join(__dirname, '.', 'input.txt'), 'utf8');
const data = input.split('\n').map(x=>{
  const grabs = x.split(': ')[1].split('; ').map(y=>y.split(', ').reduce((count:Count,v:string):Count=>{
    const amount = Number(v.split(' ')[0]);
    const color = v.split(' ')[1];
    switch(color) { // ts is stupid
      case 'red': count.r = amount; break;
      case 'green': count.g = amount; break;
      case 'blue': count.b = amount; break;
    }
    return count;
  },{r:0,g:0,b:0}));
  return grabs;
});

function part1():number {
  const maxpulls = data.map(x=>x.reduce((a:Count,v:Count):Count=>({
    r:Math.max(a.r,v.r),
    g:Math.max(a.g,v.g),
    b:Math.max(a.b,v.b),
  }),{r:0,g:0,b:0}));
  const possiblepulls = maxpulls.map((x,i)=>[i+1,(x.r<=12 && x.g<=13 && x.b<=14)]);
  return possiblepulls.reduce((a,v)=>(
    a + (Number(v[0])*Number(v[1]))
  ),0);
};

function part2():number {
  const maxpulls = data.map(x=>x.reduce((a:Count,v:Count):Count=>({
    r:Math.max(a.r,v.r),
    g:Math.max(a.g,v.g),
    b:Math.max(a.b,v.b),
  }),{r:0,g:0,b:0}));
  const powers = maxpulls.map(x=>(x.r*x.g*x.b));
  return powers.reduce((a,v)=>a+v,0);
};

console.log(part1());
console.log(part2());