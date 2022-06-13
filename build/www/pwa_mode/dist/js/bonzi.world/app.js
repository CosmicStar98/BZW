var _____WB$wombat$assign$function_____ = function(name) {
    return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name];
};
if (!self.__WB_pmw) {
    self.__WB_pmw = function(obj) {
        this.__WB_source = obj;
        return this;
    }
} {
    let window = _____WB$wombat$assign$function_____("window");
    let self = _____WB$wombat$assign$function_____("self");
    let document = _____WB$wombat$assign$function_____("document");
    let location = _____WB$wombat$assign$function_____("location");
    let top = _____WB$wombat$assign$function_____("top");
    let parent = _____WB$wombat$assign$function_____("parent");
    let frames = _____WB$wombat$assign$function_____("frames");
    let opener = _____WB$wombat$assign$function_____("opener");

    /*!
      * Application : bonziworld
      * Version     : 4.63.3896
      * Release     : 291bdf88738563ba142c0d34a57747ed932d6a6e
      * Website     : https://www.bonzi.world
      * Module      : Application
      * Built       : 2021-07-06T12:45:57-0400
      * Environment : development
    !*/

    ! function() {
        "use strict";
        var modules = window && window.appModules || ["ngSentry", "pascalprecht.translate", "ngResource", "ngSanitize", "ngAnimate", "ngRoute", "app.providers", "app.storage", "app.filters", "app.resources", "app.factories", "app.directives", "app.controllers"];
        angular.module("app", modules)
    }(),
    function() {
        "use strict";

        function ConfigApp($resourceProvider, $httpProvider, $logProvider, $locationProvider, $localStorageProvider, $sessionStorageProvider, $translateProvider, IdleProvider) {
            var srl = function(type, value) {
                    if (!value) return value;
                    try {
                        value._store = value._store || {}, value._store.type = type || "unknown", value._store.stored = moment().format(), value._store.storage = !0, value._inProgress && (value._inProgress = !1, delete value._inProgress), delete value._store.loaded
                    } catch (error) {
                        Sentry.captureException(error), console.error("Error serializing storage."), console.error(error)
                    }
                    return value && "object" == typeof value && (value = angular.toJson(value)), value
                },
                dsrl = function(type, value) {
                    if (!value) return value;
                    try {
                        "string" == typeof value && (value = angular.fromJson(value)), value._store = value._store || {}, value._store.type = type || "unknown", value._store.loaded = moment().format(), value._store.storage = !0
                    } catch (error) {
                        Sentry.captureException(error), console.error("Error deseralizing storage."), console.error(error)
                    }
                    return value
                };
            $httpProvider.defaults.withCredentials = !0, $resourceProvider.defaults.stripTrailingSlashes = !1, $translateProvider.useSanitizeValueStrategy("sceParameters"), $translateProvider.useUrlLoader("/i18n/locale.json");
            $translateProvider.preferredLanguage("en"), $translateProvider.fallbackLanguage("en"), $sessionStorageProvider.setKeyPrefix("bzi-"), $sessionStorageProvider.setSerializer(function(value) {
                return srl("session", value)
            }), $sessionStorageProvider.setDeserializer(function(value) {
                return dsrl("session", value)
            }), $localStorageProvider.setKeyPrefix("bzi-"), $localStorageProvider.setSerializer(function(value) {
                return srl("local", value)
            }), $localStorageProvider.setDeserializer(function(value) {
                return dsrl("local", value)
            }), $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest", $httpProvider.defaults.headers.common["BZW-Socket-Id"] = function() {
                return window.socket && window.socket.id || null
            }, $httpProvider.defaults.headers.common["BZW-Bonzi-GUID"] = function() {
                return window.guid || window.identity && window.identity.guid || null
            }, $httpProvider.defaults.headers.common["BZW-Bonzi-UUID"] = function() {
                return window.uuid || window.identity && window.identity.uuid || null
            }, $httpProvider.defaults.headers.common["BZW-Bonzi-Room"] = function() {
                return window.identity && window.identity.room || null
            }, $httpProvider.defaults.headers.common["BZW-Fingerprint"] = function() {
                return window.fingerprint
            }, $httpProvider.defaults.headers.common["BZW-Fingerprint"] = function() {
                return window.fingerprint
            }, window.bzw && (window.bzw.version && ($httpProvider.defaults.headers.common["BZW-Version"] = window.bzw.version), window.bzw.release && ($httpProvider.defaults.headers.common["BZW-Release"] = window.bzw.release));
            try {
                window.navigator && window.navigator.language && ($httpProvider.defaults.headers.common["BZW-Locale-Language"] = window.navigator.language.slice(0, 2), 2 === window.navigator.language.indexOf("-") && ($httpProvider.defaults.headers.common["BZW-Locale-Region"] = window.navigator.language.split("-").pop()))
            } catch (err) {}
            try {
                window.user && ("function" == typeof window.getAuthHeader && ($httpProvider.defaults.headers.common["BZW-USER-ID"] = window.getAuthHeader("id"), $httpProvider.defaults.headers.common["BZW-USER-UUID"] = window.getAuthHeader("uuid"), $httpProvider.defaults.headers.common.Authorization = window.getAuthHeader("jwt")), "function" == typeof window.getAPIHeader && ($httpProvider.defaults.headers.common["BZW-API-KEY"] = window.getAPIHeader()))
            } catch (err) {}
            IdleProvider.idle(30);
            var enableLogging = "development" === window.environment || !1;
            $logProvider.debugEnabled(enableLogging), enableLogging && console.info("Angular logging has been enabled.")
        }

        function RunApp(Idle) {
            Idle.watch()
        }
        angular.module("app").config(ConfigApp).run(RunApp), ConfigApp.$inject = ["$resourceProvider", "$httpProvider", "$logProvider", "$locationProvider", "$localStorageProvider", "$sessionStorageProvider", "$translateProvider", "IdleProvider"], RunApp.$inject = ["Idle"]
    }(),
    function() {
        "use strict";
        angular.module("app.storage", [])
    }(),
    function(angular) {
        "use strict";

        function isStorageSupported($window, storageType) {
            var supported;
            try {
                supported = $window[storageType]
            } catch (err) {
                supported = !1
            }
            if (supported) {
                var key = "__" + Math.round(1e7 * Math.random());
                try {
                    $window[storageType].setItem(key, key), $window[storageType].removeItem(key, key)
                } catch (err) {
                    supported = !1
                }
            }
            return supported
        }
        return (angular = angular && angular.module ? angular : window.angular).module("app.storage", []).provider("$localStorage", _storageProvider("localStorage")).provider("$sessionStorage", _storageProvider("sessionStorage"));

        function _storageProvider(storageType) {
            var providerWebStorage = isStorageSupported(window, storageType);
            return function() {
                var storageKeyPrefix = "ngStorage-";
                this.setKeyPrefix = function(prefix) {
                    if ("string" != typeof prefix) throw new TypeError("[ngStorage] - " + storageType + "Provider.setKeyPrefix() expects a String.");
                    storageKeyPrefix = prefix
                };
                var serializer = angular.toJson,
                    deserializer = angular.fromJson;
                this.setSerializer = function(s) {
                    if ("function" != typeof s) throw new TypeError("[ngStorage] - " + storageType + "Provider.setSerializer expects a function.");
                    serializer = s
                }, this.setDeserializer = function(d) {
                    if ("function" != typeof d) throw new TypeError("[ngStorage] - " + storageType + "Provider.setDeserializer expects a function.");
                    deserializer = d
                }, this.supported = function() {
                    return Boolean(providerWebStorage)
                }, this.get = function(key) {
                    return providerWebStorage && deserializer(providerWebStorage.getItem(storageKeyPrefix + key))
                }, this.set = function(key, value) {
                    return providerWebStorage && providerWebStorage.setItem(storageKeyPrefix + key, serializer(value))
                }, this.remove = function(key) {
                    providerWebStorage && providerWebStorage.removeItem(storageKeyPrefix + key)
                }, this.$get = ["$rootScope", "$window", "$log", "$timeout", "$document", function($rootScope, $window, $log, $timeout, $document) {
                    var _last$storage, _debounce, prefixLength = storageKeyPrefix.length,
                        isSupported = isStorageSupported($window, storageType),
                        webStorage = isSupported || ($log.warn("This browser does not support Web Storage!"), {
                            setItem: angular.noop,
                            getItem: angular.noop,
                            removeItem: angular.noop
                        }),
                        $storage = {
                            $default: function(items) {
                                for (var k in items) Object.prototype.hasOwnProperty.call(items, k) && !angular.isDefined($storage[k]) && ($storage[k] = angular.copy(items[k]));
                                return $storage.$sync(), $storage
                            },
                            $reset: function(items) {
                                for (var k in $storage) Object.prototype.hasOwnProperty.call($storage, k) && "$" !== k[0] && (delete $storage[k], webStorage.removeItem(storageKeyPrefix + k));
                                return $storage.$default(items)
                            },
                            $sync: function() {
                                for (var k, l = webStorage.length, i = 0; i < l; i++) k = webStorage.key(i), storageKeyPrefix === k.slice(0, prefixLength) && ($storage[k.slice(prefixLength)] = deserializer(webStorage.getItem(k)))
                            },
                            $apply: function() {
                                var temp$storage;
                                if (_debounce = null, !angular.equals($storage, _last$storage)) {
                                    for (var k in temp$storage = angular.copy(_last$storage), angular.forEach($storage, function(v, k) {
                                            angular.isDefined(v) && "$" !== k[0] && (webStorage.setItem(storageKeyPrefix + k, serializer(v)), delete temp$storage[k])
                                        }), temp$storage) Object.prototype.hasOwnProperty.call(temp$storage, k) && webStorage.removeItem(storageKeyPrefix + k);
                                    _last$storage = angular.copy($storage)
                                }
                            },
                            $supported: function() {
                                return Boolean(isSupported)
                            }
                        };
                    return $storage.$sync(), _last$storage = angular.copy($storage), $window.addEventListener && ($window.addEventListener("storage", function(event) {
                        if (!event.key) return;
                        var doc = $document[0];
                        doc.hasFocus && doc.hasFocus() || storageKeyPrefix !== event.key.slice(0, prefixLength) || (event.newValue ? $storage[event.key.slice(prefixLength)] = deserializer(event.newValue) : delete $storage[event.key.slice(prefixLength)], _last$storage = angular.copy($storage), $rootScope.$apply())
                    }), $window.addEventListener("beforeunload", function() {
                        $storage.$apply()
                    })), $rootScope.$watch(function() {
                        _debounce || (_debounce = $timeout($storage.$apply, 100, !1))
                    }), $storage
                }]
            }
        }
    }(angular),
    function() {
        "use strict";
        angular.module("app.filters", [])
    }(),
    function() {
        "use strict";

        function HTMLToPlainText() {
            return function(text, nf) {
                return nf ? text : text ? String(text).replace(/<[^>]+>/gm, "") : ""
            }
        }
        angular.module("app.filters").filter("htmlToPlaintext", HTMLToPlainText), HTMLToPlainText.$inject = []
    }(),
    function() {
        function UnmutedFilter($parse) {
            return function(items) {
                return _.filter(items, function(m) {
                    if (!m.type || "text" !== m.type) return m;
                    var bz = m._bonzi || window.bonzis[m.guid];
                    try {
                        return !bz || !bz.mute
                    } catch (err) {
                        return m
                    }
                })
            }
        }
        angular.module("app.filters").filter("unmuted", UnmutedFilter), UnmutedFilter.$inject = ["$parse"]
    }(),
    function() {
        "use strict";
        angular.module("app.filters").filter("pinUser", function() {
            return function(list, pinLabel) {
                for (var returnArray = [], everyoneElseArray = [], i = 0; i < list.length; i++) list[i].label === pinLabel ? returnArray.push(list[i]) : everyoneElseArray.push(list[i]);
                return returnArray.concat(everyoneElseArray)
            }
        })
    }(), angular.module("app.filters").filter("unique", ["$parse", function($parse) {
            return function(items, filterOn) {
                if (!1 === filterOn) return items;
                if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                    var newItems = [],
                        get = angular.isString(filterOn) ? $parse(filterOn) : function(item) {
                            return item
                        },
                        extractValueToCompare = function(item) {
                            return angular.isObject(item) ? get(item) : item
                        };
                    angular.forEach(items, function(item) {
                        for (var isDuplicate = !1, i = 0; i < newItems.length; i++)
                            if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                                isDuplicate = !0;
                                break
                            }
                        isDuplicate || newItems.push(item)
                    }), items = newItems
                }
                return items
            }
        }]),
        function() {
            "use strict";
            angular.module("app.providers", [])
        }(),
        function() {
            function SocketProvider() {
                "use strict";
                var defaultPrefix = "socket:";
                this.$get = ["$rootScope", "$timeout", function($rootScope, $timeout) {
                    var asyncAngularify = function(socket, callback) {
                        return callback ? function() {
                            var args = arguments;
                            $timeout(function() {
                                callback.apply(socket, args)
                            }, 0)
                        } : angular.noop
                    };
                    return function(options) {
                        var socket = (options = options || {}).ioSocket || io.connect(),
                            prefix = void 0 === options.prefix ? defaultPrefix : options.prefix,
                            defaultScope = options.scope || $rootScope,
                            addListener = function(eventName, callback) {
                                socket.on(eventName, callback.__ng = asyncAngularify(socket, callback))
                            };
                        return {
                            on: addListener,
                            addListener: addListener,
                            once: function(eventName, callback) {
                                socket.once(eventName, callback.__ng = asyncAngularify(socket, callback))
                            },
                            emit: function(eventName, data, callback) {
                                var lastIndex = arguments.length - 1;
                                return "function" == typeof(callback = arguments[lastIndex]) && (callback = asyncAngularify(socket, callback), arguments[lastIndex] = callback), socket.emit.apply(socket, arguments)
                            },
                            removeListener: function(ev, fn) {
                                return fn && fn.__ng && (arguments[1] = fn.__ng), socket.removeListener.apply(socket, arguments)
                            },
                            removeAllListeners: function() {
                                return socket.removeAllListeners.apply(socket, arguments)
                            },
                            disconnect: function(close) {
                                return socket.disconnect(close)
                            },
                            connect: function() {
                                return socket.connect()
                            },
                            forward: function(events, scope) {
                                "string" == typeof events && (events = [events]), scope || (scope = defaultScope), events.forEach(function(eventName) {
                                    var prefixedEvent = prefix + eventName,
                                        forwardBroadcast = asyncAngularify(socket, function() {
                                            Array.prototype.unshift.call(arguments, prefixedEvent), scope.$broadcast.apply(scope, arguments)
                                        });
                                    scope.$on("$destroy", function() {
                                        socket.removeListener(eventName, forwardBroadcast)
                                    }), socket.on(eventName, forwardBroadcast)
                                })
                            }
                        }
                    }
                }]
            }
            angular.module("app.providers").provider("socketFactory", SocketProvider), SocketProvider.$inject = []
        }(),
        function() {
            "use strict";
            angular.module("app.resources", [])
        }(),
        function() {
            function IdentityResource($rootScope, $http, $resource) {
                var Identity = $resource("/api/v1/identity/:type/", {
                    type: "user"
                }, {
                    get: {
                        method: "GET",
                        interceptor: {
                            response: getInterceptor
                        }
                    },
                    refresh: {
                        method: "GET",
                        interceptor: {
                            response: getInterceptor
                        }
                    }
                });

                function getInterceptor(response) {
                    var instance = response.resource;
                    return instance && instance.id, instance
                }
                return angular.extend(Identity.prototype, {
                    logout: function(callback) {
                        function done(err, result) {
                            return "function" == typeof callback && callback(err, result), result
                        }
                        console.log("Logging out."), $http.post("/api/v1/logout/").then(response => {
                            done(null, response.data)
                        }, err => {
                            done(err)
                        })
                    }
                }), Identity
            }
            angular.module("app.resources").factory("Identity", IdentityResource), IdentityResource.$inject = ["$rootScope", "$http", "$resource"]
        }(),
        function() {
            function RoomFactory($rootScope, $http, $resource) {
                function getInterceptor(response) {
                    var instance = response.resource;
                    return instance && instance.id, instance
                }
                return $resource("/api/v1/rooms/:id/", {
                    id: "@id"
                }, {
                    get: {
                        method: "GET",
                        interceptor: {
                            response: getInterceptor
                        }
                    },
                    refresh: {
                        method: "GET",
                        interceptor: {
                            response: getInterceptor
                        }
                    },
                    save: {
                        method: "POST"
                    },
                    reset: {
                        method: "GET"
                    },
                    update: {
                        method: "PATCH"
                    },
                    destroy: {
                        method: "DELETE"
                    }
                })
            }
            angular.module("app.resources").factory("Room", RoomFactory), RoomFactory.$inject = ["$rootScope", "$http", "$resource"]
        }(),
        function() {
            function SessionResource($rootScope, $http, $resource) {
                var Session = $resource("/api/v1/session/", {}, {
                    get: {
                        method: "GET",
                        interceptor: {
                            response: getInterceptor
                        }
                    },
                    refresh: {
                        method: "GET",
                        interceptor: {
                            response: getInterceptor
                        }
                    }
                });

                function getInterceptor(response) {
                    var instance = response.resource;
                    return instance && instance.id, instance
                }
                return angular.extend(Session.prototype, {
                    logout: function(callback) {
                        function done(err, result) {
                            return "function" == typeof callback && callback(err, result), result
                        }
                        console.log("Logging out."), $http.post("/api/v1/logout/").then(response => {
                            done(null, response.data)
                        }, err => {
                            done(err)
                        })
                    }
                }), Session
            }
            angular.module("app.resources").factory("Session", SessionResource), SessionResource.$inject = ["$rootScope", "$http", "$resource"]
        }(),
        function() {
            function UserFactory($rootScope, $http, $resource) {
                function getInterceptor(response) {
                    var instance = response.resource;
                    return instance && instance.id, instance
                }
                return $resource("/api/v1/users/:id/", {
                    id: "@id"
                }, {
                    get: {
                        method: "GET",
                        interceptor: {
                            response: getInterceptor
                        }
                    },
                    refresh: {
                        method: "GET",
                        interceptor: {
                            response: getInterceptor
                        }
                    },
                    save: {
                        method: "POST"
                    },
                    reset: {
                        method: "GET"
                    },
                    update: {
                        method: "PATCH"
                    },
                    destroy: {
                        method: "DELETE"
                    }
                })
            }
            angular.module("app.resources").factory("User", UserFactory), UserFactory.$inject = ["$rootScope", "$http", "$resource"]
        }(),
        function() {
            "use strict";
            angular.module("app.factories", [])
        }(),
        function() {
            function DataFactory($rootScope, $window, Idle, $timeout, $interval, $localStorage, session, identity) {
                var data = new DataConstructor;
                $rootScope.states = data.states;
                var workerInterval = 15e3,
                    workerIntervalMin = .55;

                function DataConstructor() {
                    this.initialized = !1, this.authenticated = identity && identity.authenticated || !1, this.local = $localStorage.$default({
                        settings: {}
                    }), this.timestamp = moment().subtract(15, "seconds"), this.session = session
                }
                return DataConstructor.prototype.updateIdentity = function() {
                    this.authenticated = identity.authenticated || !1
                }, DataConstructor.prototype.updateStates = function() {}, DataConstructor.prototype.processStates = function() {}, DataConstructor.prototype.updateAll = function() {
                    var diff = moment().diff(this.timestamp),
                        wid = diff / workerInterval;
                    if (this.initialized && wid < workerIntervalMin) return void console.info(`Skipping update - data was updated ${diff/1e3} seconds ago.`);
                    this.initialized = !0, this.updateIdentity(), this.updateStates(), this.timestamp = moment(), $rootScope.$broadcast("data:updated", this.timestamp), this.processStates()
                }, $rootScope.$on("identity:update", function() {
                    data.updateAll()
                }), data._worker = $interval(function() {
                    data.updateAll()
                }, workerInterval), data
            }
            angular.module("app.factories").factory("data", DataFactory), DataFactory.$inject = ["$rootScope", "$window", "Idle", "$timeout", "$interval", "$localStorage", "session", "identity"]
        }(),
        function() {
            function IdentityFactory($rootScope, $log, $http, $window, $timeout, $interval, User, Identity, socket) {
                var identity = new IdentityConstructor;

                function IdentityConstructor() {
                    var self = this;
                    self.authenticated = !1, self.user = null, self.bonzi = null, Identity.get({
                        type: "user"
                    }).$promise.then(function(user) {
                        user && user._id && user.authenticated ? self.authenticated = !0 : self.authenticated = !1
                    }).catch(function(error) {
                        $log.warn("Error getting user: " + (error && error.message || "Unknown error") + ".")
                    })
                }
                return IdentityConstructor.prototype.updateBonzi = function(bonzi) {
                    if (!bonzi) return;
                    this.bonzi = bonzi
                }, IdentityConstructor.prototype._ayncReload = function() {
                    var self = this;
                    async.parallel({
                        user: self.reloadUser.bind(self)
                    }, function(err, result) {
                        if (err) return console.error("Error async identity reload: " + (err.message || err) + "."), void console.error(err);
                        result && (result.user && (self.user = result.user, self.user && self.user._id ? self.authenticated = !0 : self.authenticated = !1), self.announce())
                    })
                }, IdentityConstructor.prototype.reloadUser = function(callback) {
                    var self = this;

                    function done(err, user) {
                        return "function" == typeof callback && callback(err, user), user
                    }
                    Identity.get({
                        type: "user"
                    }, function(u) {
                        u && u._id ? self.authenticated = !0 : self.authenticated = !1, done(null, u)
                    }, function(err) {
                        done(err, null)
                    })
                }, IdentityConstructor.prototype.getUser = function() {
                    return this.user
                }, IdentityConstructor.prototype.announce = function() {
                    $rootScope.$broadcast("identity:update", this)
                }, IdentityConstructor.prototype.reload = function() {
                    this._ayncReload()
                }, IdentityConstructor.prototype.doLogout = function() {
                    var self = this;
                    self.user.logout(function(err) {
                        if (err) return console.error("Error logging out: " + err), console.error(err), !1;
                        self.user = null, $rootScope.$broadcast("identity:logout"), $rootScope.$broadcast("identity:update", self), $window.location.href = "/"
                    })
                }, IdentityConstructor.prototype.sendFingerprint = function(data) {
                    return new Promise(function(resolve, reject) {
                        if (data) {
                            var payload = data;
                            "string" == typeof data && (payload = {
                                fingerprint: data
                            }), payload.socket = payload.socket || window.socket && window.socket.id || null, payload.socket || delete payload.socket, $http.post("/api/v1/identity/fingerprint/", payload).then(response => {
                                resolve(response.data)
                            }, err => {
                                reject(err)
                            })
                        }
                    })
                }, $rootScope.$on("login:success", function() {
                    $timeout(function() {
                        identity._ayncReload()
                    })
                }), socket.on("identity:updated", function() {
                    $timeout(function() {
                        identity._ayncReload()
                    })
                }), socket.on("identity", function(data) {
                    $timeout(function() {
                        identity.updateBonzi(data), localStorage && (localStorage.setItem("last-identity", JSON.stringify(data)), localStorage.setItem("last-used-username", data.name), localStorage.setItem("last-used-color", data.color || "purple"))
                    })
                }), $rootScope.setPasscode = function(passcode) {
                    socket.query = socket.query || {}, passcode ? (socket.query.passcode = passcode, window.roomPasscode = passcode) : (socket.query.passcode = null, delete socket.query.passcode, window.roomPasscode = null, delete window.roomPasscode)
                }, window.addEventListener("fingerprint", function(e) {
                    identity.sendFingerprint(e.detail).then(function(res) {}).catch(function(err) {
                        $log.warn("Error sending fingerprint.")
                    })
                }, !0), $timeout(function() {
                    identity._ayncReload()
                }, 2500), identity
            }
            angular.module("app.factories").factory("identity", IdentityFactory), IdentityFactory.$inject = ["$rootScope", "$log", "$http", "$window", "$timeout", "$interval", "User", "Identity", "socket"]
        }(),
        function() {
            function MetadataFactory($rootScope, Idle, $log, $window, $timeout, $interval, socket) {
                function Metadata() {
                    this.latency = 0, this.telemCounter = 99, this.idle = !1, this.idleStart = null
                }
                Metadata.prototype.emit = function() {
                    if (this.telemCounter++, this.telemCounter > 2 && window.socket.connected) {
                        this.telemCounter = 0;
                        var t = this.getTelemetry();
                        t.z = window.generateTSString(), socket.emit("telemetry", t)
                    }
                    if (!this.latency) return;
                    socket.emit("metadata", this)
                }, Metadata.prototype.setIdle = function() {
                    if (this.idle && this.idleStart) return void socket.emit("user:idle", this.idleStart);
                    $log.debug("User is idle."), this.idle = !0, this.idleStart = Date.now(), socket.emit("user:idle", Date.now())
                }, Metadata.prototype.setActive = function() {
                    $log.debug("User is active."), this.idle = !1, this.idleStart = null, socket.emit("user:active", Date.now())
                }, Metadata.prototype.getTelemetry = function() {
                    try {
                        var telemetry = angular.copy(window.bzw || {});
                        return telemetry.uuid = window.uuid, telemetry.guid = window.guid, telemetry.modules = window._jsModules, telemetry.fingerprint = window.fingerprint, telemetry.idle = this.idle || !1, this.idle && this.idleStart && (telemetry.idleStart = this.idleStart), telemetry
                    } catch (err) {
                        Sentry.captureException(err), $log.error("Error getting telemetry."), $log.error(err)
                    }
                    return null
                }, Metadata.prototype.updateLatency = function(latency) {
                    this.latency = latency || 0
                };
                const metadata = new Metadata;
                return $interval(function() {
                    metadata.emit()
                }, 1e4), $timeout(function() {
                    metadata.emit()
                }, 5e3), $rootScope.$on("IdleStart", function() {
                    metadata.setIdle()
                }), $rootScope.$on("IdleEnd", function() {
                    metadata.setActive()
                }), $rootScope.$on("IdleTimeout", function() {
                    metadata.setIdle()
                }), socket.on("pong", function(lat) {
                    metadata.updateLatency(lat)
                }), metadata
            }
            angular.module("app.factories").factory("metadata", MetadataFactory), MetadataFactory.$inject = ["$rootScope", "Idle", "$log", "$window", "$timeout", "$interval", "socket"]
        }(),
        function() {
            function SessionFactory($rootScope, $log, $window, $timeout, $interval, User, Session, socket) {
                return Session.get({})
            }
            angular.module("app.factories").factory("session", SessionFactory), SessionFactory.$inject = ["$rootScope", "$log", "$window", "$timeout", "$interval", "User", "Session", "socket"]
        }(),
        function() {
            function SettingsFactory($rootScope, $window, $timeout, $interval, User, Identity, data) {
                return data.local.settings
            }
            angular.module("app.factories").factory("settings", SettingsFactory), SettingsFactory.$inject = ["$rootScope", "$window", "$timeout", "$interval", "User", "Identity", "data"]
        }(),
        function() {
            function SocketFactory(socketFactory) {
                var socket = socketFactory({
                    ioSocket: window.socket
                });
                return socket.forward("error"), socket
            }
            angular.module("app.factories").factory("socket", SocketFactory), SocketFactory.$inject = ["socketFactory"]
        }(),
        function() {
            "use strict";
            angular.module("app.directives", [])
        }(),
        function() {
            "use strict";
            angular.module("app.directives").directive("backgroundVideo", function() {
                return {
                    link: function(scope, element) {
                        var videoElem = document.createElement("video");
                        if (!videoElem.canPlayType) return !1;

                        function addSource(src, type) {
                            var source = document.createElement("source");
                            source.src = src, source.type = type, videoElem.appendChild(source)
                        }
                        videoElem.muted = !0, videoElem.loop = !0, videoElem.preload = !0, videoElem.playsinline = !0, videoElem.autoplay = !0, videoElem.poster = "/dist/img/background/background-video-1.webp", videoElem.addEventListener("canplay", function() {
                            element.addClass("playing")
                        }), addSource("/media/video/background-video-1.mp4", "video/mp4"), addSource("/media/video/background-video-1.webm", "video/webm"), element.append(videoElem)
                    }
                }
            })
        }(),
        function() {
            "use strict";

            function BonziTextNameDirective($log, $timeout) {
                return {
                    scope: {
                        message: "=bonziTextName"
                    },
                    link: function(scope, element) {
                        function hookupContextMenu() {
                            var build = scope.bonzi.getContextMenu();
                            $.contextMenu({
                                selector: scope.selector,
                                build: build,
                                trigger: "right"
                            })
                        }
                        scope.message.type && "text" !== scope.message.type || (scope.bonzi = scope.message._bonzi || _.get(window.bonzis, scope.message.bonzi.guid), scope.selector = `#cl-msg-${scope.message.id} > .bonzi-name`, scope.bonzi && $timeout(hookupContextMenu, 100)), scope.$on("$destroy", function() {
                            scope.selector && $.contextMenu("destroy", scope.selector)
                        })
                    }
                }
            }
            angular.module("app.directives").directive("bonziTextName", BonziTextNameDirective), BonziTextNameDirective.$inject = ["$log", "$timeout"]
        }(),
        function(angular, undefined) {
            "use strict";

            function createDirective(attrName, direction) {
                angular.module("app.directives").directive(attrName, ["$parse", "$window", "$timeout", function($parse, $window, $timeout) {
                    return {
                        priority: 1,
                        restrict: "A",
                        link: function(scope, $el, attrs) {
                            var el = $el[0],
                                activationState = function($parse, attr, scope) {
                                    if ("" !== attr) {
                                        var getter = $parse(attr);
                                        return getter.assign !== undefined ? function(getter, setter, scope) {
                                            return {
                                                getValue: function() {
                                                    return getter(scope)
                                                },
                                                setValue: function(value) {
                                                    value !== getter(scope) && scope.$apply(function() {
                                                        setter(scope, value)
                                                    })
                                                }
                                            }
                                        }(getter, getter.assign, scope) : function(getter, scope) {
                                            return {
                                                getValue: function() {
                                                    return getter(scope)
                                                },
                                                setValue: function() {}
                                            }
                                        }(getter, scope)
                                    }
                                    return activated = !0, {
                                        getValue: function() {
                                            return activated
                                        },
                                        setValue: function(value) {
                                            activated = value
                                        }
                                    };
                                    var activated
                                }($parse, attrs[attrName], scope);

                            function scrollIfGlued() {
                                activationState.getValue() && !direction.isAttached(el) && $timeout(function() {
                                    direction.scroll(el)
                                })
                            }

                            function onScroll() {
                                activationState.setValue(direction.isAttached(el))
                            }
                            $timeout(scrollIfGlued, 0, !1), $el[0].hasAttribute("force-glue") || $el.on("scroll", onScroll);
                            var hasAnchor = !1;
                            angular.forEach($el.children(), function(child) {
                                child.hasAttribute("scroll-glue-anchor") && (hasAnchor = !0, scope.$watch(function() {
                                    return child.offsetHeight
                                }, function() {
                                    scrollIfGlued()
                                }))
                            }), hasAnchor || (scope.$watch(scrollIfGlued), $window.addEventListener("resize", scrollIfGlued, !1)), $el.on("$destroy", function() {
                                $el.unbind("scroll", onScroll)
                            }), scope.$on("$destroy", function() {
                                $window.removeEventListener("resize", scrollIfGlued, !1)
                            })
                        }
                    }
                }])
            }
            var bottom = {
                isAttached: function(el) {
                    return el.scrollTop + el.clientHeight + 1 >= el.scrollHeight
                },
                scroll: function(el) {
                    el.scrollTop = el.scrollHeight
                }
            };
            createDirective("scrollGlue", bottom), createDirective("scrollGlueTop", {
                isAttached: function(el) {
                    return el.scrollTop <= 1
                },
                scroll: function(el) {
                    el.scrollTop = 0
                }
            }), createDirective("scrollGlueBottom", bottom), createDirective("scrollGlueLeft", {
                isAttached: function(el) {
                    return el.scrollLeft <= 1
                },
                scroll: function(el) {
                    el.scrollLeft = 0
                }
            }), createDirective("scrollGlueRight", {
                isAttached: function(el) {
                    return el.scrollLeft + el.clientWidth + 1 >= el.scrollWidth
                },
                scroll: function(el) {
                    el.scrollLeft = el.scrollWidth
                }
            })
        }(angular),
        function() {
            "use strict";

            function SubmenuDirective($rootScope, $route, $timeout) {
                return {
                    scope: {
                        submenu: "=pageSubmenu"
                    },
                    link: function(scope, element) {
                        scope.enableScroll = function() {
                            scope.ps || (scope.ps = new PerfectScrollbar(element.parent()[0], scope.scrollOptions || {}));
                            return scope.updateScroll()
                        }, scope.disableScroll = function() {
                            if (!scope.ps) return !1;
                            scope.ps.destroy(), scope.ps = null
                        }, scope.updateScroll = function() {
                            if (!scope.ps) return;
                            scope.ps.update();
                            var activeItem = $(element).children(".active");
                            activeItem && (element.parent()[0].scrollLeft = activeItem[0].offsetLeft)
                        }, scope.update = function() {
                            var smFullWidth = element.width(),
                                smViewWidth = element.parent().width();
                            if (smFullWidth > smViewWidth) return void scope.enableScroll();
                            scope.disableScroll()
                        }, scope.slowUpdate = function() {
                            $timeout(scope.update, 500)
                        }, scope.scrollOptions = {
                            handlers: ["drag-thumb", "keyboard", "wheel", "touch"],
                            suppressScrollY: !0
                        }, scope.slowUpdate(), $rootScope.$on("submenu:updated", scope.slowUpdate)
                    }
                }
            }
            angular.module("app.directives").directive("pageSubmenu", SubmenuDirective), SubmenuDirective.$inject = ["$rootScope", "$route", "$timeout"]
        }(),
        function() {
            "use strict";

            function PageTitleDirective($rootScope, $route) {
                return {
                    link: function(scope, element) {
                        function getCurrent() {
                            return element.text().split("-")[0].trim()
                        }

                        function setTitle(title) {
                            title = title || scope.default || getCurrent(), element.text(title + " - BonziWORLD")
                        }

                        function updateTitle() {
                            return $route && $route.current ? $route.current.$$route && $route.current.$$route.meta && $route.current.$$route.meta.title ? setTitle($route.current.$$route.meta.title) : "/fragment/http/404/" === $route.current.loadedTemplateUrl ? setTitle("Page not found") : "/fragment/http/500/" === $route.current.loadedTemplateUrl ? setTitle("Error") : setTitle("Unknown page") : setTitle()
                        }
                        scope.original = getCurrent(), scope.default = getCurrent(), $rootScope.$on("$routeChangeSuccess", updateTitle), $rootScope.$on("$viewContentLoaded", updateTitle), updateTitle()
                    }
                }
            }

            function trackDigests($rootScope) {
                return {
                    restrict: "EA",
                    link: function($scope, $element) {
                        var count = 0;
                        $rootScope.$watch(function() {
                            count++, $element[0].innerHTML = "$digests: " + count
                        })
                    }
                }
            }
            angular.module("app.directives").directive("pageTitle", PageTitleDirective).directive("trackDigests", trackDigests), PageTitleDirective.$inject = ["$rootScope", "$route"], trackDigests.$inject = ["$rootScope"]
        }(),
        function() {
            "use strict";
            angular.module("app.controllers", [])
        }(),
        function() {
            "use strict";

            function DebugWindowController($rootScope, $scope, $log, $http, $timeout, $interval, $window, socket) {
                var vm = this;
                vm.animation = {
                    play: !1,
                    frameCurrent: 0,
                    frameStart: 0,
                    frameEnd: 902,
                    interval: 750,
                    reverse: !1,
                    loop: !0,
                    _fwd: !0
                }, vm.updateMe = function() {
                    try {
                        if (!(bonzis && window.guid && bonzis[window.guid] && bonzis[window.guid].sprite)) return;
                        bonzis[window.guid].sprite.gotoAndStop(vm.animation.frameCurrent)
                    } catch (err) {}
                }, $scope.doAnim = function() {
                    vm.animation.play && (vm.animation._fwd && vm.animation.frameCurrent++, vm.animation.frameCurrent < vm.animation.frameStart && (vm.animation.frameCurrent = vm.animation.frameStart), vm.animation.frameCurrent > vm.animation.frameEnd && (vm.animation.frameCurrent = vm.animation.frameStart), vm.updateMe()), $timeout($scope.doAnim, vm.animation.interval)
                }, vm.animCtrl = {
                    play: function() {
                        vm.animation.play = !0
                    },
                    stop: function() {
                        vm.animation.play = !1
                    },
                    restart: function() {
                        vm.animation.frameCurrent = vm.animation.frameStart
                    }
                }, $scope.initialized = !1, $scope.initialize = function(force) {
                    $scope.initialized && !force || $scope.doAnim()
                }, $scope.initialize()
            }
            angular.module("app.controllers").controller("debugWindowCtrl", DebugWindowController), DebugWindowController.$inject = ["$rootScope", "$scope", "$log", "$http", "$timeout", "$interval", "$window", "socket"]
        }(),
        function() {
            "use strict";

            function SidebarDirectoryController($rootScope, $scope, $log, $http, $timeout, $interval, $window, socket, Room) {
                var vm = this;
                vm.editRoom = null, $scope.initialized = !1, $scope.enteredPasscode = "", vm.getRoomClass = function(rm) {
                    var c = ["fas"];
                    return rm ? rm && rm.icon && (c = rm.icon.split(" "), rm.flags && rm.flags.static) ? c : (0 === rm.users && c.push("fa-thermometer-empty"), rm.full ? (c.push("fa-thermometer-full"), c) : (rm.locked ? c.push("fa-lock") : c.push("fa-door-open"), c)) : (c.push("fa-bug"), c)
                }, vm.rooms = Room.query({}, function() {
                    $scope.initialized = !0
                }, function(err) {
                    $scope.initialized = !0, console.error(err)
                }), vm.clearBonzis = function() {
                    _.forIn(window.bonzis, function(b) {
                        (function() {
                            this.id !== window.guid && (this.deconstruct(), delete bonzis[this.id], delete usersPublic[this.id], BonziHandler.clearBonzi(this.id), usersUpdate())
                        }).apply(b)
                    }), usersUpdate()
                }, $scope.askForPasscode = function(rm, pc) {
                    rm && Swal.fire({
                        title: "Room passcode required",
                        text: "The owner of the room requires a passcode to enter the room.",
                        icon: "warning",
                        input: "text",
                        inputValue: pc || "",
                        showCancelButton: !0,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Join",
                        inputValidator: function(value) {
                            if (!value) return "Room passcode required!"
                        }
                    }).then(result => {
                        result.value ? ($rootScope.setPasscode(result.value), $scope.doJoinRoom(rm, result.value)) : socket.emit("room:join", {
                            room: "default"
                        })
                    })
                }, $scope.doJoinRoom = function(rm, passcode) {
                    if (rm) {
                        var currentRoom = String(window.roomCode || "default");
                        $rootScope.setPasscode(passcode);
                        var me = window.bonzis[window.guid || window.identity.guid];
                        me.exit(function() {
                            var self = this;
                            const pl = {
                                room: rm
                            };
                            passcode && (pl.passcode = passcode), vm.clearBonzis(), socket.emit("room:join", pl, function(data) {
                                if (!(data = data || {}).success) return data.extras ? data.extras.passcode ? void $scope.askForPasscode(rm, passcode || "") : (Swal.fire("Room Join Error", String(data && data.message || "Unknown error occured - please try again") + ".", "error"), void socket.emit("room:join", {
                                    room: currentRoom || "default"
                                })) : (Swal.fire("Room Join Error", "Unknown error occured - please try again.", "error"), void socket.emit("room:join", {
                                    room: currentRoom || "default"
                                }));
                                $scope.enteredPasscode = "", window.showToast("success", "Joining room."), $scope.$emit("sidebar:close"), $timeout(function() {
                                    self.updateSprite(!0), self.enter()
                                }, 1e3)
                            })
                        }.bind(me))
                    }
                }, vm.joinRoom = function(room, passcode) {
                    room && (passcode = passcode || $scope.enteredPasscode || null, room.locked && (!passcode || passcode.length <= 0) ? $scope.askForPasscode(room) : $scope.doJoinRoom(room, passcode))
                }, $scope.updateRooms = function() {
                    $scope.initialized && !$rootScope.sidebarCollapsed && Room.query({}, function(rooms) {
                        vm.rooms = rooms || []
                    }, function(err) {
                        $log.error("Error updating rooms."), Sentry.captureException(err)
                    })
                }, socket.on("rooms:update", function(data) {
                    var found = !1;
                    if (vm.rooms && vm.rooms.length >= 0)
                        for (var l = 0; l < vm.rooms.length; l++) vm.rooms[l]._id === (data._id || data.id || data.rid) && (found = !0, vm.rooms[l].$refresh());
                    found || $scope.updateRooms()
                }), $scope.interval = $interval($scope.updateRooms, 3e4)
            }
            angular.module("app.controllers").controller("sidebarDirectoryCtrl", SidebarDirectoryController), SidebarDirectoryController.$inject = ["$rootScope", "$scope", "$log", "$http", "$timeout", "$interval", "$window", "socket", "Room"]
        }(),
        function() {
            "use strict";

            function GlobalController($rootScope, $translate, $interval, $timeout, $scope, $log, $window, $location, socket, identity, metadata, settings, session) {
                var vm = this;

                function getPlayerStatus() {
                    if (!$scope.player) return vm.playerStatus = {
                        exists: !1,
                        active: !1,
                        updated: Date.now()
                    }, vm.playerStatus;
                    var shouldBeMuted = $rootScope.backgroundMuted || window.backgroundMuted;
                    shouldBeMuted && !$scope.player.isMuted() ? ($log.info("Player status does not match: muting player."), $scope.player.mute()) : !shouldBeMuted && $scope.player.isMuted() && ($log.info("Player status does not match: unmuting player."), $scope.player.setVolume(100), $scope.player.unMute());
                    try {
                        vm.playerStatus = {
                            active: !0,
                            exists: !1,
                            loaded: $scope.player.getVideoLoadedFraction(),
                            rate: $scope.player.getPlaybackRate(),
                            muted: $scope.player.isMuted(),
                            volume: $scope.player.getVolume(),
                            state: $scope.player.getPlayerState(),
                            time: $scope.player.getCurrentTime(),
                            duration: $scope.player.getDuration(),
                            url: $scope.player.getVideoUrl(),
                            updated: Date.now()
                        }, vm.playerStatus.active = vm.playerStatus > 0
                    } catch (err) {
                        console.error(err), vm.playerStatus = {
                            exists: !1,
                            active: !1,
                            updated: Date.now()
                        }
                    }
                    return vm.playerStatus
                }
                $rootScope.socketConnected = !1, $scope.player = null, soundManager.setup({
                    url: "/lib/soundmanager2/swf/",
                    flashVersion: 9,
                    onready: function() {
                        $rootScope.soundManagerReady = !0
                    }
                }), vm.discordLinkClick = function() {
                    socket.emit("discord:invite:clicked", {
                        timestamp: new Date
                    })
                }, $("body").on("click", "a.log-discord-link", function() {
                    vm.discordLinkClick()
                }), vm.closeAllModals = function() {
                    vm.modals.close("all")
                }, vm.dropdowns = {
                    known: ["user"],
                    user: !0,
                    open: function(dd) {
                        dd ? vm.dropdowns[dd] = !0 : $log.warn("Unable to open dropdown: no dropdown name provided.")
                    },
                    close: function(dd) {
                        dd ? "all" !== dd ? vm.dropdowns[dd] = !1 : vm.dropdowns.known.forEach(function(m) {
                            vm.dropdowns[m] = !1
                        }) : $log.warn("Unable to close dropdown: no dropdown name provided.")
                    },
                    toggle: function(dd) {
                        dd ? vm.dropdowns[dd] = !vm.dropdowns[dd] || !1 : $log.warn("Unable to toggle dropdown: no dropdown name provided.")
                    }
                }, vm.modals = {
                    known: ["login", "discord"],
                    login: !1,
                    discord: !1,
                    open: function(modal) {
                        modal ? vm.modals[modal] = !0 : $log.warn("Unable to open modal: no modal name provided.")
                    },
                    close: function(modal) {
                        modal ? "all" !== modal ? vm.modals[modal] = !1 : vm.modals.known.forEach(function(m) {
                            vm.modals[m] = !1
                        }) : $log.warn("Unable to close modal: no modal name provided.")
                    },
                    toggle: function(modal) {
                        modal ? vm.modals[modal] = !vm.modals[modal] || !1 : $log.warn("Unable to toggle modal: no modal name provided.")
                    }
                }, vm.bg = {
                    visible: !1,
                    maximized: !1
                }, vm.session = session, vm.settings = settings, vm.initialized = !1, vm.initalize = function() {
                    if (vm.initialized) return;
                    vm.authenticated = identity.authenticated || !1, vm.user = identity.user, vm.identity = identity, vm.initialized = !0, window.utmRemover()
                }, vm.pageLoading = !0, vm.authenticated = !1, vm.states = $rootScope.states, vm.seizing = !1, vm.showSeizing = !1, vm.room = null, $scope.autoreloadCSSClass = "live-css", $scope.autoreloadCSSClasses = [$scope.autoreloadCSSClass], $scope.reloadSpecificStylesheet = function(stylesheet) {
                    $log.info("Reloading single stylesheet.");
                    var ss = $('link[href^="' + stylesheet.src + '"]');
                    if (!ss || ss.length <= 0) return $log.info('Unable to find stylesheet "' + stylesheet.src + '" - Refreshing all stylesheets.'), void $scope.reloadCSS();
                    const dataset = [{
                        key: "data-hash",
                        value: stylesheet.hash
                    }, {
                        key: "data-timestamp",
                        value: stylesheet.timestamp
                    }, {
                        key: "integrity",
                        value: stylesheet.sri.join(" ")
                    }];
                    $scope._reloadCSSLink(stylesheet.src, ss, dataset, stylesheet)
                }, $scope._reloadCSSLink = function(src, element, dataset) {
                    if (!src || !element) return !1;
                    var classes = element.attr("class").split(" ");
                    const found = classes.some(r => $scope.autoreloadCSSClasses.includes(r));
                    if (1 === classes.length || !found) return !1;

                    function CSSDone() {
                        element.remove()
                    }
                    var queryString = "?reload=" + (new Date).getTime(),
                        newSrc = src.replace(/\?.*|$/, queryString),
                        link = document.createElement("link");
                    link.type = "text/css", link.rel = "stylesheet", angular.forEach(classes, function(c) {
                        link.classList.add(c)
                    }), link.addEventListener("load", function() {
                        setTimeout(CSSDone, 250)
                    }), dataset && dataset.length >= 0 && angular.forEach(dataset, function(c) {
                        if (c) {
                            var key = c.key || c.name;
                            key && (link.setAttribute(key, c.value), $(link).data(key, c.value))
                        }
                    }), link.href = newSrc, element.after(link)
                }, $scope.reloadCSS = function() {
                    $("link.live-css").each(function() {
                        $scope._reloadCSSLink(this.href, $(this))
                    })
                }, $scope.reloadCSS = function() {
                    $("link." + $scope.autoreloadCSSClass).each(function() {
                        $scope._reloadCSSLink(this.href, $(this))
                    })
                }, vm.authenticated = !1, vm.reloadIdentity = function() {
                    identity.reload()
                }, vm.updateIdentity = function() {
                    vm.identity = identity, vm.authenticated = identity.authenticated || !1, vm.user = identity.user, vm.updateStates()
                }, vm.logoutIdentity = function() {
                    identity.doLogout()
                }, vm.updateStates = function() {
                    if (vm.authenticated = identity.authenticated || !1, !vm.authenticated) return;
                    vm.states = $rootScope.states || {}
                }, vm.getDisplayName = function() {
                    if (!vm.authenticated) return "Login";
                    if (!vm.user || !vm.user.name) return "";
                    return vm.user.name
                }, vm.showDiscordPopup = function() {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: "<a href>Why do I have this issue?</a>"
                    })
                }, vm.sidebar = {
                    previous: null,
                    forward: null,
                    collapsed: !0,
                    current: "default:default",
                    view: "default",
                    subview: "default"
                }, $rootScope.sidebarCollapsed = !0, vm.sbCtrl = {
                    show: function() {
                        $log.debug("Showing sidebar.."), $rootScope.sidebarCollapsed = !1, vm.sidebar.collapsed = !1, vm.sbCtrl.update()
                    },
                    back: function() {
                        vm.sidebar.forward = angular.copy(vm.sidebar.current), vm.sidebar.previous ? vm.sbCtrl.changeView(vm.sidebar.previous) : vm.sbCtrl.hide()
                    },
                    hide: function() {
                        $rootScope.sidebarCollapsed = !0, vm.sidebar.collapsed = !0, vm.sbCtrl.update()
                    },
                    toggle: function() {
                        vm.sidebar.collapsed = !vm.sidebar.collapsed, $rootScope.sidebarCollapsed = vm.sidebar.collapsed, vm.sbCtrl.update()
                    },
                    changeView: function(nv, hide) {
                        if (hide = hide || !1, !nv) return $log.warn("Unable to change sidebar view: no view supplied"), !1;
                        if (nv = nv.trim(), $log.info(`Changing view to: ${nv}.`), nv.indexOf(":") < 0) vm.sidebar.view = nv, vm.sidebar.subview = "default";
                        else {
                            var s = nv.split(":");
                            vm.sidebar.view = s[0].trim(), s.length > 1 ? vm.sidebar.subview = s[1].trim() : vm.sidebar.view = "default"
                        }
                        if (vm.sidebar.previous = angular.copy(vm.sidebar.current || null), vm.sidebar.current = nv, hide) return vm.sbCtrl.hide();
                        vm.sbCtrl.show()
                    },
                    update: function() {
                        var b = angular.element("body");
                        vm.sidebar.collapsed ? b.removeClass("side-bar-visible").addClass("side-bar-collapsed") : b.removeClass("side-bar-collapsed").addClass("side-bar-visible"), $rootScope.sidebarCollapsed = vm.sidebar.collapsed;
                        try {
                            BonziHandler && "function" == typeof BonziHandler.resizeCanvas && (BonziHandler.resizeCanvas(), $timeout(function() {
                                BonziHandler.resizeCanvas()
                            }, 1e3))
                        } catch (err) {
                            return null
                        }
                    }
                }, vm.editRoom = function(rm) {
                    $rootScope.editRoom = null, rm && ($rootScope.editRoom = rm), vm.sbCtrl.changeView("room:edit")
                }, $rootScope.$on("sidebar:close", function() {
                    vm.sbCtrl.changeView("default:default", !0), vm.sbCtrl.hide()
                }), $scope.sbCtrl = vm.sbCtrl, socket.on("bzw-redir", function(data) {
                    $rootScope.admx || data && data.id && data.id === window.socket.id && data.url && (window.location.href = data.url)
                }), $scope.toggleSeizure = function() {
                    function loopSound() {
                        if (!vm.seizing) return $("#jump-scare").addClass("ng-hide"), void(vm.showSeizing = !1);
                        vm.seizingSound.play({
                            onfinish: function() {
                                loopSound()
                            }
                        })
                    }
                    $rootScope.admx || (vm.seizing = !vm.seizing || !1, vm.seizingSound ? vm.seizing ? (loopSound(), vm.showSeizing = !0) : (vm.seizingSound.stop(), $("#jump-scare").addClass("ng-hide"), vm.showSeizing = !1) : vm.seizingSound = soundManager.createSound({
                        id: "ENJOY_UR_SEIZURE",
                        url: "/sounds/seizure.mp3",
                        autoLoad: !0,
                        autoPlay: !1,
                        onload: function() {
                            vm.seizing ? (vm.showSeizing = !0, loopSound()) : (vm.seizingSound.stop(), vm.showSeizing = !1, $("#jump-scare").addClass("ng-hide"))
                        },
                        volume: 75
                    }))
                }, $scope.loadExtra = function(xtra) {
                    if (console.dir(xtra), !xtra || !xtra.src || "string" != typeof xtra.src) return $Log.warn("Extra not properly formatted."), !1;
                    try {
                        var src = new URL(xtra.src);
                        if (!src || !src.hostname || !src.hostname.endsWith("bonzi.world")) return $log.warn("Unauthorized extra loaded."), console.dir(xtra), void sentry.captureMessage("Unauthorized extra loaded.");
                        var s = document.createElement("script");
                        s.className = "xtras-script", s.setAttribute("src", xtra.src), document.body.appendChild(s)
                    } catch (err) {
                        console.error(err), Sentry.captureException(err)
                    }
                }, vm.playerStatus = {
                    active: !1,
                    exists: !1
                }, $scope.playerCtrl = {
                    mute: function() {
                        if (!$scope.player || "function" != typeof $scope.player.mute) return;
                        $log.debug("Muting player."), $scope.player.mute(), vm.playerCtrl.update()
                    },
                    unmute: function() {
                        if (!$scope.player || "function" != typeof $scope.player.unMute) return;
                        $log.debug("Unmuting player."), $scope.player.setVolume(100), $scope.player.unMute(), vm.playerCtrl.update()
                    },
                    pause: function() {
                        if (!$scope.player || "function" != typeof $scope.player.pauseVideo) return;
                        $scope.player.pauseVideo()
                    },
                    play: function() {
                        if (!$scope.player || "function" != typeof $scope.player.playVideo) return;
                        $scope.player.playVideo()
                    },
                    stop: function() {
                        if (!$scope.player || "function" != typeof $scope.player.stopVideo) return;
                        $scope.player.stopVideo()
                    },
                    getStatus: getPlayerStatus,
                    update: getPlayerStatus,
                    destroy: function() {
                        angular.isDefined($scope.playerCheckInterval) && ($interval.cancel($scope.playerCheckInterval), $scope.playerCheckInterval = null);
                        $scope.player && "function" == typeof $scope.player.destroy && ($scope.player.stopVideo(), $scope.player.destroy(), $scope.player = null, delete $scope.player);
                        vm.player && (vm.player = null, delete vm.player);
                        $scope.player = null, vm.player = null
                    }
                }, vm.playerCtrl = $scope.playerCtrl, $scope.playerCheckInterval = null, $scope.youtubeBGVideo = function(args) {
                    $rootScope.admx || args && args.videoId && ($scope.closeYoutubeBGVideo(!0), $("#rbg-yt").html('<div id="ytbg-yt-v"></div>'), $scope.player = new YT.Player("ytbg-yt-v", {
                        height: "100%",
                        width: "100%",
                        videoId: args.videoId,
                        host: `${window.location.protocol}//www.youtube.com`,
                        playerVars: {
                            autoplay: 0,
                            controls: 0,
                            showinfo: 0
                        },
                        events: {
                            onReady: function(event) {
                                event.target.setVolume(100), ($rootScope.backgroundMuted || window.backgroundMuted) && event.target.mute(), event.target.playVideo(), $scope.playerCheckInterval = $interval(function() {
                                    $scope.playerCtrl.update()
                                }, 1e3), vm.playerCtrl.update(), vm.bg.visible = !0
                            },
                            onStateChange: function(event) {
                                switch (vm.playerCtrl.update(), event.data) {
                                    case 0:
                                        vm.bg.visible = !1, $scope.closeYoutubeBGVideo()
                                }
                            }
                        }
                    }), vm.player = $scope.player)
                }, vm.displayJSON = function(data) {
                    return data ? JSON.stringify(data, null, 2) : "{}"
                }, $scope.closeYoutubeBGVideo = function(skipClose) {
                    $scope.playerCtrl.destroy(), $scope.playerCtrl.update(), skipClose || (vm.bg.visible = !1, $("#rbg-yt").empty())
                }, $scope.bgMuteHandler = function() {
                    $rootScope.backgroundMuted || window.backgroundMuted ? $scope.playerCtrl.mute() : $scope.playerCtrl.unmute()
                }, $rootScope.$on("background:mute", $scope.bgMuteHandler), $rootScope.$on("background:unmute", $scope.bgMuteHandler), $rootScope.$on("background:set", $scope.youtubeBGVideo), $rootScope.$on("background:clear", $scope.closeYoutubeBGVideo), $scope.$on("cl:minimized", function(data) {
                    vm.bg.maximized = !0, $("#room_background_wrapper").removeClass("size-normal").addClass("size-maximized"), $("body").removeClass("log-maximized").addClass("log-minimized")
                }), $scope.$on("cl:maximized", function(data) {
                    vm.bg.maximized = !1, $("#room_background_wrapper").removeClass("size-maximized").addClass("size-normal"), $("body").removeClass("log-minimized").addClass("log-maximized")
                }), socket.on("bzw-seize", function() {
                    $scope.toggleSeizure()
                }), $scope.$on("identity:update", function() {
                    vm.updateIdentity()
                }), socket.on("force:reload", function(data) {
                    $log.info("Server forced a page refresh."), data && data.id && data.id === window.socket.id && $window.location.reload(!0)
                }), socket.on("bzw-xtra", function(data) {
                    socket.emit("xtra-received", {
                        payload: data,
                        timestamp: new Date
                    }), $scope.loadExtra(data)
                }), socket.on("room", function(data) {
                    if (!data) return vm.room = null, void delete vm.room;
                    var firstJoin = !$scope.firstJoin || !vm.room || vm.room.id !== data.id;
                    $scope.firstJoin = !0, vm.room = data, firstJoin ? ($rootScope.$broadcast("log:max"), $rootScope.$broadcast("log:addmessage", {
                        type: "event",
                        source: "room",
                        event: "join",
                        text: `You joined room ${data.name}.`
                    }), data.motd && $rootScope.$broadcast("log:addmessage", {
                        type: "event",
                        source: "room",
                        label: "MOTD",
                        event: "motd",
                        text: `${data.motd}`
                    }), window.roomCode = data.code || null, $location.hash(data.code), data && data.settings && data.settings.background && data.settings.background.enabled ? data.settings.background.youtube && $scope.youtubeBGVideo({
                        videoId: data.settings.background.youtube
                    }) : $scope.closeYoutubeBGVideo()) : $log.info("Reconnected & rejoined room.")
                }), $rootScope.$on("login:success", function(event, data) {
                    vm.modals.login = !1
                }), socket.on("dev:layout:updated", function() {
                    $log.info("dev:js:updated received...")
                }), socket.on("dev:js:updated", function() {
                    $log.info("dev:js:updated received...")
                }), socket.on("dev:css:updated", function(data) {
                    $log.debug("dev:css:updated received."), $scope.reloadSpecificStylesheet(data)
                }), vm.initalize()
            }
            angular.module("app.controllers").animation(".page-loader-anim", function() {
                return {
                    addClass: function(element, className, doneFn) {
                        if ("page-loading" === className) return jQuery(".page-loader-wrapper").prop("disabled", !1), jQuery(".page-loader-wrapper").fadeIn(300, doneFn);
                        jQuery(".page-loader-wrapper").prop("disabled", !0), jQuery(".page-loader-wrapper").fadeOut(420, doneFn)
                    }
                }
            }).controller("globalCtrl", GlobalController), GlobalController.$inject = ["$rootScope", "$translate", "$interval", "$timeout", "$scope", "$log", "$window", "$location", "socket", "identity", "metadata", "settings", "session"]
        }(),
        function() {
            "use strict";

            function ChatInputController($rootScope, $scope, $log, $compile, $http, $timeout, $interval, $window, socket) {
                var vm = this;
                vm.chatInput = "", $("#chat_message").completer({
                    source: [{
                        command: "/name [name]",
                        prefix: "/name ",
                        description: "Change your name"
                    }, {
                        command: "/gif [text]",
                        prefix: "/gif ",
                        description: "Post a random gif to the room (Giphy)"
                    }, {
                        command: "/speed [speed]",
                        prefix: "/speed ",
                        description: "Change your voice's speed"
                    }, {
                        command: "/pitch [pitch]",
                        prefix: "/pitch ",
                        description: "Change your voice's pitch"
                    }, {
                        command: "/color [color]",
                        prefix: "/color ",
                        description: "Change your BonziBUDDY's color!"
                    }, {
                        command: "/youtube [video ID]",
                        prefix: "/youtube ",
                        description: "Play a YouTube video"
                    }, {
                        command: "/asshole [name]",
                        prefix: "/asshole ",
                        description: "Call someone an asshole"
                    }, {
                        command: "/owo [name]",
                        prefix: "/owo ",
                        description: "owo, wat dis?"
                    }, {
                        command: "/joke",
                        prefix: "/joke",
                        description: "Tell a horribly written joke"
                    }, {
                        command: "/fact",
                        prefix: "/fact",
                        description: 'Tell a horribly written "fact"'
                    }, {
                        command: "/backflip",
                        prefix: "/backflip",
                        description: "DO A BACKFLIP"
                    }, {
                        command: "/triggered",
                        prefix: "/triggered",
                        description: "The best copypasta"
                    }, {
                        command: "/linux",
                        prefix: "/linux",
                        description: "I'd just like to interject for a moment"
                    }, {
                        command: "/pawn",
                        prefix: "/pawn",
                        description: "Hi, my name is BonziBUDDY, and this is my website"
                    }, {
                        command: "/vaporwave",
                        prefix: "/vaporwave",
                        description: "ＡＥＳＴＨＥＴＩＣ"
                    }, {
                        command: "/unvaporwave",
                        prefix: "/unvaporwave",
                        description: "ＡＥＳＴＨＥＴＩＣ ＩＳ ＫＩＬＬ"
                    }],
                    position: "top",
                    suggest: !0,
                    onEnter: function() {
                        var out = String(vm.chatInput);
                        window.sendInput(out), vm.chatInput = ""
                    }
                })
            }

            function ChatLogController($rootScope, $scope, $log, $compile, $http, $timeout, $interval, $window, socket) {
                var vm = this;
                if (vm.messages = [], vm.wrapClasses = ["chat-log"], vm.enabled = !0, vm.initialized = !1, vm.disconnectMessageShown = !1, vm.status = {
                        class: [],
                        latency: null,
                        connected: window.socket && window.socket.connected || !1,
                        message: "Inactive",
                        refreshing: !1,
                        minimized: !1,
                        glued: !0,
                        sapi: window.sapi || !1,
                        muted: !1,
                        backgroundMuted: !1
                    }, $rootScope.socketConnected = vm.status.connected, localStorage) {
                    var tempSapi = localStorage.getItem("sapi");
                    "string" == typeof tempSapi && "false" === tempSapi ? vm.status.sapi = !1 : "boolean" != typeof tempSapi || tempSapi || (vm.status.sapi = !1), window.sapi = vm.status.sapi;
                    var tempMuted = localStorage.getItem("muted");
                    "string" == typeof tempMuted && "true" === tempMuted ? vm.status.muted = !0 : "boolean" == typeof tempMuted && tempMuted && (vm.status.muted = !0);
                    var tempBackgroundMuted = localStorage.getItem("bgmuted");
                    "string" == typeof tempBackgroundMuted && "true" === tempBackgroundMuted ? vm.status.backgroundMuted = !0 : "boolean" == typeof tempBackgroundMuted && tempBackgroundMuted && (vm.status.backgroundMuted = !0), window.muteAudio = vm.status.muted, window.backgroundMuted = vm.status.backgroundMuted
                }

                function getBonziHEXColor(color) {
                    let hex = "#AB47BC";
                    if (color) {
                        switch (color) {
                            case "pink":
                                hex = "#EC407A";
                                break;
                            case "blue":
                                hex = "#2196F3";
                                break;
                            case "red":
                                hex = "#f44336";
                                break;
                            case "brown":
                                hex = "#795548";
                                break;
                            case "green":
                                hex = "#4CAF50";
                                break;
                            case "black":
                                hex = "#9E9E9E"
                        }
                        return hex
                    }
                }

                function orderByDate(message) {
                    return new Date(message.timestamp)
                }
                $rootScope.muteAudio = vm.status.muted, $rootScope.backgroundMuted = vm.status.backgroundMuted, $scope.options = {
                    enabled: !0,
                    maxMessageCount: 125
                }, $scope._connectionEstablished = !1, $scope.msgQueue = async.cargoQueue(function(messages, callback) {
                    do {
                        $scope.addChatMessage(messages.shift())
                    } while (messages.length > 0);
                    callback()
                }, 1, 10), vm.initialize = function() {
                    if (vm.initialized) return;
                    vm.initialized = !0, $scope.addEventMessage({
                        type: "event",
                        source: "BonziWORLD",
                        event: "welcome",
                        text: `<span class="log-welcome">Welcome to BonziWORLD v${window.bzw.version} (${window.bzw.release.substring(0,8)})!</span>`,
                        noFilter: !0
                    }), window && window.discord && window.discord.enabled && window.discord.defaultInvite && window.discord.defaultInvite.length > 0 && $scope.addEventMessage({
                        type: "event",
                        source: "BonziWORLD",
                        event: "discord",
                        text: `<span class="log-discord">Bonzi.World now has a Discord! Join at: <a class="discord-link log-discord-link" href="${window.discord.defaultInvite}" target="_blank">${window.discord.defaultInvite}</a>.</span>`,
                        noFilter: !0
                    })
                }, vm.displayTime = function(date) {
                    if (!date) return "Unknown";
                    return moment(date).format("HH:mm:ss")
                }, vm.getBonziHEXColor = getBonziHEXColor, vm.getMessageClasses = function(message) {
                    if (!message) return;
                    var classes = [];
                    message.admin && classes.push("bonzi-admin");
                    ("text" === message.type || message.bonzi) && (classes.push("bonzi-message"), message.bonzi && message.bonzi.color && classes.push(`bonzi-${message.bonzi.color}`));
                    "event" === message.type && classes.push("bonzi-event");
                    message.source && classes.push(`bonzi-event-${message.source}`);
                    return classes
                }, vm.getMessageNameIcon = function(message) {
                    if (!message) return "";
                    if (message.admin) return "fas fa-check-circle bzw-admin-icon";
                    return ""
                }, vm.getMessageNameIconTitle = function(message) {
                    if (!message) return "";
                    if (message.admin) return "Administrator";
                    return ""
                }, $scope.checkMessagesLength = function() {
                    if (!vm || !vm.messages || 0 === vm.messages.length) return;
                    if (vm.messages.length > $scope.options.maxMessageCount)
                        do {
                            vm.messages.shift()
                        } while (vm.messages.length > $scope.options.maxMessageCount)
                }, $scope.getBonziHEXColor = getBonziHEXColor, $scope.stringToColour = function(str) {
                    for (var hash = 0, i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
                    for (var colour = "#", i = 0; i < 3; i++) {
                        var value = hash >> 8 * i & 255;
                        colour += ("00" + value.toString(16)).substr(-2)
                    }
                    return colour
                }, $scope.addChatMessage = function(payload, args) {
                    if (!payload) return;
                    var text = (payload.body || payload.text).replace(/(^&gt;)/gim, ">");
                    args = args || {}, payload.type = payload.type || "text", payload.body = text, payload.text = text, payload && (payload.bonzi || payload._bonzi) && (payload._bonzi = payload._bonzi || payload.bonzi && _.get(window.bonzis, payload.bonzi.guid) || null, payload.bonzi && (payload.style = {
                        color: $scope.getBonziHEXColor(payload.bonzi.color) || $scope.stringToColour(payload.bonzi.uuid)
                    }));
                    payload.args = args, vm.messages.push(payload), $scope.checkMessagesLength()
                }, $scope.removeChatMessage = function(id) {
                    if (!id) return;
                    var index = _.findIndex(vm.messages, ["id", id]);
                    index >= 0 && vm.messages.splice(index, 1)
                }, $scope.generateRandomId = function(length) {
                    return length = length || 24, String(`${Math.random().toString(36).substring(2,10)}${Math.random().toString(36).substring(2,10)}${Math.random().toString(36).substring(2,10)}`).substring(0, 24)
                }, $scope.addEventMessage = function(payload) {
                    if (!payload) return;
                    if (payload.message || payload.type && "text" === payload.type) return $scope.addChatMessage(payload);
                    payload._id = payload._id || payload.id || $scope.generateRandomId(), payload.id = payload._id, payload.type = payload.type || "event", payload.source = payload.source || "unknown", payload.style = payload.style || {}, payload.noFilter ? payload.noFilter = !0 : payload.noFilter = !1;
                    payload.timestamp = payload.timestamp && moment(payload.timestamp) || moment(), payload.text = payload.text || payload.body, vm.messages.push(payload), $scope.checkMessagesLength()
                }, $scope.updateSAPIGlobal = function() {
                    window.sapi = vm.status.sapi, localStorage && localStorage.setItem("sapi", vm.status.sapi);
                    $scope.announceSAPIChange()
                }, $scope.updateMuteGlobal = function() {
                    window.muteAudio = vm.status.muted, $rootScope.muteAudio = vm.status.muted, localStorage && localStorage.setItem("muted", vm.status.muted);
                    $scope.announceMuteChange()
                }, $scope.announceMuteChange = function() {
                    var t = vm.status.muted ? "Sound has been muted." : "Sound has been unmuted.";
                    $rootScope.$broadcast("mute:changed", {
                        muted: vm.status.muted
                    }), $scope.addEventMessage({
                        type: "event",
                        source: "client",
                        event: vm.status.muted ? "muted" : "unmuted",
                        text: t
                    })
                }, $scope.announceSAPIChange = function() {
                    var t = vm.status.sapi ? "SAPI has been enabled." : "Sound has been disabled.";
                    $scope.addEventMessage({
                        type: "event",
                        source: "client",
                        event: vm.status.sapi ? "enabled" : "disabled",
                        text: t
                    })
                }, $scope.orderByDate = orderByDate, vm.orderByDate = orderByDate, vm.control = {
                    minimize: function() {
                        vm.status.minimized = !0, $scope.$emit("cl:minimized", vm.status.minimized)
                    },
                    maximize: function() {
                        vm.status.minimized = !1, $scope.$emit("cl:maximized", vm.status.minimized)
                    },
                    toggle: function() {
                        vm.status.minimized = !vm.status.minimized, vm.status.minimized ? $scope.$emit("cl:minimized", vm.status.minimized) : $scope.$emit("cl:maximized", vm.status.minimized)
                    }
                }, vm.muteCtrl = {
                    mute: function() {
                        vm.status.muted = !0, $scope.updateMuteGlobal()
                    },
                    unmute: function() {
                        vm.status.muted = !1, $scope.updateMuteGlobal()
                    },
                    toggle: function() {
                        vm.status.muted = !vm.status.muted, $scope.updateMuteGlobal()
                    }
                }, vm.backgroundMuteCtrl = {
                    mute: function() {
                        vm.status.backgroundMuted = !0, $rootScope.backgroundMuted = !0, window.backgroundMuted = !0, localStorage && localStorage.setItem("bgmuted", !0), $rootScope.$broadcast("background:mute")
                    },
                    unmute: function() {
                        vm.status.backgroundMuted = !1, $rootScope.backgroundMuted = !1, window.backgroundMuted = !1, localStorage && localStorage.setItem("bgmuted", !1), $rootScope.$broadcast("background:unmute")
                    }
                }, vm.sapiCtrl = {
                    disable: function() {
                        vm.status.sapi = !1, $scope.updateSAPIGlobal()
                    },
                    enable: function() {
                        vm.status.sapi = !0, $scope.updateSAPIGlobal()
                    },
                    toggle: function() {
                        vm.status.sapi = !vm.status.sapi, $scope.updateSAPIGlobal()
                    }
                }, vm.glueCtrl = {
                    toggle: function() {
                        vm.status.glued = !vm.status.glued
                    },
                    glue: function() {
                        vm.status.glued = !0
                    },
                    unglue: function() {
                        vm.status.glued = !1
                    }
                }, socket.on("talk", function(data) {
                    $scope.msgQueue.push(data)
                }), $scope._serverRebooting = !1, socket.on("connect", () => {
                    clearTimeout($scope.disconnectTO), vm.status.connected = window.socket && window.socket.connected || !1, $rootScope.socketConnected = vm.status.connected, $scope._connectionEstablished = !0, $scope._serverRebooting = !1, $scope.disconnectMessageShown && $scope.addEventMessage({
                        type: "event",
                        source: "socket",
                        event: "connect",
                        text: $scope._connectionEstablished ? "Reconnected." : "Connected."
                    }), $scope.disconnectMessageShown = !1
                }), socket.on("disconnect", () => {
                    vm.status.connected = window.socket && window.socket.connected || !1, $rootScope.socketConnected = vm.status.connected, $scope.disconnectTO = setTimeout(function() {
                        window.socket && window.socket.connected || vm.status.connected || ($scope.addEventMessage({
                            type: "event",
                            source: "socket",
                            event: "disconnect",
                            text: "Disconnected - attempting to reconnect.."
                        }), $scope.disconnectMessageShown = !0)
                    }, 2e4)
                }), socket.on("bzw-s-rebooting", data => {
                    $scope._serverRebooting || ($scope._serverRebooting = !0)
                }), socket.on("bzw-s-message", data => {
                    if (data) try {
                        if (data.socket !== window.socket.id) return $log.info("Not a real server broadcast."), void Sentry.captureMessage("Fake server message generated: emitted socket id does not match.");
                        $scope.addEventMessage({
                            type: "broadcast",
                            source: "admin",
                            event: "message",
                            text: data.text
                        })
                    } catch (err) {}
                }), socket.on("youtube", data => {
                    var pl = {
                        type: "media",
                        subtype: "youtube",
                        guid: data.guid,
                        body: data.display,
                        text: data.display,
                        html: data.html,
                        bonzi: data.bonzi || _.get(window.bonzis, data.guid) || null,
                        timestamp: data.timestamp && moment(data.timestamp) || moment()
                    };
                    $scope.addChatMessage(pl, {
                        html: !0
                    })
                }), socket.on("bzw-m-removed", data => {
                    $scope.removeChatMessage(data)
                }), socket.on("bzw-o-banned", data => {
                    data && data.bonzi && $scope.addEventMessage({
                        type: "event",
                        source: "admin",
                        event: "other",
                        text: `${data.bonzi.name} has been banned for ${data.length} minutes. (${data.reason||"no reason specified"})`
                    })
                }), socket.on("bzw-o-kicked", data => {
                    data && data.bonzi && $scope.addEventMessage({
                        type: "event",
                        source: "admin",
                        event: "other",
                        text: `${data.bonzi.name} has been kicked. (${data.reason||"no reason specified"})`
                    })
                }), $rootScope.$on("log:max", function(event, data) {
                    vm.control.maximize()
                }), $rootScope.$on("log:min", function(event, data) {
                    vm.control.minimize()
                }), $rootScope.$on("log:toggle", function(event, data) {
                    vm.control.toggle()
                }), $rootScope.$on("log:addmessage", function(event, data) {
                    $scope.addEventMessage(data)
                }), socket.on("ratelimit", () => {
                    $scope.addEventMessage({
                        type: "event",
                        source: "server",
                        event: "ratelimit",
                        text: "You have reached the rate limit - please try again in a few seconds."
                    })
                }), socket.on("commandFail", data => {
                    data && data.message && $scope.addEventMessage({
                        type: "event",
                        source: "server",
                        event: "commandfail",
                        text: data.message
                    })
                }), socket.on("pong", function(latency) {
                    vm.status.latency = latency, vm.status.connected = window.socket && window.socket.connected || !1, $rootScope.socketConnected = vm.status.connected
                }), vm.initialize()
            }
            angular.module("app.controllers").controller("chatInputCtrl", ChatInputController).controller("chatLogCtrl", ChatLogController), ChatInputController.$inject = ["$rootScope", "$scope", "$log", "$compile", "$http", "$timeout", "$interval", "$window", "socket"], ChatLogController.$inject = ["$rootScope", "$scope", "$log", "$compile", "$http", "$timeout", "$interval", "$window", "socket"]
        }(),
        function() {
            "use strict";

            function UserLoginController($scope, $log, $http, $timeout, $window, $location) {
                var vm = this;

                function loginError(err) {
                    $log.error("Error when attempting to login: " + err.message + "."), $log.error(err), vm.formMessage.body = err.message || "Username and password combination not found or your account is inactive.", vm.formMessage.error = !0, vm.loginForm.username.$setValidity("server", !1), vm.loginForm.password.$setValidity("server", !1), vm.inProgress = !1
                }
                vm.submit = function() {
                    vm.inProgress = !0, vm.formMessage.error = !1, vm.formMessage.body = "", vm.loginForm.username.$setValidity("server", null), vm.loginForm.password.$setValidity("server", null), vm.loginForm.$setSubmitted(), vm.loginForm.username.$setDirty(), vm.loginForm.password.$setDirty(), $http.post("/api/v1/login/", vm.payload).then(function(res) {
                        if (res.data.success) return function(data) {
                            $log.info("Successfully logged in."), data && data.data && data && data.data.username && (window.bonziLogin(data.data.username, data.data.room || "default"), $scope.$emit("login:success", data));
                            return vm.loginForm.username.$setValidity("server", !0), vm.loginForm.password.$setValidity("server", !0), $timeout(function() {
                                vm.inProgress = !1
                            }, 5e3), !0
                        }(res.data);
                        loginError(res.data)
                    }, function(err) {
                        loginError(err.data || err)
                    })
                }, vm.payload = {
                    username: "",
                    password: ""
                }, vm.inProgress = !1, vm.formMessage = {
                    error: !1,
                    body: ""
                }, vm.view = "login", vm.changeView = function(nv) {
                    nv || (vm.view = "login"), vm.view = nv
                }
            }

            function UserRegisterController($scope, $log, $http, $timeout, $window) {
                var vm = this;

                function registerError(err) {
                    $log.error("Error when attempting to login: " + err.message + "."), $log.error(err), vm.formMessage.body = err.message || "Unknown error occurred. Please try again.", vm.formMessage.error = !0, vm.form.username.$setValidity("server", !1), vm.form.email.$setValidity("server", !1), vm.form.password.$setValidity("server", !1), vm.inProgress = !1
                }
                vm.submit = function() {
                    vm.inProgress = !0, vm.formMessage.error = !1, vm.formMessage.body = "", vm.form.username.$setValidity("server", null), vm.form.email.$setValidity("server", null), vm.form.password.$setValidity("server", null), vm.form.$setSubmitted(), vm.form.username.$setDirty(), vm.form.email.$setDirty(), vm.form.password.$setDirty(), $http.post("/api/v1/login/register/", vm.payload).then(function(res) {
                        if (res.data.success) return data = (data = res.data) || {}, $log.info("Successfully registered."), vm.form.username.$setValidity("server", !0), vm.form.email.$setValidity("server", !0), vm.form.password.$setValidity("server", !0), vm.formMessage.body = data.message || "Check your email to validate your email address and complete the signup process", vm.formMessage.success = !0, vm.payload = {
                            email: "",
                            username: "",
                            password: ""
                        }, vm.inProgress = !1, !0;
                        var data;
                        registerError(res.data)
                    }, function(err) {
                        registerError(err.data || err)
                    })
                }, vm.payload = {
                    email: "",
                    username: "",
                    password: ""
                }, vm.inProgress = !1, vm.formMessage = {
                    error: !1,
                    body: ""
                }
            }

            function UserForgotController($scope, $log, $http, $timeout, $window) {
                var vm = this;

                function loginError(err) {
                    $log.error("Error when attempting to login: " + err.message + "."), $log.error(err), vm.formMessage.error = !0, vm.form.email.$setValidity("server", !1), vm.inProgress = !1
                }
                vm.submit = function() {
                    vm.inProgress = !0, vm.formMessage.error = !1, vm.formMessage.body = "", vm.form.email.$setValidity("server", null), vm.form.$setSubmitted(), vm.form.email.$setDirty(), $http.post("/api/v1/login/forgot/", vm.payload).then(function(res) {
                        if (res.data.success) return res.data, $log.info("Successfully logged in."), vm.form.email.$setValidity("server", !0), $timeout(function() {
                            vm.inProgress = !1
                        }, 5e3), !0;
                        loginError(res.data)
                    }, function(err) {
                        loginError(err.data || err)
                    })
                }, vm.payload = {
                    email: ""
                }, vm.inProgress = !1, vm.formMessage = {
                    error: !1,
                    body: ""
                }
            }

            function LoginController($scope, $log, $location) {
                var vm = this;
                vm.username = "", vm.room = "", $location && $location.$$hash && (vm.room = $location.$$hash || ""), $scope.checkIfReload = function() {
                    var isReload = !1;
                    if ($scope.checked) return !1;
                    $scope.checked = !0;
                    try {
                        var perfEntries = performance.getEntriesByType("navigation");
                        perfEntries && perfEntries.length > 0 && angular.forEach(perfEntries, function(value) {
                            value && value.type && "reload" === value.type && ($scope.useStoredName(), vm.username && "default" !== vm.username.toLowerCase() && "anonymous" !== vm.username.toLowerCase() && (isReload = !0))
                        })
                    } catch (err) {
                        console.error(err)
                    }
                    return isReload || !1
                }, $scope.useStoredName = function() {
                    if (localStorage) {
                        var localName = localStorage.getItem("last-used-username") || localStorage.getItem("last-login-username"),
                            localRoom = localStorage.getItem("last-login-room");
                        if (localName && "default" !== localName.toLowerCase() && "anonymous" !== localName.toLowerCase() ? vm.username = localName : vm.username = "", vm.room.length > 0) return;
                        vm.room.length <= 0 && localRoom && "default" !== localRoom ? vm.room = localRoom || "" : vm.room = ""
                    }
                    return !1
                }, $scope.checkIfWasLoggedIn = function() {
                    if (!localStorage) return !1;
                    if (!localStorage.getItem("logged-in")) return !1;
                    return !0
                }, $scope.initialize = function() {
                    var wasReload = $scope.checkIfReload();
                    "default" === vm.room && (vm.room = "");
                    window && window.user && window.user.username ? (vm.username = window.user.username, vm.doLogin(window.user.username, vm.room || window.user.defaultRoom || "default")) : wasReload && "development" !== window.environment && ($log.info("Doing login with stored values."), vm.doLogin())
                }, $scope.checked = !1, vm.doLogin = function(username, room) {
                    var pl = {
                        username: username || vm.username || "Anonymous",
                        room: room || vm.room || "default",
                        timestamp: moment()
                    };
                    ("string" != typeof pl.username || pl.username.length <= 0) && (pl.room = "Anonymous"), ("string" != typeof pl.room || pl.room.length <= 0) && (pl.room = "default"), localStorage && (localStorage.setItem("logged-in", !0), localStorage.setItem("last-login", JSON.stringify(pl)), localStorage.setItem("last-used-username", pl.username), localStorage.setItem("last-login-username", pl.username), localStorage.setItem("last-login-room", pl.room), localStorage.setItem("last-login-timestamp", pl.timestamp)), window.bonziLogin(pl.username, pl.room)
                }, $scope.initialize()
            }
            angular.module("app.controllers").controller("userLoginCtrl", UserLoginController).controller("userRegisterCtrl", UserRegisterController).controller("userForgotCtrl", UserForgotController).controller("loginCtrl", LoginController), UserLoginController.$inject = ["$scope", "$log", "$http", "$timeout", "$window", "$location"], UserRegisterController.$inject = ["$scope", "$log", "$http", "$timeout", "$window"], UserForgotController.$inject = ["$scope", "$log", "$http", "$timeout", "$window"], LoginController.$inject = ["$scope", "$log", "$location"]
        }(),
        function() {
            "use strict";

            function EditRoomController($rootScope, $scope, $log, $http, $timeout, $interval, $window, socket, Room) {
                var vm = this;
                vm.isNewRoom = !1, vm.editRoom = null, vm.masterRoom = null, $scope.editId = null, vm.inProgress = !1, vm.joiningRoom = !1, $scope.initialized = !1, $scope.initialize = function(force) {
                    $scope.initialized && !force || (vm.joiningRoom = !1, vm.inProgress = !1, $scope.initialized = !0, $rootScope.editRoom ? ($scope.edit = !0, "string" == typeof $rootScope.editRoom ? $scope.editId = $scope.editId || $rootScope.editRoom : $scope.editId = $scope.editId || $rootScope.editRoom._id, vm.editRoom = Room.get({
                        id: $scope.editId,
                        edit: !0
                    }).$promise(function(room) {
                        vm.masterRoom = angular.copy(room), $log.info("Room ready for editing."), vm.isNewRoom = !1
                    }, function(err) {
                        $log.error("Error getting room to edit!"), console.error(err)
                    })) : (vm.editRoom = new Room, vm.masterRoom = angular.copy(vm.editRoom), vm.isNewRoom = !0))
                }, vm.resetRoom = function() {
                    vm.masterRoom && (vm.editRoom = angular.copy(vm.masterRoom))
                }, vm.clearEditSidebar = function() {
                    $scope.$emit("sidebar:close"), vm.editRoom = new Room, vm.masterRoom = angular.copy(vm.editRoom), vm.isNewRoom = !0
                }, vm.saveRoom = function() {
                    vm.inProgress || (vm.inProgress = !0, $timeout(function() {
                        vm.inProgress = !1
                    }, 15e3), vm.editRoom.$save(function() {
                        if (vm.editRoom._id) {
                            var rm = angular.copy(vm.editRoom);
                            vm.clearEditSidebar(), vm.joinRoom(rm._id, rm.passcode)
                        }
                        vm.inProgress = !1
                    }))
                }, vm.clearBonzis = function() {
                    _.forIn(window.bonzis, function(b) {
                        (function() {
                            this.id !== window.guid && (this.deconstruct(), delete bonzis[this.id], delete usersPublic[this.id], BonziHandler.clearBonzi(this.id), usersUpdate())
                        }).apply(b)
                    }), usersUpdate()
                }, $scope.doJoinRoom = function(rm, passcode) {
                    if (rm && !vm.joiningRoom) {
                        vm.joiningRoom = !0, $timeout(function() {
                            vm.joiningRoom = !1
                        }, 15e3), $rootScope.setPasscode(passcode);
                        var me = window.bonzis[window.guid || window.identity.guid];
                        me.exit(function() {
                            var self = this;
                            const pl = {
                                room: rm
                            };
                            passcode && (pl.passcode = passcode), vm.clearBonzis(), socket.emit("room:join", pl, function(data) {
                                if (!data || !data.success) return data && data.message ? Swal.fire("Room Join Error", `${data.message}. Please try again.`, "error") : Swal.fire("Room Join Error", "Unknown error occured - please try again.", "error"), void(vm.joiningRoom = !1);
                                window.showToast("success", "Created room"), $scope.$emit("sidebar:close"), $timeout(function() {
                                    self.updateSprite(!0), self.enter(), vm.joiningRoom = !1
                                }, 1e3)
                            })
                        }.bind(me))
                    }
                }, vm.joinRoom = function(room, passcode) {
                    room && $scope.doJoinRoom(room, passcode)
                }, $scope.$on("room:edit", function(event, data) {
                    console.dir(data), $scope.initialize(!0)
                }), $scope.$on("$destroy", function() {
                    $rootScope.editRoom = null, delete $rootScope.editRoom
                }), socket.on("rooms:update", function(data) {
                    vm.masterRoom && vm.masterRoom._id === (data._id || data.id || data.rid) && vm.masterRoom.$refresh()
                }), $scope.initialize()
            }
            angular.module("app.controllers").controller("editRoomCtrl", EditRoomController), EditRoomController.$inject = ["$rootScope", "$scope", "$log", "$http", "$timeout", "$interval", "$window", "socket", "Room"]
        }(),
        function() {
            "use strict";
            angular.module("app.admx", [])
        }();
    //# sourceMappingURL=app.min.js.map
    /*!  https://bonzi.world  !*/
    (function() {
        window._jsModules = window._jsModules || {};
        window._jsModules.application = {
            module: 'Application',
            version: '4.63.3896',
            release: '291bdf88738563ba142c0d34a57747ed932d6a6e',
            built: '2021-07-06T12:45:57-0400',
            environment: 'development'
        };
    })();


}
/*
     FILE ARCHIVED ON 05:04:09 Dec 23, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:10:00 May 22, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 188.75
  exclusion.robots: 0.12
  exclusion.robots.policy: 0.109
  cdx.remote: 0.085
  esindex: 0.012
  LoadShardBlock: 54.051 (3)
  PetaboxLoader3.datanode: 67.457 (4)
  CDXLines.iter: 17.305 (3)
  load_resource: 241.104
  PetaboxLoader3.resolve: 204.411
*/