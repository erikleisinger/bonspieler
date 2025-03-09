"use client";
import "./gradient.css";
import { BracketEditor } from "@/widgets/BracketEditor";
// import { BracketViewer } from "@/widgets/BracketViewer";
export default function Home() {
  return (
    <div className="fixed inset-0 overflow-auto gradient-background  bg-center">
      <BracketEditor />
      {/* <BracketViewer /> */}
    </div>
  );
}
