import { useParams } from "react-router-dom";
import data from "../data/recipes_data";
import { FaArrowLeft } from "react-icons/fa"; // Importing a left arrow icon for the back button

function Board() {
  const { id } = useParams();

  const recipe = data.recipes.find((item) => item.id == parseInt(id));

  if (!recipe) {
    return <h2 className="text-center my-5">ไม่พบสูตรอาหาร</h2>;
  }

  return (
    <div className="recipe-detail container py-5">
      <div className="d-flex align-items-center mb-4">
        <button
          className="btn btn-link text-primary"
          onClick={() => window.history.back()}
        >
          <FaArrowLeft size={20} className="me-2" /> กลับ
        </button>
      </div>

      <div className="text-center">
        <div className="fw-bold mb-4" style={{ fontSize: "3rem" }}>
          {recipe.title}
        </div>
        <div className="">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="img-fluid rounded shadow-lg mb-4"
            style={{ width: "100%", height: "auto", maxHeight: "100%" }}
          />
        </div>
      </div>

      <div className="" style={{ width: "100%" }}>
        <div className="card shadow-sm p-4">
          <h4 className="text-uppercase fw-bold mb-3">วัตถุดิบและส่วนประกอบ</h4>
          <ul className="list-unstyled">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="mb-2 d-flex align-items-center">
                <span className="badge bg-info text-white me-2">•</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <div className="col-md-12">
          <div className="card shadow-sm p-4">
            <h4 className="text-uppercase fw-bold mb-3">วิธีทำ</h4>
            <ol className="ps-4">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="mb-2">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
