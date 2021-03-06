import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'

import { BrowseRoutingModule } from './browse-routing.module'
import { BrowseComponent } from './browse.component'

@NgModule({
	imports: [
		NativeScriptCommonModule,
		BrowseRoutingModule,
		NativeScriptFormsModule,
	],
	declarations: [BrowseComponent],
	schemas: [NO_ERRORS_SCHEMA],
})
export class BrowseModule {}
