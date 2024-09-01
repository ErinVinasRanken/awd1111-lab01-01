import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * (5 / 9);
}

function celsiusToFahrenheit(celsius) {
  return (celsius * (9/5)) + 32;
}

async function main() {
  console.log("Temperature Converter");
  console.log("1. Convert Celsius to Fahrenheit");
  console.log("2. Convert Fahrenheit to Celsius");

  const choice = await rl.question("Choose an option (1 or 2): ");
  
  if (choice !== "1" && choice !== "2") {
    console.log("Please enter the numbers 1 or 2.");
    rl.close();
    return;
  }

  const temperatureInput = await rl.question("Enter the temperature: ");
  const temperature = parseFloat(temperatureInput);

  if (isNaN(temperature) || temperature <= 0) {
    console.log("Please enter a valid temperature");
    rl.close();
    return;
  }

  let convertedTemperature;

  if (choice === "1") {
    convertedTemperature = celsiusToFahrenheit(temperature);
    console.log(`${temperature}°C is equal to ${convertedTemperature.toFixed(2)}°F`);
  } else if (choice === "2") {
    convertedTemperature = fahrenheitToCelsius(temperature);
    console.log(`${temperature}°F is equal to ${convertedTemperature.toFixed(2)}°C`);
  }

  rl.close();
}

main();