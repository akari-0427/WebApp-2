import './App.css';
import { Tikoku, Zangyo } from "./tuuti.js"

function App() {
  return (
    <div className="App">
      <h1>出勤確認</h1>
      <Tikoku/>
      <Zangyo/>
    </div>
  );
}

export default App;
