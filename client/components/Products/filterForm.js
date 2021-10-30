import React, { useState } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const FilterForm = (props) => {
  ///////////////////// SECTION: CREATING LIST OF FILTER OPTIONS ///

  //Retrieving lists of brands, categories, sizes
  const brands = Array.from(
    new Set(props.products.map((product) => product.brandName))
  );
  const categories = Array.from(
    new Set(props.products.map((product) => product.category))
  );
  const sizes = Array.from(
    new Set(props.products.map((product) => product.size))
  );
  //Creating object lists of brands, categories, sizes
  const brandList = brands.map((brand) => {
    return {
      id: brands.indexOf(brand),
      type: "brand",
      name: brand,
    };
  });
  const categoryList = categories.map((category) => {
    return {
      id: categories.indexOf(category),
      type: "category",
      name: category,
    };
  });
  const sizeList = sizes.map((size) => {
    return {
      id: sizes.indexOf(size),
      type: "size",
      name: size,
    };
  });
  //Combining object lists & prodiving new id values
  const _filterList = [].concat(brandList, categoryList, sizeList);
  const filterList = _filterList.map((obj) => {
    for (let key in obj) {
      if (key === "id") obj[key] = _filterList.indexOf(obj);
    }
    return obj;
  });

  console.log(filterList);

  ///////////////////// SECTION: CHECKBOX FUNCTIONALIY ///

  //State for checked categories/brands
  const [Checked, setChecked] = useState([]);

  //Handling on/off toggling and changing state accordingly
  const handleToggle = (value) => {
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = (type) =>
    filterList
      .filter((value) => value.type === type)
      .map((value, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={Checked.indexOf(value.id) === -1 ? false : true}
              onChange={() => handleToggle(value.id)}
              name={value.name}
            />
          }
          label={value.name}
        />
      ));

  /////////////////////

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">BRANDS</FormLabel>
          <FormGroup>{renderCheckboxLists("brand")}</FormGroup>
          <FormLabel component="legend">CATEGORIES</FormLabel>
          <FormGroup>{renderCheckboxLists("category")}</FormGroup>
          <FormLabel component="legend">SIZES</FormLabel>
          <FormGroup>{renderCheckboxLists("size")}</FormGroup>
        </FormControl>
      </Box>
    </div>
  );
};

export default FilterForm;
