import { Metadata } from "next";
import Progress from "../components/progress/Progress";

export default function EditPage() {
  return <>
    <h1 className="text-4xl mt-6 font-bold text-center">
      Your presentation is being generated…
    </h1>
      <Progress />
  </>
}

export const metadata: Metadata = {
  title: "Step-3",
};
