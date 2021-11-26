import "./Header.css";
import deliverooLogo from "../img/deliveroo-logo.svg";

const Header = (props) => {
  const { data } = props;

  return (
    <header>
      <div className="header-top-bar">
        <div className="header-top-bar-center">
          <img
            className="header-deliveroo-logo"
            src={deliverooLogo}
            alt="Logo Deliveroo"
          />
        </div>
      </div>
      <div>
        <div className="header-restaurant-info-center">
          <div className="header-restaurant-info-texts">
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img
            className="header-restaurant-info-cover"
            src={data.restaurant.picture}
            alt="restaurant cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
