import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn.jsx";
import Home from "./Pages/Home.jsx";
import Layout from "./Layout.jsx";
import Register from "./Pages/Register.jsx";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Layout />}>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/login" element={<SignIn />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
