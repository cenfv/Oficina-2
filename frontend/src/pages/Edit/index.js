import { LoggedNavbar } from "../../components/LoggedNavbar";
import { Footer } from "../../components/Footer";

export function Edit() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <LoggedNavbar />
        <div className=" bg-white max-w-6xl mx-auto rounded-lg p-10 mt-5 shadow-md">
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-3xl">
            Editar
          </h1>
          <p className="mt-2 text-lg font-normal text-gray-900 sm:text-lg">
            Edite ou remova o conteúdo das suas questões.
          </p>
          <h3 className="mt-5 text-2xl font-bold text-gray-900">Questões:</h3>
        </div>
      </div>
      <Footer />
    </>
  );
}