import { useRef, useEffect } from "react";
import * as d3 from "d3";

const BirthChart = ({ chartData }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!chartData) return;

    const svg = d3.select(chartRef.current)
      .attr("viewBox", "0 0 400 400")
      .attr("preserveAspectRatio", "xMidYMid meet");

    const planets = Object.entries(chartData);
    const radius = 150;
    const centerX = 200;
    const centerY = 200;

    svg
      .selectAll("circle")
      .data(planets)
      .enter()
      .append("circle")
      .attr("cx", (_, i) => centerX + radius * Math.cos((2 * Math.PI * i) / planets.length))
      .attr("cy", (_, i) => centerY + radius * Math.sin((2 * Math.PI * i) / planets.length))
      .attr("r", 10)
      .attr("fill", "orange");

    svg
      .selectAll("text")
      .data(planets)
      .enter()
      .append("text")
      .attr("x", (_, i) => centerX + radius * Math.cos((2 * Math.PI * i) / planets.length))
      .attr("y", (_, i) => centerY + radius * Math.sin((2 * Math.PI * i) / planets.length))
      .text(([planet]) => planet)
      .attr("text-anchor", "middle")
      .attr("fill", "white");
  }, [chartData]);

  return <svg ref={chartRef}></svg>;
};

export default BirthChart;