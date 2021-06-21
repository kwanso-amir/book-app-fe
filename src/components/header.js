import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import PrivateRoutes from "../routes/PrivateRoutes";
import Users from "./users/Users";
import NewUser from "./users/NewUser";
import EditUser from "./users/EditUser";
import Books from "./books/Books";
import NewBook from "./books/NewBook";
import EditBook from "./books/EditBook";
import ShowBook from "./books/ShowBook";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { logout } from "../helper/Helpers";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux";
import TestComment from "./comments/TestComment";

const BootstrapNavbar = () =>  {
  const history = useHistory();
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    window.location = '/login'
  };

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <Router>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
              <Navbar.Brand href="#home">Book App</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/users">Users</Nav.Link>
                  <Nav.Link href="/books">Books</Nav.Link>
                  <Nav.Link href="/comment-sample">Comment Sample</Nav.Link>
                </Nav>
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />
                  <Button variant="outline-success">Search</Button>
                  {localStorage.getItem("token") ? (
                    <Button
                      className="ml-4"
                      variant="outline-danger"
                      onClick={handleLogout}
                    >
                      Log out
                    </Button>
                  ) : (
                    <Button
                      className="ml-4"
                      variant="outline-primary"
                      onClick={() => window.location = '/login'}

                    >
                      Log in
                    </Button>
                  )}
                  {currentUser !== null ? (
                    <Button className="ml-4" variant="outline-success">
                      {currentUser.first_name} {currentUser.last_name}
                    </Button>
                  ) : (
                    ""
                  )}
                </Form>
              </Navbar.Collapse>
            </Navbar>
            <br />
            <Switch>
              <PrivateRoutes exact path="/users" component={Users} />
              <PrivateRoutes
                path="/users/new"
                component={NewUser}
              ></PrivateRoutes>
              <PrivateRoutes
                path="/users/:id/edit"
                component={EditUser}
              ></PrivateRoutes>
              <PrivateRoutes
                exact
                path="/books"
                component={Books}
              ></PrivateRoutes>
              <PrivateRoutes
                path="/books/new"
                component={NewBook}
              ></PrivateRoutes>
              <PrivateRoutes
                path="/books/:id/edit"
                component={EditBook}
              ></PrivateRoutes>
              <PrivateRoutes
                path="/comment-sample"
                component={TestComment}
              ></PrivateRoutes>
              <PrivateRoutes
                path="/books/:id/show"
                component={ShowBook}
              ></PrivateRoutes>
              <PrivateRoutes path="/login" component={Login}></PrivateRoutes>
              <PrivateRoutes path="/signup" component={Signup}></PrivateRoutes>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default BootstrapNavbar;
