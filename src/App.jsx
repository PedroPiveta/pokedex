import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonCard from './components/PokemonCard';
import { globalCss } from '@stitches/react';
import PokemonDetails from './pages/PokemonDetails';

const globalStyles = globalCss({
  '*': { margin: 0, padding: 0 },

  html: {
    colorScheme: 'light dark',
    scrollBehavior: 'auto',
  },

  body: {
    fontFamily: 'system-ui',
    marginBottom: 48,
  }
});

globalStyles();

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PokemonCard />} />
        <Route path='/pokemon/:id' element={<PokemonDetails />} />
      </Routes>
    </Router>
  )
}
export default App
