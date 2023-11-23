import React, { useEffect, useState } from "react";
import "./Quotes.css";

interface QuoteData {
  author: string;
  category: string;
  quote: string;
}

const Quotes: React.FC = () => {
  const [quotes, setQuotes] = useState<QuoteData[] | null>();

  const fetchQuotes = async () => {
    const apiKey = "mFI+ML1Z8tTv6vv6lk0ykA==JaTMN75bsOL03keX";

    try {
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
    }
  };

  console.log(quotes);

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="quotes-container">
      <h1>{quotes ? quotes[0].quote : "Loading quotes..."}</h1>
      <p>{quotes ? "Category: " + quotes[0].category : "Unknown category"}</p>
      <h4>{quotes ? "Author: " + quotes[0].author : "Unknown author"}</h4>

      <button onClick={() => fetchQuotes()}>Generate new quote</button>
    </div>
  );
};

export default Quotes;
