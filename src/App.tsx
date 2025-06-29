import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Heading } from './components/ui/Heading';
import { PokemonCryQuizForm } from './features/pokemonCryQuiz/pokemonCryQuizForm';
import { QuizResult } from './features/pokemonCryQuiz/quizResult';

const App = () => {
  return (
    <div className="flex flex-col justify-start gap-y-3 p-4">
      <Heading level={1}>Pokémon 鳴き声クイズ</Heading>
      <BrowserRouter>
        <Routes>
          <Route path="/quiz" element={<PokemonCryQuizForm />} />
          <Route path="/result" element={<QuizResult />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
