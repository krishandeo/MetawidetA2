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
var dynamic_service_1 = require("../dynamicservice/dynamic.service");
var Angular2WidgetProcessor = (function () {
    function Angular2WidgetProcessor(compiler, viewContainerRef) {
        this.compiler = compiler;
        this.viewContainerRef = viewContainerRef;
    }
    Angular2WidgetProcessor.prototype.processWidget = function (widget, elementName, attributes, mw) {
        var model;
        if (elementName !== "entity") {
            model = metawidget.util.appendPathWithName("model", attributes);
        }
        var widgetString = widget.outerHTML;
        var dynamicService = new dynamic_service_1.DynamicComponentService(this.compiler);
        if (widget.tagName === "INPUT") {
            if (widget.getAttribute("type") === "submit" || widget.getAttribute("type") === "button") {
                widget.setAttribute("on-click", "checkingButton()");
            }
            else {
                widget.setAttribute("bindon-ngModel", model);
            }
        }
        else if (widget.tagName === "SELECT") {
            widget.setAttribute("bindon-ngModel", model);
        }
        else if (widget.tagName === "TEXTAREA") {
            widget.setAttribute("bindon-ngModel", model);
        }
        return widget;
    };
    return Angular2WidgetProcessor;
}());
Angular2WidgetProcessor = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Compiler, core_1.ViewContainerRef])
], Angular2WidgetProcessor);
exports.Angular2WidgetProcessor = Angular2WidgetProcessor;
//# sourceMappingURL=angular2-widget-processor.component.js.map