import { Link } from "react-router";

const PageA = () => {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <Link to={"/login"}>Login</Link>
    </>
  );
};

export default PageA;
