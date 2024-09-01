import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

async function main() {
  const sizeInput = await rl.question("How big do you want the table to be? (Enter a number between 1 and 12): ");
  const size = parseInt(sizeInput);

  if (isNaN(size) || size < 1 || size > 12) {
      console.log("Please enter a valid number between 1 and 12.");
      rl.close();
      return;
  }

  console.log("\nMultiplication Table:");

  const maxNumber = (size * size).toFixed(0);
  const cellWidth = maxNumber.length + 1;

  for (let i = 1; i <= size; i++) {
      let row = '';
      for (let j = 1; j <= size; j++) {
          const product = (i * j).toFixed(0);
          row += product.padStart(cellWidth, ' ');
      }
      console.log(row);
  }

  rl.close();
}

main();