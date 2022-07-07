import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Recipes from "./components/Recipes";
import Axios from "axios";
import Loader from "./components/Loader";

function App() {
  const [search, setSerach] = useState("paneer");
  const [recipes, setRecipes] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);

  const APP_ID = "d57e55e2";
  const APP_KEY = "3a59385402d7cd19239e62d958a3fb7e";

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      setIsSpinning(true);
      const res = await Axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      setRecipes(res.data.hits);
      setIsSpinning(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onInputChange = (e) => {
    setSerach(e.target.value);
  };

  const onSearchClick = () => {
    getRecipes();
  };
  return (
    <>
      {isSpinning ? (
        <Loader />
      ) : (
        <div className="App">
          <Header
            search={search}
            onInputChange={onInputChange}
            onSearchClick={onSearchClick}
          />
          <div className="container">
            <Recipes recipes={recipes} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
