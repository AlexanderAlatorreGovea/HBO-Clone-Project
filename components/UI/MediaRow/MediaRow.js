import { useState, useEffect } from "react";
import axios from "axios";
import { shuffleArray } from "../../../components/utilities";
import Link from "next/link";

const Skeleton = () => {
  return (
    <div className="media-row__thumbnail-skeleton">
      <div className="media-row__thumbnail-skeleton-img"></div>
    </div>
  );
};

const MediaRow = (props) => {
  const [loadingData, setLoadingData] = useState(true);
  const [movies, setMoviesData] = useState([]);
  const api_key = process.env.NEXT_PUBLIC_KEY;
  const { changingData } = props;
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${props.endpoint}&api_key=${api_key}&language=en-US`
      )
      .then(function (response) {
        setMoviesData(shuffleArray(response.data.results));
        setLoadingData(false);
      })
      .catch(function (error) {
        console.log(`error res from ${props.title}`, error);
      });
  }, [changingData]);

  const loopComp = (comp, digit) => {
    let thumbnails = [
      <Skeleton key={"a"} />,
      <Skeleton key={"b"} />,
      <Skeleton key={"c"} />,
      <Skeleton key={"d"} />,
      <Skeleton key={"e"} />,
      <Skeleton key={"f"} />,
      <Skeleton key={"g"} />,
    ];
    // for (let index = 1; index <= digit; index++) {
    //   thumbnails.push(comp);
    // }

    return thumbnails;
  };

  const showThumbnails = (type) => {
    return loadingData
      ? loopComp(<Skeleton />, 10)
      : movies.map((movie) => (
          <Thumbnail
            key={movie.id}
            mediaType={props.mediaType}
            type={props.type}
            movieData={movie}
            type={type}
          />
        ));
  };

  return (
    <div className={`media-row ${props.type}`}>
      <h3 className="media-row__title">{props.title}</h3>
      <div className="media-row__thumbnails">{showThumbnails(props.type)}</div>
    </div>
  );
};

const Thumbnail = (props) => {
  const {
    movieData: { poster_path },
  } = props;

  const thumbSize = (type) => {
    if (props.type === "large-v") {
      return "400";
    }
    if (type === "small-v") {
      return "185";
    }
    if (type === "large-h") {
      return "500";
    }
    if (type === "small-h") {
      return "342";
    }
  };
  return (
    <Link
      style={{ display: poster_path ? "" : "none" }}
      href={`/${props.mediaType === "movie" ? "movie" : "tv"}/${
        props.movieData.id
      }`}
    >
      <a>
        <div
          className="media-row__thumbnail"
          style={{ display: poster_path ? "" : "none" }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w${thumbSize(
              props.type
            )}${poster_path}`}
          />
          <div className="media-row__top-layer">
            <i className="fas fa-play" />
          </div>
        </div>
      </a>
    </Link>
  );
};

MediaRow.defaultProps = {
  mediaType: "movie",
};

export default MediaRow;
