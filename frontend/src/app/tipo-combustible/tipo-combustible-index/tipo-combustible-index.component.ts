import {Component, OnInit, ViewChild} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {environment} from '../../../environments/environment.prod';
import {ExcelService} from '../../services/excel.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {TipoCombustibleService} from "../tipo-combustible.service";

@Component({
  selector: 'app-tipo-combustible-index',
  templateUrl: './tipo-combustible-index.component.html',
  styleUrls: ['./tipo-combustible-index.component.css']
})
export class TipoCombustibleIndexComponent implements OnInit {
  list: any = [];
  environment = environment;
  tipoCombustible: MatTableDataSource<any>;

  displayedColumns = ['nombre',
    'importe',
    'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private tipoCombustibleService: TipoCombustibleService,
    private dialog: MatDialog,
    private excelService: ExcelService
  ) {
    this.tipoCombustibleService.index().subscribe(res => {
      this.list = res;
      this.tipoCombustible = new MatTableDataSource(this.list);
      this.tipoCombustible.sort = this.sort;
      this.tipoCombustible.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.tipoCombustible.filter = filterValue;
  }

  ngOnInit() {
  }

  openDialog(id, index) {
    const dialogRef = this.dialog.open(MensajeDialogComponent, {
      width: '450px',
      data: {
        info: 'Esta seguro de eliminar el tipo de combustible?',
        has_action: true
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.destroy(id, index);
      }
    });
  }

  destroy(id, index) {
    this.tipoCombustibleService.destroy(id).subscribe(res => {
      this.list.splice(index, 1);
      this.tipoCombustible.data = this.list;
      this.tipoCombustible.sort = this.sort;
      this.tipoCombustible.paginator = this.paginator;
      console.log(res);
    });
  }

  exportExcel() {
    const lista = this.list.map((item, index) => {
      return {
        n: index + 1,
        nombres: item.nombres,
        apellidos: item.apellidos,
        carnet: item.carnet,
        tipo: item.tipo,
        fecha_inicio_contrato: new Date(item.fecha_inicio_contrato),
        fecha_fin_contrato: new Date(item.fecha_fin_contrato)
      };
    });
    this.excelService.exportarExcel(lista, 'tipoCombustible');
  }

}
