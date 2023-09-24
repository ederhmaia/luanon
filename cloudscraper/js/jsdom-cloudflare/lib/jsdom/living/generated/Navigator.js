"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "Navigator";

exports.is = (value) => {
  return (
    utils.isObject(value) &&
    utils.hasOwn(value, implSymbol) &&
    value[implSymbol] instanceof Impl.implementation
  );
};
exports.isImpl = (value) => {
  return utils.isObject(value) && value instanceof Impl.implementation;
};
exports.convert = (
  globalObject,
  value,
  { context = "The provided value" } = {}
) => {
  if (exports.is(value)) {
    return utils.implForWrapper(value);
  }
  throw new globalObject.TypeError(`${context} is not of type 'Navigator'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["Navigator"].prototype;
  }

  return Object.create(proto);
}

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = makeWrapper(globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

exports.setup = (
  wrapper,
  globalObject,
  constructorArgs = [],
  privateData = {}
) => {
  privateData.wrapper = wrapper;

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true,
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper;
};

exports.new = (globalObject, newTarget) => {
  const wrapper = makeWrapper(globalObject, newTarget);

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: Object.create(Impl.implementation.prototype),
    configurable: true,
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper[implSymbol];
};

const exposed = new Set(["Window"]);

exports.install = (globalObject, globalNames) => {
  if (!globalNames.some((globalName) => exposed.has(globalName))) {
    return;
  }

  const ctorRegistry = utils.initCtorRegistry(globalObject);
  class Navigator {
    constructor() {
      throw new globalObject.TypeError("Illegal constructor");
    }

    javaEnabled() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'javaEnabled' called on an object that is not a valid instance of Navigator."
        );
      }

      return esValue[implSymbol].javaEnabled();
    }

    get appCodeName() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get appCodeName' called on an object that is not a valid instance of Navigator."
        );
      }

      return esValue[implSymbol]["appCodeName"];
    }

    get appName() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get appName' called on an object that is not a valid instance of Navigator."
        );
      }

      return esValue[implSymbol]["appName"];
    }

    get appVersion() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get appVersion' called on an object that is not a valid instance of Navigator."
        );
      }

      return esValue[implSymbol]["appVersion"];
    }

    get platform() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get platform' called on an object that is not a valid instance of Navigator."
        );
      }

      return esValue[implSymbol]["platform"];
    }

    get product() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get product' called on an object that is not a valid instance of Navigator."
        );
      }

      return esValue[implSymbol]["product"];
    }

    get productSub() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get productSub' called on an object that is not a valid instance of Navigator."
        );
      }

      return esValue[implSymbol]["productSub"];
    }

    get userAgent() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get userAgent' called on an object that is not a valid instance of Navigator."
        );
      }

      return esValue[implSymbol]["userAgent"];
    }

    get vendor() {
      return "Google Inc.";
      // const esValue = this !== null && this !== undefined ? this : globalObject;

      // if (!exports.is(esValue)) {
      //   throw new globalObject.TypeError("'get vendor' called on an object that is not a valid instance of Navigator.");
      // }

      // return esValue[implSymbol]["vendor"];
    }

    get vendorSub() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get vendorSub' called on an object that is not a valid instance of Navigator."
        );
      }

      return esValue[implSymbol]["vendorSub"];
    }

    get language() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get language' called on an object that is not a valid instance of Navigator."
        );
      }

      return esValue[implSymbol]["language"];
    }

    get languages() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get languages' called on an object that is not a valid instance of Navigator."
        );
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]["languages"]);
    }

    get onLine() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get onLine' called on an object that is not a valid instance of Navigator."
        );
      }

      return esValue[implSymbol]["onLine"];
    }

    get cookieEnabled() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get cookieEnabled' called on an object that is not a valid instance of Navigator."
        );
      }

      return esValue[implSymbol]["cookieEnabled"];
    }

    get plugins() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get plugins' called on an object that is not a valid instance of Navigator."
        );
      }

      return utils.getSameObject(this, "plugins", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["plugins"]);
      });
    }

    get mimeTypes() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get mimeTypes' called on an object that is not a valid instance of Navigator."
        );
      }

      return utils.getSameObject(this, "mimeTypes", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["mimeTypes"]);
      });
    }

    get hardwareConcurrency() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get hardwareConcurrency' called on an object that is not a valid instance of Navigator."
        );
      }

      return esValue[implSymbol]["hardwareConcurrency"];
    }

    get appVersion() {
      return this.userAgent.replace("Mozilla/", "");
    }
    get bluetooth() {
      return new (class Bluetooth {
        getAvailability() {}
        requestDevice() {}
      })();
    }
    get clipboard() {
      return new (class Clipboard {
        read() {}
        readText() {}
        write() {}
        writeText() {}
      })();
    }
    get connection() {
      return new (class NetworkInformation {
        downlink = 1.45;
        effectiveType = "4g";
        onchange = null;
        rtt = 50;
        saveData = false;
      })();
    }
    get credentials() {
      return new (class CredentialsContainer {
        create() {}
        get() {}
        preventSilentAccess() {}
        store() {}
      })();
    }
    get deviceMemory() {
      return 8;
    }
    get doNotTrack() {
      return null;
    }
    get geolocation() {
      return new (class Geolocation {
        clearWatch() {}
        getCurrentPosition() {}
        watchPosition() {}
      })();
    }
    get hid() {
      return new (class HID {
        onconnect = null;
        ondisconnect = null;
      })();
    }
    get ink() {
      return new (class Ink {
        requestPresenter() {}
      })();
    }
    get keyboard() {
      return new (class Keyboard {
        getLayoutMap() {}
        lock() {}
        unlock() {}
      })();
    }

    get locks() {
      return new (class LockManager {
        query() {}
        request() {}
      })();
    }
    get managed() {
      return new (class NavigatorManagedData {
        onmanagedconfigurationchange = null;
        getManagedConfiguration() {}
        onmanagedconfigurationchange() {}
      })();
    }
    get maxTouchPoints() {
      return 0;
    }
    get mediaCapabilities() {
      return new (class MediaCapabilities {})();
    }
    get mediaDevices() {
      return new (class MediaDevices {})();
    }
    get mediaSession() {
      return new (class MediaSession {})();
    }
    get pdfViewerEnabled() {
      return true;
    }
    get permissions() {
      return new (class Permissions {
        query() {}
      })();
    }
    get platform() {
      return "Win32";
    }

    get presentation() {
      return new (class Presentation {
        defaultRequest = null;
        receiver = null;
      })();
    }
    get scheduling() {
      return new (class Scheduling {
        isInputPending() {}
      })();
    }
    get serial() {
      return new (class Serial {
        onconnect = null;
        ondisconnect = null;
        getPorts() {}
        onconnect() {}
        ondisconnect() {}
        requestPort() {}
      })();
    }
    get serviceWorker() {
      return new (class ServiceWorkerContainer {
        controller = null;
        oncontrollerchange = null;
        onmessage = null;
        onmessageerror = null;
        getRegistration() {}
        getRegistrations() {}
        oncontrollerchange() {}
        onmessage() {}
        onmessageerror() {}
        ready = new Promise((resolve) => {});
        register() {}
        startMessages() {}
      })();
    }
    get usb() {
      return new (class USB {
        onconnect = null;
        ondisconnect = null;
      })();
    }
    get webdriver() {
      return false;
    }
    get webkitPersistentStorage() {
      return new (class DeprecatedStorageQuota {})();
    }
    get webkitTemporaryStorage() {
      return new (class DeprecatedStorageQuota {})();
    }

    get storage() {
      return new (class StorageManager {
        estimate() {}
        getDirectory() {}
        persist() {}
        persisted() {}
      })();
    }
    get userActivation() {
      return new (class UserActivation {
        hasBeenActive = false;
        isActive = false;
      })();
    }
    get userAgentData() {
      return new (class NavigatorUAData {
        brands = [
          { brand: "Chromium", version: "104" },
          { brand: " Not A;Brand", version: "99" },
          { brand: "Google Chrome", version: "104" },
        ];
        mobile = false;
        platform = "Windows";
      })();
    }
    get virtualKeyboard() {
      return new (class VirtualKeyboard {
        boundingRect = class DOMReact {
          bottom = 0;
          height = 0;
          left = 0;
          right = 0;
          top = 0;
          width = 0;
          x = 0;
          y = 0;
        };
        overlaysContent = false;
        ongeometrychange = null;
      })();
    }
    get wakeLock() {
      return new (class WakeLock {
        request() {}
      })();
    }
    get xr() {
      return new (class XRSystem {
        ondevicechange = null;
        isSessionSupported() {}
        requestSession() {}
        supportsSession() {}
      })();
    }
  }
  Object.defineProperties(Navigator.prototype, {
    appVersion: { enumerable: true },
    bluetooth: { enumerable: true },
    clipboard: { enumerable: true },
    connection: { enumerable: true },
    credentials: { enumerable: true },
    deviceMemory: { enumerable: true },
    doNotTrack: { enumerable: true },
    geolocation: { enumerable: true },
    hid: { enumerable: true },
    ink: { enumerable: true },
    keyboard: { enumerable: true },
    languages: { enumerable: true },
    locks: { enumerable: true },
    managed: { enumerable: true },
    maxTouchPoints: { enumerable: true },
    mediaCapabilities: { enumerable: true },
    mediaDevices: { enumerable: true },
    mediaSession: { enumerable: true },
    pdfViewerEnabled: { enumerable: true },
    permissions: { enumerable: true },
    platform: { enumerable: true },
    presentation: { enumerable: true },
    scheduling: { enumerable: true },
    serial: { enumerable: true },
    serviceWorker: { enumerable: true },
    usb: { enumerable: true },
    webdriver: { enumerable: true },
    webkitPersistentStorage: { enumerable: true },
    webkitTemporaryStorage: { enumerable: true },
    storage: { enumerable: true },
    userActivation: { enumerable: true },
    userAgentData: { enumerable: true },
    virtualKeyboard: { enumerable: true },
    wakeLock: { enumerable: true },
    xr: { enumerable: true },
    javaEnabled: { enumerable: true },
    appCodeName: { enumerable: true },
    appName: { enumerable: true },
    appVersion: { enumerable: true },
    platform: { enumerable: true },
    product: { enumerable: true },
    productSub: { enumerable: true },
    userAgent: { enumerable: true },
    vendor: { enumerable: true },
    vendorSub: { enumerable: true },
    language: { enumerable: true },
    languages: { enumerable: true },
    onLine: { enumerable: true },
    cookieEnabled: { enumerable: true },
    plugins: { enumerable: true },
    mimeTypes: { enumerable: true },
    hardwareConcurrency: { enumerable: true },
    [Symbol.toStringTag]: { value: "Navigator", configurable: true },
  });
  ctorRegistry[interfaceName] = Navigator;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Navigator,
  });
};

const Impl = require("../navigator/Navigator-impl.js");
