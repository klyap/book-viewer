import './App.css'
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1> Welcome to Book Viewer! </h1>
      <Link to="/upload">Upload your PDF now</Link>
    </div>
  )
}

export default App
