import React from 'react';
import { generateRandomLightColor } from '../../assets/colors';


const Circle = ({ size, position }) => {
    const styles = {
      width: size,
      height: size,
      backgroundColor: generateRandomLightColor(),
      top: position.top,
      left: position.left,
      right: position.right,
      bottom: position.bottom,
    };
  
    return <div className="circle animate-random-move" style={styles}></div>;
  };
  
  export default Circle;