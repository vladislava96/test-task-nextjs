import { Slide } from "./generationFormSlice";

export const fetchSlides = async (): Promise<Slide[]> => {
  try {
    const response = await fetch("/data.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch slides: ${response.statusText}`);
    }
    const data: Slide[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching slides:", error);
    throw error;
  }
};

export const fetchPresentationDescription = async (description: string) => {
  try {
    const response = await fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(description),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch description: ${response.statusText}`);
    }
    const result: string = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching description:", error);
    throw error;
  }
};
