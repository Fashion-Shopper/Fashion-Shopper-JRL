import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Brands = () => {
  const brands = useSelector((state) => state.brands);

  if (!brands) {
    return <h1>...loading</h1>;
  }

  return (
    <div>
      {brands.map((brand) => (
        <div key={brand.id}>
          <Link to={`/brands/${brand.id}`}>
            <div className="brand">
              <p>{brand.name}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Brands;
