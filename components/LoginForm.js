import Router from "next/router";
import { loginUser } from "../lib/auth";

const Button = ({ isLoading }) => {
  const text = isLoading ? "...Sending" : "Submit";
  return <button disabled={isLoading}>{text}</button>;
};

class LoginForm extends React.Component {
  state = {
    email: "Sincere@april.biz",
    password: "hildegard.org",
    error: null,
    isLoading: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ error: null, isLoading: true });
    const { email, password } = this.state;
    try {
      await loginUser(email, password);
      Router.push("/profile");
    } catch (err) {
      console.log(err);
      const error = (err.response && err.response.data) || err.message;
      this.setState({ error, isLoading: false });
    }
  };

  render() {
    const { email, password, error, isLoading } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <div>
            <input
              onChange={this.handleChange}
              name="email"
              type="email"
              value={email}
              placeholder="email address"
            />
          </div>

          <div>
            <input
              onChange={this.handleChange}
              name="password"
              type="password"
              value={password}
              placeholder="password"
            />
          </div>
          <Button isLoading={isLoading} />
        </div>
        <div>{error}</div>
      </form>
    );
  }
}

export default LoginForm;
