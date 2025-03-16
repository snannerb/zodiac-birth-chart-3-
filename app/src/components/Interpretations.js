const Interpretations = ({ chartData }) => {
  const interpretations = {
    sun: "Your sun sign represents your core identity.",
    moon: "Your moon sign reflects your emotional self.",
    mercury: "Your mercury sign governs communication.",
    venus: "Your venus sign dictates love and relationships.",
  };

  return (
    <div className="interpretations">
      {Object.entries(chartData).map(([planet, sign]) => (
        <div key={planet}>
          <strong>{planet}</strong>: {interpretations[planet]}
        </div>
      ))}
    </div>
  );
};

export default Interpretations;