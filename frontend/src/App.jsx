import { BrowserRouter, Routes, Route, Container } from './utils/import';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/shared/footer/Footer';
import Header from './components/shared/header/Header';
import { ToastContainer } from 'react-toastify';
import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import Description from './pages/description/Description';
import Cart from './pages/cart/Cart';
import Shipping from './pages/shipping/Shipping';
import Payment from './pages/payment/Payment';

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
                <Route path="/product/:token" element={<Description />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/shipping" element={<Shipping />}></Route>
                <Route path="/payment" element={<Payment />}></Route>
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
