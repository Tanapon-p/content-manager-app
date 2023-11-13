import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isClick, setIsClick] = useState(false);

  function handleClick() {
    setIsClick(!isClick);
  }
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link legacyBehavior href="/">
            <a className="navbar-item">
              <h1>Content Manager</h1>
            </a>
          </Link>
          <span
            onClick={handleClick}
            className={`navbar-burger burger ${isClick ? "is-active" : ""}`}
            data-target="navbarMenu"
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div
          id="navbarMenu"
          className={`navbar-menu ${isClick ? "is-active" : ""}`}
        >
          <div className="navbar-end">
            <div className=" navbar-item">
              <div className="control has-icons-left"></div>
            </div>
            <Link legacyBehavior href="/">
              <a className="navbar-item is-active is-size-5 has-text-weight-semibold">
                Home
              </a>
            </Link>

            <Link legacyBehavior href="/resources/new">
              <a className="navbar-item is-size-5 has-text-weight-semibold">
                Add
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
