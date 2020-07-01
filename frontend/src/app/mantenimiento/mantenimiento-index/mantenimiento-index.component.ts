import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AsignacionVehiculoService} from '../../asignacion-vehiculo/asignacion-vehiculo.service';
import {ExcelService} from '../../services/excel.service';
import {MatDialog} from '@angular/material/dialog';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {environment} from '../../../environments/environment.prod';
import {MantenimientoService} from '../mantenimiento.service';

@Component({
  selector: 'app-mantenimiento-index',
  templateUrl: './mantenimiento-index.component.html',
  styleUrls: ['./mantenimiento-index.component.css']
})
export class MantenimientoIndexComponent implements OnInit {

  list: any = [];
  environment = environment;
  mantenimientos: MatTableDataSource<any[]>;

  displayedColumns = [
    'placa',
    'taller',
    'decripcion',
    'numero_factura',
    'monto',
    'fecha_inicio',
    'fecha_fin',
    'descripcion_servicio',
    'tipo',
    'anulado',
    'numero_correlativo',
    'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private mantenimientoService: MantenimientoService,
    private excelService: ExcelService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {

    this.mantenimientoService.index().subscribe(res => {
      console.log(res);
      this.list = res;
      this.mantenimientos = new MatTableDataSource(this.list);
      this.mantenimientos.sort = this.sort;
      this.mantenimientos.paginator = this.paginator;
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.mantenimientos.filter = filterValue;
  }

  openDialog(id, index) {
    const dialogRef = this.dialog.open(MensajeDialogComponent, {
      width: '450px',
      data: {
        info: '¿Esta seguro de eliminar el mantenimiento vehícular?',
        has_action: true
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.destroy(id, index);
      }
    });
  }

  // search(data) {
  //   this.mantenimientoService.search({
  //     valor: data
  //   }).subscribe((mantenimientos: any[]) => {
  //     this.list = mantenimientos;
  //     this.mantenimientos = new MatTableDataSource(this.list);
  //     this.mantenimientos.sort = this.sort;
  //     this.mantenimientos.paginator = this.paginator;
  //   });
  // }

  destroy(id, index) {
    this.mantenimientoService.destroy(id).subscribe(res => {
      this.list.splice(index, 1);
      this.mantenimientos.data = this.list;
      this.mantenimientos.sort = this.sort;
      this.mantenimientos.paginator = this.paginator;
    });
  }

  /*  exportExcel() {
      const lista = this.list.map((item, index) => {
        return {
          n: index + 1,
          nombres: item.chofer.nombres,
          apellidos: item.chofer.apellidos,
          carnet: item.chofer.carnet,
          tipo: item.chofer.tipo,
          fecha_inicio_contrato: new Date(item.chofer.fecha_inicio_contrato),
          fecha_fin_contrato: new Date(item.chofer.fecha_fin_contrato),
          placa: item.vehiculo.placa,
          marca: item.vehiculo.marca,
          modelo: item.vehiculo.modelo,
          color: item.vehiculo.color,
          cilindrada: item.vehiculo.cilindrada,
          gestion: item.vehiculo.gestion,
          fecha_asignacion: new Date(item.created_at)
        };
      });
      this.excelService.exportarExcel(lista, 'mantenimientos-vehiculos');
    }*/

}
