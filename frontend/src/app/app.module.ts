import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {UserCreateComponent} from './user/user-create/user-create.component';
import {UserIndexComponent} from './user/user-index/user-index.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {MensajeDialogComponent} from './mensaje-dialog/mensaje-dialog.component';
import {UserService} from './user/user.service';
import {EstacionServicioComponent} from './estacion-servicio/estacion-servicio.component';
import {EstacionServicioCreateComponent} from './estacion-servicio/estacion-servicio-create/estacion-servicio-create.component';
import {EstacionServicioIndexComponent} from './estacion-servicio/estacion-servicio-index/estacion-servicio-index.component';
import {EstacionServicioEditComponent} from './estacion-servicio/estacion-servicio-edit/estacion-servicio-edit.component';
import {ChoferComponent} from './chofer/chofer.component';
import {ChoferCreateComponent} from './chofer/chofer-create/chofer-create.component';
import {ChoferIndexComponent} from './chofer/chofer-index/chofer-index.component';
import {ChoferEditComponent} from './chofer/chofer-edit/chofer-edit.component';
import {ChoferService} from './chofer/chofer.service';
import {VehiculoComponent} from './vehiculo/vehiculo.component';
import {VehiculoCreateComponent} from './vehiculo/vehiculo-create/vehiculo-create.component';
import {VehiculoIndexComponent} from './vehiculo/vehiculo-index/vehiculo-index.component';
import {VehiculoEditComponent} from './vehiculo/vehiculo-edit/vehiculo-edit.component';
import {VehiculoService} from './vehiculo/vehiculo.service';
import {EstacionServicioService} from './estacion-servicio/estacion-servicio.service';
import {TallerMecanicoComponent} from './taller-mecanico/taller-mecanico.component';
import {TallerMecanicoCreateComponent} from './taller-mecanico/taller-mecanico-create/taller-mecanico-create.component';
import {TallerMecanicoIndexComponent} from './taller-mecanico/taller-mecanico-index/taller-mecanico-index.component';
import {TallerMecanicoEditComponent} from './taller-mecanico/taller-mecanico-edit/taller-mecanico-edit.component';
import {TallerMecanicoService} from './taller-mecanico/taller-mecanico.service';
import {MyHttpLogInterceptorService} from './my-http-log-interceptor.service';
import {MantenimientoComponent} from './mantenimiento/mantenimiento.component';
import {MantenimientoCreateComponent} from './mantenimiento/mantenimiento-create/mantenimiento-create.component';
import {MantenimientoIndexComponent} from './mantenimiento/mantenimiento-index/mantenimiento-index.component';
import {MantenimientoEditComponent} from './mantenimiento/mantenimiento-edit/mantenimiento-edit.component';
import {MantenimientoService} from './mantenimiento/mantenimiento.service';
import {AsignacionVehiculoComponent} from './asignacion-vehiculo/asignacion-vehiculo.component';
import {AsignacionVehiculoCreateComponent} from './asignacion-vehiculo/asignacion-vehiculo-create/asignacion-vehiculo-create.component';
import {AsignacionVehiculoIndexComponent} from './asignacion-vehiculo/asignacion-vehiculo-index/asignacion-vehiculo-index.component';
import {AsignacionVehiculoEditComponent} from './asignacion-vehiculo/asignacion-vehiculo-edit/asignacion-vehiculo-edit.component';
import {AsignacionVehiculoService} from './asignacion-vehiculo/asignacion-vehiculo.service';
import {MatSortModule} from '@angular/material/sort';
import {ExcelService} from './services/excel.service';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {FlexLayoutModule} from '@angular/flex-layout';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'usuario', component: UserComponent, canActivate: [AuthGuard], children: [
      {path: 'crear', component: UserCreateComponent},
      {path: 'listar', component: UserIndexComponent},
      {path: 'editar/:id', component: UserEditComponent},
      {path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]
  },
  {
    path: 'chofer', component: ChoferComponent, canActivate: [AuthGuard], children: [
      {path: 'crear', component: ChoferCreateComponent},
      {path: 'listar', component: ChoferIndexComponent},
      {path: 'editar/:id', component: ChoferEditComponent},
      {path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]
  },
  {
    path: 'vehiculo', component: VehiculoComponent, canActivate: [AuthGuard], children: [
      {path: 'crear', component: VehiculoCreateComponent},
      {path: 'listar', component: VehiculoIndexComponent},
      {path: 'editar/:id', component: VehiculoEditComponent},
      {path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]
  },
  {
    path: 'asignacion-vehiculo', component: AsignacionVehiculoComponent, canActivate: [AuthGuard], children: [
      {path: 'crear', component: AsignacionVehiculoCreateComponent},
      {path: 'listar', component: AsignacionVehiculoIndexComponent},
      {path: 'editar/:id', component: AsignacionVehiculoEditComponent},
      {path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]
  },
  {
    path: 'estacion-servicio', component: EstacionServicioComponent, canActivate: [AuthGuard], children: [
      {path: 'crear', component: EstacionServicioCreateComponent},
      {path: 'listar', component: EstacionServicioIndexComponent},
      {path: 'editar/:id', component: EstacionServicioEditComponent},
      {path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]
  },
  {
    path: 'taller-mecanico', component: TallerMecanicoComponent, canActivate: [AuthGuard], children: [
      {path: 'crear', component: TallerMecanicoCreateComponent},
      {path: 'listar', component: TallerMecanicoIndexComponent},
      {path: 'editar/:id', component: TallerMecanicoEditComponent},
      {path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]
  },
  /*  {
      path: 'mantenimiento', component: MantenimientoComponent, canActivate: [AuthGuard], children: [
        {path: 'crear', component: MantenimientoCreateComponent},
        {path: 'listar', component: MantenimientoIndexComponent},
        {path: 'editar/:id', component: MantenimientoEditComponent},
        {path: '', redirectTo: 'listar', pathMatch: 'full'}
      ]
    },*/
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    UserCreateComponent,
    UserIndexComponent,
    UserEditComponent,
    MensajeDialogComponent,
    EstacionServicioComponent,
    EstacionServicioCreateComponent,
    EstacionServicioIndexComponent,
    EstacionServicioEditComponent,
    ChoferComponent,
    ChoferCreateComponent,
    ChoferIndexComponent,
    ChoferEditComponent,
    VehiculoComponent,
    VehiculoCreateComponent,
    VehiculoIndexComponent,
    VehiculoEditComponent,
    TallerMecanicoComponent,
    TallerMecanicoCreateComponent,
    TallerMecanicoIndexComponent,
    TallerMecanicoEditComponent,
    MantenimientoComponent,
    MantenimientoCreateComponent,
    MantenimientoIndexComponent,
    MantenimientoEditComponent,
    AsignacionVehiculoComponent,
    AsignacionVehiculoCreateComponent,
    AsignacionVehiculoIndexComponent,
    AsignacionVehiculoEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    MatNativeDateModule,
    RouterModule.forRoot(appRoutes, {
      useHash: true
    }),
    MatSortModule,
    NgSelectModule,
    MatCardModule,
    MatToolbarModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatTableModule,
    MatDatepickerModule,
    MatRadioModule,
    FlexLayoutModule
  ],
  entryComponents: [MensajeDialogComponent],
  providers: [AuthGuard,
    AuthService,
    UserService,
    ChoferService,
    VehiculoService,
    EstacionServicioService,
    TallerMecanicoService,
    MantenimientoService,
    ExcelService,
    AsignacionVehiculoService,
    {provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
