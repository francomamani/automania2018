import {Component, OnInit, ViewChild} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {environment} from '../../../environments/environment.prod';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {AsignacionVehiculoService} from '../asignacion-vehiculo.service';
import {ExcelService} from '../../services/excel.service';
import {User} from '../../models/user';
import {AuthService} from '../../auth.service';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-asignacion-vehiculo-index',
  templateUrl: './asignacion-vehiculo-index.component.html',
  styleUrls: ['./asignacion-vehiculo-index.component.css']
})
export class AsignacionVehiculoIndexComponent implements OnInit {

  user: User;
  list: any = [];
  environment = environment;
  asignaciones: MatTableDataSource<any[]>;

  displayedColumns = [
    'nombres',
    'apellidos',
    'carnet',
    'tipo',
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
    private authService: AuthService,
    private asignacionVehiculoService: AsignacionVehiculoService,
    private excelService: ExcelService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.authService.auth$
      .subscribe((user: User) => {
        this.user = user;
      });
    this.asignacionVehiculoService.index().subscribe(res => {
      this.list = res;
      this.asignaciones = new MatTableDataSource(this.list);
      this.asignaciones.sort = this.sort;
      this.asignaciones.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.asignaciones.filter = filterValue;
  }

  openDialog(id, index) {
    const dialogRef = this.dialog.open(MensajeDialogComponent, {
      width: '450px',
      data: {
        info: '¿Esta seguro de eliminar la asignacion del vehiculo?',
        has_action: true
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.destroy(id, index);
      }
    });
  }

  search(data) {
    this.asignacionVehiculoService.search({
      valor: data
    }).subscribe((asignaciones: any[]) => {
      this.list = asignaciones;
      this.asignaciones = new MatTableDataSource(this.list);
      this.asignaciones.sort = this.sort;
      this.asignaciones.paginator = this.paginator;
    });
  }

  destroy(id, index) {
    this.asignacionVehiculoService.destroy(id).subscribe(res => {
      this.list.splice(index, 1);
      this.asignaciones.data = this.list;
      this.asignaciones.sort = this.sort;
      this.asignaciones.paginator = this.paginator;
    });
  }

  exportExcel() {
    const lista = this.list.map((item, index) => {
      return {
        n: index + 1,
        nombres: item.chofer.nombres,
        apellidos: item.chofer.apellidos,
        carnet: item.chofer.carnet,
        tipo: item.chofer.tipo,
        placa: item.vehiculo.placa,
        marca: item.vehiculo.marca,
        modelo: item.vehiculo.modelo,
        color: item.vehiculo.color,
        cilindrada: item.vehiculo.cilindrada,
        gestion: item.vehiculo.gestion,
        fecha_asignacion: DateTime.fromISO(item.created_at.replace(' ', 'T')).toFormat('dd MMM y')
      };
    });
    this.excelService.exportarExcel(lista, 'asignaciones-vehiculos');
  }

}
