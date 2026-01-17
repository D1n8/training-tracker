import { Routes, Route } from 'react-router'
import MainPage from '../pages/MainPage/MainPage';
import TrainingsListPage from '../pages/TrainingsListPage/TrainingsListPage';

function AppRouter() {
  return (
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/trainings' element={<TrainingsListPage/>}/>
      </Routes>
  );
}

export default AppRouter;