"use client";
import "../gradient.css";
import { BracketViewer } from "@/widgets/BracketViewer";
export default function ViewBracketEvent() {
  return (
    <div className="fixed inset-0 overflow-auto gradient-background  bg-center">
      <BracketViewer />
    </div>
  );
}
