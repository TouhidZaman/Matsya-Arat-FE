import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input, Row, Space, Switch, Typography } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";

import classes from "./Login.module.css";
import auth from "../utils/firebase.init";
import teddy from "../assets/images/teddy.png";
import LoadingScreen from "../components/Loading";

const { Text } = Typography;

function Login() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handling Navigation
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/dashboard";

  const rememberMe = () => {};

  // Handling Form submit
  const handleLogin = (data: { email: string; password: string }) => {
    setLoading(true);
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setError(false);
        setErrorMessage("");
        setLoading(false);
        const user = userCredential.user;
        if (user) navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        setError(true);
        setErrorMessage(errorCode);
      });
  };

  const signIn = (
    <div className={classes.container}>
      <div className={classes.loginDiv}>
        <h1>Sign In</h1>
        <h3>Enter your email and password to sign in</h3>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
            <Input placeholder="Email" required />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                min: 6,
                message: "Password should be at least 6 characters",
              },
            ]}
          >
            <Input type="password" placeholder="Password" required />
          </Form.Item>

          <Form.Item name="acceptTerms" valuePropName="checked">
            <Row justify="space-between">
              <Space>
                <Switch defaultChecked onChange={rememberMe} />
                <Text type="secondary">Remember me</Text>
              </Space>
              {/* <Link to="/password-reset" type="link" style={{ padding: '0px' }}>
                Forgot password?
              </Link> */}
            </Row>
          </Form.Item>
          {error && (
            <Form.Item>
              {error && <Text type="danger">{errorMessage}</Text>}
            </Form.Item>
          )}
          <Form.Item>
            <Button className={classes.signInBtn} type="primary" htmlType="submit">
              SIGN IN
            </Button>
          </Form.Item>

          <Form.Item>
            Do not have an account?{" "}
            <a target="_blank" rel="noreferrer" href="https://www.fuelworks.in/">
              Sign-up
            </a>
          </Form.Item>
        </Form>
      </div>
      <div>
        <img src={teddy} alt="" height="500px" />
      </div>
    </div>
  );

  // Handling loading state
  if (loading) {
    return <LoadingScreen />;
  }

  return signIn;
}

export default Login;
