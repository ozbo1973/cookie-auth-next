import axios from "axios";
import { authIntialProps } from "../lib/auth";

import Layout from "../components/Layout";

export default class Profile extends React.Component {
  state = { user: {} };

  async componentDidMount() {
    axios.defaults.withCredentials = true;
    const { data } = await axios.get("/api/profile");
    this.setState({ user: data });
  }

  render() {
    const { user } = this.state;

    return (
      <Layout title="Profile" {...this.props}>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Layout>
    );
  }
}

Profile.getInitialProps = authIntialProps(true);
