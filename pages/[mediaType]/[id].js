import Head from "next/head";
import { useEffect, useState } from "react";
import AuthCheck from "../../components/AuthCheck";
import MainLayout from "../../components/Layouts/MainLayout";
import CastInfo from "../../components/UI/CastInfo/CastInfo";
import FeaturedMedia from "../../components/UI/FeaturedMedia/FeaturedMedia";
import MediaRow from "../../components/UI/MediaRow/MediaRow";
import { useRouter } from "next/router";
import axios from "axios";
import LazyLoad from "react-lazyload";
import Placeholders from "../../components/UI/Placeholders/Placeholders";

export default function SingleMediaPage(props) {
  const router = useRouter();
  const [mediaData, setMediaData] = useState(false);

  return AuthCheck(
    <MainLayout>
      <FeaturedMedia
        title={
          props.query.mediaType === "movie"
            ? props.mediaData.title
            : props.mediaData.name
        }
        mediaUrl={`https://image.tmdb.org/t/p/w1280${props.mediaData.backdrop_path}`}
        location="In theaters and on HBO MAX. Streaming throughout May 23."
        linkUrl={`/movie/${props.query.id}`}
        type="single"
        mediaId={props.query.id}
        mediaType={props.query.mediaType}
      />
      <LazyLoad
        offset={-400}
        placeholder={<Placeholders title="Movies" type="large-v" />}
      >
        <MediaRow
          title="Similar To This"
          type="small-v"
          mediaType={props.query.mediaType}
          changingData={props.query.id}
          endpoint={`${props.query.mediaType === "movie" ? "movie" : "tv"}/${
            props.query.id
          }/similar?`}
        />
      </LazyLoad>
      <CastInfo mediaId={props.query.id} mediaType={props.query.mediaType} />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  let mediaData;
  const api_key = process.env.NEXT_PUBLIC_KEY;

  try {
    mediaData = await axios.get(
      `https://api.themoviedb.org/3/${context.query.mediaType}/${context.query.id}?api_key=${api_key}&language=en-US`
    );
  } catch (error) {
    console.error("error:", error);
  }
  return {
    props: {
      mediaData: mediaData.data ? mediaData.data : [],
      query: context.query,
    }, // will be passed to the page component as props
  };
}
