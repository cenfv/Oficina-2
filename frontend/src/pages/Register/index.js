import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Axios from "axios";
import { useState } from "react";

export function Register() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    return Axios.post(`${process.env.REACT_APP_API_URL}/user`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      gender: user.gender,
    })
      .then((response) => {
        setLoading(false);
        if (response.status === 201 && response.statusText === "Created") {
          setStatus({
            type: "success",
            message: "Usuário cadastrado com sucesso!",
          });
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      })
      .catch((err) => {
        setLoading(false);
        setStatus({
          type: "error",
          message: "Erro ao cadastrar usuário!",
        });
      });
  }

  return (
    <div>
      <div className="flex max-w-6xl m-auto justify-center -mt-10">
        <div className="flex min-h-screen items-center">
          <div className="flex flex-col p-6 rounded-lg shadow-lg bg-white max-w-sm justify-center">
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Criar uma nova conta
            </h2>

            <form onSubmit={handleRegister}>
              <div className="flex mt-4">
                <input
                  type="text"
                  className="mr-1 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Primeiro nome"
                  onChange={(event) =>
                    setUser({ ...user, firstName: event.target.value })
                  }
                />
                <input
                  type="text"
                  className="appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Último nome"
                  onChange={(event) =>
                    setUser({ ...user, lastName: event.target.value })
                  }
                />
              </div>

              <input
                type="email"
                className="mt-3 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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

              <input
                type="password"
                className="mt-3 mb-3 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar senha"
                onChange={(event) =>
                  setUser({ ...user, confirmPassword: event.target.value })
                }
              />

              <label className="font-medium text-black-500 mt-3">Gênero</label>
              <div className="flex text-sm mt-2 space-x-2">
                <div>
                  <input
                    type="radio"
                    value="Masculino"
                    onChange={() => setUser({ ...user, gender: "masculino" })}
                    checked={user.gender === "masculino"}
                  />
                  <label className="ml-1 text-base">Masculino</label>
                </div>

                <div>
                  <input
                    type="radio"
                    value="Feminino"
                    onChange={() => setUser({ ...user, gender: "feminino" })}
                    checked={user.gender === "feminino"}
                  />
                  <label className="ml-1 text-base">Feminino</label>
                </div>

                <div>
                  <input
                    type="radio"
                    value="Outro"
                    checked={user.gender === "outro"}
                    onChange={() => setUser({ ...user, gender: "outro" })}
                  />
                  <label className="ml-1 text-base">Outro</label>
                </div>
              </div>

              <button
                type="submit"
                className="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cadastrar
              </button>
            </form>

            <div className="flex text-sm mt-2">
              <span className="font-medium text-gray-500">
                Já possui uma conta?
              </span>
              <Link
                to="/login"
                className="ml-1 font-bold text-indigo-600 hover:underline"
              >
                Login
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
    </div>
  );
}
