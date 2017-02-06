import {
    Component,
    ElementRef,
    Injectable,
    NgModule,
    Injector,
    ComponentRef,
    Compiler,
    ComponentFactory,
    ModuleWithComponentFactories,
    ReflectiveInjector,
    EmbeddedViewRef,
    ViewContainerRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MetawidgetComponent } from '../metawidget/metawidget.component';

@Injectable()
export class DynamicComponentService {

    cmpRef: any;
    constructor(private compiler: Compiler) { }

    getDOMElementOfDynamicTemplate( template: string, vcRef: ViewContainerRef, model: Object ) {

        while ( template.search("bindon-ngmodel") != -1 ) {
            template = template.replace( "bindon-ngmodel", "bindon-ngModel" );
        }

        const html = template;
        if (!html) return;

        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
        const compMetadata = new Component({
            template: html
        });
        let factory = this.createComponentFactory( this.compiler, compMetadata, model );
        const injector = ReflectiveInjector.fromResolvedProviders( [], vcRef.parentInjector );
        this.cmpRef = vcRef.createComponent( factory, vcRef.length, injector );
        const hostView = <EmbeddedViewRef<any>>this.cmpRef.hostView;
        return hostView.rootNodes[0];

    }

    createComponentFactory( compiler: Compiler, metadata: Component, model: Object ) {
        @Component(metadata)
        class DynamicComponent {
            model = model;
        };
        @NgModule({
            imports: [ CommonModule, FormsModule ],
            declarations: [ DynamicComponent ]
        })
        class DynamicHtmlModule { }
        let moduleWithComponentFactory = compiler.compileModuleAndAllComponentsSync( DynamicHtmlModule )
        return moduleWithComponentFactory.componentFactories.find( x => x.componentType === DynamicComponent );
    }

}