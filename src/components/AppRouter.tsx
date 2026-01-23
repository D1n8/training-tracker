import { Routes, Route } from 'react-router'
import AnalyticPage from '../pages/AnalyticPage/AnalyticPage';
import TrainingPage from '../pages/TrainingPage/TrainingPage';

function AppRouter() {
  return (
      <Routes>
        <Route path='/' element={<TrainingPage/>}/>
        <Route path='/analytic' element={<AnalyticPage/>}/>
      </Routes>
  );
}

export default AppRouter;