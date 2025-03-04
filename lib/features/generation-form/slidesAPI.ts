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
