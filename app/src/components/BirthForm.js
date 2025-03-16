import { useState, useEffect } from "react";

const BirthForm = ({ onSubmit }) => {
  const [birthDetails, setBirthDetails] = useState({
    date: "",
    time: "",
    location: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("location"),
        { types: ["(regions)"] }
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setBirthDetails((prevDetails) => ({
          ...prevDetails,
          location: place.formatted_address,
        }));
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const validate = () => {
    const { date, time, location } = birthDetails;
    const errors = {};
    if (!date) errors.date = "Date is required.";
    if (!time) errors.time = "Time is required.";
    if (!location) errors.location = "Location is required.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      onSubmit(birthDetails);
    };
  };

  return (
    <form onSubmit={handleSubmit} className="birth-form">
      <div>
        <label>Date of Birth</label>
        <input
          type="date"
          value={birthDetails.date}
          onChange={(e) =>
            setBirthDetails({ ...birthDetails, date: e.target.value })
          }
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </div>
      <div>
        <label>Time of Birth</label>
        <input
          type="time"
          value={birthDetails.time}
          onChange={(e) =>
            setBirthDetails({ ...birthDetails, time: e.target.value })
          }
        />
        {errors.time && <span className="error">{errors.time}</span>}
      </div>
      <div>
        <label>Location</label>
        <input
          id="location"
          type="text"
          value={birthDetails.location}
          onChange={(e) =>
            setBirthDetails({ ...birthDetails, location: e.target.value })
          }
        />
        {errors.location && <span className="error">{errors.location}</span>}
      </div>
      <button type="submit">Generate Chart</button>
    </form>
  );
};

export default BirthForm;