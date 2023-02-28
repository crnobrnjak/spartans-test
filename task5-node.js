const https = require("https");

https
  .get("https://reqres.in/api/users?page=2", (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const users = JSON.parse(data).data;

      const allFirstNames = users.reduce(
        (precedingNames, user) =>
          (precedingNames && precedingNames + ", ") + user.first_name,
        ""
      );

      console.log(allFirstNames);
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });
