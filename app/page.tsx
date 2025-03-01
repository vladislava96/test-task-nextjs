import type { Metadata } from "next";
import { Counter } from "./components/counter/Counter";
import TextareaForm from "./components/generation-form/GenerationForm";

export default function IndexPage() {
  return <TextareaForm />;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
