import "./Main.css";

const Main = (props) => {
  const { data, addToCart, popularStar, cart, substractFromCart } = props;

  let { total } = props;

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
        <div className="main-cart">
          {cart.length > 0 ? (
            <input
              className="main-cart-validate-enabled"
              type="button"
              value="Valider mon panier"
            />
          ) : (
            <input
              className="main-cart-validate-disabled"
              type="button"
              value="Valider mon panier"
            />
          )}
          <div className="main-cart-list">
            {cart.length > 0 ? (
              cart.map((product, index) => {
                total += product.quantity * product.price;

                return (
                  <div>
                    <div className="main-cart-item">
                      <div className="main-cart-counter">
                        <button
                          className="main-add-remove-icons"
                          onClick={() => {
                            substractFromCart(product);
                          }}
                        >
                          {minusIcon}
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          className="main-add-remove-icons"
                          onClick={() => {
                            addToCart(product);
                          }}
                        >
                          {plusIcon}
                        </button>
                      </div>
                      <span className="main-cart-product">{product.title}</span>
                      <span className="main-cart-amount">
                        {product.price} €/u
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="main-empty-cart">Votre panier est vide</p>
            )}
          </div>
          <div className="main-total-line">
            <span>TOTAL</span>
            <span>{total.toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
