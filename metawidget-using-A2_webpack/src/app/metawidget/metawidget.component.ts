import {
    Component,
    Input,
    ElementRef,
    OnInit,
    ViewContainerRef,
    Compiler,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Angular2WidgetProcessor } from '../widgetprocessor/angular2-widget-processor.component';
import { DynamicComponentService } from '../dynamicservice/dynamic.service';

declare var metawidget: any;
declare var $: any;

@Component({
    selector: 'metawidget',
    template: ''
})
export class MetawidgetComponent implements OnInit {

    @Input()
    config: Object;
    @Input()
    model: any;
    elem: Element;
    _pipeline: any;
    path: string;

    constructor(public element: ElementRef, public compiler: Compiler, public vcRef: ViewContainerRef) {
        this.elem = element.nativeElement;
    }

    ngOnInit() {
        if( this.model === undefined ) {
            this.model = {};
        }
        metaWidgetConfiguration(this.elem, this.config, this, this.vcRef, this.compiler);
    }

    clearWidgets() {
        let element = this.getElement();
        while (element.childNodes.length > 0) {
            element.removeChild(element.childNodes[0]);
        }
    }

    overriddenNodes() {

    }

    buildNestedMetawidget(attributes: any, config: any) {
        console.log("attributes: " + config);
        if( this.model[attributes.name] === undefined ) {
            this.model[attributes.name] = {};
        }
        var nestedWidget = metawidget.util.createElement(this, 'div');
        var nestedMetawidget = new metawidget.Metawidget(nestedWidget, [this._pipeline, config]);
        nestedMetawidget.path = metawidget.util.appendPath(attributes, this);
        nestedMetawidget.buildWidgets();
        return nestedWidget;
    }

    getElement() {
        return this.elem;
    }

    makeJSONModelFromJSONSchema( jsonSchema: any ) {
        while( true ) {

        }
    }

}

export function metaWidgetConfiguration(elem: Object, schemaConfiguration: Object, reference: any, vcRef: ViewContainerRef, compiler: Compiler) {

    let pipeline = new metawidget.Pipeline(elem);
    pipeline._superLayoutWidget = pipeline.layoutWidget;
    pipeline.layoutWidget = function (widget: any, elementName: Object, attributes: Object, container: HTMLElement, mw: any) {
        if (widget.overridden === undefined) {
            let dynamicService = new DynamicComponentService(compiler);
            widget = dynamicService.getDOMElementOfDynamicTemplate(widget.outerHTML, vcRef, mw.model);
            widget = widget.firstChild;
        }
        pipeline._superLayoutWidget.call(this, widget, elementName, attributes, container, mw);
    }
    pipeline.inspector = new metawidget.inspector.PropertyTypeInspector();
    pipeline.widgetBuilder = new metawidget.widgetbuilder.CompositeWidgetBuilder([
        new metawidget.widgetbuilder.OverriddenWidgetBuilder(),
        new metawidget.widgetbuilder.ReadOnlyWidgetBuilder(),
        new metawidget.widgetbuilder.HtmlWidgetBuilder()]);
    pipeline.widgetProcessors = [
        new metawidget.widgetprocessor.IdProcessor(),
        new metawidget.widgetprocessor.PlaceholderAttributeProcessor(),
        new metawidget.widgetprocessor.DisabledAttributeProcessor(),
        new metawidget.widgetprocessor.SimpleBindingProcessor(),
        new Angular2WidgetProcessor()];
    pipeline.layout = new metawidget.layout.HeadingTagLayoutDecorator(
        new metawidget.layout.TableLayout({ numberOfColumns: 1 }));
    pipeline.configure(schemaConfiguration);
    reference._pipeline = pipeline;
    console.log("Inspect Pipeline: " + JSON.stringify(pipeline.inspect()));
    pipeline.buildWidgets(pipeline.inspect(), reference);
    
}