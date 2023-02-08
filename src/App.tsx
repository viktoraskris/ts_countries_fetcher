import { Route, Routes } from 'react-router-dom';
import Countries from './components/Countries';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Countries />} />
    </Routes>
  );
}

export default App;
