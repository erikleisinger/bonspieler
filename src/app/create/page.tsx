"use client";
import "../gradient.css";
import { BracketEditor } from "@/widgets/BracketEditor";
export default function CreateBracketEvent() {
  return (
    <div className="fixed inset-0 overflow-auto gradient-background  bg-center">
      <BracketEditor />
    </div>
  );
}
