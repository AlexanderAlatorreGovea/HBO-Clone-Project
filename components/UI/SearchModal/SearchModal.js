import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useStateContext } from "../../HBOProvider";
import { InputGroup } from "@alexanderalatorregovea/new-collection.ui.input-group";

const SearchModal = () => {
  const globalState = useStateContext();
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [text, setText] = useState("");
  const router = useRouter();

  const API_KEY = process.env.NEXT_PUBLIC_KEY;

  useEffect(async () => {
    try {
      const popularMovies = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?primary_release_year=2021&api_key=${API_KEY}&language=en-US`
      );
      setPopularMovies(popularMovies.data.results.filter((item, i) => i < 14));

      setShowResults(false);
    } catch (error) {
      console.error("error:", error);
    }
  }, []);

  useEffect(() => {
    if (globalState.searchOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [globalState.searchOpen]);

  const handleInput = async (event) => {
    const { value } = event.target;
    try {
      setText(value);
      const searchData = await axios.get(
        `https://api.themoviedb.org/3/search/multi?query=${value}&api_key=${API_KEY}&language=en-US`
      );
      setSearchData(
        searchData.data.results.filter(
          (item) => item.media_type === "tv" || item.media_type === "movie"
        )
      );
      setShowResults(true);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const clickedThumbnail = (type, id, media_type) => {
    if (type === "popular") {
      router.push(`/movie/${id}`);
      globalState.searchOpenAction(!globalState.searchOpen);
    }
    if (type === "search") {
      router.push(`/${media_type}/${id}`);
      globalState.searchOpenAction(!globalState.searchOpen);
    }
  };

  const onCloseModal = () => {
    globalState.searchOpenAction(!globalState.searchOpen);
  };

  return (
    <div
      className={`search-modal ${
        globalState.searchOpen ? "search-modal--active" : ""
      }`}
    >
      <InputGroup
        onCloseModal={onCloseModal}
        handleInput={handleInput}
        text={text}
      />

      <h3 className="search-modal__title">
        {showResults && searchData.length >= 1
          ? `Search Result for ${text}`
          : "Popular Searches"}
      </h3>

      <div className="search-modal__thumbnails">
        {showResults && searchData.length >= 1 ? (
          <SearchResults
            searchData={searchData}
            clickedThumbnail={clickedThumbnail}
          />
        ) : (
          <PopularResults
            popularMovies={popularMovies}
            clickedThumbnail={clickedThumbnail}
          />
        )}
      </div>
    </div>
  );
};

const PopularResults = ({ popularMovies, clickedThumbnail }) =>
  popularMovies.map((item, index) => (
    <div
      key={index}
      className="search-modal__thumbnail"
      onClick={() => clickedThumbnail("popular", item.id)}
    >
      <img src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} />
      <div className="search-modal__top-layer">
        <i className="fas fa-play" />
      </div>
    </div>
  ));

const SearchResults = ({ searchData, clickedThumbnail }) =>
  searchData.map((item, index) => (
    <div
      key={index}
      className="search-modal__thumbnail"
      onClick={() => clickedThumbnail("popular", item.id, item.media_type)}
    >
      <img src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} />
      <div className="search-modal__top-layer">
        <i className="fas fa-play" />
      </div>
    </div>
  ));

export default SearchModal;
