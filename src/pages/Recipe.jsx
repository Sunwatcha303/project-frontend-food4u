import { jsPDF } from "jspdf";
import { useState, useEffect } from "react";
import data from "../data/recipes_data";
import thSarabun from "../assets/font/THSarabunNew";
import "jspdf-autotable";

function Recipe() {
  const [foodName, setFoodName] = useState("");
  const [weight, setWeight] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [calories, setCalories] = useState("");

  const [ingredients] = useState(data.ingredients);

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(foodName.toLowerCase())
  );
  useEffect(() => {
    const ing = filteredIngredients.find((item) => item.name === foodName);
    if (ing) {
      setCalories(ing.caloriePerGram);
    } else {
      setCalories("");
    }
  }, [foodName, filteredIngredients]);

  const handleAddFood = () => {
    if (foodName && weight && calories) {
      const caloriesPerGram = calories;
      const newItem = {
        name: foodName,
        weight: Number(weight),
        calories: caloriesPerGram,
        totalCalories: Number(weight) * caloriesPerGram,
      };
      setFoodItems([...foodItems, newItem]);
      setFoodName("");
      setWeight("");
      setCalories("");
    }
  };

  const handleOnchangeFoodName = (name) => {
    setFoodName(name);
  };

  const handleSearch = (ingredient) => {
    setCalories(ingredient.caloriePerGram);
    setFoodName(ingredient.name);
  };

  const savePDF = () => {
    if (foodItems.length == 0) {
      return;
    }
    const doc = new jsPDF();

    doc.addFileToVFS("THSarabunNew.ttf", thSarabun);
    doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
    doc.setFont("THSarabunNew");

    doc.setFontSize(22);
    doc.text("รายการอาหารแสนอร่อย", 105, 20, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(100);
    doc.text("รวมเมนูพร้อมข้อมูลโภชนาการ", 105, 30, { align: "center" });

    doc.setDrawColor(150);
    doc.line(20, 35, 190, 35);

    const totalWeight = foodItems.reduce((sum, item) => sum + item.weight, 0);
    const totalCalories = foodItems.reduce(
      (sum, item) => sum + item.totalCalories,
      0
    );

    const headers = [["ชื่ออาหาร", "น้ำหนัก (กรัม)", "พลังงาน (แคลอรี่)"]];

    const data = foodItems.map((item) => [
      item.name,
      `${item.weight} g`,
      `${item.totalCalories} kcal`,
    ]);

    data.push(["รวมทั้งหมด", `${totalWeight} g`, `${totalCalories} kcal`]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 40,
      styles: { font: "THSarabunNew", fontSize: 14, cellPadding: 3 },
      headStyles: { fillColor: [255, 140, 0], textColor: 255, fontSize: 16 },
      alternateRowStyles: { fillColor: [255, 235, 205] },
    });

    doc.setFontSize(12);
    doc.setTextColor(120);
    doc.text("สร้างโดย Food4U", 105, doc.internal.pageSize.height - 10, {
      align: "center",
    });

    doc.save("food_items.pdf");
    setFoodItems([]);
  };

  return (
    <div>
      <div className="container py-5">
        <h1 className="text-center mb-5">สูตรอาหาร</h1>

        {/* Calculator Form */}
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">ค้นหาชื่อวัตถุดิบ</label>
                  <input
                    type="text"
                    className="form-control"
                    value={foodName}
                    onChange={(e) => handleOnchangeFoodName(e.target.value)}
                    placeholder="ค้นหาชื่อวัตถุดิบ"
                  />
                  {/* Dropdown for matching ingredients */}
                  {filteredIngredients.length > 0 && (
                    <ul
                      style={{
                        border: "1px solid #ccc",
                        padding: "5px",
                        maxHeight: "200px",
                        overflowY: "auto",
                        marginTop: "5px",
                      }}
                    >
                      {filteredIngredients.map((ingredient) => (
                        <li
                          key={ingredient.id}
                          onClick={() => handleSearch(ingredient)}
                          style={{ padding: "5px", cursor: "pointer" }}
                        >
                          {ingredient.name} - {ingredient.caloriePerGram}{" "}
                          แคลอรี่/กรัม
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">น้ำหนัก (กรัม)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="กรอกน้ำหนัก (กรัม)"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">แคลอรี่/กรัม</label>
                  <input
                    type="number"
                    className="form-control"
                    disabled
                    value={calories}
                  />
                </div>
                <button
                  className="btn w-100 text-white"
                  style={{ backgroundColor: "#87CEEB" }}
                  onClick={handleAddFood}
                >
                  เพิ่ม
                </button>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ชื่อวัตถุดิบ</th>
                        <th>น้ำหนัก (กรัม)</th>
                        <th>แคลอรี่/กรัม</th>
                        <th>แคลอรี่รวม</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foodItems.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.weight}</td>
                          <td>{item.calories}</td>
                          <td>{item.totalCalories}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="card mt-3 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">สรุป</h5>
                  <div>
                    <span className="me-2">แคลอรี่ทั้งหมด:</span>
                    <span className="fw-bold">
                      {foodItems.reduce(
                        (sum, item) => sum + item.totalCalories,
                        0
                      )}
                    </span>
                  </div>
                  <button className="btn btn-primary" onClick={savePDF}>
                    บันทึกเป็น PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
