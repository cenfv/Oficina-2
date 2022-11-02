import  Axios  from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";

export function DataTable({ data, setData }) {
  return (
    <div className=" shadow-md my-6 items-center justify-center max-w-6xl mx-auto ">
      <div>
        <table className="min-w-full table-auto divide-gray-200">
          <thead className="bg-indigo-500  ">
            <tr>
              <th className="py-2 px-6 text-sm font-medium tracking-wider center text-white uppercase ">
                #
              </th>
              <th className="py-2 px-6 text-sm font-medium tracking-wider center text-white uppercase">
                QUESTÃO
              </th>
              <th className="py-2 px-6 text-sm font-medium tracking-wider center text-white uppercase">
                CRIADA EM
              </th>
              <th className="py-2 px-6 text-sm font-medium tracking-wider center text-white uppercase">
                PROVA
              </th>
              <th className="py-2 px-6 text-sm font-medium tracking-wider center text-white uppercase">
                OPÇÕES
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 ">
            {data?.length > 0 &&
              data.map((questionAlternatives, index) => {
                const formattedDate = new Date(
                  questionAlternatives?.createdAt
                ).toLocaleString();

                return (
                  <tr
                    className="text-center hover:bg-gray-100"
                    key={questionAlternatives?._id}
                  >
                    <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                      {questionAlternatives?._id}
                    </td>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                      {questionAlternatives?.question.title}
                    </td>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                      {formattedDate}
                    </td>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                      {questionAlternatives?.question.quiz.description}
                    </td>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                      <button>
                        <FiEdit className="stroke-indigo-600 w-5 h-5 mr-3"/>
                      </button>
                      <button onClick={
                        () => {;
                          Axios.delete(`${process.env.REACT_APP_API_URL}/question-alternative/${questionAlternatives?._id}
                          `, {
                            headers: {
                              authorization: localStorage.getItem("authorization"),
                            },
                          })
                            .then((response) => {
                              setData(data.filter((dataQuestionAlternatives) => dataQuestionAlternatives._id !== questionAlternatives._id));
                              
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }
                      }>
                        <FiTrash2 className="stroke-red-500 w-5 h-5"/>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
