import React from 'react';
import './App.css';
import Categories from './components/Categories/Categories';
import Footer from './components/Footer/Footer';
import HowItWorks from './components/HowItWorks/HowItWorks';
function App() {
  return (
    <div className="App">
      <Categories />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default App;
