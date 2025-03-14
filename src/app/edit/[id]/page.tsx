"use client";
import "../../gradient.css";
import { BracketEditor } from "@/widgets/BracketEditor";

import testTourney from "@/../mock/test-tourney.json";
export default function EditBracketEvent() {
  return (
    <div className="fixed inset-0 overflow-auto gradient-background  bg-center">
      <BracketEditor data={testTourney} />
    </div>
  );
}
