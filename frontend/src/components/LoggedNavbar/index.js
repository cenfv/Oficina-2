import { Link } from "react-router-dom";

export function LoggedNavbar() {
  return (
    <div className="border-b-2 bg-white  border-gray-100 shadow-sm">
      <div className="py-9 items-center justify-center max-w-6xl mx-auto ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              to="/"
              className="font-medium text-gray-500 hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
              to="/addcontent"
              className="font-medium text-gray-500 hover:text-indigo-600"
            >
              Adicionar Questões
            </Link>
          </div>

          <div className="flex space-x-10 items-center">
            <span className="text-base font-medium text-gray-500">
              Seja bem-vindo, Usuario
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
