import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input, Row, Space, Switch, Typography } from "antd";
import { toast } from "react-hot-toast";

import classes from "./Login.module.css";
import teddy from "../assets/images/teddy.png";
import LoadingScreen from "../components/Loading";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginUser, resetError, selectAuth } from "../features/authSlice";

const { Text } = Typography;

function Login() {
  // The `state` arg is correctly typed as `RootState` already
  const { user, isLoading, isError, error } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  // Handling Navigation
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (!isLoading && user.email) {
      toast.success("Login successful");
      navigate(from, { replace: true });
    } else if (!isLoading && isError) {
      dispatch(resetError());
    }
  }, [user.email, isLoading]);

  // Handling Form submit
  const handleLogin = (data: { email: string; password: string }) => {
    dispatch(loginUser(data));
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
                <Switch defaultChecked />
                <Text type="secondary">Remember me</Text>
              </Space>
            </Row>
          </Form.Item>
          {isError && (
            <Form.Item>{isError && <Text type="danger">{error}</Text>}</Form.Item>
          )}
          <Form.Item>
            <Button className={classes.signInBtn} type="primary" htmlType="submit">
              SIGN IN
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <img src={teddy} alt="" height="500px" />
      </div>
    </div>
  );

  // Handling loading state
  if (isLoading) {
    return <LoadingScreen />;
  }

  return signIn;
}

export default Login;
