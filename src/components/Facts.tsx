import React, { useEffect, useState } from "react";

type Facts = {
  fact: string;
};

const Facts: React.FC = () => {
  const [facts, setFacts] = useState<Facts[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFacts = async () => {
    const apiKey = "mFI+ML1Z8tTv6vv6lk0ykA==JaTMN75bsOL03keX";

    try {
      setLoading(true);

      const response = await fetch(
        `https://api.api-ninjas.com/v1/facts?limit=1`,
        {
          headers: {
            "X-Api-Key": apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }

      const data = await response.json();
      setFacts(data);
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacts();
  }, []);

  return (
    <>
      <h1>Facts</h1>

      {facts ? <h1>{facts[0].fact}</h1> : <p>Loading facts...</p>}

      <button onClick={() => fetchFacts()} disabled={loading}>
        Load new fact
      </button>
    </>
  );
};

export default Facts;
