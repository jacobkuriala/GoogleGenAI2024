interface StoryParams {
  prompt: string;
  audience: string;
  genre: string;
}

export const useCreateStory = () => {
  const story: Ref<string> = ref("");
  const isLoading: Ref<boolean> = ref(false);
  const error: Ref<Error | null> = ref(null);

  const createStory = async ({ prompt, audience, genre }: StoryParams) => {
  
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch(
        `http://localhost:3002/generatestory?prompt=${encodeURIComponent(
          prompt
        )}&audience=${encodeURIComponent(audience)}&genre=${encodeURIComponent(
          genre
        )}`,
        {
          method: "GET", // Asegúrate de que el método HTTP coincida con lo que tu backend espera
        }
      );
      const data = await response.json();
      if (response.ok) {
        story.value = data.story;
        console.log(data.story, "data");
      } else {
        throw new Error(data.message || "Error fetching story");
      }
    } catch (err) {
      error.value = err as Error;
      console.error("Error generating story:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    story,
    isLoading,
    error,
    createStory,
  };
};
