import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import CreateBracketWizard from "./CreateBracketEventWizard";
import { Button } from "@/shared/ui/button";
export default function WizardModal({
  onRender,
  open,
  setOpen,
}: {
  onRender: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-rows-[auto_1fr_auto] h-[800px] max-h-[90vh] p-0">
        <DialogHeader className="p-6">
          <DialogTitle>Bracket Generator</DialogTitle>
          <DialogDescription>
            Quickly generate a bracket event
          </DialogDescription>
        </DialogHeader>
        {open && (
          <div className="relative">
            <div className="absolute inset-0 ">
              <CreateBracketWizard onRender={onRender} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
