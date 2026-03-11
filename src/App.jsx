import { useState } from 'react';
import Login from './Login';
import MemeGenerator from './MemeGenerator'; /* Assuming this still exists */
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <MemeGenerator />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
