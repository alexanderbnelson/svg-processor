# SVG Path to Points Converter

This repository contains a Node.js script that processes SVG files, extracts path data, normalizes the coordinates, and formats them into a TypeScript array. The output is a TypeScript file that exports these points for further use.

## Features

- Reads SVG files from a specified directory.
- Extracts path data from each SVG file.
- Normalizes the path coordinates to percentages based on the SVG's width and height.
- Formats the normalized points into a TypeScript array.
- Saves the formatted points to a TypeScript file (`polygonPoints.ts`).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/svg-path-to-points-converter.git
   cd svg-path-to-points-converter
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Place your SVG files in the `svgs` directory.

2. Run the script:

   ```bash
   node process-svgs.js
   ```

3. The script will read all SVG files in the `svgs` directory, process the path data, normalize the coordinates, and write the result to `polygonPoints.ts`.

## Example

Given an SVG file with the following content:

```xml
<svg width="555" height="428" viewBox="0 0 555 428" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M555 0L0 117.989V428H555V0Z" fill="#CAD0D8"/>
</svg>
```

The script will produce the following TypeScript output in `polygonPoints.ts`:

```typescript
export const POLYGON_POINTS = [
  [
    [1, 0],
    [0, 0.2758],
    [0, 1],
    [1, 1],
    [1, 0],
  ],
  // ... more polygon points
];
```

## Project Structure

- `svgs/`: Directory to place your SVG files.
- `process-svgs.js`: Node.js script to process SVG files.
- `polygonPoints.ts`: Output TypeScript file with normalized polygon points.

## Dependencies

- `fs`: Node.js file system module.
- `path`: Node.js path module.
- `xml2js`: XML to JavaScript object converter.

Install the dependencies using:

```bash
npm install
```

## Contributing

Feel free to open issues or submit pull requests if you find any bugs or have suggestions for improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
