import {Component, OnInit, ViewChild} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {environment} from '../../../environments/environment.prod';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {AsignacionVehiculoService} from '../asignacion-vehiculo.service';

@Component({
  selector: 'app-asignacion-vehiculo-index',
  templateUrl: './asignacion-vehiculo-index.component.html',
  styleUrls: ['./asignacion-vehiculo-index.component.css']
})
export class AsignacionVehiculoIndexComponent implements OnInit {

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
    private asignacionVehiculoService: AsignacionVehiculoService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {

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

  destroy(id, index) {
    this.asignacionVehiculoService.destroy(id).subscribe(res => {
      this.list.splice(index, 1);
      this.asignaciones.data = this.list;
      this.asignaciones.sort = this.sort;
      this.asignaciones.paginator = this.paginator;
    });
  }

}
