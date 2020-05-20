import {Component, OnInit, ViewChild} from '@angular/core';
import {VehiculoService} from '../../vehiculo/vehiculo.service';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {environment} from '../../../environments/environment.prod';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-asignacion-vehiculo-index',
  templateUrl: './asignacion-vehiculo-index.component.html',
  styleUrls: ['./asignacion-vehiculo-index.component.css']
})
export class AsignacionVehiculoIndexComponent implements OnInit {

  list: any = [];
  environment = environment;
  vehiculos: MatTableDataSource<any>;

  displayedColumns = [
    'placa',
    'marca',
    'modelo',
    'color',
    'cilindrada',
    'gestion',
    'activo',
    'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private vehiculoService: VehiculoService,
    private dialog: MatDialog
  ) {
    this.vehiculoService.index().subscribe(res => {
      this.list = res;
      this.vehiculos = new MatTableDataSource(this.list);
      this.vehiculos.sort = this.sort;
      this.vehiculos.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.vehiculos.filter = filterValue;
  }

  ngOnInit() {
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
    this.vehiculoService.destroy(id).subscribe(res => {
      this.list.splice(index, 1);
      this.vehiculos.data = this.list;
      this.vehiculos.sort = this.sort;
      this.vehiculos.paginator = this.paginator;
      console.log(res);
    });
  }

}
