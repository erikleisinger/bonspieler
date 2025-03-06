"use client";
import "./gradient.css";
import { BracketEditor } from "@/widgets/BracketEditor";
export default function Home() {
  return (
    <div className="fixed inset-0 overflow-auto gradient-background">
      <BracketEditor className="absolute inset-0" />
    </div>
  );
}
