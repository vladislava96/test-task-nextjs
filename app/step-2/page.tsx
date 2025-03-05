import type { Metadata } from "next";
import PresentationPlan from "../components/presentation-plan/PresentationPlan";
import PlanButtons from "../components/plan-buttons/PlanButtons";

export default function CreationPage() {
  return <>
    <h1 className="text-4xl mt-6 font-bold text-center">
      Edit your presentation's structure
    </h1>
    <PresentationPlan />
    <PlanButtons />
  </>
}

export const metadata: Metadata = {
  title: "Step-2",
};
