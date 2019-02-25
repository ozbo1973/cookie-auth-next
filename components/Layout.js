import Link from "next/link";
import { logoutUser } from "../lib/auth";

const Layout = ({ children, title, auth }) => {
  const { user = {} } = auth || {};

  return (
    <div className="root">
      <div className="navbar">
        <span>
          Welcome, <strong>{user.name || "Guest"}</strong>
        </span>
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>

          {renderByLogin(user)}
        </div>
      </div>

      <h1>{title}</h1>
      {children}

      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .navbar {
          display: flex;
          justify-content: space-around;
          width: 100%;
          margin-bottom: 1em;
        }

        a {
          margin-right: 0.5em;
        }
      `}</style>
    </div>
  );
};

const renderByLogin = user => {
  if (user.email) {
    return (
      <React.Fragment>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
        <button onClick={logoutUser}>Logout</button>
        <style jsx>{`
          button {
            text-decoration: underline;
            font: inherit;
            background-color: transparent;
            color: rgb(0, 0, 238);
            border-style: none;
            padding: 0;
            cursor: pointer;
            margin: 0 0.5em;
          }
        `}</style>
      </React.Fragment>
    );
  }

  return (
    <Link href="/login">
      <a>Login</a>
    </Link>
  );
};

export default Layout;
