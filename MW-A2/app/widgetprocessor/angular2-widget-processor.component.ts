import {
    Injectable,
    Compiler,
    ViewContainerRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicComponentService } from '../dynamicservice/dynamic.service';

@Injectable()
export class Angular2WidgetProcessor {

    htmlDOM: HTMLElement;
    dom: Object;

    constructor( public compiler: Compiler, public viewContainerRef: ViewContainerRef ) { }

    processWidget( widget: HTMLElement, elementName: Object, attributes: Object, mw: Object ) {
        
        let model: string;
        if ( elementName !== "entity" ) {
            model = metawidget.util.appendPathWithName( "model", attributes );
        }
        
        let widgetString = widget.outerHTML;
        let dynamicService = new DynamicComponentService( this.compiler );
        if ( widget.tagName === "INPUT" ) {
            
            if( widget.getAttribute( "type" ) === "submit" || widget.getAttribute( "type" ) === "button" ) {
               widget.setAttribute( "on-click", "checkingButton()" );
            } else {
                widget.setAttribute( "bindon-ngModel", model );            
            }
            

        } else if ( widget.tagName === "SELECT" ) {
            
            widget.setAttribute( "bindon-ngModel", model );

        } else if ( widget.tagName === "TEXTAREA" ) {
            
            widget.setAttribute( "bindon-ngModel", model );

        } 
        return widget;

    }

}
