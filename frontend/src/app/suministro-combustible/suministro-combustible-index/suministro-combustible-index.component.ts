import {Component, OnInit, ViewChild} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {environment} from '../../../environments/environment.prod';
import {ExcelService} from '../../services/excel.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {VehiculoService} from '../../vehiculo/vehiculo.service';
import {SuministroCombustibleService} from '../suministro-combustible.service';

@Component({
  selector: 'app-suministro-combustible-index',
  templateUrl: './suministro-combustible-index.component.html',
  styleUrls: ['./suministro-combustible-index.component.css']
})
export class SuministroCombustibleIndexComponent implements OnInit {

  list: any = [];
  environment = environment;
  suministroCombustibles: MatTableDataSource<any[]>;

  displayedColumns = [
    'tipo_vehiculo',
    'placa',
    'marca',
    'combustible',
    'acciones'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private suministroCombustibleservice: SuministroCombustibleService,
    private vehiculoService: VehiculoService,
    private dialog: MatDialog,
    private excelService: ExcelService
  ) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.suministroCombustibles.filter = filterValue;
  }

  ngOnInit() {
    this.suministroCombustibleservice.index().subscribe(res => {
      this.list = res;
      this.suministroCombustibles = new MatTableDataSource(this.list);
      this.suministroCombustibles.sort = this.sort;
      this.suministroCombustibles.paginator = this.paginator;
    });
  }

  openDialog(id, index) {
    const dialogRef = this.dialog.open(MensajeDialogComponent, {
      width: '450px',
      data: {
        info: '¿Esta seguro de eliminar el suministro de combustible?',
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
    this.suministroCombustibleservice.destroy(id).subscribe(res => {
      this.list.splice(index, 1);
      this.suministroCombustibles.data = this.list;
      this.suministroCombustibles.sort = this.sort;
      this.suministroCombustibles.paginator = this.paginator;
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
    this.excelService.exportarExcel(lista, 'suministro-combustibles');
  }
}
