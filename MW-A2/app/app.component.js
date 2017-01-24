"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.showForm = false;
        this.model = {};
        this.schemaConfiguration = {
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
    AppComponent.prototype.ngOnInit = function () {
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app',
        template: "\n\t\t<h3>GetUs ROI UI Framework Form Generation Using MW and A2</h3>\n\t\t<div id=\"metawidget\"></div>\n        <form>\n\t\t\t<metawidget [(schemaConfiguration)]=\"schemaConfiguration\" [(model)]=\"model\" ></metawidget>\n\t\t</form>\n\t\t<pre>{{ model | json }}</pre>\n    "
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map