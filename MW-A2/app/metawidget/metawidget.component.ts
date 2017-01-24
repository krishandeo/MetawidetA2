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

declare var $: any;

@Component({
    selector: 'metawidget',
    template: ''
})
export class MetawidgetComponent implements OnInit {

    @Input()
    schemaConfiguration: Object;
    @Input()
    model = Object;
    elem: Element;
    pipeline: Object;
    path: string;

    constructor(public element: ElementRef, public compiler: Compiler, public vcRef: ViewContainerRef) {
        this.elem = element.nativeElement;
    }

    ngOnInit() {
        metaWidgetConfiguration(this.elem, this.schemaConfiguration, this, this.vcRef, this.compiler);
    }

    clearWidgets() {
        let element = this.getElement();
        while (element.childNodes.length > 0) {
            element.removeChild(element.childNodes[0]);
        }
    }

    overriddenNodes() {
        
    }

    getElement() {
        return this.elem;
    }

}

export function metaWidgetConfiguration(elem: Object, jsonSchema: Object, object: Object, vcRef: ViewContainerRef, compiler: Compiler) {

    let pipeline = new metawidget.Pipeline(elem);
    pipeline._superLayoutWidget = pipeline.layoutWidget;

    pipeline.layoutWidget = function (widget: HTMLElement, elementName: Object, attributes: Object, container: HTMLElement, mw: Object) {

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
        new Angular2WidgetProcessor(compiler, vcRef)];
    pipeline.layout = new metawidget.layout.HeadingTagLayoutDecorator(
        new metawidget.layout.TableLayout( { numberOfColumns: 1 } ));
    pipeline.buildWidgets(jsonSchema, object);

}