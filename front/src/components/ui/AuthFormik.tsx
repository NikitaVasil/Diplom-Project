import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { getEnviroments } from "../../conf/enviroments";
import loginUser from "../../service/login";
import loginSchema from "../../utils/yupSchemas/loginSchema";

const AuthFormik: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          const result = await loginUser(values);
          if (result.status === "success") {
            sessionStorage.setItem(
              getEnviroments().PW_SESSION,
              JSON.stringify(result.token)
            );
            sessionStorage.setItem("userId", result.userId);
            navigate("/dashboard");
          } else if (result.status === "ErrorPass") {
            Swal.fire({
              icon: "error",
              title: "Пароль введен не верный",
              text: "Ошибка авторизации",
            });
          } else if (result.status === "ErrorUser") {
            Swal.fire({
              icon: "error",
              title: "Пользователя не существует",
              text: "Ошибка авторизации",
            });
          }
        }}
      >
        <Form>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
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
                className="block text-sm/6 font-medium text-gray-900"
              >
                Пароль
              </label>

              <div className="mt-2">
                <Field
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-3"
              type="submit"
            >
              Войти
            </button>

            <div className="text-sm text-center mt-3">
              <a
                href="/forgot_password"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Забыли пароль?
              </a>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default AuthFormik;
