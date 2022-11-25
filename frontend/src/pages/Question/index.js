import { useState, useEffect } from "react";
import { LoggedNavbar } from "../../components/LoggedNavbar";
import { Footer } from "../../components/Footer";
import { useParams } from "react-router-dom";
import Axios from "axios";

export function Question() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({});
  const [correctAnswer, setCorrectAnswer] = useState({
    id: null,
    correct: false,
  });

  const handleLoadQuestion = async () => {
    setLoading(true);
    Axios.get(
      `${process.env.REACT_APP_API_URL}/question-alternative/question/${id}`,
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      }
    )
      .then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setQuestion(response.data.questionAlternative[0]);
          return true;
        }
      })
      .catch((err) => {
        setLoading(false);
        return false;
      });
  };

  const handleSubmitAnswer = async (selectedAlternative, index) => {
    setLoading(true);

    return Axios.post(
      `${process.env.REACT_APP_API_URL}/submission/${question._id}`,
      {
        choice: selectedAlternative._id,
      },
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      }
    ).then((response) => {
      setLoading(false);
      if (response.status === 201 && response.statusText === "Created") {
        if (response.data.submission.correctChoice === true) {
          setCorrectAnswer({ id: index, correct: true });
        } else {
          setCorrectAnswer({ id: index, correct: false });
        }
        return true;
      }
    });
  };
  const handleDisplayAnswer = () => {
    if (correctAnswer.correct === true && correctAnswer.id !== null) {
      return (
        <div className="flex flex-row font-semibold">
          <p className="text-indigo-500 font-bold">Parabéns</p>
          <span>, você acertou a questão!</span>
        </div>
      );
    } else if (correctAnswer.correct === false && correctAnswer.id !== null) {
      return (
        <div className="flex flex-row font-semibold">
          <p className="text-red-500 font-bold">Que pena!</p>
          <span>&nbsp; Você errou, tente novamente!</span>
        </div>
      );
    }
  };

  useEffect(() => {
    handleLoadQuestion();
  }, []);
  return (
    <>
      <div className="min-h-screen">
        <LoggedNavbar />
        <div className="max-w-6xl mx-auto">
          <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
            {question.question?.title}
          </h1>
          <h5 className="mt-5 text-lg text-justify font-medium">
            Ano: {question.question?.editionYear} | Nível: {question.question?.difficulty}
          </h5>
          <p className="mt-5 text-lg text-justify">
            {question.question?.description}
          </p>
          <img className="mx-auto mt-5 max-h-72" alt="Imagem questão" />
          <div className="grid grid-cols-2 mt-5 gap-4">
            {question.alternative?.map((alternative, index) => {
              return (
                <button
                  className={`bg-white rounded-lg p-4 drop-shadow-lg mt-3 hover:bg-indigo-500 hover:text-white 
                  ${correctAnswer.id === index && correctAnswer.correct === true && "bg-indigo-600 text-white"}
                  ${correctAnswer.id === index && correctAnswer.correct === false && "bg-red-500 text-white" }`}
                  onClick={() => {
                    handleSubmitAnswer(alternative, index);
                  }}
                >
                  {alternative.description}
                </button>
              );
            })}
          </div>
          <div className="flex justify-center mt-16">
                {handleDisplayAnswer()}
              </div>
          <div className="grid grid-cols-2">
            <div className="flex justify-start mt-5 text-lg">
              <button>{"< "}Anterior</button>
            </div>
            <div className="flex justify-end mt-5 text-lg">
              <button>Próxima{" >"}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5 left-0 bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}
