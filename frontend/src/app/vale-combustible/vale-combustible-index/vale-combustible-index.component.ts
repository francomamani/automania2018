import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ExcelService} from '../../services/excel.service';
import {MatDialog} from '@angular/material/dialog';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {environment} from '../../../environments/environment.prod';
import {AuthService} from '../../auth.service';
import {ValeCombustibleService} from '../../services/vale-combustible.service';
import * as jsPDF from 'jspdf';
import {ValeCombustible} from '../../models/vale-combustible';
import {DateTime} from 'luxon';
import {User} from '../../models/user';

@Component({
  selector: 'app-vale-combustible-index',
  templateUrl: './vale-combustible-index.component.html',
  styleUrls: ['./vale-combustible-index.component.css']
})
export class ValeCombustibleIndexComponent implements OnInit {

  user: User;
  list: any = [];
  bk: any = [];
  environment = environment;
  vale_combustibles: MatTableDataSource<ValeCombustible[]>;

  displayedColumns = [
    'numero_vale',
    'motivo_viaje',
    'litros',
    'importe',
    'kilometraje',
    'chofer',
    'vehiculo',
    'estacion_servicio',
    'registrado',
    'acciones'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private valeCombustibleService: ValeCombustibleService,
    private excelService: ExcelService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.authService.auth$
      .subscribe((user: User) => {
        this.user = user;
      });
    this.valeCombustibleService.index().subscribe(res => {
      this.list = res;
      this.bk = res;
      this.vale_combustibles = new MatTableDataSource(this.list);
      this.vale_combustibles.sort = this.sort;
      this.vale_combustibles.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.vale_combustibles.filter = filterValue;
  }

  openDialog(id, index) {
    const dialogRef = this.dialog.open(MensajeDialogComponent, {
      width: '450px',
      data: {
        info: '¿Esta seguro de eliminar el vale de combustible?',
        has_action: true
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.destroy(id, index);
      }
    });
  }

  search(value: string) {
    if (value.trim().length > 0) {
      this.list = this.bk.filter((record: any) => {
        return record.numero_vale.toLowerCase().indexOf(value) !== -1 ||
          record.motivo_viaje.toLowerCase().indexOf(value) !== -1;
      });
    } else {
      this.list = this.bk;
    }
    this.vale_combustibles = new MatTableDataSource(this.list);
    this.vale_combustibles.sort = this.sort;
    this.vale_combustibles.paginator = this.paginator;
  }

  destroy(id, index) {
    this.valeCombustibleService.destroy(id).subscribe(res => {
      this.list.splice(index, 1);
      this.vale_combustibles.data = this.list;
      this.vale_combustibles.sort = this.sort;
      this.vale_combustibles.paginator = this.paginator;
    });
  }

  exportReporte(valeCombustible: ValeCombustible) {
    const image = new Image();
    image.src = 'assets/tedo.png';
    const guv = new Image();
    guv.src = 'assets/logo.png';

    const doc = new jsPDF('portrait', 'mm', 'letter');

    doc.setFont('Arial', 'bold');
    doc.addImage(image, 'PNG', 25, 5, 20, 18);
    doc.addImage(guv, 'PNG', 175, 5, 15, 15);
    doc.setFontSize(11);
    doc.text(`VALE PARA COMBUSTIBLE "${valeCombustible.kilometraje.suministro_combustible.combustible.toUpperCase()}"`,
      107.95, 15, 'center');
    doc.setFontSize(9);
    doc.setFontStyle('normal');

    /*first column title*/
    let x = 25;
    let y = 25;
    doc.text('FECHA DE EMISIÓN ', x, y);
    y += 4;
    doc.text('N. VALE ', x, y);
    y += 4;
    doc.text('LITROS ', x, y);
    y += 4;
    doc.text('IMPORTE ', x, y);
    y += 7;
    doc.text('ESTACIÓN DE SERVICIO ', x, y);
    y += 4;
    doc.text('NIT DE EST. SERVICIO ', x, y);
    y += 7;
    doc.text('CHOFER ', x, y);
    y += 4;
    doc.text('C.I. DE CHOFER ', x, y);
    y += 7;
    doc.text('MOTIVO DE VIAJE ', x, y);
    /*end first column title*/

    /*second column title*/
    x = 120;
    y = 25;
    doc.text('COMBUSTIBLE ', x, y);
    y += 4;
    doc.text('KM. ACTUAL ', x, y);
    y += 4;
    doc.text('KM. ANTERIOR ', x, y);
    y += 4;
    doc.text('KM. RECORRIDO ', x, y);
    y += 7;
    doc.text('TIPO DE VEHÍCULO ', x, y);
    y += 4;
    doc.text('PLACA ', x, y);
    y += 4;
    doc.text('MARCA ', x, y);
    /*end second column title*/

    /*first column data*/
    x = 65;
    y = 25;
    doc.setFontStyle('bold');
    doc.text(`${DateTime.fromISO(valeCombustible.created_at.replace(' ', 'T')).setLocale('es').toFormat('dd  LLLL yyyy').toUpperCase()}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.numero_vale}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.litros}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.importe}`, x, y);
    y += 7;
    doc.text(`${valeCombustible.estacion_servicio.razon_social}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.estacion_servicio.nit}`, x, y);
    y += 7;
    doc.text(`${valeCombustible.asignacion_vehiculo.chofer.nombres.toUpperCase()} ${valeCombustible.asignacion_vehiculo.chofer.apellidos.toUpperCase()}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.asignacion_vehiculo.chofer.carnet}`, x, y);
    y += 7;
    doc.text(`${valeCombustible.motivo_viaje}`, x, y);
    /*end first column data*/

    /*second column data*/
    x = 155;
    y = 25;
    doc.setFontStyle('bold');
    doc.text(`${valeCombustible.kilometraje.suministro_combustible.combustible}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.kilometraje.actual}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.kilometraje.anterior}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.kilometraje.recorrido}`, x, y);
    y += 7;
    doc.text(`${valeCombustible.asignacion_vehiculo.vehiculo.tipo_vehiculo}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.asignacion_vehiculo.vehiculo.placa}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.asignacion_vehiculo.vehiculo.marca}`, x, y);
    /*end second column data*/


    y += 20;
    doc.rect(25, y, 165.9, 50);
    doc.rect(25, y, 165.9, 25);
    doc.rect(25, y, 82.95, 50);

    y += 19;
    doc.setFontStyle('bold');
    doc.text(`${valeCombustible.asignacion_vehiculo.chofer.nombres.toUpperCase()} ${valeCombustible.asignacion_vehiculo.chofer.apellidos.toUpperCase()}`, 65, y, 'center');
    doc.text(`${valeCombustible.asignacion_vehiculo.servicio_general.user.nombres.toUpperCase()} ${valeCombustible.asignacion_vehiculo.servicio_general.user.apellidos.toUpperCase()}`, 150, y, 'center');
    y += 4;
    doc.setFontStyle('normal');
    doc.text('CHOFER', 65, y, 'center');
    doc.text('ALMACENES Y SERVICIOS GENERALES', 150, y, 'center');
    y += 25;
    doc.text('JEFE ADMINISTRATIVO', 65, y, 'center');
    doc.text('ENCARGADO DE ESTACIÓN DE SERVICIO', 150, y, 'center');

    y += 17.5;
    doc.line(0, 139.7, 215.9, 139.7);

    /*copy*/
    doc.setFont('Arial', 'bold');
    doc.addImage(image, 'PNG', 25, y + 12.5, 20, 18);
    doc.addImage(guv, 'PNG', 175, y + 12.5, 15, 15);
    doc.setFontSize(11);
    doc.text(`VALE PARA COMBUSTIBLE "${valeCombustible.kilometraje.suministro_combustible.combustible.toUpperCase()}"`,
      107.95, y + 22.5, 'center');
    doc.setFontSize(9);
    doc.setFontStyle('normal');

    /*first column title*/
    x = 25;
    y = 170;
    doc.text('FECHA DE EMISIÓN ', x, y);
    y += 4;
    doc.text('N. VALE ', x, y);
    y += 4;
    doc.text('LITROS ', x, y);
    y += 4;
    doc.text('IMPORTE ', x, y);
    y += 7;
    doc.text('ESTACIÓN DE SERVICIO ', x, y);
    y += 4;
    doc.text('NIT DE EST. SERVICIO ', x, y);
    y += 7;
    doc.text('CHOFER ', x, y);
    y += 4;
    doc.text('C.I. DE CHOFER ', x, y);
    y += 7;
    doc.text('MOTIVO DE VIAJE ', x, y);
    /*end first column title*/

    /*second column title*/
    x = 120;
    y = 170;
    doc.text('COMBUSTIBLE ', x, y);
    y += 4;
    doc.text('KM. ACTUAL ', x, y);
    y += 4;
    doc.text('KM. ANTERIOR ', x, y);
    y += 4;
    doc.text('KM. RECORRIDO ', x, y);
    y += 7;
    doc.text('TIPO DE VEHÍCULO ', x, y);
    y += 4;
    doc.text('PLACA ', x, y);
    y += 4;
    doc.text('MARCA ', x, y);
    /*end second column title*/

    /*first column data*/
    x = 65;
    y = 170;
    doc.setFontStyle('bold');
    doc.text(`${DateTime.fromISO(valeCombustible.created_at.replace(' ', 'T')).setLocale('es').toFormat('dd  LLLL yyyy').toUpperCase()}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.numero_vale}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.litros}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.importe}`, x, y);
    y += 7;
    doc.text(`${valeCombustible.estacion_servicio.razon_social}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.estacion_servicio.nit}`, x, y);
    y += 7;
    doc.text(`${valeCombustible.asignacion_vehiculo.chofer.nombres.toUpperCase()} ${valeCombustible.asignacion_vehiculo.chofer.apellidos.toUpperCase()}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.asignacion_vehiculo.chofer.carnet}`, x, y);
    y += 7;
    doc.text(`${valeCombustible.motivo_viaje}`, x, y);
    /*end first column data*/

    /*second column data*/
    x = 155;
    y = 170;
    doc.setFontStyle('bold');
    doc.text(`${valeCombustible.kilometraje.suministro_combustible.combustible}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.kilometraje.actual}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.kilometraje.anterior}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.kilometraje.recorrido}`, x, y);
    y += 7;
    doc.text(`${valeCombustible.asignacion_vehiculo.vehiculo.tipo_vehiculo}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.asignacion_vehiculo.vehiculo.placa}`, x, y);
    y += 4;
    doc.text(`${valeCombustible.asignacion_vehiculo.vehiculo.marca}`, x, y);
    /*end second column data*/


    y += 20;
    doc.rect(25, y, 165.9, 50);
    doc.rect(25, y, 165.9, 25);
    doc.rect(25, y, 82.95, 50);

    y += 19;
    doc.setFontStyle('bold');
    doc.text(`${valeCombustible.asignacion_vehiculo.chofer.nombres.toUpperCase()} ${valeCombustible.asignacion_vehiculo.chofer.apellidos.toUpperCase()}`, 65, y, 'center');
    doc.text(`${valeCombustible.asignacion_vehiculo.servicio_general.user.nombres.toUpperCase()} ${valeCombustible.asignacion_vehiculo.servicio_general.user.apellidos.toUpperCase()}`, 150, y, 'center');
    y += 4;
    doc.setFontStyle('normal');
    doc.text('CHOFER', 65, y, 'center');
    doc.text('ALMACENES Y SERVICIOS GENERALES', 150, y, 'center');
    y += 25;
    doc.text('JEFE ADMINISTRATIVO', 65, y, 'center');
    doc.text('ENCARGADO DE ESTACIÓN DE SERVICIO', 150, y, 'center');

    doc.save(`vale-combustible_${DateTime.fromISO(new Date().toISOString()).setLocale('es').toFormat('dd_MM_yyyy_HH_mm_ss')}.pdf`);
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
      this.excelService.exportarExcel(lista, 'vale_combustibles-vehiculos');
    }*/

}
