import React, { useState, lazy, Suspense, useEffect } from 'react';
import LazySuspense from './components/LazySuspense';

const delayImport = (importFunc, time = 3000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(importFunc());
    }, time);
  });
};

const Card = lazy(() => delayImport(() => import('./components/Card'), 3000));
const List = lazy(() => delayImport(() => import('./components/List'), 3000));

const App = () => {
  const [musicNumber, setMusicNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Cuando el lazy loading termina
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 3100); // mismo tiempo que tu delayImport
    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={<LazySuspense />}>
      <div className={`container ${loaded ? 'loaded' : ''}`}>
        <main>
          <Card props={{ musicNumber, setMusicNumber, setOpen }} />
          <List props={{ open, setOpen, musicNumber, setMusicNumber }} />
        </main>
      </div>
    </Suspense>
  );
};

export default App;