import { Toaster } from 'sonner';
import './App.css';
import Routers from './router/Routers';

function App() {
  return (
    <div>
      <Routers />
      <Toaster richColors />
    </div>
  );
}

export default App;
