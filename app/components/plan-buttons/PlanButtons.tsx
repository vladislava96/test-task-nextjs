"use client"
import { Button } from "@/components/ui/button";
import { fetchSlidesAsync } from "@/lib/features/generation-form/generationFormSlice";
import { useAppDispatch } from "@/lib/hooks";
import { RefreshCcw, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";

export default function PlanButtons() {
  const dispatch = useAppDispatch();

  function handleRecompile() {
    dispatch(fetchSlidesAsync());
  }

  function handleConfirm() {
    redirect("./step-3")
  }

  return (
    <div className="flex justify-between lg:w-3xl md:w-2xl sm:w-xl gap-10 md:gap-0 m-10">
      <Button onClick={handleRecompile}><RefreshCcw />Recompile Plan</Button>
      <Button onClick={handleConfirm}><Sparkles />Confirm & Generate</Button>
    </div>
  )
}