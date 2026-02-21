
import './App.css'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Signup from './Components/Signup/Signup'
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <ToastContainer />
      {/* <Signup /> */}
      <Navbar />
      <Home />
    </>
  )
}

export default App
