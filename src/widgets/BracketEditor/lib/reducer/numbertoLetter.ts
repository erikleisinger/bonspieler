export function numberToLetter(num: number) {
  // Check if the number is within the valid range (1 to 26)
  if (num < 1 || num > 26) {
    return "Invalid input. Please provide a number between 1 and 26.";
  }

  // Convert the number to the corresponding uppercase letter
  // ASCII code for 'A' is 65, so we add (num - 1) to it
  return String.fromCharCode(64 + num);
}
