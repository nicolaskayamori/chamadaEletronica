// QRCodeGenerator.js (Painel do Professor)
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';

function QRCodeGenerator() {
  const [qrCodeData, setQrCodeData] = useState('');
  const [subject, setSubject] = useState('');

  const generateQRCode = async () => {
    try {
      const response = await axios.post('/api/classes', { subject });
      setQrCodeData(response.data.class.qrCodeData);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div>
      <h2>Gerar QR Code para Aula</h2>
      <input
        type="text"
        placeholder="Matéria"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <button onClick={generateQRCode}>Gerar QR Code</button>
      
      {qrCodeData && (
        <div>
          <QRCode value={qrCodeData} size={256} />
          <p>Mostre este QR code para os alunos escanearem</p>
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;