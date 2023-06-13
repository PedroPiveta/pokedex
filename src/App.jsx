import PokemonCard from './components/PokemonCard';
import { globalCss } from '@stitches/react';

const globalStyles = globalCss({
  '*': { margin: 0, padding: 0 },
  body: {
    fontFamily: 'system-ui',
  }
});

globalStyles();

function App() {
  return (
    <>
      <PokemonCard />
    </>
  )
}
export default App
