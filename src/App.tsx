import { useEffect } from 'react';
import './App.css';
import MainPage from './pages/MainPage/MainPage';

import { db } from './db/db';

function App() {
  useEffect(() => {
    async function init() {
      if (!import.meta.env.DEV) return;

      const count = await db.trainings.count();

      if (count === 0) {
        const { seedDatabase } = await import(
          './shared/seed/seedDB'
        );
        await seedDatabase();
      }
    }

    init();
  }, []);

  return <MainPage />;
}

export default App;
