import React from 'react';
import QRCodeGenerator from './QRCodeGenerator';
import QRCodeScanner from './QRCodeScanner';

function QrCode({ mode, userType }) {
    return (
      <div>
        {userType === 'teacher' && mode === 'generator' && (
          <QRCodeGenerator />
        )}
        {userType === 'student' && mode === 'scanner' && (
          <QRCodeScanner />
        )}
      </div>
    );
  }

export default QrCode;