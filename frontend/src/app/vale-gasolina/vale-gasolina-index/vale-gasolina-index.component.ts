import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AsignacionVehiculoService} from '../../asignacion-vehiculo/asignacion-vehiculo.service';
import {ExcelService} from '../../services/excel.service';
import {MatDialog} from '@angular/material/dialog';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {environment} from '../../../environments/environment.prod';
import {ValeGasolinaService} from '../vale-gasolina.service';

@Component({
  selector: 'app-vale-gasolina-index',
  templateUrl: './vale-gasolina-index.component.html',
  styleUrls: ['./vale-gasolina-index.component.css']
})
export class ValeGasolinaIndexComponent implements OnInit {

  list: any = [];
  environment = environment;
  vale_gasolinas: MatTableDataSource<any[]>;

  displayedColumns = [
    'numero_vale',
    'motivo_viaje',
    'litros_aprox',
    'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private valeGasolinaService: ValeGasolinaService,
    private excelService: ExcelService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {

    this.valeGasolinaService.index().subscribe(res => {
      console.log(res);
      this.list = res;
      this.vale_gasolinas = new MatTableDataSource(this.list);
      this.vale_gasolinas.sort = this.sort;
      this.vale_gasolinas.paginator = this.paginator;
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.vale_gasolinas.filter = filterValue;
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
    this.valeGasolinaService.search({
      valor: data
    }).subscribe((vale_gasolinas: any[]) => {
      this.list = vale_gasolinas;
      this.vale_gasolinas = new MatTableDataSource(this.list);
      this.vale_gasolinas.sort = this.sort;
      this.vale_gasolinas.paginator = this.paginator;
    });
  }

  destroy(id, index) {
    this.valeGasolinaService.destroy(id).subscribe(res => {
      this.list.splice(index, 1);
      this.vale_gasolinas.data = this.list;
      this.vale_gasolinas.sort = this.sort;
      this.vale_gasolinas.paginator = this.paginator;
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
      this.excelService.exportarExcel(lista, 'vale_gasolinas-vehiculos');
    }*/

}
