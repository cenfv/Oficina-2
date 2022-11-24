import { LoggedNavbar } from "../../components/LoggedNavbar";
import { Footer } from "../../components/Footer";

export function Questions() {
  return (
    <>
      <div className="min-h-screen">
        <LoggedNavbar />
        <div className="max-w-6xl mx-auto">
          <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
            Questão teste
          </h1>
          <h5 className="mt-5 text-lg text-justify font-medium">
            Ano: | Nível:
          </h5>
          <p className="mt-5 text-lg text-justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy
            textever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <img className="mx-auto mt-5 max-h-72" alt="Imagem questão" />
          <div className="grid grid-cols-2 mt-5 gap-4">
            <button className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 hover:bg-indigo-500 hover:text-white">
              Alternativa1
            </button>
            <button className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 hover:bg-indigo-500 hover:text-white">
              Alternativa2
            </button>
            <button className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 hover:bg-indigo-500 hover:text-white">
              Alternativa3
            </button>
						<button className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 hover:bg-indigo-500 hover:text-white">
              Alternativa4
            </button>
          </div>

          <div className="flex justify-center mt-16">Mostrar resultado</div>
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
