/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import getBoards from "../../service/getBoards";


const useBoards = (token: string) => {
  const [allBoards, setAllBoards] = useState<any[]>([]);

  useEffect(() => {
    if (token) {
      getBoards(token)
        .then((boards) => {
          setAllBoards(boards);
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    }
  }, [token]);

  const obj = {
    allBoards,
    setAllBoards,
  };
  
  return obj;
};

export default useBoards;

