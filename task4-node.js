const fs = require("fs");
const { exec } = require("child_process");

fs.writeFile("newFile2.txt", "arbitrary content", (err) => {
  if (err) {
    throw err;
  }

  exec("ls", (err, stdout, stderr) => {
    if (err) {
      throw err;
    }

    const outputString = stdout.trim().split("\n").join(", ");

    console.log(outputString);
  });
});
