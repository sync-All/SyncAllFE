import { Route, Routes } from "react-router-dom"
import Landing from "./Pages/Landing"
import Registration from "./Pages/Registration"
import SignIn from "./Pages/Sign-in";
import ConfirmEmail from "./Pages/ConfirmEmail";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Registration />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path='/email-confirmation' element={<ConfirmEmail />}></Route>
      </Routes>
    </>
  );
}

export default App
