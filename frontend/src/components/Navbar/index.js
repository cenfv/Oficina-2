import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="border-b-2 border-gray-100 shadow-sm">
      <div className=" py-7 items-center justify-center max-w-6xl mx-auto ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              to="/"
              className="font-medium text-gray-500 hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
              to=""
              className="font-medium text-gray-500 hover:text-indigo-600"
            >
              Quem somos
            </Link>
            <Link
              to=""
              className="font-medium text-gray-500 hover:text-indigo-600"
            >
              Contato
            </Link>
            <Link
              to=""
              className="font-medium text-gray-500 hover:text-indigo-600"
            >
              Novidades
            </Link>
          </div>
          <div className="flex space-x-10">
            <button>
              <Link
                to="/login"
                className="text-base font-medium text-gray-500 hover:text-indigo-600"
              >
                Entrar
              </Link>
            </button>
            <button>
              <Link
                to="/register"
                className="w-full flex  px-4 py-2  rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Inscrever-se
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
