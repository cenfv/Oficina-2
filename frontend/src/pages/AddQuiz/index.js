import { Footer } from "../../components/Footer";
import { LoggedNavbar } from "../../components/LoggedNavbar";

export function AddQuiz() {

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
            <form>
              <div className="grid grid-cols-1">
                <input
                  className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                  placeholder="Nome da prova"
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
