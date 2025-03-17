export function scrollToBracket(bracketIndex: number) {
  const bracketHeaderEl = document.getElementById(
    "BRACKET-CONTAINER-" + bracketIndex
  );
  if (!bracketHeaderEl) return;
  bracketHeaderEl.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start",
  });
}
