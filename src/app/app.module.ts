import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TextviewComponent} from "./components/textview/textview.component";
import { GraphviewComponent } from './components/graphview/graphview.component';

@NgModule({
  declarations: [
    AppComponent,
    TextviewComponent,
    GraphviewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
