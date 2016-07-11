System.config({
  baseURL: "/static/jspm",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "packages/github/*",
    "npm:*": "packages/npm/*"
  },
  bundles: {
    "dev.js": [
      "npm:uuid@2.0.2.js",
      "npm:uuid@2.0.2/uuid.js",
      "npm:uuid@2.0.2/rng-browser.js",
      "npm:superagent@1.8.3.js",
      "npm:superagent@1.8.3/lib/client.js",
      "npm:superagent@1.8.3/lib/request.js",
      "npm:superagent@1.8.3/lib/is-object.js",
      "npm:superagent@1.8.3/lib/request-base.js",
      "github:jspm/nodelibs-buffer@0.1.0.js",
      "github:jspm/nodelibs-buffer@0.1.0/index.js",
      "npm:buffer@3.6.0.js",
      "npm:buffer@3.6.0/index.js",
      "npm:isarray@1.0.0.js",
      "npm:isarray@1.0.0/index.js",
      "npm:ieee754@1.1.6.js",
      "npm:ieee754@1.1.6/index.js",
      "npm:base64-js@0.0.8.js",
      "npm:base64-js@0.0.8/lib/b64.js",
      "npm:reduce-component@1.0.1.js",
      "npm:reduce-component@1.0.1/index.js",
      "npm:component-emitter@1.2.1.js",
      "npm:component-emitter@1.2.1/index.js",
      "npm:redux-thunk@2.1.0.js",
      "npm:redux-thunk@2.1.0/lib/index.js",
      "npm:redux-logger@2.6.1.js",
      "npm:redux-logger@2.6.1/lib/index.js",
      "npm:react-select@1.0.0-beta13.js",
      "npm:react-select@1.0.0-beta13/lib/Select.js",
      "npm:react-select@1.0.0-beta13/lib/Value.js",
      "npm:classnames@2.2.5.js",
      "npm:classnames@2.2.5/index.js",
      "npm:react@15.2.1.js",
      "npm:react@15.2.1/react.js",
      "npm:react@15.2.1/lib/React.js",
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "npm:process@0.11.5.js",
      "npm:process@0.11.5/browser.js",
      "npm:react@15.2.1/lib/ReactElementValidator.js",
      "npm:fbjs@0.8.3/lib/warning.js",
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
      "npm:object-assign@4.1.0.js",
      "npm:object-assign@4.1.0/index.js",
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
      "npm:react-select@1.0.0-beta13/lib/Option.js",
      "npm:react-select@1.0.0-beta13/lib/Async.js",
      "npm:react-select@1.0.0-beta13/lib/utils/stripDiacritics.js",
      "npm:react-input-autosize@0.6.13.js",
      "npm:react-input-autosize@0.6.13/lib/AutosizeInput.js",
      "npm:react-dom@15.2.1.js",
      "npm:react-dom@15.2.1/index.js",
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
      "npm:react-redux@4.4.5.js",
      "npm:react-redux@4.4.5/lib/index.js",
      "npm:react-redux@4.4.5/lib/components/connect.js",
      "npm:invariant@2.2.1.js",
      "npm:invariant@2.2.1/browser.js",
      "npm:hoist-non-react-statics@1.0.6.js",
      "npm:hoist-non-react-statics@1.0.6/index.js",
      "npm:lodash@4.13.1/isPlainObject.js",
      "npm:lodash@4.13.1/isObjectLike.js",
      "npm:lodash@4.13.1/_isHostObject.js",
      "npm:lodash@4.13.1/_getPrototype.js",
      "npm:react-redux@4.4.5/lib/utils/warning.js",
      "npm:react-redux@4.4.5/lib/utils/wrapActionCreators.js",
      "npm:redux@3.5.2.js",
      "npm:redux@3.5.2/lib/index.js",
      "npm:redux@3.5.2/lib/utils/warning.js",
      "npm:redux@3.5.2/lib/compose.js",
      "npm:redux@3.5.2/lib/applyMiddleware.js",
      "npm:redux@3.5.2/lib/bindActionCreators.js",
      "npm:redux@3.5.2/lib/combineReducers.js",
      "npm:redux@3.5.2/lib/createStore.js",
      "npm:symbol-observable@0.2.4.js",
      "npm:symbol-observable@0.2.4/index.js",
      "npm:symbol-observable@0.2.4/ponyfill.js",
      "npm:react-redux@4.4.5/lib/utils/shallowEqual.js",
      "npm:react-redux@4.4.5/lib/utils/storeShape.js",
      "npm:react-redux@4.4.5/lib/components/Provider.js",
      "npm:react-enroute@0.0.1.js",
      "npm:react-enroute@0.0.1/build/index.js",
      "npm:enroute@1.0.1.js",
      "npm:enroute@1.0.1/index.js",
      "npm:path-to-regexp@1.5.3.js",
      "npm:path-to-regexp@1.5.3/index.js",
      "npm:isarray@0.0.1.js",
      "npm:isarray@0.0.1/index.js",
      "npm:react-datepicker@0.28.1.js",
      "npm:react-datepicker@0.28.1/dist/react-datepicker.min.js",
      "npm:react-onclickoutside@4.9.0.js",
      "npm:react-onclickoutside@4.9.0/index.js",
      "npm:moment@2.14.1.js",
      "npm:moment@2.14.1/moment.js",
      "npm:rc-time-picker@1.1.5.js",
      "npm:rc-time-picker@1.1.5/lib/index.js",
      "npm:rc-time-picker@1.1.5/lib/TimePicker.js",
      "npm:rc-time-picker@1.1.5/lib/util/index.js",
      "npm:gregorian-calendar-format@4.1.3.js",
      "npm:gregorian-calendar-format@4.1.3/lib/gregorian-calendar-format.js",
      "npm:warning@2.1.0.js",
      "npm:warning@2.1.0/browser.js",
      "npm:gregorian-calendar-format@4.1.3/lib/locale/en_US.js",
      "npm:gregorian-calendar@4.1.4.js",
      "npm:gregorian-calendar@4.1.4/lib/gregorian-calendar.js",
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
      "npm:rc-trigger@1.6.1.js",
      "npm:rc-trigger@1.6.1/lib/index.js",
      "npm:rc-trigger@1.6.1/lib/Trigger.js",
      "npm:rc-trigger@1.6.1/lib/utils.js",
      "npm:rc-trigger@1.6.1/lib/Popup.js",
      "npm:rc-trigger@1.6.1/lib/LazyRenderBox.js",
      "npm:rc-trigger@1.6.1/lib/PopupInner.js",
      "npm:rc-animate@2.3.0.js",
      "npm:rc-animate@2.3.0/lib/index.js",
      "npm:rc-animate@2.3.0/lib/Animate.js",
      "npm:rc-animate@2.3.0/lib/util.js",
      "npm:rc-animate@2.3.0/lib/AnimateChild.js",
      "npm:css-animation@1.2.5.js",
      "npm:css-animation@1.2.5/lib/index.js",
      "npm:component-classes@1.2.6.js",
      "npm:component-classes@1.2.6/index.js",
      "npm:component-indexof@0.0.3.js",
      "npm:component-indexof@0.0.3/index.js",
      "npm:css-animation@1.2.5/lib/Event.js",
      "npm:rc-animate@2.3.0/lib/ChildrenUtils.js",
      "npm:rc-align@2.3.1.js",
      "npm:rc-align@2.3.1/lib/index.js",
      "npm:rc-align@2.3.1/lib/Align.js",
      "npm:rc-align@2.3.1/lib/isWindow.js",
      "npm:rc-util@3.2.1/lib/Dom/addEventListener.js",
      "npm:add-dom-event-listener@1.0.1.js",
      "npm:add-dom-event-listener@1.0.1/lib/index.js",
      "npm:add-dom-event-listener@1.0.1/lib/EventObject.js",
      "npm:add-dom-event-listener@1.0.1/lib/EventBaseObject.js",
      "npm:dom-align@1.4.0.js",
      "npm:dom-align@1.4.0/lib/index.js",
      "npm:dom-align@1.4.0/lib/getElFuturePos.js",
      "npm:dom-align@1.4.0/lib/getAlignOffset.js",
      "npm:dom-align@1.4.0/lib/getRegion.js",
      "npm:dom-align@1.4.0/lib/utils.js",
      "npm:dom-align@1.4.0/lib/adjustForViewport.js",
      "npm:dom-align@1.4.0/lib/getVisibleRectForElement.js",
      "npm:dom-align@1.4.0/lib/getOffsetParent.js",
      "npm:rc-util@3.2.1/lib/Dom/contains.js",
      "npm:rc-util@3.2.1/lib/createChainedFunction.js",
      "npm:lodash@4.13.1.js",
      "npm:lodash@4.13.1/lodash.js",
      "npm:influx-ql@0.1.4.js",
      "npm:influx-ql@0.1.4/lib/ql.js",
      "github:jspm/nodelibs-util@0.1.0.js",
      "github:jspm/nodelibs-util@0.1.0/index.js",
      "npm:util@0.10.3.js",
      "npm:util@0.10.3/util.js",
      "npm:inherits@2.0.1.js",
      "npm:inherits@2.0.1/inherits_browser.js",
      "npm:util@0.10.3/support/isBufferBrowser.js",
      "npm:influx-ql@0.1.4/lib/internal.js",
      "npm:debug@2.2.0.js",
      "npm:debug@2.2.0/browser.js",
      "npm:debug@2.2.0/debug.js",
      "npm:ms@0.7.1.js",
      "npm:ms@0.7.1/index.js",
      "npm:babel-runtime@5.8.38/helpers/inherits.js",
      "npm:babel-runtime@5.8.38/core-js/object/set-prototype-of.js",
      "npm:core-js@1.2.6/library/fn/object/set-prototype-of.js",
      "npm:core-js@1.2.6/library/modules/$.core.js",
      "npm:core-js@1.2.6/library/modules/es6.object.set-prototype-of.js",
      "npm:core-js@1.2.6/library/modules/$.set-proto.js",
      "npm:core-js@1.2.6/library/modules/$.ctx.js",
      "npm:core-js@1.2.6/library/modules/$.a-function.js",
      "npm:core-js@1.2.6/library/modules/$.an-object.js",
      "npm:core-js@1.2.6/library/modules/$.is-object.js",
      "npm:core-js@1.2.6/library/modules/$.js",
      "npm:core-js@1.2.6/library/modules/$.export.js",
      "npm:core-js@1.2.6/library/modules/$.global.js",
      "npm:babel-runtime@5.8.38/core-js/object/create.js",
      "npm:core-js@1.2.6/library/fn/object/create.js",
      "npm:babel-runtime@5.8.38/helpers/get.js",
      "npm:babel-runtime@5.8.38/core-js/object/get-own-property-descriptor.js",
      "npm:core-js@1.2.6/library/fn/object/get-own-property-descriptor.js",
      "npm:core-js@1.2.6/library/modules/es6.object.get-own-property-descriptor.js",
      "npm:core-js@1.2.6/library/modules/$.object-sap.js",
      "npm:core-js@1.2.6/library/modules/$.fails.js",
      "npm:core-js@1.2.6/library/modules/$.to-iobject.js",
      "npm:core-js@1.2.6/library/modules/$.defined.js",
      "npm:core-js@1.2.6/library/modules/$.iobject.js",
      "npm:core-js@1.2.6/library/modules/$.cof.js",
      "npm:babel-runtime@5.8.38/helpers/create-class.js",
      "npm:babel-runtime@5.8.38/core-js/object/define-property.js",
      "npm:core-js@1.2.6/library/fn/object/define-property.js",
      "npm:babel-runtime@5.8.38/helpers/class-call-check.js",
      "npm:babel-runtime@5.8.38/core-js/promise.js",
      "npm:core-js@1.2.6/library/fn/promise.js",
      "npm:core-js@1.2.6/library/modules/es6.promise.js",
      "npm:core-js@1.2.6/library/modules/$.iter-detect.js",
      "npm:core-js@1.2.6/library/modules/$.wks.js",
      "npm:core-js@1.2.6/library/modules/$.uid.js",
      "npm:core-js@1.2.6/library/modules/$.shared.js",
      "npm:core-js@1.2.6/library/modules/$.set-species.js",
      "npm:core-js@1.2.6/library/modules/$.descriptors.js",
      "npm:core-js@1.2.6/library/modules/$.set-to-string-tag.js",
      "npm:core-js@1.2.6/library/modules/$.has.js",
      "npm:core-js@1.2.6/library/modules/$.redefine-all.js",
      "npm:core-js@1.2.6/library/modules/$.redefine.js",
      "npm:core-js@1.2.6/library/modules/$.hide.js",
      "npm:core-js@1.2.6/library/modules/$.property-desc.js",
      "npm:core-js@1.2.6/library/modules/$.microtask.js",
      "npm:core-js@1.2.6/library/modules/$.task.js",
      "npm:core-js@1.2.6/library/modules/$.dom-create.js",
      "npm:core-js@1.2.6/library/modules/$.html.js",
      "npm:core-js@1.2.6/library/modules/$.invoke.js",
      "npm:core-js@1.2.6/library/modules/$.species-constructor.js",
      "npm:core-js@1.2.6/library/modules/$.same-value.js",
      "npm:core-js@1.2.6/library/modules/$.for-of.js",
      "npm:core-js@1.2.6/library/modules/core.get-iterator-method.js",
      "npm:core-js@1.2.6/library/modules/$.iterators.js",
      "npm:core-js@1.2.6/library/modules/$.classof.js",
      "npm:core-js@1.2.6/library/modules/$.to-length.js",
      "npm:core-js@1.2.6/library/modules/$.to-integer.js",
      "npm:core-js@1.2.6/library/modules/$.is-array-iter.js",
      "npm:core-js@1.2.6/library/modules/$.iter-call.js",
      "npm:core-js@1.2.6/library/modules/$.strict-new.js",
      "npm:core-js@1.2.6/library/modules/$.library.js",
      "npm:core-js@1.2.6/library/modules/web.dom.iterable.js",
      "npm:core-js@1.2.6/library/modules/es6.array.iterator.js",
      "npm:core-js@1.2.6/library/modules/$.iter-define.js",
      "npm:core-js@1.2.6/library/modules/$.iter-create.js",
      "npm:core-js@1.2.6/library/modules/$.iter-step.js",
      "npm:core-js@1.2.6/library/modules/$.add-to-unscopables.js",
      "npm:core-js@1.2.6/library/modules/es6.string.iterator.js",
      "npm:core-js@1.2.6/library/modules/$.string-at.js",
      "npm:core-js@1.2.6/library/modules/es6.object.to-string.js",
      "npm:babel-runtime@5.8.38/core-js/object/assign.js",
      "npm:core-js@1.2.6/library/fn/object/assign.js",
      "npm:core-js@1.2.6/library/modules/es6.object.assign.js",
      "npm:core-js@1.2.6/library/modules/$.object-assign.js",
      "npm:core-js@1.2.6/library/modules/$.to-object.js",
      "github:capaj/joi-browser@5.2.0.js",
      "github:capaj/joi-browser@5.2.0/index.js",
      "github:capaj/joi-browser@5.2.0/lib/index.js",
      "github:capaj/joi-browser@5.2.0/lib/string.js",
      "github:capaj/joi-browser@5.2.0/lib/errors.js",
      "github:capaj/joi-browser@5.2.0/lib/language.js",
      "github:capaj/hoek-browser@2.12.0.js",
      "github:capaj/hoek-browser@2.12.0/index.js",
      "github:capaj/hoek-browser@2.12.0/lib/index.js",
      "github:capaj/hoek-browser@2.12.0/lib/escape.js",
      "github:capaj/joi-browser@5.2.0/lib/date.js",
      "npm:moment@2.13.0.js",
      "npm:moment@2.13.0/moment.js",
      "github:capaj/joi-browser@5.2.0/lib/ref.js",
      "github:capaj/joi-browser@5.2.0/lib/any.js",
      "github:capaj/joi-browser@5.2.0/lib/alternatives.js",
      "github:capaj/joi-browser@5.2.0/lib/cast.js",
      "github:capaj/joi-browser@5.2.0/lib/object.js",
      "github:capaj/topo-browser@1.1.0.js",
      "github:capaj/topo-browser@1.1.0/index.js",
      "github:capaj/topo-browser@1.1.0/lib/index.js",
      "github:capaj/joi-browser@5.2.0/lib/boolean.js",
      "github:capaj/joi-browser@5.2.0/lib/number.js",
      "github:capaj/joi-browser@5.2.0/lib/function.js",
      "github:capaj/joi-browser@5.2.0/lib/binary.js",
      "github:capaj/joi-browser@5.2.0/lib/array.js"
    ]
  },

  map: {
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "classnames": "npm:classnames@2.2.5",
    "core-js": "npm:core-js@1.2.6",
    "debug": "npm:debug@2.2.0",
    "influx-ql": "npm:influx-ql@0.1.4",
    "joi": "github:capaj/joi-browser@5.2.0",
    "lodash": "npm:lodash@4.13.1",
    "moment": "npm:moment@2.14.1",
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
    "superagent": "npm:superagent@1.8.3",
    "uuid": "npm:uuid@2.0.2",
    "github:capaj/joi-browser@5.2.0": {
      "hoek": "github:capaj/hoek-browser@2.12.0",
      "moment": "npm:moment@2.13.0",
      "topo": "github:capaj/topo-browser@1.1.0"
    },
    "github:capaj/topo-browser@1.1.0": {
      "hoek": "github:capaj/hoek-browser@2.12.0"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-constants@0.1.0": {
      "constants-browserify": "npm:constants-browserify@0.0.1"
    },
    "github:jspm/nodelibs-crypto@0.1.0": {
      "crypto-browserify": "npm:crypto-browserify@3.11.0"
    },
    "github:jspm/nodelibs-domain@0.1.0": {
      "domain-browser": "npm:domain-browser@1.1.7"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.5"
    },
    "github:jspm/nodelibs-querystring@0.1.0": {
      "querystring": "npm:querystring@0.2.0"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:jspm/nodelibs-zlib@0.1.0": {
      "browserify-zlib": "npm:browserify-zlib@0.1.4"
    },
    "npm:add-dom-event-listener@1.0.1": {
      "object-assign": "npm:object-assign@4.1.0"
    },
    "npm:asap@2.0.4": {
      "domain": "github:jspm/nodelibs-domain@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:asn1.js@4.6.0": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "bn.js": "npm:bn.js@4.11.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:async@1.5.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:bn.js@4.11.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:browserify-aes@1.0.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "buffer-xor": "npm:buffer-xor@1.0.3",
      "cipher-base": "npm:cipher-base@1.0.2",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:browserify-cipher@1.0.0": {
      "browserify-aes": "npm:browserify-aes@1.0.6",
      "browserify-des": "npm:browserify-des@1.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
    },
    "npm:browserify-des@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "cipher-base": "npm:cipher-base@1.0.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "des.js": "npm:des.js@1.0.0",
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:browserify-rsa@4.0.1": {
      "bn.js": "npm:bn.js@4.11.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "randombytes": "npm:randombytes@2.0.3"
    },
    "npm:browserify-sign@4.0.0": {
      "bn.js": "npm:bn.js@4.11.3",
      "browserify-rsa": "npm:browserify-rsa@4.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "create-hmac": "npm:create-hmac@1.1.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.2.5",
      "inherits": "npm:inherits@2.0.1",
      "parse-asn1": "npm:parse-asn1@5.0.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:browserify-zlib@0.1.4": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "pako": "npm:pako@0.2.8",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "readable-stream": "npm:readable-stream@2.1.4",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:buffer-shims@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:buffer-xor@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:cipher-base@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0"
    },
    "npm:combined-stream@1.0.5": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "delayed-stream": "npm:delayed-stream@1.0.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:component-classes@1.2.6": {
      "component-indexof": "npm:component-indexof@0.0.3"
    },
    "npm:constants-browserify@0.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:create-ecdh@4.0.0": {
      "bn.js": "npm:bn.js@4.11.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.2.5"
    },
    "npm:create-hash@1.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "cipher-base": "npm:cipher-base@1.0.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "ripemd160": "npm:ripemd160@1.0.1",
      "sha.js": "npm:sha.js@2.4.5"
    },
    "npm:create-hmac@1.1.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:crypto-browserify@3.11.0": {
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
    },
    "npm:css-animation@1.2.5": {
      "component-classes": "npm:component-classes@1.2.6"
    },
    "npm:debug@2.2.0": {
      "ms": "npm:ms@0.7.1"
    },
    "npm:delayed-stream@1.0.0": {
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:des.js@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
    },
    "npm:diffie-hellman@5.0.2": {
      "bn.js": "npm:bn.js@4.11.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "miller-rabin": "npm:miller-rabin@4.0.0",
      "randombytes": "npm:randombytes@2.0.3",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:domain-browser@1.1.7": {
      "events": "github:jspm/nodelibs-events@0.1.1"
    },
    "npm:elliptic@6.2.5": {
      "bn.js": "npm:bn.js@4.11.3",
      "brorand": "npm:brorand@1.0.5",
      "hash.js": "npm:hash.js@1.0.3",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:encoding@0.1.12": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "iconv-lite": "npm:iconv-lite@0.4.13"
    },
    "npm:enroute@1.0.1": {
      "object-assign": "npm:object-assign@4.1.0",
      "path-to-regexp": "npm:path-to-regexp@1.5.3"
    },
    "npm:evp_bytestokey@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0"
    },
    "npm:fbjs@0.8.3": {
      "core-js": "npm:core-js@1.2.6",
      "immutable": "npm:immutable@3.8.1",
      "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
      "loose-envify": "npm:loose-envify@1.2.0",
      "object-assign": "npm:object-assign@4.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "promise": "npm:promise@7.1.1",
      "ua-parser-js": "npm:ua-parser-js@0.7.10"
    },
    "npm:form-data@1.0.0-rc3": {
      "async": "npm:async@1.5.2",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "combined-stream": "npm:combined-stream@1.0.5",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "mime-types": "npm:mime-types@2.1.11",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:formidable@1.0.17": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "querystring": "github:jspm/nodelibs-querystring@0.1.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:gregorian-calendar-format@4.1.3": {
      "gregorian-calendar": "npm:gregorian-calendar@4.1.4",
      "warning": "npm:warning@2.1.0"
    },
    "npm:hash.js@1.0.3": {
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:iconv-lite@0.4.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:influx-ql@0.1.4": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:invariant@2.2.1": {
      "loose-envify": "npm:loose-envify@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:isomorphic-fetch@2.2.1": {
      "node-fetch": "npm:node-fetch@1.5.3",
      "whatwg-fetch": "npm:whatwg-fetch@1.0.0"
    },
    "npm:lodash.keys@3.1.2": {
      "lodash._getnative": "npm:lodash._getnative@3.9.1",
      "lodash.isarguments": "npm:lodash.isarguments@3.0.8",
      "lodash.isarray": "npm:lodash.isarray@3.0.4"
    },
    "npm:lodash@4.13.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:loose-envify@1.2.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "js-tokens": "npm:js-tokens@1.0.3",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:miller-rabin@4.0.0": {
      "bn.js": "npm:bn.js@4.11.3",
      "brorand": "npm:brorand@1.0.5"
    },
    "npm:mime-db@1.23.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:mime-types@2.1.11": {
      "mime-db": "npm:mime-db@1.23.0",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:mime@1.3.4": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:node-fetch@1.5.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "encoding": "npm:encoding@0.1.12",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "is-stream": "npm:is-stream@1.1.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "zlib": "github:jspm/nodelibs-zlib@0.1.0"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:pako@0.2.8": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:parse-asn1@5.0.0": {
      "asn1.js": "npm:asn1.js@4.6.0",
      "browserify-aes": "npm:browserify-aes@1.0.6",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
      "pbkdf2": "npm:pbkdf2@3.0.4",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-to-regexp@1.5.3": {
      "isarray": "npm:isarray@0.0.1"
    },
    "npm:pbkdf2@3.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "create-hmac": "npm:create-hmac@1.1.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:process-nextick-args@1.0.7": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.5": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:promise@7.1.1": {
      "asap": "npm:asap@2.0.4",
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:public-encrypt@4.0.0": {
      "bn.js": "npm:bn.js@4.11.3",
      "browserify-rsa": "npm:browserify-rsa@4.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "parse-asn1": "npm:parse-asn1@5.0.0",
      "randombytes": "npm:randombytes@2.0.3"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:randombytes@2.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:rc-align@2.3.1": {
      "dom-align": "npm:dom-align@1.4.0",
      "rc-util": "npm:rc-util@3.2.1"
    },
    "npm:rc-animate@2.3.0": {
      "css-animation": "npm:css-animation@1.2.5"
    },
    "npm:rc-time-picker@1.1.5": {
      "classnames": "npm:classnames@2.2.5",
      "gregorian-calendar": "npm:gregorian-calendar@4.1.4",
      "gregorian-calendar-format": "npm:gregorian-calendar-format@4.1.3",
      "rc-trigger": "npm:rc-trigger@1.6.1"
    },
    "npm:rc-trigger@1.6.1": {
      "rc-align": "npm:rc-align@2.3.1",
      "rc-animate": "npm:rc-animate@2.3.0",
      "rc-util": "npm:rc-util@3.2.1"
    },
    "npm:rc-util@3.2.1": {
      "add-dom-event-listener": "npm:add-dom-event-listener@1.0.1",
      "classnames": "npm:classnames@2.2.5",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "shallowequal": "npm:shallowequal@0.2.2"
    },
    "npm:react-datepicker@0.28.1": {
      "classnames": "npm:classnames@2.2.5",
      "moment": "npm:moment@2.14.1",
      "react": "npm:react@15.2.1",
      "react-dom": "npm:react-dom@15.2.1",
      "react-onclickoutside": "npm:react-onclickoutside@4.9.0",
      "tether": "npm:tether@1.3.2"
    },
    "npm:react-dom@15.2.1": {
      "react": "npm:react@15.2.1"
    },
    "npm:react-enroute@0.0.1": {
      "enroute": "npm:enroute@1.0.1",
      "invariant": "npm:invariant@2.2.1",
      "react": "npm:react@15.2.1"
    },
    "npm:react-input-autosize@0.6.13": {
      "react": "npm:react@15.2.1"
    },
    "npm:react-onclickoutside@4.9.0": {
      "object-assign": "npm:object-assign@4.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:react-redux@4.4.5": {
      "hoist-non-react-statics": "npm:hoist-non-react-statics@1.0.6",
      "invariant": "npm:invariant@2.2.1",
      "lodash": "npm:lodash@4.13.1",
      "loose-envify": "npm:loose-envify@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@15.2.1",
      "redux": "npm:redux@3.5.2"
    },
    "npm:react-select@1.0.0-beta13": {
      "classnames": "npm:classnames@2.2.5",
      "react": "npm:react@15.2.1",
      "react-dom": "npm:react-dom@15.2.1",
      "react-input-autosize": "npm:react-input-autosize@0.6.13"
    },
    "npm:react@15.2.1": {
      "fbjs": "npm:fbjs@0.8.3",
      "loose-envify": "npm:loose-envify@1.2.0",
      "object-assign": "npm:object-assign@4.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.0.27-1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:readable-stream@2.1.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "buffer-shims": "npm:buffer-shims@1.0.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "process-nextick-args": "npm:process-nextick-args@1.0.7",
      "string_decoder": "npm:string_decoder@0.10.31",
      "util-deprecate": "npm:util-deprecate@1.0.2"
    },
    "npm:redux@3.5.2": {
      "lodash": "npm:lodash@4.13.1",
      "lodash-es": "npm:lodash-es@4.13.1",
      "loose-envify": "npm:loose-envify@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "symbol-observable": "npm:symbol-observable@0.2.4"
    },
    "npm:ripemd160@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:sha.js@2.4.5": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:shallowequal@0.2.2": {
      "lodash.keys": "npm:lodash.keys@3.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:superagent@1.8.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "component-emitter": "npm:component-emitter@1.2.1",
      "cookiejar": "npm:cookiejar@2.0.6",
      "debug": "npm:debug@2.2.0",
      "extend": "npm:extend@3.0.0",
      "form-data": "npm:form-data@1.0.0-rc3",
      "formidable": "npm:formidable@1.0.17",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "methods": "npm:methods@1.1.2",
      "mime": "npm:mime@1.3.4",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "qs": "npm:qs@2.3.3",
      "readable-stream": "npm:readable-stream@1.0.27-1",
      "reduce-component": "npm:reduce-component@1.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "zlib": "github:jspm/nodelibs-zlib@0.1.0"
    },
    "npm:tether@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:ua-parser-js@0.7.10": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util-deprecate@1.0.2": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:uuid@2.0.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:warning@2.1.0": {
      "loose-envify": "npm:loose-envify@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
