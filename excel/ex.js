const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();

async function ss() {
  await workbook.xlsx.readFile('D:/act.xlsx');
  //console.log(workbook['_worksheets'][1]['_rows'][0]['_cells'][0]['_value']['value']);
  await workbook.xlsx.writeFile('D:/111.xlsx');
}

// let arr = []

// ss().then(data => {
//   for(let i = 0; i < workbook['_worksheets'][1]['_rows'].length; i++) {
//     if(workbook['_worksheets'][1]['_rows'][i] !== undefined) {
//       for(let b = 0; b < workbook['_worksheets'][1]['_rows'][i]['_cells'].length; b++) {
//         if(workbook['_worksheets'][1]['_rows'][i]['_cells'][b] !== undefined) {
//           console.log(workbook['_worksheets'][1]['_rows'][i]['_cells'][b]['_value']['value']);
//         }
//       }
//     } 
//   }

  
// })

ss().then(data => {
  console.log('ok');
})