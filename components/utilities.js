import { useState, useEffect } from "react";
import axios from "axios";

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const apiCall = (url, err, changeData) => {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        setData(response.data);
        setLoadingData(false);
      })
      .catch(function (error) {
        console.error(`error res from ${err}`, error);
      });
  }, [changeData]);
  
  return {
    data,
    loadingData
  }
}
