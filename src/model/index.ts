
// import * as fs from 'fs';
// import * as path from 'path';

// export default async () => {
//   await fs.readdir('./src/models', (err: any, files) => {
//     if (err) {
//       return console.error(err);
//     }
//     files.forEach((file: string) => {
//       if (/model/.test(file)) {
//         // 去后缀
//         require(path.resolve(__dirname, file.slice(0, file.lastIndexOf('.'))));
//       }
//     });
//   });
// };
