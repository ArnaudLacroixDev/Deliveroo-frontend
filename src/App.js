import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

import deliverooLogo from "./img/Deliveroo_logo.svg";
import popularStar from "./img/popular-star.svg";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  const [cart, setCart] = useState([]);

  const addToCart = (meal) => {
    const newCart = [...cart];

    const exist = newCart.find((elem) => elem.id === meal.id);

    if (exist) {
      exist.quantity++;
      setCart(newCart);
    } else {
      meal.quantity = 1;
      newCart.push(meal);
      setCart(newCart);
    }
  };

  const substractFromCart = (meal) => {
    const newCart = [...cart];
    const exist = newCart.find((elem) => elem.id === meal.id);
    if (exist.quantity === 1) {
      const index = newCart.indexOf(exist);
      newCart.splice(index, 1);
    } else {
      exist.quantity--;
    }
    setCart(newCart);
  };

  let total = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://deliveroo-like-backend.herokuapp.com/"
        );
        console.log(response.data);
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const minusIcon = (
    <svg
      height="18"
      width="18"
      viewBox="0 0 24 24"
      className="add-remove-icons"
    >
      <path d="M12 2C17.5228 2 22 6.47725 22 12C22 17.5228 17.5228 22 12 22C6.47717 22 2 17.5228 2 12C2 6.47725 6.47717 2 12 2ZM12 20C16.4113 20 20 16.4113 20 12C20 7.58875 16.4113 4 12 4C7.58875 4 4 7.58875 4 12C4 16.4113 7.58875 20 12 20ZM7 13.5V10.5H17V13.5H7Z"></path>
    </svg>
  );

  const plusIcon = (
    <svg
      height="18"
      width="18"
      viewBox="0 0 24 24"
      className="add-remove-icons"
    >
      <path d="M12 2C17.5228 2 22 6.47725 22 12C22 17.5228 17.5228 22 12 22C6.47717 22 2 17.5228 2 12C2 6.47725 6.47717 2 12 2ZM12 20C16.4113 20 20 16.4113 20 12C20 7.58875 16.4113 4 12 4C7.58875 4 4 7.58875 4 12C4 16.4113 7.58875 20 12 20ZM13.5 7V10.4999H17V13.5H13.5V17H10.5V13.5H7V10.4999H10.5V7H13.5Z"></path>
    </svg>
  );

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div>
      {/*--------------------------------------HEADER------------------------------------- */}
      <div>
        <div className="top-bar">
          <div className="top-bar-center">
            <img
              className="deliveroo-logo"
              src={deliverooLogo}
              alt="Logo Deliveroo"
            />
          </div>
        </div>
        <div>
          <div className="restaurant-info-center">
            <div className="restaurant-info-texts">
              <h1>{data.restaurant.name}</h1>
              <p>{data.restaurant.description}</p>
            </div>
            <img
              className="restaurant-info-cover"
              src={data.restaurant.picture}
              alt="restaurant cover"
            />
          </div>
        </div>
      </div>
      {/*--------------------------------------BODY------------------------------------- */}
      <div className="main">
        <div className="content-center">
          <div className="menu">
            <div>
              {data.categories.map((category, index) => {
                return (
                  category.meals.length > 0 && (
                    <div>
                      <h2 key={index}>{category.name}</h2>
                      <div className="meal-section">
                        {category.meals.map((meal) => {
                          return (
                            <div className="meal-card">
                              <div
                                className="meal-card-text"
                                onClick={() => {
                                  addToCart(meal);
                                }}
                              >
                                <h3>{meal.title}</h3>
                                <p className="meal-card-text-description">
                                  {meal.description}
                                </p>
                                <div className="price-and-popular">
                                  <p>{meal.price.replace(".", ",")} €</p>
                                  {meal.popular && (
                                    <span className="popularity">
                                      <img
                                        className="star"
                                        src={popularStar}
                                        alt="Favorite icon"
                                      />
                                      Populaire
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="meal-card-picture">
                                {meal.picture && (
                                  <img src={meal.picture} alt={meal.title} />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
          <div className="cart">
            {cart.length > 0 ? (
              <input
                className="cart-validate-enabled"
                type="button"
                value="Valider mon panier"
              />
            ) : (
              <input
                className="cart-validate-disabled"
                type="button"
                value="Valider mon panier"
              />
            )}
            <div className="cart-list">
              {cart.length > 0 ? (
                cart.map((product, index) => {
                  total += product.quantity * product.price;

                  return (
                    <div>
                      <div className="cart-item">
                        <div className="cart-counter">
                          <button
                            onClick={() => {
                              substractFromCart(product);
                            }}
                          >
                            {minusIcon}
                          </button>
                          <span>{product.quantity}</span>
                          <button
                            onClick={() => {
                              addToCart(product);
                            }}
                          >
                            {plusIcon}
                          </button>
                        </div>
                        <span className="cart-product">{product.title}</span>
                        <span className="cart-amount">{product.price} €</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="empty-cart">Votre panier est vide</p>
              )}
            </div>
            <div className="total-line">
              <span>TOTAL</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>
      {/*--------------------------------------FOOTER------------------------------------- */}
      <div className="footer"></div>
    </div>
  );
}

export default App;
