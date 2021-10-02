import logo from "./logo.svg";
import "./App.css";
import ImageUpload from "src/components/ImageUpload";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section className="App-body">
        <ImageUpload />
      </section>
    </div>
  );
}

export default App;
