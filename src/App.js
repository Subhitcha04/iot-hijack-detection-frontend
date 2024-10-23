import React, { useState, useEffect } from 'react';
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
import AlertTitle from './components/ui/AlertTitle';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';

// Possible malware types
const malwareTypes = [
  'Trojan',
  'Ransomware',
  'Worm',
  'Spyware',
  'Adware',
  'Rootkit',
];

// Function to generate random data for the charts
const generateRandomData = (length) => {
  return Array.from({ length }, (_, index) => ({
    time: new Date().toLocaleTimeString(), // Time stamps with current time
    anomalyScore: Math.random() * 100,
    trafficVolume: Math.floor(Math.random() * 1000),
    iotDeviceId: `Device-${index + 1}`, // Add IoT device ID
    malwareType: malwareTypes[Math.floor(Math.random() * malwareTypes.length)], // Randomly assign malware type
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
  const [attackedDevice, setAttackedDevice] = useState(null);
  const [showInformMessage, setShowInformMessage] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [
          ...prevData.slice(1),
          {
            time: new Date().toLocaleTimeString(), // Real-time timestamps
            anomalyScore: Math.random() * 100,
            trafficVolume: Math.floor(Math.random() * 1000),
            iotDeviceId: `Device-${prevData.length + 1}`, // Assign IoT device ID
            malwareType: malwareTypes[Math.floor(Math.random() * malwareTypes.length)], // Randomly assign malware type
          },
        ];

        if (newData[newData.length - 1].anomalyScore > 80) {
          setAlerts((prev) => [
            ...prev,
            {
              id: Date.now(),
              message: (
                <span className="text-red-600">High anomaly score detected! Possible IoT device hijacking attempt.</span>
              ),
              severity: 'warning',
            },
          ]);
          setAttackedDevice(newData[newData.length - 1]); // Set attacked device info
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

  const handleInformSupport = () => {
    setShowInformMessage(true);
    setTimeout(() => {
      setShowInformMessage(false);
    }, 3000); // Hide message after 3 seconds
  };

  const handleDisconnectDevice = () => {
    setTotalDevices((prev) => prev - 1);
    setAttackedDevice(null); // Clear attacked device after disconnect
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="p-4 bg-gradient-to-br from-sky-50 to-green-50 min-h-screen text-slate-800">
      <h1 className="text-3xl font-bold mb-6 text-black">Network Security Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[
          { title: "Active Threats", value: alerts.length, icon: AlertTriangle, color: "text-rose-600", bgColor: "bg-rose-100" },
          { title: "Protected Devices", value: securedDevices, icon: Shield, color: "text-emerald-600", bgColor: "bg-emerald-100" },
          { title: "Network Load", value: "78%", icon: Activity, color: "text-blue-600", bgColor: "bg-blue-100" },
          { title: "IoT Devices", value: totalDevices, icon: Wifi, color: "text-violet-600", bgColor: "bg-violet-100" },
          { title: "Secured IoT Devices", value: securedDevices, icon: Lock, color: "text-amber-600", bgColor: "bg-amber-100" }
        ].map((item, index) => (
          <Card key={index} className={`flex flex-col justify-between rounded-lg overflow-hidden shadow-md border-0 ${item.bgColor}`}>
            <CardHeader className="bg-opacity-40 bg-white p-4">
              <CardTitle className="text-sm font-medium flex justify-between items-center text-slate-700">
                {item.title}
                <item.icon className={`h-4 w-4 ${item.color}`} />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex-grow flex items-center justify-center">
              <div className="text-2xl font-bold text-slate-800">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="rounded-lg overflow-hidden shadow-md border-0 bg-white bg-opacity-70 backdrop-blur-sm">
          <CardHeader className="bg-opacity-40 bg-sky-100">
            <CardTitle className="text-black">Network Anomaly Score</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
                <XAxis dataKey="time" stroke="#475569" />
                <YAxis stroke="#475569" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', border: '1px solid #e2e8f0' }} />
                <Legend />
                <Line type="monotone" dataKey="anomalyScore" stroke="red" /> {/* Anomaly score line in red */}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-lg overflow-hidden shadow-md border-0 bg-white bg-opacity-70 backdrop-blur-sm">
          <CardHeader className="bg-opacity-40 bg-green-100">
            <CardTitle className="text-black">Network Traffic Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
                <XAxis dataKey="time" stroke="#475569" />
                <YAxis stroke="#475569" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', border: '1px solid #e2e8f0' }} />
                <Legend />
                <Line type="monotone" dataKey="trafficVolume" stroke="green" /> {/* Traffic volume line in green */}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {showInformMessage && (
        <Alert>
          <AlertTitle>Support Information</AlertTitle>
          <p>Please inform your IT support team about the recent attacks.</p>
          <Button onClick={() => setShowInformMessage(false)}>Dismiss</Button>
        </Alert>
      )}

      {attackedDevice && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Alert!</strong>
          <span className="block sm:inline">Detected a security breach in {attackedDevice.iotDeviceId}!</span>
          <span className="block sm:inline">Malware Type: {attackedDevice.malwareType}</span>
          <div className="mt-2 flex justify-end">
            <Button onClick={handleInformSupport} className="mr-2">
              Inform Support
            </Button>
            <Button onClick={handleDisconnectDevice} color="danger">Disconnect Device</Button>
          </div>
        </div>
      )}

      <Button onClick={handleSecureDevices} className="mt-4">Secure More Devices</Button>
    </div>
  );
};

export default NetworkSecurityDashboard;
