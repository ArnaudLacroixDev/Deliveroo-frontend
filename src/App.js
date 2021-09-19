import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

import deliverooLogo from "./img/Deliveroo_logo.svg";
import popularStar from "./img/popular-star.svg";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  const [cart, setCart] = useState([]);

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
                                  const newCart = [...cart];
                                  newCart.push(meal);
                                  setCart(newCart);
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
                                      <img className="star" src={popularStar} />
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
                cart.map((item, index) => {
                  return <div key={index}>{item.title}</div>;
                })
              ) : (
                <p className="empty-cart">Votre panier est vide</p>
              )}
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
