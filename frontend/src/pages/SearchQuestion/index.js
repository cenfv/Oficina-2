import { useState, useEffect } from "react";
import { LoggedNavbar } from "../../components/LoggedNavbar";
import { Footer } from "../../components/Footer";
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";
import { BsShuffle } from "react-icons/bs";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export function SearchQuestion() {
  const [quiz, setQuiz] = useState([{}]);
  const [questions, setQuestions] = useState([{}]);
  const [selectedQuiz, setSelectedQuiz] = useState([{}]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(-1);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const difficultyOptions = [
    { value: 3, label: "Todas" },
    { value: 0, label: "Fácil" },
    { value: 1, label: "Média" },
    { value: 2, label: "Difícil" },
  ];
  const navigate = useNavigate();
  const handleLoadQuiz = async () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/quiz`, {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    }).then((response) => {
      if (response.status === 200 && response.statusText === "OK") {
        setQuiz(response.data.quizzes);
      }
    });
  };
  const handleLoadQuestions = async () => {
    Axios.get(
      `${process.env.REACT_APP_API_URL}/question`,
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      }
    ).then((response) => {
      if (response.status === 200 && response.statusText === "OK") {
        setQuestions(response.data.questions);
      }
    });
  }
  const handleSubmit = async () => {
    console.log(questions);
    navigate(`/question/${selectedQuestion._id}`, {
      state: { questions },
    });
  };
  useEffect(() => {
    handleLoadQuiz();
    handleLoadQuestions();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <LoggedNavbar />
        <div className=" bg-white max-w-6xl mx-auto rounded-lg p-10 my-5 shadow-md">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-3xl">
                Iniciar Prova
              </h1>
              <p className="mt-2 text-lg font-normal text-gray-900 sm:text-lg">
                Escolha a questão pela qual deseja começar:
              </p>
            </div>
            <div className="flex mt-8  justify-end">
              <button className="flex flex-row self-end  text-center p-3 bg-indigo-500 text-white font-medium rounded-lg  drop-shadow-lg hover:bg-indigo-600 mb-5">
                Iniciar de maneira aleatória
                <BsShuffle className="ml-3 w-5 h-5 self-center" />
              </button>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-5 ">
              <div className="z-50">
                <Autocomplete
                  className="bg-white rounded-lg drop-shadow-lg mt-3 outline-none focus:outline-none focus:ring w-auto"
                  disablePortal
                  options={quiz}
                  getOptionLabel={(option) => option.description}
                  onChange={(event, value) => {
                    return setSelectedQuiz(value);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Selecione uma prova" />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="z-40">
                <Autocomplete
                  className="bg-white rounded-lg drop-shadow-lg mt-3 outline-none focus:outline-none focus:ring w-auto"
                  disablePortal
                  options={difficultyOptions}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) => {
                    return setSelectedDifficulty(value.value);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Selecione a dificuldade" />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="z-30">
                <Autocomplete
                  filterOptions={(options) => {
                    if (selectedDifficulty === 3) {
                      return options.filter((option) => option.quiz._id === selectedQuiz._id);
                    }
                    return options.filter((option) => option.difficulty === selectedDifficulty && option.quiz._id === selectedQuiz._id);
                  }}
                  className="bg-white rounded-lg drop-shadow-lg mt-3 outline-none focus:outline-none focus:ring w-auto"
                  disablePortal
                  options={questions}
                  getOptionLabel={(option) => {
                    return option.title
                  }}
                  onChange={(event, value) => {
                    setSelectedQuestion(value);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Selecione a questão" />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex justify-end">
                <button
                  disabled={selectedQuestion._id === undefined}
                  onClick={()=>handleSubmit()}  
                  className="w-36 bg-indigo-500 text-white font-medium rounded-lg py-2 text-center drop-shadow-lg mt-10 hover:bg-indigo-600 mb-5 disabled:opacity-75">
                  Iniciar
                </button>
              </div>
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
