/* eslint-disable @typescript-eslint/no-explicit-any */
import Hemlet from "react-helmet";
import HeaderGetEmployee from "../../components/ui/HeaderGetEmployee";
import { getEnviroments } from "../../conf/enviroments";
import useEmployees from "../../Hooks/useEmployees";

const GetEmployeePage: React.FC = () => {
  const token_test = sessionStorage.getItem(getEnviroments().PW_SESSION);
  let token = "";
  if (!token_test) {
    console.error("Ошибка токена");
  } else {
    token = token_test;
  }

  let iter = 0;

  const allEmployees = useEmployees(token).allEmployees; //custom-hook

  return (
    <div className=" overflow-hidden">
      <Hemlet>
        <title>Список сотрудников</title>
      </Hemlet>
      <div className=" overflow-hidden">
        <HeaderGetEmployee />

        <div className="relative overflow-x-auto mt-[135px]">
          <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ФИО сотрудника
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Роль
                </th>
                <th scope="col" className="px-6 py-3">
                  Действующий сотрудник
                </th>
              </tr>
            </thead>
            <tbody>
              {allEmployees.length != 0 ? (
                allEmployees.map((employee: any) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                      key={iter++}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {employee.name}
                      </th>
                      <td className="px-6 py-4">{employee.email}</td>
                      <td className="px-6 py-4">{employee.role}</td>
                      <td className="px-6 py-4">
                        {employee.active ? "В штате" : "Уволен"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="text-center">
                  <th className="text-6xl font-bold text-red-500">
                    404
                    <p className="text-2xl mt-4 text-gray-700">
                      Данные не загрузились
                    </p>
                    <a
                      href="/"
                      className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                    >
                      Вернуться назад
                    </a>
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetEmployeePage;

{
  /* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
                <td className="px-6 py-4">$1999</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">$99</td>
              </tr> */
}
