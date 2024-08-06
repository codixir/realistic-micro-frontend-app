import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Microfrontend1 = React.lazy(() => import('microfrontend1/ProductList'));
const Microfrontend2 = React.lazy(() => import('microfrontend2/Cart'));

function App() {
  return (
    <Router>
      <div>
        <h1>Store</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/product-list">Product List</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<div>Welcome to the App Shell</div>} />
            <Route path="/product-list" element={<Microfrontend1 />} />
            <Route path="/cart" element={<Microfrontend2 />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;