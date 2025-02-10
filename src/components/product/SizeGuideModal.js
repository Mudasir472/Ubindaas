import React from 'react';
import { FiX } from 'react-icons/fi';
import '../../styles/components/size-guide-modal.css';

function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>
        
        <h2>Size Guide</h2>
        
        <div className="size-table">
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Bust (in)</th>
                <th>Waist (in)</th>
                <th>Hip (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>XS</td>
                <td>30-32</td>
                <td>24-26</td>
                <td>33-35</td>
              </tr>
              <tr>
                <td>S</td>
                <td>32-34</td>
                <td>26-28</td>
                <td>35-37</td>
              </tr>
              <tr>
                <td>M</td>
                <td>34-36</td>
                <td>28-30</td>
                <td>37-39</td>
              </tr>
              <tr>
                <td>L</td>
                <td>36-38</td>
                <td>30-32</td>
                <td>39-41</td>
              </tr>
              <tr>
                <td>XL</td>
                <td>38-40</td>
                <td>32-34</td>
                <td>41-43</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="measurement-guide">
          <h3>How to Measure</h3>
          <ul>
            <li>
              <strong>Bust:</strong> Measure around the fullest part of your bust
            </li>
            <li>
              <strong>Waist:</strong> Measure around your natural waistline
            </li>
            <li>
              <strong>Hip:</strong> Measure around the fullest part of your hips
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SizeGuideModal;