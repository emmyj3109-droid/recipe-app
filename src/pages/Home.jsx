import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken')
      .then(response => response.json())
      .then(data => {
        setMeals(data.meals || [])
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container">
      <h1>Chicken Recipe App</h1>
      <p>Discover delicious chicken recipes from around the world.</p>

      {loading ? (
        <h2>Loading recipes...</h2>
      ) : (
        <div className="recipe-container">
          {meals.map(meal => (
            <div className="recipe-card" key={meal.idMeal}>

              <img src={meal.strMealThumb} alt={meal.strMeal} />

              <h2>{meal.strMeal}</h2>

              <p>Category: {meal.strCategory}</p>

              <Link to={`/recipe/${meal.idMeal}`}>
                <button>View Details</button>
              </Link>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home