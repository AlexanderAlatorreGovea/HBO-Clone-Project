import React, { useContext, useState, useEffect } from "react";
import ls from "local-storage";
export const StateContext = React.createContext();

export function useStateContext() {
  return useContext(StateContext);
}

const getMatchingWatchListId = (id, watchList) => {
  console.log(typeof id)
  console.log(watchList.mediaId)
  const w =  watchList.find((media) => media.mediaId === id);
  console.log(w)
};

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

  const addToList = (video) => {
    let myList;
    const { mediaId } = video;

    const hasMatchingMovieIdWatchList = getMatchingWatchListId(
      mediaId,
      watchList
    );

    const myWatchListExists = ls("myList") !== null;

    if (myWatchListExists && !hasMatchingMovieIdWatchList) {
      myList = ls.get("myList");
      myList = [...myList, video];
      ls.set("myList", myList);
      setWatchList(myList);
    }

    return ls.set("myList", [video]);
  };

  const removeFromList = (video) => {
    let myList = ls("myList");
    myList = myList.filter((item) => item.mediaId != video);
    ls.set("myList", myList);
    setWatchList(myList);
  };

  useEffect(() => {
    const data = localStorage.getItem("myList");

    if (data) {
      setWatchList(JSON.parse(data));
    }
  }, []);

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
