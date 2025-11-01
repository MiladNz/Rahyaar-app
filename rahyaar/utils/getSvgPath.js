function getSvgPath(svgName) {
  switch (svgName) {
    case "slider1":
      return "@/assets/images/slider1.svg";
    case "slider2":
      return "@/assets/images/slider2.svg";
    case "slider3":
      return "@/assets/images/slider3.svg";
    case "slider4":
      return "@/assets/images/slider4.svg";

    default:
      console.log("svg not found");
  }
}

export default getSvgPath;
