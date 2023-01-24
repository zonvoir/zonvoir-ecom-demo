import { Routes, Route } from 'react-router-dom';

// ROUTES
import Authentication from './routes/authentication/authentication.component';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';




// Components

const Contact = () => (
  <h1>3 - 2 - 1 - CONTACT</h1>
)

const Projects = () => {
  
  return (
    <div>
      <h1>Projects</h1>
      <div>
        <h3>Choice Projects</h3>
        <h3>Journey of Projects</h3>
      </div>
    </div>
  )
}

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path="shop*" element={<Shop />} />
        <Route path="contact" element={<Contact />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="projects" element={<Projects />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
