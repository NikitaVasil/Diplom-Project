/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import registerUser from "../../service/registerUser";
import { NewUser } from "../../types/types";
import registrationSchema from "../../utils/yupSchemas/registrationSchema";

const RegisterUser: React.FC = () => {
  const navigate = useNavigate();

  const role = [{ rol: "user" }, { rol: "admin" }];
  const [status, setStatus] = useState(role[0].rol);

  const onChange = (e: any) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };

  const objUsers = (name: any, id: any) => {
    const users = sessionStorage.getItem("objUser");
    const objectUser = { id: id, name: name };
    let objUs: any;
    if (users != null) {
      objUs = JSON.parse(users);
    }
    objUs.push(objectUser);
    sessionStorage.removeItem("objUser");
    sessionStorage.setItem("objUser", JSON.stringify(objUs));
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          role: "",
        }}
        validationSchema={registrationSchema}
        onSubmit={async (values) => {
          const form: NewUser = {
            name: values.name,
            email: values.email,
            password: values.password,
            role: status,
          };
          console.log(form);
          const result = await registerUser(form);
          if (result.status === "success") {
            Swal.fire({
              icon: "success",
              title: "Пользователь успешно зарегистрировался",
              text: `${result.msg}`,
            });
            objUsers(values.name, result.id);
            navigate("/dashboard");
            return;
          }
          Swal.fire({
            icon: "error",
            title: "Пользователь не зарегистрирован",
            text: `${result.msg}`,
          });
        }}
      >
        <Form>
          <div className=" flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className=" form-outline form-white mb-4">
              <label
                htmlFor="name"
                className=" block text-sm/6 font-medium text-gray-900"
              >
                Фамилия и имя:
              </label>
              <div className=" mt-2">
                <Field
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  id="name"
                  name="name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className=" block text-sm/6 font-medium text-gray-900"
              >
                Почта:
              </label>

              <div className=" mt-2">
                <Field
                  className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  id="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className=" block text-sm/6 font-medium text-gray-900"
              >
                Пароль:
              </label>
              <div className=" mt-2">
                <Field
                  className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  id="password"
                  name="password"
                  type="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-400"
                />
              </div>
            </div>

            <div>
              <label className="  block text-sm/6 font-medium text-gray-900 mt-5">
                Роль пользователя
              </label>
              <div>
                <Field
                  as="select"
                  name="role"
                  className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
                  //" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
                  value={status}
                  onChange={onChange}
                >
                  {role.map((col: any, index: any) => (
                    <option
                      className="status-options"
                      key={index}
                      value={col.rol}
                    >
                      {col.rol}
                    </option>
                  ))}
                </Field>
              </div>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-9"
              type="submit"
            >
              Зарегистрировать
            </button>

            <p className="text-sm text-center mt-7">
              <a
                href="/"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Вернуться на главную страницу
              </a>
            </p>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default RegisterUser;
