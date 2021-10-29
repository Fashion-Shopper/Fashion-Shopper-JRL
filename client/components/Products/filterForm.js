import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;

const FilterForm = (props) => {
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
      brand: brand,
    };
  });
  const categoryList = categories.map((category) => {
    return {
      id: categories.indexOf(category),
      category: category,
    };
  });
  const sizeList = sizes.map((size) => {
    return {
      id: sizes.indexOf(size),
      size: size,
    };
  });
  //Combining object lists & prodiving new id values
  const _combinedList = [].concat(brandList, categoryList, sizeList);
  const combinedList = _combinedList.map((obj) => {
    for (let key in obj) {
      if (key === "id") obj[key] = _combinedList.indexOf(obj);
    }
    return obj;
  });

  console.log(combinedList);

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

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          type="checkbox"
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        {/* &nbsp;&nbsp; */}
        <span>{value.name}</span>
        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
};

export default FilterForm;
