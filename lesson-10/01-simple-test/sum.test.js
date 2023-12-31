const sum = require("./sum.js");

// const result1 = sum(1, 2);
// if (result1 !== 3) {
//   throw new Error(`Expected 3, but get ${result1}`);
// }

// const result2 = sum(1, -2);
// if (result2 !== -1) {
//   throw new Error(`Expected -1, but get ${result2}`);
// }

// const result3 = sum("1", "-2");
// if (result3 !== -1) {
//   throw new Error(`Expected -1, but get ${result3}`);
// }

// console.log("OK");

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, but get ${actual}`);
      }
    },
  };
}

function describe(text, cb) {
  console.log(text);
  cb();
}

function test(text, cb) {
  console.log(`  ${text}`);
  cb();
}

describe("sum", () => {
  test("1 + 2 should return 3", () => {
    const result = sum(1, 2); // Act
    expect(result).toBe(3); // Assert
  });

  test("1 + (-2) should return -1", () => {
    const result = sum(1, -2); // Act
    expect(result).toBe(-1); // Assert
  });

  test('"1" + "-2" should return -1', () => {
    const result = sum("1", "-2"); // Act
    expect(result).toBe(-1); // Assert
  });

  console.log("OK");
});
