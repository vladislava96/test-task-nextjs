"use client"

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [progress, setProgress] = useState(0)

  function getProgress() {
    let timerId = setTimeout(() => {
      setProgress(progress + 1)
    }, 50);

    if (progress === 100) {
      clearTimeout(timerId);
    }
  }

  useEffect(() => {
    getProgress();
  })

  return <>
    <div className="w-[100%] sm:w-[60%] h-[100%] flex-col flex justify-center">
      <Progress value={progress} />
    </div>
  </>
}