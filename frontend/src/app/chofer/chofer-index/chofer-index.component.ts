import {Component, OnInit, ViewChild} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {environment} from '../../../environments/environment.prod';
import {ChoferService} from '../chofer.service';
import {ExcelService} from '../../services/excel.service';

@Component({
  selector: 'app-chofer-index',
  templateUrl: './chofer-index.component.html',
  styleUrls: ['./chofer-index.component.css']
})
export class ChoferIndexComponent implements OnInit {
  list: any = [];
  environment = environment;
  choferes: MatTableDataSource<any>;

  displayedColumns = ['nombres',
    'apellidos',
    'carnet',
    'tipo',
    'fecha_inicio_contrato',
    'fecha_fin_contrato',
    'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private choferService: ChoferService,
    private dialog: MatDialog,
    private excelService: ExcelService
  ) {
    this.choferService.index().subscribe(res => {
      this.list = res;
      this.choferes = new MatTableDataSource(this.list);
      this.choferes.sort = this.sort;
      this.choferes.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.choferes.filter = filterValue;
  }

  ngOnInit() {
  }

  openDialog(id, index) {
    const dialogRef = this.dialog.open(MensajeDialogComponent, {
      width: '450px',
      data: {
        info: 'Esta seguro de eliminar al usuario?',
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
    this.choferService.destroy(id).subscribe(res => {
      this.list.splice(index, 1);
      this.choferes.data = this.list;
      this.choferes.sort = this.sort;
      this.choferes.paginator = this.paginator;
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
    this.excelService.exportarExcel(lista, 'choferes');
  }

}
