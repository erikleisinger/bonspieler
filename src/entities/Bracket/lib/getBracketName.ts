import { numberToLetter } from "@/shared/utils/numberToLetter";
export function getBracketName(bracketIndex: number) {
  return numberToLetter(bracketIndex + 1) + " Event";
}
