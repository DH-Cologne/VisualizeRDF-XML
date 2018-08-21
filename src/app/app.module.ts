import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {TextviewComponent} from "./components/textview/textview.component";
import {GraphviewComponent} from './components/graphview/graphview.component';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// import { D3Service, D3_DIRECTIVES } from './components/graphview/d3';
// import { GraphComponent } from './components/graphview/visuals/graph/graph.component';
// import { SHARED_VISUALS } from './components/graphview/visuals/shared';

@NgModule({
  declarations: [
    AppComponent,
    // GraphComponent,
    // ...SHARED_VISUALS,
    // ...D3_DIRECTIVES,
    TextviewComponent,
    GraphviewComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
