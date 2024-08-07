const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// Function to parse the SVG path to points
function parseSvgPathToPoints(path, width, height) {
  const commands = path.match(/[a-zA-Z][^a-zA-Z]*/g);
  const points = [];

  let currentPoint = [0, 0];

  for (const command of commands) {
    const type = command[0];
    const values = command.slice(1).trim().split(/[\s,]+/).map(parseFloat);

    switch (type) {
      case 'M':
      case 'L':
        currentPoint = [values[0] / width, values[1] / height];
        points.push(currentPoint);
        break;
      case 'H':
        currentPoint = [values[0] / width, currentPoint[1]];
        points.push(currentPoint);
        break;
      case 'V':
        currentPoint = [currentPoint[0], values[0] / height];
        points.push(currentPoint);
        break;
      case 'Z':
        // Only add the starting point if it's not already the last point
        if (points.length && (points[0][0] !== currentPoint[0] || points[0][1] !== currentPoint[1])) {
          points.push(points[0]);
        }
        break;
      default:
        console.warn(`Unhandled command type: ${type}`);
    }
  }

  return points;
}

// Directory containing the SVG files
const svgDirectory = './svgs';

// Read all SVG files in the directory
fs.readdir(svgDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const polygonPoints = [];

  files.forEach((file) => {
    if (path.extname(file) === '.svg') {
      const filePath = path.join(svgDirectory, file);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }

        xml2js.parseString(data, (err, result) => {
          if (err) {
            console.error('Error parsing XML:', err);
            return;
          }

          const svgWidth = parseFloat(result.svg.$.width);
          const svgHeight = parseFloat(result.svg.$.height);
          const pathData = result.svg.path[0].$.d;

          const points = parseSvgPathToPoints(pathData, svgWidth, svgHeight);
          polygonPoints.push(points);

          // Write to TypeScript file
          const tsContent = `export const POLYGON_POINTS = ${JSON.stringify(polygonPoints, null, 2)};\n`;

          fs.writeFile('./polygonPoints.ts', tsContent, (err) => {
            if (err) {
              console.error('Error writing file:', err);
            } else {
              console.log('polygonPoints.ts file has been saved.');
            }
          });
        });
      });
    }
  });
});
