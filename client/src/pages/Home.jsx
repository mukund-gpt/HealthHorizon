import React from 'react';
import FlipCard from '../components/FlipCard';

function Home() {
  return (
    <div className="App">
      <h1>Welcome to My Health Website</h1>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <FlipCard
          frontContent={<div>Workout Tips</div>}
          backContent={<div>Stay Hydrated! 🥤</div>}
        />
        <FlipCard
          frontContent={<div>Diet Plans</div>}
          backContent={<div>Eat More Greens! 🥗</div>}
        />
        <FlipCard
          frontContent={<div>Mental Health</div>}
          backContent={<div>Take Deep Breaths! 😌</div>}
        />
      </div>
    </div>
  );
}

export default Home;
