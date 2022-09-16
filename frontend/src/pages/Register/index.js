import { Link } from "react-router-dom";

export function Register() {
  return (
    <div>
      <div className="flex max-w-6xl m-auto justify-center -mt-10">
        <div className="flex min-h-screen items-center">
          <div className="flex flex-col p-6 rounded-lg shadow-lg bg-white max-w-sm justify-center">
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Criar uma nova conta
            </h2>

            <form>
              <div className="flex mt-4">
                <input
                  type="text"
                  className="mr-1 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Primeiro nome"
                />
                <input
                  type="text"
                  className="appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Último nome"
                />
              </div>

              <input
                type="email"
                className="mt-3 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />

              <input
                type="password"
                className="mt-3 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
              />

              <input
                type="password"
                className="mt-3 mb-3 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar senha"
              />

              <label className="font-medium text-black-500 mt-3">Gênero</label>
              <div className="flex text-sm mt-2 space-x-2">
                <div>
                  <input
                    type="radio"
                    value="Masculino"
                  />
                  <label className="ml-1 text-base">
                    Masculino
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    value="Feminino"
                  />
                  <label className="ml-1 text-base">
                    Feminino
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    value="Outro"
                  />
                  <label className="ml-1 text-base">
                    Outro
                  </label>
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
          </div>
        </div>
      </div>
    </div>
  );
}