import type { GeneratedBracket } from "@/features/Bracket/GenerateBracket";
import { CreateBracketEventWizard } from "@/widgets/Bracket/CreateBracketEventWizard";
export default function BracketWizardView({
  onRender,
}: {
  onRender: (bracket: GeneratedBracket) => void;
}) {
  return (
    <div className="absolute inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center">
      <div className="bg-white rounded-md shadow-md p-4 max-h-[90%] overflow-auto w-screen max-w-[500px]">
        <CreateBracketEventWizard renderBrackets={onRender} />
      </div>
    </div>
  );
}
