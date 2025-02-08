import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Calculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [calories, setCalories] = useState(null);

  const calculateCalories = (e) => {
    e.preventDefault();

    let bmr;
    if (gender === "male") {
      bmr = 66 + 13.7 * Number(weight) + 5 * Number(height) - 6.8 * Number(age);
    } else {
      bmr =
        655 + 9.6 * Number(weight) + 1.8 * Number(height) - 4.7 * Number(age);
    }

    setCalories(Math.round(bmr));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0 p-4 rounded-lg">
            <h2 className="text-center mb-4 text-primary">คำนวณแคลอรี่</h2>
            <form onSubmit={calculateCalories}>
              <div className="mb-3">
                <label className="form-label">น้ำหนัก (kg)</label>
                <input
                  type="number"
                  className="form-control"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ส่วนสูง (cm)</label>
                <input
                  type="number"
                  className="form-control"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">อายุ (ปี)</label>
                <input
                  type="number"
                  className="form-control"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">เพศ</label>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="male"
                    name="gender"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                  />
                  <label className="form-check-label" htmlFor="male">
                    ชาย
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="female"
                    name="gender"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                  <label className="form-check-label" htmlFor="female">
                    หญิง
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100 py-2 mt-3">
                คำนวณ
              </button>
            </form>

            {calories && (
              <div className="mt-4 text-center">
                <h4 className="text-success">ผลการคำนวณ</h4>
                <p className="h5">
                  คุณต้องการพลังงาน {calories} แคลอรี่ต่อวัน
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
