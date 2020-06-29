import {Component, OnInit, ViewChild} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {environment} from '../../../environments/environment.prod';
import {VehiculoService} from '../vehiculo.service';
import {ExcelService} from '../../services/excel.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-vehiculo-index',
  templateUrl: './vehiculo-index.component.html',
  styleUrls: ['./vehiculo-index.component.css']
})
export class VehiculoIndexComponent implements OnInit {

  list: any = [];
  environment = environment;
  vehiculos: MatTableDataSource<any[]>;

  displayedColumns = [
    'placa',
    'marca',
    'modelo',
    'color',
    'cilindrada',
    'gestion',
    'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private vehiculoService: VehiculoService,
    private dialog: MatDialog,
    private excelService: ExcelService
  ) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.vehiculos.filter = filterValue;
  }

  ngOnInit() {
    this.vehiculoService.index().subscribe(res => { 
      this.list = res;
      this.vehiculos = new MatTableDataSource(this.list);
      this.vehiculos.sort = this.sort;
      this.vehiculos.paginator = this.paginator;
    });
  }

  openDialog(id, index) {
    const dialogRef = this.dialog.open(MensajeDialogComponent, {
      width: '450px',
      data: {
        info: '¿Esta seguro de eliminar el vehiculo?',
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
    this.vehiculoService.destroy(id).subscribe(res => {
      this.list.splice(index, 1);
      this.vehiculos.data = this.list;
      this.vehiculos.sort = this.sort;
      this.vehiculos.paginator = this.paginator;
      console.log(res);
    });
  }

  exportExcel() {
    const lista = this.list.map((item, index) => {
      return {
        n: index + 1,
        placa: item.placa,
        marca: item.marca,
        modelo: item.modelo,
        color: item.color,
        cilindrada: item.cilindrada,
        gestion: item.gestion
      };
    });
    this.excelService.exportarExcel(lista, 'vehiculos');
  }
}
