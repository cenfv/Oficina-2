import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeUser } from "../../redux/userSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    return Axios.post(`${process.env.REACT_APP_API_URL}/auth`, {
      email: user.email,
      password: user.password,
    }).then((response) => {
      setLoading(false);
      if (response.status === 200 && response.statusText === "OK") {
        dispatch(
          changeUser({
            name: response.data.user.firstName,
            id: response.data.user._id,
          })
        );
        localStorage.setItem("authorization", `Bearer ${response.data.token}`);
        setStatus({
          type: "success",
          message: "Usuário logado com sucesso!",
        });
        setTimeout(() => {
          navigate("/addcontent");
        }, 1000);
      }
    })
    .catch((err) => {
      setLoading(false);
      setStatus({
        type: "error",
        message: "Erro ao logar usuário!",
      });
    });
  };

  return (
    <div className="flex max-w-6xl m-auto justify-center ">
      <div className="flex min-h-screen items-center ">
        <div className="flex flex-col p-6 rounded-lg shadow-lg bg-white max-w-sm justify-center -mt-10">
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Entrar com sua conta
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mt-4">
              <input
                type="email"
                className="appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                onChange={(event) =>
                  setUser({ ...user, email: event.target.value })
                }
              />
              <input
                type="password"
                className="mt-3 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                onChange={(event) =>
                  setUser({ ...user, password: event.target.value })
                }
              />
            </div>

            <div className="flex my-5 justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to=""
                  className="font-medium text-indigo-600 hover:underline"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
            </div>
            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Entrar
            </button>
          </form>
          <div className="flex text-sm mt-4">
            <span className="font-medium text-gray-500">
              Precisando de uma conta?
            </span>
            <Link
              to="/register"
              className="ml-1 font-bold text-indigo-600 hover:underline"
            >
              Registre-se
            </Link>
          </div>
          {status.type === "success" ? (
              <p className="text-center mt-4 text-green-500">
                {status.message}
              </p>
            ) : (
              ""
            )}
            {status.type === "error" ? (
              <p className="text-center mt-4 text-red-600">{status.message}</p>
            ) : (
              ""
            )}
            {loading && (
              <div className="flex mt-5 justify-center">
                <AiOutlineLoading3Quarters className="w-12 h-12 animate-spin fill-indigo-500" />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
