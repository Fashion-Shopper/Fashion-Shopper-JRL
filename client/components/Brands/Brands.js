import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Brands = () => {
  const brands = useSelector((state) => state.brands);

  if (!brands || brands.length === 0) {
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
