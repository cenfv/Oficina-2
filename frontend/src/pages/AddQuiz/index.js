import { Footer } from "../../components/Footer";
import { LoggedNavbar } from "../../components/LoggedNavbar";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

export function AddQuiz() {
  const [quizContent, setQuizContent] = useState({
    description: "",
  });

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const [status, setStatus] = useState(false);

  const handleCreateQuiz = async (e) => {
    e.preventDefault()
    setLoading(true);
    return Axios.post(
      `${process.env.REACT_APP_API_URL}/quiz`,
      {
        description: quizContent.description,
      },
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      }
    )
      .then((response) => {
        setLoading(false);
        if (response.status === 201 && response.statusText === "Created") {
          setStatus({
            type: "success",
            message: "Quiz cadastrado com sucesso!",
          });
          setTimeout(() => {
            navigate("/addquestion");
          }, 1000);
          return response.data.quiz;
        }
        return null;
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setStatus({
          type: "error",
          message: "Houve um erro ao criar o quiz!",
        });
      });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <LoggedNavbar />
        <div className=" bg-white max-w-6xl mx-auto rounded-lg p-10 mt-5 shadow-md">
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-3xl">
            Adicionar prova
          </h1>
          <p className="mt-2 text-lg font-normal text-gray-900 sm:text-lg">
            Crie novas provas.
          </p>

          <div>
            <h3 className="mt-5 text-2xl font-bold text-gray-900">
              Criar nova prova:
            </h3>
            <form onSubmit={handleCreateQuiz}>
              <div className="grid grid-cols-1">
                <input
                  className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                  placeholder="Nome da prova"
                  onChange={(e) =>
                    setQuizContent({ description: e.target.value })
                  }
                ></input>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex mt-10 justify-center w-36 bg-indigo-500 text-white font-medium rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-600"
                >
                  Salvar
                </button>
              </div>
            </form>
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

      <div className="left-0 bottom-0 w-full py-5 bg-gray-50">
        <Footer />
      </div>
    </>
  );
}
