import React, { useEffect, useState } from "react";

const Images: React.FC = () => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories] = useState<string[]>([
    "nature",
    "city",
    "technology",
    "food",
    "still_life",
    "abstract",
    "wildlife",
  ]);

  const fetchImage = async () => {
    const apiKey = "mFI+ML1Z8tTv6vv6lk0ykA==JaTMN75bsOL03keX";

    const headers = {
      "X-Api-Key": apiKey,
      Accept: "image/jpg",
    };

    try {
      setLoading(true);

      // Choose a random category
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const response = await fetch(
        `https://api.api-ninjas.com/v1/randomimage?category=${randomCategory}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`Error status ${response.status}`);
      }

      const data = await response.blob();
      setImageBlob(data);
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch an image on component mount
    fetchImage();
  }, []); // Empty dependency array to run only on mount

  return (
    <div className="images-container">
      <h1>Random image generator</h1>
      <hr />
      {loading ? (
        <p>Loading image...</p>
      ) : imageBlob ? (
        <img
          src={URL.createObjectURL(imageBlob)}
          alt="Random Nature"
          style={{ maxWidth: "100%" }}
        />
      ) : (
        <p>No image available.</p>
      )}

      <div className="category-buttons">
        <button onClick={fetchImage} disabled={loading}>
          Random new image
        </button>
      </div>
    </div>
  );
};

export default Images;
