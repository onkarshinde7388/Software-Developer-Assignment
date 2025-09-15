import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { getApi } from './api'; // Assuming this is correct
import DeviceModal from './DeviceModal';

const Page = ({ token }) => {
  const [devices, setDevices] = useState([]);
  const [modalDevice, setModalDevice] = useState(null);
  const [socket, setSocket] = useState(null);

  // Fetch devices on mount
  useEffect(() => {
    getApi('/devices', token)
      .then(data => setDevices(data))
      .catch(err => console.error("Error fetching devices:", err));
  }, [token]);

  // Initialize socket connection once
  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Listen for updates when devices change
  useEffect(() => {
    if (!socket) return;

    devices.forEach(device => {
      socket.on(`device_${device.uuid}`, data => {
        setDevices(prevDevices =>
          prevDevices.map(d => (d.uuid === data.uuid ? data : d))
        );
      });
    });

    return () => {
      devices.forEach(device => {
        socket.off(`device_${device.uuid}`);
      });
    };
  }, [devices, socket]);

  return (
    <div className="p-4 flex flex-col justify-evenly items-center ">
      <h2>Devices</h2>
      <ul>
        {devices.map(device => (
          <li key={device.uuid}>
            {device.uuid} - Temp: {device.data?.temp} - Humidity: {device.data?.hum}
            <button onClick={() => setModalDevice(device)} className='btn bg-amber-600 text-bold text-white'>Details</button>
          </li>
        ))}
      </ul>
      {modalDevice && (
        <DeviceModal device={modalDevice} onClose={() => setModalDevice(null)} />
      )}
    </div>
  );
};

export default Page;
 