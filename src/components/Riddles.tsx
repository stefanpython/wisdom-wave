import React, { useEffect, useState } from "react";

type RiddleData = {
  answer: string;
  question: string;
  title: string;
};

const Riddles: React.FC = () => {
  const [riddles, setRiddles] = useState<RiddleData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [timer, setTimer] = useState<number | null>(5); // Initial timer value in seconds

  const fetchRiddles = async () => {
    const apiKey = "mFI+ML1Z8tTv6vv6lk0ykA==JaTMN75bsOL03keX";

    try {
      setLoading(true);

      const response = await fetch(`https://api.api-ninjas.com/v1/riddles`, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }

      const data = await response.json();
      setRiddles(data);
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      setLoading(false);
      setShowAnswer(false);

      // Disable the "Show Answer" button for the first 5 seconds after fetching a new riddle
      setDisabledButton(true);

      // Start the timer countdown
      setTimer(5);

      // Update the timer every second
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer !== null ? prevTimer - 1 : null));
      }, 1000);

      // Enable the "Show Answer" button after 5 seconds
      setTimeout(() => {
        setDisabledButton(false);
        clearInterval(intervalId); // Stop the timer when it reaches 0
        setTimer(null);
      }, 5000);
    }
  };

  useEffect(() => {
    fetchRiddles();
  }, []); // Fetch riddles only once when the component mounts

  const displayAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <>
      <h1>Riddles</h1>
      <hr />

      {riddles ? (
        <div className="riddle-container">
          <h1> - {riddles[0].title} -</h1>
          <h1>{riddles[0].question}</h1>
          {showAnswer && <h2>{"Answer: " + riddles[0].answer}</h2>}
        </div>
      ) : (
        <h1>Loading riddle...</h1>
      )}

      <button onClick={displayAnswer} disabled={disabledButton}>
        {disabledButton ? `Show answer in ${timer}s` : "Show answer"}
      </button>
      <br />
      <br />
      <button onClick={() => fetchRiddles()} disabled={loading}>
        Load new riddle
      </button>
    </>
  );
};

export default Riddles;
