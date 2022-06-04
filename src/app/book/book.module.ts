import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'

import { BookRoutingModule } from './book-routing.module'
import { BookComponent } from './book.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    BookRoutingModule,
    NativeScriptFormsModule,
  ],
  declarations: [BookComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class BookModule {}