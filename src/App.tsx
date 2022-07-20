import './App.css';
import NavContainer from './Navigation/components/NavContainer';

function App() {
  return (
    <div className="App">
      <NavContainer Admin={undefined} LogedIn={true} UserName={"Vegeta"}/>
    </div>
  );
}

export default App;
