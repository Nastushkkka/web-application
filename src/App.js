import logo from './logo.svg';
import './App.css';
import EmployeeAPI from "./api/service";
import Table from "./Table";

function App() {
  return (
    <div className="App">
      <Table employees={EmployeeAPI.all()} />
    </div>
  );
}

export default App;
