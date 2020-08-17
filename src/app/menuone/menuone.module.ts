import { MenuoneComponent } from './menuone.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [MenuoneComponent],
  exports:[MenuoneComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, ClickOutsideModule
  ]
})
export class MenuoneComponentModule { }
