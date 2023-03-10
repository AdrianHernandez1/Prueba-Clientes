import { NgModule } from '@angular/core'
//PrimeNg
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import {FieldsetModule} from 'primeng/fieldset'
import { MenubarModule } from 'primeng/menubar'
import {ToolbarModule} from 'primeng/toolbar'
import {TableModule} from 'primeng/table'
import {ImageModule} from 'primeng/image'
import {InputTextModule} from 'primeng/inputtext'
import {TabMenuModule} from 'primeng/tabmenu'
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    MenubarModule,
    FieldsetModule,
    ToolbarModule,
    TableModule,
    ImageModule,
    InputTextModule,
    TabMenuModule,
    MatToolbarModule
  ]
})
export class PrimeNgModule { }
