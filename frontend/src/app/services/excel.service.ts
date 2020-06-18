import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

const CSV_TYPE = 'text/csv;charset=UTF-8';
const CSV_EXTENSION = '.csv';

@Injectable()
export class ExcelService {
  constructor() {
  }

  public exportarExcel(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {Sheets: {datos: worksheet}, SheetNames: ['datos']};
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.guardarExcel(excelBuffer, excelFileName);
  }

  public exportarCSV(json: any[], fileName: string): void {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(json[0]);
    const csv = json.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\n');
    const date = new Date();
    const dateString = '_' + date.getDate() + '_' + (date.getMonth() + 1) + `_${date.getFullYear()} ${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
    const blob = new Blob([csvArray], {type: CSV_TYPE});
    FileSaver.saveAs(blob, fileName + dateString + CSV_EXTENSION);
  }


  private guardarExcel(buffer: any, fileName: string): void {
    const date = new Date();
    const dateString = ' ' + date.getDate() + '_' + (date.getMonth() + 1) + `_${date.getFullYear()} ${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + dateString + EXCEL_EXTENSION);
  }
}
