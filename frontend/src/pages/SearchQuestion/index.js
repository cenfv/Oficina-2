import { LoggedNavbar } from "../../components/LoggedNavbar";
import { Footer } from "../../components/Footer";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { BsShuffle } from "react-icons/bs";

export function SearchQuestion() {
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
                  renderInput={(params) => (
                    <TextField {...params} label="Selecione a dificuldade" />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="z-30">
                <Autocomplete
                  className="bg-white rounded-lg drop-shadow-lg mt-3 outline-none focus:outline-none focus:ring w-auto"
                  disablePortal
                  renderInput={(params) => (
                    <TextField {...params} label="Selecione a questão" />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex justify-end">
                <button className="w-36 bg-indigo-500 text-white font-medium rounded-lg py-2 text-center drop-shadow-lg mt-10 hover:bg-indigo-600 mb-5 disabled:opacity-75">
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
