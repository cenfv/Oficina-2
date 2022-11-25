import { Footer } from "../../components/Footer";
import { LoggedNavbar } from "../../components/LoggedNavbar";
import { Historic } from "../../components/Historic";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { selectUser } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import Axios from "axios";
import { useEffect, useState, Fragment } from "react";

export function Dashboard() {
  const { name, isLogged, id } = useSelector(selectUser);
  const [userStatistics, setUserStatistics] = useState({
    progressRate: 0,
    correctSubmissionRate: 0,
    solvedQuantity: 0,
    remainingQuestions: 0,
  });
  const [page, setPage] = useState(1);
  const [userSubmissionData, setUserSubmissionData] = useState([]);

  const handleLoadUserStatistics = async () => {
    Axios.get(
      `${process.env.REACT_APP_API_URL}/submission/user/${id}/statistics`,
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      }
    )
      .then((response) => {
        if (response.status === 200 && response.statusText === "OK") {
          setUserStatistics(response.data.statistics);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLoadUserSubmissionsByUserId = async () => {

    Axios.get(
      `${process.env.REACT_APP_API_URL}/submission/user/${id}?page=${page}&limit=10`,
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      }
    )
      .then((response) => {
        if (response.status === 200 && response.statusText === "OK") {
          setUserSubmissionData(response.data.submission);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleLoadUserStatistics();
    handleLoadUserSubmissionsByUserId();
  }, []);

  useEffect(() => {
    handleLoadUserSubmissionsByUserId();
  }, [page]);
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <LoggedNavbar />
        <div className="bg-white max-w-6xl mx-auto rounded-lg p-10 my-5 shadow-md">
          <div>
            <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-3xl">
              Dashboard
            </h1>
            <div className="grid grid-cols-2 mt-8 sm:grid-cols-4 bg-white">
              <div className=" m-3  rounded-md p-3  shadow-xl">
                <h2 className="mx-3 mb-3 text-2xl font-semibold text-black">
                  Progresso
                </h2>
                <hr className="border-cyan-300 border-t-2  " />
                <p className=" mx-3 mt-4 text-2xl font-semibold text-gray-600  ">
                  {userStatistics.progressRate?.toFixed(2)}%
                </p>
                <p className="mx-3 mb-3 text-base font-light  text-gray-500">
                  das questões foram concluídas
                </p>
              </div>
              <div className="m-3  rounded-md p-3  shadow-xl">
                <h2 className="mx-3 mb-3 text-2xl font-semibold text-black">
                  Taxa de acertos
                </h2>
                <hr className="border-red-300 border-t-2  " />
                <p className=" mx-3 mt-4 text-2xl font-semibold text-gray-600  ">
                  {userStatistics.correctSubmissionRate?.toFixed(2)}%
                </p>
                <p className="mx-3 mb-3 text-base font-light  text-gray-500">
                  das questões são respondidas com êxito
                </p>
              </div>
              <div className="m-3  rounded-md p-3  shadow-xl">
                <h2 className="mx-3 mb-3 text-2xl font-semibold text-black">
                  Resolvidos
                </h2>
                <hr className="border-blue-300 border-t-2  " />
                <p className=" mx-3 mt-4 text-2xl font-semibold text-gray-600  ">
                  {userStatistics?.solvedQuantity}
                </p>
                <p className="mx-3 mb-3 text-base font-light  text-gray-500">
                  questões foram concluídas
                </p>
              </div>
              <div className="m-3  rounded-md p-3  shadow-xl">
                <h2 className="mx-3 mb-3 text-2xl font-semibold text-black">
                  Restantes
                </h2>
                <hr className="border-orange-300 border-t-2  " />
                <p className=" mx-3 mt-4 text-2xl font-semibold text-gray-600  ">
                  {userStatistics?.remainingQuestions}
                </p>
                <p className="mx-3 mb-3 text-base font-light  text-gray-500">
                  questões restantes
                </p>
              </div>
            </div>

            <div>
              <h3 className="mt-3 text-3xl font-bold text-gray-900 sm:text-3xl">
                Histórico
              </h3>
              <div className="my-2 justify-center">
                <div className="flex flex-row z-50 justify-between">
                  <nav className=" shadow-md flex my-2 items-center ">
                    <ul className="flex h-full w-auto">
                      <li>
                        <button 
                         onClick={() => {
                          setPage(page - 1);
                        }}
                        className="h-full bg-white border border-gray-300 text-gray-500 disabled:opacity-50 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg  py-2 px-3 ">
                          Anterior
                        </button>
                      </li>
                      <li>
                      <input
                          value={page}
                          id="page"
                          name="page"
                          className="h-full w-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="01"
                        />
                      </li>
                      <li>
                        <button 
                         onClick={() => {
                          setPage(page + 1);
                        }}
                        className="h-full bg-white border border-gray-300 text-gray-500  disabled:opacity-50 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-r-lg  py-2 px-3 ">
                          Próxima
                        </button>
                      </li>
                    </ul>
                  </nav>
                  <div className="my-1 ml-4 w-2/5">
                    <Autocomplete
                      className="bg-white rounded-lg drop-shadow-lg mt-3 outline-none focus:outline-none focus:ring w-auto"
                      disablePortal
                      renderInput={(params) => (
                        <TextField {...params} label="Selecione uma prova" />
                      )}
                    />
                  </div>
                </div>
              </div>
              <Historic data={userSubmissionData}/>
            </div>
          </div>
        </div>
      </div>
      <div className="left-0 bottom-0 w-full py-5 bg-gray-50">
        <Footer />
      </div>
    </>
  );
}
