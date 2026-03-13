export const getViewBox = (pathData: string | string[], customViewBox?: string): string => {
    if (customViewBox) return customViewBox;
  
    const paths = Array.isArray(pathData) ? pathData : [pathData];
    let minX = 0, minY = 0, maxX = 0, maxY = 0;
    let hasCoordinates = false;
  
    paths.forEach(path => {
      const numbers = path.match(/-?\d+(\.\d+)?/g)?.map(Number) || [];
      for (let i = 0; i < numbers.length; i += 2) {
        const x = numbers[i];
        const y = numbers[i + 1];
        if (!hasCoordinates) {
          minX = maxX = x;
          minY = maxY = y;
          hasCoordinates = true;
        } else {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    });
  
    if (!hasCoordinates) return "0 0 0 0";
  
    return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
  };