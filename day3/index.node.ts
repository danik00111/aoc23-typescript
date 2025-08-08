import * as fs from 'fs';
import * as path from 'path';
type Grid = string[][];

const sampleinput = fs.readFileSync(path.join(__dirname, '.', 'sampleinput.txt'), 'utf8');
const input = fs.readFileSync(path.join(__dirname, '.', 'input.txt'), 'utf8');
const data:Grid = [
  '.'.repeat(142).split(''),
  ...input.split('\n').map(x=>['.',...x.split(''),'.']),
  '.'.repeat(142).split(''),
]; // manually added cushions to prevent errors

const gridSlice =(grid:Grid,up:number,left:number,width:number,height:number):Grid=> grid.slice(up,up+height).map(x=>x.slice(left,left+width));

function numCount(grid:Grid,up:number,left:number,size:number): [number,boolean] {
  const num = parseInt(gridSlice(grid,up,left,size,1)[0].join(''));
  const numRegion = gridSlice(grid,up-1,left-1,size+2,3);
  const chars = numRegion.flat().join('').replace(/\.|[0-9]/g, "");
  return [num, chars.length>0];
};

function part1():number {
  let scanningNumber:number = 0;
  let sum = 0;
  for(let y=0;y<data.length;y++) {
    for(let x=0;x<data[0].length;x++) {
      if(parseInt(data[y][x])+1) {
        scanningNumber++;
      } else {
        if(scanningNumber) {
          const num:[number,boolean] = (numCount(data,y,x-scanningNumber,scanningNumber));
          if(num[1]) sum += num[0];
        };
        scanningNumber = 0; // ok i'm very sure this breaks on some edge cases (literally heheeheheh) oh nvm i added cushions all good
      };
    };
  };
  return sum;
};

const data2 = [
  ...data.map(x=>['.','.','.',...x,'.','.','.']),
]; // m o r e   c u s h i o n s

function regionparse(region:string):number[]|any { //always takes a 3x7 so i can jus
  const the = region.replace(/[^\.,\d,\*\n]{1}/,'.');
  const paddedregion = ['.........',...the.split('\n').map(x=>'.'+x+'.'),'.........'].map(x=>x.split(''));
  // copypaste from part1
  let scanningNumber:number = 0;
  let nums:number[] = [];
  for(let y=0;y<paddedregion.length;y++) {
    for(let x=0;x<paddedregion[0].length;x++) {
      if(parseInt(paddedregion[y][x])+1) {
        scanningNumber++;
      } else {
        if(scanningNumber) {
          const num:[number,boolean] = (numCount(paddedregion,y,x-scanningNumber,scanningNumber));
          if(num[1]) nums.push(num[0]);
        };
        scanningNumber = 0; // ok i'm very sure this breaks on some edge cases (literally heheeheheh) oh nvm i added cushions all good
      };
    };
  };
  return nums;
}

function part2():number {
  let sum = 0;
  for(let y=0;y<data2.length;y++) {
    for(let x=0;x<data2[0].length;x++) {
      if(data2[y][x]=='*') {
        const region = gridSlice(data2,y-1,x-3,7,3).map((yy,yi)=>yy.map((xx,xi)=>(
          xx=='*' ? (xi==3&&yi==1 ? '*' : '.') : xx
        )).join('')).join('\n'); // relies on the fact numbers are at most 3 digit
        const nums = regionparse(region);
        if(nums.length==2) sum += nums[0]*nums[1];
      };
    };
  };
  return sum;
}

console.log(part1());
console.log(part2());
// I'M FREEEEEEEEEEEE!!!!!!!!!!!!!YEAAAAHHHHHHHHHHHH