import { useState } from "react";

export default function CrystalAlchemy() {
  const [crystals, setCrystals] = useState([
    { id: 1, name: "Овалин", color: "green", shape: "circle", pos: { x: 50, y: 50 } },
    { id: 2, name: "Квадранит", color: "blue", shape: "square", pos: { x: 200, y: 50 } },
    { id: 3, name: "Трегонис", color: "red", shape: "square", pos: { x: 350, y: 50 } },
  ]);

  const [draggedCrystal, setDraggedCrystal] = useState(null);

  const handleDragStart = (e, crystal) => {
    setDraggedCrystal(crystal);
  };

  const handleDrop = (e, targetCrystal) => {
    e.preventDefault();
    if (!draggedCrystal || draggedCrystal.id === targetCrystal.id) return;

    // Имитация комбинации (например, объединение названий)
    const newCrystal = {
      id: Date.now(),
      name: `${draggedCrystal.name} + ${targetCrystal.name}`,
      color: "purple",
      shape: "diamond",
      pos: targetCrystal.pos,
    };

    setCrystals((prev) =>
      prev
        .filter((c) => c.id !== draggedCrystal.id && c.id !== targetCrystal.id)
        .concat(newCrystal)
    );

    setDraggedCrystal(null);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div style={{ textAlign: "center", paddingTop: "20px" }}>
      <h2>Кристаллический алхимик</h2>
      <div
        style={{
          width: "600px",
          height: "400px",
          border: "2px solid black",
          margin: "auto",
          position: "relative",
          backgroundColor: "#f0f0f0",
        }}
      >
        {crystals.map((crystal) => (
          <div
            key={crystal.id}
            draggable
            onDragStart={(e) => handleDragStart(e, crystal)}
            onDrop={(e) => handleDrop(e, crystal)}
            onDragOver={handleDragOver}
            style={{
              position: "absolute",
              left: crystal.pos.x,
              top: crystal.pos.y,
              width: "80px",
              height: "80px",
              backgroundColor: crystal.color,
              borderRadius: crystal.shape === "circle" ? "50%" : "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              cursor: "grab",
            }}
          >
            {crystal.name}
          </div>
        ))}
      </div>
    </div>
  );
}
