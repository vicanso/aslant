SystemJS.config({
  paths: {
    "github:": "packages/github/",
    "npm:": "packages/npm/",
    "aslant/": "src/"
  },
  browserConfig: {
    "baseURL": "/static/jspm",
    "bundles": {
      "build.js": [
        "aslant/bootstrap.js",
        "aslant/containers/app.js",
        "aslant/actions/server.js",
        "aslant/constants/action-types.js",
        "aslant/helpers/http.js",
        "aslant/helpers/debug.js",
        "aslant/helpers/globals.js",
        "npm:lodash@4.14.1/lodash.js",
        "npm:lodash@4.14.1.json",
        "npm:debug@2.2.0/browser.js",
        "npm:debug@2.2.0.json",
        "npm:debug@2.2.0/debug.js",
        "npm:ms@0.7.1/index.js",
        "npm:ms@0.7.1.json",
        "npm:uuid@2.0.2/uuid.js",
        "npm:uuid@2.0.2.json",
        "npm:uuid@2.0.2/rng-browser.js",
        "npm:superagent@1.8.3/lib/client.js",
        "npm:superagent@1.8.3.json",
        "npm:superagent@1.8.3/lib/request.js",
        "npm:superagent@1.8.3/lib/is-object.js",
        "npm:superagent@1.8.3/lib/request-base.js",
        "npm:reduce-component@1.0.1/index.js",
        "npm:reduce-component@1.0.1.json",
        "npm:component-emitter@1.2.1/index.js",
        "npm:component-emitter@1.2.1.json",
        "aslant/actions/configure.js",
        "aslant/actions/dashboard.js",
        "aslant/constants/urls.js",
        "aslant/containers/notify-center.js",
        "npm:classnames@2.2.5/index.js",
        "npm:classnames@2.2.5.json",
        "npm:react@15.2.1/react.js",
        "npm:react@15.2.1.json",
        "github:jspm/nodelibs-process@0.2.0-alpha/process.js",
        "github:jspm/nodelibs-process@0.2.0-alpha.json",
        "npm:react@15.2.1/lib/React.js",
        "npm:react@15.2.1/lib/ReactElementValidator.js",
        "npm:fbjs@0.8.3/lib/warning.js",
        "npm:fbjs@0.8.3.json",
        "npm:fbjs@0.8.3/lib/emptyFunction.js",
        "npm:react@15.2.1/lib/getIteratorFn.js",
        "npm:react@15.2.1/lib/canDefineProperty.js",
        "npm:react@15.2.1/lib/checkReactTypeSpec.js",
        "npm:react@15.2.1/lib/ReactComponentTreeDevtool.js",
        "npm:fbjs@0.8.3/lib/invariant.js",
        "npm:react@15.2.1/lib/ReactCurrentOwner.js",
        "npm:react@15.2.1/lib/reactProdInvariant.js",
        "npm:react@15.2.1/lib/ReactPropTypeLocationNames.js",
        "npm:react@15.2.1/lib/ReactPropTypeLocations.js",
        "npm:fbjs@0.8.3/lib/keyMirror.js",
        "npm:react@15.2.1/lib/ReactElement.js",
        "npm:object-assign@4.1.0/index.js",
        "npm:object-assign@4.1.0.json",
        "npm:react@15.2.1/lib/onlyChild.js",
        "npm:react@15.2.1/lib/ReactVersion.js",
        "npm:react@15.2.1/lib/ReactPropTypes.js",
        "npm:react@15.2.1/lib/ReactDOMFactories.js",
        "npm:fbjs@0.8.3/lib/mapObject.js",
        "npm:react@15.2.1/lib/ReactClass.js",
        "npm:fbjs@0.8.3/lib/keyOf.js",
        "npm:fbjs@0.8.3/lib/emptyObject.js",
        "npm:react@15.2.1/lib/ReactNoopUpdateQueue.js",
        "npm:react@15.2.1/lib/ReactComponent.js",
        "npm:react@15.2.1/lib/ReactChildren.js",
        "npm:react@15.2.1/lib/traverseAllChildren.js",
        "npm:react@15.2.1/lib/KeyEscapeUtils.js",
        "npm:react@15.2.1/lib/PooledClass.js",
        "npm:systemjs-plugin-babel@0.0.13/babel-helpers/inherits.js",
        "npm:systemjs-plugin-babel@0.0.13.json",
        "npm:systemjs-plugin-babel@0.0.13/babel-helpers/possibleConstructorReturn.js",
        "npm:systemjs-plugin-babel@0.0.13/babel-helpers/createClass.js",
        "npm:systemjs-plugin-babel@0.0.13/babel-helpers/classCallCheck.js",
        "aslant/containers/influxdb-dashboard-view.js",
        "aslant/constants/common.js",
        "aslant/components/auto-refresh-selector.js",
        "npm:react-select@1.0.0-beta13/lib/Select.js",
        "npm:react-select@1.0.0-beta13.json",
        "npm:react-select@1.0.0-beta13/lib/Value.js",
        "npm:react-select@1.0.0-beta13/lib/Option.js",
        "npm:react-select@1.0.0-beta13/lib/Async.js",
        "npm:react-select@1.0.0-beta13/lib/utils/stripDiacritics.js",
        "npm:react-input-autosize@0.6.13/lib/AutosizeInput.js",
        "npm:react-input-autosize@0.6.13.json",
        "npm:react-dom@15.2.1/index.js",
        "npm:react-dom@15.2.1.json",
        "npm:react@15.2.1/lib/ReactDOM.js",
        "npm:fbjs@0.8.3/lib/ExecutionEnvironment.js",
        "npm:react@15.2.1/lib/renderSubtreeIntoContainer.js",
        "npm:react@15.2.1/lib/ReactMount.js",
        "npm:react@15.2.1/lib/shouldUpdateReactComponent.js",
        "npm:react@15.2.1/lib/setInnerHTML.js",
        "npm:react@15.2.1/lib/createMicrosoftUnsafeLocalFunction.js",
        "npm:react@15.2.1/lib/DOMNamespaces.js",
        "npm:react@15.2.1/lib/instantiateReactComponent.js",
        "npm:react@15.2.1/lib/ReactInstrumentation.js",
        "npm:react@15.2.1/lib/ReactDebugTool.js",
        "npm:fbjs@0.8.3/lib/performanceNow.js",
        "npm:fbjs@0.8.3/lib/performance.js",
        "npm:react@15.2.1/lib/ReactHostOperationHistoryDevtool.js",
        "npm:react@15.2.1/lib/ReactInvalidSetStateWarningDevTool.js",
        "npm:react@15.2.1/lib/ReactHostComponent.js",
        "npm:react@15.2.1/lib/ReactEmptyComponent.js",
        "npm:react@15.2.1/lib/ReactCompositeComponent.js",
        "npm:react@15.2.1/lib/ReactReconciler.js",
        "npm:react@15.2.1/lib/ReactRef.js",
        "npm:react@15.2.1/lib/ReactOwner.js",
        "npm:react@15.2.1/lib/ReactNodeTypes.js",
        "npm:react@15.2.1/lib/ReactInstanceMap.js",
        "npm:react@15.2.1/lib/ReactErrorUtils.js",
        "npm:react@15.2.1/lib/ReactComponentEnvironment.js",
        "npm:react@15.2.1/lib/ReactUpdates.js",
        "npm:react@15.2.1/lib/Transaction.js",
        "npm:react@15.2.1/lib/ReactFeatureFlags.js",
        "npm:react@15.2.1/lib/CallbackQueue.js",
        "npm:react@15.2.1/lib/ReactUpdateQueue.js",
        "npm:react@15.2.1/lib/ReactMarkupChecksum.js",
        "npm:react@15.2.1/lib/adler32.js",
        "npm:react@15.2.1/lib/ReactDOMFeatureFlags.js",
        "npm:react@15.2.1/lib/ReactDOMContainerInfo.js",
        "npm:react@15.2.1/lib/validateDOMNesting.js",
        "npm:react@15.2.1/lib/ReactDOMComponentTree.js",
        "npm:react@15.2.1/lib/ReactDOMComponentFlags.js",
        "npm:react@15.2.1/lib/DOMProperty.js",
        "npm:react@15.2.1/lib/ReactBrowserEventEmitter.js",
        "npm:react@15.2.1/lib/isEventSupported.js",
        "npm:react@15.2.1/lib/getVendorPrefixedEventName.js",
        "npm:react@15.2.1/lib/ViewportMetrics.js",
        "npm:react@15.2.1/lib/ReactEventEmitterMixin.js",
        "npm:react@15.2.1/lib/EventPluginHub.js",
        "npm:react@15.2.1/lib/forEachAccumulated.js",
        "npm:react@15.2.1/lib/accumulateInto.js",
        "npm:react@15.2.1/lib/EventPluginUtils.js",
        "npm:react@15.2.1/lib/EventConstants.js",
        "npm:react@15.2.1/lib/EventPluginRegistry.js",
        "npm:react@15.2.1/lib/DOMLazyTree.js",
        "npm:react@15.2.1/lib/setTextContent.js",
        "npm:react@15.2.1/lib/escapeTextContentForBrowser.js",
        "npm:react@15.2.1/lib/getHostComponentFromComposite.js",
        "npm:react@15.2.1/lib/findDOMNode.js",
        "npm:react@15.2.1/lib/ReactDefaultInjection.js",
        "npm:react@15.2.1/lib/SimpleEventPlugin.js",
        "npm:react@15.2.1/lib/getEventCharCode.js",
        "npm:react@15.2.1/lib/SyntheticWheelEvent.js",
        "npm:react@15.2.1/lib/SyntheticMouseEvent.js",
        "npm:react@15.2.1/lib/getEventModifierState.js",
        "npm:react@15.2.1/lib/SyntheticUIEvent.js",
        "npm:react@15.2.1/lib/getEventTarget.js",
        "npm:react@15.2.1/lib/SyntheticEvent.js",
        "npm:react@15.2.1/lib/SyntheticTransitionEvent.js",
        "npm:react@15.2.1/lib/SyntheticTouchEvent.js",
        "npm:react@15.2.1/lib/SyntheticDragEvent.js",
        "npm:react@15.2.1/lib/SyntheticKeyboardEvent.js",
        "npm:react@15.2.1/lib/getEventKey.js",
        "npm:react@15.2.1/lib/SyntheticFocusEvent.js",
        "npm:react@15.2.1/lib/SyntheticClipboardEvent.js",
        "npm:react@15.2.1/lib/SyntheticAnimationEvent.js",
        "npm:react@15.2.1/lib/EventPropagators.js",
        "npm:fbjs@0.8.3/lib/EventListener.js",
        "npm:react@15.2.1/lib/SelectEventPlugin.js",
        "npm:fbjs@0.8.3/lib/shallowEqual.js",
        "npm:react@15.2.1/lib/isTextInputElement.js",
        "npm:fbjs@0.8.3/lib/getActiveElement.js",
        "npm:react@15.2.1/lib/ReactInputSelection.js",
        "npm:fbjs@0.8.3/lib/focusNode.js",
        "npm:fbjs@0.8.3/lib/containsNode.js",
        "npm:fbjs@0.8.3/lib/isTextNode.js",
        "npm:fbjs@0.8.3/lib/isNode.js",
        "npm:react@15.2.1/lib/ReactDOMSelection.js",
        "npm:react@15.2.1/lib/getTextContentAccessor.js",
        "npm:react@15.2.1/lib/getNodeForCharacterOffset.js",
        "npm:react@15.2.1/lib/SVGDOMPropertyConfig.js",
        "npm:react@15.2.1/lib/ReactReconcileTransaction.js",
        "npm:react@15.2.1/lib/ReactInjection.js",
        "npm:react@15.2.1/lib/ReactEventListener.js",
        "npm:fbjs@0.8.3/lib/getUnboundedScrollPosition.js",
        "npm:react@15.2.1/lib/ReactDefaultBatchingStrategy.js",
        "npm:react@15.2.1/lib/ReactDOMTextComponent.js",
        "npm:react@15.2.1/lib/DOMChildrenOperations.js",
        "npm:react@15.2.1/lib/ReactMultiChildUpdateTypes.js",
        "npm:react@15.2.1/lib/Danger.js",
        "npm:fbjs@0.8.3/lib/createNodesFromMarkup.js",
        "npm:fbjs@0.8.3/lib/getMarkupWrap.js",
        "npm:fbjs@0.8.3/lib/createArrayFromMixed.js",
        "npm:react@15.2.1/lib/ReactDOMTreeTraversal.js",
        "npm:react@15.2.1/lib/ReactDOMEmptyComponent.js",
        "npm:react@15.2.1/lib/ReactDOMComponent.js",
        "npm:react@15.2.1/lib/ReactServerRenderingTransaction.js",
        "npm:react@15.2.1/lib/ReactServerUpdateQueue.js",
        "npm:react@15.2.1/lib/ReactMultiChild.js",
        "npm:react@15.2.1/lib/flattenChildren.js",
        "npm:react@15.2.1/lib/ReactChildReconciler.js",
        "npm:react@15.2.1/lib/ReactDOMTextarea.js",
        "npm:react@15.2.1/lib/LinkedValueUtils.js",
        "npm:react@15.2.1/lib/DisabledInputUtils.js",
        "npm:react@15.2.1/lib/ReactDOMSelect.js",
        "npm:react@15.2.1/lib/ReactDOMOption.js",
        "npm:react@15.2.1/lib/ReactDOMInput.js",
        "npm:react@15.2.1/lib/DOMPropertyOperations.js",
        "npm:react@15.2.1/lib/quoteAttributeValueForBrowser.js",
        "npm:react@15.2.1/lib/ReactDOMInstrumentation.js",
        "npm:react@15.2.1/lib/ReactDOMDebugTool.js",
        "npm:react@15.2.1/lib/ReactDOMUnknownPropertyDevtool.js",
        "npm:react@15.2.1/lib/ReactDOMNullInputValuePropDevtool.js",
        "npm:react@15.2.1/lib/ReactDOMButton.js",
        "npm:react@15.2.1/lib/ReactComponentBrowserEnvironment.js",
        "npm:react@15.2.1/lib/ReactDOMIDOperations.js",
        "npm:react@15.2.1/lib/CSSPropertyOperations.js",
        "npm:fbjs@0.8.3/lib/memoizeStringOnly.js",
        "npm:fbjs@0.8.3/lib/hyphenateStyleName.js",
        "npm:fbjs@0.8.3/lib/hyphenate.js",
        "npm:react@15.2.1/lib/dangerousStyleValue.js",
        "npm:react@15.2.1/lib/CSSProperty.js",
        "npm:fbjs@0.8.3/lib/camelizeStyleName.js",
        "npm:fbjs@0.8.3/lib/camelize.js",
        "npm:react@15.2.1/lib/AutoFocusUtils.js",
        "npm:react@15.2.1/lib/HTMLDOMPropertyConfig.js",
        "npm:react@15.2.1/lib/EnterLeaveEventPlugin.js",
        "npm:react@15.2.1/lib/DefaultEventPluginOrder.js",
        "npm:react@15.2.1/lib/ChangeEventPlugin.js",
        "npm:react@15.2.1/lib/BeforeInputEventPlugin.js",
        "npm:react@15.2.1/lib/SyntheticInputEvent.js",
        "npm:react@15.2.1/lib/SyntheticCompositionEvent.js",
        "npm:react@15.2.1/lib/FallbackCompositionState.js",
        "aslant/components/influxdb-visualization-view.js",
        "aslant/components/radio-selector.js",
        "aslant/components/chart.js",
        "aslant/helpers/echarts-formater.js",
        "aslant/helpers/util.js",
        "npm:echarts@3.2.2/index.js",
        "npm:echarts@3.2.2.json",
        "npm:zrender@3.1.2/lib/vml/vml.js",
        "npm:zrender@3.1.2.json",
        "npm:zrender@3.1.2/lib/vml/Painter.js",
        "npm:zrender@3.1.2/lib/vml/core.js",
        "npm:zrender@3.1.2/lib/core/env.js",
        "npm:zrender@3.1.2/lib/core/log.js",
        "npm:zrender@3.1.2/lib/config.js",
        "npm:zrender@3.1.2/lib/zrender.js",
        "npm:zrender@3.1.2/lib/Painter.js",
        "npm:zrender@3.1.2/lib/graphic/Image.js",
        "npm:zrender@3.1.2/lib/core/LRU.js",
        "npm:zrender@3.1.2/lib/core/util.js",
        "npm:zrender@3.1.2/lib/core/BoundingRect.js",
        "npm:zrender@3.1.2/lib/core/matrix.js",
        "npm:zrender@3.1.2/lib/core/vector.js",
        "npm:zrender@3.1.2/lib/graphic/Displayable.js",
        "npm:zrender@3.1.2/lib/graphic/mixin/RectText.js",
        "npm:zrender@3.1.2/lib/contain/text.js",
        "npm:zrender@3.1.2/lib/Element.js",
        "npm:zrender@3.1.2/lib/mixin/Animatable.js",
        "npm:zrender@3.1.2/lib/animation/Animator.js",
        "npm:zrender@3.1.2/lib/tool/color.js",
        "npm:zrender@3.1.2/lib/animation/Clip.js",
        "npm:zrender@3.1.2/lib/animation/easing.js",
        "npm:zrender@3.1.2/lib/mixin/Transformable.js",
        "npm:zrender@3.1.2/lib/mixin/Eventful.js",
        "npm:zrender@3.1.2/lib/core/guid.js",
        "npm:zrender@3.1.2/lib/graphic/Style.js",
        "npm:zrender@3.1.2/lib/animation/requestAnimationFrame.js",
        "npm:zrender@3.1.2/lib/Layer.js",
        "npm:zrender@3.1.2/lib/graphic/Pattern.js",
        "npm:zrender@3.1.2/lib/core/timsort.js",
        "npm:zrender@3.1.2/lib/dom/HandlerProxy.js",
        "npm:zrender@3.1.2/lib/core/GestureMgr.js",
        "npm:zrender@3.1.2/lib/core/event.js",
        "npm:zrender@3.1.2/lib/animation/Animation.js",
        "npm:zrender@3.1.2/lib/Storage.js",
        "npm:zrender@3.1.2/lib/container/Group.js",
        "npm:zrender@3.1.2/lib/Handler.js",
        "npm:zrender@3.1.2/lib/mixin/Draggable.js",
        "npm:zrender@3.1.2/lib/vml/graphic.js",
        "npm:zrender@3.1.2/lib/graphic/Gradient.js",
        "npm:zrender@3.1.2/lib/graphic/Path.js",
        "npm:zrender@3.1.2/lib/contain/path.js",
        "npm:zrender@3.1.2/lib/contain/windingLine.js",
        "npm:zrender@3.1.2/lib/core/curve.js",
        "npm:zrender@3.1.2/lib/contain/util.js",
        "npm:zrender@3.1.2/lib/contain/arc.js",
        "npm:zrender@3.1.2/lib/contain/quadratic.js",
        "npm:zrender@3.1.2/lib/contain/cubic.js",
        "npm:zrender@3.1.2/lib/contain/line.js",
        "npm:zrender@3.1.2/lib/core/PathProxy.js",
        "npm:zrender@3.1.2/lib/core/bbox.js",
        "npm:zrender@3.1.2/lib/graphic/Text.js",
        "npm:echarts@3.2.2/lib/component/toolbox.js",
        "npm:echarts@3.2.2/lib/component/toolbox/feature/Restore.js",
        "npm:echarts@3.2.2/lib/echarts.js",
        "npm:echarts@3.2.2/lib/util/format.js",
        "npm:echarts@3.2.2/lib/util/number.js",
        "npm:echarts@3.2.2/lib/model/Model.js",
        "npm:echarts@3.2.2/lib/model/mixin/itemStyle.js",
        "npm:echarts@3.2.2/lib/model/mixin/makeStyleMapper.js",
        "npm:echarts@3.2.2/lib/model/mixin/textStyle.js",
        "npm:echarts@3.2.2/lib/model/mixin/areaStyle.js",
        "npm:echarts@3.2.2/lib/model/mixin/lineStyle.js",
        "npm:echarts@3.2.2/lib/util/clazz.js",
        "npm:echarts@3.2.2/lib/data/List.js",
        "npm:echarts@3.2.2/lib/util/model.js",
        "npm:echarts@3.2.2/lib/data/DataDiffer.js",
        "npm:echarts@3.2.2/lib/preprocessor/backwardCompat.js",
        "npm:echarts@3.2.2/lib/preprocessor/helper/compatStyle.js",
        "npm:echarts@3.2.2/lib/visual/seriesColor.js",
        "npm:echarts@3.2.2/lib/loading/default.js",
        "npm:echarts@3.2.2/lib/util/graphic.js",
        "npm:zrender@3.1.2/lib/graphic/RadialGradient.js",
        "npm:zrender@3.1.2/lib/graphic/LinearGradient.js",
        "npm:zrender@3.1.2/lib/graphic/CompoundPath.js",
        "npm:zrender@3.1.2/lib/graphic/shape/Arc.js",
        "npm:zrender@3.1.2/lib/graphic/shape/BezierCurve.js",
        "npm:zrender@3.1.2/lib/graphic/shape/Line.js",
        "npm:zrender@3.1.2/lib/graphic/shape/Rect.js",
        "npm:zrender@3.1.2/lib/graphic/helper/roundRect.js",
        "npm:zrender@3.1.2/lib/graphic/shape/Polyline.js",
        "npm:zrender@3.1.2/lib/graphic/helper/poly.js",
        "npm:zrender@3.1.2/lib/graphic/helper/smoothBezier.js",
        "npm:zrender@3.1.2/lib/graphic/helper/smoothSpline.js",
        "npm:zrender@3.1.2/lib/graphic/shape/Polygon.js",
        "npm:zrender@3.1.2/lib/graphic/shape/Ring.js",
        "npm:zrender@3.1.2/lib/graphic/shape/Sector.js",
        "npm:zrender@3.1.2/lib/graphic/shape/Circle.js",
        "npm:zrender@3.1.2/lib/tool/path.js",
        "npm:zrender@3.1.2/lib/tool/transformPath.js",
        "npm:echarts@3.2.2/lib/view/Chart.js",
        "npm:echarts@3.2.2/lib/util/component.js",
        "npm:echarts@3.2.2/lib/view/Component.js",
        "npm:echarts@3.2.2/lib/model/Series.js",
        "npm:echarts@3.2.2/lib/model/mixin/colorPalette.js",
        "npm:echarts@3.2.2/lib/model/Component.js",
        "npm:echarts@3.2.2/lib/model/mixin/boxLayout.js",
        "npm:echarts@3.2.2/lib/util/layout.js",
        "npm:echarts@3.2.2/lib/model/OptionManager.js",
        "npm:echarts@3.2.2/lib/CoordinateSystem.js",
        "npm:echarts@3.2.2/lib/ExtensionAPI.js",
        "npm:echarts@3.2.2/lib/model/Global.js",
        "npm:echarts@3.2.2/lib/model/globalDefault.js",
        "npm:echarts@3.2.2/lib/component/toolbox/featureManager.js",
        "npm:echarts@3.2.2/lib/component/dataZoom/history.js",
        "npm:echarts@3.2.2/lib/component/toolbox/feature/DataZoom.js",
        "npm:echarts@3.2.2/lib/component/dataZoomSelect.js",
        "npm:echarts@3.2.2/lib/component/dataZoom/dataZoomAction.js",
        "npm:echarts@3.2.2/lib/component/dataZoom/dataZoomProcessor.js",
        "npm:echarts@3.2.2/lib/component/dataZoom/SelectZoomView.js",
        "npm:echarts@3.2.2/lib/component/dataZoom/DataZoomView.js",
        "npm:echarts@3.2.2/lib/component/dataZoom/SelectZoomModel.js",
        "npm:echarts@3.2.2/lib/component/dataZoom/DataZoomModel.js",
        "npm:echarts@3.2.2/lib/component/dataZoom/AxisProxy.js",
        "npm:echarts@3.2.2/lib/component/dataZoom/typeDefaulter.js",
        "npm:echarts@3.2.2/lib/component/helper/brushHelper.js",
        "npm:echarts@3.2.2/lib/component/helper/BrushController.js",
        "npm:echarts@3.2.2/lib/component/helper/interactionMutex.js",
        "npm:echarts@3.2.2/lib/component/toolbox/feature/DataView.js",
        "npm:echarts@3.2.2/lib/component/toolbox/feature/MagicType.js",
        "npm:echarts@3.2.2/lib/component/toolbox/feature/SaveAsImage.js",
        "npm:echarts@3.2.2/lib/component/toolbox/ToolboxView.js",
        "npm:echarts@3.2.2/lib/component/helper/listComponent.js",
        "npm:echarts@3.2.2/lib/component/toolbox/ToolboxModel.js",
        "npm:echarts@3.2.2/lib/component/timeline.js",
        "npm:echarts@3.2.2/lib/component/timeline/SliderTimelineView.js",
        "npm:echarts@3.2.2/lib/coord/axisHelper.js",
        "npm:echarts@3.2.2/lib/scale/Scale.js",
        "npm:echarts@3.2.2/lib/scale/Log.js",
        "npm:echarts@3.2.2/lib/scale/Interval.js",
        "npm:echarts@3.2.2/lib/scale/Time.js",
        "npm:echarts@3.2.2/lib/scale/Ordinal.js",
        "npm:echarts@3.2.2/lib/util/symbol.js",
        "npm:echarts@3.2.2/lib/component/timeline/TimelineAxis.js",
        "npm:echarts@3.2.2/lib/coord/Axis.js",
        "npm:echarts@3.2.2/lib/component/timeline/TimelineView.js",
        "npm:echarts@3.2.2/lib/component/timeline/SliderTimelineModel.js",
        "npm:echarts@3.2.2/lib/component/timeline/TimelineModel.js",
        "npm:echarts@3.2.2/lib/component/timeline/timelineAction.js",
        "npm:echarts@3.2.2/lib/component/timeline/typeDefaulter.js",
        "npm:echarts@3.2.2/lib/component/timeline/preprocessor.js",
        "npm:echarts@3.2.2/lib/component/markArea.js",
        "npm:echarts@3.2.2/lib/component/marker/MarkAreaView.js",
        "npm:echarts@3.2.2/lib/component/marker/MarkerView.js",
        "npm:echarts@3.2.2/lib/component/marker/markerHelper.js",
        "npm:echarts@3.2.2/lib/component/marker/MarkAreaModel.js",
        "npm:echarts@3.2.2/lib/component/marker/MarkerModel.js",
        "npm:echarts@3.2.2/lib/component/markLine.js",
        "npm:echarts@3.2.2/lib/component/marker/MarkLineView.js",
        "npm:echarts@3.2.2/lib/chart/helper/LineDraw.js",
        "npm:echarts@3.2.2/lib/chart/helper/Line.js",
        "npm:echarts@3.2.2/lib/chart/helper/LinePath.js",
        "npm:echarts@3.2.2/lib/component/marker/MarkLineModel.js",
        "npm:echarts@3.2.2/lib/component/markPoint.js",
        "npm:echarts@3.2.2/lib/component/marker/MarkPointView.js",
        "npm:echarts@3.2.2/lib/chart/helper/SymbolDraw.js",
        "npm:echarts@3.2.2/lib/chart/helper/Symbol.js",
        "npm:echarts@3.2.2/lib/component/marker/MarkPointModel.js",
        "npm:echarts@3.2.2/lib/component/visualMap.js",
        "npm:echarts@3.2.2/lib/component/visualMapPiecewise.js",
        "npm:echarts@3.2.2/lib/component/visualMap/visualMapAction.js",
        "npm:echarts@3.2.2/lib/component/visualMap/PiecewiseView.js",
        "npm:echarts@3.2.2/lib/component/visualMap/helper.js",
        "npm:echarts@3.2.2/lib/component/visualMap/VisualMapView.js",
        "npm:echarts@3.2.2/lib/visual/VisualMapping.js",
        "npm:echarts@3.2.2/lib/component/visualMap/PiecewiseModel.js",
        "npm:echarts@3.2.2/lib/component/visualMap/VisualMapModel.js",
        "npm:echarts@3.2.2/lib/visual/visualSolution.js",
        "npm:echarts@3.2.2/lib/visual/visualDefault.js",
        "npm:echarts@3.2.2/lib/component/visualMap/visualEncoding.js",
        "npm:echarts@3.2.2/lib/component/visualMap/typeDefaulter.js",
        "npm:echarts@3.2.2/lib/component/visualMap/preprocessor.js",
        "npm:echarts@3.2.2/lib/component/visualMapContinuous.js",
        "npm:echarts@3.2.2/lib/component/visualMap/ContinuousView.js",
        "npm:echarts@3.2.2/lib/component/helper/sliderMove.js",
        "npm:echarts@3.2.2/lib/component/visualMap/ContinuousModel.js",
        "npm:echarts@3.2.2/lib/component/dataZoom.js",
        "npm:echarts@3.2.2/lib/component/dataZoom/InsideZoomView.js",
        "npm:echarts@3.2.2/lib/component/dataZoom/roams.js",
        "npm:echarts@3.2.2/lib/util/throttle.js",
        "npm:echarts@3.2.2/lib/component/helper/RoamController.js",
        "npm:echarts@3.2.2/lib/component/dataZoom/InsideZoomModel.js",
        "npm:echarts@3.2.2/lib/component/dataZoom/SliderZoomView.js",
        "npm:echarts@3.2.2/lib/component/dataZoom/SliderZoomModel.js",
        "npm:echarts@3.2.2/lib/component/title.js",
        "npm:echarts@3.2.2/lib/component/brush.js",
        "npm:echarts@3.2.2/lib/component/toolbox/feature/Brush.js",
        "npm:echarts@3.2.2/lib/component/brush/brushAction.js",
        "npm:echarts@3.2.2/lib/component/brush/BrushView.js",
        "npm:echarts@3.2.2/lib/component/brush/BrushModel.js",
        "npm:echarts@3.2.2/lib/component/brush/visualEncoding.js",
        "npm:echarts@3.2.2/lib/component/brush/selector.js",
        "npm:zrender@3.1.2/lib/contain/polygon.js",
        "npm:echarts@3.2.2/lib/component/brush/preprocessor.js",
        "npm:echarts@3.2.2/lib/component/singleAxis.js",
        "npm:echarts@3.2.2/lib/coord/single/AxisModel.js",
        "npm:echarts@3.2.2/lib/coord/axisModelCommonMixin.js",
        "npm:echarts@3.2.2/lib/coord/axisModelCreator.js",
        "npm:echarts@3.2.2/lib/coord/axisDefault.js",
        "npm:echarts@3.2.2/lib/component/axis/SingleAxisView.js",
        "npm:echarts@3.2.2/lib/component/axis/AxisBuilder.js",
        "npm:echarts@3.2.2/lib/coord/single/singleCreator.js",
        "npm:echarts@3.2.2/lib/coord/single/Single.js",
        "npm:echarts@3.2.2/lib/coord/single/SingleAxis.js",
        "npm:echarts@3.2.2/lib/component/parallel.js",
        "npm:echarts@3.2.2/lib/coord/parallel/parallelPreprocessor.js",
        "npm:echarts@3.2.2/lib/component/parallelAxis.js",
        "npm:echarts@3.2.2/lib/component/axis/ParallelAxisView.js",
        "npm:echarts@3.2.2/lib/component/axis/parallelAxisAction.js",
        "npm:echarts@3.2.2/lib/coord/parallel/parallelCreator.js",
        "npm:echarts@3.2.2/lib/coord/parallel/Parallel.js",
        "npm:echarts@3.2.2/lib/coord/parallel/ParallelAxis.js",
        "npm:echarts@3.2.2/lib/coord/parallel/ParallelModel.js",
        "npm:echarts@3.2.2/lib/coord/parallel/AxisModel.js",
        "npm:echarts@3.2.2/lib/component/geo.js",
        "npm:echarts@3.2.2/lib/action/geoRoam.js",
        "npm:echarts@3.2.2/lib/action/roamHelper.js",
        "npm:echarts@3.2.2/lib/component/geo/GeoView.js",
        "npm:echarts@3.2.2/lib/component/helper/MapDraw.js",
        "npm:echarts@3.2.2/lib/coord/geo/geoCreator.js",
        "npm:echarts@3.2.2/lib/coord/geo/Geo.js",
        "npm:echarts@3.2.2/lib/coord/geo/fix/geoCoord.js",
        "npm:echarts@3.2.2/lib/coord/geo/fix/textCoord.js",
        "npm:echarts@3.2.2/lib/coord/geo/fix/nanhai.js",
        "npm:echarts@3.2.2/lib/coord/geo/Region.js",
        "npm:echarts@3.2.2/lib/coord/View.js",
        "npm:echarts@3.2.2/lib/coord/geo/parseGeoJson.js",
        "npm:echarts@3.2.2/lib/coord/geo/GeoModel.js",
        "npm:echarts@3.2.2/lib/component/helper/selectableMixin.js",
        "npm:echarts@3.2.2/lib/component/polar.js",
        "npm:echarts@3.2.2/lib/component/radiusAxis.js",
        "npm:echarts@3.2.2/lib/component/axis/RadiusAxisView.js",
        "npm:echarts@3.2.2/lib/coord/polar/polarCreator.js",
        "npm:echarts@3.2.2/lib/coord/polar/PolarModel.js",
        "npm:echarts@3.2.2/lib/coord/polar/AxisModel.js",
        "npm:echarts@3.2.2/lib/coord/polar/Polar.js",
        "npm:echarts@3.2.2/lib/coord/polar/AngleAxis.js",
        "npm:echarts@3.2.2/lib/coord/polar/RadiusAxis.js",
        "npm:echarts@3.2.2/lib/component/angleAxis.js",
        "npm:echarts@3.2.2/lib/component/axis/AngleAxisView.js",
        "npm:echarts@3.2.2/lib/component/tooltip.js",
        "npm:echarts@3.2.2/lib/component/tooltip/TooltipView.js",
        "npm:echarts@3.2.2/lib/component/tooltip/TooltipContent.js",
        "npm:echarts@3.2.2/lib/component/tooltip/TooltipModel.js",
        "npm:echarts@3.2.2/lib/component/legend.js",
        "npm:echarts@3.2.2/lib/component/legend/legendFilter.js",
        "npm:echarts@3.2.2/lib/component/legend/LegendView.js",
        "npm:echarts@3.2.2/lib/component/legend/legendAction.js",
        "npm:echarts@3.2.2/lib/component/legend/LegendModel.js",
        "npm:echarts@3.2.2/lib/component/grid.js",
        "npm:echarts@3.2.2/lib/component/axis.js",
        "npm:echarts@3.2.2/lib/component/axis/AxisView.js",
        "npm:echarts@3.2.2/lib/coord/cartesian/AxisModel.js",
        "npm:echarts@3.2.2/lib/coord/cartesian/Grid.js",
        "npm:echarts@3.2.2/lib/coord/cartesian/GridModel.js",
        "npm:echarts@3.2.2/lib/coord/cartesian/Axis2D.js",
        "npm:echarts@3.2.2/lib/coord/cartesian/axisLabelInterval.js",
        "npm:echarts@3.2.2/lib/coord/cartesian/Cartesian2D.js",
        "npm:echarts@3.2.2/lib/coord/cartesian/Cartesian.js",
        "npm:echarts@3.2.2/lib/chart/heatmap.js",
        "npm:echarts@3.2.2/lib/chart/heatmap/HeatmapView.js",
        "npm:echarts@3.2.2/lib/chart/heatmap/HeatmapLayer.js",
        "npm:echarts@3.2.2/lib/chart/heatmap/HeatmapSeries.js",
        "npm:echarts@3.2.2/lib/chart/helper/createListFromArray.js",
        "npm:echarts@3.2.2/lib/data/helper/completeDimensions.js",
        "npm:echarts@3.2.2/lib/chart/lines.js",
        "npm:echarts@3.2.2/lib/chart/lines/linesLayout.js",
        "npm:echarts@3.2.2/lib/chart/lines/LinesView.js",
        "npm:echarts@3.2.2/lib/chart/helper/LargeLineDraw.js",
        "npm:echarts@3.2.2/lib/chart/helper/EffectPolyline.js",
        "npm:echarts@3.2.2/lib/chart/helper/EffectLine.js",
        "npm:echarts@3.2.2/lib/chart/helper/Polyline.js",
        "npm:echarts@3.2.2/lib/chart/lines/LinesSeries.js",
        "npm:echarts@3.2.2/lib/chart/effectScatter.js",
        "npm:echarts@3.2.2/lib/layout/points.js",
        "npm:echarts@3.2.2/lib/visual/symbol.js",
        "npm:echarts@3.2.2/lib/chart/effectScatter/EffectScatterView.js",
        "npm:echarts@3.2.2/lib/chart/helper/EffectSymbol.js",
        "npm:echarts@3.2.2/lib/chart/effectScatter/EffectScatterSeries.js",
        "npm:echarts@3.2.2/lib/chart/candlestick.js",
        "npm:echarts@3.2.2/lib/chart/candlestick/candlestickLayout.js",
        "npm:echarts@3.2.2/lib/chart/candlestick/candlestickVisual.js",
        "npm:echarts@3.2.2/lib/chart/candlestick/preprocessor.js",
        "npm:echarts@3.2.2/lib/chart/candlestick/CandlestickView.js",
        "npm:echarts@3.2.2/lib/chart/helper/whiskerBoxCommon.js",
        "npm:echarts@3.2.2/lib/chart/helper/WhiskerBoxDraw.js",
        "npm:echarts@3.2.2/lib/chart/candlestick/CandlestickSeries.js",
        "npm:echarts@3.2.2/lib/chart/boxplot.js",
        "npm:echarts@3.2.2/lib/chart/boxplot/boxplotLayout.js",
        "npm:echarts@3.2.2/lib/chart/boxplot/boxplotVisual.js",
        "npm:echarts@3.2.2/lib/chart/boxplot/BoxplotView.js",
        "npm:echarts@3.2.2/lib/chart/boxplot/BoxplotSeries.js",
        "npm:echarts@3.2.2/lib/chart/sankey.js",
        "npm:echarts@3.2.2/lib/chart/sankey/sankeyVisual.js",
        "npm:echarts@3.2.2/lib/chart/sankey/sankeyLayout.js",
        "npm:echarts@3.2.2/lib/util/array/nest.js",
        "npm:echarts@3.2.2/lib/chart/sankey/SankeyView.js",
        "npm:echarts@3.2.2/lib/chart/sankey/SankeySeries.js",
        "npm:echarts@3.2.2/lib/chart/helper/createGraphFromNodeEdge.js",
        "npm:echarts@3.2.2/lib/data/helper/linkList.js",
        "npm:echarts@3.2.2/lib/data/Graph.js",
        "npm:echarts@3.2.2/lib/chart/parallel.js",
        "npm:echarts@3.2.2/lib/chart/parallel/parallelVisual.js",
        "npm:echarts@3.2.2/lib/chart/parallel/ParallelView.js",
        "npm:echarts@3.2.2/lib/chart/parallel/ParallelSeries.js",
        "npm:echarts@3.2.2/lib/chart/funnel.js",
        "npm:echarts@3.2.2/lib/processor/dataFilter.js",
        "npm:echarts@3.2.2/lib/chart/funnel/funnelLayout.js",
        "npm:echarts@3.2.2/lib/visual/dataColor.js",
        "npm:echarts@3.2.2/lib/chart/funnel/FunnelView.js",
        "npm:echarts@3.2.2/lib/chart/funnel/FunnelSeries.js",
        "npm:echarts@3.2.2/lib/chart/gauge.js",
        "npm:echarts@3.2.2/lib/chart/gauge/GaugeView.js",
        "npm:echarts@3.2.2/lib/chart/gauge/PointerPath.js",
        "npm:echarts@3.2.2/lib/chart/gauge/GaugeSeries.js",
        "npm:echarts@3.2.2/lib/chart/graph.js",
        "npm:echarts@3.2.2/lib/chart/graph/createView.js",
        "npm:echarts@3.2.2/lib/chart/graph/forceLayout.js",
        "npm:echarts@3.2.2/lib/chart/graph/circularLayoutHelper.js",
        "npm:echarts@3.2.2/lib/chart/graph/simpleLayoutHelper.js",
        "npm:echarts@3.2.2/lib/chart/graph/simpleLayoutEdge.js",
        "npm:echarts@3.2.2/lib/chart/graph/forceHelper.js",
        "npm:echarts@3.2.2/lib/chart/graph/circularLayout.js",
        "npm:echarts@3.2.2/lib/chart/graph/simpleLayout.js",
        "npm:echarts@3.2.2/lib/chart/graph/edgeVisual.js",
        "npm:echarts@3.2.2/lib/chart/graph/categoryVisual.js",
        "npm:echarts@3.2.2/lib/chart/graph/categoryFilter.js",
        "npm:echarts@3.2.2/lib/chart/graph/roamAction.js",
        "npm:echarts@3.2.2/lib/chart/graph/GraphView.js",
        "npm:echarts@3.2.2/lib/chart/graph/adjustEdge.js",
        "npm:echarts@3.2.2/lib/chart/graph/GraphSeries.js",
        "npm:echarts@3.2.2/lib/chart/treemap.js",
        "npm:echarts@3.2.2/lib/chart/treemap/treemapLayout.js",
        "npm:echarts@3.2.2/lib/chart/treemap/helper.js",
        "npm:echarts@3.2.2/lib/chart/treemap/treemapVisual.js",
        "npm:echarts@3.2.2/lib/chart/treemap/treemapAction.js",
        "npm:echarts@3.2.2/lib/chart/treemap/TreemapView.js",
        "npm:echarts@3.2.2/lib/util/animation.js",
        "npm:echarts@3.2.2/lib/chart/treemap/Breadcrumb.js",
        "npm:echarts@3.2.2/lib/chart/treemap/TreemapSeries.js",
        "npm:echarts@3.2.2/lib/data/Tree.js",
        "npm:echarts@3.2.2/lib/chart/map.js",
        "npm:echarts@3.2.2/lib/action/createDataSelectAction.js",
        "npm:echarts@3.2.2/lib/chart/map/backwardCompat.js",
        "npm:echarts@3.2.2/lib/chart/map/mapDataStatistic.js",
        "npm:echarts@3.2.2/lib/chart/map/mapVisual.js",
        "npm:echarts@3.2.2/lib/chart/map/mapSymbolLayout.js",
        "npm:echarts@3.2.2/lib/chart/map/MapView.js",
        "npm:echarts@3.2.2/lib/chart/map/MapSeries.js",
        "npm:echarts@3.2.2/lib/chart/radar.js",
        "npm:echarts@3.2.2/lib/chart/radar/backwardCompat.js",
        "npm:echarts@3.2.2/lib/chart/radar/radarLayout.js",
        "npm:echarts@3.2.2/lib/chart/radar/RadarView.js",
        "npm:echarts@3.2.2/lib/chart/radar/RadarSeries.js",
        "npm:echarts@3.2.2/lib/component/radar.js",
        "npm:echarts@3.2.2/lib/component/radar/RadarView.js",
        "npm:echarts@3.2.2/lib/coord/radar/RadarModel.js",
        "npm:echarts@3.2.2/lib/coord/radar/Radar.js",
        "npm:echarts@3.2.2/lib/coord/radar/IndicatorAxis.js",
        "npm:echarts@3.2.2/lib/chart/scatter.js",
        "npm:echarts@3.2.2/lib/chart/scatter/ScatterView.js",
        "npm:echarts@3.2.2/lib/chart/helper/LargeSymbolDraw.js",
        "npm:echarts@3.2.2/lib/chart/scatter/ScatterSeries.js",
        "npm:echarts@3.2.2/lib/chart/pie.js",
        "npm:echarts@3.2.2/lib/chart/pie/pieLayout.js",
        "npm:echarts@3.2.2/lib/chart/pie/labelLayout.js",
        "npm:echarts@3.2.2/lib/chart/pie/PieView.js",
        "npm:echarts@3.2.2/lib/chart/pie/PieSeries.js",
        "npm:echarts@3.2.2/lib/chart/bar.js",
        "npm:echarts@3.2.2/lib/layout/barGrid.js",
        "npm:echarts@3.2.2/lib/chart/bar/BarView.js",
        "npm:echarts@3.2.2/lib/chart/bar/barItemStyle.js",
        "npm:echarts@3.2.2/lib/chart/bar/BarSeries.js",
        "npm:echarts@3.2.2/lib/chart/line.js",
        "npm:echarts@3.2.2/lib/processor/dataSample.js",
        "npm:echarts@3.2.2/lib/chart/line/LineView.js",
        "npm:echarts@3.2.2/lib/chart/line/poly.js",
        "npm:echarts@3.2.2/lib/chart/line/lineAnimationDiff.js",
        "npm:echarts@3.2.2/lib/chart/line/LineSeries.js",
        "npm:influx-ql@0.1.4/lib/ql.js",
        "npm:influx-ql@0.1.4.json",
        "github:jspm/nodelibs-util@0.2.0-alpha/util.js",
        "github:jspm/nodelibs-util@0.2.0-alpha.json",
        "github:jspm/nodelibs-util@0.2.0-alpha/isBufferBrowser.js",
        "npm:influx-ql@0.1.4/lib/internal.js",
        "npm:moment@2.14.1/moment.js",
        "npm:moment@2.14.1.json",
        "aslant/components/series-table.js",
        "aslant/components/table.js",
        "aslant/actions/influxdb.js",
        "aslant/containers/influxdb-dashboard-list.js",
        "aslant/actions/navigation.js",
        "aslant/components/puzzle-list.js",
        "aslant/containers/influxdb-dashboard-editor.js",
        "aslant/containers/influxdb-visualization-view-board.js",
        "aslant/containers/influxdb-visualization-editor.js",
        "aslant/containers/visualization-save-dialog.js",
        "aslant/components/dialog.js",
        "aslant/components/parallel-selector.js",
        "aslant/components/date-time-picker.js",
        "npm:rc-time-picker@1.1.5/lib/index.js",
        "npm:rc-time-picker@1.1.5.json",
        "npm:rc-time-picker@1.1.5/lib/TimePicker.js",
        "npm:rc-time-picker@1.1.5/lib/util/index.js",
        "npm:gregorian-calendar-format@4.1.3/lib/gregorian-calendar-format.js",
        "npm:gregorian-calendar-format@4.1.3.json",
        "npm:warning@2.1.0/browser.js",
        "npm:warning@2.1.0.json",
        "npm:gregorian-calendar-format@4.1.3/lib/locale/en_US.js",
        "npm:gregorian-calendar@4.1.4/lib/gregorian-calendar.js",
        "npm:gregorian-calendar@4.1.4.json",
        "npm:gregorian-calendar@4.1.4/lib/const.js",
        "npm:gregorian-calendar@4.1.4/lib/locale/en_US.js",
        "npm:gregorian-calendar@4.1.4/lib/utils.js",
        "npm:rc-time-picker@1.1.5/lib/mixin/CommonMixin.js",
        "npm:rc-time-picker@1.1.5/lib/locale/en_US.js",
        "npm:rc-time-picker@1.1.5/lib/util/placements.js",
        "npm:rc-time-picker@1.1.5/lib/module/Panel.js",
        "npm:rc-time-picker@1.1.5/lib/module/Combobox.js",
        "npm:rc-time-picker@1.1.5/lib/module/Select.js",
        "npm:rc-time-picker@1.1.5/lib/module/Header.js",
        "npm:rc-time-picker@1.1.5/lib/util/selection.js",
        "npm:rc-trigger@1.6.1/lib/index.js",
        "npm:rc-trigger@1.6.1.json",
        "npm:rc-trigger@1.6.1/lib/Trigger.js",
        "npm:rc-trigger@1.6.1/lib/utils.js",
        "npm:rc-trigger@1.6.1/lib/Popup.js",
        "npm:rc-trigger@1.6.1/lib/LazyRenderBox.js",
        "npm:rc-trigger@1.6.1/lib/PopupInner.js",
        "npm:rc-animate@2.3.0/lib/index.js",
        "npm:rc-animate@2.3.0.json",
        "npm:rc-animate@2.3.0/lib/Animate.js",
        "npm:rc-animate@2.3.0/lib/util.js",
        "npm:rc-animate@2.3.0/lib/AnimateChild.js",
        "npm:css-animation@1.2.5/lib/index.js",
        "npm:css-animation@1.2.5.json",
        "npm:component-classes@1.2.6/index.js",
        "npm:component-classes@1.2.6.json",
        "npm:component-indexof@0.0.3/index.js",
        "npm:component-indexof@0.0.3.json",
        "npm:css-animation@1.2.5/lib/Event.js",
        "npm:rc-animate@2.3.0/lib/ChildrenUtils.js",
        "npm:rc-align@2.3.1/lib/index.js",
        "npm:rc-align@2.3.1.json",
        "npm:rc-align@2.3.1/lib/Align.js",
        "npm:rc-align@2.3.1/lib/isWindow.js",
        "npm:rc-util@3.2.1/lib/Dom/addEventListener.js",
        "npm:rc-util@3.2.1.json",
        "npm:add-dom-event-listener@1.0.1/lib/index.js",
        "npm:add-dom-event-listener@1.0.1.json",
        "npm:add-dom-event-listener@1.0.1/lib/EventObject.js",
        "npm:add-dom-event-listener@1.0.1/lib/EventBaseObject.js",
        "npm:dom-align@1.4.0/lib/index.js",
        "npm:dom-align@1.4.0.json",
        "npm:dom-align@1.4.0/lib/getElFuturePos.js",
        "npm:dom-align@1.4.0/lib/getAlignOffset.js",
        "npm:dom-align@1.4.0/lib/getRegion.js",
        "npm:dom-align@1.4.0/lib/utils.js",
        "npm:dom-align@1.4.0/lib/adjustForViewport.js",
        "npm:dom-align@1.4.0/lib/getVisibleRectForElement.js",
        "npm:dom-align@1.4.0/lib/getOffsetParent.js",
        "npm:rc-util@3.2.1/lib/Dom/contains.js",
        "npm:rc-util@3.2.1/lib/createChainedFunction.js",
        "npm:react-datepicker@0.28.1/dist/react-datepicker.min.js",
        "npm:react-datepicker@0.28.1.json",
        "npm:react-onclickoutside@4.9.0/index.js",
        "npm:react-onclickoutside@4.9.0.json",
        "aslant/containers/influxdb-visualization-list.js",
        "aslant/containers/influxdb-server-list.js",
        "aslant/components/server.js",
        "aslant/containers/influxdb-server-editor.js",
        "github:capaj/joi-browser@5.2.0/index.js",
        "github:capaj/joi-browser@5.2.0.json",
        "github:capaj/joi-browser@5.2.0/lib/index.js",
        "github:capaj/joi-browser@5.2.0/lib/string.js",
        "github:capaj/joi-browser@5.2.0/lib/errors.js",
        "github:capaj/joi-browser@5.2.0/lib/language.js",
        "github:capaj/hoek-browser@2.12.0/index.js",
        "github:capaj/hoek-browser@2.12.0.json",
        "github:capaj/hoek-browser@2.12.0/lib/index.js",
        "github:capaj/hoek-browser@2.12.0/lib/escape.js",
        "github:capaj/joi-browser@5.2.0/lib/date.js",
        "npm:moment@2.13.0/moment.js",
        "npm:moment@2.13.0.json",
        "github:capaj/joi-browser@5.2.0/lib/ref.js",
        "github:capaj/joi-browser@5.2.0/lib/any.js",
        "github:capaj/joi-browser@5.2.0/lib/alternatives.js",
        "github:capaj/joi-browser@5.2.0/lib/cast.js",
        "github:capaj/joi-browser@5.2.0/lib/object.js",
        "github:capaj/topo-browser@1.1.0/index.js",
        "github:capaj/topo-browser@1.1.0.json",
        "github:capaj/topo-browser@1.1.0/lib/index.js",
        "github:capaj/joi-browser@5.2.0/lib/boolean.js",
        "github:capaj/joi-browser@5.2.0/lib/number.js",
        "github:capaj/joi-browser@5.2.0/lib/function.js",
        "github:capaj/joi-browser@5.2.0/lib/binary.js",
        "github:capaj/joi-browser@5.2.0/lib/array.js",
        "aslant/containers/main-header.js",
        "aslant/actions/user.js",
        "aslant/helpers/crypto.js",
        "aslant/containers/register-login.js",
        "npm:react-redux@4.4.5/lib/index.js",
        "npm:react-redux@4.4.5.json",
        "npm:react-redux@4.4.5/lib/components/connect.js",
        "npm:invariant@2.2.1/browser.js",
        "npm:invariant@2.2.1.json",
        "npm:hoist-non-react-statics@1.0.6/index.js",
        "npm:hoist-non-react-statics@1.0.6.json",
        "npm:lodash@4.14.1/isPlainObject.js",
        "npm:lodash@4.14.1/isObjectLike.js",
        "npm:lodash@4.14.1/_isHostObject.js",
        "npm:lodash@4.14.1/_getPrototype.js",
        "npm:lodash@4.14.1/_overArg.js",
        "npm:react-redux@4.4.5/lib/utils/warning.js",
        "npm:react-redux@4.4.5/lib/utils/wrapActionCreators.js",
        "npm:redux@3.5.2/lib/index.js",
        "npm:redux@3.5.2.json",
        "npm:redux@3.5.2/lib/utils/warning.js",
        "npm:redux@3.5.2/lib/compose.js",
        "npm:redux@3.5.2/lib/applyMiddleware.js",
        "npm:redux@3.5.2/lib/bindActionCreators.js",
        "npm:redux@3.5.2/lib/combineReducers.js",
        "npm:redux@3.5.2/lib/createStore.js",
        "npm:symbol-observable@0.2.4/index.js",
        "npm:symbol-observable@0.2.4.json",
        "npm:symbol-observable@0.2.4/ponyfill.js",
        "npm:react-redux@4.4.5/lib/utils/shallowEqual.js",
        "npm:react-redux@4.4.5/lib/utils/storeShape.js",
        "npm:react-redux@4.4.5/lib/components/Provider.js",
        "npm:react-enroute@0.0.1/build/index.js",
        "npm:react-enroute@0.0.1.json",
        "npm:enroute@1.0.1/index.js",
        "npm:enroute@1.0.1.json",
        "npm:path-to-regexp@1.5.3/index.js",
        "npm:path-to-regexp@1.5.3.json",
        "npm:isarray@0.0.1/index.js",
        "npm:isarray@0.0.1.json",
        "aslant/store.js",
        "aslant/reducers/index.js",
        "aslant/reducers/notify.js",
        "aslant/reducers/influxdb-server.js",
        "aslant/reducers/navigation.js",
        "aslant/reducers/user.js",
        "npm:redux-logger@2.6.1/lib/index.js",
        "npm:redux-logger@2.6.1.json",
        "npm:redux-thunk@2.1.0/lib/index.js",
        "npm:redux-thunk@2.1.0.json"
      ]
    }
  },
  devConfig: {
    "map": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "core-js": "npm:core-js@2.4.1",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.13",
      "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.8.0"
    },
    "packages": {
      "npm:babel-runtime@5.8.38": {
        "map": {}
      },
      "npm:babel-plugin-transform-react-jsx@6.8.0": {
        "map": {
          "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.8.0",
          "babel-runtime": "npm:babel-runtime@6.11.6",
          "babel-helper-builder-react-jsx": "npm:babel-helper-builder-react-jsx@6.9.0"
        }
      },
      "npm:babel-plugin-syntax-jsx@6.8.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.11.6"
        }
      },
      "npm:babel-runtime@6.11.6": {
        "map": {
          "core-js": "npm:core-js@2.4.1",
          "regenerator-runtime": "npm:regenerator-runtime@0.9.5"
        }
      },
      "npm:babel-helper-builder-react-jsx@6.9.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.11.6",
          "lodash": "npm:lodash@4.14.1",
          "esutils": "npm:esutils@2.0.2",
          "babel-types": "npm:babel-types@6.11.1"
        }
      },
      "npm:babel-types@6.11.1": {
        "map": {
          "esutils": "npm:esutils@2.0.2",
          "babel-runtime": "npm:babel-runtime@6.11.6",
          "lodash": "npm:lodash@4.14.1",
          "babel-traverse": "npm:babel-traverse@6.12.0",
          "to-fast-properties": "npm:to-fast-properties@1.0.2"
        }
      },
      "npm:babel-traverse@6.12.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.11.6",
          "babel-types": "npm:babel-types@6.11.1",
          "lodash": "npm:lodash@4.14.1",
          "babylon": "npm:babylon@6.8.4",
          "debug": "npm:debug@2.2.0",
          "globals": "npm:globals@8.18.0",
          "babel-messages": "npm:babel-messages@6.8.0",
          "invariant": "npm:invariant@2.2.1",
          "babel-code-frame": "npm:babel-code-frame@6.11.0"
        }
      },
      "npm:babylon@6.8.4": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.11.6"
        }
      },
      "npm:babel-messages@6.8.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.11.6"
        }
      },
      "npm:babel-code-frame@6.11.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.11.6",
          "esutils": "npm:esutils@2.0.2",
          "chalk": "npm:chalk@1.1.3",
          "js-tokens": "npm:js-tokens@2.0.0"
        }
      },
      "npm:chalk@1.1.3": {
        "map": {
          "ansi-styles": "npm:ansi-styles@2.2.1",
          "has-ansi": "npm:has-ansi@2.0.0",
          "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
          "strip-ansi": "npm:strip-ansi@3.0.1",
          "supports-color": "npm:supports-color@2.0.0"
        }
      },
      "npm:has-ansi@2.0.0": {
        "map": {
          "ansi-regex": "npm:ansi-regex@2.0.0"
        }
      },
      "npm:strip-ansi@3.0.1": {
        "map": {
          "ansi-regex": "npm:ansi-regex@2.0.0"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  packages: {
    "aslant": {
      "format": "esm",
      "meta": {
        "*.js": {
          "babelOptions": {
            "plugins": [
              "babel-plugin-transform-react-jsx"
            ]
          }
        }
      }
    }
  },
  bundles: {},
  map: {
    "babel": "npm:babel-core@5.8.38"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "classnames": "npm:classnames@2.2.5",
    "constants": "github:jspm/nodelibs-constants@0.2.0-alpha",
    "crypto": "github:jspm/nodelibs-crypto@0.2.0-alpha",
    "debug": "npm:debug@2.2.0",
    "domain": "github:jspm/nodelibs-domain@0.2.0-alpha",
    "echarts": "npm:echarts@3.2.2",
    "events": "github:jspm/nodelibs-events@0.2.0-alpha",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "http": "github:jspm/nodelibs-http@0.2.0-alpha",
    "https": "github:jspm/nodelibs-https@0.2.0-alpha",
    "influx-ql": "npm:influx-ql@0.1.4",
    "joi": "github:capaj/joi-browser@5.2.0",
    "lodash": "npm:lodash@4.14.1",
    "moment": "npm:moment@2.14.1",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "querystring": "github:jspm/nodelibs-querystring@0.2.0-alpha",
    "rc-time-picker": "npm:rc-time-picker@1.1.5",
    "react": "npm:react@15.2.1",
    "react-datepicker": "npm:react-datepicker@0.28.1",
    "react-dom": "npm:react-dom@15.2.1",
    "react-enroute": "npm:react-enroute@0.0.1",
    "react-redux": "npm:react-redux@4.4.5",
    "react-select": "npm:react-select@1.0.0-beta13",
    "redux": "npm:redux@3.5.2",
    "redux-logger": "npm:redux-logger@2.6.1",
    "redux-thunk": "npm:redux-thunk@2.1.0",
    "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
    "string_decoder": "github:jspm/nodelibs-string_decoder@0.2.0-alpha",
    "superagent": "npm:superagent@1.8.3",
    "url": "github:jspm/nodelibs-url@0.2.0-alpha",
    "util": "github:jspm/nodelibs-util@0.2.0-alpha",
    "uuid": "npm:uuid@2.0.2",
    "vm": "github:jspm/nodelibs-vm@0.2.0-alpha",
    "zlib": "github:jspm/nodelibs-zlib@0.2.0-alpha"
  },
  packages: {
    "github:capaj/joi-browser@5.2.0": {
      "map": {
        "hoek": "github:capaj/hoek-browser@2.12.0",
        "moment": "npm:moment@2.13.0",
        "topo": "github:capaj/topo-browser@1.1.0"
      }
    },
    "github:capaj/topo-browser@1.1.0": {
      "map": {
        "hoek": "github:capaj/hoek-browser@2.12.0"
      }
    },
    "npm:add-dom-event-listener@1.0.1": {
      "map": {
        "object-assign": "npm:object-assign@4.1.0"
      }
    },
    "npm:asap@2.0.4": {
      "map": {}
    },
    "npm:asn1.js@4.6.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:async@1.5.2": {
      "map": {}
    },
    "npm:bn.js@4.11.3": {
      "map": {}
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "buffer-xor": "npm:buffer-xor@1.0.3",
        "cipher-base": "npm:cipher-base@1.0.2",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "inherits": "npm:inherits@2.0.1",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.2",
        "des.js": "npm:des.js@1.0.0",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:browserify-sign@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "elliptic": "npm:elliptic@6.2.5",
        "inherits": "npm:inherits@2.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "pako": "npm:pako@0.2.8",
        "readable-stream": "npm:readable-stream@2.1.4"
      }
    },
    "npm:buffer-shims@1.0.0": {
      "map": {}
    },
    "npm:buffer-xor@1.0.3": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:cipher-base@1.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:combined-stream@1.0.5": {
      "map": {
        "delayed-stream": "npm:delayed-stream@1.0.0"
      }
    },
    "npm:component-classes@1.2.6": {
      "map": {
        "component-indexof": "npm:component-indexof@0.0.3"
      }
    },
    "npm:core-js@1.2.6": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:core-util-is@1.0.2": {
      "map": {}
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "elliptic": "npm:elliptic@6.2.5"
      }
    },
    "npm:create-hash@1.1.2": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "ripemd160": "npm:ripemd160@1.0.1",
        "sha.js": "npm:sha.js@2.4.5"
      }
    },
    "npm:create-hmac@1.1.4": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "browserify-sign": "npm:browserify-sign@4.0.0",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "inherits": "npm:inherits@2.0.1",
        "pbkdf2": "npm:pbkdf2@3.0.4",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:css-animation@1.2.5": {
      "map": {
        "component-classes": "npm:component-classes@1.2.6"
      }
    },
    "npm:debug@2.2.0": {
      "map": {
        "ms": "npm:ms@0.7.1"
      }
    },
    "npm:delayed-stream@1.0.0": {
      "map": {}
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "miller-rabin": "npm:miller-rabin@4.0.0",
        "randombytes": "npm:randombytes@2.0.3",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:domain-browser@1.1.7": {
      "map": {}
    },
    "npm:echarts@3.2.2": {
      "map": {
        "zrender": "npm:zrender@3.1.2"
      }
    },
    "npm:elliptic@6.2.5": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "brorand": "npm:brorand@1.0.5",
        "hash.js": "npm:hash.js@1.0.3",
        "inherits": "npm:inherits@2.0.1",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.13"
      }
    },
    "npm:enroute@1.0.1": {
      "map": {
        "object-assign": "npm:object-assign@4.1.0",
        "path-to-regexp": "npm:path-to-regexp@1.5.3"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:fbjs@0.8.3": {
      "map": {
        "core-js": "npm:core-js@1.2.6",
        "immutable": "npm:immutable@3.8.1",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "loose-envify": "npm:loose-envify@1.2.0",
        "object-assign": "npm:object-assign@4.1.0",
        "promise": "npm:promise@7.1.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.10"
      }
    },
    "npm:form-data@1.0.0-rc3": {
      "map": {
        "async": "npm:async@1.5.2",
        "combined-stream": "npm:combined-stream@1.0.5",
        "mime-types": "npm:mime-types@2.1.11"
      }
    },
    "npm:formidable@1.0.17": {
      "map": {}
    },
    "npm:gregorian-calendar-format@4.1.3": {
      "map": {
        "gregorian-calendar": "npm:gregorian-calendar@4.1.4",
        "warning": "npm:warning@2.1.0"
      }
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:iconv-lite@0.4.13": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:influx-ql@0.1.4": {
      "map": {}
    },
    "npm:inherits@2.0.1": {
      "map": {}
    },
    "npm:invariant@2.2.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.2.0"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "node-fetch": "npm:node-fetch@1.5.3",
        "whatwg-fetch": "npm:whatwg-fetch@1.0.0"
      }
    },
    "npm:lodash.keys@3.1.2": {
      "map": {
        "lodash._getnative": "npm:lodash._getnative@3.9.1",
        "lodash.isarguments": "npm:lodash.isarguments@3.0.8",
        "lodash.isarray": "npm:lodash.isarray@3.0.4"
      }
    },
    "npm:loose-envify@1.2.0": {
      "map": {
        "js-tokens": "npm:js-tokens@1.0.3"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "brorand": "npm:brorand@1.0.5"
      }
    },
    "npm:mime-db@1.23.0": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:mime-types@2.1.11": {
      "map": {
        "mime-db": "npm:mime-db@1.23.0"
      }
    },
    "npm:mime@1.3.4": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:node-fetch@1.5.3": {
      "map": {
        "encoding": "npm:encoding@0.1.12",
        "is-stream": "npm:is-stream@1.1.0"
      }
    },
    "npm:pako@0.2.8": {
      "map": {}
    },
    "npm:parse-asn1@5.0.0": {
      "map": {
        "asn1.js": "npm:asn1.js@4.6.0",
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.4",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:path-to-regexp@1.5.3": {
      "map": {
        "isarray": "npm:isarray@0.0.1"
      }
    },
    "npm:pbkdf2@3.0.4": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:process-nextick-args@1.0.7": {
      "map": {}
    },
    "npm:promise@7.1.1": {
      "map": {
        "asap": "npm:asap@2.0.4"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "create-hash": "npm:create-hash@1.1.2",
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:punycode@1.3.2": {
      "map": {}
    },
    "npm:randombytes@2.0.3": {
      "map": {}
    },
    "npm:rc-align@2.3.1": {
      "map": {
        "dom-align": "npm:dom-align@1.4.0",
        "rc-util": "npm:rc-util@3.2.1"
      }
    },
    "npm:rc-animate@2.3.0": {
      "map": {
        "css-animation": "npm:css-animation@1.2.5"
      }
    },
    "npm:rc-time-picker@1.1.5": {
      "map": {
        "classnames": "npm:classnames@2.2.5",
        "gregorian-calendar": "npm:gregorian-calendar@4.1.4",
        "gregorian-calendar-format": "npm:gregorian-calendar-format@4.1.3",
        "rc-trigger": "npm:rc-trigger@1.6.1"
      }
    },
    "npm:rc-trigger@1.6.1": {
      "map": {
        "rc-align": "npm:rc-align@2.3.1",
        "rc-animate": "npm:rc-animate@2.3.0",
        "rc-util": "npm:rc-util@3.2.1"
      }
    },
    "npm:rc-util@3.2.1": {
      "map": {
        "add-dom-event-listener": "npm:add-dom-event-listener@1.0.1",
        "classnames": "npm:classnames@2.2.5",
        "shallowequal": "npm:shallowequal@0.2.2"
      }
    },
    "npm:react-datepicker@0.28.1": {
      "map": {
        "classnames": "npm:classnames@2.2.5",
        "moment": "npm:moment@2.14.1",
        "react": "npm:react@15.2.1",
        "react-dom": "npm:react-dom@15.2.1",
        "react-onclickoutside": "npm:react-onclickoutside@4.9.0",
        "tether": "npm:tether@1.3.2"
      }
    },
    "npm:react-dom@15.2.1": {
      "map": {
        "react": "npm:react@15.2.1"
      }
    },
    "npm:react-enroute@0.0.1": {
      "map": {
        "enroute": "npm:enroute@1.0.1",
        "invariant": "npm:invariant@2.2.1",
        "react": "npm:react@15.2.1"
      }
    },
    "npm:react-input-autosize@0.6.13": {
      "map": {
        "react": "npm:react@15.2.1"
      }
    },
    "npm:react-onclickoutside@4.9.0": {
      "map": {
        "object-assign": "npm:object-assign@4.1.0"
      }
    },
    "npm:react-redux@4.4.5": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@1.0.6",
        "invariant": "npm:invariant@2.2.1",
        "lodash": "npm:lodash@4.14.1",
        "loose-envify": "npm:loose-envify@1.2.0",
        "react": "npm:react@15.2.1",
        "redux": "npm:redux@3.5.2"
      }
    },
    "npm:react-select@1.0.0-beta13": {
      "map": {
        "classnames": "npm:classnames@2.2.5",
        "react": "npm:react@15.2.1",
        "react-dom": "npm:react-dom@15.2.1",
        "react-input-autosize": "npm:react-input-autosize@0.6.13"
      }
    },
    "npm:react@15.2.1": {
      "map": {
        "fbjs": "npm:fbjs@0.8.3",
        "loose-envify": "npm:loose-envify@1.2.0",
        "object-assign": "npm:object-assign@4.1.0"
      }
    },
    "npm:readable-stream@1.0.27-1": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@0.0.1",
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:readable-stream@2.1.4": {
      "map": {
        "buffer-shims": "npm:buffer-shims@1.0.0",
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@1.0.0",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "string_decoder": "npm:string_decoder@0.10.31",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    },
    "npm:redux@3.5.2": {
      "map": {
        "lodash": "npm:lodash@4.14.1",
        "lodash-es": "npm:lodash-es@4.13.1",
        "loose-envify": "npm:loose-envify@1.2.0",
        "symbol-observable": "npm:symbol-observable@0.2.4"
      }
    },
    "npm:ripemd160@1.0.1": {
      "map": {}
    },
    "npm:sha.js@2.4.5": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:shallowequal@0.2.2": {
      "map": {
        "lodash.keys": "npm:lodash.keys@3.1.2"
      }
    },
    "npm:string_decoder@0.10.31": {
      "map": {}
    },
    "npm:superagent@1.8.3": {
      "map": {
        "component-emitter": "npm:component-emitter@1.2.1",
        "cookiejar": "npm:cookiejar@2.0.6",
        "debug": "npm:debug@2.2.0",
        "extend": "npm:extend@3.0.0",
        "form-data": "npm:form-data@1.0.0-rc3",
        "formidable": "npm:formidable@1.0.17",
        "methods": "npm:methods@1.1.2",
        "mime": "npm:mime@1.3.4",
        "qs": "npm:qs@2.3.3",
        "readable-stream": "npm:readable-stream@1.0.27-1",
        "reduce-component": "npm:reduce-component@1.0.1",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:tether@1.3.2": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:ua-parser-js@0.7.10": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:util-deprecate@1.0.2": {
      "map": {}
    },
    "npm:uuid@2.0.2": {
      "map": {}
    },
    "npm:warning@2.1.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.2.0"
      }
    },
    "npm:zrender@3.1.2": {
      "map": {}
    },
    "github:jspm/nodelibs-crypto@0.2.0-alpha": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.7.1"
      }
    },
    "github:jspm/nodelibs-string_decoder@0.2.0-alpha": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    },
    "npm:buffer@4.7.1": {
      "map": {
        "ieee754": "npm:ieee754@1.1.6",
        "isarray": "npm:isarray@1.0.0",
        "base64-js": "npm:base64-js@1.1.2"
      }
    },
    "github:jspm/nodelibs-http@0.2.0-alpha": {
      "map": {
        "http-browserify": "npm:stream-http@2.3.1"
      }
    },
    "github:jspm/nodelibs-url@0.2.0-alpha": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "npm:stream-http@2.3.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@2.1.4",
        "xtend": "npm:xtend@4.0.1",
        "builtin-status-codes": "npm:builtin-status-codes@2.0.0",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "github:jspm/nodelibs-stream@0.2.0-alpha": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@2.1.4"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "github:jspm/nodelibs-zlib@0.2.0-alpha": {
      "map": {
        "zlib-browserify": "npm:browserify-zlib@0.1.4"
      }
    },
    "github:jspm/nodelibs-domain@0.2.0-alpha": {
      "map": {
        "domain-browserify": "npm:domain-browser@1.1.7"
      }
    }
  }
});
