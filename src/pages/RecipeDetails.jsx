import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function RecipeDetails() {
  const { id } = useParams()

  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => response.json())
      .then(data => {
        setMeal(data.meals?.[0] || null)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }, [id])

  if (loading) return <h2>Loading recipe...</h2>

  if (!meal) return <h2>Recipe not found.</h2>

  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure || ''} ${ingredient}`)
    }
  }

  return (
    <div className="container">

      <Link to="/">← Back to Recipes</Link>

      <h1>{meal.strMeal}</h1>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: '100%', maxWidth: '450px', borderRadius: '12px' }}
      />

      <h3>Category: {meal.strCategory}</h3>
      <h3>Country: {meal.strArea}</h3>

      <h2>Ingredients</h2>

      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2>Cooking Instructions</h2>

      <p style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
        {meal.strInstructions}
      </p>

      {meal.strYoutube && (
        <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
          Watch Recipe Video
        </a>
      )}

    </div>
  )
}

export default RecipeDetails