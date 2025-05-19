// QRCodeScanner.js (Painel do Aluno)
import React, { useState } from 'react';
import QrReader from 'react-qr-code';
import axios from 'axios';

function QRCodeScanner() {
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');

  const handleScan = async (data) => {
    if (data) {
      setResult(data);
      try {
        await axios.post('/api/attendance', { qrCodeData: data });
        setMessage('Presença registrada com sucesso!');
      } catch (error) {
        setMessage('Erro ao registrar presença: ' + error.response?.data?.message);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setMessage('Erro ao ler QR code');
  };  

  return (
    <div>
      <h2>Registrar Presença</h2>
      <QrReader
        value=''
        style={{ width: '100%' }}
      />
      <p>Resultado: {result}</p>
      {message && <p>{message}</p>}
    </div>
  );
}

export default QRCodeScanner;