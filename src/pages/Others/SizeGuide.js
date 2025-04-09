import React from 'react';
import { Ruler, Scissors } from "lucide-react";

const SizeGuide = () => {
  return (
    <div className="bg-white containers text-black p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
        <Ruler /> Size Guide
      </h1>

      <div className='d-flex items-center gap-4'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Tops Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span role="img" aria-label="shirt">👕</span> Tops
            </h2>
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-black text-white">
                  <th className="p-3">Size</th>
                  <th className="p-3">Chest (in)</th>
                  <th className="p-3">Waist (in)</th>
                  <th className="p-3">Sleeve (in)</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {[
                  { size: "S", chest: "34-36", waist: "28-30", sleeve: "32" },
                  { size: "M", chest: "38-40", waist: "32-34", sleeve: "33" },
                  { size: "L", chest: "42-44", waist: "36-38", sleeve: "34" },
                  { size: "XL", chest: "46-48", waist: "40-42", sleeve: "35" },
                ].map((row, index) => (
                  <tr key={index} className="border border-gray-300">
                    <td className="p-3">{row.size}</td>
                    <td className="p-3">{row.chest}</td>
                    <td className="p-3">{row.waist}</td>
                    <td className="p-3">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            
            <p className="text-sm font-semibold">How to Measure:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Chest: Measure under your arms, around the fullest part of your chest.</li>
              <li>Waist: Measure around your natural waistline, keeping the tape a bit loose.</li>
              <li>Sleeve: Measure from the center back of your neck, along shoulder and down your arm to wrist.</li>
            </ul>
          </div>
        </div>

        {/* Bottoms Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Scissors /> Bottoms
            </h2>
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-black text-white">
                  <th className="p-3">Size</th>
                  <th className="p-3">Waist (in)</th>
                  <th className="p-3">Hip (in)</th>
                  <th className="p-3">Inseam (in)</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {[
                  { size: "28", waist: "28", hip: "36", inseam: "30" },
                  { size: "30", waist: "30", hip: "38", inseam: "30" },
                  { size: "32", waist: "32", hip: "40", inseam: "32" },
                  { size: "34", waist: "34", hip: "42", inseam: "32" },
                  { size: "36", waist: "36", hip: "44", inseam: "32" },
                ].map((row, index) => (
                  <tr key={index} className="border border-gray-300">
                    <td className="p-3">{row.size}</td>
                    <td className="p-3">{row.waist}</td>
                    <td className="p-3">{row.hip}</td>
                    <td className="p-3">{row.inseam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            
            <p className="text-sm font-semibold">How to Measure:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Waist: Measure around your natural waistline, keeping the tape a bit loose.</li>
              <li>Hip: Stand with feet together and measure around the fullest part of the hip.</li>
              <li>Inseam: Measure inside leg from crotch to ankle.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;