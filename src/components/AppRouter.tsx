import { Routes, Route } from 'react-router'
import MainPage from '../pages/MainPage/MainPage';
import CalendarPage from '../pages/CalendarPage/CalendarPage';
import AnalyticPage from '../pages/AnalyticPage/AnalyticPage';
import TrainingPage from '../pages/TrainingPage/TrainingPage';

function AppRouter() {
  return (
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/calendar' element={<CalendarPage/>}/>
        <Route path='/analytic' element={<AnalyticPage/>}/>
        <Route path='/training' element={<TrainingPage/>}/>
      </Routes>
  );
}

export default AppRouter;