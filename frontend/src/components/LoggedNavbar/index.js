import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../../redux/userSlice";

export function LoggedNavbar() {

  const { name, isLogged } = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div className="border-b-2 bg-white  border-gray-100 shadow-sm">
      <div className="py-9 items-center justify-center max-w-6xl mx-auto ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              to="/addquestion"
              className="font-medium text-gray-500 hover:text-indigo-600"
            >
              Questões
            </Link>
            <Link
              to="/addquiz"
              className="font-medium text-gray-500 hover:text-indigo-600"
            >
              Provas
            </Link>
            <Link
              to="/edit"
              className="font-medium text-gray-500 hover:text-indigo-600"
            >
              Editar
            </Link>
          </div>

          <div className="flex space-x-10 items-center">
            <span className="text-base font-medium text-gray-500">
              Seja bem-vindo, {name}
            </span>
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("authorization");
                dispatch(logout());
              }}
            >
              <p className="text-base font-medium text-red-600">Sair</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}