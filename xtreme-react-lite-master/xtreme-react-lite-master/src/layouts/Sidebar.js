import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Employees",
    href: "/employelist",
    icon: "bi bi-people",
  },
  {
    title: "Customers List",
    href: "/customerlist",
    icon: "bi bi-person-lines-fill",
  },
  {
    title: "Reclamations",
    href: "/showrec",
    icon: "bi bi-info-circle-fill",
  },
  {
    title: "Retrait",
    href: "/actions",
    icon: "bi bi-box-arrow-in-down-left",
  },
  {
    title: "Versement",
    href: "/actionsverseme",
    icon: "bi bi-escape",
  },
  {
    title: "Virement",
    href: "/actionsvirement",
    icon: "bi bi-arrow-left-right",
  },
  {
    title: "Transactions",
    href: "/transaction",
    icon: "bi bi-grid",
  },

];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
