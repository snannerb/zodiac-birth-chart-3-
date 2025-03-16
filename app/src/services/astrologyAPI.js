export const fetchBirthChart = async (birthDetails) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/chart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(birthDetails),
    });
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    throw new Error("Failed to generate chart. Please try again.");
  }
};