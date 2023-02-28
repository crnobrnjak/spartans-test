const array = ["x:1", "y:2", "x:3", "a:15"];

let elementSums = {};

for (const element of array) {
  const propertyName = element.split(":")[0];
  const propertyValue = parseInt(element.split(":")[1]);

  elementSums[propertyName] = (elementSums[propertyName] ?? 0) + propertyValue;
}

const elementKeys = Object.keys(elementSums).sort();

let outputString = "";

for (const key of elementKeys) {
  const notAtLastKey =
    elementKeys.findIndex((_key) => _key === key) !== elementKeys.length - 1;

  outputString =
    outputString + `${key}=${elementSums[key]}` + (notAtLastKey ? ", " : "");
}

console.log(outputString);
