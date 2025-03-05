import type { Metadata } from "next";
import TextareaForm from "./components/generation-form/GenerationForm";

export default function HomePage() {
  return <>
    <h1 className="text-4xl mt-6 font-bold text-center">
      Create your presentation
    </h1>
    <TextareaForm />
  </>
}

export const metadata: Metadata = {
  title: "Step one",
};
