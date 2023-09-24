"use strict";
const vm = require("vm");
const webIDLConversions = require("webidl-conversions");
const { CSSStyleDeclaration } = require("cssstyle");
const notImplemented = require("./not-implemented");
const { installInterfaces } = require("../living/interfaces");
const { define, mixin, performance } = require("../utils");
const Element = require("../living/generated/Element");
const EventTarget = require("../living/generated/EventTarget");
const EventHandlerNonNull = require("../living/generated/EventHandlerNonNull");
const IDLFunction = require("../living/generated/Function");
const OnBeforeUnloadEventHandlerNonNull = require("../living/generated/OnBeforeUnloadEventHandlerNonNull");
const OnErrorEventHandlerNonNull = require("../living/generated/OnErrorEventHandlerNonNull");
const {
  fireAPageTransitionEvent,
} = require("../living/helpers/page-transition-event");
const namedPropertiesWindow = require("../living/named-properties-window");
const postMessage = require("../living/post-message");
const DOMException = require("domexception/webidl2js-wrapper");
const { btoa, atob } = require("abab");
const idlUtils = require("../living/generated/utils");
const WebSocketImpl =
  require("../living/websockets/WebSocket-impl").implementation;
const BarProp = require("../living/generated/BarProp");
const documents = require("../living/documents.js");
const External = require("../living/generated/External");
const Navigator = require("../living/generated/Navigator");
const Performance = require("../living/generated/Performance");
const Screen = require("../living/generated/Screen");
const Crypto = require("../living/generated/Crypto");
const Storage = require("../living/generated/Storage");
const Selection = require("../living/generated/Selection");
const reportException = require("../living/helpers/runtime-script-errors");
const {
  getCurrentEventHandlerValue,
} = require("../living/helpers/create-event-accessor.js");
const { fireAnEvent } = require("../living/helpers/events");
const SessionHistory = require("../living/window/SessionHistory");
const {
  forEachMatchingSheetRuleOfElement,
  getResolvedValue,
  propertiesWithResolvedValueImplemented,
  SHADOW_DOM_PSEUDO_REGEXP,
} = require("../living/helpers/style-rules.js");
const CustomElementRegistry = require("../living/generated/CustomElementRegistry");
const jsGlobals = require("./js-globals.json");
const Worker = require("../living/generated/Worker");

const GlobalEventHandlersImpl =
  require("../living/nodes/GlobalEventHandlers-impl").implementation;
const WindowEventHandlersImpl =
  require("../living/nodes/WindowEventHandlers-impl").implementation;

const events = new Set([
  // GlobalEventHandlers
  "abort",
  "autocomplete",
  "autocompleteerror",
  "blur",
  "cancel",
  "canplay",
  "canplaythrough",
  "change",
  "click",
  "close",
  "contextmenu",
  "cuechange",
  "dblclick",
  "drag",
  "dragend",
  "dragenter",
  "dragleave",
  "dragover",
  "dragstart",
  "drop",
  "durationchange",
  "emptied",
  "ended",
  "focus",
  "input",
  "invalid",
  "keydown",
  "keypress",
  "keyup",
  "load",
  "loadeddata",
  "loadedmetadata",
  "loadstart",
  "mousedown",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "wheel",
  "pause",
  "play",
  "playing",
  "progress",
  "ratechange",
  "reset",
  "resize",
  "scroll",
  "securitypolicyviolation",
  "seeked",
  "seeking",
  "select",
  "sort",
  "stalled",
  "submit",
  "suspend",
  "timeupdate",
  "toggle",
  "volumechange",
  "waiting",

  // WindowEventHandlers
  "afterprint",
  "beforeprint",
  "hashchange",
  "languagechange",
  "message",
  "messageerror",
  "offline",
  "online",
  "pagehide",
  "pageshow",
  "popstate",
  "rejectionhandled",
  "storage",
  "unhandledrejection",
  "unload",

  // "error" and "beforeunload" are added separately
]);

exports.createWindow = function (options) {
  return new Window(options);
};

const jsGlobalEntriesToInstall = Object.entries(jsGlobals).filter(
  ([name]) => name in global
);

// https://html.spec.whatwg.org/#the-window-object
function setupWindow(windowInstance, { runScripts }) {
  if (runScripts === "outside-only" || runScripts === "dangerously") {
    contextifyWindow(windowInstance);

    // Without this, these globals will only appear to scripts running inside the context using vm.runScript; they will
    // not appear to scripts running from the outside, including to JSDOM implementation code.
    for (const [globalName, globalPropDesc] of jsGlobalEntriesToInstall) {
      const propDesc = {
        ...globalPropDesc,
        value: vm.runInContext(globalName, windowInstance),
      };
      Object.defineProperty(windowInstance, globalName, propDesc);
    }
  } else {
    // Without contextifying the window, none of the globals will exist. So, let's at least alias them from the Node.js
    // context. See https://github.com/jsdom/jsdom/issues/2727 for more background and discussion.
    for (const [globalName, globalPropDesc] of jsGlobalEntriesToInstall) {
      const propDesc = { ...globalPropDesc, value: global[globalName] };
      Object.defineProperty(windowInstance, globalName, propDesc);
    }
  }

  installInterfaces(windowInstance, ["Window"]);

  const EventTargetConstructor = windowInstance.EventTarget;

  // eslint-disable-next-line func-name-matching, func-style, no-shadow
  const windowConstructor = function Window() {
    throw new TypeError("Illegal constructor");
  };
  Object.setPrototypeOf(windowConstructor, EventTargetConstructor);

  Object.defineProperty(windowInstance, "Window", {
    configurable: true,
    writable: true,
    value: windowConstructor,
  });

  const windowPrototype = Object.create(EventTargetConstructor.prototype);
  Object.defineProperties(windowPrototype, {
    constructor: {
      value: windowConstructor,
      writable: true,
      configurable: true,
    },
    [Symbol.toStringTag]: {
      value: "Window",
      configurable: true,
    },
  });

  windowConstructor.prototype = windowPrototype;
  Object.setPrototypeOf(windowInstance, windowPrototype);

  EventTarget.setup(windowInstance, windowInstance);
  mixin(windowInstance, WindowEventHandlersImpl.prototype);
  mixin(windowInstance, GlobalEventHandlersImpl.prototype);
  windowInstance._initGlobalEvents();

  Object.defineProperty(windowInstance, "onbeforeunload", {
    configurable: true,
    enumerable: true,
    get() {
      return idlUtils.tryWrapperForImpl(
        getCurrentEventHandlerValue(this, "beforeunload")
      );
    },
    set(V) {
      if (!idlUtils.isObject(V)) {
        V = null;
      } else {
        V = OnBeforeUnloadEventHandlerNonNull.convert(windowInstance, V, {
          context:
            "Failed to set the 'onbeforeunload' property on 'Window': The provided value",
        });
      }
      this._setEventHandlerFor("beforeunload", V);
    },
  });

  Object.defineProperty(windowInstance, "onerror", {
    configurable: true,
    enumerable: true,
    get() {
      return idlUtils.tryWrapperForImpl(
        getCurrentEventHandlerValue(this, "error")
      );
    },
    set(V) {
      if (!idlUtils.isObject(V)) {
        V = null;
      } else {
        V = OnErrorEventHandlerNonNull.convert(windowInstance, V, {
          context:
            "Failed to set the 'onerror' property on 'Window': The provided value",
        });
      }
      this._setEventHandlerFor("error", V);
    },
  });

  for (const event of events) {
    Object.defineProperty(windowInstance, `on${event}`, {
      configurable: true,
      enumerable: true,
      get() {
        return idlUtils.tryWrapperForImpl(
          getCurrentEventHandlerValue(this, event)
        );
      },
      set(V) {
        if (!idlUtils.isObject(V)) {
          V = null;
        } else {
          V = EventHandlerNonNull.convert(windowInstance, V, {
            context: `Failed to set the 'on${event}' property on 'Window': The provided value`,
          });
        }
        this._setEventHandlerFor(event, V);
      },
    });
  }

  windowInstance._globalObject = windowInstance;
}

// NOTE: per https://heycam.github.io/webidl/#Global, all properties on the Window object must be own-properties.
// That is why we assign everything inside of the constructor, instead of using a shared prototype.
// You can verify this in e.g. Firefox or Internet Explorer, which do a good job with Web IDL compliance.
function Window(options) {
  setupWindow(this, { runScripts: options.runScripts });

  const windowInitialized = performance.now();

  const window = this;

  // ### PRIVATE DATA PROPERTIES

  this._resourceLoader = options.resourceLoader;

  // vm initialization is deferred until script processing is activated
  this._globalProxy = this;
  Object.defineProperty(idlUtils.implForWrapper(this), idlUtils.wrapperSymbol, {
    get: () => this._globalProxy,
  });

  // List options explicitly to be clear which are passed through
  this._document = documents.createWrapper(
    window,
    {
      parsingMode: options.parsingMode,
      contentType: options.contentType,
      encoding: options.encoding,
      cookieJar: options.cookieJar,
      url: options.url,
      lastModified: options.lastModified,
      referrer: options.referrer,
      parseOptions: options.parseOptions,
      defaultView: this._globalProxy,
      global: this,
      parentOrigin: options.parentOrigin,
    },
    { alwaysUseDocumentClass: true }
  );

  if (vm.isContext(window)) {
    const documentImpl = idlUtils.implForWrapper(window._document);
    documentImpl._defaultView = window._globalProxy = vm.runInContext(
      "this",
      window
    );
  }

  const documentOrigin = idlUtils.implForWrapper(this._document)._origin;
  this._origin = documentOrigin;

  // https://html.spec.whatwg.org/#session-history
  this._sessionHistory = new SessionHistory(
    {
      document: idlUtils.implForWrapper(this._document),
      url: idlUtils.implForWrapper(this._document)._URL,
      stateObject: null,
    },
    this
  );

  this._virtualConsole = options.virtualConsole;

  this._runScripts = options.runScripts;

  // Set up the window as if it's a top level window.
  // If it's not, then references will be corrected by frame/iframe code.
  this._parent = this._top = this._globalProxy;
  this._frameElement = null;

  // This implements window.frames.length, since window.frames returns a
  // self reference to the window object.  This value is incremented in the
  // HTMLFrameElement implementation.
  this._length = 0;

  // https://dom.spec.whatwg.org/#window-current-event
  this._currentEvent = undefined;

  this._pretendToBeVisual = options.pretendToBeVisual;
  this._storageQuota = options.storageQuota;

  // Some properties (such as localStorage and sessionStorage) share data
  // between windows in the same origin. This object is intended
  // to contain such data.
  if (options.commonForOrigin && options.commonForOrigin[documentOrigin]) {
    this._commonForOrigin = options.commonForOrigin;
  } else {
    this._commonForOrigin = {
      [documentOrigin]: {
        localStorageArea: new Map(),
        sessionStorageArea: new Map(),
        windowsInSameOrigin: [this],
      },
    };
  }

  this._currentOriginData = this._commonForOrigin[documentOrigin];

  // ### WEB STORAGE

  this._localStorage = Storage.create(window, [], {
    associatedWindow: this,
    storageArea: this._currentOriginData.localStorageArea,
    type: "localStorage",
    url: this._document.documentURI,
    storageQuota: this._storageQuota,
  });
  this._sessionStorage = Storage.create(window, [], {
    associatedWindow: this,
    storageArea: this._currentOriginData.sessionStorageArea,
    type: "sessionStorage",
    url: this._document.documentURI,
    storageQuota: this._storageQuota,
  });

  // ### SELECTION

  // https://w3c.github.io/selection-api/#dfn-selection
  this._selection = Selection.createImpl(window);

  // https://w3c.github.io/selection-api/#dom-window
  this.getSelection = function () {
    return window._selection;
  };

  // ### GETTERS

  const locationbar = BarProp.create(window);
  const menubar = BarProp.create(window);
  const personalbar = BarProp.create(window);
  const scrollbars = BarProp.create(window);
  const statusbar = BarProp.create(window);
  const toolbar = BarProp.create(window);
  const external = External.create(window);
  const navigator = Navigator.create(window, [], {
    userAgent: this._resourceLoader._userAgent,
  });
  const performanceImpl = Performance.create(window, [], {
    timeOrigin: performance.timeOrigin + windowInitialized,
    nowAtTimeOrigin: windowInitialized,
  });
  const screen = Screen.create(window);
  const crypto = Crypto.create(window);
  const customElementRegistry = CustomElementRegistry.create(window);

  this.cancelIdleCallback = function cancelIdleCallback() {};
  this.createImageBitmap = function createImageBitmap() {};
  this.find = function find() {};
  this.iframe = function iframe() {};
  this.getScreenDetails = function getScreenDetails() {};
  this.matchMedia = function matchMedia() {};
  this.openDatabase = function openDatabase() {};
  this.queryLocalFonts = function queryLocalFonts() {};
  this.reportError = function reportError() {};
  this.requestIdleCallback = function requestIdleCallback() {};
  this.scroll = function scroll() {};
  this.showDirectoryPicker = function showDirectoryPicker() {};
  this.showOpenFilePicker = function showOpenFilePicker() {};
  this.showSaveFilePicker = function showSaveFilePicker() {};
  this.structuredClone = function structuredClone() {};
  this.webkitCancelAnimationFrame = function webkitCancelAnimationFrame() {};
  this.webkitRequestAnimationFrame = function webkitRequestAnimationFrame() {};
  this.webkitRequestFileSystem = function webkitRequestFileSystem() {};
  this.webkitResolveLocalFileSystemURL =
    function webkitResolveLocalFileSystemURL() {};
  this.AbsoluteOrientationSensor = function AbsoluteOrientationSensor() {};
  this.Accelerometer = function Accelerometer() {};
  this.AnalyserNode = function AnalyserNode() {};
  this.Animation = function Animation() {};
  this.AnimationEffect = function AnimationEffect() {};
  this.AnimationEvent = function AnimationEvent() {};
  this.AnimationPlaybackEvent = function AnimationPlaybackEvent() {};
  this.AnimationTimeline = function AnimationTimeline() {};
  this.AudioBuffer = function AudioBuffer() {};
  this.AudioBufferSourceNode = function AudioBufferSourceNode() {};
  this.AudioContext = function AudioContext() {};
  this.AudioData = function AudioData() {};
  this.AudioDecoder = function AudioDecoder() {};
  this.AudioDestinationNode = function AudioDestinationNode() {};
  this.AudioEncoder = function AudioEncoder() {};
  this.AudioListener = function AudioListener() {};
  this.AudioNode = function AudioNode() {};
  this.AudioParam = function AudioParam() {};
  this.AudioParamMap = function AudioParamMap() {};
  this.AudioProcessingEvent = function AudioProcessingEvent() {};
  this.AudioScheduledSourceNode = function AudioScheduledSourceNode() {};
  this.AudioWorklet = function AudioWorklet() {};
  this.AudioWorkletNode = function AudioWorkletNode() {};
  this.AuthenticatorAssertionResponse =
    function AuthenticatorAssertionResponse() {};
  this.AuthenticatorAttestationResponse =
    function AuthenticatorAttestationResponse() {};
  this.AuthenticatorResponse = function AuthenticatorResponse() {};
  this.BackgroundFetchManager = function BackgroundFetchManager() {};
  this.BackgroundFetchRecord = function BackgroundFetchRecord() {};
  this.BackgroundFetchRegistration = function BackgroundFetchRegistration() {};
  this.BaseAudioContext = function BaseAudioContext() {};
  this.BatteryManager = function BatteryManager() {};
  this.BeforeInstallPromptEvent = function BeforeInstallPromptEvent() {};
  this.BeforeUnloadEvent = function BeforeUnloadEvent() {};
  this.BiquadFilterNode = function BiquadFilterNode() {};
  this.BlobEvent = function BlobEvent() {};
  this.Bluetooth = function Bluetooth() {};
  this.BluetoothCharacteristicProperties =
    function BluetoothCharacteristicProperties() {};
  this.BluetoothDevice = function BluetoothDevice() {};
  this.BluetoothRemoteGATTCharacteristic =
    function BluetoothRemoteGATTCharacteristic() {};
  this.BluetoothRemoteGATTDescriptor =
    function BluetoothRemoteGATTDescriptor() {};
  this.BluetoothRemoteGATTServer = function BluetoothRemoteGATTServer() {};
  this.BluetoothRemoteGATTService = function BluetoothRemoteGATTService() {};
  this.BluetoothUUID = function BluetoothUUID() {};
  this.BroadcastChannel = function BroadcastChannel() {};
  this.BrowserCaptureMediaStreamTrack =
    function BrowserCaptureMediaStreamTrack() {};
  this.ByteLengthQueuingStrategy = function ByteLengthQueuingStrategy() {};
  this.CSS = function CSS() {};
  this.CSSAnimation = function CSSAnimation() {};
  this.CSSConditionRule = function CSSConditionRule() {};
  this.CSSCounterStyleRule = function CSSCounterStyleRule() {};
  this.CSSFontFaceRule = function CSSFontFaceRule() {};
  this.CSSFontPaletteValuesRule = function CSSFontPaletteValuesRule() {};
  this.CSSGroupingRule = function CSSGroupingRule() {};
  this.CSSImageValue = function CSSImageValue() {};
  this.CSSKeyframeRule = function CSSKeyframeRule() {};
  this.CSSKeyframesRule = function CSSKeyframesRule() {};
  this.CSSKeywordValue = function CSSKeywordValue() {};
  this.CSSLayerBlockRule = function CSSLayerBlockRule() {};
  this.CSSLayerStatementRule = function CSSLayerStatementRule() {};
  this.CSSMathClamp = function CSSMathClamp() {};
  this.CSSMathInvert = function CSSMathInvert() {};
  this.CSSMathMax = function CSSMathMax() {};
  this.CSSMathMin = function CSSMathMin() {};
  this.CSSMathNegate = function CSSMathNegate() {};
  this.CSSMathProduct = function CSSMathProduct() {};
  this.CSSMathSum = function CSSMathSum() {};
  this.CSSMathValue = function CSSMathValue() {};
  this.CSSMatrixComponent = function CSSMatrixComponent() {};
  this.CSSNamespaceRule = function CSSNamespaceRule() {};
  this.CSSNumericArray = function CSSNumericArray() {};
  this.CSSNumericValue = function CSSNumericValue() {};
  this.CSSPageRule = function CSSPageRule() {};
  this.CSSPerspective = function CSSPerspective() {};
  this.CSSPositionValue = function CSSPositionValue() {};
  this.CSSPropertyRule = function CSSPropertyRule() {};
  this.CSSRotate = function CSSRotate() {};
  this.CSSRuleList = function CSSRuleList() {};
  this.CSSScale = function CSSScale() {};
  this.CSSSkew = function CSSSkew() {};
  this.CSSSkewX = function CSSSkewX() {};
  this.CSSSkewY = function CSSSkewY() {};
  this.CSSStyleValue = function CSSStyleValue() {};
  this.CSSSupportsRule = function CSSSupportsRule() {};
  this.CSSTransformComponent = function CSSTransformComponent() {};
  this.CSSTransformValue = function CSSTransformValue() {};
  this.CSSTransition = function CSSTransition() {};
  this.CSSTranslate = function CSSTranslate() {};
  this.CSSUnitValue = function CSSUnitValue() {};
  this.CSSUnparsedValue = function CSSUnparsedValue() {};
  this.CSSVariableReferenceValue = function CSSVariableReferenceValue() {};
  this.Cache = function Cache() {};
  this.CacheStorage = function CacheStorage() {};
  this.CanvasCaptureMediaStreamTrack =
    function CanvasCaptureMediaStreamTrack() {};
  this.CanvasFilter = function CanvasFilter() {};
  this.CanvasGradient = function CanvasGradient() {};
  this.CanvasPattern = function CanvasPattern() {};
  this.CanvasRenderingContext2D = function CanvasRenderingContext2D() {};
  this.ChannelMergerNode = function ChannelMergerNode() {};
  this.ChannelSplitterNode = function ChannelSplitterNode() {};
  this.Clipboard = function Clipboard() {};
  this.ClipboardEvent = function ClipboardEvent() {};
  this.ClipboardItem = function ClipboardItem() {};
  this.CompressionStream = function CompressionStream() {};
  this.ConstantSourceNode = function ConstantSourceNode() {};
  this.ConvolverNode = function ConvolverNode() {};
  this.CookieChangeEvent = function CookieChangeEvent() {};
  this.CookieStore = function CookieStore() {};
  this.CookieStoreManager = function CookieStoreManager() {};
  this.CountQueuingStrategy = function CountQueuingStrategy() {};
  this.Credential = function Credential() {};
  this.CredentialsContainer = function CredentialsContainer() {};
  this.CropTarget = function CropTarget() {};
  this.CryptoKey = function CryptoKey() {};
  this.CustomStateSet = function CustomStateSet() {};
  this.DOMError = function DOMError() {};
  this.DOMMatrix = function DOMMatrix() {};
  this.DOMMatrixReadOnly = function DOMMatrixReadOnly() {};
  this.DOMPoint = function DOMPoint() {};
  this.DOMPointReadOnly = function DOMPointReadOnly() {};
  this.DOMQuad = function DOMQuad() {};
  this.DOMRect = function DOMRect() {};
  this.DOMRectList = function DOMRectList() {};
  this.DOMRectReadOnly = function DOMRectReadOnly() {};
  this.DOMStringList = function DOMStringList() {};
  this.DataTransfer = function DataTransfer() {};
  this.DataTransferItem = function DataTransferItem() {};
  this.DataTransferItemList = function DataTransferItemList() {};
  this.DecompressionStream = function DecompressionStream() {};
  this.DelayNode = function DelayNode() {};
  this.DelegatedInkTrailPresenter = function DelegatedInkTrailPresenter() {};
  this.DeviceMotionEvent = function DeviceMotionEvent() {};
  this.DeviceMotionEventAcceleration =
    function DeviceMotionEventAcceleration() {};
  this.DeviceMotionEventRotationRate =
    function DeviceMotionEventRotationRate() {};
  this.DeviceOrientationEvent = function DeviceOrientationEvent() {};
  this.DocumentTimeline = function DocumentTimeline() {};
  this.DragEvent = function DragEvent() {};
  this.DynamicsCompressorNode = function DynamicsCompressorNode() {};
  this.ElementInternals = function ElementInternals() {};
  this.EncodedAudioChunk = function EncodedAudioChunk() {};
  this.EncodedVideoChunk = function EncodedVideoChunk() {};
  this.EventCounts = function EventCounts() {};
  this.EventSource = function EventSource() {};
  this.EyeDropper = function EyeDropper() {};
  this.FeaturePolicy = function FeaturePolicy() {};
  this.FederatedCredential = function FederatedCredential() {};
  this.FileSystemDirectoryHandle = function FileSystemDirectoryHandle() {};
  this.FileSystemFileHandle = function FileSystemFileHandle() {};
  this.FileSystemHandle = function FileSystemHandle() {};
  this.FileSystemWritableFileStream =
    function FileSystemWritableFileStream() {};
  this.FontData = function FontData() {};
  this.FontFace = function FontFace() {};
  this.FontFaceSetLoadEvent = function FontFaceSetLoadEvent() {};
  this.FormDataEvent = function FormDataEvent() {};
  this.FragmentDirective = function FragmentDirective() {};
  this.GainNode = function GainNode() {};
  this.Gamepad = function Gamepad() {};
  this.GamepadButton = function GamepadButton() {};
  this.GamepadEvent = function GamepadEvent() {};
  this.GamepadHapticActuator = function GamepadHapticActuator() {};
  this.Geolocation = function Geolocation() {};
  this.GeolocationCoordinates = function GeolocationCoordinates() {};
  this.GeolocationPosition = function GeolocationPosition() {};
  this.GeolocationPositionError = function GeolocationPositionError() {};
  this.GravitySensor = function GravitySensor() {};
  this.Gyroscope = function Gyroscope() {};
  this.HID = function HID() {};
  this.HIDConnectionEvent = function HIDConnectionEvent() {};
  this.HIDDevice = function HIDDevice() {};
  this.HIDInputReportEvent = function HIDInputReportEvent() {};
  this.HTMLAllCollection = function HTMLAllCollection() {};
  this.IDBCursor = function IDBCursor() {};
  this.IDBCursorWithValue = function IDBCursorWithValue() {};
  this.IDBDatabase = function IDBDatabase() {};
  this.IDBFactory = function IDBFactory() {};
  this.IDBIndex = function IDBIndex() {};
  this.IDBKeyRange = function IDBKeyRange() {};
  this.IDBObjectStore = function IDBObjectStore() {};
  this.IDBOpenDBRequest = function IDBOpenDBRequest() {};
  this.IDBRequest = function IDBRequest() {};
  this.IDBTransaction = function IDBTransaction() {};
  this.IDBVersionChangeEvent = function IDBVersionChangeEvent() {};
  this.IIRFilterNode = function IIRFilterNode() {};
  this.IdleDeadline = function IdleDeadline() {};
  this.IdleDetector = function IdleDetector() {};
  this.ImageBitmap = function ImageBitmap() {};
  this.ImageBitmapRenderingContext = function ImageBitmapRenderingContext() {};
  this.ImageCapture = function ImageCapture() {};
  this.ImageData = function ImageData() {};
  this.ImageDecoder = function ImageDecoder() {};
  this.ImageTrack = function ImageTrack() {};
  this.ImageTrackList = function ImageTrackList() {};
  this.Ink = function Ink() {};
  this.InputDeviceCapabilities = function InputDeviceCapabilities() {};
  this.InputDeviceInfo = function InputDeviceInfo() {};
  this.IntersectionObserver = function IntersectionObserver() {};
  this.IntersectionObserverEntry = function IntersectionObserverEntry() {};
  this.Keyboard = function Keyboard() {};
  this.KeyboardLayoutMap = function KeyboardLayoutMap() {};
  this.KeyframeEffect = function KeyframeEffect() {};
  this.LargestContentfulPaint = function LargestContentfulPaint() {};
  this.LaunchParams = function LaunchParams() {};
  this.LaunchQueue = function LaunchQueue() {};
  this.LayoutShift = function LayoutShift() {};
  this.LayoutShiftAttribution = function LayoutShiftAttribution() {};
  this.LinearAccelerationSensor = function LinearAccelerationSensor() {};
  this.Lock = function Lock() {};
  this.LockManager = function LockManager() {};
  this.MIDIAccess = function MIDIAccess() {};
  this.MIDIConnectionEvent = function MIDIConnectionEvent() {};
  this.MIDIInput = function MIDIInput() {};
  this.MIDIInputMap = function MIDIInputMap() {};
  this.MIDIMessageEvent = function MIDIMessageEvent() {};
  this.MIDIOutput = function MIDIOutput() {};
  this.MIDIOutputMap = function MIDIOutputMap() {};
  this.MIDIPort = function MIDIPort() {};
  this.MediaCapabilities = function MediaCapabilities() {};
  this.MediaDeviceInfo = function MediaDeviceInfo() {};
  this.MediaDevices = function MediaDevices() {};
  this.MediaElementAudioSourceNode = function MediaElementAudioSourceNode() {};
  this.MediaEncryptedEvent = function MediaEncryptedEvent() {};
  this.MediaError = function MediaError() {};
  this.MediaKeyMessageEvent = function MediaKeyMessageEvent() {};
  this.MediaKeySession = function MediaKeySession() {};
  this.MediaKeyStatusMap = function MediaKeyStatusMap() {};
  this.MediaKeySystemAccess = function MediaKeySystemAccess() {};
  this.MediaKeys = function MediaKeys() {};
  this.MediaMetadata = function MediaMetadata() {};
  this.MediaQueryList = function MediaQueryList() {};
  this.MediaQueryListEvent = function MediaQueryListEvent() {};
  this.MediaRecorder = function MediaRecorder() {};
  this.MediaSession = function MediaSession() {};
  this.MediaSource = function MediaSource() {};
  this.MediaStream = function MediaStream() {};
  this.MediaStreamAudioDestinationNode =
    function MediaStreamAudioDestinationNode() {};
  this.MediaStreamAudioSourceNode = function MediaStreamAudioSourceNode() {};
  this.MediaStreamEvent = function MediaStreamEvent() {};
  this.MediaStreamTrack = function MediaStreamTrack() {};
  this.MediaStreamTrackEvent = function MediaStreamTrackEvent() {};
  this.MediaStreamTrackGenerator = function MediaStreamTrackGenerator() {};
  this.MediaStreamTrackProcessor = function MediaStreamTrackProcessor() {};
  this.MessageChannel = function MessageChannel() {};
  this.MessagePort = function MessagePort() {};
  this.MutationEvent = function MutationEvent() {};
  this.NavigateEvent = function NavigateEvent() {};
  this.Navigation = function Navigation() {};
  this.NavigationCurrentEntryChangeEvent =
    function NavigationCurrentEntryChangeEvent() {};
  this.NavigationDestination = function NavigationDestination() {};
  this.NavigationHistoryEntry = function NavigationHistoryEntry() {};
  this.NavigationPreloadManager = function NavigationPreloadManager() {};
  this.NavigationTransition = function NavigationTransition() {};
  this.NavigatorManagedData = function NavigatorManagedData() {};
  this.NavigatorUAData = function NavigatorUAData() {};
  this.NetworkInformation = function NetworkInformation() {};
  this.Notification = function Notification() {};
  this.OTPCredential = function OTPCredential() {};
  this.OfflineAudioCompletionEvent = function OfflineAudioCompletionEvent() {};
  this.OfflineAudioContext = function OfflineAudioContext() {};
  this.OffscreenCanvas = function OffscreenCanvas() {};
  this.OffscreenCanvasRenderingContext2D =
    function OffscreenCanvasRenderingContext2D() {};
  this.OrientationSensor = function OrientationSensor() {};
  this.OscillatorNode = function OscillatorNode() {};
  this.OverconstrainedError = function OverconstrainedError() {};
  this.PannerNode = function PannerNode() {};
  this.PasswordCredential = function PasswordCredential() {};
  this.Path2D = function Path2D() {};
  this.PaymentAddress = function PaymentAddress() {};
  this.PaymentInstruments = function PaymentInstruments() {};
  this.PaymentManager = function PaymentManager() {};
  this.PaymentMethodChangeEvent = function PaymentMethodChangeEvent() {};
  this.PaymentRequest = function PaymentRequest() {};
  this.PaymentRequestUpdateEvent = function PaymentRequestUpdateEvent() {};
  this.PaymentResponse = function PaymentResponse() {};
  this.PerformanceElementTiming = function PerformanceElementTiming() {};
  this.PerformanceEntry = function PerformanceEntry() {};
  this.PerformanceEventTiming = function PerformanceEventTiming() {};
  this.PerformanceLongTaskTiming = function PerformanceLongTaskTiming() {};
  this.PerformanceMark = function PerformanceMark() {};
  this.PerformanceMeasure = function PerformanceMeasure() {};
  this.PerformanceNavigation = function PerformanceNavigation() {};
  this.PerformanceNavigationTiming = function PerformanceNavigationTiming() {};
  this.PerformanceObserver = function PerformanceObserver() {};
  this.PerformanceObserverEntryList =
    function PerformanceObserverEntryList() {};
  this.PerformancePaintTiming = function PerformancePaintTiming() {};
  this.PerformanceResourceTiming = function PerformanceResourceTiming() {};
  this.PerformanceServerTiming = function PerformanceServerTiming() {};
  this.PerformanceTiming = function PerformanceTiming() {};
  this.PeriodicSyncManager = function PeriodicSyncManager() {};
  this.PeriodicWave = function PeriodicWave() {};
  this.PermissionStatus = function PermissionStatus() {};
  this.Permissions = function Permissions() {};
  this.PictureInPictureEvent = function PictureInPictureEvent() {};
  this.PictureInPictureWindow = function PictureInPictureWindow() {};
  this.PointerEvent = function PointerEvent() {};
  this.Presentation = function Presentation() {};
  this.PresentationAvailability = function PresentationAvailability() {};
  this.PresentationConnection = function PresentationConnection() {};
  this.PresentationConnectionAvailableEvent =
    function PresentationConnectionAvailableEvent() {};
  this.PresentationConnectionCloseEvent =
    function PresentationConnectionCloseEvent() {};
  this.PresentationConnectionList = function PresentationConnectionList() {};
  this.PresentationReceiver = function PresentationReceiver() {};
  this.PresentationRequest = function PresentationRequest() {};
  this.Profiler = function Profiler() {};
  this.PromiseRejectionEvent = function PromiseRejectionEvent() {};
  this.PublicKeyCredential = function PublicKeyCredential() {};
  this.PushManager = function PushManager() {};
  this.PushSubscription = function PushSubscription() {};
  this.PushSubscriptionOptions = function PushSubscriptionOptions() {};
  this.RTCCertificate = function RTCCertificate() {};
  this.RTCDTMFSender = function RTCDTMFSender() {};
  this.RTCDTMFToneChangeEvent = function RTCDTMFToneChangeEvent() {};
  this.RTCDataChannel = function RTCDataChannel() {};
  this.RTCDataChannelEvent = function RTCDataChannelEvent() {};
  this.RTCDtlsTransport = function RTCDtlsTransport() {};
  this.RTCEncodedAudioFrame = function RTCEncodedAudioFrame() {};
  this.RTCEncodedVideoFrame = function RTCEncodedVideoFrame() {};
  this.RTCError = function RTCError() {};
  this.RTCErrorEvent = function RTCErrorEvent() {};
  this.RTCIceCandidate = function RTCIceCandidate() {};
  this.RTCIceTransport = function RTCIceTransport() {};
  this.RTCPeerConnection = function RTCPeerConnection() {};
  this.RTCPeerConnectionIceErrorEvent =
    function RTCPeerConnectionIceErrorEvent() {};
  this.RTCPeerConnectionIceEvent = function RTCPeerConnectionIceEvent() {};
  this.RTCRtpReceiver = function RTCRtpReceiver() {};
  this.RTCRtpSender = function RTCRtpSender() {};
  this.RTCRtpTransceiver = function RTCRtpTransceiver() {};
  this.RTCSctpTransport = function RTCSctpTransport() {};
  this.RTCSessionDescription = function RTCSessionDescription() {};
  this.RTCStatsReport = function RTCStatsReport() {};
  this.RTCTrackEvent = function RTCTrackEvent() {};
  this.ReadableByteStreamController =
    function ReadableByteStreamController() {};
  this.ReadableStream = function ReadableStream() {};
  this.ReadableStreamBYOBReader = function ReadableStreamBYOBReader() {};
  this.ReadableStreamBYOBRequest = function ReadableStreamBYOBRequest() {};
  this.ReadableStreamDefaultController =
    function ReadableStreamDefaultController() {};
  this.ReadableStreamDefaultReader = function ReadableStreamDefaultReader() {};
  this.RelativeOrientationSensor = function RelativeOrientationSensor() {};
  this.RemotePlayback = function RemotePlayback() {};
  this.ReportingObserver = function ReportingObserver() {};
  this.Request = function Request() {};
  this.ResizeObserver = function ResizeObserver() {};
  this.ResizeObserverEntry = function ResizeObserverEntry() {};
  this.ResizeObserverSize = function ResizeObserverSize() {};
  this.Response = function Response() {};
  this.SVGAElement = function SVGAElement() {};
  this.SVGAngle = function SVGAngle() {};
  this.SVGAnimateElement = function SVGAnimateElement() {};
  this.SVGAnimateMotionElement = function SVGAnimateMotionElement() {};
  this.SVGAnimateTransformElement = function SVGAnimateTransformElement() {};
  this.SVGAnimatedAngle = function SVGAnimatedAngle() {};
  this.SVGAnimatedBoolean = function SVGAnimatedBoolean() {};
  this.SVGAnimatedEnumeration = function SVGAnimatedEnumeration() {};
  this.SVGAnimatedInteger = function SVGAnimatedInteger() {};
  this.SVGAnimatedLength = function SVGAnimatedLength() {};
  this.SVGAnimatedLengthList = function SVGAnimatedLengthList() {};
  this.SVGAnimatedNumber = function SVGAnimatedNumber() {};
  this.SVGAnimatedNumberList = function SVGAnimatedNumberList() {};
  this.SVGAnimatedPreserveAspectRatio =
    function SVGAnimatedPreserveAspectRatio() {};
  this.SVGAnimatedRect = function SVGAnimatedRect() {};
  this.SVGAnimatedTransformList = function SVGAnimatedTransformList() {};
  this.SVGAnimationElement = function SVGAnimationElement() {};
  this.SVGCircleElement = function SVGCircleElement() {};
  this.SVGClipPathElement = function SVGClipPathElement() {};
  this.SVGComponentTransferFunctionElement =
    function SVGComponentTransferFunctionElement() {};
  this.SVGDefsElement = function SVGDefsElement() {};
  this.SVGDescElement = function SVGDescElement() {};
  this.SVGEllipseElement = function SVGEllipseElement() {};
  this.SVGFEBlendElement = function SVGFEBlendElement() {};
  this.SVGFEColorMatrixElement = function SVGFEColorMatrixElement() {};
  this.SVGFEComponentTransferElement =
    function SVGFEComponentTransferElement() {};
  this.SVGFECompositeElement = function SVGFECompositeElement() {};
  this.SVGFEConvolveMatrixElement = function SVGFEConvolveMatrixElement() {};
  this.SVGFEDiffuseLightingElement = function SVGFEDiffuseLightingElement() {};
  this.SVGFEDisplacementMapElement = function SVGFEDisplacementMapElement() {};
  this.SVGFEDistantLightElement = function SVGFEDistantLightElement() {};
  this.SVGFEDropShadowElement = function SVGFEDropShadowElement() {};
  this.SVGFEFloodElement = function SVGFEFloodElement() {};
  this.SVGFEFuncAElement = function SVGFEFuncAElement() {};
  this.SVGFEFuncBElement = function SVGFEFuncBElement() {};
  this.SVGFEFuncGElement = function SVGFEFuncGElement() {};
  this.SVGFEFuncRElement = function SVGFEFuncRElement() {};
  this.SVGFEGaussianBlurElement = function SVGFEGaussianBlurElement() {};
  this.SVGFEImageElement = function SVGFEImageElement() {};
  this.SVGFEMergeElement = function SVGFEMergeElement() {};
  this.SVGFEMergeNodeElement = function SVGFEMergeNodeElement() {};
  this.SVGFEMorphologyElement = function SVGFEMorphologyElement() {};
  this.SVGFEOffsetElement = function SVGFEOffsetElement() {};
  this.SVGFEPointLightElement = function SVGFEPointLightElement() {};
  this.SVGFESpecularLightingElement =
    function SVGFESpecularLightingElement() {};
  this.SVGFESpotLightElement = function SVGFESpotLightElement() {};
  this.SVGFETileElement = function SVGFETileElement() {};
  this.SVGFETurbulenceElement = function SVGFETurbulenceElement() {};
  this.SVGFilterElement = function SVGFilterElement() {};
  this.SVGForeignObjectElement = function SVGForeignObjectElement() {};
  this.SVGGElement = function SVGGElement() {};
  this.SVGGeometryElement = function SVGGeometryElement() {};
  this.SVGGradientElement = function SVGGradientElement() {};
  this.SVGImageElement = function SVGImageElement() {};
  this.SVGLength = function SVGLength() {};
  this.SVGLengthList = function SVGLengthList() {};
  this.SVGLineElement = function SVGLineElement() {};
  this.SVGLinearGradientElement = function SVGLinearGradientElement() {};
  this.SVGMPathElement = function SVGMPathElement() {};
  this.SVGMarkerElement = function SVGMarkerElement() {};
  this.SVGMaskElement = function SVGMaskElement() {};
  this.SVGMatrix = function SVGMatrix() {};
  this.SVGMetadataElement = function SVGMetadataElement() {};
  this.SVGNumberList = function SVGNumberList() {};
  this.SVGPathElement = function SVGPathElement() {};
  this.SVGPatternElement = function SVGPatternElement() {};
  this.SVGPoint = function SVGPoint() {};
  this.SVGPointList = function SVGPointList() {};
  this.SVGPolygonElement = function SVGPolygonElement() {};
  this.SVGPolylineElement = function SVGPolylineElement() {};
  this.SVGPreserveAspectRatio = function SVGPreserveAspectRatio() {};
  this.SVGRadialGradientElement = function SVGRadialGradientElement() {};
  this.SVGRect = function SVGRect() {};
  this.SVGRectElement = function SVGRectElement() {};
  this.SVGScriptElement = function SVGScriptElement() {};
  this.SVGSetElement = function SVGSetElement() {};
  this.SVGStopElement = function SVGStopElement() {};
  this.SVGStyleElement = function SVGStyleElement() {};
  this.SVGSwitchElement = function SVGSwitchElement() {};
  this.SVGSymbolElement = function SVGSymbolElement() {};
  this.SVGTSpanElement = function SVGTSpanElement() {};
  this.SVGTextContentElement = function SVGTextContentElement() {};
  this.SVGTextElement = function SVGTextElement() {};
  this.SVGTextPathElement = function SVGTextPathElement() {};
  this.SVGTextPositioningElement = function SVGTextPositioningElement() {};
  this.SVGTransform = function SVGTransform() {};
  this.SVGTransformList = function SVGTransformList() {};
  this.SVGUnitTypes = function SVGUnitTypes() {};
  this.SVGUseElement = function SVGUseElement() {};
  this.SVGViewElement = function SVGViewElement() {};
  this.Scheduler = function Scheduler() {};
  this.Scheduling = function Scheduling() {};
  this.ScreenDetailed = function ScreenDetailed() {};
  this.ScreenDetails = function ScreenDetails() {};
  this.ScreenOrientation = function ScreenOrientation() {};
  this.ScriptProcessorNode = function ScriptProcessorNode() {};
  this.SecurityPolicyViolationEvent =
    function SecurityPolicyViolationEvent() {};
  this.Sensor = function Sensor() {};
  this.SensorErrorEvent = function SensorErrorEvent() {};
  this.Serial = function Serial() {};
  this.SerialPort = function SerialPort() {};
  this.ServiceWorker = function ServiceWorker() {};
  this.ServiceWorkerContainer = function ServiceWorkerContainer() {};
  this.ServiceWorkerRegistration = function ServiceWorkerRegistration() {};
  this.SharedWorker = function SharedWorker() {};
  this.SourceBuffer = function SourceBuffer() {};
  this.SourceBufferList = function SourceBufferList() {};
  this.SpeechSynthesisErrorEvent = function SpeechSynthesisErrorEvent() {};
  this.SpeechSynthesisEvent = function SpeechSynthesisEvent() {};
  this.SpeechSynthesisUtterance = function SpeechSynthesisUtterance() {};
  this.StereoPannerNode = function StereoPannerNode() {};
  this.StorageManager = function StorageManager() {};
  this.StylePropertyMap = function StylePropertyMap() {};
  this.StylePropertyMapReadOnly = function StylePropertyMapReadOnly() {};
  this.SubmitEvent = function SubmitEvent() {};
  this.SubtleCrypto = function SubtleCrypto() {};
  this.SyncManager = function SyncManager() {};
  this.TaskAttributionTiming = function TaskAttributionTiming() {};
  this.TaskController = function TaskController() {};
  this.TaskPriorityChangeEvent = function TaskPriorityChangeEvent() {};
  this.TaskSignal = function TaskSignal() {};
  this.TextDecoder = function TextDecoder() {};
  this.TextDecoderStream = function TextDecoderStream() {};
  this.TextEncoder = function TextEncoder() {};
  this.TextEncoderStream = function TextEncoderStream() {};
  this.TextEvent = function TextEvent() {};
  this.TextMetrics = function TextMetrics() {};
  this.TextTrack = function TextTrack() {};
  this.TextTrackCue = function TextTrackCue() {};
  this.TextTrackCueList = function TextTrackCueList() {};
  this.TextTrackList = function TextTrackList() {};
  this.TimeRanges = function TimeRanges() {};
  this.Touch = function Touch() {};
  this.TouchList = function TouchList() {};
  this.TrackEvent = function TrackEvent() {};
  this.TransformStream = function TransformStream() {};
  this.TransitionEvent = function TransitionEvent() {};
  this.TrustedHTML = function TrustedHTML() {};
  this.TrustedScript = function TrustedScript() {};
  this.TrustedScriptURL = function TrustedScriptURL() {};
  this.TrustedTypePolicy = function TrustedTypePolicy() {};
  this.TrustedTypePolicyFactory = function TrustedTypePolicyFactory() {};
  this.URLPattern = function URLPattern() {};
  this.USB = function USB() {};
  this.USBAlternateInterface = function USBAlternateInterface() {};
  this.USBConfiguration = function USBConfiguration() {};
  this.USBConnectionEvent = function USBConnectionEvent() {};
  this.USBDevice = function USBDevice() {};
  this.USBEndpoint = function USBEndpoint() {};
  this.USBInTransferResult = function USBInTransferResult() {};
  this.USBInterface = function USBInterface() {};
  this.USBIsochronousInTransferPacket =
    function USBIsochronousInTransferPacket() {};
  this.USBIsochronousInTransferResult =
    function USBIsochronousInTransferResult() {};
  this.USBIsochronousOutTransferPacket =
    function USBIsochronousOutTransferPacket() {};
  this.USBIsochronousOutTransferResult =
    function USBIsochronousOutTransferResult() {};
  this.USBOutTransferResult = function USBOutTransferResult() {};
  this.UserActivation = function UserActivation() {};
  this.VTTCue = function VTTCue() {};
  this.VideoColorSpace = function VideoColorSpace() {};
  this.VideoDecoder = function VideoDecoder() {};
  this.VideoEncoder = function VideoEncoder() {};
  this.VideoFrame = function VideoFrame() {};
  this.VideoPlaybackQuality = function VideoPlaybackQuality() {};
  this.VirtualKeyboard = function VirtualKeyboard() {};
  this.VirtualKeyboardGeometryChangeEvent =
    function VirtualKeyboardGeometryChangeEvent() {};
  this.VisualViewport = function VisualViewport() {};
  this.WakeLock = function WakeLock() {};
  this.WakeLockSentinel = function WakeLockSentinel() {};
  this.WaveShaperNode = function WaveShaperNode() {};
  this.WebGL2RenderingContext = function WebGL2RenderingContext() {};
  this.WebGLActiveInfo = function WebGLActiveInfo() {};
  this.WebGLBuffer = function WebGLBuffer() {};
  this.WebGLContextEvent = function WebGLContextEvent() {};
  this.WebGLFramebuffer = function WebGLFramebuffer() {};
  this.WebGLProgram = function WebGLProgram() {};
  this.WebGLQuery = function WebGLQuery() {};
  this.WebGLRenderbuffer = function WebGLRenderbuffer() {};
  this.WebGLRenderingContext = function WebGLRenderingContext() {};
  this.WebGLSampler = function WebGLSampler() {};
  this.WebGLShader = function WebGLShader() {};
  this.WebGLShaderPrecisionFormat = function WebGLShaderPrecisionFormat() {};
  this.WebGLSync = function WebGLSync() {};
  this.WebGLTexture = function WebGLTexture() {};
  this.WebGLTransformFeedback = function WebGLTransformFeedback() {};
  this.WebGLUniformLocation = function WebGLUniformLocation() {};
  this.WebGLVertexArrayObject = function WebGLVertexArrayObject() {};
  this.WebKitCSSMatrix = function WebKitCSSMatrix() {};
  this.WebKitMutationObserver = function WebKitMutationObserver() {};
  this.WebTransport = function WebTransport() {};
  this.WebTransportBidirectionalStream =
    function WebTransportBidirectionalStream() {};
  this.WebTransportDatagramDuplexStream =
    function WebTransportDatagramDuplexStream() {};
  this.WebTransportError = function WebTransportError() {};
  this.Worker = Worker;
  this.Worklet = function Worklet() {};
  this.WritableStream = function WritableStream() {};
  this.WritableStreamDefaultController =
    function WritableStreamDefaultController() {};
  this.WritableStreamDefaultWriter = function WritableStreamDefaultWriter() {};
  this.XRAnchor = function XRAnchor() {};
  this.XRAnchorSet = function XRAnchorSet() {};
  this.XRBoundedReferenceSpace = function XRBoundedReferenceSpace() {};
  this.XRCPUDepthInformation = function XRCPUDepthInformation() {};
  this.XRDOMOverlayState = function XRDOMOverlayState() {};
  this.XRDepthInformation = function XRDepthInformation() {};
  this.XRFrame = function XRFrame() {};
  this.XRHitTestResult = function XRHitTestResult() {};
  this.XRHitTestSource = function XRHitTestSource() {};
  this.XRInputSource = function XRInputSource() {};
  this.XRInputSourceArray = function XRInputSourceArray() {};
  this.XRInputSourceEvent = function XRInputSourceEvent() {};
  this.XRInputSourcesChangeEvent = function XRInputSourcesChangeEvent() {};
  this.XRLayer = function XRLayer() {};
  this.XRLightEstimate = function XRLightEstimate() {};
  this.XRLightProbe = function XRLightProbe() {};
  this.XRPose = function XRPose() {};
  this.XRRay = function XRRay() {};
  this.XRReferenceSpace = function XRReferenceSpace() {};
  this.XRReferenceSpaceEvent = function XRReferenceSpaceEvent() {};
  this.XRRenderState = function XRRenderState() {};
  this.XRRigidTransform = function XRRigidTransform() {};
  this.XRSession = function XRSession() {};
  this.XRSessionEvent = function XRSessionEvent() {};
  this.XRSpace = function XRSpace() {};
  this.XRSystem = function XRSystem() {};
  this.XRTransientInputHitTestResult =
    function XRTransientInputHitTestResult() {};
  this.XRTransientInputHitTestSource =
    function XRTransientInputHitTestSource() {};
  this.XRView = function XRView() {};
  this.XRViewerPose = function XRViewerPose() {};
  this.XRViewport = function XRViewport() {};
  this.XRWebGLBinding = function XRWebGLBinding() {};
  this.XRWebGLDepthInformation = function XRWebGLDepthInformation() {};
  this.XRWebGLLayer = function XRWebGLLayer() {};
  this.XSLTProcessor = function XSLTProcessor() {};
  this.event = function event() {};
  this.offscreenBuffering = function offscreenBuffering() {};
  this.webkitMediaStream = function webkitMediaStream() {};
  this.webkitRTCPeerConnection = function webkitRTCPeerConnection() {};
  this.webkitSpeechGrammar = function webkitSpeechGrammar() {};
  this.webkitSpeechGrammarList = function webkitSpeechGrammarList() {};
  this.webkitSpeechRecognition = function webkitSpeechRecognition() {};
  this.webkitSpeechRecognitionError =
    function webkitSpeechRecognitionError() {};
  this.webkitSpeechRecognitionEvent =
    function webkitSpeechRecognitionEvent() {};
  this.caches = new (class CacheStorage {})();
  this.cookieStore = new (class CookieStore {})();
  this.indexedDB = new (class IDBFactory {})();
  this.launchQueue = new (class LaunchQueue {})();
  this.scheduler = new (class Scheduler {})();
  this.speechSynthesis = new (class SpeechSynthesis {})();
  this.styleMedia = new (class StyleMedia {})();
  this.trustedTypes = new (class TrustedTypePolicyFactory {})();
  this.visualViewport = new (class VisualViewport {})();
  this.webkitStorageInfo = new (class DeprecatedStorageInfo {})();

  define(this, {
    get length() {
      return window._length;
    },
    get window() {
      return window._globalProxy;
    },
    get frameElement() {
      return idlUtils.wrapperForImpl(window._frameElement);
    },
    get frames() {
      return window._globalProxy;
    },
    get self() {
      return window._globalProxy;
    },
    get parent() {
      return window._parent;
    },
    get top() {
      return window._top;
    },
    get document() {
      return window._document;
    },
    get external() {
      return external;
    },
    get location() {
      return idlUtils.wrapperForImpl(
        idlUtils.implForWrapper(window._document)._location
      );
    },
    get history() {
      return idlUtils.wrapperForImpl(
        idlUtils.implForWrapper(window._document)._history
      );
    },
    get navigator() {
      return navigator;
    },
    get locationbar() {
      return locationbar;
    },
    get menubar() {
      return menubar;
    },
    get personalbar() {
      return personalbar;
    },
    get scrollbars() {
      return scrollbars;
    },
    get statusbar() {
      return statusbar;
    },
    get toolbar() {
      return toolbar;
    },
    get performance() {
      return performanceImpl;
    },
    get screen() {
      return screen;
    },
    get crypto() {
      return crypto;
    },
    get origin() {
      return window._origin;
    },
    get caches() {
      return new (class CacheStorage {})();
    },
    get clientInformation() {
      return navigator;
    },
    get closed() {
      return false;
    },
    get cookieStore() {
      return new (class CookieStore {})();
    },
    get crossOriginIsolated() {
      return false;
    },
    get defaultStatus() {
      return "";
    },
    get defaultStatus() {
      return "";
    },
    get indexedDB() {
      return new (class IDBFactory {})();
    },
    get isSecureContext() {
      return true;
    },
    get launchQueue() {
      return new (class LaunchQueue {})();
    },
    get onabort() {
      return null;
    },
    get onafterprint() {
      return null;
    },
    get onanimationend() {
      return null;
    },
    get onanimationiteration() {
      return null;
    },
    get onanimationstart() {
      return null;
    },
    get onappinstalled() {
      return null;
    },
    get onauxclick() {
      return null;
    },
    get onbeforeinstallprompt() {
      return null;
    },
    get onbeforematch() {
      return null;
    },
    get onbeforeprint() {
      return null;
    },
    get onbeforeunload() {
      return null;
    },
    get onbeforexrselect() {
      return null;
    },
    get onblur() {
      return null;
    },
    get oncancel() {
      return null;
    },
    get oncanplay() {
      return null;
    },
    get oncanplaythrough() {
      return null;
    },
    get onchange() {
      return null;
    },
    get onclick() {
      return null;
    },
    get onclose() {
      return null;
    },
    get oncontextlost() {
      return null;
    },
    get oncontextmenu() {
      return null;
    },
    get oncontextrestored() {
      return null;
    },
    get oncuechange() {
      return null;
    },
    get ondblclick() {
      return null;
    },
    get ondevicemotion() {
      return null;
    },
    get ondeviceorientation() {
      return null;
    },
    get ondeviceorientationabsolute() {
      return null;
    },
    get ondrag() {
      return null;
    },
    get ondragend() {
      return null;
    },
    get ondragenter() {
      return null;
    },
    get ondragleave() {
      return null;
    },
    get ondragover() {
      return null;
    },
    get ondragstart() {
      return null;
    },
    get ondrop() {
      return null;
    },
    get ondurationchange() {
      return null;
    },
    get onemptied() {
      return null;
    },
    get onended() {
      return null;
    },
    get onerror() {
      return null;
    },
    get onfocus() {
      return null;
    },
    get onformdata() {
      return null;
    },
    get ongotpointercapture() {
      return null;
    },
    get onhashchange() {
      return null;
    },
    get oninput() {
      return null;
    },
    get oninvalid() {
      return null;
    },
    get onkeydown() {
      return null;
    },
    get onkeypress() {
      return null;
    },
    get onkeyup() {
      return null;
    },
    get onlanguagechange() {
      return null;
    },
    get onload() {
      return null;
    },
    get onloadeddata() {
      return null;
    },
    get onloadedmetadata() {
      return null;
    },
    get onloadstart() {
      return null;
    },
    get onlostpointercapture() {
      return null;
    },
    get onmessage() {
      return null;
    },
    get onmessageerror() {
      return null;
    },
    get onmousedown() {
      return null;
    },
    get onmouseenter() {
      return null;
    },
    get onmouseleave() {
      return null;
    },
    get onmousemove() {
      return null;
    },
    get onmouseout() {
      return null;
    },
    get onmouseover() {
      return null;
    },
    get onmouseup() {
      return null;
    },
    get onmousewheel() {
      return null;
    },
    get onoffline() {
      return null;
    },
    get ononline() {
      return null;
    },
    get onpagehide() {
      return null;
    },
    get onpageshow() {
      return null;
    },
    get onpause() {
      return null;
    },
    get onplay() {
      return null;
    },
    get onplaying() {
      return null;
    },
    get onpointercancel() {
      return null;
    },
    get onpointerdown() {
      return null;
    },
    get onpointerenter() {
      return null;
    },
    get onpointerleave() {
      return null;
    },
    get onpointermove() {
      return null;
    },
    get onpointerout() {
      return null;
    },
    get onpointerover() {
      return null;
    },
    get onpointerrawupdate() {
      return null;
    },
    get onpointerup() {
      return null;
    },
    get onpopstate() {
      return null;
    },
    get onprogress() {
      return null;
    },
    get onratechange() {
      return null;
    },
    get onrejectionhandled() {
      return null;
    },
    get onreset() {
      return null;
    },
    get onresize() {
      return null;
    },
    get onscroll() {
      return null;
    },
    get onsearch() {
      return null;
    },
    get onsecuritypolicyviolation() {
      return null;
    },
    get onseeked() {
      return null;
    },
    get onseeking() {
      return null;
    },
    get onselect() {
      return null;
    },
    get onselectionchange() {
      return null;
    },
    get onselectstart() {
      return null;
    },
    get onslotchange() {
      return null;
    },
    get onstalled() {
      return null;
    },
    get onstorage() {
      return null;
    },
    get onsubmit() {
      return null;
    },
    get onsuspend() {
      return null;
    },
    get ontimeupdate() {
      return null;
    },
    get ontoggle() {
      return null;
    },
    get ontransitioncancel() {
      return null;
    },
    get ontransitionend() {
      return null;
    },
    get ontransitionrun() {
      return null;
    },
    get ontransitionstart() {
      return null;
    },
    get onunhandledrejection() {
      return null;
    },
    get onunload() {
      return null;
    },
    get onvolumechange() {
      return null;
    },
    get onwaiting() {
      return null;
    },
    get onwebkitanimationend() {
      return null;
    },
    get onwebkitanimationiteration() {
      return null;
    },
    get onwebkitanimationstart() {
      return null;
    },
    get onwebkittransitionend() {
      return null;
    },
    get onwheel() {
      return null;
    },
    get opener() {
      return null;
    },
    get originAgentCluster() {
      return false;
    },
    get scheduler() {
      return new (class Scheduler {})();
    },
    get screenLeft() {
      return this.outerWidth;
    },
    get screenTop() {
      return 0;
    },
    get screenX() {
      return this.outerWidth;
    },
    get screenY() {
      return 0;
    },

    // The origin IDL attribute is defined with [Replaceable].
    set origin(value) {
      Object.defineProperty(this, "origin", {
        value,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    },
    get localStorage() {
      if (idlUtils.implForWrapper(this._document)._origin === "null") {
        throw DOMException.create(window, [
          "localStorage is not available for opaque origins",
          "SecurityError",
        ]);
      }

      return this._localStorage;
    },
    get sessionStorage() {
      if (idlUtils.implForWrapper(this._document)._origin === "null") {
        throw DOMException.create(window, [
          "sessionStorage is not available for opaque origins",
          "SecurityError",
        ]);
      }

      return this._sessionStorage;
    },
    get customElements() {
      return customElementRegistry;
    },
    get event() {
      return window._currentEvent
        ? idlUtils.wrapperForImpl(window._currentEvent)
        : undefined;
    },
    set event(value) {
      Object.defineProperty(window, "event", {
        configurable: true,
        enumerable: true,
        writable: true,
        value,
      });
    },
  });

  namedPropertiesWindow.initializeWindow(this, this._globalProxy);

  // ### METHODS

  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers

  // In the spec the list of active timers is a set of IDs. We make it a map of IDs to Node.js timer objects, so that
  // we can call Node.js-side clearTimeout() when clearing, and thus allow process shutdown faster.
  const listOfActiveTimers = new Map();
  let latestTimerId = 0;

  this.setTimeout = function (handler, timeout = 0, ...args) {
    if (typeof handler !== "function") {
      handler = webIDLConversions.DOMString(handler);
    }
    timeout = webIDLConversions.long(timeout);

    return timerInitializationSteps(handler, timeout, args, {
      methodContext: window,
      repeat: false,
    });
  };
  this.setInterval = function (handler, timeout = 0, ...args) {
    if (typeof handler !== "function") {
      handler = webIDLConversions.DOMString(handler);
    }
    timeout = webIDLConversions.long(timeout);

    return timerInitializationSteps(handler, timeout, args, {
      methodContext: window,
      repeat: true,
    });
  };

  this.clearTimeout = function (handle = 0) {
    handle = webIDLConversions.long(handle);

    const nodejsTimer = listOfActiveTimers.get(handle);
    if (nodejsTimer) {
      clearTimeout(nodejsTimer);
      listOfActiveTimers.delete(handle);
    }
  };
  this.clearInterval = function (handle = 0) {
    handle = webIDLConversions.long(handle);

    const nodejsTimer = listOfActiveTimers.get(handle);
    if (nodejsTimer) {
      // We use setTimeout() in timerInitializationSteps even for this.setInterval().
      clearTimeout(nodejsTimer);
      listOfActiveTimers.delete(handle);
    }
  };

  function timerInitializationSteps(
    handler,
    timeout,
    args,
    { methodContext, repeat, previousHandle }
  ) {
    // This appears to be unspecced, but matches browser behavior for close()ed windows.
    if (!methodContext._document) {
      return 0;
    }

    // TODO: implement timer nesting level behavior.

    const methodContextProxy = methodContext._globalProxy;
    const handle =
      previousHandle !== undefined ? previousHandle : ++latestTimerId;

    function task() {
      if (!listOfActiveTimers.has(handle)) {
        return;
      }

      try {
        if (typeof handler === "function") {
          handler.apply(methodContextProxy, args);
        } else if (window._runScripts === "dangerously") {
          vm.runInContext(handler, window, {
            filename: window.location.href,
            displayErrors: false,
          });
        }
      } catch (e) {
        reportException(window, e, window.location.href);
      }

      if (listOfActiveTimers.has(handle)) {
        if (repeat) {
          timerInitializationSteps(handler, timeout, args, {
            methodContext,
            repeat: true,
            previousHandle: handle,
          });
        } else {
          listOfActiveTimers.delete(handle);
        }
      }
    }

    if (timeout < 0) {
      timeout = 0;
    }

    const nodejsTimer = setTimeout(task, timeout);
    listOfActiveTimers.set(handle, nodejsTimer);

    return handle;
  }

  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#microtask-queuing

  this.queueMicrotask = function (callback) {
    callback = IDLFunction.convert(this, callback);

    queueMicrotask(() => {
      try {
        callback();
      } catch (e) {
        reportException(window, e, window.location.href);
      }
    });
  };

  // https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#animation-frames

  let animationFrameCallbackId = 0;
  const mapOfAnimationFrameCallbacks = new Map();
  let animationFrameNodejsInterval = null;

  // Unlike the spec, where an animation frame happens every 60 Hz regardless, we optimize so that if there are no
  // requestAnimationFrame() calls outstanding, we don't fire the timer. This helps us track that.
  let numberOfOngoingAnimationFrameCallbacks = 0;

  if (this._pretendToBeVisual) {
    this.requestAnimationFrame = function (callback) {
      callback = IDLFunction.convert(this, callback);

      const handle = ++animationFrameCallbackId;
      mapOfAnimationFrameCallbacks.set(handle, callback);

      ++numberOfOngoingAnimationFrameCallbacks;
      if (numberOfOngoingAnimationFrameCallbacks === 1) {
        animationFrameNodejsInterval = setInterval(() => {
          runAnimationFrameCallbacks(performance.now() - windowInitialized);
        }, 1000 / 60);
      }

      return handle;
    };

    this.cancelAnimationFrame = function (handle) {
      handle = webIDLConversions["unsigned long"](handle);

      removeAnimationFrameCallback(handle);
    };

    function runAnimationFrameCallbacks(now) {
      // Converting to an array is important to get a sync snapshot and thus match spec semantics.
      const callbackHandles = [...mapOfAnimationFrameCallbacks.keys()];
      for (const handle of callbackHandles) {
        // This has() can be false if a callback calls cancelAnimationFrame().
        if (mapOfAnimationFrameCallbacks.has(handle)) {
          const callback = mapOfAnimationFrameCallbacks.get(handle);
          removeAnimationFrameCallback(handle);
          try {
            callback(now);
          } catch (e) {
            reportException(window, e, window.location.href);
          }
        }
      }
    }

    function removeAnimationFrameCallback(handle) {
      if (mapOfAnimationFrameCallbacks.has(handle)) {
        --numberOfOngoingAnimationFrameCallbacks;
        if (numberOfOngoingAnimationFrameCallbacks === 0) {
          clearInterval(animationFrameNodejsInterval);
        }
      }

      mapOfAnimationFrameCallbacks.delete(handle);
    }
  }

  function stopAllTimers() {
    for (const nodejsTimer of listOfActiveTimers.values()) {
      clearTimeout(nodejsTimer);
    }
    listOfActiveTimers.clear();

    clearInterval(animationFrameNodejsInterval);
  }

  function Option(text, value, defaultSelected, selected) {
    if (text === undefined) {
      text = "";
    }
    text = webIDLConversions.DOMString(text);

    if (value !== undefined) {
      value = webIDLConversions.DOMString(value);
    }

    defaultSelected = webIDLConversions.boolean(defaultSelected);
    selected = webIDLConversions.boolean(selected);

    const option = window._document.createElement("option");
    const impl = idlUtils.implForWrapper(option);

    if (text !== "") {
      impl.text = text;
    }
    if (value !== undefined) {
      impl.setAttributeNS(null, "value", value);
    }
    if (defaultSelected) {
      impl.setAttributeNS(null, "selected", "");
    }
    impl._selectedness = selected;

    return option;
  }
  Object.defineProperty(Option, "prototype", {
    value: this.HTMLOptionElement.prototype,
    configurable: false,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(window, "Option", {
    value: Option,
    configurable: true,
    enumerable: false,
    writable: true,
  });

  function Image(...args) {
    const img = window._document.createElement("img");
    const impl = idlUtils.implForWrapper(img);

    if (args.length > 0) {
      impl.setAttributeNS(null, "width", String(args[0]));
    }
    if (args.length > 1) {
      impl.setAttributeNS(null, "height", String(args[1]));
    }

    return img;
  }
  Object.defineProperty(Image, "prototype", {
    value: this.HTMLImageElement.prototype,
    configurable: false,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(window, "Image", {
    value: Image,
    configurable: true,
    enumerable: false,
    writable: true,
  });

  function Audio(src) {
    const audio = window._document.createElement("audio");
    const impl = idlUtils.implForWrapper(audio);
    impl.setAttributeNS(null, "preload", "auto");

    if (src !== undefined) {
      impl.setAttributeNS(null, "src", String(src));
    }

    return audio;
  }
  Object.defineProperty(Audio, "prototype", {
    value: this.HTMLAudioElement.prototype,
    configurable: false,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(window, "Audio", {
    value: Audio,
    configurable: true,
    enumerable: false,
    writable: true,
  });

  this.postMessage = postMessage(window);

  this.atob = function (str) {
    const result = atob(str);
    if (result === null) {
      throw DOMException.create(window, [
        "The string to be decoded contains invalid characters.",
        "InvalidCharacterError",
      ]);
    }
    return result;
  };

  this.btoa = function (str) {
    const result = btoa(str);
    if (result === null) {
      throw DOMException.create(window, [
        "The string to be encoded contains invalid characters.",
        "InvalidCharacterError",
      ]);
    }
    return result;
  };

  this.stop = function () {
    const manager = idlUtils.implForWrapper(this._document)._requestManager;
    if (manager) {
      manager.close();
    }
  };

  this.close = function () {
    // Recursively close child frame windows, then ourselves (depth-first).
    for (let i = 0; i < this.length; ++i) {
      this[i].close();
    }

    // Clear out all listeners. Any in-flight or upcoming events should not get delivered.
    idlUtils.implForWrapper(this)._eventListeners = Object.create(null);

    if (this._document) {
      if (this._document.body) {
        this._document.body.innerHTML = "";
      }

      if (this._document.close) {
        // It's especially important to clear out the listeners here because document.close() causes a "load" event to
        // fire.
        idlUtils.implForWrapper(this._document)._eventListeners =
          Object.create(null);
        this._document.close();
      }
      const doc = idlUtils.implForWrapper(this._document);
      if (doc._requestManager) {
        doc._requestManager.close();
      }
      delete this._document;
    }

    stopAllTimers();
    WebSocketImpl.cleanUpWindow(this);
  };

  this.getComputedStyle = function (elt, pseudoElt = undefined) {
    elt = Element.convert(this, elt);
    if (pseudoElt !== undefined && pseudoElt !== null) {
      pseudoElt = webIDLConversions.DOMString(pseudoElt);
    }

    if (pseudoElt !== undefined && pseudoElt !== null && pseudoElt !== "") {
      // TODO: Parse pseudoElt

      if (SHADOW_DOM_PSEUDO_REGEXP.test(pseudoElt)) {
        throw new TypeError(
          "Tried to get the computed style of a Shadow DOM pseudo-element."
        );
      }

      notImplemented("window.computedStyle(elt, pseudoElt)", this);
    }

    const declaration = new CSSStyleDeclaration();
    const { forEach } = Array.prototype;
    const { style } = elt;

    forEachMatchingSheetRuleOfElement(elt, (rule) => {
      forEach.call(rule.style, (property) => {
        declaration.setProperty(
          property,
          rule.style.getPropertyValue(property),
          rule.style.getPropertyPriority(property)
        );
      });
    });

    // https://drafts.csswg.org/cssom/#dom-window-getcomputedstyle
    const declarations = Object.keys(propertiesWithResolvedValueImplemented);
    forEach.call(declarations, (property) => {
      declaration.setProperty(property, getResolvedValue(elt, property));
    });

    forEach.call(style, (property) => {
      declaration.setProperty(
        property,
        style.getPropertyValue(property),
        style.getPropertyPriority(property)
      );
    });

    return declaration;
  };

  this.getSelection = function () {
    return window._document.getSelection();
  };

  // The captureEvents() and releaseEvents() methods must do nothing
  this.captureEvents = function () {};

  this.releaseEvents = function () {};

  // ### PUBLIC DATA PROPERTIES (TODO: should be getters)

  function wrapConsoleMethod(method) {
    return (...args) => {
      window._virtualConsole.emit(method, ...args);
    };
  }

  this.console = {
    assert: wrapConsoleMethod("assert"),
    clear: wrapConsoleMethod("clear"),
    count: wrapConsoleMethod("count"),
    countReset: wrapConsoleMethod("countReset"),
    debug: wrapConsoleMethod("debug"),
    dir: wrapConsoleMethod("dir"),
    dirxml: wrapConsoleMethod("dirxml"),
    error: wrapConsoleMethod("error"),
    group: wrapConsoleMethod("group"),
    groupCollapsed: wrapConsoleMethod("groupCollapsed"),
    groupEnd: wrapConsoleMethod("groupEnd"),
    info: wrapConsoleMethod("info"),
    log: wrapConsoleMethod("log"),
    table: wrapConsoleMethod("table"),
    time: wrapConsoleMethod("time"),
    timeLog: wrapConsoleMethod("timeLog"),
    timeEnd: wrapConsoleMethod("timeEnd"),
    trace: wrapConsoleMethod("trace"),
    warn: wrapConsoleMethod("warn"),
  };

  function notImplementedMethod(name) {
    return function () {
      notImplemented(name, window);
    };
  }

  define(this, {
    name: "",
    status: "",
    devicePixelRatio: 1,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 1024,
    outerHeight: 768,
    pageXOffset: 0,
    pageYOffset: 0,
    screenX: 0,
    screenLeft: 0,
    screenY: 0,
    screenTop: 0,
    scrollX: 0,
    scrollY: 0,
    TEMPORARY: 0,
    PERSISTENT: 1,

    alert: notImplementedMethod("window.alert"),
    blur: notImplementedMethod("window.blur"),
    confirm: notImplementedMethod("window.confirm"),
    focus: notImplementedMethod("window.focus"),
    moveBy: notImplementedMethod("window.moveBy"),
    moveTo: notImplementedMethod("window.moveTo"),
    open: notImplementedMethod("window.open"),
    print: notImplementedMethod("window.print"),
    prompt: notImplementedMethod("window.prompt"),
    resizeBy: notImplementedMethod("window.resizeBy"),
    resizeTo: notImplementedMethod("window.resizeTo"),
    scroll: notImplementedMethod("window.scroll"),
    scrollBy: notImplementedMethod("window.scrollBy"),
    scrollTo: notImplementedMethod("window.scrollTo"),
  });

  // ### INITIALIZATION

  process.nextTick(() => {
    if (!window.document) {
      return; // window might've been closed already
    }

    if (window.document.readyState === "complete") {
      fireAnEvent("load", window, undefined, {}, true);
    } else {
      window.document.addEventListener("load", () => {
        fireAnEvent("load", window, undefined, {}, true);
        if (!window._document) {
          return; // window might've been closed already
        }

        const documentImpl = idlUtils.implForWrapper(window._document);
        if (!documentImpl._pageShowingFlag) {
          documentImpl._pageShowingFlag = true;
          fireAPageTransitionEvent("pageshow", window, false);
        }
      });
    }
  });
}

function contextifyWindow(window) {
  if (vm.isContext(window)) {
    return;
  }

  vm.createContext(window);
}
