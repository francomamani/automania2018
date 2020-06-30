import {Component, OnInit, ViewChild} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {environment} from '../../../environments/environment.prod';
import {ExcelService} from '../../services/excel.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog'; 
import { ContratoService } from '../contrato.service';

@Component({
  selector: 'app-contrato-index',
  templateUrl: './contrato-index.component.html',
  styleUrls: ['./contrato-index.component.css']
})
export class ContratoIndexComponent implements OnInit {
  list: any = [];
  environment = environment;
  contratos: MatTableDataSource<any>;

  displayedColumns = ['chofer',
    'numero_contrato',
    'fecha_inicio_contrato',
    'fecha_fin_contrato',
    'activo'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private contratoservice: ContratoService,
    private dialog: MatDialog,
    private excelService: ExcelService
  ) {
    this.contratoservice.index().subscribe(res => {
      this.list = res;
      this.contratos = new MatTableDataSource(this.list);
      this.contratos.sort = this.sort;
      this.contratos.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.contratos.filter = filterValue;
  }

  ngOnInit() {
  }

  openDialog(id, index) {
    const dialogRef = this.dialog.open(MensajeDialogComponent, {
      width: '450px',
      data: {
        info: 'Esta seguro de eliminar el contrato?',
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
    this.contratoservice.destroy(id).subscribe(res => {
      this.list.splice(index, 1);
      this.contratos.data = this.list;
      this.contratos.sort = this.sort;
      this.contratos.paginator = this.paginator;
      console.log(res);
    });
  }

  exportExcel() {
    const lista = this.list.map((item, index) => {
      return {
        n: index + 1,
        nombres: item.nombres,
        apellidos: item.apellidos,
        carnet: item.carnet,
        tipo: item.tipo,
        fecha_inicio_contrato: new Date(item.fecha_inicio_contrato),
        fecha_fin_contrato: new Date(item.fecha_fin_contrato)
      };
    });
    this.excelService.exportarExcel(lista, 'contratos');
  }
}
