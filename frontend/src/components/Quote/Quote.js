import React, { useState, useEffect } from "react";

const QuoteComponent = () => {
  const [quote, setQuote] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/quote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch quote");
        }

        const data = await response.json();
        setQuote(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {quote ? (
        <p>{quote}</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Loading motivational quote...</p>
      )}
    </div>
  );
};

export default QuoteComponent;
