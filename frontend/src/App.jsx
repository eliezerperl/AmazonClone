import { BrowserRouter, Routes, Route, Container } from './utils/import';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/shared/footer/Footer';
import Header from './components/shared/header/Header';
import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column side-allPage min-width">
          <ToastContainer position="bottom-center" limit={1} />
          <Header />
          <main>
            <Container className="mt-3">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signin" element={<SignIn />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
              </Routes>
            </Container>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
