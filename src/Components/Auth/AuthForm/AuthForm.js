import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { alertActions } from "../../../store/alert/alert-slice";

function AuthForm(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFormValid(email.includes("@") && password.length >= 6);
    }, 200);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [email, password]);

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (formValid) {
      props.onSubmit(email, password);
      // setEmail("");
      // setPassword("");
    } else if (!email.toString().includes("@")) {
      dispatch(alertActions.setAlert({ content: "Email should contain @" }));
    } else {
      dispatch(
        alertActions.setAlert({ content: "Password should be of min length 6" })
      );
    }
  };

  return (
    <Form onSubmit={formSubmitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={emailChangeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={passwordChangeHandler}
        />
      </Form.Group>
      <Button variant="dark" type="submit" style={{ width: "100%" }}>
        Submit
      </Button>
    </Form>
  );
}

export default AuthForm;
