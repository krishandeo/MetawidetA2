import { Component, ViewChild, ViewContainerRef, ElementRef, Compiler, OnInit, Renderer } from '@angular/core';
import '../../public/css/styles.css';

import { MetawidgetComponent } from './metawidget/metawidget.component';
declare var metawidget: any;

@Component({
	selector: 'my-app',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

	@ViewChild(MetawidgetComponent)
	mw: MetawidgetComponent;

	@ViewChild('metawidget', { read: ViewContainerRef })
	metawidgetVCRef: ViewContainerRef;
	metWidgetCompRef: any;

	constructor() {
	}

	ngOnInit() {
		this.mw.rootComponentReference = this;
	}

	/**
	 * THIS IS THE FUNCTION DECLARE IN THE MODEL WHICH IS BEING INSPECTED BY METAWIDGET TO SEND THE CLICK EVENT
	 */
	onClick() {
		//Since Scope is not available in Angular2 we are passing "this" (Current Component Reference)
		alert("Model: " + JSON.stringify(this));
	}

	designation(event: any) {
		alert("Change Event: " + event.target.value);
	}

	save() {
		//Since Scope is not available in Angular2 we are passing "this" (Current Component Reference)
		alert("Model: " + JSON.stringify(this.model));
	}

	model = {
		firstName: "John",
		lastName: "Doe",
		age: 28,
		"address": {
			city: "NY",
			country: "US",
		},
		email: 'john@abc.com',
		"designation": "Full Stack Developer"
	};

	schemaConfiguration: Object = {
		"type": "object",
		"properties": {
			"firstName": {
				"type": "string"
			},
			"lastName": {
				"type": "string"
			},
			"age": {
				"type": "integer"
			},
			"address": {
				"type": "object",
				"properties": {
					"city": {
						"type": "string"
					},
					"country": {
						"type": "string"
					}
				}
			},
			"email": {
				"type": "string"
			},
			"designation": {
				enum: ['Software Developer', 'System Admin', 'Full Stack Developer']
			},
			"save": {
				type: "function"
			}
		}
	};

	config: Object = {
		inspector: new metawidget.inspector.JsonSchemaInspector(this.schemaConfiguration)
	};

}