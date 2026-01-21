import { Routes, Route } from 'react-router'
import MainPage from '../pages/MainPage/MainPage';
// import TrainingsList from '../pages/TrainingsList/TrainingsList';

function AppRouter() {
  return (
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        {/* <Route path='/trainings' element={<TrainingsList/>}/> */}
      </Routes>
  );
}

export default AppRouter;