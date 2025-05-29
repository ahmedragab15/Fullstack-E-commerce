import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <ul>
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/products"}>Products</Link>
    </ul>
  )
}

export default Navbar