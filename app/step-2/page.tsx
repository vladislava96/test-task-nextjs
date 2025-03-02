import type { Metadata } from "next";
import PresentationPlan from "../components/presentation-plan/PresentationPlan";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export default function IndexPage() {
  return <>
    <PresentationPlan />
    <Button><Plus />Add Page</Button>
    <Button>Confirm & Generate</Button>
    <Button>Recompile Plan</Button>
  </>

}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
