import logo from "./logo.svg";
import "./App.css";

import Routes from "./routes/routes"; 
import ErkContextProvider from "./context/Condex";
function App() {
    return <ErkContextProvider>
               <Routes/>
          </ErkContextProvider> ;
}

export default App;
