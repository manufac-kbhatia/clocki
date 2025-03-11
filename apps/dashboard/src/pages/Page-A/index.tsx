import { Link } from "react-router";

const PageA = () => {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/setup-organisation"}>company</Link>
    </>
  );
};

export default PageA;
