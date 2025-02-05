/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import getEmployees from "../../service/getEmployee";


const useEmployees = (token: string) => {
  const [allEmployees, setAllEmployees] = useState<any[]>([]);

  useEffect(() => {
    if (token) {
      getEmployees(token)
        .then((employees) => {
          setAllEmployees(employees);
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    } 
  }, [token]);

  const obj = {
    allEmployees,
    setAllEmployees,
  };
  
  return obj;
};

export default useEmployees;

