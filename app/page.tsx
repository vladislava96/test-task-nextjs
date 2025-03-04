import type { Metadata } from "next";
import TextareaForm from "./components/generation-form/GenerationForm";

export default function IndexPage() {
  return <TextareaForm />;
}

export const metadata: Metadata = {
  title: "Step one",
};
