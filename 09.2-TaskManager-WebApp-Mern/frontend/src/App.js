import './App.css';
import { Header } from './components/Header';
import { SignUp } from './components/auth/signup';
import { Login } from './components/auth/login';
import { Tasks } from './components/Tasks/Tasks';

function App() {
  return (
    <div className="App">
      <Header />
      <Login />
      <SignUp />
      <Tasks />
    </div>
  );
}

export default App;