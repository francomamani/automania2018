import {Component, OnInit, ViewChild} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {environment} from '../../../environments/environment.prod';
import {EstacionServicioService} from '../estacion-servicio.service';
import {ExcelService} from '../../services/excel.service';

@Component({
  selector: 'app-estacion-servicio-index',
  templateUrl: './estacion-servicio-index.component.html',
  styleUrls: ['./estacion-servicio-index.component.css']
})
export class EstacionServicioIndexComponent implements OnInit {

  list: any = [];
  environment = environment;
  estacion_servicios: MatTableDataSource<any>;

  displayedColumns = [
    'razon_social',
    'nit',
    'propietario',
    'activo',
    'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private estacionServicioService: EstacionServicioService,
    private excelService: ExcelService,
    private dialog: MatDialog
  ) {
    this.estacionServicioService.index().subscribe(res => {
      this.list = res;
      this.estacion_servicios = new MatTableDataSource(this.list);
      this.estacion_servicios.sort = this.sort;
      this.estacion_servicios.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.estacion_servicios.filter = filterValue;
  }

  ngOnInit() {
  }

  openDialog(id, index) {
    const dialogRef = this.dialog.open(MensajeDialogComponent, {
      width: '450px',
      data: {
        info: '¿Esta seguro de eliminar la estación de servicio?',
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
    this.estacionServicioService.destroy(id).subscribe(res => {
      this.list.splice(index, 1);
      this.estacion_servicios.data = this.list;
      this.estacion_servicios.sort = this.sort;
      this.estacion_servicios.paginator = this.paginator;
      console.log(res);
    });
  }

  exportExcel() {
    const lista = this.list.map((item, index) => {
      return {
        n: index + 1,
        razon_social: item.razon_social,
        nit: item.nit,
        propietario: item.propietario,
        activo: item.activo === 1 ? 'si' : 'no'
      };
    });
    this.excelService.exportarExcel(lista, 'estaciones-servicio');
  }

}
