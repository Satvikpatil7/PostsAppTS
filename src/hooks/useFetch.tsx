import { useState, useEffect, useCallback } from "react";

// Custom hook for fetching data from an API
const useFetch = <T,>(url: string) => {
  // State to store fetched data
  const [data, setData] = useState<T>([] as T);

  // State to track loading status
  const [loading, setLoading] = useState<boolean>(true);

  // State to store error messages
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data from the API
  const fetchData = useCallback(async () => {
    setLoading(true); // Set loading to true before fetching
    setError(null); // Clear previous errors
    setData([] as T); // Reset data before fetching

    try {
      const response = await fetch(url); // Make API request
      if (!response.ok) throw new Error("Failed to fetch data"); // Handle errors

      const result: T = await response.json(); // Convert response to JSON
      setData(result); // Store fetched data
    } catch (err) {
      setError((err as Error).message); // Store error message if request fails
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }, [url]); // Runs whenever URL changes

  // Automatically fetch data when the component mounts or URL changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Return data, loading state, error message, and function to refresh data
  return { data, loading, error, refresh: fetchData };
};

export default useFetch;
