const fs = require ('fs')
const fileData = JSON.parse(fs.readFileSync('./sample.txt'))
fileData.push({
    "name": "abc",
    "age": 22,
    "city": "LA"
  })

  fs.writeFileSync('sample.txt', JSON.stringify(fileData, null, 2));
