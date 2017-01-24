metawidgetConfiguration = function() {

    var pipeline = new metawidget.Pipeline(this.elem);
    pipeline.inspector = new metawidget.inspector.PropertyTypeInspector();
    pipeline.widgetBuilder = new metawidget.widgetbuilder.CompositeWidgetBuilder([new metawidget.widgetbuilder.OverriddenWidgetBuilder(), new metawidget.widgetbuilder.ReadOnlyWidgetBuilder(),
            new metawidget.widgetbuilder.HtmlWidgetBuilder()]);
    pipeline.widgetProcessors = [new metawidget.widgetprocessor.IdProcessor(), new metawidget.widgetprocessor.PlaceholderAttributeProcessor(),
            new metawidget.widgetprocessor.DisabledAttributeProcessor(), new metawidget.widgetprocessor.SimpleBindingProcessor(), new Angular2WidgetProcessor(this.compiler, this.vcRef)];
    pipeline.layout = new metawidget.layout.HeadingTagLayoutDecorator(new metawidget.layout.TableLayout());
    pipeline.buildWidgets(this.jsonSchema, this);

}