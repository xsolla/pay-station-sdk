/*! For license information please see main.js.LICENSE.txt */
var PayStationSdk;
(() => {
  var e = {
      660: (e, t, n) => {
        var a;
        !(function (e) {
          !(function (t) {
            var a =
                'object' == typeof n.g
                  ? n.g
                  : 'object' == typeof self
                  ? self
                  : 'object' == typeof this
                  ? this
                  : Function('return this;')(),
              i = r(e);
            function r(e, t) {
              return function (n, a) {
                'function' != typeof e[n] &&
                  Object.defineProperty(e, n, {
                    configurable: !0,
                    writable: !0,
                    value: a,
                  }),
                  t && t(n, a);
              };
            }
            void 0 === a.Reflect ? (a.Reflect = e) : (i = r(a.Reflect, i)),
              (function (e) {
                var t = Object.prototype.hasOwnProperty,
                  n = 'function' == typeof Symbol,
                  a =
                    n && void 0 !== Symbol.toPrimitive
                      ? Symbol.toPrimitive
                      : '@@toPrimitive',
                  i =
                    n && void 0 !== Symbol.iterator
                      ? Symbol.iterator
                      : '@@iterator',
                  r = 'function' == typeof Object.create,
                  o = { __proto__: [] } instanceof Array,
                  s = !r && !o,
                  l = {
                    create: r
                      ? function () {
                          return A(Object.create(null));
                        }
                      : o
                      ? function () {
                          return A({ __proto__: null });
                        }
                      : function () {
                          return A({});
                        },
                    has: s
                      ? function (e, n) {
                          return t.call(e, n);
                        }
                      : function (e, t) {
                          return t in e;
                        },
                    get: s
                      ? function (e, n) {
                          return t.call(e, n) ? e[n] : void 0;
                        }
                      : function (e, t) {
                          return e[t];
                        },
                  },
                  c = Object.getPrototypeOf(Function),
                  u =
                    'object' == typeof process &&
                    process.env &&
                    'true' === process.env.REFLECT_METADATA_USE_MAP_POLYFILL,
                  p =
                    u ||
                    'function' != typeof Map ||
                    'function' != typeof Map.prototype.entries
                      ? (function () {
                          var e = {},
                            t = [],
                            n = (function () {
                              function e(e, t, n) {
                                (this._index = 0),
                                  (this._keys = e),
                                  (this._values = t),
                                  (this._selector = n);
                              }
                              return (
                                (e.prototype['@@iterator'] = function () {
                                  return this;
                                }),
                                (e.prototype[i] = function () {
                                  return this;
                                }),
                                (e.prototype.next = function () {
                                  var e = this._index;
                                  if (e >= 0 && e < this._keys.length) {
                                    var n = this._selector(
                                      this._keys[e],
                                      this._values[e]
                                    );
                                    return (
                                      e + 1 >= this._keys.length
                                        ? ((this._index = -1),
                                          (this._keys = t),
                                          (this._values = t))
                                        : this._index++,
                                      { value: n, done: !1 }
                                    );
                                  }
                                  return { value: void 0, done: !0 };
                                }),
                                (e.prototype.throw = function (e) {
                                  throw (
                                    (this._index >= 0 &&
                                      ((this._index = -1),
                                      (this._keys = t),
                                      (this._values = t)),
                                    e)
                                  );
                                }),
                                (e.prototype.return = function (e) {
                                  return (
                                    this._index >= 0 &&
                                      ((this._index = -1),
                                      (this._keys = t),
                                      (this._values = t)),
                                    { value: e, done: !0 }
                                  );
                                }),
                                e
                              );
                            })();
                          return (function () {
                            function t() {
                              (this._keys = []),
                                (this._values = []),
                                (this._cacheKey = e),
                                (this._cacheIndex = -2);
                            }
                            return (
                              Object.defineProperty(t.prototype, 'size', {
                                get: function () {
                                  return this._keys.length;
                                },
                                enumerable: !0,
                                configurable: !0,
                              }),
                              (t.prototype.has = function (e) {
                                return this._find(e, !1) >= 0;
                              }),
                              (t.prototype.get = function (e) {
                                var t = this._find(e, !1);
                                return t >= 0 ? this._values[t] : void 0;
                              }),
                              (t.prototype.set = function (e, t) {
                                var n = this._find(e, !0);
                                return (this._values[n] = t), this;
                              }),
                              (t.prototype.delete = function (t) {
                                var n = this._find(t, !1);
                                if (n >= 0) {
                                  for (
                                    var a = this._keys.length, i = n + 1;
                                    i < a;
                                    i++
                                  )
                                    (this._keys[i - 1] = this._keys[i]),
                                      (this._values[i - 1] = this._values[i]);
                                  return (
                                    this._keys.length--,
                                    this._values.length--,
                                    t === this._cacheKey &&
                                      ((this._cacheKey = e),
                                      (this._cacheIndex = -2)),
                                    !0
                                  );
                                }
                                return !1;
                              }),
                              (t.prototype.clear = function () {
                                (this._keys.length = 0),
                                  (this._values.length = 0),
                                  (this._cacheKey = e),
                                  (this._cacheIndex = -2);
                              }),
                              (t.prototype.keys = function () {
                                return new n(this._keys, this._values, a);
                              }),
                              (t.prototype.values = function () {
                                return new n(this._keys, this._values, r);
                              }),
                              (t.prototype.entries = function () {
                                return new n(this._keys, this._values, o);
                              }),
                              (t.prototype['@@iterator'] = function () {
                                return this.entries();
                              }),
                              (t.prototype[i] = function () {
                                return this.entries();
                              }),
                              (t.prototype._find = function (e, t) {
                                return (
                                  this._cacheKey !== e &&
                                    (this._cacheIndex = this._keys.indexOf(
                                      (this._cacheKey = e)
                                    )),
                                  this._cacheIndex < 0 &&
                                    t &&
                                    ((this._cacheIndex = this._keys.length),
                                    this._keys.push(e),
                                    this._values.push(void 0)),
                                  this._cacheIndex
                                );
                              }),
                              t
                            );
                          })();
                          function a(e, t) {
                            return e;
                          }
                          function r(e, t) {
                            return t;
                          }
                          function o(e, t) {
                            return [e, t];
                          }
                        })()
                      : Map,
                  d =
                    u ||
                    'function' != typeof Set ||
                    'function' != typeof Set.prototype.entries
                      ? (function () {
                          function e() {
                            this._map = new p();
                          }
                          return (
                            Object.defineProperty(e.prototype, 'size', {
                              get: function () {
                                return this._map.size;
                              },
                              enumerable: !0,
                              configurable: !0,
                            }),
                            (e.prototype.has = function (e) {
                              return this._map.has(e);
                            }),
                            (e.prototype.add = function (e) {
                              return this._map.set(e, e), this;
                            }),
                            (e.prototype.delete = function (e) {
                              return this._map.delete(e);
                            }),
                            (e.prototype.clear = function () {
                              this._map.clear();
                            }),
                            (e.prototype.keys = function () {
                              return this._map.keys();
                            }),
                            (e.prototype.values = function () {
                              return this._map.values();
                            }),
                            (e.prototype.entries = function () {
                              return this._map.entries();
                            }),
                            (e.prototype['@@iterator'] = function () {
                              return this.keys();
                            }),
                            (e.prototype[i] = function () {
                              return this.keys();
                            }),
                            e
                          );
                        })()
                      : Set,
                  f = new (
                    u || 'function' != typeof WeakMap
                      ? (function () {
                          var e = 16,
                            n = l.create(),
                            a = i();
                          return (function () {
                            function e() {
                              this._key = i();
                            }
                            return (
                              (e.prototype.has = function (e) {
                                var t = r(e, !1);
                                return void 0 !== t && l.has(t, this._key);
                              }),
                              (e.prototype.get = function (e) {
                                var t = r(e, !1);
                                return void 0 !== t
                                  ? l.get(t, this._key)
                                  : void 0;
                              }),
                              (e.prototype.set = function (e, t) {
                                return (r(e, !0)[this._key] = t), this;
                              }),
                              (e.prototype.delete = function (e) {
                                var t = r(e, !1);
                                return void 0 !== t && delete t[this._key];
                              }),
                              (e.prototype.clear = function () {
                                this._key = i();
                              }),
                              e
                            );
                          })();
                          function i() {
                            var e;
                            do {
                              e = '@@WeakMap@@' + s();
                            } while (l.has(n, e));
                            return (n[e] = !0), e;
                          }
                          function r(e, n) {
                            if (!t.call(e, a)) {
                              if (!n) return;
                              Object.defineProperty(e, a, {
                                value: l.create(),
                              });
                            }
                            return e[a];
                          }
                          function o(e, t) {
                            for (var n = 0; n < t; ++n)
                              e[n] = (255 * Math.random()) | 0;
                            return e;
                          }
                          function s() {
                            var t,
                              n =
                                ((t = e),
                                'function' == typeof Uint8Array
                                  ? 'undefined' != typeof crypto
                                    ? crypto.getRandomValues(new Uint8Array(t))
                                    : 'undefined' != typeof msCrypto
                                    ? msCrypto.getRandomValues(
                                        new Uint8Array(t)
                                      )
                                    : o(new Uint8Array(t), t)
                                  : o(new Array(t), t));
                            (n[6] = (79 & n[6]) | 64),
                              (n[8] = (191 & n[8]) | 128);
                            for (var a = '', i = 0; i < e; ++i) {
                              var r = n[i];
                              (4 !== i && 6 !== i && 8 !== i) || (a += '-'),
                                r < 16 && (a += '0'),
                                (a += r.toString(16).toLowerCase());
                            }
                            return a;
                          }
                        })()
                      : WeakMap
                  )();
                function m(e, t, n) {
                  var a = f.get(e);
                  if (C(a)) {
                    if (!n) return;
                    (a = new p()), f.set(e, a);
                  }
                  var i = a.get(t);
                  if (C(i)) {
                    if (!n) return;
                    (i = new p()), a.set(t, i);
                  }
                  return i;
                }
                function h(e, t, n) {
                  if (g(e, t, n)) return !0;
                  var a = j(t);
                  return !$(a) && h(e, a, n);
                }
                function g(e, t, n) {
                  var a = m(t, n, !1);
                  return !C(a) && !!a.has(e);
                }
                function y(e, t, n) {
                  if (g(e, t, n)) return v(e, t, n);
                  var a = j(t);
                  return $(a) ? void 0 : y(e, a, n);
                }
                function v(e, t, n) {
                  var a = m(t, n, !1);
                  if (!C(a)) return a.get(e);
                }
                function b(e, t, n, a) {
                  m(n, a, !0).set(e, t);
                }
                function S(e, t) {
                  var n = k(e, t),
                    a = j(e);
                  if (null === a) return n;
                  var i = S(a, t);
                  if (i.length <= 0) return n;
                  if (n.length <= 0) return i;
                  for (
                    var r = new d(), o = [], s = 0, l = n;
                    s < l.length;
                    s++
                  ) {
                    var c = l[s];
                    r.has(c) || (r.add(c), o.push(c));
                  }
                  for (var u = 0, p = i; u < p.length; u++)
                    (c = p[u]), r.has(c) || (r.add(c), o.push(c));
                  return o;
                }
                function k(e, t) {
                  var n = [],
                    a = m(e, t, !1);
                  if (C(a)) return n;
                  for (
                    var r = (function (e) {
                        var t = N(e, i);
                        if (!R(t)) throw new TypeError();
                        var n = t.call(e);
                        if (!x(n)) throw new TypeError();
                        return n;
                      })(a.keys()),
                      o = 0;
                    ;

                  ) {
                    var s = E(r);
                    if (!s) return (n.length = o), n;
                    var l = s.value;
                    try {
                      n[o] = l;
                    } catch (e) {
                      try {
                        I(r);
                      } finally {
                        throw e;
                      }
                    }
                    o++;
                  }
                }
                function w(e) {
                  if (null === e) return 1;
                  switch (typeof e) {
                    case 'undefined':
                      return 0;
                    case 'boolean':
                      return 2;
                    case 'string':
                      return 3;
                    case 'symbol':
                      return 4;
                    case 'number':
                      return 5;
                    case 'object':
                      return null === e ? 1 : 6;
                    default:
                      return 6;
                  }
                }
                function C(e) {
                  return void 0 === e;
                }
                function $(e) {
                  return null === e;
                }
                function x(e) {
                  return 'object' == typeof e
                    ? null !== e
                    : 'function' == typeof e;
                }
                function O(e, t) {
                  switch (w(e)) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                      return e;
                  }
                  var n = 3 === t ? 'string' : 5 === t ? 'number' : 'default',
                    i = N(e, a);
                  if (void 0 !== i) {
                    var r = i.call(e, n);
                    if (x(r)) throw new TypeError();
                    return r;
                  }
                  return (function (e, t) {
                    if ('string' === t) {
                      var n = e.toString;
                      if (R(n) && !x((i = n.call(e)))) return i;
                      if (R((a = e.valueOf)) && !x((i = a.call(e)))) return i;
                    } else {
                      var a;
                      if (R((a = e.valueOf)) && !x((i = a.call(e)))) return i;
                      var i,
                        r = e.toString;
                      if (R(r) && !x((i = r.call(e)))) return i;
                    }
                    throw new TypeError();
                  })(e, 'default' === n ? 'number' : n);
                }
                function T(e) {
                  var t = O(e, 3);
                  return 'symbol' == typeof t
                    ? t
                    : (function (e) {
                        return '' + e;
                      })(t);
                }
                function L(e) {
                  return Array.isArray
                    ? Array.isArray(e)
                    : e instanceof Object
                    ? e instanceof Array
                    : '[object Array]' === Object.prototype.toString.call(e);
                }
                function R(e) {
                  return 'function' == typeof e;
                }
                function P(e) {
                  return 'function' == typeof e;
                }
                function N(e, t) {
                  var n = e[t];
                  if (null != n) {
                    if (!R(n)) throw new TypeError();
                    return n;
                  }
                }
                function E(e) {
                  var t = e.next();
                  return !t.done && t;
                }
                function I(e) {
                  var t = e.return;
                  t && t.call(e);
                }
                function j(e) {
                  var t = Object.getPrototypeOf(e);
                  if ('function' != typeof e || e === c) return t;
                  if (t !== c) return t;
                  var n = e.prototype,
                    a = n && Object.getPrototypeOf(n);
                  if (null == a || a === Object.prototype) return t;
                  var i = a.constructor;
                  return 'function' != typeof i || i === e ? t : i;
                }
                function A(e) {
                  return (e.__ = void 0), delete e.__, e;
                }
                e('decorate', function (e, t, n, a) {
                  if (C(n)) {
                    if (!L(e)) throw new TypeError();
                    if (!P(t)) throw new TypeError();
                    return (function (e, t) {
                      for (var n = e.length - 1; n >= 0; --n) {
                        var a = (0, e[n])(t);
                        if (!C(a) && !$(a)) {
                          if (!P(a)) throw new TypeError();
                          t = a;
                        }
                      }
                      return t;
                    })(e, t);
                  }
                  if (!L(e)) throw new TypeError();
                  if (!x(t)) throw new TypeError();
                  if (!x(a) && !C(a) && !$(a)) throw new TypeError();
                  return (
                    $(a) && (a = void 0),
                    (function (e, t, n, a) {
                      for (var i = e.length - 1; i >= 0; --i) {
                        var r = (0, e[i])(t, n, a);
                        if (!C(r) && !$(r)) {
                          if (!x(r)) throw new TypeError();
                          a = r;
                        }
                      }
                      return a;
                    })(e, t, (n = T(n)), a)
                  );
                }),
                  e('metadata', function (e, t) {
                    return function (n, a) {
                      if (!x(n)) throw new TypeError();
                      if (
                        !C(a) &&
                        !(function (e) {
                          switch (w(e)) {
                            case 3:
                            case 4:
                              return !0;
                            default:
                              return !1;
                          }
                        })(a)
                      )
                        throw new TypeError();
                      b(e, t, n, a);
                    };
                  }),
                  e('defineMetadata', function (e, t, n, a) {
                    if (!x(n)) throw new TypeError();
                    return C(a) || (a = T(a)), b(e, t, n, a);
                  }),
                  e('hasMetadata', function (e, t, n) {
                    if (!x(t)) throw new TypeError();
                    return C(n) || (n = T(n)), h(e, t, n);
                  }),
                  e('hasOwnMetadata', function (e, t, n) {
                    if (!x(t)) throw new TypeError();
                    return C(n) || (n = T(n)), g(e, t, n);
                  }),
                  e('getMetadata', function (e, t, n) {
                    if (!x(t)) throw new TypeError();
                    return C(n) || (n = T(n)), y(e, t, n);
                  }),
                  e('getOwnMetadata', function (e, t, n) {
                    if (!x(t)) throw new TypeError();
                    return C(n) || (n = T(n)), v(e, t, n);
                  }),
                  e('getMetadataKeys', function (e, t) {
                    if (!x(e)) throw new TypeError();
                    return C(t) || (t = T(t)), S(e, t);
                  }),
                  e('getOwnMetadataKeys', function (e, t) {
                    if (!x(e)) throw new TypeError();
                    return C(t) || (t = T(t)), k(e, t);
                  }),
                  e('deleteMetadata', function (e, t, n) {
                    if (!x(t)) throw new TypeError();
                    C(n) || (n = T(n));
                    var a = m(t, n, !1);
                    if (C(a)) return !1;
                    if (!a.delete(e)) return !1;
                    if (a.size > 0) return !0;
                    var i = f.get(t);
                    return i.delete(n), i.size > 0 || f.delete(t), !0;
                  });
              })(i);
          })();
        })(a || (a = {}));
      },
    },
    t = {};
  function n(a) {
    var i = t[a];
    if (void 0 !== i) return i.exports;
    var r = (t[a] = { exports: {} });
    return e[a](r, r.exports, n), r.exports;
  }
  (n.d = (e, t) => {
    for (var a in t)
      n.o(t, a) &&
        !n.o(e, a) &&
        Object.defineProperty(e, a, { enumerable: !0, get: t[a] });
  }),
    (n.g = (function () {
      if ('object' == typeof globalThis) return globalThis;
      try {
        return this || new Function('return this')();
      } catch (e) {
        if ('object' == typeof window) return window;
      }
    })()),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    });
  var a = {};
  (() => {
    'use strict';
    var e;
    n.r(a),
      n.d(a, {
        FinanceDetailsComponent: () => Mt,
        LegalComponent: () => xt,
        PaymentMethodsComponent: () => wt,
        PriceTextComponent: () => Bt,
        SubmitButtonComponent: () => yt,
        TextComponent: () => ht,
        headlessCheckout: () => rn,
      }),
      n(660),
      (function (e) {
        (e[(e.Transient = 0)] = 'Transient'),
          (e[(e.Singleton = 1)] = 'Singleton'),
          (e[(e.ResolutionScoped = 2)] = 'ResolutionScoped'),
          (e[(e.ContainerScoped = 3)] = 'ContainerScoped');
      })(e || (e = {}));
    const t = e;
    var i = function (e, t) {
      return (
        (i =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (e, t) {
              e.__proto__ = t;
            }) ||
          function (e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
          }),
        i(e, t)
      );
    };
    function r(e, t) {
      function n() {
        this.constructor = e;
      }
      i(e, t),
        (e.prototype =
          null === t
            ? Object.create(t)
            : ((n.prototype = t.prototype), new n()));
    }
    function o(e, t, n, a) {
      var i,
        r = arguments.length,
        o =
          r < 3
            ? t
            : null === a
            ? (a = Object.getOwnPropertyDescriptor(t, n))
            : a;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        o = Reflect.decorate(e, t, n, a);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (i = e[s]) &&
            (o = (r < 3 ? i(o) : r > 3 ? i(t, n, o) : i(t, n)) || o);
      return r > 3 && o && Object.defineProperty(t, n, o), o;
    }
    function s(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    }
    function l(e, t, n, a) {
      return new (n || (n = Promise))(function (i, r) {
        function o(e) {
          try {
            l(a.next(e));
          } catch (e) {
            r(e);
          }
        }
        function s(e) {
          try {
            l(a.throw(e));
          } catch (e) {
            r(e);
          }
        }
        function l(e) {
          var t;
          e.done
            ? i(e.value)
            : ((t = e.value),
              t instanceof n
                ? t
                : new n(function (e) {
                    e(t);
                  })).then(o, s);
        }
        l((a = a.apply(e, t || [])).next());
      });
    }
    function c(e) {
      var t = 'function' == typeof Symbol && Symbol.iterator,
        n = t && e[t],
        a = 0;
      if (n) return n.call(e);
      if (e && 'number' == typeof e.length)
        return {
          next: function () {
            return (
              e && a >= e.length && (e = void 0),
              { value: e && e[a++], done: !e }
            );
          },
        };
      throw new TypeError(
        t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
      );
    }
    function u(e, t) {
      var n = 'function' == typeof Symbol && e[Symbol.iterator];
      if (!n) return e;
      var a,
        i,
        r = n.call(e),
        o = [];
      try {
        for (; (void 0 === t || t-- > 0) && !(a = r.next()).done; )
          o.push(a.value);
      } catch (e) {
        i = { error: e };
      } finally {
        try {
          a && !a.done && (n = r.return) && n.call(r);
        } finally {
          if (i) throw i.error;
        }
      }
      return o;
    }
    function p() {
      for (var e = [], t = 0; t < arguments.length; t++)
        e = e.concat(u(arguments[t]));
      return e;
    }
    function d(e) {
      return !!e.useClass;
    }
    function f(e) {
      return !!e.useFactory;
    }
    var m = (function () {
      function e(e) {
        (this.wrap = e),
          (this.reflectMethods = [
            'get',
            'getPrototypeOf',
            'setPrototypeOf',
            'getOwnPropertyDescriptor',
            'defineProperty',
            'has',
            'set',
            'deleteProperty',
            'apply',
            'construct',
            'ownKeys',
          ]);
      }
      return (
        (e.prototype.createProxy = function (e) {
          var t,
            n = this,
            a = !1;
          return new Proxy(
            {},
            this.createHandler(function () {
              return a || ((t = e(n.wrap())), (a = !0)), t;
            })
          );
        }),
        (e.prototype.createHandler = function (e) {
          var t = {};
          return (
            this.reflectMethods.forEach(function (n) {
              t[n] = function () {
                for (var t = [], a = 0; a < arguments.length; a++)
                  t[a] = arguments[a];
                return (t[0] = e()), Reflect[n].apply(void 0, p(t));
              };
            }),
            t
          );
        }),
        e
      );
    })();
    function h(e) {
      return 'string' == typeof e || 'symbol' == typeof e;
    }
    function g(e) {
      return 'object' == typeof e && 'token' in e && 'transform' in e;
    }
    function y(e) {
      return !!e.useToken;
    }
    function v(e) {
      return null != e.useValue;
    }
    const b = (function () {
        function e() {
          this._registryMap = new Map();
        }
        return (
          (e.prototype.entries = function () {
            return this._registryMap.entries();
          }),
          (e.prototype.getAll = function (e) {
            return this.ensure(e), this._registryMap.get(e);
          }),
          (e.prototype.get = function (e) {
            this.ensure(e);
            var t = this._registryMap.get(e);
            return t[t.length - 1] || null;
          }),
          (e.prototype.set = function (e, t) {
            this.ensure(e), this._registryMap.get(e).push(t);
          }),
          (e.prototype.setAll = function (e, t) {
            this._registryMap.set(e, t);
          }),
          (e.prototype.has = function (e) {
            return this.ensure(e), this._registryMap.get(e).length > 0;
          }),
          (e.prototype.clear = function () {
            this._registryMap.clear();
          }),
          (e.prototype.ensure = function (e) {
            this._registryMap.has(e) || this._registryMap.set(e, []);
          }),
          e
        );
      })(),
      S = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return r(t, e), t;
      })(b),
      k = function () {
        this.scopedResolutions = new Map();
      };
    var w = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return r(t, e), t;
      })(b),
      C = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return r(t, e), t;
      })(b);
    const $ = function () {
      (this.preResolution = new w()), (this.postResolution = new C());
    };
    var x = new Map(),
      O = (function () {
        function e(e) {
          (this.parent = e),
            (this._registry = new S()),
            (this.interceptors = new $()),
            (this.disposed = !1),
            (this.disposables = new Set());
        }
        return (
          (e.prototype.register = function (e, n, a) {
            var i;
            if (
              (void 0 === a && (a = { lifecycle: t.Transient }),
              this.ensureNotDisposed(),
              (i = (function (e) {
                return d(e) || v(e) || y(e) || f(e);
              })(n)
                ? n
                : { useClass: n }),
              y(i))
            )
              for (var r = [e], o = i; null != o; ) {
                var s = o.useToken;
                if (r.includes(s))
                  throw new Error(
                    'Token registration cycle detected! ' +
                      p(r, [s]).join(' -> ')
                  );
                r.push(s);
                var l = this._registry.get(s);
                o = l && y(l.provider) ? l.provider : null;
              }
            if (
              (a.lifecycle === t.Singleton ||
                a.lifecycle == t.ContainerScoped ||
                a.lifecycle == t.ResolutionScoped) &&
              (v(i) || f(i))
            )
              throw new Error(
                'Cannot use lifecycle "' +
                  t[a.lifecycle] +
                  '" with ValueProviders or FactoryProviders'
              );
            return this._registry.set(e, { provider: i, options: a }), this;
          }),
          (e.prototype.registerType = function (e, t) {
            return (
              this.ensureNotDisposed(),
              h(t)
                ? this.register(e, { useToken: t })
                : this.register(e, { useClass: t })
            );
          }),
          (e.prototype.registerInstance = function (e, t) {
            return this.ensureNotDisposed(), this.register(e, { useValue: t });
          }),
          (e.prototype.registerSingleton = function (e, n) {
            if ((this.ensureNotDisposed(), h(e))) {
              if (h(n))
                return this.register(
                  e,
                  { useToken: n },
                  { lifecycle: t.Singleton }
                );
              if (n)
                return this.register(
                  e,
                  { useClass: n },
                  { lifecycle: t.Singleton }
                );
              throw new Error(
                'Cannot register a type name as a singleton without a "to" token'
              );
            }
            var a = e;
            return (
              n && !h(n) && (a = n),
              this.register(e, { useClass: a }, { lifecycle: t.Singleton })
            );
          }),
          (e.prototype.resolve = function (e, t) {
            void 0 === t && (t = new k()), this.ensureNotDisposed();
            var n = this.getRegistration(e);
            if (!n && h(e))
              throw new Error(
                'Attempted to resolve unregistered dependency token: "' +
                  e.toString() +
                  '"'
              );
            if ((this.executePreResolutionInterceptor(e, 'Single'), n)) {
              var a = this.resolveRegistration(n, t);
              return this.executePostResolutionInterceptor(e, a, 'Single'), a;
            }
            if (
              (function (e) {
                return 'function' == typeof e || e instanceof m;
              })(e)
            )
              return (
                (a = this.construct(e, t)),
                this.executePostResolutionInterceptor(e, a, 'Single'),
                a
              );
            throw new Error(
              'Attempted to construct an undefined constructor. Could mean a circular dependency problem. Try using `delay` function.'
            );
          }),
          (e.prototype.executePreResolutionInterceptor = function (e, t) {
            var n, a;
            if (this.interceptors.preResolution.has(e)) {
              var i = [];
              try {
                for (
                  var r = c(this.interceptors.preResolution.getAll(e)),
                    o = r.next();
                  !o.done;
                  o = r.next()
                ) {
                  var s = o.value;
                  'Once' != s.options.frequency && i.push(s), s.callback(e, t);
                }
              } catch (e) {
                n = { error: e };
              } finally {
                try {
                  o && !o.done && (a = r.return) && a.call(r);
                } finally {
                  if (n) throw n.error;
                }
              }
              this.interceptors.preResolution.setAll(e, i);
            }
          }),
          (e.prototype.executePostResolutionInterceptor = function (e, t, n) {
            var a, i;
            if (this.interceptors.postResolution.has(e)) {
              var r = [];
              try {
                for (
                  var o = c(this.interceptors.postResolution.getAll(e)),
                    s = o.next();
                  !s.done;
                  s = o.next()
                ) {
                  var l = s.value;
                  'Once' != l.options.frequency && r.push(l),
                    l.callback(e, t, n);
                }
              } catch (e) {
                a = { error: e };
              } finally {
                try {
                  s && !s.done && (i = o.return) && i.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              this.interceptors.postResolution.setAll(e, r);
            }
          }),
          (e.prototype.resolveRegistration = function (e, n) {
            if (
              (this.ensureNotDisposed(),
              e.options.lifecycle === t.ResolutionScoped &&
                n.scopedResolutions.has(e))
            )
              return n.scopedResolutions.get(e);
            var a,
              i = e.options.lifecycle === t.Singleton,
              r = e.options.lifecycle === t.ContainerScoped,
              o = i || r;
            return (
              (a = v(e.provider)
                ? e.provider.useValue
                : y(e.provider)
                ? o
                  ? e.instance ||
                    (e.instance = this.resolve(e.provider.useToken, n))
                  : this.resolve(e.provider.useToken, n)
                : d(e.provider)
                ? o
                  ? e.instance ||
                    (e.instance = this.construct(e.provider.useClass, n))
                  : this.construct(e.provider.useClass, n)
                : f(e.provider)
                ? e.provider.useFactory(this)
                : this.construct(e.provider, n)),
              e.options.lifecycle === t.ResolutionScoped &&
                n.scopedResolutions.set(e, a),
              a
            );
          }),
          (e.prototype.resolveAll = function (e, t) {
            var n = this;
            void 0 === t && (t = new k()), this.ensureNotDisposed();
            var a = this.getAllRegistrations(e);
            if (!a && h(e))
              throw new Error(
                'Attempted to resolve unregistered dependency token: "' +
                  e.toString() +
                  '"'
              );
            if ((this.executePreResolutionInterceptor(e, 'All'), a)) {
              var i = a.map(function (e) {
                return n.resolveRegistration(e, t);
              });
              return this.executePostResolutionInterceptor(e, i, 'All'), i;
            }
            var r = [this.construct(e, t)];
            return this.executePostResolutionInterceptor(e, r, 'All'), r;
          }),
          (e.prototype.isRegistered = function (e, t) {
            return (
              void 0 === t && (t = !1),
              this.ensureNotDisposed(),
              this._registry.has(e) ||
                (t && (this.parent || !1) && this.parent.isRegistered(e, !0))
            );
          }),
          (e.prototype.reset = function () {
            this.ensureNotDisposed(),
              this._registry.clear(),
              this.interceptors.preResolution.clear(),
              this.interceptors.postResolution.clear();
          }),
          (e.prototype.clearInstances = function () {
            var e, t;
            this.ensureNotDisposed();
            try {
              for (
                var n = c(this._registry.entries()), a = n.next();
                !a.done;
                a = n.next()
              ) {
                var i = u(a.value, 2),
                  r = i[0],
                  o = i[1];
                this._registry.setAll(
                  r,
                  o
                    .filter(function (e) {
                      return !v(e.provider);
                    })
                    .map(function (e) {
                      return (e.instance = void 0), e;
                    })
                );
              }
            } catch (t) {
              e = { error: t };
            } finally {
              try {
                a && !a.done && (t = n.return) && t.call(n);
              } finally {
                if (e) throw e.error;
              }
            }
          }),
          (e.prototype.createChildContainer = function () {
            var n, a;
            this.ensureNotDisposed();
            var i = new e(this);
            try {
              for (
                var r = c(this._registry.entries()), o = r.next();
                !o.done;
                o = r.next()
              ) {
                var s = u(o.value, 2),
                  l = s[0],
                  p = s[1];
                p.some(function (e) {
                  return e.options.lifecycle === t.ContainerScoped;
                }) &&
                  i._registry.setAll(
                    l,
                    p.map(function (e) {
                      return e.options.lifecycle === t.ContainerScoped
                        ? { provider: e.provider, options: e.options }
                        : e;
                    })
                  );
              }
            } catch (e) {
              n = { error: e };
            } finally {
              try {
                o && !o.done && (a = r.return) && a.call(r);
              } finally {
                if (n) throw n.error;
              }
            }
            return i;
          }),
          (e.prototype.beforeResolution = function (e, t, n) {
            void 0 === n && (n = { frequency: 'Always' }),
              this.interceptors.preResolution.set(e, {
                callback: t,
                options: n,
              });
          }),
          (e.prototype.afterResolution = function (e, t, n) {
            void 0 === n && (n = { frequency: 'Always' }),
              this.interceptors.postResolution.set(e, {
                callback: t,
                options: n,
              });
          }),
          (e.prototype.dispose = function () {
            return l(this, void 0, void 0, function () {
              var e;
              return (function (e, t) {
                var n,
                  a,
                  i,
                  r,
                  o = {
                    label: 0,
                    sent: function () {
                      if (1 & i[0]) throw i[1];
                      return i[1];
                    },
                    trys: [],
                    ops: [],
                  };
                return (
                  (r = { next: s(0), throw: s(1), return: s(2) }),
                  'function' == typeof Symbol &&
                    (r[Symbol.iterator] = function () {
                      return this;
                    }),
                  r
                );
                function s(r) {
                  return function (s) {
                    return (function (r) {
                      if (n)
                        throw new TypeError('Generator is already executing.');
                      for (; o; )
                        try {
                          if (
                            ((n = 1),
                            a &&
                              (i =
                                2 & r[0]
                                  ? a.return
                                  : r[0]
                                  ? a.throw || ((i = a.return) && i.call(a), 0)
                                  : a.next) &&
                              !(i = i.call(a, r[1])).done)
                          )
                            return i;
                          switch (
                            ((a = 0), i && (r = [2 & r[0], i.value]), r[0])
                          ) {
                            case 0:
                            case 1:
                              i = r;
                              break;
                            case 4:
                              return o.label++, { value: r[1], done: !1 };
                            case 5:
                              o.label++, (a = r[1]), (r = [0]);
                              continue;
                            case 7:
                              (r = o.ops.pop()), o.trys.pop();
                              continue;
                            default:
                              if (
                                !(
                                  (i =
                                    (i = o.trys).length > 0 &&
                                    i[i.length - 1]) ||
                                  (6 !== r[0] && 2 !== r[0])
                                )
                              ) {
                                o = 0;
                                continue;
                              }
                              if (
                                3 === r[0] &&
                                (!i || (r[1] > i[0] && r[1] < i[3]))
                              ) {
                                o.label = r[1];
                                break;
                              }
                              if (6 === r[0] && o.label < i[1]) {
                                (o.label = i[1]), (i = r);
                                break;
                              }
                              if (i && o.label < i[2]) {
                                (o.label = i[2]), o.ops.push(r);
                                break;
                              }
                              i[2] && o.ops.pop(), o.trys.pop();
                              continue;
                          }
                          r = t.call(e, o);
                        } catch (e) {
                          (r = [6, e]), (a = 0);
                        } finally {
                          n = i = 0;
                        }
                      if (5 & r[0]) throw r[1];
                      return { value: r[0] ? r[1] : void 0, done: !0 };
                    })([r, s]);
                  };
                }
              })(this, function (t) {
                switch (t.label) {
                  case 0:
                    return (
                      (this.disposed = !0),
                      (e = []),
                      this.disposables.forEach(function (t) {
                        var n = t.dispose();
                        n && e.push(n);
                      }),
                      [4, Promise.all(e)]
                    );
                  case 1:
                    return t.sent(), [2];
                }
              });
            });
          }),
          (e.prototype.getRegistration = function (e) {
            return this.isRegistered(e)
              ? this._registry.get(e)
              : this.parent
              ? this.parent.getRegistration(e)
              : null;
          }),
          (e.prototype.getAllRegistrations = function (e) {
            return this.isRegistered(e)
              ? this._registry.getAll(e)
              : this.parent
              ? this.parent.getAllRegistrations(e)
              : null;
          }),
          (e.prototype.construct = function (e, t) {
            var n = this;
            if (e instanceof m)
              return e.createProxy(function (e) {
                return n.resolve(e, t);
              });
            var a,
              i = (function () {
                var a = x.get(e);
                if (!a || 0 === a.length) {
                  if (0 === e.length) return new e();
                  throw new Error('TypeInfo not known for "' + e.name + '"');
                }
                var i = a.map(n.resolveParams(t, e));
                return new (e.bind.apply(e, p([void 0], i)))();
              })();
            return (
              'function' != typeof (a = i).dispose ||
                a.dispose.length > 0 ||
                this.disposables.add(i),
              i
            );
          }),
          (e.prototype.resolveParams = function (e, t) {
            var n = this;
            return function (a, i) {
              var r, o, s, l;
              try {
                return 'object' == typeof (l = a) &&
                  'token' in l &&
                  'multiple' in l
                  ? g(a)
                    ? a.multiple
                      ? (r = n.resolve(a.transform)).transform.apply(
                          r,
                          p([n.resolveAll(a.token)], a.transformArgs)
                        )
                      : (o = n.resolve(a.transform)).transform.apply(
                          o,
                          p([n.resolve(a.token, e)], a.transformArgs)
                        )
                    : a.multiple
                    ? n.resolveAll(a.token)
                    : n.resolve(a.token, e)
                  : g(a)
                  ? (s = n.resolve(a.transform, e)).transform.apply(
                      s,
                      p([n.resolve(a.token, e)], a.transformArgs)
                    )
                  : n.resolve(a, e);
              } catch (e) {
                throw new Error(
                  (function (e, t, n) {
                    var a,
                      i,
                      r,
                      o,
                      s = u(
                        e.toString().match(/constructor\(([\w, ]+)\)/) || [],
                        2
                      )[1];
                    return (
                      (a =
                        'Cannot inject the dependency ' +
                        ((o = t),
                        (null === (r = void 0 === s ? null : s)
                          ? 'at position #' + o
                          : '"' +
                            r.split(',')[o].trim() +
                            '" at position #' +
                            o) + ' of "') +
                        e.name +
                        '" constructor. Reason:'),
                      void 0 === i && (i = '    '),
                      p(
                        [a],
                        n.message.split('\n').map(function (e) {
                          return i + e;
                        })
                      ).join('\n')
                    );
                  })(t, i, e)
                );
              }
            };
          }),
          (e.prototype.ensureNotDisposed = function () {
            if (this.disposed)
              throw new Error(
                'This container has been disposed, you cannot interact with a disposed container'
              );
          }),
          e
        );
      })(),
      T = new O();
    const L = function () {
      return function (e) {
        (function (e) {
          x.set(
            e,
            (function (e) {
              var t = Reflect.getMetadata('design:paramtypes', e) || [],
                n = Reflect.getOwnMetadata('injectionTokens', e) || {};
              return (
                Object.keys(n).forEach(function (e) {
                  t[+e] = n[e];
                }),
                t
              );
            })(e)
          );
        })(e),
          T.registerSingleton(e);
      };
    };
    if ('undefined' == typeof Reflect || !Reflect.getMetadata)
      throw new Error(
        'tsyringe requires a reflect polyfill. Please add \'import "reflect-metadata"\' to the top of your entry point.'
      );
    function R(e) {
      return (
        (R =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              }),
        R(e)
      );
    }
    function P(e, t) {
      if (!(e instanceof t))
        throw new TypeError('Cannot call a class as a function');
    }
    function N(e) {
      var t = (function (e, t) {
        if ('object' !== R(e) || null === e) return e;
        var n = e[Symbol.toPrimitive];
        if (void 0 !== n) {
          var a = n.call(e, 'string');
          if ('object' !== R(a)) return a;
          throw new TypeError('@@toPrimitive must return a primitive value.');
        }
        return String(e);
      })(e);
      return 'symbol' === R(t) ? t : String(t);
    }
    function E(e, t) {
      for (var n = 0; n < t.length; n++) {
        var a = t[n];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          'value' in a && (a.writable = !0),
          Object.defineProperty(e, N(a.key), a);
      }
    }
    function I(e, t, n) {
      return (
        t && E(e.prototype, t),
        n && E(e, n),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        e
      );
    }
    function j(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return e;
    }
    function A(e, t) {
      return (
        (A = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (e, t) {
              return (e.__proto__ = t), e;
            }),
        A(e, t)
      );
    }
    function z(e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError(
          'Super expression must either be null or a function'
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && A(e, t);
    }
    function q(e, t) {
      if (t && ('object' === R(t) || 'function' == typeof t)) return t;
      if (void 0 !== t)
        throw new TypeError(
          'Derived constructors may only return object or undefined'
        );
      return j(e);
    }
    function D(e) {
      return (
        (D = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            }),
        D(e)
      );
    }
    function H(e, t, n) {
      return (
        (t = N(t)) in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function F(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
      return a;
    }
    function M(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        t &&
          (a = a.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function _(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? M(Object(n), !0).forEach(function (t) {
              H(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : M(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var V = {
        type: 'logger',
        log: function (e) {
          this.output('log', e);
        },
        warn: function (e) {
          this.output('warn', e);
        },
        error: function (e) {
          this.output('error', e);
        },
        output: function (e, t) {
          console && console[e] && console[e].apply(console, t);
        },
      },
      G = new ((function () {
        function e(t) {
          var n =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          P(this, e), this.init(t, n);
        }
        return (
          I(e, [
            {
              key: 'init',
              value: function (e) {
                var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
                (this.prefix = t.prefix || 'i18next:'),
                  (this.logger = e || V),
                  (this.options = t),
                  (this.debug = t.debug);
              },
            },
            {
              key: 'setDebug',
              value: function (e) {
                this.debug = e;
              },
            },
            {
              key: 'log',
              value: function () {
                for (
                  var e = arguments.length, t = new Array(e), n = 0;
                  n < e;
                  n++
                )
                  t[n] = arguments[n];
                return this.forward(t, 'log', '', !0);
              },
            },
            {
              key: 'warn',
              value: function () {
                for (
                  var e = arguments.length, t = new Array(e), n = 0;
                  n < e;
                  n++
                )
                  t[n] = arguments[n];
                return this.forward(t, 'warn', '', !0);
              },
            },
            {
              key: 'error',
              value: function () {
                for (
                  var e = arguments.length, t = new Array(e), n = 0;
                  n < e;
                  n++
                )
                  t[n] = arguments[n];
                return this.forward(t, 'error', '');
              },
            },
            {
              key: 'deprecate',
              value: function () {
                for (
                  var e = arguments.length, t = new Array(e), n = 0;
                  n < e;
                  n++
                )
                  t[n] = arguments[n];
                return this.forward(t, 'warn', 'WARNING DEPRECATED: ', !0);
              },
            },
            {
              key: 'forward',
              value: function (e, t, n, a) {
                return a && !this.debug
                  ? null
                  : ('string' == typeof e[0] &&
                      (e[0] = ''
                        .concat(n)
                        .concat(this.prefix, ' ')
                        .concat(e[0])),
                    this.logger[t](e));
              },
            },
            {
              key: 'create',
              value: function (t) {
                return new e(
                  this.logger,
                  _(
                    _(
                      {},
                      { prefix: ''.concat(this.prefix, ':').concat(t, ':') }
                    ),
                    this.options
                  )
                );
              },
            },
            {
              key: 'clone',
              value: function (t) {
                return (
                  ((t = t || this.options).prefix = t.prefix || this.prefix),
                  new e(this.logger, t)
                );
              },
            },
          ]),
          e
        );
      })())(),
      K = (function () {
        function e() {
          P(this, e), (this.observers = {});
        }
        return (
          I(e, [
            {
              key: 'on',
              value: function (e, t) {
                var n = this;
                return (
                  e.split(' ').forEach(function (e) {
                    (n.observers[e] = n.observers[e] || []),
                      n.observers[e].push(t);
                  }),
                  this
                );
              },
            },
            {
              key: 'off',
              value: function (e, t) {
                this.observers[e] &&
                  (t
                    ? (this.observers[e] = this.observers[e].filter(function (
                        e
                      ) {
                        return e !== t;
                      }))
                    : delete this.observers[e]);
              },
            },
            {
              key: 'emit',
              value: function (e) {
                for (
                  var t = arguments.length,
                    n = new Array(t > 1 ? t - 1 : 0),
                    a = 1;
                  a < t;
                  a++
                )
                  n[a - 1] = arguments[a];
                this.observers[e] &&
                  [].concat(this.observers[e]).forEach(function (e) {
                    e.apply(void 0, n);
                  }),
                  this.observers['*'] &&
                    [].concat(this.observers['*']).forEach(function (t) {
                      t.apply(t, [e].concat(n));
                    });
              },
            },
          ]),
          e
        );
      })();
    function U() {
      var e,
        t,
        n = new Promise(function (n, a) {
          (e = n), (t = a);
        });
      return (n.resolve = e), (n.reject = t), n;
    }
    function B(e) {
      return null == e ? '' : '' + e;
    }
    function W(e, t, n) {
      function a(e) {
        return e && e.indexOf('###') > -1 ? e.replace(/###/g, '.') : e;
      }
      function i() {
        return !e || 'string' == typeof e;
      }
      for (
        var r = 'string' != typeof t ? [].concat(t) : t.split('.');
        r.length > 1;

      ) {
        if (i()) return {};
        var o = a(r.shift());
        !e[o] && n && (e[o] = new n()),
          (e = Object.prototype.hasOwnProperty.call(e, o) ? e[o] : {});
      }
      return i() ? {} : { obj: e, k: a(r.shift()) };
    }
    function J(e, t, n) {
      var a = W(e, t, Object);
      a.obj[a.k] = n;
    }
    function Z(e, t) {
      var n = W(e, t),
        a = n.obj,
        i = n.k;
      if (a) return a[i];
    }
    function Y(e, t, n) {
      for (var a in t)
        '__proto__' !== a &&
          'constructor' !== a &&
          (a in e
            ? 'string' == typeof e[a] ||
              e[a] instanceof String ||
              'string' == typeof t[a] ||
              t[a] instanceof String
              ? n && (e[a] = t[a])
              : Y(e[a], t[a], n)
            : (e[a] = t[a]));
      return e;
    }
    function X(e) {
      return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }
    var Q = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
    };
    function ee(e) {
      return 'string' == typeof e
        ? e.replace(/[&<>"'\/]/g, function (e) {
            return Q[e];
          })
        : e;
    }
    var te =
        'undefined' != typeof window &&
        window.navigator &&
        void 0 === window.navigator.userAgentData &&
        window.navigator.userAgent &&
        window.navigator.userAgent.indexOf('MSIE') > -1,
      ne = [' ', ',', '?', '!', ';'];
    function ae(e, t) {
      var n =
        arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '.';
      if (e) {
        if (e[t]) return e[t];
        for (var a = t.split(n), i = e, r = 0; r < a.length; ++r) {
          if (!i) return;
          if ('string' == typeof i[a[r]] && r + 1 < a.length) return;
          if (void 0 === i[a[r]]) {
            for (
              var o = 2, s = a.slice(r, r + o).join(n), l = i[s];
              void 0 === l && a.length > r + o;

            )
              o++, (l = i[(s = a.slice(r, r + o).join(n))]);
            if (void 0 === l) return;
            if (null === l) return null;
            if (t.endsWith(s)) {
              if ('string' == typeof l) return l;
              if (s && 'string' == typeof l[s]) return l[s];
            }
            var c = a.slice(r + o).join(n);
            return c ? ae(l, c, n) : void 0;
          }
          i = i[a[r]];
        }
        return i;
      }
    }
    function ie(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        t &&
          (a = a.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function re(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? ie(Object(n), !0).forEach(function (t) {
              H(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : ie(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var oe = (function (e) {
        z(i, e);
        var t,
          n,
          a =
            ((t = i),
            (n = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct)
                return !1;
              if (Reflect.construct.sham) return !1;
              if ('function' == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(
                    Reflect.construct(Boolean, [], function () {})
                  ),
                  !0
                );
              } catch (e) {
                return !1;
              }
            })()),
            function () {
              var e,
                a = D(t);
              if (n) {
                var i = D(this).constructor;
                e = Reflect.construct(a, arguments, i);
              } else e = a.apply(this, arguments);
              return q(this, e);
            });
        function i(e) {
          var t,
            n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : { ns: ['translation'], defaultNS: 'translation' };
          return (
            P(this, i),
            (t = a.call(this)),
            te && K.call(j(t)),
            (t.data = e || {}),
            (t.options = n),
            void 0 === t.options.keySeparator && (t.options.keySeparator = '.'),
            void 0 === t.options.ignoreJSONStructure &&
              (t.options.ignoreJSONStructure = !0),
            t
          );
        }
        return (
          I(i, [
            {
              key: 'addNamespaces',
              value: function (e) {
                this.options.ns.indexOf(e) < 0 && this.options.ns.push(e);
              },
            },
            {
              key: 'removeNamespaces',
              value: function (e) {
                var t = this.options.ns.indexOf(e);
                t > -1 && this.options.ns.splice(t, 1);
              },
            },
            {
              key: 'getResource',
              value: function (e, t, n) {
                var a =
                    arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : {},
                  i =
                    void 0 !== a.keySeparator
                      ? a.keySeparator
                      : this.options.keySeparator,
                  r =
                    void 0 !== a.ignoreJSONStructure
                      ? a.ignoreJSONStructure
                      : this.options.ignoreJSONStructure,
                  o = [e, t];
                n && 'string' != typeof n && (o = o.concat(n)),
                  n &&
                    'string' == typeof n &&
                    (o = o.concat(i ? n.split(i) : n)),
                  e.indexOf('.') > -1 && (o = e.split('.'));
                var s = Z(this.data, o);
                return s || !r || 'string' != typeof n
                  ? s
                  : ae(this.data && this.data[e] && this.data[e][t], n, i);
              },
            },
            {
              key: 'addResource',
              value: function (e, t, n, a) {
                var i =
                    arguments.length > 4 && void 0 !== arguments[4]
                      ? arguments[4]
                      : { silent: !1 },
                  r = this.options.keySeparator;
                void 0 === r && (r = '.');
                var o = [e, t];
                n && (o = o.concat(r ? n.split(r) : n)),
                  e.indexOf('.') > -1 && ((a = t), (t = (o = e.split('.'))[1])),
                  this.addNamespaces(t),
                  J(this.data, o, a),
                  i.silent || this.emit('added', e, t, n, a);
              },
            },
            {
              key: 'addResources',
              value: function (e, t, n) {
                var a =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : { silent: !1 };
                for (var i in n)
                  ('string' != typeof n[i] &&
                    '[object Array]' !==
                      Object.prototype.toString.apply(n[i])) ||
                    this.addResource(e, t, i, n[i], { silent: !0 });
                a.silent || this.emit('added', e, t, n);
              },
            },
            {
              key: 'addResourceBundle',
              value: function (e, t, n, a, i) {
                var r =
                    arguments.length > 5 && void 0 !== arguments[5]
                      ? arguments[5]
                      : { silent: !1 },
                  o = [e, t];
                e.indexOf('.') > -1 &&
                  ((a = n), (n = t), (t = (o = e.split('.'))[1])),
                  this.addNamespaces(t);
                var s = Z(this.data, o) || {};
                a ? Y(s, n, i) : (s = re(re({}, s), n)),
                  J(this.data, o, s),
                  r.silent || this.emit('added', e, t, n);
              },
            },
            {
              key: 'removeResourceBundle',
              value: function (e, t) {
                this.hasResourceBundle(e, t) && delete this.data[e][t],
                  this.removeNamespaces(t),
                  this.emit('removed', e, t);
              },
            },
            {
              key: 'hasResourceBundle',
              value: function (e, t) {
                return void 0 !== this.getResource(e, t);
              },
            },
            {
              key: 'getResourceBundle',
              value: function (e, t) {
                return (
                  t || (t = this.options.defaultNS),
                  'v1' === this.options.compatibilityAPI
                    ? re(re({}, {}), this.getResource(e, t))
                    : this.getResource(e, t)
                );
              },
            },
            {
              key: 'getDataByLanguage',
              value: function (e) {
                return this.data[e];
              },
            },
            {
              key: 'hasLanguageSomeTranslations',
              value: function (e) {
                var t = this.getDataByLanguage(e);
                return !!((t && Object.keys(t)) || []).find(function (e) {
                  return t[e] && Object.keys(t[e]).length > 0;
                });
              },
            },
            {
              key: 'toJSON',
              value: function () {
                return this.data;
              },
            },
          ]),
          i
        );
      })(K),
      se = {
        processors: {},
        addPostProcessor: function (e) {
          this.processors[e.name] = e;
        },
        handle: function (e, t, n, a, i) {
          var r = this;
          return (
            e.forEach(function (e) {
              r.processors[e] && (t = r.processors[e].process(t, n, a, i));
            }),
            t
          );
        },
      };
    function le(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        t &&
          (a = a.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function ce(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? le(Object(n), !0).forEach(function (t) {
              H(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : le(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var ue = {},
      pe = (function (e) {
        z(i, e);
        var t,
          n,
          a =
            ((t = i),
            (n = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct)
                return !1;
              if (Reflect.construct.sham) return !1;
              if ('function' == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(
                    Reflect.construct(Boolean, [], function () {})
                  ),
                  !0
                );
              } catch (e) {
                return !1;
              }
            })()),
            function () {
              var e,
                a = D(t);
              if (n) {
                var i = D(this).constructor;
                e = Reflect.construct(a, arguments, i);
              } else e = a.apply(this, arguments);
              return q(this, e);
            });
        function i(e) {
          var t,
            n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (
            P(this, i),
            (t = a.call(this)),
            te && K.call(j(t)),
            (function (e, t, n) {
              [
                'resourceStore',
                'languageUtils',
                'pluralResolver',
                'interpolator',
                'backendConnector',
                'i18nFormat',
                'utils',
              ].forEach(function (e) {
                t[e] && (n[e] = t[e]);
              });
            })(0, e, j(t)),
            (t.options = n),
            void 0 === t.options.keySeparator && (t.options.keySeparator = '.'),
            (t.logger = G.create('translator')),
            t
          );
        }
        return (
          I(
            i,
            [
              {
                key: 'changeLanguage',
                value: function (e) {
                  e && (this.language = e);
                },
              },
              {
                key: 'exists',
                value: function (e) {
                  var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : { interpolation: {} };
                  if (null == e) return !1;
                  var n = this.resolve(e, t);
                  return n && void 0 !== n.res;
                },
              },
              {
                key: 'extractFromKey',
                value: function (e, t) {
                  var n =
                    void 0 !== t.nsSeparator
                      ? t.nsSeparator
                      : this.options.nsSeparator;
                  void 0 === n && (n = ':');
                  var a =
                      void 0 !== t.keySeparator
                        ? t.keySeparator
                        : this.options.keySeparator,
                    i = t.ns || this.options.defaultNS || [],
                    r = n && e.indexOf(n) > -1,
                    o = !(
                      this.options.userDefinedKeySeparator ||
                      t.keySeparator ||
                      this.options.userDefinedNsSeparator ||
                      t.nsSeparator ||
                      (function (e, t, n) {
                        (t = t || ''), (n = n || '');
                        var a = ne.filter(function (e) {
                          return t.indexOf(e) < 0 && n.indexOf(e) < 0;
                        });
                        if (0 === a.length) return !0;
                        var i = new RegExp(
                            '('.concat(
                              a
                                .map(function (e) {
                                  return '?' === e ? '\\?' : e;
                                })
                                .join('|'),
                              ')'
                            )
                          ),
                          r = !i.test(e);
                        if (!r) {
                          var o = e.indexOf(n);
                          o > 0 && !i.test(e.substring(0, o)) && (r = !0);
                        }
                        return r;
                      })(e, n, a)
                    );
                  if (r && !o) {
                    var s = e.match(this.interpolator.nestingRegexp);
                    if (s && s.length > 0) return { key: e, namespaces: i };
                    var l = e.split(n);
                    (n !== a ||
                      (n === a && this.options.ns.indexOf(l[0]) > -1)) &&
                      (i = l.shift()),
                      (e = l.join(a));
                  }
                  return (
                    'string' == typeof i && (i = [i]), { key: e, namespaces: i }
                  );
                },
              },
              {
                key: 'translate',
                value: function (e, t, n) {
                  var a = this;
                  if (
                    ('object' !== R(t) &&
                      this.options.overloadTranslationOptionHandler &&
                      (t =
                        this.options.overloadTranslationOptionHandler(
                          arguments
                        )),
                    'object' === R(t) && (t = ce({}, t)),
                    t || (t = {}),
                    null == e)
                  )
                    return '';
                  Array.isArray(e) || (e = [String(e)]);
                  var r =
                      void 0 !== t.returnDetails
                        ? t.returnDetails
                        : this.options.returnDetails,
                    o =
                      void 0 !== t.keySeparator
                        ? t.keySeparator
                        : this.options.keySeparator,
                    s = this.extractFromKey(e[e.length - 1], t),
                    l = s.key,
                    c = s.namespaces,
                    u = c[c.length - 1],
                    p = t.lng || this.language,
                    d =
                      t.appendNamespaceToCIMode ||
                      this.options.appendNamespaceToCIMode;
                  if (p && 'cimode' === p.toLowerCase()) {
                    if (d) {
                      var f = t.nsSeparator || this.options.nsSeparator;
                      return r
                        ? {
                            res: ''.concat(u).concat(f).concat(l),
                            usedKey: l,
                            exactUsedKey: l,
                            usedLng: p,
                            usedNS: u,
                          }
                        : ''.concat(u).concat(f).concat(l);
                    }
                    return r
                      ? {
                          res: l,
                          usedKey: l,
                          exactUsedKey: l,
                          usedLng: p,
                          usedNS: u,
                        }
                      : l;
                  }
                  var m = this.resolve(e, t),
                    h = m && m.res,
                    g = (m && m.usedKey) || l,
                    y = (m && m.exactUsedKey) || l,
                    v = Object.prototype.toString.apply(h),
                    b =
                      void 0 !== t.joinArrays
                        ? t.joinArrays
                        : this.options.joinArrays,
                    S = !this.i18nFormat || this.i18nFormat.handleAsObject;
                  if (
                    S &&
                    h &&
                    'string' != typeof h &&
                    'boolean' != typeof h &&
                    'number' != typeof h &&
                    [
                      '[object Number]',
                      '[object Function]',
                      '[object RegExp]',
                    ].indexOf(v) < 0 &&
                    ('string' != typeof b || '[object Array]' !== v)
                  ) {
                    if (!t.returnObjects && !this.options.returnObjects) {
                      this.options.returnedObjectHandler ||
                        this.logger.warn(
                          'accessing an object - but returnObjects options is not enabled!'
                        );
                      var k = this.options.returnedObjectHandler
                        ? this.options.returnedObjectHandler(
                            g,
                            h,
                            ce(ce({}, t), {}, { ns: c })
                          )
                        : "key '"
                            .concat(l, ' (')
                            .concat(
                              this.language,
                              ")' returned an object instead of string."
                            );
                      return r ? ((m.res = k), m) : k;
                    }
                    if (o) {
                      var w = '[object Array]' === v,
                        C = w ? [] : {},
                        $ = w ? y : g;
                      for (var x in h)
                        if (Object.prototype.hasOwnProperty.call(h, x)) {
                          var O = ''.concat($).concat(o).concat(x);
                          (C[x] = this.translate(
                            O,
                            ce(ce({}, t), { joinArrays: !1, ns: c })
                          )),
                            C[x] === O && (C[x] = h[x]);
                        }
                      h = C;
                    }
                  } else if (
                    S &&
                    'string' == typeof b &&
                    '[object Array]' === v
                  )
                    (h = h.join(b)) && (h = this.extendTranslation(h, e, t, n));
                  else {
                    var T = !1,
                      L = !1,
                      P = void 0 !== t.count && 'string' != typeof t.count,
                      N = i.hasDefaultValue(t),
                      E = P ? this.pluralResolver.getSuffix(p, t.count, t) : '',
                      I = t['defaultValue'.concat(E)] || t.defaultValue;
                    !this.isValidLookup(h) && N && ((T = !0), (h = I)),
                      this.isValidLookup(h) || ((L = !0), (h = l));
                    var j =
                        (t.missingKeyNoValueFallbackToKey ||
                          this.options.missingKeyNoValueFallbackToKey) &&
                        L
                          ? void 0
                          : h,
                      A = N && I !== h && this.options.updateMissing;
                    if (L || T || A) {
                      if (
                        (this.logger.log(
                          A ? 'updateKey' : 'missingKey',
                          p,
                          u,
                          l,
                          A ? I : h
                        ),
                        o)
                      ) {
                        var z = this.resolve(
                          l,
                          ce(ce({}, t), {}, { keySeparator: !1 })
                        );
                        z &&
                          z.res &&
                          this.logger.warn(
                            'Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.'
                          );
                      }
                      var q = [],
                        D = this.languageUtils.getFallbackCodes(
                          this.options.fallbackLng,
                          t.lng || this.language
                        );
                      if (
                        'fallback' === this.options.saveMissingTo &&
                        D &&
                        D[0]
                      )
                        for (var H = 0; H < D.length; H++) q.push(D[H]);
                      else
                        'all' === this.options.saveMissingTo
                          ? (q = this.languageUtils.toResolveHierarchy(
                              t.lng || this.language
                            ))
                          : q.push(t.lng || this.language);
                      var F = function (e, n, i) {
                        var r = N && i !== h ? i : j;
                        a.options.missingKeyHandler
                          ? a.options.missingKeyHandler(e, u, n, r, A, t)
                          : a.backendConnector &&
                            a.backendConnector.saveMissing &&
                            a.backendConnector.saveMissing(e, u, n, r, A, t),
                          a.emit('missingKey', e, u, n, h);
                      };
                      this.options.saveMissing &&
                        (this.options.saveMissingPlurals && P
                          ? q.forEach(function (e) {
                              a.pluralResolver
                                .getSuffixes(e, t)
                                .forEach(function (n) {
                                  F(
                                    [e],
                                    l + n,
                                    t['defaultValue'.concat(n)] || I
                                  );
                                });
                            })
                          : F(q, l, I));
                    }
                    (h = this.extendTranslation(h, e, t, m, n)),
                      L &&
                        h === l &&
                        this.options.appendNamespaceToMissingKey &&
                        (h = ''.concat(u, ':').concat(l)),
                      (L || T) &&
                        this.options.parseMissingKeyHandler &&
                        (h =
                          'v1' !== this.options.compatibilityAPI
                            ? this.options.parseMissingKeyHandler(
                                this.options.appendNamespaceToMissingKey
                                  ? ''.concat(u, ':').concat(l)
                                  : l,
                                T ? h : void 0
                              )
                            : this.options.parseMissingKeyHandler(h));
                  }
                  return r ? ((m.res = h), m) : h;
                },
              },
              {
                key: 'extendTranslation',
                value: function (e, t, n, a, i) {
                  var r = this;
                  if (this.i18nFormat && this.i18nFormat.parse)
                    e = this.i18nFormat.parse(
                      e,
                      ce(
                        ce({}, this.options.interpolation.defaultVariables),
                        n
                      ),
                      a.usedLng,
                      a.usedNS,
                      a.usedKey,
                      { resolved: a }
                    );
                  else if (!n.skipInterpolation) {
                    n.interpolation &&
                      this.interpolator.init(
                        ce(ce({}, n), {
                          interpolation: ce(
                            ce({}, this.options.interpolation),
                            n.interpolation
                          ),
                        })
                      );
                    var o,
                      s =
                        'string' == typeof e &&
                        (n &&
                        n.interpolation &&
                        void 0 !== n.interpolation.skipOnVariables
                          ? n.interpolation.skipOnVariables
                          : this.options.interpolation.skipOnVariables);
                    if (s) {
                      var l = e.match(this.interpolator.nestingRegexp);
                      o = l && l.length;
                    }
                    var c =
                      n.replace && 'string' != typeof n.replace ? n.replace : n;
                    if (
                      (this.options.interpolation.defaultVariables &&
                        (c = ce(
                          ce({}, this.options.interpolation.defaultVariables),
                          c
                        )),
                      (e = this.interpolator.interpolate(
                        e,
                        c,
                        n.lng || this.language,
                        n
                      )),
                      s)
                    ) {
                      var u = e.match(this.interpolator.nestingRegexp);
                      o < (u && u.length) && (n.nest = !1);
                    }
                    !n.lng &&
                      'v1' !== this.options.compatibilityAPI &&
                      a &&
                      a.res &&
                      (n.lng = a.usedLng),
                      !1 !== n.nest &&
                        (e = this.interpolator.nest(
                          e,
                          function () {
                            for (
                              var e = arguments.length, a = new Array(e), o = 0;
                              o < e;
                              o++
                            )
                              a[o] = arguments[o];
                            return i && i[0] === a[0] && !n.context
                              ? (r.logger.warn(
                                  'It seems you are nesting recursively key: '
                                    .concat(a[0], ' in key: ')
                                    .concat(t[0])
                                ),
                                null)
                              : r.translate.apply(r, a.concat([t]));
                          },
                          n
                        )),
                      n.interpolation && this.interpolator.reset();
                  }
                  var p = n.postProcess || this.options.postProcess,
                    d = 'string' == typeof p ? [p] : p;
                  return (
                    null != e &&
                      d &&
                      d.length &&
                      !1 !== n.applyPostProcessor &&
                      (e = se.handle(
                        d,
                        e,
                        t,
                        this.options && this.options.postProcessPassResolved
                          ? ce({ i18nResolved: a }, n)
                          : n,
                        this
                      )),
                    e
                  );
                },
              },
              {
                key: 'resolve',
                value: function (e) {
                  var t,
                    n,
                    a,
                    i,
                    r,
                    o = this,
                    s =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {};
                  return (
                    'string' == typeof e && (e = [e]),
                    e.forEach(function (e) {
                      if (!o.isValidLookup(t)) {
                        var l = o.extractFromKey(e, s),
                          c = l.key;
                        n = c;
                        var u = l.namespaces;
                        o.options.fallbackNS &&
                          (u = u.concat(o.options.fallbackNS));
                        var p =
                            void 0 !== s.count && 'string' != typeof s.count,
                          d =
                            p &&
                            !s.ordinal &&
                            0 === s.count &&
                            o.pluralResolver.shouldUseIntlApi(),
                          f =
                            void 0 !== s.context &&
                            ('string' == typeof s.context ||
                              'number' == typeof s.context) &&
                            '' !== s.context,
                          m = s.lngs
                            ? s.lngs
                            : o.languageUtils.toResolveHierarchy(
                                s.lng || o.language,
                                s.fallbackLng
                              );
                        u.forEach(function (e) {
                          o.isValidLookup(t) ||
                            ((r = e),
                            !ue[''.concat(m[0], '-').concat(e)] &&
                              o.utils &&
                              o.utils.hasLoadedNamespace &&
                              !o.utils.hasLoadedNamespace(r) &&
                              ((ue[''.concat(m[0], '-').concat(e)] = !0),
                              o.logger.warn(
                                'key "'
                                  .concat(n, '" for languages "')
                                  .concat(
                                    m.join(', '),
                                    '" won\'t get resolved as namespace "'
                                  )
                                  .concat(r, '" was not yet loaded'),
                                'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!'
                              )),
                            m.forEach(function (n) {
                              if (!o.isValidLookup(t)) {
                                i = n;
                                var r,
                                  l = [c];
                                if (o.i18nFormat && o.i18nFormat.addLookupKeys)
                                  o.i18nFormat.addLookupKeys(l, c, n, e, s);
                                else {
                                  var u;
                                  p &&
                                    (u = o.pluralResolver.getSuffix(
                                      n,
                                      s.count,
                                      s
                                    ));
                                  var m = ''.concat(
                                    o.options.pluralSeparator,
                                    'zero'
                                  );
                                  if (
                                    (p && (l.push(c + u), d && l.push(c + m)),
                                    f)
                                  ) {
                                    var h = ''
                                      .concat(c)
                                      .concat(o.options.contextSeparator)
                                      .concat(s.context);
                                    l.push(h),
                                      p && (l.push(h + u), d && l.push(h + m));
                                  }
                                }
                                for (; (r = l.pop()); )
                                  o.isValidLookup(t) ||
                                    ((a = r), (t = o.getResource(n, e, r, s)));
                              }
                            }));
                        });
                      }
                    }),
                    {
                      res: t,
                      usedKey: n,
                      exactUsedKey: a,
                      usedLng: i,
                      usedNS: r,
                    }
                  );
                },
              },
              {
                key: 'isValidLookup',
                value: function (e) {
                  return !(
                    void 0 === e ||
                    (!this.options.returnNull && null === e) ||
                    (!this.options.returnEmptyString && '' === e)
                  );
                },
              },
              {
                key: 'getResource',
                value: function (e, t, n) {
                  var a =
                    arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : {};
                  return this.i18nFormat && this.i18nFormat.getResource
                    ? this.i18nFormat.getResource(e, t, n, a)
                    : this.resourceStore.getResource(e, t, n, a);
                },
              },
            ],
            [
              {
                key: 'hasDefaultValue',
                value: function (e) {
                  for (var t in e)
                    if (
                      Object.prototype.hasOwnProperty.call(e, t) &&
                      'defaultValue' === t.substring(0, 12) &&
                      void 0 !== e[t]
                    )
                      return !0;
                  return !1;
                },
              },
            ]
          ),
          i
        );
      })(K);
    function de(e) {
      return e.charAt(0).toUpperCase() + e.slice(1);
    }
    var fe = (function () {
        function e(t) {
          P(this, e),
            (this.options = t),
            (this.supportedLngs = this.options.supportedLngs || !1),
            (this.logger = G.create('languageUtils'));
        }
        return (
          I(e, [
            {
              key: 'getScriptPartFromCode',
              value: function (e) {
                if (!e || e.indexOf('-') < 0) return null;
                var t = e.split('-');
                return 2 === t.length
                  ? null
                  : (t.pop(),
                    'x' === t[t.length - 1].toLowerCase()
                      ? null
                      : this.formatLanguageCode(t.join('-')));
              },
            },
            {
              key: 'getLanguagePartFromCode',
              value: function (e) {
                if (!e || e.indexOf('-') < 0) return e;
                var t = e.split('-');
                return this.formatLanguageCode(t[0]);
              },
            },
            {
              key: 'formatLanguageCode',
              value: function (e) {
                if ('string' == typeof e && e.indexOf('-') > -1) {
                  var t = [
                      'hans',
                      'hant',
                      'latn',
                      'cyrl',
                      'cans',
                      'mong',
                      'arab',
                    ],
                    n = e.split('-');
                  return (
                    this.options.lowerCaseLng
                      ? (n = n.map(function (e) {
                          return e.toLowerCase();
                        }))
                      : 2 === n.length
                      ? ((n[0] = n[0].toLowerCase()),
                        (n[1] = n[1].toUpperCase()),
                        t.indexOf(n[1].toLowerCase()) > -1 &&
                          (n[1] = de(n[1].toLowerCase())))
                      : 3 === n.length &&
                        ((n[0] = n[0].toLowerCase()),
                        2 === n[1].length && (n[1] = n[1].toUpperCase()),
                        'sgn' !== n[0] &&
                          2 === n[2].length &&
                          (n[2] = n[2].toUpperCase()),
                        t.indexOf(n[1].toLowerCase()) > -1 &&
                          (n[1] = de(n[1].toLowerCase())),
                        t.indexOf(n[2].toLowerCase()) > -1 &&
                          (n[2] = de(n[2].toLowerCase()))),
                    n.join('-')
                  );
                }
                return this.options.cleanCode || this.options.lowerCaseLng
                  ? e.toLowerCase()
                  : e;
              },
            },
            {
              key: 'isSupportedCode',
              value: function (e) {
                return (
                  ('languageOnly' === this.options.load ||
                    this.options.nonExplicitSupportedLngs) &&
                    (e = this.getLanguagePartFromCode(e)),
                  !this.supportedLngs ||
                    !this.supportedLngs.length ||
                    this.supportedLngs.indexOf(e) > -1
                );
              },
            },
            {
              key: 'getBestMatchFromCodes',
              value: function (e) {
                var t,
                  n = this;
                return e
                  ? (e.forEach(function (e) {
                      if (!t) {
                        var a = n.formatLanguageCode(e);
                        (n.options.supportedLngs && !n.isSupportedCode(a)) ||
                          (t = a);
                      }
                    }),
                    !t &&
                      this.options.supportedLngs &&
                      e.forEach(function (e) {
                        if (!t) {
                          var a = n.getLanguagePartFromCode(e);
                          if (n.isSupportedCode(a)) return (t = a);
                          t = n.options.supportedLngs.find(function (e) {
                            return e === a
                              ? e
                              : e.indexOf('-') < 0 && a.indexOf('-') < 0
                              ? void 0
                              : 0 === e.indexOf(a)
                              ? e
                              : void 0;
                          });
                        }
                      }),
                    t ||
                      (t = this.getFallbackCodes(this.options.fallbackLng)[0]),
                    t)
                  : null;
              },
            },
            {
              key: 'getFallbackCodes',
              value: function (e, t) {
                if (!e) return [];
                if (
                  ('function' == typeof e && (e = e(t)),
                  'string' == typeof e && (e = [e]),
                  '[object Array]' === Object.prototype.toString.apply(e))
                )
                  return e;
                if (!t) return e.default || [];
                var n = e[t];
                return (
                  n || (n = e[this.getScriptPartFromCode(t)]),
                  n || (n = e[this.formatLanguageCode(t)]),
                  n || (n = e[this.getLanguagePartFromCode(t)]),
                  n || (n = e.default),
                  n || []
                );
              },
            },
            {
              key: 'toResolveHierarchy',
              value: function (e, t) {
                var n = this,
                  a = this.getFallbackCodes(
                    t || this.options.fallbackLng || [],
                    e
                  ),
                  i = [],
                  r = function (e) {
                    e &&
                      (n.isSupportedCode(e)
                        ? i.push(e)
                        : n.logger.warn(
                            'rejecting language code not found in supportedLngs: '.concat(
                              e
                            )
                          ));
                  };
                return (
                  'string' == typeof e && e.indexOf('-') > -1
                    ? ('languageOnly' !== this.options.load &&
                        r(this.formatLanguageCode(e)),
                      'languageOnly' !== this.options.load &&
                        'currentOnly' !== this.options.load &&
                        r(this.getScriptPartFromCode(e)),
                      'currentOnly' !== this.options.load &&
                        r(this.getLanguagePartFromCode(e)))
                    : 'string' == typeof e && r(this.formatLanguageCode(e)),
                  a.forEach(function (e) {
                    i.indexOf(e) < 0 && r(n.formatLanguageCode(e));
                  }),
                  i
                );
              },
            },
          ]),
          e
        );
      })(),
      me = [
        {
          lngs: [
            'ach',
            'ak',
            'am',
            'arn',
            'br',
            'fil',
            'gun',
            'ln',
            'mfe',
            'mg',
            'mi',
            'oc',
            'pt',
            'pt-BR',
            'tg',
            'tl',
            'ti',
            'tr',
            'uz',
            'wa',
          ],
          nr: [1, 2],
          fc: 1,
        },
        {
          lngs: [
            'af',
            'an',
            'ast',
            'az',
            'bg',
            'bn',
            'ca',
            'da',
            'de',
            'dev',
            'el',
            'en',
            'eo',
            'es',
            'et',
            'eu',
            'fi',
            'fo',
            'fur',
            'fy',
            'gl',
            'gu',
            'ha',
            'hi',
            'hu',
            'hy',
            'ia',
            'it',
            'kk',
            'kn',
            'ku',
            'lb',
            'mai',
            'ml',
            'mn',
            'mr',
            'nah',
            'nap',
            'nb',
            'ne',
            'nl',
            'nn',
            'no',
            'nso',
            'pa',
            'pap',
            'pms',
            'ps',
            'pt-PT',
            'rm',
            'sco',
            'se',
            'si',
            'so',
            'son',
            'sq',
            'sv',
            'sw',
            'ta',
            'te',
            'tk',
            'ur',
            'yo',
          ],
          nr: [1, 2],
          fc: 2,
        },
        {
          lngs: [
            'ay',
            'bo',
            'cgg',
            'fa',
            'ht',
            'id',
            'ja',
            'jbo',
            'ka',
            'km',
            'ko',
            'ky',
            'lo',
            'ms',
            'sah',
            'su',
            'th',
            'tt',
            'ug',
            'vi',
            'wo',
            'zh',
          ],
          nr: [1],
          fc: 3,
        },
        {
          lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'],
          nr: [1, 2, 5],
          fc: 4,
        },
        { lngs: ['ar'], nr: [0, 1, 2, 3, 11, 100], fc: 5 },
        { lngs: ['cs', 'sk'], nr: [1, 2, 5], fc: 6 },
        { lngs: ['csb', 'pl'], nr: [1, 2, 5], fc: 7 },
        { lngs: ['cy'], nr: [1, 2, 3, 8], fc: 8 },
        { lngs: ['fr'], nr: [1, 2], fc: 9 },
        { lngs: ['ga'], nr: [1, 2, 3, 7, 11], fc: 10 },
        { lngs: ['gd'], nr: [1, 2, 3, 20], fc: 11 },
        { lngs: ['is'], nr: [1, 2], fc: 12 },
        { lngs: ['jv'], nr: [0, 1], fc: 13 },
        { lngs: ['kw'], nr: [1, 2, 3, 4], fc: 14 },
        { lngs: ['lt'], nr: [1, 2, 10], fc: 15 },
        { lngs: ['lv'], nr: [1, 2, 0], fc: 16 },
        { lngs: ['mk'], nr: [1, 2], fc: 17 },
        { lngs: ['mnk'], nr: [0, 1, 2], fc: 18 },
        { lngs: ['mt'], nr: [1, 2, 11, 20], fc: 19 },
        { lngs: ['or'], nr: [2, 1], fc: 2 },
        { lngs: ['ro'], nr: [1, 2, 20], fc: 20 },
        { lngs: ['sl'], nr: [5, 1, 2, 3], fc: 21 },
        { lngs: ['he', 'iw'], nr: [1, 2, 20, 21], fc: 22 },
      ],
      he = {
        1: function (e) {
          return Number(e > 1);
        },
        2: function (e) {
          return Number(1 != e);
        },
        3: function (e) {
          return 0;
        },
        4: function (e) {
          return Number(
            e % 10 == 1 && e % 100 != 11
              ? 0
              : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20)
              ? 1
              : 2
          );
        },
        5: function (e) {
          return Number(
            0 == e
              ? 0
              : 1 == e
              ? 1
              : 2 == e
              ? 2
              : e % 100 >= 3 && e % 100 <= 10
              ? 3
              : e % 100 >= 11
              ? 4
              : 5
          );
        },
        6: function (e) {
          return Number(1 == e ? 0 : e >= 2 && e <= 4 ? 1 : 2);
        },
        7: function (e) {
          return Number(
            1 == e
              ? 0
              : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20)
              ? 1
              : 2
          );
        },
        8: function (e) {
          return Number(1 == e ? 0 : 2 == e ? 1 : 8 != e && 11 != e ? 2 : 3);
        },
        9: function (e) {
          return Number(e >= 2);
        },
        10: function (e) {
          return Number(1 == e ? 0 : 2 == e ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4);
        },
        11: function (e) {
          return Number(
            1 == e || 11 == e
              ? 0
              : 2 == e || 12 == e
              ? 1
              : e > 2 && e < 20
              ? 2
              : 3
          );
        },
        12: function (e) {
          return Number(e % 10 != 1 || e % 100 == 11);
        },
        13: function (e) {
          return Number(0 !== e);
        },
        14: function (e) {
          return Number(1 == e ? 0 : 2 == e ? 1 : 3 == e ? 2 : 3);
        },
        15: function (e) {
          return Number(
            e % 10 == 1 && e % 100 != 11
              ? 0
              : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20)
              ? 1
              : 2
          );
        },
        16: function (e) {
          return Number(e % 10 == 1 && e % 100 != 11 ? 0 : 0 !== e ? 1 : 2);
        },
        17: function (e) {
          return Number(1 == e || (e % 10 == 1 && e % 100 != 11) ? 0 : 1);
        },
        18: function (e) {
          return Number(0 == e ? 0 : 1 == e ? 1 : 2);
        },
        19: function (e) {
          return Number(
            1 == e
              ? 0
              : 0 == e || (e % 100 > 1 && e % 100 < 11)
              ? 1
              : e % 100 > 10 && e % 100 < 20
              ? 2
              : 3
          );
        },
        20: function (e) {
          return Number(
            1 == e ? 0 : 0 == e || (e % 100 > 0 && e % 100 < 20) ? 1 : 2
          );
        },
        21: function (e) {
          return Number(
            e % 100 == 1
              ? 1
              : e % 100 == 2
              ? 2
              : e % 100 == 3 || e % 100 == 4
              ? 3
              : 0
          );
        },
        22: function (e) {
          return Number(
            1 == e ? 0 : 2 == e ? 1 : (e < 0 || e > 10) && e % 10 == 0 ? 2 : 3
          );
        },
      },
      ge = ['v1', 'v2', 'v3'],
      ye = { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 },
      ve = (function () {
        function e(t) {
          var n,
            a =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          P(this, e),
            (this.languageUtils = t),
            (this.options = a),
            (this.logger = G.create('pluralResolver')),
            (this.options.compatibilityJSON &&
              'v4' !== this.options.compatibilityJSON) ||
              ('undefined' != typeof Intl && Intl.PluralRules) ||
              ((this.options.compatibilityJSON = 'v3'),
              this.logger.error(
                'Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.'
              )),
            (this.rules =
              ((n = {}),
              me.forEach(function (e) {
                e.lngs.forEach(function (t) {
                  n[t] = { numbers: e.nr, plurals: he[e.fc] };
                });
              }),
              n));
        }
        return (
          I(e, [
            {
              key: 'addRule',
              value: function (e, t) {
                this.rules[e] = t;
              },
            },
            {
              key: 'getRule',
              value: function (e) {
                var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
                if (this.shouldUseIntlApi())
                  try {
                    return new Intl.PluralRules(e, {
                      type: t.ordinal ? 'ordinal' : 'cardinal',
                    });
                  } catch (e) {
                    return;
                  }
                return (
                  this.rules[e] ||
                  this.rules[this.languageUtils.getLanguagePartFromCode(e)]
                );
              },
            },
            {
              key: 'needsPlural',
              value: function (e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n = this.getRule(e, t);
                return this.shouldUseIntlApi()
                  ? n && n.resolvedOptions().pluralCategories.length > 1
                  : n && n.numbers.length > 1;
              },
            },
            {
              key: 'getPluralFormsOfKey',
              value: function (e, t) {
                var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {};
                return this.getSuffixes(e, n).map(function (e) {
                  return ''.concat(t).concat(e);
                });
              },
            },
            {
              key: 'getSuffixes',
              value: function (e) {
                var t = this,
                  n =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  a = this.getRule(e, n);
                return a
                  ? this.shouldUseIntlApi()
                    ? a
                        .resolvedOptions()
                        .pluralCategories.sort(function (e, t) {
                          return ye[e] - ye[t];
                        })
                        .map(function (e) {
                          return ''.concat(t.options.prepend).concat(e);
                        })
                    : a.numbers.map(function (a) {
                        return t.getSuffix(e, a, n);
                      })
                  : [];
              },
            },
            {
              key: 'getSuffix',
              value: function (e, t) {
                var n =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : {},
                  a = this.getRule(e, n);
                return a
                  ? this.shouldUseIntlApi()
                    ? ''.concat(this.options.prepend).concat(a.select(t))
                    : this.getSuffixRetroCompatible(a, t)
                  : (this.logger.warn('no plural rule found for: '.concat(e)),
                    '');
              },
            },
            {
              key: 'getSuffixRetroCompatible',
              value: function (e, t) {
                var n = this,
                  a = e.noAbs ? e.plurals(t) : e.plurals(Math.abs(t)),
                  i = e.numbers[a];
                this.options.simplifyPluralSuffix &&
                  2 === e.numbers.length &&
                  1 === e.numbers[0] &&
                  (2 === i ? (i = 'plural') : 1 === i && (i = ''));
                var r = function () {
                  return n.options.prepend && i.toString()
                    ? n.options.prepend + i.toString()
                    : i.toString();
                };
                return 'v1' === this.options.compatibilityJSON
                  ? 1 === i
                    ? ''
                    : 'number' == typeof i
                    ? '_plural_'.concat(i.toString())
                    : r()
                  : 'v2' === this.options.compatibilityJSON ||
                    (this.options.simplifyPluralSuffix &&
                      2 === e.numbers.length &&
                      1 === e.numbers[0])
                  ? r()
                  : this.options.prepend && a.toString()
                  ? this.options.prepend + a.toString()
                  : a.toString();
              },
            },
            {
              key: 'shouldUseIntlApi',
              value: function () {
                return !ge.includes(this.options.compatibilityJSON);
              },
            },
          ]),
          e
        );
      })();
    function be(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        t &&
          (a = a.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function Se(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? be(Object(n), !0).forEach(function (t) {
              H(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : be(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function ke(e, t, n) {
      var a =
          arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : '.',
        i = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
        r = (function (e, t, n) {
          var a = Z(e, n);
          return void 0 !== a ? a : Z(t, n);
        })(e, t, n);
      return (
        !r &&
          i &&
          'string' == typeof n &&
          void 0 === (r = ae(e, n, a)) &&
          (r = ae(t, n, a)),
        r
      );
    }
    var we = (function () {
      function e() {
        var t =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        P(this, e),
          (this.logger = G.create('interpolator')),
          (this.options = t),
          (this.format =
            (t.interpolation && t.interpolation.format) ||
            function (e) {
              return e;
            }),
          this.init(t);
      }
      return (
        I(e, [
          {
            key: 'init',
            value: function () {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
              e.interpolation || (e.interpolation = { escapeValue: !0 });
              var t = e.interpolation;
              (this.escape = void 0 !== t.escape ? t.escape : ee),
                (this.escapeValue = void 0 === t.escapeValue || t.escapeValue),
                (this.useRawValueToEscape =
                  void 0 !== t.useRawValueToEscape && t.useRawValueToEscape),
                (this.prefix = t.prefix
                  ? X(t.prefix)
                  : t.prefixEscaped || '{{'),
                (this.suffix = t.suffix
                  ? X(t.suffix)
                  : t.suffixEscaped || '}}'),
                (this.formatSeparator = t.formatSeparator
                  ? t.formatSeparator
                  : t.formatSeparator || ','),
                (this.unescapePrefix = t.unescapeSuffix
                  ? ''
                  : t.unescapePrefix || '-'),
                (this.unescapeSuffix = this.unescapePrefix
                  ? ''
                  : t.unescapeSuffix || ''),
                (this.nestingPrefix = t.nestingPrefix
                  ? X(t.nestingPrefix)
                  : t.nestingPrefixEscaped || X('$t(')),
                (this.nestingSuffix = t.nestingSuffix
                  ? X(t.nestingSuffix)
                  : t.nestingSuffixEscaped || X(')')),
                (this.nestingOptionsSeparator = t.nestingOptionsSeparator
                  ? t.nestingOptionsSeparator
                  : t.nestingOptionsSeparator || ','),
                (this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3),
                (this.alwaysFormat =
                  void 0 !== t.alwaysFormat && t.alwaysFormat),
                this.resetRegExp();
            },
          },
          {
            key: 'reset',
            value: function () {
              this.options && this.init(this.options);
            },
          },
          {
            key: 'resetRegExp',
            value: function () {
              var e = ''.concat(this.prefix, '(.+?)').concat(this.suffix);
              this.regexp = new RegExp(e, 'g');
              var t = ''
                .concat(this.prefix)
                .concat(this.unescapePrefix, '(.+?)')
                .concat(this.unescapeSuffix)
                .concat(this.suffix);
              this.regexpUnescape = new RegExp(t, 'g');
              var n = ''
                .concat(this.nestingPrefix, '(.+?)')
                .concat(this.nestingSuffix);
              this.nestingRegexp = new RegExp(n, 'g');
            },
          },
          {
            key: 'interpolate',
            value: function (e, t, n, a) {
              var i,
                r,
                o,
                s = this,
                l =
                  (this.options &&
                    this.options.interpolation &&
                    this.options.interpolation.defaultVariables) ||
                  {};
              function c(e) {
                return e.replace(/\$/g, '$$$$');
              }
              var u = function (e) {
                if (e.indexOf(s.formatSeparator) < 0) {
                  var i = ke(
                    t,
                    l,
                    e,
                    s.options.keySeparator,
                    s.options.ignoreJSONStructure
                  );
                  return s.alwaysFormat
                    ? s.format(
                        i,
                        void 0,
                        n,
                        Se(Se(Se({}, a), t), {}, { interpolationkey: e })
                      )
                    : i;
                }
                var r = e.split(s.formatSeparator),
                  o = r.shift().trim(),
                  c = r.join(s.formatSeparator).trim();
                return s.format(
                  ke(
                    t,
                    l,
                    o,
                    s.options.keySeparator,
                    s.options.ignoreJSONStructure
                  ),
                  c,
                  n,
                  Se(Se(Se({}, a), t), {}, { interpolationkey: o })
                );
              };
              this.resetRegExp();
              var p =
                  (a && a.missingInterpolationHandler) ||
                  this.options.missingInterpolationHandler,
                d =
                  a &&
                  a.interpolation &&
                  void 0 !== a.interpolation.skipOnVariables
                    ? a.interpolation.skipOnVariables
                    : this.options.interpolation.skipOnVariables;
              return (
                [
                  {
                    regex: this.regexpUnescape,
                    safeValue: function (e) {
                      return c(e);
                    },
                  },
                  {
                    regex: this.regexp,
                    safeValue: function (e) {
                      return s.escapeValue ? c(s.escape(e)) : c(e);
                    },
                  },
                ].forEach(function (t) {
                  for (o = 0; (i = t.regex.exec(e)); ) {
                    var n = i[1].trim();
                    if (void 0 === (r = u(n)))
                      if ('function' == typeof p) {
                        var l = p(e, i, a);
                        r = 'string' == typeof l ? l : '';
                      } else if (
                        a &&
                        Object.prototype.hasOwnProperty.call(a, n)
                      )
                        r = '';
                      else {
                        if (d) {
                          r = i[0];
                          continue;
                        }
                        s.logger.warn(
                          'missed to pass in variable '
                            .concat(n, ' for interpolating ')
                            .concat(e)
                        ),
                          (r = '');
                      }
                    else
                      'string' == typeof r ||
                        s.useRawValueToEscape ||
                        (r = B(r));
                    var c = t.safeValue(r);
                    if (
                      ((e = e.replace(i[0], c)),
                      d
                        ? ((t.regex.lastIndex += r.length),
                          (t.regex.lastIndex -= i[0].length))
                        : (t.regex.lastIndex = 0),
                      ++o >= s.maxReplaces)
                    )
                      break;
                  }
                }),
                e
              );
            },
          },
          {
            key: 'nest',
            value: function (e, t) {
              var n,
                a,
                i,
                r = this,
                o =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {};
              function s(e, t) {
                var n = this.nestingOptionsSeparator;
                if (e.indexOf(n) < 0) return e;
                var a = e.split(new RegExp(''.concat(n, '[ ]*{'))),
                  r = '{'.concat(a[1]);
                e = a[0];
                var o = (r = this.interpolate(r, i)).match(/'/g),
                  s = r.match(/"/g);
                ((o && o.length % 2 == 0 && !s) || s.length % 2 != 0) &&
                  (r = r.replace(/'/g, '"'));
                try {
                  (i = JSON.parse(r)), t && (i = Se(Se({}, t), i));
                } catch (t) {
                  return (
                    this.logger.warn(
                      'failed parsing options string in nesting for key '.concat(
                        e
                      ),
                      t
                    ),
                    ''.concat(e).concat(n).concat(r)
                  );
                }
                return delete i.defaultValue, e;
              }
              for (; (n = this.nestingRegexp.exec(e)); ) {
                var l = [];
                ((i =
                  (i = Se({}, o)).replace && 'string' != typeof i.replace
                    ? i.replace
                    : i).applyPostProcessor = !1),
                  delete i.defaultValue;
                var c = !1;
                if (
                  -1 !== n[0].indexOf(this.formatSeparator) &&
                  !/{.*}/.test(n[1])
                ) {
                  var u = n[1].split(this.formatSeparator).map(function (e) {
                    return e.trim();
                  });
                  (n[1] = u.shift()), (l = u), (c = !0);
                }
                if (
                  (a = t(s.call(this, n[1].trim(), i), i)) &&
                  n[0] === e &&
                  'string' != typeof a
                )
                  return a;
                'string' != typeof a && (a = B(a)),
                  a ||
                    (this.logger.warn(
                      'missed to resolve '
                        .concat(n[1], ' for nesting ')
                        .concat(e)
                    ),
                    (a = '')),
                  c &&
                    (a = l.reduce(function (e, t) {
                      return r.format(
                        e,
                        t,
                        o.lng,
                        Se(Se({}, o), {}, { interpolationkey: n[1].trim() })
                      );
                    }, a.trim())),
                  (e = e.replace(n[0], a)),
                  (this.regexp.lastIndex = 0);
              }
              return e;
            },
          },
        ]),
        e
      );
    })();
    function Ce(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        t &&
          (a = a.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function $e(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Ce(Object(n), !0).forEach(function (t) {
              H(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : Ce(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function xe(e) {
      var t = {};
      return function (n, a, i) {
        var r = a + JSON.stringify(i),
          o = t[r];
        return o || ((o = e(a, i)), (t[r] = o)), o(n);
      };
    }
    var Oe = (function () {
      function e() {
        var t =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        P(this, e),
          (this.logger = G.create('formatter')),
          (this.options = t),
          (this.formats = {
            number: xe(function (e, t) {
              var n = new Intl.NumberFormat(e, $e({}, t));
              return function (e) {
                return n.format(e);
              };
            }),
            currency: xe(function (e, t) {
              var n = new Intl.NumberFormat(
                e,
                $e($e({}, t), {}, { style: 'currency' })
              );
              return function (e) {
                return n.format(e);
              };
            }),
            datetime: xe(function (e, t) {
              var n = new Intl.DateTimeFormat(e, $e({}, t));
              return function (e) {
                return n.format(e);
              };
            }),
            relativetime: xe(function (e, t) {
              var n = new Intl.RelativeTimeFormat(e, $e({}, t));
              return function (e) {
                return n.format(e, t.range || 'day');
              };
            }),
            list: xe(function (e, t) {
              var n = new Intl.ListFormat(e, $e({}, t));
              return function (e) {
                return n.format(e);
              };
            }),
          }),
          this.init(t);
      }
      return (
        I(e, [
          {
            key: 'init',
            value: function (e) {
              var t = (
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : { interpolation: {} }
              ).interpolation;
              this.formatSeparator = t.formatSeparator
                ? t.formatSeparator
                : t.formatSeparator || ',';
            },
          },
          {
            key: 'add',
            value: function (e, t) {
              this.formats[e.toLowerCase().trim()] = t;
            },
          },
          {
            key: 'addCached',
            value: function (e, t) {
              this.formats[e.toLowerCase().trim()] = xe(t);
            },
          },
          {
            key: 'format',
            value: function (e, t, n) {
              var a = this,
                i =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : {};
              return t.split(this.formatSeparator).reduce(function (e, t) {
                var r = (function (e) {
                    var t = e.toLowerCase().trim(),
                      n = {};
                    if (e.indexOf('(') > -1) {
                      var a = e.split('(');
                      t = a[0].toLowerCase().trim();
                      var i = a[1].substring(0, a[1].length - 1);
                      'currency' === t && i.indexOf(':') < 0
                        ? n.currency || (n.currency = i.trim())
                        : 'relativetime' === t && i.indexOf(':') < 0
                        ? n.range || (n.range = i.trim())
                        : i.split(';').forEach(function (e) {
                            if (e) {
                              var t =
                                  (function (e) {
                                    if (Array.isArray(e)) return e;
                                  })((r = e.split(':'))) ||
                                  (function (e) {
                                    if (
                                      ('undefined' != typeof Symbol &&
                                        null != e[Symbol.iterator]) ||
                                      null != e['@@iterator']
                                    )
                                      return Array.from(e);
                                  })(r) ||
                                  (function (e, t) {
                                    if (e) {
                                      if ('string' == typeof e) return F(e, t);
                                      var n = Object.prototype.toString
                                        .call(e)
                                        .slice(8, -1);
                                      return (
                                        'Object' === n &&
                                          e.constructor &&
                                          (n = e.constructor.name),
                                        'Map' === n || 'Set' === n
                                          ? Array.from(e)
                                          : 'Arguments' === n ||
                                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                              n
                                            )
                                          ? F(e, t)
                                          : void 0
                                      );
                                    }
                                  })(r) ||
                                  (function () {
                                    throw new TypeError(
                                      'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                                    );
                                  })(),
                                a = t[0],
                                i = t
                                  .slice(1)
                                  .join(':')
                                  .trim()
                                  .replace(/^'+|'+$/g, '');
                              n[a.trim()] || (n[a.trim()] = i),
                                'false' === i && (n[a.trim()] = !1),
                                'true' === i && (n[a.trim()] = !0),
                                isNaN(i) || (n[a.trim()] = parseInt(i, 10));
                            }
                            var r;
                          });
                    }
                    return { formatName: t, formatOptions: n };
                  })(t),
                  o = r.formatName,
                  s = r.formatOptions;
                if (a.formats[o]) {
                  var l = e;
                  try {
                    var c =
                        (i &&
                          i.formatParams &&
                          i.formatParams[i.interpolationkey]) ||
                        {},
                      u = c.locale || c.lng || i.locale || i.lng || n;
                    l = a.formats[o](e, u, $e($e($e({}, s), i), c));
                  } catch (e) {
                    a.logger.warn(e);
                  }
                  return l;
                }
                return (
                  a.logger.warn('there was no format function for '.concat(o)),
                  e
                );
              }, e);
            },
          },
        ]),
        e
      );
    })();
    function Te(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        t &&
          (a = a.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function Le(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Te(Object(n), !0).forEach(function (t) {
              H(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : Te(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var Re = (function (e) {
      z(i, e);
      var t,
        n,
        a =
          ((t = i),
          (n = (function () {
            if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ('function' == typeof Proxy) return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                ),
                !0
              );
            } catch (e) {
              return !1;
            }
          })()),
          function () {
            var e,
              a = D(t);
            if (n) {
              var i = D(this).constructor;
              e = Reflect.construct(a, arguments, i);
            } else e = a.apply(this, arguments);
            return q(this, e);
          });
      function i(e, t, n) {
        var r,
          o =
            arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        return (
          P(this, i),
          (r = a.call(this)),
          te && K.call(j(r)),
          (r.backend = e),
          (r.store = t),
          (r.services = n),
          (r.languageUtils = n.languageUtils),
          (r.options = o),
          (r.logger = G.create('backendConnector')),
          (r.waitingReads = []),
          (r.maxParallelReads = o.maxParallelReads || 10),
          (r.readingCalls = 0),
          (r.maxRetries = o.maxRetries >= 0 ? o.maxRetries : 5),
          (r.retryTimeout = o.retryTimeout >= 1 ? o.retryTimeout : 350),
          (r.state = {}),
          (r.queue = []),
          r.backend && r.backend.init && r.backend.init(n, o.backend, o),
          r
        );
      }
      return (
        I(i, [
          {
            key: 'queueLoad',
            value: function (e, t, n, a) {
              var i = this,
                r = {},
                o = {},
                s = {},
                l = {};
              return (
                e.forEach(function (e) {
                  var a = !0;
                  t.forEach(function (t) {
                    var s = ''.concat(e, '|').concat(t);
                    !n.reload && i.store.hasResourceBundle(e, t)
                      ? (i.state[s] = 2)
                      : i.state[s] < 0 ||
                        (1 === i.state[s]
                          ? void 0 === o[s] && (o[s] = !0)
                          : ((i.state[s] = 1),
                            (a = !1),
                            void 0 === o[s] && (o[s] = !0),
                            void 0 === r[s] && (r[s] = !0),
                            void 0 === l[t] && (l[t] = !0)));
                  }),
                    a || (s[e] = !0);
                }),
                (Object.keys(r).length || Object.keys(o).length) &&
                  this.queue.push({
                    pending: o,
                    pendingCount: Object.keys(o).length,
                    loaded: {},
                    errors: [],
                    callback: a,
                  }),
                {
                  toLoad: Object.keys(r),
                  pending: Object.keys(o),
                  toLoadLanguages: Object.keys(s),
                  toLoadNamespaces: Object.keys(l),
                }
              );
            },
          },
          {
            key: 'loaded',
            value: function (e, t, n) {
              var a = e.split('|'),
                i = a[0],
                r = a[1];
              t && this.emit('failedLoading', i, r, t),
                n && this.store.addResourceBundle(i, r, n),
                (this.state[e] = t ? -1 : 2);
              var o = {};
              this.queue.forEach(function (n) {
                var a, s, l, c, u;
                (a = n.loaded),
                  (s = r),
                  ((c = (l = W(a, [i], Object)).obj)[(u = l.k)] = c[u] || []),
                  c[u].push(s),
                  (function (e, t) {
                    void 0 !== e.pending[t] &&
                      (delete e.pending[t], e.pendingCount--);
                  })(n, e),
                  t && n.errors.push(t),
                  0 !== n.pendingCount ||
                    n.done ||
                    (Object.keys(n.loaded).forEach(function (e) {
                      o[e] || (o[e] = {});
                      var t = n.loaded[e];
                      t.length &&
                        t.forEach(function (t) {
                          void 0 === o[e][t] && (o[e][t] = !0);
                        });
                    }),
                    (n.done = !0),
                    n.errors.length ? n.callback(n.errors) : n.callback());
              }),
                this.emit('loaded', o),
                (this.queue = this.queue.filter(function (e) {
                  return !e.done;
                }));
            },
          },
          {
            key: 'read',
            value: function (e, t, n) {
              var a = this,
                i =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : 0,
                r =
                  arguments.length > 4 && void 0 !== arguments[4]
                    ? arguments[4]
                    : this.retryTimeout,
                o = arguments.length > 5 ? arguments[5] : void 0;
              if (!e.length) return o(null, {});
              if (this.readingCalls >= this.maxParallelReads)
                this.waitingReads.push({
                  lng: e,
                  ns: t,
                  fcName: n,
                  tried: i,
                  wait: r,
                  callback: o,
                });
              else {
                this.readingCalls++;
                var s = function (s, l) {
                    if ((a.readingCalls--, a.waitingReads.length > 0)) {
                      var c = a.waitingReads.shift();
                      a.read(
                        c.lng,
                        c.ns,
                        c.fcName,
                        c.tried,
                        c.wait,
                        c.callback
                      );
                    }
                    s && l && i < a.maxRetries
                      ? setTimeout(function () {
                          a.read.call(a, e, t, n, i + 1, 2 * r, o);
                        }, r)
                      : o(s, l);
                  },
                  l = this.backend[n].bind(this.backend);
                if (2 !== l.length) return l(e, t, s);
                try {
                  var c = l(e, t);
                  c && 'function' == typeof c.then
                    ? c
                        .then(function (e) {
                          return s(null, e);
                        })
                        .catch(s)
                    : s(null, c);
                } catch (e) {
                  s(e);
                }
              }
            },
          },
          {
            key: 'prepareLoading',
            value: function (e, t) {
              var n = this,
                a =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {},
                i = arguments.length > 3 ? arguments[3] : void 0;
              if (!this.backend)
                return (
                  this.logger.warn(
                    'No backend was added via i18next.use. Will not load resources.'
                  ),
                  i && i()
                );
              'string' == typeof e &&
                (e = this.languageUtils.toResolveHierarchy(e)),
                'string' == typeof t && (t = [t]);
              var r = this.queueLoad(e, t, a, i);
              if (!r.toLoad.length) return r.pending.length || i(), null;
              r.toLoad.forEach(function (e) {
                n.loadOne(e);
              });
            },
          },
          {
            key: 'load',
            value: function (e, t, n) {
              this.prepareLoading(e, t, {}, n);
            },
          },
          {
            key: 'reload',
            value: function (e, t, n) {
              this.prepareLoading(e, t, { reload: !0 }, n);
            },
          },
          {
            key: 'loadOne',
            value: function (e) {
              var t = this,
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : '',
                a = e.split('|'),
                i = a[0],
                r = a[1];
              this.read(i, r, 'read', void 0, void 0, function (a, o) {
                a &&
                  t.logger.warn(
                    ''
                      .concat(n, 'loading namespace ')
                      .concat(r, ' for language ')
                      .concat(i, ' failed'),
                    a
                  ),
                  !a &&
                    o &&
                    t.logger.log(
                      ''
                        .concat(n, 'loaded namespace ')
                        .concat(r, ' for language ')
                        .concat(i),
                      o
                    ),
                  t.loaded(e, a, o);
              });
            },
          },
          {
            key: 'saveMissing',
            value: function (e, t, n, a, i) {
              var r =
                  arguments.length > 5 && void 0 !== arguments[5]
                    ? arguments[5]
                    : {},
                o =
                  arguments.length > 6 && void 0 !== arguments[6]
                    ? arguments[6]
                    : function () {};
              if (
                this.services.utils &&
                this.services.utils.hasLoadedNamespace &&
                !this.services.utils.hasLoadedNamespace(t)
              )
                this.logger.warn(
                  'did not save key "'
                    .concat(n, '" as the namespace "')
                    .concat(t, '" was not yet loaded'),
                  'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!'
                );
              else if (null != n && '' !== n) {
                if (this.backend && this.backend.create) {
                  var s = Le(Le({}, r), {}, { isUpdate: i }),
                    l = this.backend.create.bind(this.backend);
                  if (l.length < 6)
                    try {
                      var c;
                      (c = 5 === l.length ? l(e, t, n, a, s) : l(e, t, n, a)) &&
                      'function' == typeof c.then
                        ? c
                            .then(function (e) {
                              return o(null, e);
                            })
                            .catch(o)
                        : o(null, c);
                    } catch (e) {
                      o(e);
                    }
                  else l(e, t, n, a, o, s);
                }
                e && e[0] && this.store.addResource(e[0], t, n, a);
              }
            },
          },
        ]),
        i
      );
    })(K);
    function Pe() {
      return {
        debug: !1,
        initImmediate: !0,
        ns: ['translation'],
        defaultNS: ['translation'],
        fallbackLng: ['dev'],
        fallbackNS: !1,
        supportedLngs: !1,
        nonExplicitSupportedLngs: !1,
        load: 'all',
        preload: !1,
        simplifyPluralSuffix: !0,
        keySeparator: '.',
        nsSeparator: ':',
        pluralSeparator: '_',
        contextSeparator: '_',
        partialBundledLanguages: !1,
        saveMissing: !1,
        updateMissing: !1,
        saveMissingTo: 'fallback',
        saveMissingPlurals: !0,
        missingKeyHandler: !1,
        missingInterpolationHandler: !1,
        postProcess: !1,
        postProcessPassResolved: !1,
        returnNull: !0,
        returnEmptyString: !0,
        returnObjects: !1,
        joinArrays: !1,
        returnedObjectHandler: !1,
        parseMissingKeyHandler: !1,
        appendNamespaceToMissingKey: !1,
        appendNamespaceToCIMode: !1,
        overloadTranslationOptionHandler: function (e) {
          var t = {};
          if (
            ('object' === R(e[1]) && (t = e[1]),
            'string' == typeof e[1] && (t.defaultValue = e[1]),
            'string' == typeof e[2] && (t.tDescription = e[2]),
            'object' === R(e[2]) || 'object' === R(e[3]))
          ) {
            var n = e[3] || e[2];
            Object.keys(n).forEach(function (e) {
              t[e] = n[e];
            });
          }
          return t;
        },
        interpolation: {
          escapeValue: !0,
          format: function (e, t, n, a) {
            return e;
          },
          prefix: '{{',
          suffix: '}}',
          formatSeparator: ',',
          unescapePrefix: '-',
          nestingPrefix: '$t(',
          nestingSuffix: ')',
          nestingOptionsSeparator: ',',
          maxReplaces: 1e3,
          skipOnVariables: !0,
        },
      };
    }
    function Ne(e) {
      return (
        'string' == typeof e.ns && (e.ns = [e.ns]),
        'string' == typeof e.fallbackLng && (e.fallbackLng = [e.fallbackLng]),
        'string' == typeof e.fallbackNS && (e.fallbackNS = [e.fallbackNS]),
        e.supportedLngs &&
          e.supportedLngs.indexOf('cimode') < 0 &&
          (e.supportedLngs = e.supportedLngs.concat(['cimode'])),
        e
      );
    }
    function Ee(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        t &&
          (a = a.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function Ie(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Ee(Object(n), !0).forEach(function (t) {
              H(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : Ee(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function je() {}
    var Ae = (function (e) {
      z(i, e);
      var t,
        n,
        a =
          ((t = i),
          (n = (function () {
            if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ('function' == typeof Proxy) return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                ),
                !0
              );
            } catch (e) {
              return !1;
            }
          })()),
          function () {
            var e,
              a = D(t);
            if (n) {
              var i = D(this).constructor;
              e = Reflect.construct(a, arguments, i);
            } else e = a.apply(this, arguments);
            return q(this, e);
          });
      function i() {
        var e,
          t,
          n =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          r = arguments.length > 1 ? arguments[1] : void 0;
        if (
          (P(this, i),
          (e = a.call(this)),
          te && K.call(j(e)),
          (e.options = Ne(n)),
          (e.services = {}),
          (e.logger = G),
          (e.modules = { external: [] }),
          (t = j(e)),
          Object.getOwnPropertyNames(Object.getPrototypeOf(t)).forEach(
            function (e) {
              'function' == typeof t[e] && (t[e] = t[e].bind(t));
            }
          ),
          r && !e.isInitialized && !n.isClone)
        ) {
          if (!e.options.initImmediate) return e.init(n, r), q(e, j(e));
          setTimeout(function () {
            e.init(n, r);
          }, 0);
        }
        return e;
      }
      return (
        I(i, [
          {
            key: 'init',
            value: function () {
              var e = this,
                t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                n = arguments.length > 1 ? arguments[1] : void 0;
              'function' == typeof t && ((n = t), (t = {})),
                !t.defaultNS &&
                  !1 !== t.defaultNS &&
                  t.ns &&
                  ('string' == typeof t.ns
                    ? (t.defaultNS = t.ns)
                    : t.ns.indexOf('translation') < 0 &&
                      (t.defaultNS = t.ns[0]));
              var a = Pe();
              function i(e) {
                return e ? ('function' == typeof e ? new e() : e) : null;
              }
              if (
                ((this.options = Ie(Ie(Ie({}, a), this.options), Ne(t))),
                'v1' !== this.options.compatibilityAPI &&
                  (this.options.interpolation = Ie(
                    Ie({}, a.interpolation),
                    this.options.interpolation
                  )),
                void 0 !== t.keySeparator &&
                  (this.options.userDefinedKeySeparator = t.keySeparator),
                void 0 !== t.nsSeparator &&
                  (this.options.userDefinedNsSeparator = t.nsSeparator),
                !this.options.isClone)
              ) {
                var r;
                this.modules.logger
                  ? G.init(i(this.modules.logger), this.options)
                  : G.init(null, this.options),
                  this.modules.formatter
                    ? (r = this.modules.formatter)
                    : 'undefined' != typeof Intl && (r = Oe);
                var o = new fe(this.options);
                this.store = new oe(this.options.resources, this.options);
                var s = this.services;
                (s.logger = G),
                  (s.resourceStore = this.store),
                  (s.languageUtils = o),
                  (s.pluralResolver = new ve(o, {
                    prepend: this.options.pluralSeparator,
                    compatibilityJSON: this.options.compatibilityJSON,
                    simplifyPluralSuffix: this.options.simplifyPluralSuffix,
                  })),
                  !r ||
                    (this.options.interpolation.format &&
                      this.options.interpolation.format !==
                        a.interpolation.format) ||
                    ((s.formatter = i(r)),
                    s.formatter.init(s, this.options),
                    (this.options.interpolation.format =
                      s.formatter.format.bind(s.formatter))),
                  (s.interpolator = new we(this.options)),
                  (s.utils = {
                    hasLoadedNamespace: this.hasLoadedNamespace.bind(this),
                  }),
                  (s.backendConnector = new Re(
                    i(this.modules.backend),
                    s.resourceStore,
                    s,
                    this.options
                  )),
                  s.backendConnector.on('*', function (t) {
                    for (
                      var n = arguments.length,
                        a = new Array(n > 1 ? n - 1 : 0),
                        i = 1;
                      i < n;
                      i++
                    )
                      a[i - 1] = arguments[i];
                    e.emit.apply(e, [t].concat(a));
                  }),
                  this.modules.languageDetector &&
                    ((s.languageDetector = i(this.modules.languageDetector)),
                    s.languageDetector.init &&
                      s.languageDetector.init(
                        s,
                        this.options.detection,
                        this.options
                      )),
                  this.modules.i18nFormat &&
                    ((s.i18nFormat = i(this.modules.i18nFormat)),
                    s.i18nFormat.init && s.i18nFormat.init(this)),
                  (this.translator = new pe(this.services, this.options)),
                  this.translator.on('*', function (t) {
                    for (
                      var n = arguments.length,
                        a = new Array(n > 1 ? n - 1 : 0),
                        i = 1;
                      i < n;
                      i++
                    )
                      a[i - 1] = arguments[i];
                    e.emit.apply(e, [t].concat(a));
                  }),
                  this.modules.external.forEach(function (t) {
                    t.init && t.init(e);
                  });
              }
              if (
                ((this.format = this.options.interpolation.format),
                n || (n = je),
                this.options.fallbackLng &&
                  !this.services.languageDetector &&
                  !this.options.lng)
              ) {
                var l = this.services.languageUtils.getFallbackCodes(
                  this.options.fallbackLng
                );
                l.length > 0 && 'dev' !== l[0] && (this.options.lng = l[0]);
              }
              this.services.languageDetector ||
                this.options.lng ||
                this.logger.warn(
                  'init: no languageDetector is used and no lng is defined'
                ),
                [
                  'getResource',
                  'hasResourceBundle',
                  'getResourceBundle',
                  'getDataByLanguage',
                ].forEach(function (t) {
                  e[t] = function () {
                    var n;
                    return (n = e.store)[t].apply(n, arguments);
                  };
                }),
                [
                  'addResource',
                  'addResources',
                  'addResourceBundle',
                  'removeResourceBundle',
                ].forEach(function (t) {
                  e[t] = function () {
                    var n;
                    return (n = e.store)[t].apply(n, arguments), e;
                  };
                });
              var c = U(),
                u = function () {
                  var t = function (t, a) {
                    e.isInitialized &&
                      !e.initializedStoreOnce &&
                      e.logger.warn(
                        'init: i18next is already initialized. You should call init just once!'
                      ),
                      (e.isInitialized = !0),
                      e.options.isClone ||
                        e.logger.log('initialized', e.options),
                      e.emit('initialized', e.options),
                      c.resolve(a),
                      n(t, a);
                  };
                  if (
                    e.languages &&
                    'v1' !== e.options.compatibilityAPI &&
                    !e.isInitialized
                  )
                    return t(null, e.t.bind(e));
                  e.changeLanguage(e.options.lng, t);
                };
              return (
                this.options.resources || !this.options.initImmediate
                  ? u()
                  : setTimeout(u, 0),
                c
              );
            },
          },
          {
            key: 'loadResources',
            value: function (e) {
              var t = this,
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : je,
                a = 'string' == typeof e ? e : this.language;
              if (
                ('function' == typeof e && (n = e),
                !this.options.resources || this.options.partialBundledLanguages)
              ) {
                if (a && 'cimode' === a.toLowerCase()) return n();
                var i = [],
                  r = function (e) {
                    e &&
                      t.services.languageUtils
                        .toResolveHierarchy(e)
                        .forEach(function (e) {
                          i.indexOf(e) < 0 && i.push(e);
                        });
                  };
                a
                  ? r(a)
                  : this.services.languageUtils
                      .getFallbackCodes(this.options.fallbackLng)
                      .forEach(function (e) {
                        return r(e);
                      }),
                  this.options.preload &&
                    this.options.preload.forEach(function (e) {
                      return r(e);
                    }),
                  this.services.backendConnector.load(
                    i,
                    this.options.ns,
                    function (e) {
                      e ||
                        t.resolvedLanguage ||
                        !t.language ||
                        t.setResolvedLanguage(t.language),
                        n(e);
                    }
                  );
              } else n(null);
            },
          },
          {
            key: 'reloadResources',
            value: function (e, t, n) {
              var a = U();
              return (
                e || (e = this.languages),
                t || (t = this.options.ns),
                n || (n = je),
                this.services.backendConnector.reload(e, t, function (e) {
                  a.resolve(), n(e);
                }),
                a
              );
            },
          },
          {
            key: 'use',
            value: function (e) {
              if (!e)
                throw new Error(
                  'You are passing an undefined module! Please check the object you are passing to i18next.use()'
                );
              if (!e.type)
                throw new Error(
                  'You are passing a wrong module! Please check the object you are passing to i18next.use()'
                );
              return (
                'backend' === e.type && (this.modules.backend = e),
                ('logger' === e.type || (e.log && e.warn && e.error)) &&
                  (this.modules.logger = e),
                'languageDetector' === e.type &&
                  (this.modules.languageDetector = e),
                'i18nFormat' === e.type && (this.modules.i18nFormat = e),
                'postProcessor' === e.type && se.addPostProcessor(e),
                'formatter' === e.type && (this.modules.formatter = e),
                '3rdParty' === e.type && this.modules.external.push(e),
                this
              );
            },
          },
          {
            key: 'setResolvedLanguage',
            value: function (e) {
              if (e && this.languages && !(['cimode', 'dev'].indexOf(e) > -1))
                for (var t = 0; t < this.languages.length; t++) {
                  var n = this.languages[t];
                  if (
                    !(['cimode', 'dev'].indexOf(n) > -1) &&
                    this.store.hasLanguageSomeTranslations(n)
                  ) {
                    this.resolvedLanguage = n;
                    break;
                  }
                }
            },
          },
          {
            key: 'changeLanguage',
            value: function (e, t) {
              var n = this;
              this.isLanguageChangingTo = e;
              var a = U();
              this.emit('languageChanging', e);
              var i = function (e) {
                  (n.language = e),
                    (n.languages =
                      n.services.languageUtils.toResolveHierarchy(e)),
                    (n.resolvedLanguage = void 0),
                    n.setResolvedLanguage(e);
                },
                r = function (r) {
                  e || r || !n.services.languageDetector || (r = []);
                  var o =
                    'string' == typeof r
                      ? r
                      : n.services.languageUtils.getBestMatchFromCodes(r);
                  o &&
                    (n.language || i(o),
                    n.translator.language || n.translator.changeLanguage(o),
                    n.services.languageDetector &&
                      n.services.languageDetector.cacheUserLanguage &&
                      n.services.languageDetector.cacheUserLanguage(o)),
                    n.loadResources(o, function (e) {
                      !(function (e, r) {
                        r
                          ? (i(r),
                            n.translator.changeLanguage(r),
                            (n.isLanguageChangingTo = void 0),
                            n.emit('languageChanged', r),
                            n.logger.log('languageChanged', r))
                          : (n.isLanguageChangingTo = void 0),
                          a.resolve(function () {
                            return n.t.apply(n, arguments);
                          }),
                          t &&
                            t(e, function () {
                              return n.t.apply(n, arguments);
                            });
                      })(e, o);
                    });
                };
              return (
                e ||
                !this.services.languageDetector ||
                this.services.languageDetector.async
                  ? !e &&
                    this.services.languageDetector &&
                    this.services.languageDetector.async
                    ? 0 === this.services.languageDetector.detect.length
                      ? this.services.languageDetector.detect().then(r)
                      : this.services.languageDetector.detect(r)
                    : r(e)
                  : r(this.services.languageDetector.detect()),
                a
              );
            },
          },
          {
            key: 'getFixedT',
            value: function (e, t, n) {
              var a = this,
                i = function e(t, i) {
                  var r;
                  if ('object' !== R(i)) {
                    for (
                      var o = arguments.length,
                        s = new Array(o > 2 ? o - 2 : 0),
                        l = 2;
                      l < o;
                      l++
                    )
                      s[l - 2] = arguments[l];
                    r = a.options.overloadTranslationOptionHandler(
                      [t, i].concat(s)
                    );
                  } else r = Ie({}, i);
                  (r.lng = r.lng || e.lng),
                    (r.lngs = r.lngs || e.lngs),
                    (r.ns = r.ns || e.ns),
                    (r.keyPrefix = r.keyPrefix || n || e.keyPrefix);
                  var c,
                    u = a.options.keySeparator || '.';
                  return (
                    (c =
                      r.keyPrefix && Array.isArray(t)
                        ? t.map(function (e) {
                            return ''.concat(r.keyPrefix).concat(u).concat(e);
                          })
                        : r.keyPrefix
                        ? ''.concat(r.keyPrefix).concat(u).concat(t)
                        : t),
                    a.t(c, r)
                  );
                };
              return (
                'string' == typeof e ? (i.lng = e) : (i.lngs = e),
                (i.ns = t),
                (i.keyPrefix = n),
                i
              );
            },
          },
          {
            key: 't',
            value: function () {
              var e;
              return (
                this.translator &&
                (e = this.translator).translate.apply(e, arguments)
              );
            },
          },
          {
            key: 'exists',
            value: function () {
              var e;
              return (
                this.translator &&
                (e = this.translator).exists.apply(e, arguments)
              );
            },
          },
          {
            key: 'setDefaultNamespace',
            value: function (e) {
              this.options.defaultNS = e;
            },
          },
          {
            key: 'hasLoadedNamespace',
            value: function (e) {
              var t = this,
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
              if (!this.isInitialized)
                return (
                  this.logger.warn(
                    'hasLoadedNamespace: i18next was not initialized',
                    this.languages
                  ),
                  !1
                );
              if (!this.languages || !this.languages.length)
                return (
                  this.logger.warn(
                    'hasLoadedNamespace: i18n.languages were undefined or empty',
                    this.languages
                  ),
                  !1
                );
              var a = n.lng || this.resolvedLanguage || this.languages[0],
                i = !!this.options && this.options.fallbackLng,
                r = this.languages[this.languages.length - 1];
              if ('cimode' === a.toLowerCase()) return !0;
              var o = function (e, n) {
                var a =
                  t.services.backendConnector.state[
                    ''.concat(e, '|').concat(n)
                  ];
                return -1 === a || 2 === a;
              };
              if (n.precheck) {
                var s = n.precheck(this, o);
                if (void 0 !== s) return s;
              }
              return !(
                !this.hasResourceBundle(a, e) &&
                this.services.backendConnector.backend &&
                (!this.options.resources ||
                  this.options.partialBundledLanguages) &&
                (!o(a, e) || (i && !o(r, e)))
              );
            },
          },
          {
            key: 'loadNamespaces',
            value: function (e, t) {
              var n = this,
                a = U();
              return this.options.ns
                ? ('string' == typeof e && (e = [e]),
                  e.forEach(function (e) {
                    n.options.ns.indexOf(e) < 0 && n.options.ns.push(e);
                  }),
                  this.loadResources(function (e) {
                    a.resolve(), t && t(e);
                  }),
                  a)
                : (t && t(), Promise.resolve());
            },
          },
          {
            key: 'loadLanguages',
            value: function (e, t) {
              var n = U();
              'string' == typeof e && (e = [e]);
              var a = this.options.preload || [],
                i = e.filter(function (e) {
                  return a.indexOf(e) < 0;
                });
              return i.length
                ? ((this.options.preload = a.concat(i)),
                  this.loadResources(function (e) {
                    n.resolve(), t && t(e);
                  }),
                  n)
                : (t && t(), Promise.resolve());
            },
          },
          {
            key: 'dir',
            value: function (e) {
              if (
                (e ||
                  (e =
                    this.resolvedLanguage ||
                    (this.languages && this.languages.length > 0
                      ? this.languages[0]
                      : this.language)),
                !e)
              )
                return 'rtl';
              var t =
                (this.services && this.services.languageUtils) || new fe(Pe());
              return [
                'ar',
                'shu',
                'sqr',
                'ssh',
                'xaa',
                'yhd',
                'yud',
                'aao',
                'abh',
                'abv',
                'acm',
                'acq',
                'acw',
                'acx',
                'acy',
                'adf',
                'ads',
                'aeb',
                'aec',
                'afb',
                'ajp',
                'apc',
                'apd',
                'arb',
                'arq',
                'ars',
                'ary',
                'arz',
                'auz',
                'avl',
                'ayh',
                'ayl',
                'ayn',
                'ayp',
                'bbz',
                'pga',
                'he',
                'iw',
                'ps',
                'pbt',
                'pbu',
                'pst',
                'prp',
                'prd',
                'ug',
                'ur',
                'ydd',
                'yds',
                'yih',
                'ji',
                'yi',
                'hbo',
                'men',
                'xmn',
                'fa',
                'jpr',
                'peo',
                'pes',
                'prs',
                'dv',
                'sam',
                'ckb',
              ].indexOf(t.getLanguagePartFromCode(e)) > -1 ||
                e.toLowerCase().indexOf('-arab') > 1
                ? 'rtl'
                : 'ltr';
            },
          },
          {
            key: 'cloneInstance',
            value: function () {
              var e = this,
                t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : je,
                a = Ie(Ie(Ie({}, this.options), t), { isClone: !0 }),
                r = new i(a);
              return (
                (void 0 === t.debug && void 0 === t.prefix) ||
                  (r.logger = r.logger.clone(t)),
                ['store', 'services', 'language'].forEach(function (t) {
                  r[t] = e[t];
                }),
                (r.services = Ie({}, this.services)),
                (r.services.utils = {
                  hasLoadedNamespace: r.hasLoadedNamespace.bind(r),
                }),
                (r.translator = new pe(r.services, r.options)),
                r.translator.on('*', function (e) {
                  for (
                    var t = arguments.length,
                      n = new Array(t > 1 ? t - 1 : 0),
                      a = 1;
                    a < t;
                    a++
                  )
                    n[a - 1] = arguments[a];
                  r.emit.apply(r, [e].concat(n));
                }),
                r.init(a, n),
                (r.translator.options = r.options),
                (r.translator.backendConnector.services.utils = {
                  hasLoadedNamespace: r.hasLoadedNamespace.bind(r),
                }),
                r
              );
            },
          },
          {
            key: 'toJSON',
            value: function () {
              return {
                options: this.options,
                store: this.store,
                language: this.language,
                languages: this.languages,
                resolvedLanguage: this.resolvedLanguage,
              };
            },
          },
        ]),
        i
      );
    })(K);
    H(Ae, 'createInstance', function () {
      return new Ae(
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        arguments.length > 1 ? arguments[1] : void 0
      );
    });
    var ze = Ae.createInstance();
    (ze.createInstance = Ae.createInstance), ze.createInstance, ze.dir;
    var qe = ze.init,
      De = (ze.loadResources, ze.reloadResources, ze.use, ze.changeLanguage),
      He = (ze.getFixedT, ze.t);
    ze.exists,
      ze.setDefaultNamespace,
      ze.hasLoadedNamespace,
      ze.loadNamespaces,
      ze.loadLanguages;
    const Fe = JSON.parse(
        '{"ar":{"translation":{"cookie-policy":"سياسة ملفات تعريف الارتباط","finance-details-cart-items-checkout-title":"الشراء من داخل اللعبة","finance-details-cart-items-sales-tax":"ضريبة المبيعات {{percent}}%","finance-details-cart-items-vat":"ضريبة القيمة المضافة{{percent}}%","finance-details-cart-items-vat-ghana":"ضريبة القيمة المضافة، وضريبة التأمين الصحي الوطنية، وضريبة GETFund وضريبة كوفيد-19","finance-details-cart-items-vat-india":"ضرائب البضائع والخدمات{{percent}}%","finance-details-hrk-equal":"يساوي {{value}} كرونا سويدية","finance-details-hrk-exchange-rate":"سعر الصرف: 1 يورو = 7.5345 كرونا سويدية","finance-details-subtotal-details-discount":"خصم","finance-details-subtotal-details-fee":"رسوم نظام الدفع","finance-details-subtotal-details-sales-tax":"ضريبة المبيعات","finance-details-subtotal-details-user-balance":"الرصيد","finance-details-subtotal-details-vat":"ضريبة القيمة المضافة{{percent}}%","finance-details-subtotal-details-vat-ghana":"ضريبة القيمة المضافة، وضريبة التأمين الصحي الوطنية، وضريبة GETFund وضريبة كوفيد-19","finance-details-subtotal-details-vat-india":"ضرائب البضائع والخدمات{{percent}}%","finance-details-subtotal-title":"الإجمالي الفرعي","finance-details-total-details-sales-tax":"شامل ضريبة المبيعات","finance-details-total-details-vat":"شامل {{percent}}% ضريبة قيمة مضافة","finance-details-total-details-vat-ghana":"متضمنة ضريبة القيمة المضافة، وضريبة التأمين الصحي الوطنية، وضريبة GETFund وضريبة كوفيد-19","finance-details-total-details-vat-india":"شامل {{percent}}% ضريبة البضائع والخدمات","finance-details-total-title":"الإجمالي","hello":"مرحبًا بالعالم!","legal":"قانوني","privacy-policy":"سياسة الخصوصية","refund-policy":"سياسة الاسترداد","sctl-indications":"SCTL Indications","secure-connection":"اتصال آمن"}}}'
      ),
      Me = JSON.parse(
        '{"bg":{"translation":{"cookie-policy":"Политика за бисквитките","finance-details-cart-items-checkout-title":"Покупка вътре в играта","finance-details-cart-items-sales-tax":"Данък продажби {{percent}}%","finance-details-cart-items-vat":"ДДС {{percent}}%","finance-details-cart-items-vat-ghana":"ДДС, NHIL, облагане за GETFund и облагане за Covid-19","finance-details-cart-items-vat-india":"ДСУ {{percent}}%","finance-details-hrk-equal":"Равнява се на {{value}} HRK","finance-details-hrk-exchange-rate":"Обменен курс: 1 EUR = 7,5345 HRK","finance-details-subtotal-details-discount":"Отстъпка","finance-details-subtotal-details-fee":"Такса за система за плащане","finance-details-subtotal-details-sales-tax":"Данък продажби","finance-details-subtotal-details-user-balance":"Баланс","finance-details-subtotal-details-vat":"ДДС {{percent}}%","finance-details-subtotal-details-vat-ghana":"ДДС, NHIL, облагане за GETFund и облагане за Covid-19","finance-details-subtotal-details-vat-india":"ДСУ {{percent}}%","finance-details-subtotal-title":"Междинна сума","finance-details-total-details-sales-tax":"С включен данък продажби","finance-details-total-details-vat":"Включително {{percent}}% ДДС","finance-details-total-details-vat-ghana":"С включени ДДС, GST, NHIL, облагане за GETFund и облагане за Covid-19","finance-details-total-details-vat-india":"С включен {{percent}}% ДСУ","finance-details-total-title":"Общо","hello":"Здравей, свят!","legal":"Правни документи","privacy-policy":"Политика за поверителност","refund-policy":"Политика за връщане на средства","sctl-indications":"SCTL Indications","secure-connection":"Сигурна връзка"}}}'
      ),
      _e = JSON.parse(
        '{"cs":{"translation":{"cookie-policy":"Zásady používání cookies","finance-details-cart-items-checkout-title":"Nákup ve hře","finance-details-cart-items-sales-tax":"Daň z obratu {{percent}} %","finance-details-cart-items-vat":"DPH {{percent}} %","finance-details-cart-items-vat-ghana":"DPH, NHIL, odvod GETFund a odvod Covid-19","finance-details-cart-items-vat-india":"GST {{percent}} %","finance-details-hrk-equal":"Což odpovídá {{value}} HRK","finance-details-hrk-exchange-rate":"Směnný kurz: 1 EUR = 7,5345 HRK","finance-details-subtotal-details-discount":"Sleva","finance-details-subtotal-details-fee":"Poplatek za platební systém","finance-details-subtotal-details-sales-tax":"Daň z obratu","finance-details-subtotal-details-user-balance":"Zůstatek","finance-details-subtotal-details-vat":"DPH {{percent}} %","finance-details-subtotal-details-vat-ghana":"DPH, NHIL, odvod GETFund a odvod Covid-19","finance-details-subtotal-details-vat-india":"GST {{percent}} %","finance-details-subtotal-title":"Mezisoučet","finance-details-total-details-sales-tax":"Včetně daně z obratu","finance-details-total-details-vat":"Včetně {{percent}}% DPH","finance-details-total-details-vat-ghana":"Včetně DPH, NHIL, odvodu GETFund a odvodu Covid-19","finance-details-total-details-vat-india":"Včetně {{percent}}% GST","finance-details-total-title":"Celkem","hello":"Ahoj světe!","legal":"Právní informace","privacy-policy":"Zásady ochrany osobních údajů","refund-policy":"Podmínky vrácení peněz","sctl-indications":"SCTL Indications","secure-connection":"Zabezpečené připojení"}}}'
      ),
      Ve = JSON.parse(
        '{"de":{"translation":{"cookie-policy":"Cookie-Richtlinie","finance-details-cart-items-checkout-title":"Ingame-Kauf","finance-details-cart-items-sales-tax":"{{percent}} % Umsatzsteuer","finance-details-cart-items-vat":"{{percent}} % MwSt.","finance-details-cart-items-vat-ghana":"VAT, NHIL, GETFund Levy und Covid-19 Levy","finance-details-cart-items-vat-india":"{{percent}} % GST","finance-details-hrk-equal":"Entspricht {{value}} HRK","finance-details-hrk-exchange-rate":"Wechselkurs: 1 EUR = 7,5345 HRK","finance-details-subtotal-details-discount":"Rabatt","finance-details-subtotal-details-fee":"Zahlungssystemgebühr","finance-details-subtotal-details-sales-tax":"Sales Tax","finance-details-subtotal-details-user-balance":"Guthaben","finance-details-subtotal-details-vat":"{{percent}} % MwSt.","finance-details-subtotal-details-vat-ghana":"VAT, NHIL, GETFund Levy und Covid-19 Levy","finance-details-subtotal-details-vat-india":"{{percent}} % GST","finance-details-subtotal-title":"Zwischensumme","finance-details-total-details-sales-tax":"Inklusive Sales Tax","finance-details-total-details-vat":"Einschließlich {{percent}} % MWSt.","finance-details-total-details-vat-ghana":"Inklusive VAT, NHIL, GETFund Levy und Covid-19 Levy","finance-details-total-details-vat-india":"Inklusive {{percent}} % GST","finance-details-total-title":"Summe","hello":"Hallo Welt!","legal":"Rechtliches","privacy-policy":"Datenschutzerklärung","refund-policy":"Erstattungsrichtlinie","sctl-indications":"SCTL Indications","secure-connection":"Sichere Verbindung"}}}'
      ),
      Ge = JSON.parse(
        '{"en":{"translation":{"hello":"Hello world!","legal":"Legal","cookie-policy":"Cookie policy","privacy-policy":"Privacy policy","refund-policy":"Refund policy","sctl-indications":"SCTL Indications","secure-connection":"Secure connection","finance-details-total-title":"Total","finance-details-subtotal-title":"Subtotal","finance-details-hrk-equal":"Equals {{value}} HRK","finance-details-hrk-exchange-rate":"Exchange rate: 1 EUR = 7.5345 HRK","finance-details-total-details-vat":"Including {{percent}}% VAT","finance-details-total-details-vat-india":"Including {{percent}}% GST","finance-details-total-details-vat-ghana":"Including VAT, NHIL, GETFund Levy, and Covid-19 Levy","finance-details-total-details-sales-tax":"Sales tax included","finance-details-subtotal-details-fee":"Payment system fee","finance-details-subtotal-details-discount":"Discount","finance-details-subtotal-details-user-balance":"Balance","finance-details-subtotal-details-vat":"VAT {{percent}}%","finance-details-subtotal-details-vat-india":"GST {{percent}}%","finance-details-subtotal-details-vat-ghana":"VAT, NHIL, GETFund Levy, and Covid-19 Levy","finance-details-subtotal-details-sales-tax":"Sales tax","finance-details-cart-items-checkout-title":"In-game purchase","finance-details-cart-items-vat":"VAT {{percent}}%","finance-details-cart-items-vat-india":"GST {{percent}}%","finance-details-cart-items-vat-ghana":"VAT, NHIL, GETFund Levy, and Covid-19 Levy","finance-details-cart-items-sales-tax":"Sales tax {{percent}}%"}}}'
      ),
      Ke = JSON.parse(
        '{"es":{"translation":{"cookie-policy":"Política de cookies","finance-details-cart-items-checkout-title":"Compra en el juego","finance-details-cart-items-sales-tax":"Impuesto sobre las ventas {{percent}} %","finance-details-cart-items-vat":"IVA {{percent}} %","finance-details-cart-items-vat-ghana":"IVA, NHIL y los impuestos GETFund y Covid-19","finance-details-cart-items-vat-india":"GST {{percent}} %","finance-details-hrk-equal":"Es igual a {{value}} HRK","finance-details-hrk-exchange-rate":"Tipo de cambio: 1 EUR = 7,5345 HRK","finance-details-subtotal-details-discount":"Descuento","finance-details-subtotal-details-fee":"Comisión del sistema de pago","finance-details-subtotal-details-sales-tax":"Impuesto sobre las ventas","finance-details-subtotal-details-user-balance":"Saldo","finance-details-subtotal-details-vat":"IVA {{percent}} %","finance-details-subtotal-details-vat-ghana":"IVA, NHIL y los impuestos GETFund y Covid-19","finance-details-subtotal-details-vat-india":"GST {{percent}} %","finance-details-subtotal-title":"Subtotal","finance-details-total-details-sales-tax":"Impuesto sobre las ventas incluido","finance-details-total-details-vat":"{{percent}} % IVA incluido​","finance-details-total-details-vat-ghana":"Incluyendo el IVA, GST, NHIL y los impuestos GETFund y Covid-19","finance-details-total-details-vat-india":"{{percent}} % GST incluido​","finance-details-total-title":"Total","hello":"¡Hola mundo!","legal":"Legal","privacy-policy":"Política de privacidad","refund-policy":"Política de reembolso","sctl-indications":"SCTL Indications","secure-connection":"Conexión segura"}}}'
      ),
      Ue = JSON.parse(
        '{"fr":{"translation":{"cookie-policy":"Politique en matière de cookies","finance-details-cart-items-checkout-title":"Achat intégré","finance-details-cart-items-sales-tax":"Taxe de vente de {{percent}} %","finance-details-cart-items-vat":"TVA de {{percent}} %","finance-details-cart-items-vat-ghana":"La TVA, la NHIL, le prélèvement GETFund et le prélèvement Covid-19","finance-details-cart-items-vat-india":"TPS de {{percent}} %","finance-details-hrk-equal":"Égal {{value}} HRK","finance-details-hrk-exchange-rate":"Taux de change : 1 EUR = 7,5345 HRK","finance-details-subtotal-details-discount":"Remise","finance-details-subtotal-details-fee":"Frais du système de paiement","finance-details-subtotal-details-sales-tax":"Taxe de vente","finance-details-subtotal-details-user-balance":"Solde","finance-details-subtotal-details-vat":"TVA de {{percent}} %","finance-details-subtotal-details-vat-ghana":"La TVA, la NHIL, le prélèvement GETFund et le prélèvement Covid-19","finance-details-subtotal-details-vat-india":"TPS de {{percent}} %","finance-details-subtotal-title":"Sous-total","finance-details-total-details-sales-tax":"Taxe de vente incluse","finance-details-total-details-vat":"TVA de {{percent}} % incluse","finance-details-total-details-vat-ghana":"Y compris la TVA, la NHIL, le prélèvement GETFund et le prélèvement Covid-19","finance-details-total-details-vat-india":"TPS de {{percent}} % incluse","finance-details-total-title":"Total","hello":"Bonjour monde!","legal":"Juridique","privacy-policy":"Politique de confidentialité","refund-policy":"Politique de remboursement","sctl-indications":"SCTL Indications","secure-connection":"Connexion sécurisée"}}}'
      ),
      Be = JSON.parse(
        '{"he":{"translation":{"cookie-policy":"מדיניות בנושא קובצי Cookie","finance-details-cart-items-checkout-title":"רכישה מתוך המשחק","finance-details-cart-items-sales-tax":"מס מכירה {{percent}}%","finance-details-cart-items-vat":"מע\\"מ {{percent}}%","finance-details-cart-items-vat-ghana":"מע\\"מ,‏ NHIL, מס GETFund ומס Covid-19","finance-details-cart-items-vat-india":"מס סחורות ושירותים {{percent}}%","finance-details-hrk-equal":"שווה-ערך ל-{{value}} קונה קרואטי","finance-details-hrk-exchange-rate":"שער המרה: 1 אירו = 7.5345 קונה קרואטי","finance-details-subtotal-details-discount":"הנחה","finance-details-subtotal-details-fee":"עמלת מערכת תשלומים","finance-details-subtotal-details-sales-tax":"מס מכירה","finance-details-subtotal-details-user-balance":"יתרה","finance-details-subtotal-details-vat":"מע\\"מ {{percent}}%","finance-details-subtotal-details-vat-ghana":"מע\\"מ,‏ NHIL, מס GETFund ומס Covid-19","finance-details-subtotal-details-vat-india":"מס סחורות ושירותים {{percent}}%","finance-details-subtotal-title":"סיכום ביניים","finance-details-total-details-sales-tax":"כולל מס מכירה","finance-details-total-details-vat":"כולל {{percent}}% מע\\"מ","finance-details-total-details-vat-ghana":"כולל מע\\"מ,‏ NHIL, מס GETFund ומס Covid-19","finance-details-total-details-vat-india":"כולל {{percent}}% מס סחורות ושירותים","finance-details-total-title":"סה\\"כ","hello":"שלום עולם!","legal":"משפטי","privacy-policy":"מדיניות פרטיות","refund-policy":"מדיניות החזרים כספיים","sctl-indications":"SCTL Indications","secure-connection":"חיבור מאובטח"}}}'
      ),
      We = JSON.parse(
        '{"it":{"translation":{"cookie-policy":"Informativa sui Cookie","finance-details-cart-items-checkout-title":"Acquisto in-game","finance-details-cart-items-sales-tax":"Imposta sulle vendite {{percent}}%","finance-details-cart-items-vat":"IVA {{percent}}%","finance-details-cart-items-vat-ghana":"IVA, NHIL, contributo GETFund e contributo Covid-19","finance-details-cart-items-vat-india":"GST {{percent}}%","finance-details-hrk-equal":"Pari a {{value}} HKR","finance-details-hrk-exchange-rate":"Tasso di cambio: 1 EUR = 7,5345 HRK","finance-details-subtotal-details-discount":"Sconto","finance-details-subtotal-details-fee":"Commissione sistema di pagamento","finance-details-subtotal-details-sales-tax":"Imposta sulle vendite","finance-details-subtotal-details-user-balance":"Saldo","finance-details-subtotal-details-vat":"IVA {{percent}}%","finance-details-subtotal-details-vat-ghana":"IVA, NHIL, contributo GETFund e contributo Covid-19","finance-details-subtotal-details-vat-india":"GST {{percent}}%","finance-details-subtotal-title":"Subtotale","finance-details-total-details-sales-tax":"Imposta sulle vendite","finance-details-total-details-vat":"Include {{percent}}% IVA","finance-details-total-details-vat-ghana":"Inclusi IVA, NHIL, contributo GETFund e contributo Covid-19","finance-details-total-details-vat-india":"Compresa GST {{percent}}% ","finance-details-total-title":"Totale","hello":"Ciao mondo!","legal":"Note legali","privacy-policy":"Informativa sulla Privacy","refund-policy":"Politica di Rimborso","sctl-indications":"SCTL Indications","secure-connection":"Connessione sicura"}}}'
      ),
      Je = JSON.parse(
        '{"ja":{"translation":{"cookie-policy":"クッキーポリシー","finance-details-cart-items-checkout-title":"ゲーム内購入","finance-details-cart-items-sales-tax":"売上税 {{percent}}%","finance-details-cart-items-vat":"消費税 {{percent}}%","finance-details-cart-items-vat-ghana":"VAT、NHIL、GETFund税及びCovid-19税","finance-details-cart-items-vat-india":"財・サービス税 {{percent}}%","finance-details-hrk-equal":"{{value}} HRKに相当する","finance-details-hrk-exchange-rate":"為替レート：1ユーロ＝7.5345HRK","finance-details-subtotal-details-discount":"割引","finance-details-subtotal-details-fee":"決済システム料金","finance-details-subtotal-details-sales-tax":"消費税","finance-details-subtotal-details-user-balance":"残高","finance-details-subtotal-details-vat":"消費税 {{percent}}%","finance-details-subtotal-details-vat-ghana":"VAT、NHIL、GETFund税及びCovid-19税","finance-details-subtotal-details-vat-india":"財・サービス税 {{percent}}%","finance-details-subtotal-title":"小計","finance-details-total-details-sales-tax":"消費税込み","finance-details-total-details-vat":"{{percent}}% 消費税込み","finance-details-total-details-vat-ghana":"VAT、NHIL、GETFund税及びCovid-19税を含む","finance-details-total-details-vat-india":"{{percent}}% 商品サービス税込み","finance-details-total-title":"合計","hello":"こんにちは、世界！","legal":"法的文書","privacy-policy":"プライバシーポリシー","refund-policy":"返金ポリシー","sctl-indications":"特商法取引に基づく表示","secure-connection":"安全な接続"}}}'
      ),
      Ze = JSON.parse(
        '{"ko":{"translation":{"cookie-policy":"쿠키 정책","finance-details-cart-items-checkout-title":"인게임 구매","finance-details-cart-items-sales-tax":"판매 세금 {{percent}}%","finance-details-cart-items-vat":"VAT {{percent}}%","finance-details-cart-items-vat-ghana":"VAT, NHIL, GETFund Levy 및 Covid-19 Levy","finance-details-cart-items-vat-india":"GST {{percent}}%","finance-details-hrk-equal":"= {{value}} HRK","finance-details-hrk-exchange-rate":"환율: 1 EUR = 7.5345 HRK","finance-details-subtotal-details-discount":"할인","finance-details-subtotal-details-fee":"결제 시스템 수수료","finance-details-subtotal-details-sales-tax":"판매 세금","finance-details-subtotal-details-user-balance":"잔액","finance-details-subtotal-details-vat":"VAT {{percent}}%","finance-details-subtotal-details-vat-ghana":"VAT, NHIL, GETFund Levy 및 Covid-19 Levy","finance-details-subtotal-details-vat-india":"GST {{percent}}%","finance-details-subtotal-title":"소계","finance-details-total-details-sales-tax":"판매 세금 포함됨","finance-details-total-details-vat":"{{percent}}% VAT 포함","finance-details-total-details-vat-ghana":"VAT, NHIL, GETFund Levy 및 Covid-19 Levy 등 포함","finance-details-total-details-vat-india":"{{percent}}% GST 포함","finance-details-total-title":"합계","hello":"안녕하세요 세상!","legal":"법률","privacy-policy":"개인정보 보호정책","refund-policy":"환불 정책","sctl-indications":"SCTL Indications","secure-connection":"보안 연결"}}}'
      ),
      Ye = JSON.parse(
        '{"pl":{"translation":{"cookie-policy":"Polityka plików cookie","finance-details-cart-items-checkout-title":"Zakup w grze","finance-details-cart-items-sales-tax":"Podatek od sprzedaży {{percent}}%","finance-details-cart-items-vat":"VAT {{percent}}%","finance-details-cart-items-vat-ghana":"VAT, NHIL, opłaty GETFund i Covid-19","finance-details-cart-items-vat-india":"GST {{percent}}%","finance-details-hrk-equal":"Wynosi {{value}} HRK","finance-details-hrk-exchange-rate":"Kurs wymiany: 1 EUR = 7,5345 HRK","finance-details-subtotal-details-discount":"Rabat","finance-details-subtotal-details-fee":"Prowizja systemu płatniczego","finance-details-subtotal-details-sales-tax":"Podatek od sprzedaży","finance-details-subtotal-details-user-balance":"Saldo","finance-details-subtotal-details-vat":"VAT {{percent}}%","finance-details-subtotal-details-vat-ghana":"VAT, NHIL, opłaty GETFund i Covid-19","finance-details-subtotal-details-vat-india":"GST {{percent}}%","finance-details-subtotal-title":"Suma częściowa","finance-details-total-details-sales-tax":"Kwota zawiera podatek od sprzedaży","finance-details-total-details-vat":"Zawiera {{percent}}% VAT","finance-details-total-details-vat-ghana":"Zawiera VAT, NHIL, opłaty GETFund i Covid-19","finance-details-total-details-vat-india":"Zawiera {{percent}}% GST","finance-details-total-title":"Suma zamówienia","hello":"Witaj świecie!","legal":"Informacje prawne","privacy-policy":"Polityka prywatności","refund-policy":"Polityka zwrotów","sctl-indications":"SCTL Indications","secure-connection":"Bezpieczne połączenie"}}}'
      ),
      Xe = JSON.parse(
        '{"pt":{"translation":{"cookie-policy":"Política de Cookies","finance-details-cart-items-checkout-title":"Compra no jogo","finance-details-cart-items-sales-tax":"Imposto sobre venda {{percent}}%","finance-details-cart-items-vat":"VAT {{percent}}%","finance-details-cart-items-vat-ghana":"VAT, NHIL, Taxa GETFund e Taxa Covid-19","finance-details-cart-items-vat-india":"GST {{percent}}%","finance-details-hrk-equal":"Equivale {{value}}HRK","finance-details-hrk-exchange-rate":"Taxa de câmbio: 1 EUR = 7,5345 HRK","finance-details-subtotal-details-discount":"Desconto","finance-details-subtotal-details-fee":"Taxa do sistema de pagamento","finance-details-subtotal-details-sales-tax":"Imposto sobre venda","finance-details-subtotal-details-user-balance":"Saldo","finance-details-subtotal-details-vat":"VAT {{percent}}%","finance-details-subtotal-details-vat-ghana":"VAT, NHIL, Taxa GETFund e Taxa Covid-19","finance-details-subtotal-details-vat-india":"GST {{percent}}%","finance-details-subtotal-title":"Subtotal","finance-details-total-details-sales-tax":"Imposto de venda incluso","finance-details-total-details-vat":"Incluindo {{percent}}% de VAT","finance-details-total-details-vat-ghana":"Incluindo VAT, NHIL, Taxa GETFund e Taxa Covid-19","finance-details-total-details-vat-india":"Incluindo {{percent}}% de GST","finance-details-total-title":"Total","hello":"Olá mundo!","legal":"Legal","privacy-policy":"Política de Privacidade","refund-policy":"Política de Reembolso","sctl-indications":"SCTL Indications","secure-connection":"Conexão segura"}}}'
      ),
      Qe = JSON.parse(
        '{"ro":{"translation":{"cookie-policy":"Politica privind modulele cookie","finance-details-cart-items-checkout-title":"Achiziție în joc","finance-details-cart-items-sales-tax":"Taxa pe vânzări {{percent}}%","finance-details-cart-items-vat":"TVA {{percent}}%","finance-details-cart-items-vat-ghana":"VAT, NHIL, GETFund Levy și Covid-19 Levy","finance-details-cart-items-vat-india":"GST {{percent}}%","finance-details-hrk-equal":"Echivalent al sumei de {{value}} HRK","finance-details-hrk-exchange-rate":"Curs de schimb: 1 EUR = 7,5345 HRK","finance-details-subtotal-details-discount":"Reducere","finance-details-subtotal-details-fee":"Taxă sistem de plată","finance-details-subtotal-details-sales-tax":"Taxa pe vânzări","finance-details-subtotal-details-user-balance":"Sold","finance-details-subtotal-details-vat":"TVA {{percent}}%","finance-details-subtotal-details-vat-ghana":"VAT, NHIL, GETFund Levy și Covid-19 Levy","finance-details-subtotal-details-vat-india":"GST {{percent}}%","finance-details-subtotal-title":"Subtotal","finance-details-total-details-sales-tax":"Taxe pe vânzări incluse","finance-details-total-details-vat":"Inclusiv {{percent}}% TVA","finance-details-total-details-vat-ghana":"Inclusiv VAT, NHIL, GETFund Levy și Covid-19 Levy","finance-details-total-details-vat-india":"Inclusiv {{percent}}% GST","finance-details-total-title":"Total","hello":"Salutare, lume!","legal":"Juridic","privacy-policy":"Politica de confidențialitate","refund-policy":"Politica de retur","sctl-indications":"Indicații SCTL","secure-connection":"Conexiune securizată"}}}'
      ),
      et = JSON.parse(
        '{"ru":{"translation":{"cookie-policy":"Политика использования cookie","finance-details-cart-items-checkout-title":"Внутриигровая покупка","finance-details-cart-items-sales-tax":"Налог с продаж {{percent}}%","finance-details-cart-items-vat":"НДС {{percent}}%","finance-details-cart-items-vat-ghana":"НДС и взносы NHIL, GETFund и Covid-19","finance-details-cart-items-vat-india":"GST {{percent}}%","finance-details-hrk-equal":"Равняется {{value}} HRK","finance-details-hrk-exchange-rate":"Обменный курс: 1 EUR = 7.5345 HRK","finance-details-subtotal-details-discount":"Скидка","finance-details-subtotal-details-fee":"Комиссия платежной системы","finance-details-subtotal-details-sales-tax":"Налог с продаж","finance-details-subtotal-details-user-balance":"Баланс","finance-details-subtotal-details-vat":"НДС {{percent}}%","finance-details-subtotal-details-vat-ghana":"НДС и взносы NHIL, GETFund и Covid-19","finance-details-subtotal-details-vat-india":"GST {{percent}}%","finance-details-subtotal-title":"Сумма","finance-details-total-details-sales-tax":"Включая налог с продаж","finance-details-total-details-vat":"Включая НДС {{percent}}%","finance-details-total-details-vat-ghana":"Включая НДС и взносы NHIL, GETFund и Covid-19","finance-details-total-details-vat-india":"Включая {{percent}}% GST","finance-details-total-title":"К оплате","hello":"Привет, мир!","legal":"Юридические документы","privacy-policy":"Политика конфиденциальности","refund-policy":"Политика возврата","sctl-indications":"SCTL Indications","secure-connection":"Безопасное соединение"}}}'
      ),
      tt = JSON.parse(
        '{"th":{"translation":{"cookie-policy":"นโยบายคุกกี้","finance-details-cart-items-checkout-title":"การซื้อภายในเกม","finance-details-cart-items-sales-tax":"ภาษีขาย {{percent}}%","finance-details-cart-items-vat":"VAT {{percent}}%","finance-details-cart-items-vat-ghana":"การจัดเก็บภาษี VAT, NHIL, GETFund และ Covid-19","finance-details-cart-items-vat-india":"GST {{percent}}%","finance-details-hrk-equal":"เท่ากับ {{value}} HRK","finance-details-hrk-exchange-rate":"อัตราแลกเปลี่ยน: 1 EUR = 7.5345 HRK","finance-details-subtotal-details-discount":"ส่วนลด","finance-details-subtotal-details-fee":"ค่าธรรมเนียมระบบการชำระเงิน","finance-details-subtotal-details-sales-tax":"ภาษีขาย","finance-details-subtotal-details-user-balance":"ยอดคงเหลือ","finance-details-subtotal-details-vat":"VAT {{percent}}%","finance-details-subtotal-details-vat-ghana":"การจัดเก็บภาษี VAT, NHIL, GETFund และ Covid-19","finance-details-subtotal-details-vat-india":"GST {{percent}}%","finance-details-subtotal-title":"ยอดรวมย่อย","finance-details-total-details-sales-tax":"รวมภาษีการขายแล้ว","finance-details-total-details-vat":"รวม VAT {{percent}}% ","finance-details-total-details-vat-ghana":"รวมถึง การจัดเก็บภาษี VAT, NHIL, GETFund และ Covid-19","finance-details-total-details-vat-india":"รวม GST {{percent}}%","finance-details-total-title":"ยอดรวม","hello":"สวัสดีชาวโลก!","legal":"ข้อมูลด้านกฎหมาย","privacy-policy":"นโยบายความเป็นส่วนตัว","refund-policy":"นโยบายการคืนเงิน","sctl-indications":"SCTL Indications","secure-connection":"การเชื่อมต่อที่ปลอดภัย"}}}'
      ),
      nt = JSON.parse(
        '{"tr":{"translation":{"cookie-policy":"Çerez Politikası","finance-details-cart-items-checkout-title":"Oyun içi satın alma","finance-details-cart-items-sales-tax":"Satış vergisi %{{percent}}","finance-details-cart-items-vat":"KDV %{{percent}}","finance-details-cart-items-vat-ghana":"KDV, NHIL, GETFund Vergisi ve Covid-19 Vergisi","finance-details-cart-items-vat-india":"GST %{{percent}}","finance-details-hrk-equal":"{{value}} Hırvat kunasına eşittir","finance-details-hrk-exchange-rate":"Döviz kuru: 1 euro = 7,5345 Hırvat kunası","finance-details-subtotal-details-discount":"İndirim","finance-details-subtotal-details-fee":"Ödeme sistemi ücreti","finance-details-subtotal-details-sales-tax":"Satış vergisi","finance-details-subtotal-details-user-balance":"Bakiye","finance-details-subtotal-details-vat":"KDV %{{percent}}","finance-details-subtotal-details-vat-ghana":"KDV, NHIL, GETFund Vergisi ve Covid-19 Vergisi","finance-details-subtotal-details-vat-india":"GST %{{percent}}","finance-details-subtotal-title":"Ara Toplam","finance-details-total-details-sales-tax":"Satış vergisi dahildir","finance-details-total-details-vat":"%{{percent}} KDV dahildir","finance-details-total-details-vat-ghana":"KDV, NHIL, GETFund Vergisi ve Covid-19 Vergisi dahil","finance-details-total-details-vat-india":"%{{percent}} GST dahildir","finance-details-total-title":"Toplam","hello":"Merhaba dünya!","legal":"Yasal","privacy-policy":"Gizlilik Politikası","refund-policy":"İade Politikası","sctl-indications":"SCTL Indications","secure-connection":"Güvenli bağlantı"}}}'
      ),
      at = JSON.parse(
        '{"vi":{"translation":{"cookie-policy":"Chính sách cookie","finance-details-cart-items-checkout-title":"Giao dịch trong trò chơi","finance-details-cart-items-sales-tax":"Thuế doanh thu {{percent}}%","finance-details-cart-items-vat":"Thuế giá trị gia tăng (VAT) {{percent}}%","finance-details-cart-items-vat-ghana":"Thuế Giá trị gia tăng (VAT), Thuế phụ thu bảo hiểm y tế quốc gia (NHIL), Thuế phụ thu GETFund và Thuế phụ thu Covid-19","finance-details-cart-items-vat-india":"Thuế hàng hóa và dịch vụ (GST) {{percent}}%","finance-details-hrk-equal":"Tương đương {{value}} HRK","finance-details-hrk-exchange-rate":"Tỷ giá: 1 EUR = 7,5345 HRK","finance-details-subtotal-details-discount":"Giảm giá","finance-details-subtotal-details-fee":"Phí hệ thống thanh toán","finance-details-subtotal-details-sales-tax":"Thuế doanh thu","finance-details-subtotal-details-user-balance":"Số dư","finance-details-subtotal-details-vat":"Thuế giá trị gia tăng (VAT) {{percent}}%","finance-details-subtotal-details-vat-ghana":"Thuế Giá trị gia tăng (VAT), Thuế phụ thu bảo hiểm y tế quốc gia (NHIL), Thuế phụ thu GETFund và Thuế phụ thu Covid-19","finance-details-subtotal-details-vat-india":"Thuế hàng hóa và dịch vụ (GST) {{percent}}%","finance-details-subtotal-title":"Tạm tính","finance-details-total-details-sales-tax":"Đã bao gồm thuế doanh thu","finance-details-total-details-vat":"Bao gồm {{percent}}% thuế GTGT","finance-details-total-details-vat-ghana":"Bao gồm thuế Giá trị gia tăng (VAT), Thuế phụ thu bảo hiểm y tế quốc gia (NHIL), Thuế phụ thu GETFund và Thuế phụ thu Covid-19","finance-details-total-details-vat-india":"Bao gồm {{percent}}% thuế hàng hóa và dịch vụ (GST)","finance-details-total-title":"Tổng","hello":"Xin chào thế giới!","legal":"Pháp lý","privacy-policy":"Chính sách Quyền riêng tư","refund-policy":"Chính sách hoàn tiền","sctl-indications":"SCTL Indications","secure-connection":"Kết nối bảo mật"}}}'
      ),
      it = JSON.parse(
        '{"zh_HANS":{"translation":{"cookie-policy":"Cookie政策","finance-details-cart-items-checkout-title":"游戏内购买","finance-details-cart-items-sales-tax":"销售税 {{percent}}%","finance-details-cart-items-vat":"增值税 {{percent}}%","finance-details-cart-items-vat-ghana":"VAT、NHIL、GETFund征税和Covid-19征税","finance-details-cart-items-vat-india":"商品和服务税 {{percent}}%","finance-details-hrk-equal":"等于 {{value}} HRK","finance-details-hrk-exchange-rate":"汇率：1 欧元 = 7.5345 HRK","finance-details-subtotal-details-discount":"折扣","finance-details-subtotal-details-fee":"支付系统使用费","finance-details-subtotal-details-sales-tax":"销售税","finance-details-subtotal-details-user-balance":"余额","finance-details-subtotal-details-vat":"增值税 {{percent}}%","finance-details-subtotal-details-vat-ghana":"VAT、NHIL、GETFund征税和Covid-19征税","finance-details-subtotal-details-vat-india":"商品和服务税 {{percent}}%","finance-details-subtotal-title":"小计","finance-details-total-details-sales-tax":"含销售税","finance-details-total-details-vat":"含{{percent}}%增值税","finance-details-total-details-vat-ghana":"含VAT、NHIL、GETFund征税和Covid-19征税","finance-details-total-details-vat-india":"含{{percent}}%商品和服务税","finance-details-total-title":"总计","hello":"你好，世界！","legal":"法律信息","privacy-policy":"隐私政策","refund-policy":"退款政策","sctl-indications":"SCTL Indications","secure-connection":"安全连接"}}}'
      ),
      rt = JSON.parse(
        '{"zh_HANT":{"translation":{"cookie-policy":"Cookie 政策","finance-details-cart-items-checkout-title":"遊戲內選購","finance-details-cart-items-sales-tax":"營業稅 {{percent}}%","finance-details-cart-items-vat":"加值稅 {{percent}}%","finance-details-cart-items-vat-ghana":"含增值稅，徵收國民健康保險、迦納教育信託基金和 Covid-19 等稅金","finance-details-cart-items-vat-india":"商品及服務稅 {{percent}}%","finance-details-hrk-equal":"相當於 {{value}} 克羅埃西亞庫納(HRK)","finance-details-hrk-exchange-rate":"匯率換算：1 歐元 (EUR) = 7.5345 克羅埃西亞庫納 (HRK)","finance-details-subtotal-details-discount":"折扣","finance-details-subtotal-details-fee":"支付系統費用","finance-details-subtotal-details-sales-tax":"營業稅","finance-details-subtotal-details-user-balance":"餘額","finance-details-subtotal-details-vat":"加值稅 {{percent}}%","finance-details-subtotal-details-vat-ghana":"含增值稅，徵收國民健康保險、迦納教育信託基金和 Covid-19 等稅金","finance-details-subtotal-details-vat-india":"商品及服務稅 {{percent}}%","finance-details-subtotal-title":"小計","finance-details-total-details-sales-tax":"含營業稅","finance-details-total-details-vat":"含{{percent}}% 增值稅","finance-details-total-details-vat-ghana":"含增值稅，徵收國民健康保險、迦納教育信託基金和 Covid-19 等稅金","finance-details-total-details-vat-india":"含{{percent}}%商品及服務稅","finance-details-total-title":"總計","hello":"你好，世界！","legal":"法律文件","privacy-policy":"隱私權政策","refund-policy":"退款政策","sctl-indications":"特定商業交易法聲明","secure-connection":"安全連線"}}}'
      );
    var ot;
    !(function (e) {
      (e.AR = 'ar'),
        (e.BG = 'bg'),
        (e.CS = 'cs'),
        (e.CN = 'cn'),
        (e.DE = 'de'),
        (e.EN = 'en'),
        (e.ES = 'es'),
        (e.FR = 'fr'),
        (e.HE = 'he'),
        (e.IT = 'it'),
        (e.JA = 'ja'),
        (e.KO = 'ko'),
        (e.PL = 'pl'),
        (e.PT = 'pt'),
        (e.RO = 'ro'),
        (e.RU = 'ru'),
        (e.TH = 'th'),
        (e.TR = 'tr'),
        (e.VI = 'vi'),
        (e.ZH_HANS = 'zh_HANS'),
        (e.ZH_HANT = 'zh_HANT');
    })(ot || (ot = {}));
    let st = class {
      initDictionaries() {
        return l(this, void 0, void 0, function* () {
          yield qe({
            lng: ot.EN,
            fallbackLng: ot.EN,
            supportedLngs: Object.values(ot),
            debug: !1,
            resources: Object.assign(
              Object.assign(
                Object.assign(
                  Object.assign(
                    Object.assign(
                      Object.assign(
                        Object.assign(
                          Object.assign(
                            Object.assign(
                              Object.assign(
                                Object.assign(
                                  Object.assign(
                                    Object.assign(
                                      Object.assign(
                                        Object.assign(
                                          Object.assign(
                                            Object.assign(
                                              Object.assign(
                                                Object.assign(
                                                  Object.assign({}, Fe),
                                                  Me
                                                ),
                                                _e
                                              ),
                                              Ve
                                            ),
                                            Ge
                                          ),
                                          Ke
                                        ),
                                        Ue
                                      ),
                                      Be
                                    ),
                                    We
                                  ),
                                  Je
                                ),
                                Ze
                              ),
                              Ye
                            ),
                            Xe
                          ),
                          Qe
                        ),
                        et
                      ),
                      tt
                    ),
                    nt
                  ),
                  at
                ),
                it
              ),
              rt
            ),
          });
        });
      }
      translate(e) {
        return He(e);
      }
      changeLang(e) {
        return l(this, void 0, void 0, function* () {
          e === ot.CN && (e = ot.ZH_HANS), yield De(e);
        });
      }
    };
    st = o([L()], st);
    const lt = (e) => !!e.name;
    let ct = class {
      get noRecipient() {
        return !(this.recipientUrl && this.recipient);
      }
      constructor(e) {
        this.window = e;
      }
      init(e, t) {
        (this.recipient = e), (this.recipientUrl = t);
      }
      send(e, t) {
        return l(this, void 0, void 0, function* () {
          if (this.noRecipient)
            throw new Error('No recipient for post messages.');
          return new Promise((n) => {
            const a = (e) => {
              if (this.isSameOrigin(e.origin)) {
                const i = JSON.parse(e.data),
                  r = t(i);
                if (r) {
                  if ((this.window.removeEventListener('message', a), r.value))
                    return void n(r.value);
                  n();
                }
              }
            };
            this.window.addEventListener('message', a), this.sendMessage(e);
          });
        });
      }
      listen(e, t, n) {
        const a = (a) => {
          if (this.isSameOrigin(a.origin)) {
            const i = JSON.parse(a.data);
            if (lt(i) && i.name === e) {
              const e = t(i);
              n(null == e ? void 0 : e.value);
            }
          }
        };
        return (
          this.window.addEventListener('message', a),
          () => this.window.removeEventListener('message', a)
        );
      }
      sendMessage(e) {
        var t;
        null === (t = this.recipient.contentWindow) ||
          void 0 === t ||
          t.postMessage(JSON.stringify(e), this.recipientUrl);
      }
      isSameOrigin(e) {
        return e === new URL(this.recipientUrl).origin;
      }
    };
    ct = o([L(), s('design:paramtypes', [Window])], ct);
    class ut extends HTMLElement {
      constructor() {
        super(...arguments), (this.eventListeners = []);
      }
      connectedCallback() {
        this.render();
      }
      disconnectedCallback() {
        this.removeAllEventListeners();
      }
      addEventListenerToElement(e, t, n) {
        e.addEventListener(t, n),
          this.eventListeners.push({ element: e, eventType: t, listener: n });
      }
      removeAllEventListeners() {
        this.eventListeners.forEach((e) => {
          e.element.removeEventListener(e.eventType, e.listener);
        }),
          (this.eventListeners = []);
      }
      render() {
        this.innerHTML = this.getHtml();
      }
      static get observedAttributes() {
        return [];
      }
      attributeChangedCallback() {
        this.render();
      }
      getNumberAttribute(e) {
        const t = this.getAttribute(e);
        if (!t) return null;
        const n = parseFloat(t);
        return isNaN(n) ? null : n;
      }
    }
    const pt = 'https://secure.xsolla.com/headless-checkout';
    class dt extends ut {
      constructor() {
        super(...arguments), (this.componentName = null);
      }
      getSecureHtml() {
        if (!this.componentName) throw new Error('Component name is required');
        return `<iframe src='${pt}/secure-components/${this.componentName}'></iframe>`;
      }
    }
    var ft;
    !(function (e) {
      e.name = 'name';
    })(ft || (ft = {}));
    let mt = class {
      constructor() {
        (this._formWasInit = !1), (this._callbacks = []);
      }
      set formWasInit(e) {
        this._formWasInit !== e &&
          ((this._formWasInit = e), e && this.formWasInitHandler());
      }
      get formWasInit() {
        return this._formWasInit;
      }
      listenFormInit(e) {
        this._callbacks.push(e);
      }
      formWasInitHandler() {
        this._callbacks.forEach((e) => e());
      }
    };
    mt = o([L()], mt);
    class ht extends dt {
      constructor() {
        super(), (this.formSpy = T.resolve(mt));
      }
      static get observedAttributes() {
        return [ft.name];
      }
      connectedCallback() {
        if (!this.formSpy.formWasInit)
          return void this.formSpy.listenFormInit(() =>
            this.connectedCallback()
          );
        const e = this.getAttribute(ft.name);
        e && ((this.componentName = `text-input/${e}`), super.render());
      }
      attributeChangedCallback() {
        this.connectedCallback();
      }
      getHtml() {
        return `\n ${this.getSecureHtml()}\n    `;
      }
    }
    const gt = (e) => ('submitForm' === e.name ? { isHandled: !0 } : null);
    class yt extends ut {
      get elementRef() {
        return this.querySelector('button');
      }
      constructor() {
        super(), (this.postMessagesClient = T.resolve(ct));
      }
      connectedCallback() {
        super.render(),
          this.addEventListenerToElement(this.elementRef, 'click', () => {
            this.postMessagesClient.send({ name: 'submitForm' }, gt);
          });
      }
      getHtml() {
        return `\n    <button>${this.getAttribute('text')}</button>\n    `;
      }
    }
    var vt, bt, St;
    !(function (e) {
      (e.TextComponent = 'psdk-text-component'),
        (e.SubmitButtonComponent = 'psdk-submit-button'),
        (e.PaymentMethodsComponent = 'psdk-payment-methods'),
        (e.PriceTextComponent = 'psdk-price-text'),
        (e.FinanceDetailsComponent = 'psdk-finance-details'),
        (e.LegalComponent = 'psdk-legal');
    })(vt || (vt = {})),
      (function (e) {
        (e.country = 'country'),
          (e.notFound = 'not-found'),
          (e.searchPlaceholder = 'search-placeholder');
      })(bt || (bt = {})),
      (function (e) {
        e.selectionChange = 'selectionChange';
      })(St || (St = {}));
    let kt = class {
      constructor() {
        (this._appWasInit = !1), (this._callbacks = []);
      }
      set appWasInit(e) {
        this._appWasInit !== e &&
          ((this._appWasInit = e), e && this.appWasInitHandler());
      }
      get appWasInit() {
        return this._appWasInit;
      }
      listenAppInit(e) {
        this._callbacks.push(e);
      }
      appWasInitHandler() {
        this._callbacks.forEach((e) => e());
      }
    };
    kt = o([L()], kt);
    class wt extends ut {
      get listRef() {
        return this.querySelector('ul');
      }
      get notFoundValue() {
        var e;
        return null !== (e = this.getAttribute(bt.notFound)) && void 0 !== e
          ? e
          : '';
      }
      get searchPlaceHolder() {
        var e;
        return null !== (e = this.getAttribute(bt.searchPlaceholder)) &&
          void 0 !== e
          ? e
          : '';
      }
      constructor() {
        super(),
          (this.paymentMethodsLoadedHandler = (e) => {
            (this.paymentMethods = e),
              (this.visibleMethods = this.paymentMethods.filter(
                (e) => e.isVisible
              )),
              (this.filteredMethods = this.visibleMethods.slice()),
              super.render(),
              this.listenClicks(),
              this.setupSearch();
          }),
          (this.headlessCheckoutSpy = T.resolve(kt)),
          (this.headlessCheckout = T.resolve(an));
      }
      static get observedAttributes() {
        return [bt.country];
      }
      connectedCallback() {
        this.headlessCheckoutSpy.appWasInit
          ? this.headlessCheckout
              .getRegularMethods()
              .then(this.paymentMethodsLoadedHandler)
          : this.headlessCheckoutSpy.listenAppInit(() =>
              this.connectedCallback()
            );
      }
      getHtml() {
        const e = this.getMethodsHtml();
        return `\n      <input type="text" class="search" placeholder="${
          this.searchPlaceHolder
        }">\n      <ul class="payment-methods">\n        ${
          e ? e.join('') : this.notFoundValue
        }\n      </ul>\n    `;
      }
      attributeChangedCallback() {
        this.headlessCheckoutSpy.appWasInit &&
          this.headlessCheckout
            .getRegularMethods()
            .then(this.paymentMethodsLoadedHandler);
      }
      getMethodsHtml() {
        var e;
        return (
          null === (e = this.filteredMethods) || void 0 === e
            ? void 0
            : e.length
        )
          ? this.filteredMethods.map((e) =>
              ((e) => {
                let t;
                return (
                  (t = e.iconName
                    ? e.iconName
                    : 1380 === e.id
                    ? 'card.svg'
                    : 'default.svg'),
                  `<li class="payment-method">\n    <a tabindex="0" href="${e.id}" data-method-id="${e.id}">\n      <span class="icon">\n        <img src="https://cdn3.xsolla.com/paystation4/brand-logos/${t}" alt="${e.name}">\n      </span>\n        <span class="name">${e.name}</span>\n    </a>\n</li>`
                );
              })(e)
            )
          : null;
      }
      listenClicks() {
        this.addEventListenerToElement(this.listRef, 'click', (e) => {
          e.preventDefault(),
            e.target instanceof HTMLElement &&
              this.dispatchSelectionEvent(e.target);
        });
      }
      dispatchSelectionEvent(e) {
        const t = {
          bubbles: !0,
          composed: !0,
          detail: { paymentMethodId: this.getPaymentMethodId(e) },
        };
        this.listRef.dispatchEvent(new CustomEvent(St.selectionChange, t));
      }
      getPaymentMethodId(e) {
        var t, n, a;
        const i = 'data-method-id';
        return 'function' == typeof (null == e ? void 0 : e.closest)
          ? null === (t = e.closest('a')) || void 0 === t
            ? void 0
            : t.getAttribute(i)
          : null !== (n = e.getAttribute(i)) && void 0 !== n
          ? n
          : null === (a = e.parentElement) || void 0 === a
          ? void 0
          : a.getAttribute(i);
      }
      setupSearch() {
        const e = this.querySelector('.search');
        e &&
          this.addEventListenerToElement(e, 'input', (e) => {
            const t = e.target.value;
            (this.filteredMethods = ((e, t) =>
              null == e
                ? void 0
                : e.filter((e) =>
                    e.name.toLowerCase().includes(String(t).toLowerCase())
                  ))(this.visibleMethods, t)),
              this.updateMethodsView();
          });
      }
      updateMethodsView() {
        const e = this.getMethodsHtml();
        this.listRef.innerHTML = e ? e.join('') : this.notFoundValue;
      }
    }
    const Ct = 'logo-path.png',
      $t = (e) => {
        var t;
        return ((e) => {
          var t;
          return (
            !!lt(e) &&
            'getLegalComponentConfig' === e.name &&
            void 0 !==
              (null === (t = e.data) || void 0 === t ? void 0 : t.config)
          );
        })(e) && 'getLegalComponentConfig' === e.name
          ? {
              isHandled: !0,
              value: null === (t = e.data) || void 0 === t ? void 0 : t.config,
            }
          : null;
      };
    class xt extends ut {
      constructor() {
        super(),
          (this.configLoadedHandler = (e) => {
            (this.config = e),
              super.render(),
              this.config && this.listenPings();
          }),
          (this.pingCallback = (e) => {
            var t;
            const n = JSON.parse(e.data);
            lt(n) &&
              'legalComponentPing' === n.name &&
              (null === (t = e.source) ||
                void 0 === t ||
                t.postMessage(
                  JSON.stringify({ name: 'legalComponentPong' }),
                  e.origin
                ));
          }),
          (this.headlessCheckoutSpy = T.resolve(kt)),
          (this.headlessCheckout = T.resolve(an)),
          (this.postMessagesClient = T.resolve(ct)),
          (this.window = T.resolve(Window));
      }
      connectedCallback() {
        this.headlessCheckoutSpy.appWasInit
          ? this.getLegalComponentConfig().then(this.configLoadedHandler)
          : this.headlessCheckoutSpy.listenAppInit(() =>
              this.connectedCallback()
            );
      }
      listenPings() {
        this.window.addEventListener('message', this.pingCallback);
      }
      disconnectedCallback() {
        super.disconnectedCallback(),
          this.window.removeEventListener('message', this.pingCallback);
      }
      getLegalComponentConfig() {
        return l(this, void 0, void 0, function* () {
          return this.postMessagesClient.send(
            { name: 'getLegalComponentConfig' },
            $t
          );
        });
      }
      getHtml() {
        return this.config
          ? ((e) => {
              const {
                isJapanUser: t,
                refundPolicyUrl: n,
                sctlPolicyUrl: a,
                secureConnection: i,
                disclaimer: r,
              } = e;
              return `\n    ${
                r
                  ? `\n  <div class="disclaimer">\n    ${ze.t(
                      'disclaimer'
                    )}\n  </div>`
                  : ''
              }\n   ${((e) => {
                const t = null == e ? void 0 : e.isWhiteLabel,
                  n = null == e ? void 0 : e.secureConnectionUrl;
                return `\n  <div class="info">\n  <div class="company">\n    ${
                  !t && n
                    ? `\n\n    <a\n      class="logo logo-link"\n      [href]="secureConnectionUrl"\n      target="_blank"\n    >\n      <img src="${Ct}">\n    </a>`
                    : `\n\n      <span class="logo">\n      <img src="${Ct}">\n\n      </span>`
                }\n    <div class="connection">\n    ${ze.t(
                  'secure-connection'
                )}\n    </div>\n  </div>\n</div>\n`;
              })(
                i
              )}\n  <div class="legal-links">\n    <a\n      class="link link-legal"\n      href="https://xsolla.com/legal-agreements"\n      target="_blank"\n    >\n      ${ze.t(
                'legal'
              )}\n    </a>\n\n    <div class="divider"></div>\n\n    <a\n      class="link link-legal"\n      href="https://xsolla.com/cookie"\n      target="_blank"\n    >\n      ${ze.t(
                'cookie-policy'
              )}\n    </a>\n\n    <div class="divider"></div>\n\n    <a\n      class="link link-legal"\n      href="https://xsolla.com/privacypolicy"\n      target="_blank"\n    >\n      ${ze.t(
                'privacy-policy'
              )}\n    </a>\n\n    <div class="divider"></div>\n\n    <a\n      class="link link-refund"\n      href="${n}"\n      target="_blank"\n    >\n      ${ze.t(
                'refund-policy'
              )}\n    </a>\n    ${
                t && a
                  ? `\n    <div class="divider"></div>\n\n    <a\n      class="link sctl-link"\n      href="${a}"\n      target="_blank"\n    >\n      ${ze.t(
                      'sctl-indications'
                    )}\n    </a>`
                  : ''
              }\n  </div>`;
            })(this.config)
          : '';
      }
    }
    const Ot = (e) => {
        return lt((t = e)) && 'financeDetails' === t.name
          ? { isHandled: !0, value: e.data }
          : null;
        var t;
      },
      Tt = (e, t, n) => {
        var a, i, r, o, s, l, c;
        return `\n    <psdk-price-text\n      class="${
          null != n ? n : ''
        }"\n      price-line-content="${
          null !== (a = null == e ? void 0 : e.content) && void 0 !== a ? a : ''
        }"\n      price-line-amount="${
          null !==
            (r =
              null === (i = null == e ? void 0 : e.money) || void 0 === i
                ? void 0
                : i.amount) && void 0 !== r
            ? r
            : ''
        }"\n      price-line-currency="${
          null !==
            (s =
              null === (o = null == e ? void 0 : e.money) || void 0 === o
                ? void 0
                : o.currency) && void 0 !== s
            ? s
            : ''
        }"\n      amount="${
          null !== (l = null == t ? void 0 : t.amount) && void 0 !== l ? l : ''
        }"\n      currency="${
          null !== (c = null == t ? void 0 : t.currency) && void 0 !== c
            ? c
            : ''
        }"\n    ></psdk-price-text>\n  `;
      },
      Lt = new Map([['checkout', 'finance-details-cart-items-checkout-title']]),
      Rt = new Map([
        ['vat', 'finance-details-cart-items-vat'],
        ['vat-india', 'finance-details-cart-items-vat-india'],
        ['vat-ghana', 'finance-details-cart-items-vat-ghana'],
        ['sales-tax', 'finance-details-cart-items-sales-tax'],
      ]),
      Pt = (e = []) =>
        e.length
          ? `\n    <div class="cart-items">\n      ${(function (e = []) {
              return e.map((e) => {
                var t, n;
                const a =
                    !e.title && e.key && Lt.has(e.key)
                      ? ze.t(Lt.get(e.key))
                      : e.title,
                  i =
                    (null === (t = e.tax) || void 0 === t ? void 0 : t.key) &&
                    Rt.has(e.tax.key)
                      ? ze.t(Rt.get(e.tax.key), { percent: e.tax.rate })
                      : null === (n = e.tax) || void 0 === n
                      ? void 0
                      : n.content;
                return Object.assign(Object.assign({}, e), {
                  title: null != a ? a : e.title,
                  tax: Object.assign(Object.assign({}, e.tax), { content: i }),
                });
              });
            })(e)
              .map(
                (e) =>
                  `\n      <div class="cart-item">\n        ${(function (e) {
                    return e.imgSrc
                      ? `\n    <div class="image-container">\n      <img\n        class="image"\n        src="${e.imgSrc}"\n        alt="${e.title}"\n      />\n    </div>\n  `
                      : '';
                  })(e)}\n        ${(function (e) {
                    var t, n;
                    const a =
                        e.quantity && e.quantity > 1
                          ? `${e.quantity} x ${e.title}`
                          : e.title,
                      i =
                        null === (t = e.description) || void 0 === t
                          ? void 0
                          : t.replace(/\\n/g, '<br/>');
                    return `\n    <div class="details">\n      <div class="title">${
                      null != a ? a : ''
                    }</div>\n      <div class="description">${
                      null != i ? i : ''
                    }</div>\n      ${
                      e.tax ? Tt(e.tax, null, 'tax') : ''
                    }\n      ${Tt(null, e.price, 'price')}\n      ${
                      (
                        null === (n = e.priceBeforeDiscount) || void 0 === n
                          ? void 0
                          : n.amount
                      )
                        ? Tt(
                            null,
                            e.priceBeforeDiscount,
                            'price-before-discount'
                          )
                        : ''
                    }\n    </div>\n  `;
                  })(e)}\n      </div>\n    `
              )
              .join('')}\n    </div>\n  `
          : '';
    var Nt, Et;
    !(function (e) {
      (e.Croatia = 'HR'), (e.Ghana = 'GH'), (e.India = 'IN');
    })(Nt || (Nt = {})),
      (function (e) {
        (e.USD = 'USD'), (e.EUR = 'EUR');
      })(Et || (Et = {}));
    const It = (e) => {
        var t;
        const n = e.cartSummary,
          a = e.paymentCountry === Nt.Croatia,
          i =
            (null === (t = n.total.money) || void 0 === t
              ? void 0
              : t.currency) === Et.EUR;
        return a && i
          ? `\n    <div class="croatian-exchange-rate-row">\n      <div class="equal-value">${ze.t(
              'finance-details-hrk-equal',
              {
                value: (function () {
                  var e, t;
                  const a = (
                    null === (e = n.total.money) || void 0 === e
                      ? void 0
                      : e.amount
                  )
                    ? null === (t = n.total.money) || void 0 === t
                      ? void 0
                      : t.amount
                    : 0;
                  return Math.ceil(7.5345 * a * 100) / 100;
                })(),
              }
            )}</div>\n      <div class="details">${ze.t(
              'finance-details-hrk-exchange-rate'
            )}</div>\n    </div>`
          : '';
      },
      jt = (e) => {
        const t = e.shipping;
        return (null == t ? void 0 : t.length)
          ? `\n    <div class="shipping-rows">\n      ${t
              .map((e) => {
                var t;
                return `\n      <div class"shipping-row">\n        <div class="title">${
                  null !== (t = e.title) && void 0 !== t ? t : ''
                }</div>\n        ${Tt(e)}\n      </div>\n    `;
              })
              .join('')}\n    </div>`
          : '';
      },
      At = new Map([
        ['fee', 'finance-details-subtotal-details-fee'],
        ['discount', 'finance-details-subtotal-details-discount'],
        ['user-balance', 'finance-details-subtotal-details-user-balance'],
        ['vat', 'finance-details-subtotal-details-vat'],
        ['vat-india', 'finance-details-subtotal-details-vat-india'],
        ['vat-ghana', 'finance-details-subtotal-details-vat-ghana'],
        ['sales-tax', 'finance-details-subtotal-details-sales-tax'],
      ]);
    function zt(e) {
      var t, n;
      const a = [];
      if (
        (e.subtotal &&
          a.push(
            `<div class="title">${ze.t('finance-details-subtotal-title')}</div>`
          ),
        e.subtotal && e.subtotalPayment)
      ) {
        const i =
          (null === (t = e.subtotal.money) || void 0 === t
            ? void 0
            : t.currency) !==
          (null === (n = e.subtotalPayment.money) || void 0 === n
            ? void 0
            : n.currency)
            ? `${Tt(
                e.subtotal,
                null,
                'price converted-price'
              )} <span class="equal-sign">=</span>`
            : '';
        a.push(
          `\n      <div class="price-container">\n        ${i}\n        ${Tt(
            e.subtotalPayment,
            null,
            'price'
          )}\n      </div>\n    `
        );
      }
      return a.length
        ? `\n    <div class="subtotal-row">\n      ${a.join('')}\n    </div>`
        : '';
    }
    function qt(e, t) {
      var n;
      const a = (function (e, t = []) {
        var n;
        const a =
          null === (n = e.vat_user) || void 0 === n ? void 0 : n.percent;
        return t.map((e) =>
          e.key && At.has(e.key)
            ? Object.assign(Object.assign({}, e), {
                title: ze.t(At.get(e.key), { percent: a }),
              })
            : e
        );
      })(e, t.subtotalDetails).map((e) => {
        var t, n;
        return (null === (t = e.money) || void 0 === t ? void 0 : t.amount) ||
          e.content
          ? `\n      <div class="subtotal-row">\n        <div class="title">${
              null !== (n = e.title) && void 0 !== n ? n : ''
            }</div>\n        ${Tt(e, null, 'price')}\n      </div>`
          : '';
      });
      return null !== (n = null == a ? void 0 : a.join('')) && void 0 !== n
        ? n
        : '';
    }
    const Dt = new Map([
        ['vat', 'finance-details-total-details-vat'],
        ['vat-india', 'finance-details-total-details-vat-india'],
        ['vat-ghana', 'finance-details-total-details-vat-ghana'],
        ['sales-tax', 'finance-details-total-details-sales-tax'],
      ]),
      Ht = (e, t) => {
        var n;
        const a =
          null ===
            (n = (function (e, t = []) {
              var n;
              const a =
                null === (n = e.vat) || void 0 === n ? void 0 : n.percent;
              return t.map((e) =>
                e.key && Dt.has(e.key)
                  ? Object.assign(Object.assign({}, e), {
                      title: ze.t(Dt.get(e.key), { percent: a }),
                    })
                  : e
              );
            })(e, t.totalDetails)) || void 0 === n
            ? void 0
            : n.map((e) => {
                var t;
                return `\n      <div class="total-details-row">\n        <div class="title">${
                  null !== (t = e.title) && void 0 !== t ? t : ''
                }</div>\n        ${Tt(null, e.money)}\n      </div>`;
              });
        return null == a ? void 0 : a.join('');
      },
      Ft = (e) =>
        `\n    <div class="total-row">\n      <div class="title">${ze.t(
          'finance-details-total-title'
        )}</div>\n      ${Tt(null, e.total.money)}\n    </div>`;
    class Mt extends ut {
      constructor() {
        super(),
          (this.financeDetails = null),
          (this.financeDetailsLoadedHandler = (e) => {
            (this.financeDetails = e), this.render();
          }),
          (this.headlessCheckoutSpy = T.resolve(kt)),
          (this.headlessCheckout = T.resolve(an));
      }
      connectedCallback() {
        this.headlessCheckoutSpy.appWasInit
          ? this.headlessCheckout.events.onCoreEvent(
              'financeDetails',
              Ot,
              (e) => this.financeDetailsLoadedHandler(e)
            )
          : this.headlessCheckoutSpy.listenAppInit(() =>
              this.connectedCallback()
            );
      }
      getHtml() {
        return this.financeDetails
          ? ((e = this.financeDetails),
            [
              Pt(e.cartItems),
              jt(e.cartSummary),
              ((t = e.finance),
              (n = e.cartSummary),
              [zt(n), qt(t, n)].join('')),
              Ft(e.cartSummary),
              It(e),
              Ht(e.finance, e.cartSummary),
            ].join(''))
          : '';
        var e, t, n;
      }
    }
    var _t;
    !(function (e) {
      (e.priceLineContent = 'price-line-content'),
        (e.priceLineAmount = 'price-line-amount'),
        (e.priceLineCurrency = 'price-line-currency'),
        (e.amount = 'amount'),
        (e.currency = 'currency');
    })(_t || (_t = {}));
    const Vt = JSON.parse(
        '{"AED":{"name":"UAE Dirham","fractionSize":2,"symbol":{"grapheme":".د.إ","template":"1 $","rtl":true},"uniqSymbol":null},"AFN":{"name":"Afghani","fractionSize":2,"symbol":{"grapheme":"؋","template":"1 $","rtl":true},"uniqSymbol":{"grapheme":"؋","template":"1 $","rtl":true}},"ALL":{"name":"Lek","fractionSize":2,"symbol":{"grapheme":"L","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"Lek","template":"$1","rtl":false}},"AMD":{"name":"Armenian Dram","fractionSize":2,"symbol":{"grapheme":"դր.","template":"1 $","rtl":false},"uniqSymbol":{"grapheme":"դր.","template":"1 $","rtl":false}},"ANG":{"name":"Netherlands Antillean Guilder","fractionSize":2,"symbol":{"grapheme":"ƒ","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"NAƒ","template":"$1","rtl":false}},"AOA":{"name":"Kwanza","fractionSize":2,"symbol":{"grapheme":"Kz","template":"1 $","rtl":false},"uniqSymbol":null},"ARS":{"name":"Argentine Peso","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":null},"AUD":{"name":"Australian Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"A$","template":"$1","rtl":false}},"AWG":{"name":"Aruban Florin","fractionSize":2,"symbol":{"grapheme":"ƒ","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"Afl","template":"$1","rtl":false}},"AZN":{"name":"Azerbaijanian Manat","fractionSize":2,"symbol":{"grapheme":"₼","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"₼","template":"$1","rtl":false}},"BAM":{"name":"Convertible Mark","fractionSize":2,"symbol":{"grapheme":"KM","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"KM","template":"$1","rtl":false}},"BBD":{"name":"Barbados Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":null},"BDT":{"name":"Taka","fractionSize":2,"symbol":{"grapheme":"৳","template":"$1","rtl":false},"uniqSymbol":null},"BGN":{"name":"Bulgarian Lev","fractionSize":2,"symbol":{"grapheme":"лв","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"лв","template":"$1","rtl":false}},"BHD":{"name":"Bahraini Dinar","fractionSize":3,"symbol":{"grapheme":".د.ب","template":"1 $","rtl":true},"uniqSymbol":{"grapheme":".د.ب","template":"1 $","rtl":true}},"BIF":{"name":"Burundi Franc","fractionSize":0,"symbol":{"grapheme":"FBu","template":"1 $","rtl":false},"uniqSymbol":null},"BMD":{"name":"Bermudian Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"BD$","template":"$1","rtl":false}},"BND":{"name":"Brunei Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":null},"BOB":{"name":"Boliviano","fractionSize":2,"symbol":{"grapheme":"Bs.","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"Bs.","template":"$1","rtl":false}},"BOV":{"name":"Mvdol","fractionSize":2,"symbol":{"grapheme":"Bov","template":"1 $","rtl":false},"uniqSymbol":null},"BRL":{"name":"Brazilian Real","fractionSize":2,"symbol":{"grapheme":"R$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"R$","template":"$1","rtl":false}},"BSD":{"name":"Bahamian Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":null},"BTN":{"name":"Ngultrum","fractionSize":2,"symbol":{"grapheme":"Nu.","template":"$ 1","rtl":false},"uniqSymbol":null},"BWP":{"name":"Pula","fractionSize":2,"symbol":{"grapheme":"P","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"P","template":"$1","rtl":false}},"BYN":{"name":"Belarussian Ruble","fractionSize":2,"symbol":{"grapheme":"p.","template":"1 $","rtl":false},"uniqSymbol":{"grapheme":"р.","template":"1 $","rtl":false}},"BYR":{"name":"Belarussian Ruble","fractionSize":0,"symbol":{"grapheme":"p.","template":"1 $","rtl":false},"uniqSymbol":{"grapheme":"р.","template":"1 $","rtl":false}},"BZD":{"name":"Belize Dollar","fractionSize":2,"symbol":{"grapheme":"BZ$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"BZ$","template":"$1","rtl":false}},"CAD":{"name":"Canadian Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"CA$","template":"$1","rtl":false}},"CDF":{"name":"Congolese Franc","fractionSize":2,"symbol":{"grapheme":"FC","template":"1 $","rtl":false},"uniqSymbol":null},"CHE":{"name":"WIR Euro","fractionSize":2,"symbol":{"grapheme":"CHE","template":"1 $","rtl":false},"uniqSymbol":null},"CHF":{"name":"Swiss Franc","fractionSize":2,"symbol":{"grapheme":"fr.","template":"1 $","rtl":false},"uniqSymbol":null},"CHW":{"name":"WIR Franc","fractionSize":2,"symbol":{"grapheme":"CHW","template":"1 $","rtl":false},"uniqSymbol":null},"CLF":{"name":"Unidad de Fomento","fractionSize":4,"symbol":{"grapheme":"UF","template":"1 $","rtl":false},"uniqSymbol":null},"CLP":{"name":"Chilean Peso","fractionSize":0,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":null},"CNY":{"name":"Yuan Renminbi","fractionSize":2,"symbol":{"grapheme":"元","template":"1 $","rtl":false},"uniqSymbol":{"grapheme":"元","template":"1 $","rtl":false}},"COP":{"name":"Colombian Peso","fractionSize":0,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":null},"COU":{"name":"Unidad de Valor Real","fractionSize":2,"symbol":{"grapheme":"COU","template":"1 $","rtl":false},"uniqSymbol":null},"CRC":{"name":"Cost Rican Colon","fractionSize":2,"symbol":{"grapheme":"₡","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"₡","template":"$1","rtl":false}},"CUC":{"name":"Peso Convertible","fractionSize":2,"symbol":{"grapheme":"CUC","template":"1 $","rtl":false},"uniqSymbol":null},"CUP":{"name":"Cuban Peso","fractionSize":2,"symbol":{"grapheme":"$MN","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"$MN","template":"$1","rtl":false}},"CVE":{"name":"Cabo Verde Escudo","fractionSize":2,"symbol":{"grapheme":"esc","template":"1 $","rtl":false},"uniqSymbol":null},"CZK":{"name":"Czech Koruna","fractionSize":2,"symbol":{"grapheme":"Kč","template":"1 $","rtl":false},"uniqSymbol":{"grapheme":"Kč","template":"1 $","rtl":false}},"DJF":{"name":"Djibouti Franc","fractionSize":0,"symbol":{"grapheme":"Fdj","template":"1 $","rtl":false},"uniqSymbol":null},"DKK":{"name":"Danish Krone","fractionSize":2,"symbol":{"grapheme":"kr","template":"1 $","rtl":false},"uniqSymbol":null},"DOP":{"name":"Dominican Peso","fractionSize":2,"symbol":{"grapheme":"RD$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"RD$","template":"$1","rtl":false}},"DZD":{"name":"Algerian Dinar","fractionSize":2,"symbol":{"grapheme":".د.ج","template":"1 $","rtl":true},"uniqSymbol":{"grapheme":".د.ج","template":"1 $","rtl":true}},"EEK":{"name":"Estonian Kroon","fractionSize":2,"symbol":{"grapheme":"kr","template":"$1","rtl":false},"uniqSymbol":null},"EGP":{"name":"Egyptian Pound","fractionSize":2,"symbol":{"grapheme":"£","template":"$1","rtl":false},"uniqSymbol":{"grapheme":".ج.م","template":"1 $","rtl":true}},"ERN":{"name":"Nakfa","fractionSize":2,"symbol":{"grapheme":"Nkf","template":"1 $","rtl":false},"uniqSymbol":null},"ETB":{"name":"Ethiopian Birr","fractionSize":2,"symbol":{"grapheme":"Br","template":"1 $","rtl":false},"uniqSymbol":null},"EUR":{"name":"Euro","fractionSize":2,"symbol":{"grapheme":"€","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"€","template":"$1","rtl":false}},"FJD":{"name":"Fiji Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"FJ$","template":"$1","rtl":false}},"FKP":{"name":"Falkland Islands Pound","fractionSize":2,"symbol":{"grapheme":"£","template":"$1","rtl":false},"uniqSymbol":null},"GBP":{"name":"Pound Sterling","fractionSize":2,"symbol":{"grapheme":"£","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"£","template":"$1","rtl":false}},"GEL":{"name":"Lari","fractionSize":2,"symbol":{"grapheme":"GEL","template":"1 $","rtl":false},"uniqSymbol":null},"GGP":{"name":"Guernsey Pound","fractionSize":2,"symbol":{"grapheme":"£","template":"$1","rtl":false},"uniqSymbol":null},"GHC":{"name":"Ghanaian Cedi","fractionSize":2,"symbol":{"grapheme":"¢","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"¢","template":"$1","rtl":false}},"GHS":{"name":"Ghan Cedi","fractionSize":2,"symbol":{"grapheme":"GH₵","template":"1 $","rtl":false},"uniqSymbol":null},"GIP":{"name":"Gibraltar Pound","fractionSize":2,"symbol":{"grapheme":"£","template":"$1","rtl":false},"uniqSymbol":null},"GMD":{"name":"Dalasi","fractionSize":2,"symbol":{"grapheme":"D","template":"1 $","rtl":false},"uniqSymbol":null},"GNF":{"name":"Guine Franc","fractionSize":0,"symbol":{"grapheme":"GFr","template":"1 $","rtl":false},"uniqSymbol":null},"GTQ":{"name":"Quetzal","fractionSize":2,"symbol":{"grapheme":"Q","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"Q","template":"$1","rtl":false}},"GYD":{"name":"Guyan Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"GY$","template":"$1","rtl":false}},"HKD":{"name":"Hong Kong Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"HK$","template":"$1","rtl":false}},"HNL":{"name":"Lempira","fractionSize":2,"symbol":{"grapheme":"L","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"L","template":"$1","rtl":false}},"HRK":{"name":"Croatian Kuna","fractionSize":2,"symbol":{"grapheme":"kn","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"kn","template":"$1","rtl":false}},"HTG":{"name":"Gourde","fractionSize":2,"symbol":{"grapheme":"G","template":"1 $","rtl":false},"uniqSymbol":null},"HUF":{"name":"Forint","fractionSize":0,"symbol":{"grapheme":"Ft","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"Ft","template":"$1","rtl":false}},"IDR":{"name":"Rupiah","fractionSize":2,"symbol":{"grapheme":"Rp","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"Rp","template":"$1","rtl":false}},"ILS":{"name":"New Israeli Sheqel","fractionSize":2,"symbol":{"grapheme":"₪","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"₪","template":"$1","rtl":false}},"IMP":{"name":"Manx Pound","fractionSize":2,"symbol":{"grapheme":"£","template":"$1","rtl":false},"uniqSymbol":null},"INR":{"name":"Indian Rupee","fractionSize":2,"symbol":{"grapheme":"₹","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"₹","template":"$1","rtl":false}},"IQD":{"name":"Iraqi Dinar","fractionSize":3,"symbol":{"grapheme":".د.ع","template":"1 $","rtl":true},"uniqSymbol":{"grapheme":".د.ع","template":"1 $","rtl":true}},"IRR":{"name":"Iranian Rial","fractionSize":0,"symbol":{"grapheme":"﷼","template":"1 $","rtl":true},"uniqSymbol":{"grapheme":"﷼","template":"1 $","rtl":true}},"ISK":{"name":"Iceland Krona","fractionSize":2,"symbol":{"grapheme":"kr","template":"$1","rtl":false},"uniqSymbol":null},"JEP":{"name":"Jersey Pound","fractionSize":2,"symbol":{"grapheme":"£","template":"$1","rtl":false},"uniqSymbol":null},"JMD":{"name":"Jamaican Dollar","fractionSize":2,"symbol":{"grapheme":"J$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"J$","template":"$1","rtl":false}},"JOD":{"name":"Jordanian Dinar","fractionSize":3,"symbol":{"grapheme":".د.إ","template":"1 $","rtl":true},"uniqSymbol":null},"JPY":{"name":"Yen","fractionSize":0,"symbol":{"grapheme":"¥","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"¥","template":"$1","rtl":false}},"KES":{"name":"Kenyan Shilling","fractionSize":2,"symbol":{"grapheme":"KSh","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"KSh","template":"$1","rtl":false}},"KGS":{"name":"Som","fractionSize":2,"symbol":{"grapheme":"сом","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"сом","template":"$1","rtl":false}},"KHR":{"name":"Riel","fractionSize":2,"symbol":{"grapheme":"៛","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"៛","template":"$1","rtl":false}},"KMF":{"name":"Comoro Franc","fractionSize":0,"symbol":{"grapheme":"CF","template":"1 $","rtl":false},"uniqSymbol":null},"KPW":{"name":"North Korean Won","fractionSize":0,"symbol":{"grapheme":"₩","template":"$1","rtl":false},"uniqSymbol":null},"KRW":{"name":"Won","fractionSize":0,"symbol":{"grapheme":"₩","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"₩","template":"$1","rtl":false}},"KWD":{"name":"Kuwaiti Dinar","fractionSize":3,"symbol":{"grapheme":".د.ك","template":"1 $","rtl":true},"uniqSymbol":{"grapheme":".د.ك","template":"1 $","rtl":true}},"KYD":{"name":"Cayman Islands Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"CI$","template":"$1","rtl":false}},"KZT":{"name":"Tenge","fractionSize":2,"symbol":{"grapheme":"₸","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"₸","template":"$1","rtl":false}},"LAK":{"name":"Kip","fractionSize":2,"symbol":{"grapheme":"₭","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"₭","template":"$1","rtl":false}},"LBP":{"name":"Lebanese Pound","fractionSize":2,"symbol":{"grapheme":"£","template":"$1","rtl":false},"uniqSymbol":{"grapheme":".ل.ل","template":"1 $","rtl":true}},"LKR":{"name":"Sri Lank Rupee","fractionSize":2,"symbol":{"grapheme":"₨","template":"$1","rtl":false},"uniqSymbol":null},"LRD":{"name":"Liberian Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"L$","template":"$1","rtl":false}},"LSL":{"name":"Loti","fractionSize":2,"symbol":{"grapheme":"LSL","template":"1 $","rtl":false},"uniqSymbol":null},"LTL":{"name":"Lithuanian Litas","fractionSize":2,"symbol":{"grapheme":"Lt","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"Lt","template":"$1","rtl":false}},"LVL":{"name":"Latvian Lats","fractionSize":2,"symbol":{"grapheme":"Ls","template":"1 $","rtl":false},"uniqSymbol":{"grapheme":"Ls","template":"1 $","rtl":false}},"LYD":{"name":"Libyan Dinar","fractionSize":3,"symbol":{"grapheme":".د.ل","template":"1 $","rtl":true},"uniqSymbol":{"grapheme":".د.ل","template":"1 $","rtl":true}},"MAD":{"name":"Moroccan Dirham","fractionSize":2,"symbol":{"grapheme":".د.م","template":"1 $","rtl":true},"uniqSymbol":{"grapheme":".د.م","template":"1 $","rtl":true}},"MDL":{"name":"Moldovan Leu","fractionSize":2,"symbol":{"grapheme":"lei","template":"1 $","rtl":false},"uniqSymbol":null},"MGA":{"name":"Malagasy ariary","fractionSize":1,"symbol":{"grapheme":"Ar","template":"1 $","rtl":false},"uniqSymbol":null},"MKD":{"name":"Denar","fractionSize":2,"symbol":{"grapheme":"ден","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"ден","template":"$1","rtl":false}},"MMK":{"name":"Kyat","fractionSize":2,"symbol":{"grapheme":"K","template":"$1","rtl":false},"uniqSymbol":null},"MNT":{"name":"Tugrik","fractionSize":2,"symbol":{"grapheme":"₮","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"₮","template":"$1","rtl":false}},"MOP":{"name":"Pataca","fractionSize":2,"symbol":{"grapheme":"MOP$","template":"$1","rtl":false},"uniqSymbol":null},"MRO":{"name":"Ouguiya","fractionSize":2,"symbol":{"grapheme":"ouguiya","template":"1 $","rtl":false},"uniqSymbol":null},"MUR":{"name":"Mauritius Rupee","fractionSize":2,"symbol":{"grapheme":"₨","template":"$1","rtl":false},"uniqSymbol":null},"MVR":{"name":"Rufiyaa","fractionSize":2,"symbol":{"grapheme":"MVR","template":"1 $","rtl":false},"uniqSymbol":null},"MWK":{"name":"Kwacha","fractionSize":2,"symbol":{"grapheme":"MK","template":"$1","rtl":false},"uniqSymbol":null},"MXN":{"name":"Mexican Peso","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":null},"MXV":{"name":"Mexican Unidad de Inversion (UDI)","fractionSize":2,"symbol":{"grapheme":"UDI","template":"1 $","rtl":false},"uniqSymbol":null},"MYR":{"name":"Malaysian Ringgit","fractionSize":2,"symbol":{"grapheme":"RM","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"RM","template":"$1","rtl":false}},"MZN":{"name":"Mozambique Metical","fractionSize":2,"symbol":{"grapheme":"MT","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"MT","template":"$1","rtl":false}},"NAD":{"name":"Namibi Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"N$","template":"$1","rtl":false}},"NGN":{"name":"Naira","fractionSize":2,"symbol":{"grapheme":"₦","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"₦","template":"$1","rtl":false}},"NIO":{"name":"Cordob Oro","fractionSize":2,"symbol":{"grapheme":"C$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"C$","template":"$1","rtl":false}},"NOK":{"name":"Norwegian Krone","fractionSize":2,"symbol":{"grapheme":"kr","template":"1 $","rtl":false},"uniqSymbol":null},"NPR":{"name":"Nepalese Rupee","fractionSize":2,"symbol":{"grapheme":"₨","template":"$1","rtl":false},"uniqSymbol":null},"NZD":{"name":"New Zealand Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"NZ$","template":"$1","rtl":false}},"OMR":{"name":"Rial Omani","fractionSize":3,"symbol":{"grapheme":"﷼","template":"1 $","rtl":true},"uniqSymbol":{"grapheme":".ر.ع","template":"1 $","rtl":true}},"PAB":{"name":"Balboa","fractionSize":2,"symbol":{"grapheme":"B/.","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"B/.","template":"$1","rtl":false}},"PEN":{"name":"Nuevo Sol","fractionSize":2,"symbol":{"grapheme":"S/","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"S/","template":"$1","rtl":false}},"PGK":{"name":"Kina","fractionSize":2,"symbol":{"grapheme":"K","template":"1 $","rtl":false},"uniqSymbol":null},"PHP":{"name":"Philippine Peso","fractionSize":2,"symbol":{"grapheme":"₱","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"₱","template":"$1","rtl":false}},"PKR":{"name":"Pakistan Rupee","fractionSize":2,"symbol":{"grapheme":"₨","template":"$1","rtl":false},"uniqSymbol":null},"PLN":{"name":"Zloty","fractionSize":2,"symbol":{"grapheme":"zł","template":"1 $","rtl":false},"uniqSymbol":{"grapheme":"zł","template":"1 $","rtl":false}},"PYG":{"name":"Guarani","fractionSize":0,"symbol":{"grapheme":"Gs","template":"1$","rtl":false},"uniqSymbol":{"grapheme":"Gs","template":"1$","rtl":false}},"QAR":{"name":"Qatari Rial","fractionSize":2,"symbol":{"grapheme":"﷼","template":"1 $","rtl":true},"uniqSymbol":{"grapheme":".ر.ق","template":"1 $","rtl":true}},"RON":{"name":"New Romanian Leu","fractionSize":2,"symbol":{"grapheme":"lei","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"lei","template":"$1","rtl":false}},"RSD":{"name":"Serbian Dinar","fractionSize":2,"symbol":{"grapheme":"Дин.","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"Дин.","template":"$1","rtl":false}},"RUB":{"name":"Russian Ruble","fractionSize":2,"symbol":{"grapheme":"₽","template":"1 $","rtl":false},"uniqSymbol":{"grapheme":"₽","template":"1 $","rtl":false}},"RUR":{"name":"Russian Ruble","fractionSize":2,"symbol":{"grapheme":"₽","template":"1 $","rtl":false},"uniqSymbol":{"grapheme":"₽","template":"1 $","rtl":false}},"RWF":{"name":"Rwand Franc","fractionSize":0,"symbol":{"grapheme":"R₣","template":"1 $","rtl":false},"uniqSymbol":null},"SAR":{"name":"Saudi Riyal","fractionSize":2,"symbol":{"grapheme":"﷼","template":"1 $","rtl":true},"uniqSymbol":{"grapheme":".ر.س","template":"1 $","rtl":true}},"SBD":{"name":"Solomon Islands Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"SI$","template":"$1","rtl":false}},"SCR":{"name":"Seychelles Rupee","fractionSize":2,"symbol":{"grapheme":"₨","template":"$1","rtl":false},"uniqSymbol":null},"SDG":{"name":"Sudanese Pound","fractionSize":2,"symbol":{"grapheme":"SDG","template":"1 $","rtl":false},"uniqSymbol":null},"SEK":{"name":"Swedish Krona","fractionSize":2,"symbol":{"grapheme":"kr","template":"1 $","rtl":false},"uniqSymbol":null},"SGD":{"name":"Singapore Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"S$","template":"$1","rtl":false}},"SHP":{"name":"Saint Helen Pound","fractionSize":2,"symbol":{"grapheme":"£","template":"$1","rtl":false},"uniqSymbol":null},"SLL":{"name":"Leone","fractionSize":2,"symbol":{"grapheme":"Le","template":"1 $","rtl":false},"uniqSymbol":null},"SOS":{"name":"Somali Shilling","fractionSize":2,"symbol":{"grapheme":"S","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"S","template":"$1","rtl":false}},"SRD":{"name":"Surinam Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":null},"SSP":{"name":"South Sudanese Pound","fractionSize":2,"symbol":{"grapheme":"SS£","template":"1 $","rtl":false},"uniqSymbol":null},"STD":{"name":"Dobra","fractionSize":2,"symbol":{"grapheme":"Db","template":"1 $","rtl":false},"uniqSymbol":null},"SVC":{"name":"El Salvador Colon","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"C","template":"$1","rtl":false}},"SYP":{"name":"Syrian Pound","fractionSize":2,"symbol":{"grapheme":"£","template":"$1","rtl":false},"uniqSymbol":{"grapheme":".ل.س","template":"1 $","rtl":true}},"SZL":{"name":"Lilangeni","fractionSize":2,"symbol":{"grapheme":"L","template":"$1","rtl":false},"uniqSymbol":null},"THB":{"name":"Baht","fractionSize":2,"symbol":{"grapheme":"฿","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"฿","template":"$1","rtl":false}},"TJS":{"name":"Somoni","fractionSize":2,"symbol":{"grapheme":"SM","template":"1 $","rtl":false},"uniqSymbol":null},"TMT":{"name":"Turkmenistan New Manat","fractionSize":2,"symbol":{"grapheme":"T","template":"1 $","rtl":false},"uniqSymbol":null},"TND":{"name":"Tunisian Dinar","fractionSize":3,"symbol":{"grapheme":".د.ت","template":"1 $","rtl":true},"uniqSymbol":{"grapheme":".د.ت","template":"1 $","rtl":true}},"TOP":{"name":"Pa’anga","fractionSize":2,"symbol":{"grapheme":"T$","template":"$1","rtl":false},"uniqSymbol":null},"TRL":{"name":"Turkish Lira","fractionSize":2,"symbol":{"grapheme":"₤","template":"$1","rtl":false},"uniqSymbol":null},"TRY":{"name":"Turkish Lira","fractionSize":2,"symbol":{"grapheme":"₺","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"₺","template":"$1","rtl":false}},"TTD":{"name":"Trinidad and Tobago Dollar","fractionSize":2,"symbol":{"grapheme":"TT$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"TT$","template":"$1","rtl":false}},"TWD":{"name":"New Taiwan Dollar","fractionSize":0,"symbol":{"grapheme":"NT$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"NT$","template":"$1","rtl":false}},"TZS":{"name":"Tanzanian Shilling","fractionSize":0,"symbol":{"grapheme":"TSh","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"TSh","template":"$1","rtl":false}},"UAH":{"name":"Hryvnia","fractionSize":2,"symbol":{"grapheme":"₴","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"₴","template":"$1","rtl":false}},"UGX":{"name":"Ugand Shilling","fractionSize":0,"symbol":{"grapheme":"USh","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"USh","template":"$1","rtl":false}},"USD":{"name":"US Dollar","fractionSize":2,"symbol":{"grapheme":"US$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"US$","template":"$1","rtl":false}},"USN":{"name":"US Dollar (Next day)","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":null},"UYI":{"name":"Uruguay Peso en Unidades Indexadas (URUIURUI)","fractionSize":0,"symbol":{"grapheme":"$U","template":"$1","rtl":false},"uniqSymbol":null},"UYU":{"name":"Peso Uruguayo","fractionSize":0,"symbol":{"grapheme":"$U","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"$U","template":"$1","rtl":false}},"UZS":{"name":"Uzbekistan Sum","fractionSize":2,"symbol":{"grapheme":"so’m","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"so’m","template":"$1","rtl":false}},"VEF":{"name":"Bolivar","fractionSize":2,"symbol":{"grapheme":"Bs","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"Bs","template":"$1","rtl":false}},"VES":{"name":"Bolivar","fractionSize":2,"symbol":{"grapheme":"Bs","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"Bs","template":"$1","rtl":false}},"VND":{"name":"Dong","fractionSize":0,"symbol":{"grapheme":"₫","template":"1 $","rtl":false},"uniqSymbol":{"grapheme":"₫","template":"1 $","rtl":false}},"VUV":{"name":"Vatu","fractionSize":0,"symbol":{"grapheme":"VT","template":"1$","rtl":false},"uniqSymbol":null},"WST":{"name":"Tala","fractionSize":2,"symbol":{"grapheme":"WS$","template":"1 $","rtl":false},"uniqSymbol":null},"XAF":{"name":"CFA Franc BEAC","fractionSize":0,"symbol":{"grapheme":"FCFA","template":"1 $","rtl":false},"uniqSymbol":{"grapheme":"FCFA","template":"1 $","rtl":false}},"XCD":{"name":"East Caribbean Dollar","fractionSize":2,"symbol":{"grapheme":"$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"EC$","template":"$1","rtl":false}},"XDR":{"name":"SDR (Special Drawing Right)","fractionSize":0,"symbol":{"grapheme":"SDR","template":"1 $","rtl":false},"uniqSymbol":null},"XOF":{"name":"CFA Franc BCEAO","fractionSize":0,"symbol":{"grapheme":"CFA","template":"1 $","rtl":false},"uniqSymbol":{"grapheme":"CFA","template":"1 $","rtl":false}},"XPF":{"name":"CFP Franc","fractionSize":0,"symbol":{"grapheme":"₣","template":"1 $","rtl":false},"uniqSymbol":null},"XSU":{"name":"Sucre","fractionSize":0,"symbol":{"grapheme":"XSU","template":"1 $","rtl":false},"uniqSymbol":null},"XUA":{"name":"ADB Unit of Account","fractionSize":0,"symbol":{"grapheme":"XUA","template":"1 $","rtl":false},"uniqSymbol":null},"YER":{"name":"Yemeni Rial","fractionSize":2,"symbol":{"grapheme":"﷼","template":"1 $","rtl":true},"uniqSymbol":{"grapheme":".ر.ي","template":"1 $","rtl":true}},"ZAR":{"name":"Rand","fractionSize":2,"symbol":{"grapheme":"R","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"R","template":"$1","rtl":false}},"ZMW":{"name":"Zambian Kwacha","fractionSize":2,"symbol":{"grapheme":"K","template":"1 $","rtl":false},"uniqSymbol":null},"ZWD":{"name":"Zimbabwe Dollar","fractionSize":2,"symbol":{"grapheme":"Z$","template":"$1","rtl":false},"uniqSymbol":{"grapheme":"Z$","template":"$1","rtl":false}},"ZWL":{"name":"Zimbabwe Dollar","fractionSize":2,"symbol":{"grapheme":"Z$","template":"$1","rtl":false},"uniqSymbol":null},"BTC":{"name":"BTC","fractionSize":4,"symbol":{"grapheme":"₿","template":"1 $","rtl":false},"uniqSymbol":{"grapheme":"₿","template":"1 $","rtl":false}},"ETH":{"name":"ETH","fractionSize":4,"symbol":{"grapheme":"Ξ","template":"1 $","rtl":false},"uniqSymbol":{"grapheme":"Ξ","template":"1 $","rtl":false}},"LTC":{"name":"LTC","fractionSize":4,"symbol":{"grapheme":"Ł","template":"1 $","rtl":false},"uniqSymbol":{"grapheme":"Ł","template":"1 $","rtl":false}}}'
      ),
      Gt = new Map([
        [ot.ZH_HANS, ot.CN],
        [ot.ZH_HANT, ot.CN],
      ]);
    let Kt = class {
      transform(e, t = 1, n = 2, a = 2, i = null) {
        if (((e = Number(e)), isNaN(e))) return '';
        const r = ((e) => (Gt.has(e) ? Gt.get(e) : e))(
          null != i ? i : ze.language
        );
        return new Intl.NumberFormat(r, {
          minimumIntegerDigits: t,
          minimumFractionDigits: n,
          maximumFractionDigits: a,
        }).format(e);
      }
    };
    Kt = o([L()], Kt);
    let Ut = class {
      constructor(e) {
        this.decimalPipe = e;
      }
      transform(e, t) {
        return e && t ? this.formatCurrency(e, t) : null;
      }
      getCurrencyConfig(e) {
        return Vt[e.toUpperCase()] || null;
      }
      formatCurrency(e, t) {
        const n = this.getCurrencyConfig(t);
        if (!(null == n ? void 0 : n.uniqSymbol))
          return this.formatCurrencyWithNoConfig(e, t);
        const a = this.decimalPipe.transform(
          e,
          1,
          n.fractionSize,
          n.fractionSize
        );
        return a
          ? n.uniqSymbol.template
              .replace('1', a)
              .replace('$', n.uniqSymbol.grapheme)
          : null;
      }
      formatCurrencyWithNoConfig(e, t) {
        const n = this.decimalPipe.transform(e, 1, 2, 2);
        return n ? `${n} ${t}` : null;
      }
    };
    Ut = o([L(), s('design:paramtypes', [Kt])], Ut);
    class Bt extends ut {
      constructor() {
        super(...arguments),
          (this.priceLineContent = null),
          (this.priceLineAmount = null),
          (this.priceLineCurrency = null),
          (this.amount = null),
          (this.currency = null);
      }
      static get observedAttributes() {
        return [
          _t.priceLineContent,
          _t.priceLineAmount,
          _t.priceLineCurrency,
          _t.amount,
          _t.currency,
        ];
      }
      connectedCallback() {
        this.readAttributes(), this.render();
      }
      getHtml() {
        var e, t;
        const n =
            null === this.priceLineAmount
              ? null
              : {
                  amount: this.priceLineAmount,
                  currency:
                    null !== (e = this.priceLineCurrency) && void 0 !== e
                      ? e
                      : '',
                },
          a =
            null === this.amount
              ? null
              : {
                  amount: this.amount,
                  currency:
                    null !== (t = this.currency) && void 0 !== t ? t : '',
                };
        return ((e, t, n) => {
          var a, i;
          const r = [],
            o = T.resolve(Ut);
          return (
            e && r.push(`<div class="content">${e}</div>`),
            t &&
              r.push(
                `<div class="price">${
                  null !== (a = o.transform(t.amount, t.currency)) &&
                  void 0 !== a
                    ? a
                    : ''
                }</div>`
              ),
            n &&
              r.push(
                `<div class="price">${
                  null !== (i = o.transform(n.amount, n.currency)) &&
                  void 0 !== i
                    ? i
                    : ''
                }</div>`
              ),
            r.join('')
          );
        })(this.priceLineContent, n, a);
      }
      readAttributes() {
        (this.priceLineContent = this.getAttribute(_t.priceLineContent)),
          (this.priceLineContent = this.getAttribute(_t.priceLineContent)),
          (this.priceLineAmount = this.getNumberAttribute(_t.priceLineAmount)),
          (this.priceLineCurrency = this.getAttribute(_t.priceLineCurrency)),
          (this.amount = this.getNumberAttribute(_t.amount)),
          (this.currency = this.getAttribute(_t.currency));
      }
    }
    const Wt = {
      [vt.TextComponent]: ht,
      [vt.SubmitButtonComponent]: yt,
      [vt.PaymentMethodsComponent]: wt,
      [vt.PriceTextComponent]: Bt,
      [vt.FinanceDetailsComponent]: Mt,
      [vt.LegalComponent]: xt,
    };
    var Jt;
    !(function (e) {
      (e.created = 'created'),
        (e.awaiting = 'awaiting'),
        (e.processing = 'processing'),
        (e.authorized = 'authorized'),
        (e.held = 'held'),
        (e.done = 'done'),
        (e.error = 'error'),
        (e.canceled = 'canceled'),
        (e.unknown = 'unknown');
    })(Jt || (Jt = {}));
    const Zt = (e) => {
        var t, n, a;
        return lt((a = e)) && 'error' === a.name
          ? {
              isHandled: !0,
              value:
                null !==
                  (n =
                    null === (t = e.data) || void 0 === t ? void 0 : t.error) &&
                void 0 !== n
                  ? n
                  : 'Unknown error',
            }
          : null;
      },
      Yt = (e) => {
        var t;
        return (
          !!lt(e) &&
          ('getPaymentMethodsList' === e.name ||
            ('getPaymentQuickMethods' === e.name &&
              void 0 !==
                (null === (t = e.data) || void 0 === t ? void 0 : t.methods)))
        );
      },
      Xt = (e) => {
        var t;
        if (Yt(e) && 'getPaymentQuickMethods' === e.name) {
          const n = null === (t = e.data) || void 0 === t ? void 0 : t.methods;
          return { isHandled: !0, value: null != n ? n : [] };
        }
        return null;
      },
      Qt = (e) => {
        var t;
        if (Yt(e) && 'getPaymentMethodsList' === e.name) {
          const n = null === (t = e.data) || void 0 === t ? void 0 : t.methods;
          return { isHandled: !0, value: null != n ? n : [] };
        }
        return null;
      },
      en = (e) => {
        var t;
        if (
          !((e) => {
            var t;
            return (
              !!lt(e) &&
              'getSavedMethods' === e.name &&
              void 0 !==
                (null === (t = e.data) || void 0 === t ? void 0 : t.methods)
            );
          })(e)
        )
          return null;
        const n = null === (t = e.data) || void 0 === t ? void 0 : t.methods;
        return { isHandled: !0, value: null != n ? n : [] };
      },
      tn = (e) => {
        return lt((t = e)) &&
          'getUserBalance' === t.name &&
          void 0 !==
            (null === (n = t.data) || void 0 === n ? void 0 : n.userBalance)
          ? { isHandled: !0, value: e.data.userBalance }
          : null;
        var t, n;
      },
      nn = (e) => {
        return lt((t = e)) && 'nextAction' === t.name
          ? { isHandled: !0, value: e.data }
          : null;
        var t;
      };
    let an = class {
      constructor(e, t, n, a, i) {
        (this.window = e),
          (this.postMessagesClient = t),
          (this.localizeService = n),
          (this.headlessCheckoutSpy = a),
          (this.formSpy = i),
          (this.events = {
            send: (e, t) =>
              l(this, void 0, void 0, function* () {
                return this.postMessagesClient.send(e, t);
              }),
            onCoreEvent: (e, t, n) => this.postMessagesClient.listen(e, t, n),
          }),
          (this.form = {
            init: (e) =>
              l(this, void 0, void 0, function* () {
                const t = { name: 'initForm', data: { configuration: e } };
                return this.postMessagesClient.send(t, (e) =>
                  ((e, t) => {
                    return lt((n = e)) && 'initForm' === n.name
                      ? ('function' == typeof t && t(),
                        { isHandled: !0, value: e.data })
                      : null;
                    var n;
                  })(e, () => (this.formSpy.formWasInit = !0))
                );
              }),
            onNextAction: (e) => {
              this.postMessagesClient.listen('nextAction', nn, (t) => {
                t && e(t);
              });
            },
            getStatus: () =>
              l(this, void 0, void 0, function* () {
                return (
                  (yield this.postMessagesClient.send(
                    { name: 'getPaymentStatus' },
                    (e) =>
                      ((e) => {
                        return lt((t = e)) && 'getPaymentStatus' === t.name
                          ? { isHandled: !0, value: e.data }
                          : null;
                        var t;
                      })(e)
                  )) || {
                    statusState: Jt.unknown,
                    statusMessage: 'Unknown status',
                    group: 'unknown',
                  }
                );
              }),
          }),
          (this.headlessAppUrl = pt);
      }
      init(e) {
        return l(this, void 0, void 0, function* () {
          (this.isWebView = e.isWebview),
            yield this.localizeService.initDictionaries(),
            yield this.setupCoreIframe(),
            this.defineComponents(),
            this.postMessagesClient.init(this.coreIframe, this.headlessAppUrl),
            (this.errorsSubscription = this.postMessagesClient.listen(
              'error',
              Zt,
              (e) => {
                throw new Error(e);
              }
            ));
        });
      }
      destroy() {
        var e;
        this.destroyCoreIframe(),
          null === (e = this.errorsSubscription) ||
            void 0 === e ||
            e.call(this);
      }
      setToken(e) {
        return l(this, void 0, void 0, function* () {
          if (!e) throw new Error('Need correct token');
          const t = {
            name: 'initPayment',
            data: { configuration: { token: e, isWebView: this.isWebView } },
          };
          return this.postMessagesClient.send(t, (e) =>
            ((e, t) =>
              'initPayment' === e.name ? (t(), { isHandled: !0 }) : null)(
              e,
              () => {
                this.headlessCheckoutSpy.appWasInit = !0;
              }
            )
          );
        });
      }
      getFinanceDetails() {
        return l(this, void 0, void 0, function* () {
          return this.postMessagesClient.send({ name: 'financeDetails' }, Ot);
        });
      }
      getRegularMethods(e) {
        return l(this, void 0, void 0, function* () {
          const t = { name: 'getPaymentMethodsList', data: { country: e } };
          return this.postMessagesClient.send(t, Qt);
        });
      }
      getQuickMethods(e) {
        return l(this, void 0, void 0, function* () {
          const t = { name: 'getPaymentQuickMethods', data: { country: e } };
          return this.postMessagesClient.send(t, Xt);
        });
      }
      getSavedMethods() {
        return l(this, void 0, void 0, function* () {
          return this.postMessagesClient.send({ name: 'getSavedMethods' }, en);
        });
      }
      getUserBalance() {
        return l(this, void 0, void 0, function* () {
          return this.postMessagesClient.send({ name: 'getUserBalance' }, tn);
        });
      }
      setupCoreIframe() {
        return l(this, void 0, void 0, function* () {
          return (
            (this.coreIframe = this.window.document.createElement('iframe')),
            (this.coreIframe.width = '0px'),
            (this.coreIframe.height = '0px'),
            (this.coreIframe.style.border = 'none'),
            (this.coreIframe.style.position = 'absolute'),
            (this.coreIframe.src = `${this.headlessAppUrl}/core`),
            (this.coreIframe.name = 'core'),
            this.window.document.body.appendChild(this.coreIframe),
            new Promise((e) => {
              this.coreIframe.onload = () => {
                e();
              };
            })
          );
        });
      }
      destroyCoreIframe() {
        this.coreIframe.remove();
      }
      defineComponents() {
        Object.entries(Wt).forEach(([e, t]) => {
          this.window.customElements.get(e) ||
            this.window.customElements.define(e, t);
        });
      }
    };
    (an = o([L(), s('design:paramtypes', [Window, ct, st, kt, mt])], an)),
      T.register(Window, { useValue: window });
    const rn = T.resolve(an);
  })(),
    (PayStationSdk = a);
})();
