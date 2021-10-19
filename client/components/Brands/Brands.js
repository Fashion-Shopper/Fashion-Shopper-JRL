import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//import {}

const Brands = () => {
  const brands = useSelector((state) => state.brands);

  if (!brands) {
    return <CircularProgress />;
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
