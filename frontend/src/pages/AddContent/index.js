import { Footer } from "../../components/Footer";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { LoggedNavbar } from "../../components/LoggedNavbar";
import { useState } from "react";
import Axios from "axios";

export function AddContent() {
  const [questionContent, setQuestionContent] = useState({
    title: "",
    description: "",
    year: "",
  });
  const [alternatives, setAlternatives] = useState([
    {
      id: 0,
      description: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedAlternative, setSelectedAlternative] = useState({});
  const [status, setStatus] = useState(false);

  const handleCreateQuestion = async () => {
    setLoading(true);

    return Axios.post(
      `${process.env.REACT_APP_API_URL}/question`,
      {
        title: questionContent.title,
        description: questionContent.description,
        editionYear: questionContent.editionYear,
        quiz: questionContent._id,
        difficulty: questionContent.difficulty,
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
          return response.data.question;
        }
        return null;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateAlternative = async () => {
    setLoading(true);
    return Axios.post(
      `${process.env.REACT_APP_API_URL}/alternative`,
      {
        alternatives: alternatives,
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
          return response.data;
        }
        return null;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCreateQuestionAlternative = async (question, alternative) => {
    setLoading(true);
    const aux = alternative.alternative.map((alt) => {
      return alt._id;
    });

    return Axios.post(
      `${process.env.REACT_APP_API_URL}/question-alternative`,
      {
        question: question._id,
        alternative: aux,
        correctAlternative: alternative.alternative.at(selectedAlternative.id)
          ._id,
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
          return true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addQuestion = async (e) => {
    e.preventDefault();
    console.log(alternatives);
    let saveDataForm;
    try {
      const question = await handleCreateQuestion();
      const alternative = await handleCreateAlternative(question);
      saveDataForm = await handleCreateQuestionAlternative(
        question,
        alternative
      );
    } catch (err) {
      setLoading(false);
      if (
        err.response.status === 400 &&
        err.response.statusText === "Bad Request"
      ) {
        setStatus({
          type: "error",
          message: "Houve um erro ao criar a questão!",
        });
      }
    }
    setStatus({
      type: "success",
      message: "Questão cadastrada com sucesso!",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <LoggedNavbar />
        <div className=" bg-white max-w-6xl mx-auto rounded-lg p-10 mt-5 shadow-md">
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-3xl">
            Adicionar
          </h1>
          <p className="mt-2 text-lg font-normal text-gray-900 sm:text-lg">
            Crie questões para as suas provas.
          </p>

          <div>
            <h3 className="mt-5 text-2xl font-bold text-gray-900">
              Criar nova questão:
            </h3>
            <form onSubmit={addQuestion}>
              <div className="grid grid-cols-1">
                <input
                  className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                  placeholder="Titulo da questão"
                  name="title"
                  onChange={(e) => {
                    setQuestionContent({
                      ...questionContent,
                      title: e.target.value,
                    });
                  }}
                ></input>
                <textarea
                  placeholder="Enunciado da questão"
                  name="description"
                  className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                  onChange={(e) => {
                    setQuestionContent({
                      ...questionContent,
                      description: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Autocomplete
                  className="bg-white rounded-lg drop-shadow-lg mt-3 outline-none focus:outline-none focus:ring w-auto"
                  disablePortal
                  options={null}
                  disabled
                  renderInput={(params) => (
                    <TextField {...params} label="Prova" />
                  )}
                />

                <input
                  className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                  placeholder="Ano"
                  type="number"
                  min="1990"
                  max="2022"
                  name="editionYear"
                  onChange={(e) => {
                    setQuestionContent({
                      ...questionContent,
                      editionYear: e.target.value,
                    });
                  }}
                ></input>
              </div>
              <div className="grid grid-cols-2">
                <p className="mt-5">Alternativas:</p>
                <p className="mt-5">Imagem:</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  {alternatives.map((alternative) => {
                    return (
                      <input
                        className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                        placeholder={alternative.description}
                        onChange={(event) => {
                          setAlternatives(
                            alternatives.map((alternativeAux) => {
                              if (alternativeAux.id === alternative.id) {
                                return {
                                  ...alternative,
                                  description: event.target.value,
                                };
                              }
                              return alternativeAux;
                            })
                          );
                        }}
                      ></input>
                    );
                  })}

                  <div className="flex justify-end text-indigo-500 mt-2">
                    <div className="flex justify-end text-indigo-500 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAlternatives([
                            ...alternatives,
                            { id: alternatives.length, description: "" },
                          ]);
                        }}
                      >
                        Adicionar +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring">
                  <img className="max-h-72" alt="img" />
                  <input className="mt-5" type="file" accept="image/*"></input>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="mt-5">Selecione a alternativa correta:</p>
                  <Autocomplete
                    className="bg-white rounded-lg drop-shadow-lg mt-3 outline-none focus:outline-none focus:ring w-auto"
                    disablePortal
                    options={alternatives}
                    getOptionLabel={(option) => option.description}
                    onChange={(event, value) => {
                      setSelectedAlternative(value);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Alternativa correta" />
                    )}
                  />
                </div>
                <div>
                  <p className="mt-5">Selecione a dificuldade:</p>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <button
                      type="button"
                      className="bg-white rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white focus:ring"
                      onClick={() => {
                        setQuestionContent({
                          ...questionContent,
                          difficulty: 0,
                        });
                      }}
                    >
                      Fácil
                    </button>
                    <button
                      type="button"
                      className="bg-white rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white focus:ring"
                      onClick={() => {
                        setQuestionContent({
                          ...questionContent,
                          difficulty: 1,
                        });
                      }}
                    >
                      Médio
                    </button>
                    <button
                      type="button"
                      className="bg-white rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white focus:ring"
                      onClick={() => {
                        setQuestionContent({
                          ...questionContent,
                          difficulty: 2,
                        });
                      }}
                    >
                      Difícil
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="w-36 bg-indigo-500 text-white font-medium rounded-lg py-4 text-center drop-shadow-lg mt-5 hover:bg-indigo-600 mb-5">
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