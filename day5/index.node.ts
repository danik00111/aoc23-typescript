// soil50<-seed98 len2
// soil52<-seed50 len48

import * as fs from 'fs';
import * as path from 'path';
type SeedRange = { start:number, len:number };

const input = fs.readFileSync(path.join(__dirname, '.', 'input.txt'), 'utf8');
const data = input.split('\n\n');

const seeds = data[0].split(': ')[1].split(' ').map(Number);
const maps = data.slice(1).map((x,i)=>{
  return x.split('\n').slice(1).map(y=>y.split(' ').map(Number));
});

function mapper(x:number,inmap:number[][]):number {
  const usablemap = inmap.map(([desti, source, len])=>({
    range: [source,source+len-1], offset: desti-source
  }));
  let offsettouse = 0;
  usablemap.forEach(({range,offset})=>{
    if(x>=range[0] && x<=range[1]) offsettouse = offset;
  });
  return x+offsettouse;
};

function step(ins:number[], inmap:number[][]):number[] {
  const maxins = inmap.map(([desti,source,len])=>desti+len-1);
  const maxouts = inmap.map(([desti,source,len])=>source+len-1);
  const maxmapto = Math.max(...maxouts,...maxins,...ins);
  return ins.map(x=>mapper(x,inmap)||x);
};

function part1():number {
  let ins = seeds;
  for(let i=0; i<maps.length; i++) ins = step(ins, maps[i]);
  return Math.min(...ins);
};

function part2step(ins:SeedRange[], inmap:number[][]):SeedRange[] {
  const maxins = inmap.map(([desti,source,len])=>desti+len-1);
  const maxouts = inmap.map(([desti,source,len])=>source+len-1);
  const maxmapto = Math.max(...maxouts,...maxins,...(ins.map(x=>x.start)));
  return ins.map(x=>({
    start: mapper(x.start,inmap)||x.start,
    len: x.len
  }));
};

function part2():number {
  const ranges = seeds.length / 2;
  let ins = Array(ranges).fill(0).map((_,i)=>{
    const [start,len] = seeds.slice(i*2,(i+1)*2);
    return {start,len};
  });
  // for each map, do the thing
  for(let i=0; i<maps.length; i++) {
    const usablemap = maps[i].map(([desti, source, len])=>({
      range: [source,source+len-1], offset: desti-source
    }));
    // pick up the boundaries (breakpoints) of the map
    const breakpoints = usablemap.map(
      x=>[x.range[0]-0.5, x.range[1]+0.5]
    ).flat().filter((x,i,r)=>i===r.indexOf(x) && x>=0);
    // for each breakpoint, see if its inside a seed range and break that seed range into 2 on the breakpoint
    breakpoints.forEach(bp => {
      // rtb stands for range to break, full var name too long to keep
      const rtbINDEX = ins.findIndex(x=>(
        x.start<bp && bp<x.start+x.len-1
      ));
      if(rtbINDEX==-1) return;
      const rtb = ins.splice(rtbINDEX,1)[0];
      const newranges = [
        {start: rtb.start, len: Math.ceil(bp)-rtb.start },
        {start: Math.ceil(bp), len: rtb.len-Math.ceil(bp)+rtb.start }
      ];
      ins.push(newranges[0]); ins.push(newranges[1]);
    });
    // then you can just apply the part 1 logic to the seed range starts
    ins = part2step(ins, maps[i]);
  };
  return Math.min(...(ins.map(x=>x.start)));
  // the start is alawys the lowest value in the range, so only need to check those
};

console.log(part1());
console.log(part2());