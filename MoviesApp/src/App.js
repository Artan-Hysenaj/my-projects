import { useState } from "react";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import Header from "./components/shared/Header";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthenticatedUser from "./components/shared/AuthenticatedUser";
import PublicRoute from "./components/shared/PublicRoute";
import CartProvider from "./context/CartProvider";
import Cart from "./components/Cart/Cart";
import AuthProvider from "./context/AuthProvider";

export const localStorageKey = "user";

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <AuthProvider>
      <div className="App">
        <Container>
          <CartProvider>
            <Cart showCart={showCart} onHideCart={() => setShowCart(false)} />
            <AuthenticatedUser />
            <Header onShowCart={() => setShowCart(true)} />

            <div className="mt-4">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/movies" component={Movies} />

                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/register" component={Register} />
              </Switch>
            </div>
          </CartProvider>
        </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
