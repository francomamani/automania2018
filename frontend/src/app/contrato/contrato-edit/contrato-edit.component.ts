import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contrato-edit',
  templateUrl: './contrato-edit.component.html',
  styleUrls: ['./contrato-edit.component.css']
})
export class ContratoEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // update() {
  //   this.choferGroup.patchValue({
  //     'fecha_inicio_contrato': this.choferGroup.value.fecha_inicio_contrato.getTime(),
  //     'fecha_fin_contrato': this.choferGroup.value.fecha_fin_contrato.getTime()
  //   });
  //   this.choferService
  //     .update(this.choferGroup.value, this.choferGroup.value.id)
  //     .subscribe(res => {
  //       this.choferGroup.patchValue({
  //         'fecha_inicio_contrato': new Date(this.choferGroup.value.fecha_inicio_contrato),
  //         'fecha_fin_contrato': new Date(this.choferGroup.value.fecha_fin_contrato)
  //       });
  //       console.log(res);
  //       this.openDialog(res);
  //     }, (error) => {
  //       this.openDialog(error.error);
  //     });
  // }

}
