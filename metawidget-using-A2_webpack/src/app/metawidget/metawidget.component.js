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
var angular2_widget_processor_component_1 = require("../widgetprocessor/angular2-widget-processor.component");
var dynamic_service_1 = require("../dynamicservice/dynamic.service");
var MetawidgetComponent = (function () {
    function MetawidgetComponent(element, compiler, vcRef) {
        this.element = element;
        this.compiler = compiler;
        this.vcRef = vcRef;
        this.model = Object;
        this.elem = element.nativeElement;
    }
    MetawidgetComponent.prototype.ngOnInit = function () {
        metaWidgetConfiguration(this.elem, this.schemaConfiguration, this, this.vcRef, this.compiler);
    };
    MetawidgetComponent.prototype.clearWidgets = function () {
        var element = this.getElement();
        while (element.childNodes.length > 0) {
            element.removeChild(element.childNodes[0]);
        }
    };
    MetawidgetComponent.prototype.overriddenNodes = function () {
    };
    MetawidgetComponent.prototype.getElement = function () {
        return this.elem;
    };
    return MetawidgetComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MetawidgetComponent.prototype, "schemaConfiguration", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MetawidgetComponent.prototype, "model", void 0);
MetawidgetComponent = __decorate([
    core_1.Component({
        selector: 'metawidget',
        template: ''
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Compiler, core_1.ViewContainerRef])
], MetawidgetComponent);
exports.MetawidgetComponent = MetawidgetComponent;
function metaWidgetConfiguration(elem, jsonSchema, object, vcRef, compiler) {
    var pipeline = new metawidget.Pipeline(elem);
    pipeline._superLayoutWidget = pipeline.layoutWidget;
    pipeline.layoutWidget = function (widget, elementName, attributes, container, mw) {
        if (widget.overridden === undefined) {
            var dynamicService = new dynamic_service_1.DynamicComponentService(compiler);
            widget = dynamicService.getDOMElementOfDynamicTemplate(widget.outerHTML, vcRef, mw.model);
            widget = widget.firstChild;
        }
        pipeline._superLayoutWidget.call(this, widget, elementName, attributes, container, mw);
    };
    pipeline.inspector = new metawidget.inspector.PropertyTypeInspector();
    pipeline.widgetBuilder = new metawidget.widgetbuilder.CompositeWidgetBuilder([
        new metawidget.widgetbuilder.OverriddenWidgetBuilder(),
        new metawidget.widgetbuilder.ReadOnlyWidgetBuilder(),
        new metawidget.widgetbuilder.HtmlWidgetBuilder()
    ]);
    pipeline.widgetProcessors = [
        new metawidget.widgetprocessor.IdProcessor(),
        new metawidget.widgetprocessor.PlaceholderAttributeProcessor(),
        new metawidget.widgetprocessor.DisabledAttributeProcessor(),
        new metawidget.widgetprocessor.SimpleBindingProcessor(),
        new angular2_widget_processor_component_1.Angular2WidgetProcessor(compiler, vcRef)
    ];
    pipeline.layout = new metawidget.layout.HeadingTagLayoutDecorator(new metawidget.layout.TableLayout({ numberOfColumns: 1 }));
    pipeline.buildWidgets(jsonSchema, object);
}
exports.metaWidgetConfiguration = metaWidgetConfiguration;
//# sourceMappingURL=metawidget.component.js.map