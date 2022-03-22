import { Button, Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";
import { NavLink, useHistory } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import { useContext } from "react";
import CartContext from "../../context/cart-context";

const Header = (props) => {
  const history = useHistory();
  const authContext = useAuthContext();
  const cartContext = useContext(CartContext);
  const logoutHandler = () => {
    authContext.logout();
    cartContext.clearCart();
  };
  const cartItemsLength = cartContext.items.length;
  return (
    <Navbar color="light" expand="md" light>
      <NavbarBrand href="/">Movies Project</NavbarBrand>
      <Nav className="me-auto" navbar>
        <NavItem>
          <NavLink
            exact
            className="nav-link"
            activeClassName="active-item"
            to="/"
          >
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            exact
            className="nav-link"
            activeClassName="active-item"
            to="/movies"
          >
            Movies
          </NavLink>
        </NavItem>

        {authContext.isAdmin && (
          <NavItem>
            <NavLink
              className="nav-link"
              activeClassName="active-item"
              to="/movies/new"
            >
              Add movie
            </NavLink>
          </NavItem>
        )}
      </Nav>

      <Nav className="ml-auto">
        {authContext.isAuthenticated ? (
          <>
            {!authContext.isAdmin && (
              <Button className="mx-2" onClick={props.onShowCart}>
                Cart ({cartItemsLength})
              </Button>
            )}
            <Button color="danger" onClick={logoutHandler}>
              Logout
            </Button>
          </>
        ) : (
          <Button onClick={() => history.push("/login")}>Login</Button>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
