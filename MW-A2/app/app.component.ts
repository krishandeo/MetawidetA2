import {
	Component,
	Directive,
	ElementRef,
	NgModule,
	Input,
	ViewContainerRef,
	Compiler,
	ComponentFactory,
	ModuleWithComponentFactories,
	ComponentRef,
	ReflectiveInjector,
	OnInit,
	OnDestroy,
	ComponentFactoryResolver,
	EmbeddedViewRef
} from '@angular/core';
import { Http } from '@angular/http';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
	selector: 'app',
	template: `
		<h3>GetUs ROI UI Framework Form Generation Using MW and A2</h3>
		<div id="metawidget"></div>
        <form>
			<metawidget [(schemaConfiguration)]="schemaConfiguration" [(model)]="model" ></metawidget>
		</form>
		<pre>{{ model | json }}</pre>
    `
})
export class AppComponent implements OnInit {

	cmpRef: ComponentRef<any>;
	serverJSON: JSON;
	showForm: boolean = false;
	constructor(public http: Http) { }

	ngOnInit() {
		
	}

	model = {

	};

	schemaConfiguration: Object = {
		"history": "true",
		"title": "Form 1",
		"properties": {
			"firstName": {
				"required": true,
				"type": "string"
			},
			"lastName": {
				"type": "string"
			}
		}
	};

}