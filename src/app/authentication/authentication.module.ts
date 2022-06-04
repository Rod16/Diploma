import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'

import { AuthRoutingModule } from './authentication-routing.module'
import { AuthComponent } from './authentication.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    AuthRoutingModule,
    NativeScriptFormsModule,
  ],
  declarations: [AuthComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthModule {}