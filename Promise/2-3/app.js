const { readFile, writeFile } = require("fs/promises");

readFile("./names.txt")
  .then((data) => {
    let namesData = [];
    let persons = data.toString().split("\r\n");

    for (const person of persons) {
      namesData.push(person.split(" - "));
    }
    readFile("./numbers.txt")
      .then((data) => {
        let numbersData = [];
        let numbers = data.toString().split("\r\n");
        for (const number of numbers) {
          numbersData.push(number.split(" - "));
        }
        let mergedData = [];
        for (const [key, name] of namesData) {
          mergedData.push(
            new Set(
              numbersData
                .map(([key2, number]) => {
                  if (key === key2) {
                    return [name, number];
                  }
                  return name;
                })
                .flat()
            )
          );
        }
        let final = mergedData
          .map((person) => {
            person = Array.from(person);
            if (person.length === 1) {
              return `${person[0]} hasn't any phone number.\n`;
            } else if (person.length === 2) {
              return `${person[0]}'s phone number is: ${person[1]}\n`;
            } else {
              return `${person[0]}'s phone numbers are: ${person
                .splice(1)
                .join(", ")}\n`;
            }
          })
          .join("");
        return writeFile("./result.txt", final);
      })
      .then(() => {
        console.log("successfull!");
      })
      .catch((err) => {
        console.log(err.message);
      });
  })
  .catch((err) => {
    console.log(err.message);
  });
