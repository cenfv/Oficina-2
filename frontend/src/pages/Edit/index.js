import { LoggedNavbar } from "../../components/LoggedNavbar";
import { Footer } from "../../components/Footer";
import { DataTable } from "../../components/DataTable";
import { useEffect, useState } from "react";
import Axios from "axios";

export function Edit() {
  const [questionAlternativesData, setQuestionAlternativesData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLoadQuestionAlternativesData = async () => {
    setLoading(true);
    Axios.get(`${process.env.REACT_APP_API_URL}/question-alternative`, {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setQuestionAlternativesData(response.data.questionAlternative);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    handleLoadQuestionAlternativesData();
  }, []);

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
          <DataTable data={questionAlternativesData} setData={setQuestionAlternativesData}/>
        </div>
      </div>
      <div className="left-0 bottom-0 w-full py-5 bg-gray-50">
        <Footer />
      </div>
    </>
  );
}
