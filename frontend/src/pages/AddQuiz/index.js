import { Footer } from "../../components/Footer";
import { LoggedNavbar } from "../../components/LoggedNavbar";
import { useState } from "react";
import Axios from "axios";

export function AddQuiz() {
  const [quizContent, setQuizContent] = useState({
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState(false);

  const handleCreateQuiz = async () => {
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
          return response.data.quiz;
        }
        return null;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addQuiz = async (e) => {
    e.preventDefault();
    let saveDataForm;
    try {
      saveDataForm = await handleCreateQuiz();
    } catch (err) {
      setLoading(false);
      if (
        err.response.status === 400 &&
        err.response.statusText === "Bad Request"
      ) {
        setStatus({
          type: "error",
          message: "Houve um erro ao criar o quiz!",
        });
      }
    }
    setStatus({
      type: "success",
      message: "Quiz cadastrado com sucesso!",
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
            <form onSubmit={addQuiz}>
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
          </div>
        </div>
      </div>

      <div className="left-0 bottom-0 w-full py-5 bg-gray-50">
        <Footer />
      </div>
    </>
  );
}
