#!/usr/bin/env node

const fs = require("fs");
//const util = require("util");
const path = require("path");

// 2 way
// const lstat = util.promisify(fs.lstat);

// 3 way
const { lstat } = fs.promises;
const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    throw new Error(err);
  }
  const statPromise = filenames.map((filename) => {
    return lstat(path.join(targetDir, filename));
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

// 1 way
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
