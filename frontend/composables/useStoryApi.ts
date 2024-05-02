
export const useStoryApi = () => {

  const fetchAuthor = async (genre: string, audience: string) => {
    try {
      const response = await fetch(`http://localhost:3002/generateauthor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genre, audience }),
      });
      const data = await response.json();
      return data.authorPrompt; // Devuelve el valor en lugar de asignarlo
    } catch (error) {
      console.error('Error fetching author:', error);
      return null; // Devuelve null en caso de error
    }
  };

  const fetchPremise = async (authorPrompt: string, debug: boolean) => {
    try {
      const response = await fetch(`http://localhost:3002/generatepremise`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authorPrompt, debug }),
      });
      const data = await response.json();
      return data.premisePrompt; // Devuelve el valor en lugar de asignarlo
    } catch (error) {
      console.error('Error fetching premise:', error);
      return null; // Devuelve null en caso de error
    }
  };

  const fetchOutline = async (authorPrompt: string, premisePrompt: string, debug: boolean) => {
    try {
      const response = await fetch(`http://localhost:3002/generateoutline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authorPrompt, premisePrompt, debug }),
      });
      const data = await response.json();
      return data.outlinePrompt; // Devuelve el valor en lugar de asignarlo
    } catch (error) {
      console.error('Error fetching outline:', error);
      return null; // Devuelve null en caso de error
    }
  };

  const fetchFinalStory = async (authorPrompt: string, premisePrompt: string, outlinePrompt: string, guidelinePrompt: string, storySoFar: string, debug: boolean) => {
    try {
      const response = await fetch(`http://localhost:3002/generatestory2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authorPrompt, premisePrompt, outlinePrompt, guidelinePrompt, storySoFar, debug }),
      });
      const data = await response.json();
      return data.story; // Devuelve el valor en lugar de asignarlo
    } catch (error) {
      console.error('Error fetching final story:', error);
      return null; // Devuelve null en caso de error
    }
  };

  return { fetchAuthor, fetchPremise, fetchOutline, fetchFinalStory };
};