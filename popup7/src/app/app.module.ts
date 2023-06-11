import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';

@NgModule({
  declarations: [AppComponent, FormComponent],
  imports: [BrowserModule, BrowserAnimationsModule, SharedModule],
  providers: [],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
