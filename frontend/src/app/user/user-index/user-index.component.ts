import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../user.service';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {environment} from '../../../environments/environment.prod';
import {ExcelService} from '../../services/excel.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {
  list: any = [];
  environment = environment;
  users: MatTableDataSource<any>;

  displayedColumns = ['cuenta', 'nombres', 'apellidos', 'carnet', 'tipo_usuario', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private excelService: ExcelService,
    private dialog: MatDialog
  ) {
    this.userService.index().subscribe(res => {
      this.list = res;
      this.users = new MatTableDataSource(this.list);
      this.users.sort = this.sort;
      this.users.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.users.filter = filterValue;
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
    this.userService.destroy(id).subscribe(res => {
      this.list.splice(index, 1);
      this.users.data = this.list;
      this.users.sort = this.sort;
      this.users.paginator = this.paginator;
      console.log(res);
    });
  }

  exportExcel() {
    const lista = this.list.map((item, index) => {
      return {
        n: index + 1,
        cuenta: item.cuenta,
        nombres: item.nombres,
        apellidos: item.apellidos,
        carnet: item.carnet,
        tipo_usuario: item.tipo_usuario
      };
    });
    this.excelService.exportarExcel(lista, 'usuarios');
  }

}
