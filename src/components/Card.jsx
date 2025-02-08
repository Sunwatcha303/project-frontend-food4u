/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

export const Card = ({ recipe }) => {
  return (
    <div className="card shadow-sm rounded-lg overflow-hidden recipe-card ">
      <Link to={`/board/${recipe.id}`} className="text-decoration-none">
        <img 
          src={recipe.image} 
          className="card-img-top recipe-image" 
          alt={recipe.title} 
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text text-muted">{recipe.description}</p>
        </div>
      </Link>
    </div>
  );
};
