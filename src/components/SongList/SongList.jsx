import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";

const SongList = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [songs, setSongs] = useState(undefined);
  const [error, setError] = useState(undefined);

  const fetchSongs = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/techniadrian/c39f844edbacee0439bfeb107227325b/raw/81eec7847b1b3dfa1c7031586405c93e9a9c1a2d/songs.json"
      );
      const data = await response.json();
      setSongs(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="song-list">
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          {songs &&
            songs.map((song) => (
              <ul key={song.id}>
                <li>
                  {song.title} by {song.artists.join(", ")}
                </li>
              </ul>
            ))}
          {error && <span className="error">{error.message}</span>}
        </>
      )}
    </div>
  );
};

export default SongList;
