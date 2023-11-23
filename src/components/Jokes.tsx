import React, { useEffect, useState } from "react";
import "./Jokes.css";

interface JokesData {
  joke: string;
}

const Jokes: React.FC = () => {
  const [jokes, setJokes] = useState<JokesData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJokes = async () => {
    const apiKey = "mFI+ML1Z8tTv6vv6lk0ykA==JaTMN75bsOL03keX";

    try {
      setLoading(true);

      const response = await fetch(
        `https://api.api-ninjas.com/v1/jokes?limit=3`,
        {
          headers: {
            "X-Api-Key": apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error status ${response.status}`);
      }

      const data = await response.json();

      setJokes(data);
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  // console.log(jokes);

  return (
    <div className="jokes-container">
      <h1>Silly yet funny Jokes</h1>
      {jokes ? (
        <ul>
          {jokes.map((joke, index) => (
            <li key={index}>{joke.joke}</li>
          ))}
        </ul>
      ) : (
        <p>Loading jokes...</p>
      )}

      <button onClick={() => fetchJokes()} disabled={loading}>
        Generate new quote
      </button>
    </div>
  );
};

export default Jokes;
