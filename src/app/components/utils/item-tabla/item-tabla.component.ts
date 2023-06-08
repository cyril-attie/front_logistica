import { Component, Input, } from '@angular/core';

@Component({
  selector: '[appItemTabla]',
  templateUrl: './item-tabla.component.html',
  styleUrls: ['./item-tabla.component.sass']
})
export class ItemTablaComponent {

  @Input() rowValue : any;
  @Input() botones : any = {};
  @Input() url_param : string = "";
    
}
