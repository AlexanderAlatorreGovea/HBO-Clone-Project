import { apiCall } from "../../utilities";

const CastInfo = (props) => {
  const api_key = process.env.NEXT_PUBLIC_KEY;
  const { 
    data: { cast, crew },
    loadingData,
  } = apiCall(
    `https://api.themoviedb.org/3/${
      props.mediaType === "movie" ? "movie" : "tv"
    }/${props.mediaId}/credits?api_key=${api_key}&language=en-US`,
    "CastInfo component",
    props.mediaId
  );

  const showCast = !loadingData ? (
    cast.map((person, idx) => (
      <ul key={idx} className="cast-info__crew">
        <li>{person.character}</li>
        <li>{person.name}</li>
      </ul>
    ))
  ) : (
    <div>Loading Cast...</div>
  );

  const showCrew = !loadingData ? (
    crew.map((person, idx) => (
      <ul key={idx} className="cast-info__crew">
        <li>{person.job}</li>
        <li>{person.name}</li>
      </ul>
    ))
  ) : (
    <div>Loading Crew...</div>
  );

  return (
    <div className="cast-info">
      <div className="cast-info__group-title">Cast</div>
      <div className="cast-info__list">{showCast}</div>
      {props.mediaType === "movie" ? (
        <>
          <div className="cast-info__group-title">Crew</div>
          <div className="cast-info__list">{showCrew}</div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default CastInfo;
