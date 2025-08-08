import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(__dirname, '.', 'input.txt'), 'utf8');
const data = input.split('\n');

function part1():number {
  const calibs = data.map(x=>{
    const numbers = x.replaceAll(/[a-zA-Z]/g, '');
    const calib = numbers.charAt(0) + numbers.slice(-1);
    return calib;
  });
  return calibs.reduce((a:number,v:string):number=>(a+Number(v)),0);
};

function part2():number {
  const calibs = data.map(x=>{
    const fixed = x.replaceAll('oneight','18').replaceAll('twone','21').replaceAll('threeight','38')
    .replaceAll('fiveight','58').replaceAll('sevenine','79').replaceAll('eightwo','82')
    .replaceAll('eighthree','83').replaceAll('nineight','98').replaceAll('zerone','01')
    .replaceAll('zero','0').replaceAll('one','1').replaceAll('two','2').replaceAll('three','3').replaceAll('four','4')
    .replaceAll('five','5').replaceAll('six','6').replaceAll('seven','7').replaceAll('eigh','8').replaceAll('nine','9')
    // you're not on my level. 😈
    const numbers = fixed.replaceAll(/[a-zA-Z]/g, '');
    const calib = numbers.charAt(0) + numbers.slice(-1);
    return calib;
  });
  return calibs.reduce((a:number,v:string):number=>(a+Number(v)),0);
};

console.log(part1());
console.log(part2());