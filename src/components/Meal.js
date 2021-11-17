import "./Meal.css";

const Meal = (props) => {
  const { meal, popularStar, addToCart } = props;

  return (
    <div
      className="meal-card"
      onClick={() => {
        addToCart(meal);
      }}
    >
      <div className="meal-card-text">
        <h3>{meal.title}</h3>
        <p className="meal-card-text-description">{meal.description}</p>
        <div className="meal-price-and-popular">
          <p>{meal.price.replace(".", ",")} €</p>
          {meal.popular && (
            <span className="meal-popularity">
              <img
                className="meal-star"
                src={popularStar}
                alt="Favorite icon"
              />
              Populaire
            </span>
          )}
        </div>
      </div>
      <div className="meal-card-picture">
        {meal.picture && <img src={meal.picture} alt={meal.title} />}
      </div>
    </div>
  );
};

export default Meal;
