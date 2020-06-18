import {Component, OnInit, ViewChild} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {TallerMecanicoService} from '../taller-mecanico.service';
import {environment} from '../../../environments/environment.prod';
import {ExcelService} from '../../services/excel.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-taller-mecanico-index',
  templateUrl: './taller-mecanico-index.component.html',
  styleUrls: ['./taller-mecanico-index.component.css']
})
export class TallerMecanicoIndexComponent implements OnInit {
  list: any = [];
  environment = environment;
  taller_mecanicos: MatTableDataSource<any>;

  displayedColumns = [
    'identificacion',
    'nombre',
    'direccion',
    'telefono',
    'nit',
    'nombre_propietario',
    'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private tallerMecanicoService: TallerMecanicoService,
    private excelService: ExcelService,
    private dialog: MatDialog
  ) {
    this.tallerMecanicoService.index().subscribe(res => {
      console.log(res);
      this.list = res;
      this.taller_mecanicos = new MatTableDataSource(this.list);
      this.taller_mecanicos.sort = this.sort;
      this.taller_mecanicos.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.taller_mecanicos.filter = filterValue;
  }

  ngOnInit() {
  }

  openDialog(id, index) {
    const dialogRef = this.dialog.open(MensajeDialogComponent, {
      width: '450px',
      data: {
        info: '¿Esta seguro de eliminar el taller mecánico?',
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
    this.tallerMecanicoService.destroy(id).subscribe(res => {
      this.list.splice(index, 1);
      this.taller_mecanicos.data = this.list;
      this.taller_mecanicos.sort = this.sort;
      this.taller_mecanicos.paginator = this.paginator;
      console.log(res);
    });
  }

  exportExcel() {
    const lista = this.list.map((item, index) => {
      return {
        n: index + 1,
        identificacion: item.identificacion,
        nombre: item.nombre,
        direccion: item.direccion,
        telefono: item.telefono,
        nit: item.nit,
        nombre_propietario: item.nombre_propietario
      };
    });
    this.excelService.exportarExcel(lista, 'talleres-mecanicos');
  }

}
