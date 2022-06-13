/*!
  * Application : bonziworld
  * Version     : 4.63.3896
  * Release     : 291bdf88738563ba142c0d34a57747ed932d6a6e
  * Website     : https://www.bonzi.world
  * Module      : Application
  * Built       : 2021-07-06T12:45:57-0400
  * Environment : development
!*/

!(function () {
  "use strict";
  function HTMLClassesDirective($rootScope, $timeout) {
      return {
          link: function (scope, element) {
              function updateStyle(force) {
                  if (($rootScope.style || ((force = !0), ($rootScope.style = scope.currentStyle)), $rootScope.style !== scope.currentClass || force)) {
                      (scope.previousStyle = angular.copy(scope.currentClass)), (scope.currentStyle = `admx-style-${$rootScope.style}`);
                      var elem = angular.element(element);
                      scope.previousStyle && elem.removeClass(scope.previousStyle), elem.removeClass(["admx-style-default", "admx-style-stealth"]).addClass(scope.currentStyle);
                  }
              }
              (scope.previousStyle = "default"),
                  (scope.currentStyle = (localStorage && localStorage.getItem("admx-style")) || $rootScope.style || "default"),
                  updateStyle(!0),
                  $rootScope.$on("style-changed", function (event, data) {
                      console.log("style changed"), console.dir(data), updateStyle();
                  });
          },
      };
  }
  function AdminController($rootScope, $scope, $http, $resource, $interval, $timeout, $log, $window, socket, identity, settings, session) {
      const vm = this;
      console.dir(window),
          ($rootScope.admx = !0),
          window.socket && window.socket.disconnected && window.socket.open(),
          (vm.view = "dashboard"),
          (vm.rooms = []),
          (vm.sockets = []),
          (vm.messages = []),
          (vm.glued = !0),
          (vm.socketsInfo = { lastAttempt: null, lastUpdated: null }),
          (vm.roomsInfo = { lastAttempt: null, lastUpdated: null }),
          ($scope.options = { timeFormat: "HH:mm:ss", maxMessageCount: 300, style: "stealth" });
      const Sockets = $resource(`${window.apiBaseUrl || ""}/api/v1/admin/sockets/:id/`, { id: "@id" }),
          Messages = $resource(`${window.apiBaseUrl || ""}/api/v1/admin/messages/:id/`, { id: "@id" }),
          Room = $resource(`${window.apiBaseUrl || ""}/api/v1/admin/rooms/:id/`, { id: "@id" });
      function setStyle(style) {
          (style = style || "default"), ($scope.options.style = style), ($rootScope.style = style), localStorage.setItem("admx-style", style), $rootScope.$broadcast("style-changed", style);
      }
      function showToast(icon, title) {
          if (!icon || !title) return;
          Swal.mixin({
              toast: !0,
              position: "top-end",
              showConfirmButton: !1,
              timer: 3e3,
              timerProgressBar: !0,
              onOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer), toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
          }).fire({ icon: icon, title: title });
      }
      function runScript(user) {
          user &&
              Swal.fire({ title: "Run a script in browser", input: "select", inputOptions: $scope.extraScripts, inputPlaceholder: "Select a script", showCancelButton: !0 }).then((result) => {
                  if ((console.dir(result), result.value)) {
                      const payload = { action: "xtra", socket: user.socket.id, src: result.value };
                      $http.post(`${window.apiBaseUrl || ""}/api/v1/admin/script/`, payload).then(
                          function (res) {
                              console.log("succes?!"), console.dir(res), showToast("success", "Running script");
                          },
                          function (err) {
                              console.dir(err), showToast("error", err.message || "Error running script");
                          }
                      );
                  }
              });
      }
      function kickIP(user) {
          user &&
              ($log.info("Kicking user."),
              Swal.fire({
                  title: "Kick User?",
                  text: "Kick user for what reason?",
                  icon: "warning",
                  input: "text",
                  inputValue: "Gay retard",
                  showCancelButton: !0,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "GTFO",
              }).then((result) => {
                  if ((console.dir(result), result.value)) {
                      const payload = { action: "kick", ip: user.ip, reason: result.value };
                      $http.post(`${window.apiBaseUrl || ""}/api/v1/admin/kick/`, payload).then(
                          function (res) {
                              console.log("succes?!"), console.dir(res), showToast("success", "User kicked");
                          },
                          function (err) {
                              console.dir(err), showToast("error", err.message || "Error kicking user");
                          }
                      );
                  }
              }));
      }
      function toggleSAPIForUser(user) {
          if (!user) return;
          $log.info("Dsabling sapi for user.");
          const payload = { target: "sapi", action: user.sapi ? "disable" : "enable", socket: user.socket.id, ip: user.ip };
          $http.post(`${window.apiBaseUrl || ""}/api/v1/admin/sapi/`, payload).then(
              function (res) {
                  console.log("succes?!"), console.dir(res), showToast("success", "User SAPI disabled.");
              },
              function (err) {
                  console.dir(err), showToast("error", err.message || "Use SAPI disabled");
              }
          );
      }
      function sanitizeBonziName(name) {
          return name && 0 !== name.length && "string" == typeof name ? (name.length > 25 && (name = `${name.substring(0, 20)}...`), name) : "N/A";
      }
      function reloadUser(user) {
          if (!user) return;
          $log.info("reloading user.");
          const payload = { action: "reload", socket: user.socket.id, ip: user.ip };
          $http.post(`${window.apiBaseUrl || ""}/api/v1/admin/reload/`, payload).then(
              function (res) {
                  console.log("succes?!"), console.dir(res), showToast("success", "User reloaded");
              },
              function (err) {
                  console.dir(err), showToast("error", err.message || "Error reloading user");
              }
          );
      }
      function kickUser(user) {
          user &&
              ($log.info("Kicking user."),
              console.dir(user),
              Swal.fire({
                  title: "Kick User?",
                  text: "Kick user for what reason?",
                  icon: "warning",
                  input: "text",
                  inputValue: "Gay retard",
                  showCancelButton: !0,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "GTFO",
              }).then((result) => {
                  if ((console.dir(result), result.value)) {
                      const payload = { action: "kick", socket: user.socket.id, reason: result.value };
                      $http.post(`${window.apiBaseUrl || ""}/api/v1/admin/kick/`, payload).then(
                          function (res) {
                              showToast("success", "User kicked");
                          },
                          function (err) {
                              showToast("error", err.message || "Error kicking user");
                          }
                      );
                  }
              }));
      }
      function banUser(user) {
          if (!user) return;
          const payload = { action: "ban", ip: user.ip, duration: 1 };
          $log.info("Banning user."),
              Swal.fire({
                  title: "Ban IP?",
                  text: "Ban IP for how long (minutes)?",
                  icon: "warning",
                  input: "number",
                  inputValue: 5,
                  showCancelButton: !0,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "GTFO",
              }).then((result) => {
                  result.value &&
                      ((payload.duration = result.value),
                      (function (payload) {
                          Swal.fire({
                              title: "Ban user (cont)",
                              text: `Banning user for ${payload.duration} minutes for what reason?`,
                              icon: "warning",
                              input: "text",
                              inputValue: "",
                              showCancelButton: !0,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "GTFO",
                          }).then((result) => {
                              result.value &&
                                  ((payload.reason = result.value),
                                  $http.post(`${window.apiBaseUrl || ""}/api/v1/admin/ban/`, payload).then(
                                      function (res) {
                                          showToast("success", "User banned");
                                      },
                                      function (err) {
                                          showToast("error", err.message || "Error banning user");
                                      }
                                  ));
                          });
                      })(payload));
              });
      }
      function removeChatMessage(id) {
          if (id) {
              var index = _.findIndex(vm.messages, ["id", id]);
              index >= 0 &&
                  (vm.messages.splice(index, 1),
                  Messages.delete({ id: id }).$promise.then(
                      function (res) {
                          console.dir(res);
                      },
                      function (err) {
                          console.dir(err);
                      }
                  ));
          }
      }
      function displayTime(date) {
          return date ? moment(date).format($scope.options.timeFormat) : date;
      }
      function orderByDate(message) {
          return new Date(message.timestamp);
      }
      ($scope.extraScripts = { "/extras/scripts/ruin-my-search-history.js": "Ruin Search History" }),
          ($scope.msgQueue = async.cargoQueue(
              function (messages, callback) {
                  $scope.updateSockets(function (err) {
                      do {
                          $scope.addChatMessage(messages.shift());
                      } while (messages.length > 0);
                      callback();
                  });
              },
              1,
              10
          )),
          ($scope.setStyle = setStyle),
          ($scope.getBonziInfoFromGUID = function (guid) {
              if (!guid) return;
              return _.find(vm.sockets, { guid: guid });
          }),
          ($scope.addChatMessage = function (payload) {
              if (!payload) return !1;
              (payload.data = payload.data || angular.copy(payload) || {}),
                  (payload.data.timestamp = payload.timestamp || (payload.data.timestamp && moment(payload.data.timestamp)) || moment()),
                  (payload.timestamp = payload.timestamp || payload.data.timestamp),
                  (payload.bonzi = payload.bonzi || $scope.getBonziInfoFromGUID(payload.data.guid));
              try {
                  payload && payload.bonzi && payload.bonzi.ip ? (payload.bonzi.ip = payload.bonzi.ip) : payload.ip ? (payload.bonzi.ip = payload.ip) : (console.error("Error getting IP!"), console.dir(payload));
              } catch (err) {
                  console.error(err), console.dir(payload), Sentry.captureException(err);
              }
              var mId = payload._id || payload.data._id || payload.data.id;
              if (_.find(vm.messages, ["id", mId])) return;
              var message = {
                  _id: mId,
                  id: mId,
                  cmd: payload.cmd,
                  bonzi: payload.bonzi,
                  body: { original: payload.data.text || "", display: payload.data.text || "" },
                  geo: payload.geo,
                  room: payload.room,
                  timestamp: payload.timestamp || payload.data.timestamp,
                  data: payload.data,
                  changed: payload.data.changed || !1,
              };
              message.bonzi && !message.bonzi.geo && payload.geo ? (message.bonzi.geo = payload.geo) : message.bonzi && message.bonzi.geo && !message.geo && (message.geo = message.bonzi.geo);
              (message.room = message.room || (message.bonzi && message.bonzi.room)), payload.data.message && (message.body = payload.data.message.body);
              if ((vm.messages.push(message), vm.messages.length > $scope.options.maxMessageCount))
                  do {
                      vm.messages.shift();
                  } while (vm.messages.length > $scope.options.maxMessageCount);
          }),
          ($scope.removeChatMessage = removeChatMessage),
          ($scope.displayTime = displayTime),
          ($scope.displayTimestamp = displayTime),
          ($scope.toggleSAPIForUser = toggleSAPIForUser),
          ($scope.updateRooms = function (force, callback) {
              "boolean" == typeof callback && (callback = callback || null);
              force && "function" == typeof force ? ((callback = force), (force = !1)) : force || callback || (force = !1);
              function done(err) {
                  return err || ($scope.roomUpdateInProgress = !1), "function" == typeof callback && callback(err, vm.rooms), vm.rooms;
              }
              if ($scope.roomUpdateInProgress) return done(new Error("Room update already in progress"));
              try {
                  if (!force && vm.roomsInfo.lastUpdated && moment(vm.roomsInfo.lastUpdated).isAfter(moment().subtract(10, "seconds"))) return done();
              } catch (err) {
                  console.warn(err);
              }
              ($scope.roomUpdateInProgress = !0),
                  $log.debug("Updating room list.."),
                  (vm.roomsInfo.lastAttempt = moment()),
                  Room.query({}).$promise.then(
                      function (rooms) {
                          var tempRooms = (rooms = rooms || []).map(function (room) {
                              return room;
                          });
                          return (vm.rooms = tempRooms), (vm.roomsInfo.lastUpdated = moment()), $log.debug(`Room list updated. Room count: ${vm.rooms.length}.`), done(null);
                      },
                      function (err) {
                          return $log.error(`Error updating rooms list: ${err.message}.`), console.error(err), ($scope.roomUpdateInProgress = !1), done(err);
                      }
                  );
          }),
          ($scope.updateSockets = function (force, callback) {
              "boolean" == typeof callback && (callback = callback || null);
              force && "function" == typeof force ? ((callback = force), (force = !1)) : force || callback || (force = !1);
              function done(err) {
                  return err || ($scope.socketUpdateInProgress = !1), "function" == typeof callback && callback(err, vm.sockets), vm.sockets;
              }
              if ($scope.socketUpdateInProgress) return done(new Error("Socket update already in progress"));
              try {
                  if (!force && vm.socketsInfo.lastUpdated && moment(vm.socketsInfo.lastUpdated).isAfter(moment().subtract(10, "seconds"))) return done();
              } catch (err) {
                  console.warn(err);
              }
              ($scope.socketUpdateInProgress = !0),
                  $log.debug("Updating socket list.."),
                  (vm.socketsInfo.lastAttempt = moment()),
                  Sockets.query({}).$promise.then(
                      function (sockets) {
                          var tempSockets = (sockets = sockets || []).map(function (sock) {
                              return (sock.bonzi = angular.copy(sock.public)), sock;
                          });
                          return (vm.sockets = tempSockets), (vm.socketsInfo.lastUpdated = moment()), $log.debug(`Socket list updated. Socket count: ${vm.sockets.length}.`), done(null);
                      },
                      function (err) {
                          return $log.error(`Error updating socket list: ${err.message}.`), console.error(err), ($scope.socketUpdateInProgress = !1), done(err);
                      }
                  );
          }),
          ($scope.kickIP = kickIP),
          ($scope.reloadUser = reloadUser),
          ($scope.kickUser = kickUser),
          ($scope.banUser = banUser),
          ($scope.orderByDate = orderByDate),
          ($scope.initializeMessages = function () {
              Messages.query({ type: "latest", limit: $scope.options.maxMessageCount || 300 }).$promise.then(
                  function (messages) {
                      messages && 0 !== messages.length && $scope.msgQueue.push(messages);
                  },
                  function (err) {
                      $log.error(`Error getting initial message list: ${err.message}.`), console.error(err);
                  }
              );
          }),
          ($scope.runScript = runScript),
          (vm.orderByDate = orderByDate),
          (vm.setStyle = setStyle),
          (vm.displayTime = displayTime),
          (vm.toggleSAPIForUser = toggleSAPIForUser),
          (vm.displayTimestamp = displayTime),
          (vm.getCountryClassName = function (geo) {
              if (!geo || !geo.country) return;
              return `flag-${geo.country.iso_code.toLowerCase()}`;
          }),
          (vm.runScript = runScript),
          (vm.displayGeoInfo = function (geo) {
              if (!geo) return "Unknown";
              var out = "";
              geo.city && geo.city.names && geo.city.names.en && (out += `${geo.city.names.en}, `);
              geo.subdivisions &&
                  geo.subdivisions.length > 0 &&
                  geo.subdivisions.forEach((s) => {
                      out += `${s.names.en} `;
                  });
              if (!out || 0 === out.length) return "Unknown";
              return out.trim();
          }),
          (vm.redirectUser = function (user) {
              if (!user) return;
              $log.info("Redirecting IP user."),
                  Swal.fire({
                      title: "Redirect User?",
                      text: "Redirect user to what URL?",
                      icon: "warning",
                      input: "url",
                      inputValue: "https://google.com",
                      showCancelButton: !0,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Byebye",
                  }).then((result) => {
                      if (result.value) {
                          const payload = { action: "redirect", socket: user.socket.id, ip: user.ip, url: result.value };
                          $http.post(`${window.apiBaseUrl || ""}/api/v1/admin/redirect/`, payload).then(
                              function (res) {
                                  console.log("succes?!"), console.dir(res), showToast("success", "User redirected");
                              },
                              function (err) {
                                  console.dir(err), showToast("error", err.message || "Error redirecting user");
                              }
                          );
                      }
                  });
          }),
          (vm.seizureIP = function (user) {
              if (!user) return;
              $log.info("Seizuring socket user.");
              const payload = { action: "seizure", socket: user.socket.id };
              $http.post(`${window.apiBaseUrl || ""}/api/v1/admin/seizure/`, payload).then(
                  function (res) {
                      console.log("succes?!"), console.dir(res), showToast("success", "User seizing");
                  },
                  function (err) {
                      console.dir(err), showToast("error", err.message || "Error seizing user");
                  }
              );
          }),
          (vm.removeChatMessage = removeChatMessage),
          (vm.shadowbanIP = function (user) {
              if (!user) return;
              $log.info("shadowbanning user.");
              const payload = { action: "shadowban", socket: user.socket.id, ip: user.ip };
              $http.post(`${window.apiBaseUrl || ""}/api/v1/admin/shadowban/`, payload).then(
                  function (res) {
                      console.log("succes?!"), console.dir(res), showToast("success", "User shadowbanned");
                  },
                  function (err) {
                      console.dir(err), showToast("error", err.message || "Error shadowbanning user");
                  }
              );
          }),
          (vm.reloadUser = reloadUser),
          (vm.kickIP = kickIP),
          (vm.kickUser = kickUser),
          (vm.banUser = banUser),
          (vm.getMessageDisplayText = function (text) {
              return text && text.indexOf(":") >= 0 ? window.emoji.replace_colons(text) : text;
          }),
          (vm.adminFilterDisplayName = function (s) {
              return s && "string" == typeof s ? s.replace(/([\uFDFD])/g, "B") : s;
          }),
          (vm.getDisplayRoom = function (id) {
              if ("string" != typeof id && id && id.name) return id.name;
              if (!id || !vm.rooms || 0 === vm.rooms.length) return id;
              try {
                  var room = _.find(vm.rooms, function (rm) {
                      return !!rm && (rm._id === id || rm.id === id || rm.rid === id || rm.code === id);
                  });
                  return room && room.name ? (room.name.indexOf(":") >= 0 ? window.emoji.replace_colons(room.name) : room.name) : id;
              } catch (err) {
                  return console.error(err), id;
              }
          }),
          ($scope.initialize = function () {
              if ($scope.initialized) return;
              ($scope.initialized = !0), $scope.initializeMessages();
          }),
          ($scope.sanitizeBonziName = sanitizeBonziName),
          (vm.sanitizeBonziName = sanitizeBonziName),
          socket.on("user-data", function (payload) {
              $scope.updateSockets(), $scope.updateRooms();
          }),
          socket.on("socket-connection", function () {
              $scope.updateSockets(!0), $scope.updateRooms(!0);
          }),
          socket.on("trigger-socket-update", function () {
              $scope.updateSockets(!0), $scope.updateRooms(!0);
          }),
          socket.on("trigger-room-update", function () {
              $scope.updateSockets(!0), $scope.updateRooms(!0);
          }),
          socket.on("socket-login", function () {
              $scope.updateSockets(!0), $scope.updateRooms(!0);
          }),
          socket.on("room-data", function (payload) {
              if (payload && payload.cmd)
                  return $log.debug(`Room data received. Command: ${payload.cmd}.`), "update" === payload.cmd ? ($scope.updateRooms(), $scope.updateSockets()) : "talk" === payload.cmd ? $scope.msgQueue.push(payload) : void 0;
          }),
          $scope.updateRooms(),
          $scope.updateSockets(),
          $interval(function () {
              $scope.updateRooms(), $scope.updateSockets();
          }, 15e3),
          $scope.initialize();
  }
  (window.generateTSString = function (uuid) {
      return String(new Date().getTime().toString() + "-" + (window.uuid || "x") + "-" + (window.guid || "z") + "-" + (window.fingerprint || "f"));
  }),
      angular.module("app.admx").directive("admxClasses", HTMLClassesDirective).controller("adminCtrl", AdminController),
      (HTMLClassesDirective.$inject = ["$rootScope", "$timeout"]),
      (AdminController.$inject = ["$rootScope", "$scope", "$http", "$resource", "$interval", "$timeout", "$log", "$window", "socket", "identity", "settings", "session"]);
})();
//# sourceMappingURL=app-admx.min.js.map
/*!  https://bonzi.world  !*/
(function () {
  window._jsModules = window._jsModules || {};
  window._jsModules.application = { module: "Application", version: "4.63.3896", release: "291bdf88738563ba142c0d34a57747ed932d6a6e", built: "2021-07-06T12:45:57-0400", environment: "development" };
})();