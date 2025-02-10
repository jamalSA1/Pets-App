import React from "react";
import { Redirect } from "expo-router";

const index = () => {
  return (
    <Redirect href="/(public)/sign-in" />
  );
};

export default index;

