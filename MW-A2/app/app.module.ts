import { NgModule, ElementRef }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MetawidgetComponent } from './metawidget/metawidget.component';
import { Angular2WidgetProcessor } from './widgetprocessor/angular2-widget-processor.component';

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ 
      AppComponent,
      MetawidgetComponent
    ],
  providers: [  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


