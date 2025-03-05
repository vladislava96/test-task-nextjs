import { Metadata } from "next";
import { Loader } from "../components/loader/Loader";

export default function IndexPage() {
  return <>
    <h1 className="text-4xl mt-6 font-bold text-center">
      Creating a presentation
    </h1>
    <div className="w-[400px] h-[400px] flex justify-center items-center">
      <Loader />
    </div>
  </>
}

export const metadata: Metadata = {
  title: "Step-3",
};
