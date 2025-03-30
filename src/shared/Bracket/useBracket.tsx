"use client";
import { useContext } from "react";
import { BracketContext } from "./BracketContext";

export default function useBracket() {
  return useContext(BracketContext);
}
