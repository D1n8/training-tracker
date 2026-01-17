
import { useNavigate } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';

function App() {
  const navigate = useNavigate()
  return (
    <>
        <header>
          <button onClick={() => navigate(`/`)} >Сегодня</button>
          <button onClick={() => navigate(`/trainings`)}>Все тренировки</button>
        </header>
        <AppRouter></AppRouter>
    </>
  );
}

export default App;
