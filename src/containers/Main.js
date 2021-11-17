import "./Main.css";
import Cart from "../components/Cart";

const Main = (props) => {
  const { data, addToCart, popularStar, cart, substractFromCart } = props;

  let { total } = props;

  return (
    <main>
      <div className="main-content-center">
        <div className="main-menu">
          <div>
            {data.categories.map((category, index) => {
              return (
                category.meals.length > 0 && (
                  <div>
                    <h2 key={index}>{category.name}</h2>
                    <div className="main-meal-section">
                      {category.meals.map((meal) => {
                        return (
                          <div
                            className="main-meal-card"
                            onClick={() => {
                              addToCart(meal);
                            }}
                          >
                            <div className="main-meal-card-text">
                              <h3>{meal.title}</h3>
                              <p className="main-meal-card-text-description">
                                {meal.description}
                              </p>
                              <div className="main-price-and-popular">
                                <p>{meal.price.replace(".", ",")} €</p>
                                {meal.popular && (
                                  <span className="main-popularity">
                                    <img
                                      className="main-star"
                                      src={popularStar}
                                      alt="Favorite icon"
                                    />
                                    Populaire
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="main-meal-card-picture">
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
        <Cart
          addToCart={addToCart}
          cart={cart}
          substractFromCart={substractFromCart}
          total={total}
        />
      </div>
    </main>
  );
};

export default Main;
