import { useState, useMemo } from "react";
import BirthForm from "./components/BirthForm";
import BirthChart from "./components/BirthChart";
import Interpretations from "./components/Interpretations";
import Loader from "./components/Loader";
import { fetchBirthChart } from "./services/astrologyAPI";

const App = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cachedData = useMemo(() => chartData, [chartData]);

  const handleSubmit = async (birthDetails) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchBirthChart(birthDetails);
      setChartData(response.data);
    } catch (error) {
      setError("Failed to generate chart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Zodiac Birth Chart</h1>
      <BirthForm onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      {cachedData && <BirthChart chartData={cachedData} />}
      {cachedData && <Interpretations chartData={cachedData} />}
    </div>
  );
};

export default App;