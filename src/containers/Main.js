import "./Main.css";
import Cart from "../components/Cart";
import Meal from "../components/Meal";

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
                          <Meal
                            meal={meal}
                            popularStar={popularStar}
                            addToCart={addToCart}
                          />
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
