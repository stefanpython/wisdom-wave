import React, { useEffect, useState } from "react";
import "./Quotes.css";

interface QuoteData {
  author: string;
  category: string;
  quote: string;
}

const Quotes: React.FC = () => {
  const [quotes, setQuotes] = useState<QuoteData[] | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchQuotes = async () => {
    const apiKey = import.meta.env.VITE_APP_KEY;

    try {
      setLoading(true);

      const response = await fetch(`https://api.api-ninjas.com/v1/quotes`, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }

      const data = await response.json();

      setQuotes(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // console.log(quotes);

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="quotes-container">
      <h1>Famous quotes</h1>

      <hr />

      {quotes ? (
        <>
          <h1>{quotes[0].quote}</h1>
          <p>Category: {quotes[0].category}</p>
          <h4>Author: {quotes[0].author}</h4>
        </>
      ) : (
        <h1>Loading quotes...</h1>
      )}
      <button onClick={() => fetchQuotes()} disabled={loading}>
        Generate new quote
      </button>
    </div>
  );
};

export default Quotes;
