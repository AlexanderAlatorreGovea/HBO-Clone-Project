import { useStateContext } from "../../../components/HBOProvider";
import { useRouter } from "next/router";
import MainLayout from "../../../components/Layouts/MainLayout";
import FeaturedMedia from "../../../components/UI/FeaturedMedia/FeaturedMedia";
import MediaRow from "../../../components/UI/MediaRow/MediaRow";
import AuthCheck from "../../../components/AuthCheck";
import LazyLoad from "react-lazyload";
import Placeholders from "../../../components/UI/Placeholders/Placeholders";
import GenreNav from "../../../components/UI/GenreNav/GenreNav";
import axios from "axios";
import { shuffleArray } from "../../../components/utilities";

export default function MediaTypePage(props) {
  const globalState = useStateContext();
  const router = useRouter();

  const showRandomMedia = () => {
    let thumbtype;
    return props.genresData.map((item, index) => {
      thumbtype = shuffleArray(globalState.thumbTypes)[0];
      return (
        <div key={item.id}>
          <LazyLoad
            offset={-400}
            placeholder={
              <Placeholders title={item.name} type={thumbtype} key={item.id} />
            }
          >
            <MediaRow
              mediaType={props.query.mediaType}
              title={item.name}
              type={thumbtype}
              changingData={props.query.genre_id}
              endpoint={`discover/${props.query.mediaType}?with_genres=${
                props.query.genre_id
              }&sort_by=popularity.desc&primary_release_year=2021&page=${
                index + 1
              }`}
            />
          </LazyLoad>
        </div>
      );
    });
  };

  return AuthCheck(
    <MainLayout>
      <FeaturedMedia
        mediaUrl={`https://image.tmdb.org/t/p/w1280${props.featuredData.backdrop_path}`}
        title={
          props.query.mediaType === "movie"
            ? props.featuredData.title
            : props.featuredData.name
        }
        linkUrl={`/${props.query.mediaType}/${props.featuredData.id}`}
        type="single"
        mediaType={props.query.mediaType}
        mediaId={props.featuredData.id}
      />
      <GenreNav
        mediaType={props.query.mediaType}
        genresData={props.genresData}
      />
      {showRandomMedia()}
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  let genresData;
  let featuredData;
  const api_key = process.env.NEXT_PUBLIC_KEY;

  try {
    genresData = await axios.get(
      `https://api.themoviedb.org/3/genre/${context.query.mediaType}/list?api_key=${api_key}&language=en-US`
    );
    featuredData = await axios.get(
      `https://api.themoviedb.org/3/discover/${context.query.mediaType}?primary_release_year=2021&with_genres=${context.query.genre_id}&api_key=${api_key}&language=en-US`
    );
  } catch (error) {
    console.log("error:", error);
  }
  return {
    props: {
      genresData: genresData.data.genres,
      featuredData: shuffleArray(featuredData.data.results)[0],
      query: context.query,
    }, 
  };
}
