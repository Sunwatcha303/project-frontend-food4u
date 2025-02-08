/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card } from "./Card";

export const CardList = ({ recipes }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 8);
      setLoading(false);
    }, 500); // Simulate a loading delay
  };

  return (
    <div className="container my-5">
      <div className="row">
        {recipes.slice(0, visibleCount).map((recipe) => (
          <div key={recipe.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <Card recipe={recipe} />
          </div>
        ))}
      </div>
      {visibleCount < recipes.length && (
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2 mx-auto"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm"></span>
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
};
