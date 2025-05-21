import React, { useEffect } from 'react';

const DST = () => {
const urlParams = new URLSearchParams(window.location.search);

const getURLParameter = (name) => urlParams.get(name) || "N/A";

// Convert Excel serial date to JS date string
const excelDateToJSDate = (serial) => {
  const num = parseFloat(serial);
  if (isNaN(num)) return "N/A";
  const utcDays = Math.floor(num - 25569);
  const utcValue = utcDays * 86400;
  return new Date(utcValue * 1000).toLocaleDateString();
};

// Validate dd/mm/yyyy format, else fallback
const formatDOB = (dobStr) => {
  if (!dobStr || !dobStr.includes("/")) return "N/A";
  const [day, month, year] = dobStr.split("/");
  const date = new Date(`${year}-${month}-${day}`);
  return isNaN(date) ? "N/A" : date.toLocaleDateString();
};

const patientData = {
  name: getURLParameter("name"),
  dob: formatDOB(getURLParameter("dob")),
  doa: excelDateToJSDate(getURLParameter("doa")),
  ca: getURLParameter("ca"),
  da: getURLParameter("da"),
  dq: getURLParameter("dq"),
  currentDate: new Date().toLocaleDateString()
};




  return (
    <div className="pdf-image flex flex-col font-manrope items-center p-8 bg-white min-h-screen relative" >
    <div className="pdf-page bg-white p-8 shadow-md rounded-md w-[210mm] h-[297mm] relative">
        <h1 className="text-sm font-semibold text-left text-purple-700">Vanderbilt ADHD Diagnostic Parent Rating Scale</h1>
        <div className="w-full border-t-2 mt-2 border-purple-700"></div>

        <h2 className="text-2xl font-bold text-purple-800 mt-6">Vanderbilt <span className="text-black">Screening</span></h2>

        <p className="mt-4 text-justify text-gray-700">
        The Vanderbilt ADHD diagnostic parent rating scale is used to help in the diagnostic 
        process of Attention Deficit/Hyperactive Disorder (ADHD). 
        </p>

        <p className="mt-2 pt-4 text-left text-gray-700">
          Name: <span className="font-semibold">{patientData.name}</span><br />
          Date of Birth: <span className="font-semibold">{patientData.dob}</span><br />
          Date of Assessment: <span className="font-semibold">{patientData.doa}</span>
        </p>

        <p className="mt-4 text-justify text-gray-700">
        The scores attained by the child on this test were as follows:
        </p>
   
        <table className="w-[60%] mx-auto mt-20 text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">Sub Type</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Scores</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-4 py-2">Inattention</td><td className="border px-4 py-2">{patientData.da}</td></tr>
            <tr><td className="border px-4 py-2">Hyperactivity/Impulsivity</td><td className="border px-4 py-2">{patientData.ca}</td></tr>
            <tr><td className="border px-4 py-2">Combined type</td><td className="border px-4 py-2">{patientData.dq}</td></tr>
            <tr><td className="border px-4 py-2">Oppositional Defiant Disorder</td><td className="border px-4 py-2">{patientData.dq}</td></tr>
            <tr><td className="border px-4 py-2">Conduct Disorder</td><td className="border px-4 py-2">{patientData.dq}</td></tr>
            <tr><td className="border px-4 py-2">Anxiety/Depression</td><td className="border px-4 py-2">{patientData.dq}</td></tr>
          </tbody>
        </table>

        <p className="mt-4 text-justify text-gray-700">
        The scores on Vanderbilt ADHD diagnostic scale (as per the parent’s reporting) were 
        indicative of {patientData.result}. 
        {/* add the result */}
        </p>
        

        <div className="absolute bottom-8 left-8 right-8 flex justify-between text-xs text-gray-500 border-t border-purple-800 pt-2">
            <span>DST Report - {patientData.name}</span>
            {/* <span>Page 08</span> */}
        </div>
      </div>
    </div>
  );
};

export default DST;
