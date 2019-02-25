import Link from "next/link";
import { authIntialProps } from "../lib/auth";
import Layout from "../components/Layout";

//Index Page
export default function Index(props) {
  return (
    <Layout title="Home" {...props}>
      <Link href="/profile">
        <a>Go To Profile Page</a>
      </Link>
    </Layout>
  );
}

Index.getInitialProps = authIntialProps();
