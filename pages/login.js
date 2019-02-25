import { authIntialProps } from "../lib/auth";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";

export default function Login(props) {
  return (
    <Layout title="Login" {...props}>
      <LoginForm />
    </Layout>
  );
}

Login.getInitialProps = authIntialProps();
