export default function randomId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
  let result = "";

  // Ensure that the first character is a letter
  result += characters.charAt(Math.floor(Math.random() * 52));

  for (let i = 1; i < 10; i++) {
    // Avoid consecutive underscores
    let nextCharacter = characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
    while (nextCharacter === "_" && result.charAt(i - 1) === "_") {
      nextCharacter = characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    result += nextCharacter;
  }

  return result;
}
