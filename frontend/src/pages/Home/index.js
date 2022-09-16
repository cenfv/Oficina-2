import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <main className="mt-10 mx-auto max-w-6xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <h1 className="block">Ferramenta para enriquecer</h1>
              <h1 className="block text-indigo-600 xl:inline">seus estudos</h1>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Descubra uma maneira inovadora de organizar e realizar as suas provas. Conheça a nossa plataforma e dê o
              próximo passo para a sua aprovação!
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Começar agora!
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  to=""
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                  Sobre
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="mb-5 left-0 bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}
