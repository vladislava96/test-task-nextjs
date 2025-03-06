import type { Metadata } from "next";
import TextareaForm from "./components/generation-form/GenerationForm";

export default function HomePage() {
  return <>
    <h1 className="text-4xl mt-6 font-bold text-center">
      Set the parameters and write a description of your presentation.
    </h1>
    <TextareaForm />
  </>
}

export const metadata: Metadata = {
  title: "Step one",
};
