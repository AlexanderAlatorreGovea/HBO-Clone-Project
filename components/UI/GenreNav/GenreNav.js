import "./GenreNav";

import Link from "next/link";
import { useState } from "react";

const GenreNav = (props) => {
  const [activeNav, setActiveNav] = useState(false);
  setTimeout(() => setActiveNav(true), 100);

  return (
    <ul className={`genre-nav ${activeNav ? "genre-nav--active" : ""}`}>
      <GenreList genresData={props.genresData} mediaType={props.mediaType} />
    </ul>
  );
};

const GenreList = ({ genresData, mediaType }) => {
  return genresData.map((item) => {
    return (
      <li key={item.id}>
        <Link href={`/${mediaType}/genres/${item.id}`}>
          <a>{item.name}</a>
        </Link>
      </li>
    );
  });
};

export default GenreNav;
