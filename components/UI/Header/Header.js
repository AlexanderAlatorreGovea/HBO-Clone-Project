import Account from "../Account/Account";
import SearchModal from "../SearchModal/SearchModal";
import { useStateContext } from "../../HBOProvider";
import Link from "next/link";

const Header = (props) => {
  const globalState = useStateContext();
 
  return (
    <header
      className={`top-header ${
        globalState.accountModalOpen || globalState.sideNavOpen
          ? "top-header--menu-open"
          : ""
      }`}
    >
      <div className="top-header__left-side">
        <div
          onClick={() => {
            globalState.setSideNavOpenAction(true);
            globalState.setAccountModalOpenAction(false)
          }}
          className="top-header__menu-btn"
        >
          <i className="fas fa-bars" />
        </div>
        <div
          className="top-header__search-btn"
          onClick={() => globalState.searchOpenAction(true)}
        >
          <i className="fas fa-search" />
        </div>
      </div>
        <a href="/">
          <div className="top-header__logo"></div>
        </a>
      <div
        className="top-header__account"
        onClick={() => {
          globalState.setAccountModalOpenAction(!globalState.accountModalOpen);
          globalState.setSideNavOpenAction(false);
        }}
      >
        <img
          src="https://uifaces.co/our-content/donated/vIqzOHXj.jpg"
          className="top-header__user-img"
        />
        <div className="top-header__user-name">Bryant</div>
      </div>
      <Account />
      <SearchModal />
    </header>
  );
};

export default Header;
