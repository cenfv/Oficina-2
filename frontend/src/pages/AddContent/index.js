import { Footer } from "../../components/Footer";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Navbar } from "../../components/Navbar";

export function AddContent() {
  const provas = [
    {
      label: "prova 1",
      id: 0,
    },
  ];

	const alternativaCorreta = [
    {
      label: "alternativa 1",
      id: 0,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className=" bg-white max-w-6xl mx-auto rounded-lg p-10 my-5 shadow-md">
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
            <form>
              <div className="grid grid-cols-1">
                <input
                  className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                  placeholder="Titulo da questão"
                  name="title"
                ></input>
                <textarea
                  placeholder="Enunciado da questão"
                  name="description"
                  className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Autocomplete
                  className="bg-white rounded-lg drop-shadow-lg mt-3 outline-none focus:outline-none focus:ring w-auto"
                  disablePortal
                  options={provas}
                  renderInput={(params) => (
                    <TextField {...params} label="Provas" />
                  )}
                />

                <input
                  className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                  placeholder="Ano"
                  type="number"
                  min="1990"
                  max="2022"
                  name="editionYear"
                ></input>
              </div>
              <div className="grid grid-cols-2">
                <p className="mt-5">Alternativas:</p>
                <p className="mt-5">Imagem:</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <input
                    className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                    placeholder=""
                  ></input>
                  <div className="flex justify-end text-indigo-500 mt-2">
                    <div className="flex justify-end text-indigo-500 mt-2">
                      <button type="button">Adicionar +</button>
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
                  options={alternativaCorreta}
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
                    >
                      Fácil
                    </button>
                    <button
                      type="button"
                      className="bg-white rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white focus:ring"
                    >
                      Médio
                    </button>
                    <button
                      type="button"
                      className="bg-white rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white focus:ring"
                    >
                      Difícil
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-36 bg-indigo-500 text-white font-medium rounded-lg py-4 text-center drop-shadow-lg mt-5 hover:bg-indigo-600 mb-5"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="left-0 bottom-0 w-full py-5">
        <Footer />
      </div>
    </>
  );
}
