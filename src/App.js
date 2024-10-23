import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making API calls
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AlertTriangle, Shield, Activity, Wifi, Lock, User, Key } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card';
import Alert from './components/ui/Alert';
import AlertTitle from './components/ui/AlertTitle'; // If AlertTitle is a separate file

import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';

const generateRandomData = (length) => {
  return Array.from({ length }, (_, i) => ({
    time: `${i}:00`,
    anomalyScore: Math.random() * 100,
    trafficVolume: Math.floor(Math.random() * 1000),
  }));
};

// Login page component
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password123') {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-green-50">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Administrator Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="text-slate-500" />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Key className="text-slate-500" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main dashboard component
const NetworkSecurityDashboard = () => {
  const [data, setData] = useState(generateRandomData(24));
  const [alerts, setAlerts] = useState([]);
  const [securedDevices, setSecuredDevices] = useState(0);
  const [totalDevices, setTotalDevices] = useState(42);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to make API call to the backend and get the model prediction
  const handleModelPrediction = async (inputData) => {
    try {
      const response = await axios.post('http://localhost:5000/predict', {
        data: inputData, // You should send appropriate input features
      });
      const prediction = response.data.prediction;
      console.log('Prediction from the model:', prediction);

      // Update the state based on the prediction
      if (prediction === 1) {
        setAlerts((prev) => [
          ...prev,
          { id: Date.now(), message: 'Anomaly Detected! Immediate Action Required.', severity: 'high' },
        ]);
      }
    } catch (error) {
      console.error('Error during prediction API call', error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [
          ...prevData.slice(1),
          {
            time: `${new Date().getHours()}:00`,
            anomalyScore: Math.random() * 100,
            trafficVolume: Math.floor(Math.random() * 1000),
          },
        ];

        if (newData[newData.length - 1].anomalyScore > 80) {
          handleModelPrediction([newData[newData.length - 1].trafficVolume]); // Pass the necessary input data to the model
        }

        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleSecureDevices = () => {
    const devicesToSecure = Math.min(5, totalDevices - securedDevices);
    setSecuredDevices((prev) => prev + devicesToSecure);
    setAlerts((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: `${devicesToSecure} IoT devices secured against hijacking attempts.`,
        severity: 'success',
      },
    ]);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="p-4 bg-gradient-to-br from-sky-50 to-green-50 min-h-screen text-slate-800">
      <h1 className="text-3xl font-bold mb-6 text-black">Network Security Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* Your existing card structure */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Your charts for Network Anomaly Score and Network Traffic Volume */}
      </div>

      <div className="space-y-4 mb-6">
        <h2 className="text-2xl font-bold text-black">Recent Alerts</h2>
        {alerts.slice(-5).reverse().map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.severity === 'high' ? 'destructive' : 'default'}
            className={`bg-white bg-opacity-70 backdrop-blur-sm border ${
              alert.severity === 'high' ? 'border-red-600' : 'border-green-600'
            }`}
          >
            <AlertTitle>{alert.message}</AlertTitle>
          </Alert>
        ))}
      </div>

      <Button onClick={handleSecureDevices} className="bg-emerald-600 text-white">
        Secure 5 IoT Devices
      </Button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <NetworkSecurityDashboard />
    </div>
  );
};

export default App;
