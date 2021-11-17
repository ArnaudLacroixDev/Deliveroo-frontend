import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

import popularStar from "./img/popular-star.svg";

import Loader from "./components/Loader";
import Header from "./components/Header";
import Main from "./components/Main";

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

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <Header data={data} />
      <Main
        data={data}
        addToCart={addToCart}
        popularStar={popularStar}
        cart={cart}
        total={total}
        substractFromCart={substractFromCart}
      />
    </div>
  );
}

export default App;
