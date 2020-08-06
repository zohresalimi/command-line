#!/usr/bin/env node

const fs = require("fs");
const util = require("util");

// const lstat = util.promisify(fs.lstat);
const { lstat } = fs.promises;

fs.readdir(process.cwd(), async (err, filenames) => {
  if (err) {
    throw new Error(err);
  }
  const statPromise = filenames.map((filename) => {
    return lstat(filename);
  });

  const allStats = await Promise.all(statPromise);
  for (let stats of allStats) {
    const index = allStats.indexOf(stats);
    if (stats.isFile()) {
      console.log("\x1b[33m%s\x1b[0m", filenames[index]);
    } else {
      console.log("\x1b[35m%s\x1b[0m", filenames[index]);
    }
  }
});

// const lstat = (filename) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(stats);
//     });
//   });
// };
