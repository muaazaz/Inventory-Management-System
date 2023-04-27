import { Link } from "react-router-dom";
import "./404.css"

const NotFound = () => {
  return (
    <div className="notFound-main">
      <h1>404 Page Not Found</h1>
      <Link to="/">Return back to Home page</Link>
    </div>
  );
};

export default NotFound;
