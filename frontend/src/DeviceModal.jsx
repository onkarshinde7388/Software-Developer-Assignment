import React from 'react';

export default function DeviceModal({ device, onClose }) {
  console.log("Device prop:", device);

   if (!device) {
    return (
      <div style={{ background: '#fff', padding: '20px', border: '1px solid #000' }}>
        <p>Loading device information...</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }
  return (
    <div style={{ background: '#fff', padding: '20px', border: '1px solid #000' }}>
      <h3>Device {device.uuid}</h3>
      <p>Firmware: {device.fw}</p>
      <p>Temperature: {device.data.temp.toFixed(2)}</p>
      <p>Humidity: {device.data.hum.toFixed(2)}</p>
      <p>PM2.5: {device.data.pm.toFixed(2)}</p>
      <button onClick={onClose} className='btn bg-amber-600 text-bold text-white'>Close</button>
    </div>
  );
}
