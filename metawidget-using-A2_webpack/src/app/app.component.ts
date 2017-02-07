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
	subscription: any;

	constructor() {
	}

	ngOnInit() {
		this.mw.compRef = this;
	}

	/**
	 * THIS IS THE FUNCTION DECLARE IN THE MODEL WHICH IS BEING INSPECTED BY METAWIDGET TO SEND THE CLICK EVENT
	 */
	onClick() {
		//Since Scope is not available in Angular2 we are passing "this" (Current Component Reference)
		alert("Model: " + JSON.stringify(this));
	}

	model = {
		save: this.onClick,
		firstName: "John",
		lastName: "Doe",
		age: 42,
		"address": {
			city: "NY",
			country: "US",
		},
		email: 'john@abc.com'
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
			"save": {
				type: "function"
			}
		}
	};

	config: Object = {
		inspector: new metawidget.inspector.JsonSchemaInspector( this.schemaConfiguration )
	};

}