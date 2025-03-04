import type { Metadata } from "next";
import PresentationPlan from "../components/presentation-plan/PresentationPlan";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import SlideForm from "../components/slide-form/SlideForm";

export default function IndexPage() {
  return <>
    <h1>Edit your presentation's structure</h1>
    <PresentationPlan />
    <Dialog>
      <DialogTrigger asChild>
      <Button><Plus />Add Slide</Button>
      </DialogTrigger>
      <DialogContent>
      <DialogHeader>
          <DialogTitle>About slide</DialogTitle>
      </DialogHeader>
      <SlideForm usage="add"/>
      </DialogContent>
    </Dialog>
    <Button>Confirm & Generate</Button>
    <Button>Recompile Plan</Button>
  </>
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
