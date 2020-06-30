import {Component, OnInit, ViewChild} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {environment} from '../../../environments/environment.prod';
import {ExcelService} from '../../services/excel.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {KilometrajeService} from '../kilometraje.service';
import {SuministroCombustibleService} from '../../suministro-combustible/suministro-combustible.service';

@Component({
  selector: 'app-kilometraje-index',
  templateUrl: './kilometraje-index.component.html',
  styleUrls: ['./kilometraje-index.component.css']
})
export class KilometrajeIndexComponent implements OnInit {

  list: any = [];
  environment = environment;
  kilometrajes: MatTableDataSource<any[]>;

  displayedColumns = [
    'suministro_combustible_id',
    'anterior',
    'actual',
    'recorrido',
    'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private kilometrajeService: KilometrajeService,
    private sumCombustibleService: SuministroCombustibleService,
    private dialog: MatDialog,
    private excelService: ExcelService
  ) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.kilometrajes.filter = filterValue;
  }

  ngOnInit() {
    this.kilometrajeService.index().subscribe(res => {
      this.list = res;
      this.kilometrajes = new MatTableDataSource(this.list);
      this.kilometrajes.sort = this.sort;
      this.kilometrajes.paginator = this.paginator;
    });
  }

  openDialog(id, index) {
    const dialogRef = this.dialog.open(MensajeDialogComponent, {
      width: '450px',
      data: {
        info: '¿Esta seguro de eliminar kilometraje?',
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
    this.kilometrajeService.destroy(id).subscribe(res => {
      this.list.splice(index, 1);
      this.kilometrajes.data = this.list;
      this.kilometrajes.sort = this.sort;
      this.kilometrajes.paginator = this.paginator;
      console.log(res);
    });
  }

  exportExcel() {
    const lista = this.list.map((item, index) => {
      return {
        n: index + 1,
        anterior: item.anterior,
        actual: item.actual,
        recorrido: item.recorrido
      };
    });
    this.excelService.exportarExcel(lista, 'kilometraje');
  }
}
