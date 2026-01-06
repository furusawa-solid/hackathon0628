import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Heading } from './components/ui/Heading';
import { PokemonCryQuizForm } from './features/pokemonCryQuiz/PokemonCryQuizForm';
import { QuizResult } from './features/pokemonCryQuiz/QuizResult';
import { SetupForm } from './features/pokemonCryQuiz/SetupForm';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col justify-start gap-y-3 p-4">
        <Heading level={1}>Pokémon 鳴き声クイズ</Heading>
        <Routes>
          <Route path="/setup" element={<SetupForm />} />
          <Route path="/quiz" element={<PokemonCryQuizForm />} />
          <Route path="/result" element={<QuizResult />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
