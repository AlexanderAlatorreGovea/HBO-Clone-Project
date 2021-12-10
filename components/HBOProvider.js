import React, { useContext, useState, useEffect } from "react";
import ls from "local-storage";
export const StateContext = React.createContext();

export function useStateContext() {
  return useContext(StateContext);
}

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
    const id = video.id;
    let myList;
    if (ls("myList") !== null) {
      myList = ls.get("myList");
      myList = [...myList, video];
      ls.set("myList", myList);
      setWatchList(myList);
    } else {
      ls.set("myList", [video]);
    }
  };

  const removeFromList = (video) => {
    console.log(video);
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
