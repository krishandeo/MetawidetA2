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
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var DynamicComponentService = (function () {
    function DynamicComponentService(compiler) {
        this.compiler = compiler;
    }
    DynamicComponentService.prototype.getDOMElementOfDynamicTemplate = function (template, vcRef, model) {
        if (template.search("bindon-ngmodel") != -1) {
            template = template.replace("bindon-ngmodel", "bindon-ngModel");
        }
        var html = template;
        if (!html)
            return;
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
        var compMetadata = new core_1.Component({
            template: html
        });
        var factory = this.createComponentFactory(this.compiler, compMetadata, model);
        var injector = core_1.ReflectiveInjector.fromResolvedProviders([], vcRef.parentInjector);
        this.cmpRef = vcRef.createComponent(factory, vcRef.length, injector);
        var hostView = this.cmpRef.hostView;
        return hostView.rootNodes[0];
    };
    DynamicComponentService.prototype.createComponentFactory = function (compiler, metadata, model) {
        var DynamicComponent = (function () {
            function DynamicComponent() {
                this.model = model;
            }
            return DynamicComponent;
        }());
        DynamicComponent = __decorate([
            core_1.Component(metadata)
        ], DynamicComponent);
        ;
        var DynamicHtmlModule = (function () {
            function DynamicHtmlModule() {
            }
            return DynamicHtmlModule;
        }());
        DynamicHtmlModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [DynamicComponent]
            })
        ], DynamicHtmlModule);
        var moduleWithComponentFactory = compiler.compileModuleAndAllComponentsSync(DynamicHtmlModule);
        return moduleWithComponentFactory.componentFactories.find(function (x) { return x.componentType === DynamicComponent; });
    };
    return DynamicComponentService;
}());
DynamicComponentService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Compiler])
], DynamicComponentService);
exports.DynamicComponentService = DynamicComponentService;
//# sourceMappingURL=dynamic.service.js.map