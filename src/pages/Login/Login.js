import React,{useState} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { login } from '../../api/Api';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // for https

      //document.cookie = `token=${response.token}; Secure; HttpOnly; SameSite=Strict`;
      //http

      const response = await login(values);
      const { token, name } = response.data;

      document.cookie = `token=${token}; SameSite=Strict`;
      localStorage.setItem('username',name);
      navigate("/home/");


    } catch (error) {
      message.error("Credenciais inválidas!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <Form
          name="normal_login"
          className="bg-white shadow-md px-8 pt-0 pb-8 mb-4"
          style={{ borderRadius: "15px" }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          colon={false}
        >
          <img
            src={require("../../assets/img/icon_rm.png")}
            alt="logo"
            className="mx-auto pt-5 pb-5 mb-2 w-40"
          />

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Por favor insira o nome do usuario!",
              },
            ]}
            style={{ width: "90%", margin: "auto" }}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor insira a password!",
              },
            ]}
            style={{ width: "90%", margin: "auto", marginTop: "7%" }}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item className="text-right">
            <a className="mr-4" href="/pass-rest/">
              Esqueci a senha!
            </a>
          </Form.Item>

          <Form.Item style={{ width: "90%", margin: "auto", marginTop: "2%" }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="login-form-button"
              style={{ backgroundColor: "#24C8F4", color: "white" }}
            >
              Log in
            </Button>
          </Form.Item>
          <Form.Item></Form.Item>
        </Form>
    
      </div>
    </div>
  );
}

export default Login