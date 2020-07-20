import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ServicioGeneralComponent} from './servicio-general.component';
import {ChoferComponent} from '../chofer/chofer.component';
import {ChoferIndexComponent} from '../chofer/chofer-index/chofer-index.component';
import {ChoferCreateComponent} from '../chofer/chofer-create/chofer-create.component';
import {ChoferEditComponent} from '../chofer/chofer-edit/chofer-edit.component';
import {ContratoComponent} from '../contrato/contrato.component';
import {ContratoIndexComponent} from '../contrato/contrato-index/contrato-index.component';
import {ContratoCreateComponent} from '../contrato/contrato-create/contrato-create.component';
import {ContratoEditComponent} from '../contrato/contrato-edit/contrato-edit.component';
import {EstacionServicioComponent} from '../estacion-servicio/estacion-servicio.component';
import {EstacionServicioIndexComponent} from '../estacion-servicio/estacion-servicio-index/estacion-servicio-index.component';
import {EstacionServicioCreateComponent} from '../estacion-servicio/estacion-servicio-create/estacion-servicio-create.component';
import {EstacionServicioEditComponent} from '../estacion-servicio/estacion-servicio-edit/estacion-servicio-edit.component';
import {KilometrajeComponent} from '../kilometraje/kilometraje.component';
import {KilometrajeIndexComponent} from '../kilometraje/kilometraje-index/kilometraje-index.component';
import {KilometrajeCreateComponent} from '../kilometraje/kilometraje-create/kilometraje-create.component';
import {KilometrajeEditComponent} from '../kilometraje/kilometraje-edit/kilometraje-edit.component';
import {MantenimientoComponent} from '../mantenimiento/mantenimiento.component';
import {MantenimientoIndexComponent} from '../mantenimiento/mantenimiento-index/mantenimiento-index.component';
import {MantenimientoCreateComponent} from '../mantenimiento/mantenimiento-create/mantenimiento-create.component';
import {MantenimientoEditComponent} from '../mantenimiento/mantenimiento-edit/mantenimiento-edit.component';
import {SuministroCombustibleComponent} from '../suministro-combustible/suministro-combustible.component';
import {SuministroCombustibleIndexComponent} from '../suministro-combustible/suministro-combustible-index/suministro-combustible-index.component';
import {SuministroCombustibleCreateComponent} from '../suministro-combustible/suministro-combustible-create/suministro-combustible-create.component';
import {SuministroCombustibleEditComponent} from '../suministro-combustible/suministro-combustible-edit/suministro-combustible-edit.component';
import {TallerMecanicoComponent} from '../taller-mecanico/taller-mecanico.component';
import {TallerMecanicoIndexComponent} from '../taller-mecanico/taller-mecanico-index/taller-mecanico-index.component';
import {TallerMecanicoCreateComponent} from '../taller-mecanico/taller-mecanico-create/taller-mecanico-create.component';
import {TallerMecanicoEditComponent} from '../taller-mecanico/taller-mecanico-edit/taller-mecanico-edit.component';
import {TipoCombustibleComponent} from '../tipo-combustible/tipo-combustible.component';
import {TipoCombustibleIndexComponent} from '../tipo-combustible/tipo-combustible-index/tipo-combustible-index.component';
import {TipoCombustibleCreateComponent} from '../tipo-combustible/tipo-combustible-create/tipo-combustible-create.component';
import {TipoCombustibleEditComponent} from '../tipo-combustible/tipo-combustible-edit/tipo-combustible-edit.component';
import {ValeCombustibleComponent} from '../vale-combustible/vale-combustible.component';
import {ValeCombustibleIndexComponent} from '../vale-combustible/vale-combustible-index/vale-combustible-index.component';
import {ValeCombustibleCreateComponent} from '../vale-combustible/vale-combustible-create/vale-combustible-create.component';
import {VehiculoComponent} from '../vehiculo/vehiculo.component';
import {VehiculoIndexComponent} from '../vehiculo/vehiculo-index/vehiculo-index.component';
import {VehiculoCreateComponent} from '../vehiculo/vehiculo-create/vehiculo-create.component';
import {VehiculoEditComponent} from '../vehiculo/vehiculo-edit/vehiculo-edit.component';
import {AsignacionVehiculoComponent} from '../asignacion-vehiculo/asignacion-vehiculo.component';
import {AsignacionVehiculoIndexComponent} from '../asignacion-vehiculo/asignacion-vehiculo-index/asignacion-vehiculo-index.component';
import {AsignacionVehiculoCreateComponent} from '../asignacion-vehiculo/asignacion-vehiculo-create/asignacion-vehiculo-create.component';
import {AsignacionVehiculoEditComponent} from '../asignacion-vehiculo/asignacion-vehiculo-edit/asignacion-vehiculo-edit.component';
import {AuthGuard} from '../auth.guard';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';


const routes: Routes = [
  {
    path: '', component: ServicioGeneralComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'asignacion-vehiculo',
        component: AsignacionVehiculoComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'listar',
            component: AsignacionVehiculoIndexComponent
          },
          {
            path: 'crear',
            component: AsignacionVehiculoCreateComponent
          },
          {
            path: 'editar/:id',
            component: AsignacionVehiculoEditComponent
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'chofer',
        component: ChoferComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'listar',
            component: ChoferIndexComponent
          },
          {
            path: 'crear',
            component: ChoferCreateComponent
          },
          {
            path: 'editar/:id',
            component: ChoferEditComponent
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'contrato',
        component: ContratoComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'listar',
            component: ContratoIndexComponent
          },
          {
            path: 'crear',
            component: ContratoCreateComponent
          },
          {
            path: 'editar/:id',
            component: ContratoEditComponent
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'estacion-servicio',
        component: EstacionServicioComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'listar',
            component: EstacionServicioIndexComponent
          },
          {
            path: 'crear',
            component: EstacionServicioCreateComponent
          },
          {
            path: 'editar/:id',
            component: EstacionServicioEditComponent
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'kilometraje',
        component: KilometrajeComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'listar',
            component: KilometrajeIndexComponent
          },
          {
            path: 'crear',
            component: KilometrajeCreateComponent
          },
          {
            path: 'editar/:id',
            component: KilometrajeEditComponent
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'mantenimiento',
        component: MantenimientoComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'listar',
            component: MantenimientoIndexComponent
          },
          {
            path: 'crear',
            component: MantenimientoCreateComponent
          },
          {
            path: 'editar/:id',
            component: MantenimientoEditComponent
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'suministro-combustible',
        component: SuministroCombustibleComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'listar',
            component: SuministroCombustibleIndexComponent
          },
          {
            path: 'crear',
            component: SuministroCombustibleCreateComponent
          },
          {
            path: 'editar/:id',
            component: SuministroCombustibleEditComponent
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'taller-mecanico',
        component: TallerMecanicoComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'listar',
            component: TallerMecanicoIndexComponent
          },
          {
            path: 'crear',
            component: TallerMecanicoCreateComponent
          },
          {
            path: 'editar/:id',
            component: TallerMecanicoEditComponent
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'tipo-combustible',
        component: TipoCombustibleComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'listar',
            component: TipoCombustibleIndexComponent
          },
          {
            path: 'crear',
            component: TipoCombustibleCreateComponent
          },
          {
            path: 'editar/:id',
            component: TipoCombustibleEditComponent
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'vale-combustible',
        component: ValeCombustibleComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'listar',
            component: ValeCombustibleIndexComponent
          },
          {
            path: 'crear',
            component: ValeCombustibleCreateComponent
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'vehiculo',
        component: VehiculoComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'listar',
            component: VehiculoIndexComponent
          },
          {
            path: 'crear',
            component: VehiculoCreateComponent
          },
          {
            path: 'editar/:id',
            component: VehiculoEditComponent
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'vale-combustible',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [ServicioGeneralComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule
  ]
})
export class ServicioGeneralModule {
}
