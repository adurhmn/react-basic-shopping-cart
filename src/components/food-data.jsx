import React from "react";

const rawData = [
  { name: "Shawarma", desc: "Extra spicy classic shwarma", price: 120 },
  { name: "Chicken Rice", desc: "Spicy fried rice", price: 100 },
  { name: "Chicken Noodles", desc: "Tasty chicken noodles", price: 100 },
  { name: "Chicken Biryani", desc: "Top notch classic biryani", price: 120 },
  { name: "Beaf Biryani", desc: "Top notch classic biryani", price: 140 },
  { name: "Mutton Biryani", desc: "Top notch classic biryani", price: 160 },
  { name: "Chilli Parotta", desc: "Spicy fast food", price: 100 },
].map((food, ind) => ({ ...food, id: ind + 1 }));

const foodMenu = {};

rawData.forEach((food, ind) => {
  foodMenu[ind + 1] = food;
});

const FoodData = React.createContext(foodMenu);
export default FoodData;
