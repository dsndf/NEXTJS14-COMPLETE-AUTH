import React from "react";
import { Button } from "@nextui-org/button";
console.log(process.env.JWT_TOKEN_SECRET);
const Home = () => {
  
  return <div>Hii {process.env.JWT_TOKEN_SECRET} <a href="/hii" target="_blank">A</a></div>;
};

export default Home;
