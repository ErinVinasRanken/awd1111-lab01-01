import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const taxBrackets = {
  single: [
    { rate: 0.10, threshold: 1160 },
    { rate: 0.12, threshold: 47150 },
    { rate: 0.22, threshold: 100525 },
    { rate: 0.24, threshold: 191950 },
    { rate: 0.32, threshold: 243725 },
    { rate: 0.35, threshold: 609350 },
    { rate: 0.37, threshold: Infinity }
],
married: [
    { rate: 0.10, threshold: 23200 },
    { rate: 0.12, threshold: 94300 },
    { rate: 0.22, threshold: 201050 },
    { rate: 0.24, threshold: 383900 },
    { rate: 0.32, threshold: 487450 },
    { rate: 0.35, threshold: 731200 },
    { rate: 0.37, threshold: Infinity }
]
};

function calculateTax(income, brackets) {
  let tax = 0;
  let previousThreshold = 0;

  for (let i = 0; i < brackets.length; i++) {
      const { rate, threshold } = brackets[i];

      if (income > threshold) {
          tax += (threshold - previousThreshold) * rate;
      } else {
          tax += (income - previousThreshold) * rate;
          break;
      }
      previousThreshold = threshold;
  }

  return Math.ceil(tax);
}

async function main(){
  const status = await rl.question("Enter 'S' if you are single, and enter 'M' if your are married: ");
  const isSingle = status.toLowerCase() === "s";
  const isMarried = status.toLowerCase() === "m";

  if(!isSingle && !isMarried){
    console.log("Please enter an 'S' for single or an 'M' for married.");
    rl.close();
    return;
  }

  const incomeInput = await rl.question("Enter your taxable income for 2024: ");
  const income = parseFloat(incomeInput);

  if(isNaN(income) || income <= 0){
    console.log("Please enter your taxable income greater than 0.");
    rl.close();
    return;
  }

  const taxBracketsToUse = isSingle ? taxBrackets.single : taxBrackets.married;
  const totalTax = calculateTax(income, taxBracketsToUse);

  console.log(`Your total income tax for 2024 is: $${totalTax}`);

  rl.close();
}

main();