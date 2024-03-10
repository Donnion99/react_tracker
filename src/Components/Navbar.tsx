import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./Shadui/ui/navigation-menu";

import { navigationMenuTriggerStyle } from "./Shadui/ui/navigation-menu";

function Navbar() {
  const [logins, setlogins] = useState<string>("");
  useEffect(() => {
    const login = localStorage.getItem("login-state");
    if (login !== null) {
      setlogins(login);
    }
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            SpendWise
          </a>
          <NavigationMenu className="mt-2 ">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {logins != '"True"' ? (
                <>
                  {" "}
                  <NavigationMenuItem>
                    <Link to="/signup">
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Signup
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Login
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Link to="/transactions">
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Transactions
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/logout">
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Logout
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
            {/* <NavigationMenuLink>Welcome!</NavigationMenuLink> */}
          </NavigationMenu>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
