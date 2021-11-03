if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('D:/act.xlsx');
XLSX.writeFile(workbook, 'D:/111.xlsx');