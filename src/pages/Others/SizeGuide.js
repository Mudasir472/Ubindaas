import React from 'react';
import { Ruler, Scissors } from "lucide-react";

const SizeGuide = () => {
  return (
    <div className="bg-white text-black p-8">
      <h1 className="text-4xl font-bold mb-8 flex items-center">
        <Ruler className="mr-2" /> Size Guide
      </h1>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="mr-2">&#128085;</span> Tops
          </h2>
          <table className="w-full border-collapse mb-8">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-2">Size</th>
                <th className="p-2">Chest (in)</th>
                <th className="p-2">Waist (in)</th>
                <th className="p-2">Sleeve (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">S</td>
                <td className="border p-2">34-36</td>
                <td className="border p-2">28-30</td>
                <td className="border p-2">32</td>
              </tr>
              <tr>
                <td className="border p-2">M</td>
                <td className="border p-2">38-40</td>
                <td className="border p-2">32-34</td>
                <td className="border p-2">33</td>
              </tr>
              <tr>
                <td className="border p-2">L</td>
                <td className="border p-2">42-44</td>
                <td className="border p-2">36-38</td>
                <td className="border p-2">34</td>
              </tr>
              <tr>
                <td className="border p-2">XL</td>
                <td className="border p-2">46-48</td>
                <td className="border p-2">40-42</td>
                <td className="border p-2">35</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <img 
            src="/api/placeholder/400/400" 
            alt="T-shirt size illustration"
            className="w-full h-auto mb-4"
          />
          <p className="text-sm mb-2">
            <strong>How to Measure:</strong>
          </p>
          <ol className="list-decimal list-inside text-sm">
            <li>Chest: Measure under your arms, around the fullest part of your chest.</li>
            <li>Waist: Measure around your natural waistline, keeping the tape a bit loose.</li> 
            <li>Sleeve: Measure from the center back of your neck, along shoulder and down your arm to wrist.</li>
          </ol>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Scissors className="mr-2" /> Bottoms  
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-2">Size</th>
                <th className="p-2">Waist (in)</th>
                <th className="p-2">Hip (in)</th>
                <th className="p-2">Inseam (in)</th>  
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">28</td>
                <td className="border p-2">28</td>
                <td className="border p-2">36</td>
                <td className="border p-2">30</td>
              </tr>
              <tr>
                <td className="border p-2">30</td>
                <td className="border p-2">30</td>
                <td className="border p-2">38</td>
                <td className="border p-2">30</td>
              </tr>
              <tr>
                <td className="border p-2">32</td>
                <td className="border p-2">32</td>
                <td className="border p-2">40</td>
                <td className="border p-2">32</td>
              </tr>
              <tr>
                <td className="border p-2">34</td>
                <td className="border p-2">34</td>
                <td className="border p-2">42</td>
                <td className="border p-2">32</td>
              </tr>
              <tr>
                <td className="border p-2">36</td>
                <td className="border p-2">36</td>
                <td className="border p-2">44</td>
                <td className="border p-2">32</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <img 
            src="/api/placeholder/400/400"
            alt="Bottoms size illustration" 
            className="w-full h-auto mb-4"
          />
          <p className="text-sm mb-2">
            <strong>How to Measure:</strong>  
          </p>
          <ol className="list-decimal list-inside text-sm">
            <li>Waist: Measure around your natural waistline, keeping the tape a bit loose.</li>
            <li>Hip: Stand with feet together and measure around fullest part of hip.</li>
            <li>Inseam: Measure inside leg from crotch to ankle.</li>
          </ol>
        </div>
      </div>

    </div>
  );
};

export default SizeGuide;