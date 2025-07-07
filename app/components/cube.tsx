import React from "react";

export function mixColors(color1: string, color2: string, ratio: number) {
	var rgb1 = hexToArray(color1);
	var rgb2 = hexToArray(color2);

	var newR = cubicInt(ratio, rgb1[0], rgb2[0]);
	var newY = cubicInt(ratio, rgb1[1], rgb2[1]);
	var newB = cubicInt(ratio, rgb1[2], rgb2[2]);

	return arrayToHex([newR, newY, newB]);
}

function hexToArray(hex: string) {
	var hex = hex.replace("#", '');
	var r = parseInt(hex.substr(0, 2), 16);
	var g = parseInt(hex.substr(2, 2), 16);
	var b = parseInt(hex.substr(4, 2), 16);
	return [r, g, b];
}

function cubicInt(t: any, A: any, B: any) {
	var weight = t * t * (3 - 2 * t);
	return A + weight * (B - A);
}

function arrayToHex(rgbArray: any[]) {
	var rHex = Math.round(rgbArray[0]).toString(16);
	rHex = rHex.length == 1 ? "0" + rHex : rHex;
	var gHex = Math.round(rgbArray[1]).toString(16);
	gHex = gHex.length == 1 ? "0" + gHex : gHex;
	var bHex = Math.round(rgbArray[2]).toString(16);
	bHex = bHex.length == 1 ? "0" + bHex : bHex;
	return "#" + rHex + gHex + bHex;
}

export const Cube = ({
  color = '#09d0d0',
  gloom = false,
  inline = false,
  size = 40,
  x = 0,
  y = 0,
  z = 0
}) => {
  return <div className={"cube " + (gloom ? 'gloom' : '')} style={{
    '--color': color,
    '--color-2': mixColors(color, '#000000', 0.3),
    '--x': x ? x + 'px ' : size + 'px',
    '--y': y ? y + 'px ' : size + 'px',
    '--z': z ? z + 'px ' : size + 'px',
    'display': inline ? 'inline-block' : 'block',
    margin: inline ? '-30px 5px 0 5px' : null
  } as React.CSSProperties}>
    <div className="cube-face cube-top"></div>
    <div className="cube-face cube-bottom"></div>
    <div className="cube-face cube-left"></div>
    <div className={"cube-face cube-right" + (gloom ? ' gloom-face' : '')}></div>
    <div className="cube-face cube-front"></div>
    <div className="cube-face cube-back"></div>
  </div>
}