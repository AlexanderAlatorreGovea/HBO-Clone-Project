import React, { useContext, useState } from "react";
import ls from "local-storage";

const getMatchingWatchListId = (id, watchList) => {
  if (!watchList) return;

  return watchList.find((media) => +media.mediaId === +id);
};

export const StateContext = React.createContext();

export function HBOProvider({ children }) {
  const [user, setUser] = useState("");
  const defaultUserImg = "https://uifaces.co/our-content/donated/vIqzOHXj.jpg";
  const createUserAction = (e) => {
    setUser(e.target.value);
  };
  const [sideNavOpen, setSideNavOpenAction] = useState(false);
  const [accountModalOpen, setAccountModalOpenAction] = useState(false);
  const [searchOpen, searchOpenAction] = useState(false);
  const [watchList, setWatchList] = useState(ls.get("myList"));

  const addFirstVideoToWatchList = (video) => {
    const firstItemInArray = [];
    const withAddedVideo = [...firstItemInArray, video];

    ls.set("myList", withAddedVideo);
    setWatchList(withAddedVideo);
  };

  const addNewVideoToWatchList = (video) => {
    const withAddedVideo = [...watchList, video];

    ls.set("myList", withAddedVideo);
    setWatchList(withAddedVideo);
  };

  const addToList = (video) => {
    const { mediaId } = video;

    const hasMatchingMovieIdWatchList = getMatchingWatchListId(
      mediaId,
      watchList
    );

    if (watchList.length) {
      return watchList.map((item) =>
        +item?.mediaId !== +mediaId && !hasMatchingMovieIdWatchList
          ? addNewVideoToWatchList(video, mediaId)
          : watchList
      );
    }

    return addFirstVideoToWatchList(video);
  };

  const removeFromList = (video) => {
    const myList = ls("myList").filter((item) => +item.mediaId !== +video);

    ls.set("myList", myList);
    setWatchList(myList);
  };

  const thumbTypes = ["large-v", "small-v", "large-v", "small-h"];

  return (
    <StateContext.Provider
      value={{
        user,
        createUserAction,
        defaultUserImg,
        sideNavOpen,
        setSideNavOpenAction,
        accountModalOpen,
        setAccountModalOpenAction,
        searchOpen,
        searchOpenAction,
        thumbTypes,
        watchList,
        setWatchList,
        removeFromList,
        addToList,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}
