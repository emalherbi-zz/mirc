(function () {
  var h,
    aa = this;
  function n(a) {
    return void 0 !== a;
  }
  function ba() {}
  function ca(a) {
    a.rb = function () {
      return a.ld ? a.ld : (a.ld = new a());
    };
  }
  function da(a) {
    var b = typeof a;
    if ('object' == b)
      if (a) {
        if (a instanceof Array) return 'array';
        if (a instanceof Object) return b;
        var c = Object.prototype.toString.call(a);
        if ('[object Window]' == c) return 'object';
        if (
          '[object Array]' == c ||
          ('number' == typeof a.length && 'undefined' != typeof a.splice && 'undefined' != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable('splice'))
        )
          return 'array';
        if ('[object Function]' == c || ('undefined' != typeof a.call && 'undefined' != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable('call'))) return 'function';
      } else return 'null';
    else if ('function' == b && 'undefined' == typeof a.call) return 'object';
    return b;
  }
  function ea(a) {
    var b = da(a);
    return 'array' == b || ('object' == b && 'number' == typeof a.length);
  }
  function q(a) {
    return 'string' == typeof a;
  }
  function fa(a) {
    return 'number' == typeof a;
  }
  function ga(a) {
    var b = typeof a;
    return ('object' == b && null != a) || 'function' == b;
  }
  function ha(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function ia(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function () {
        var c = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(c, d);
        return a.apply(b, c);
      };
    }
    return function () {
      return a.apply(b, arguments);
    };
  }
  function r(a, b, c) {
    r = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf('native code') ? ha : ia;
    return r.apply(null, arguments);
  }
  function ja(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.ke = b.prototype;
    a.prototype = new c();
    a.ie = function (a, c, f) {
      return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2));
    };
  }
  function ka(a) {
    a = String(a);
    if (
      /^\s*$/.test(a)
        ? 0
        : /^[\],:{}\s\u2028\u2029]*$/.test(
            a
              .replace(/\\["\\\/bfnrtu]/g, '@')
              .replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
              .replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, '')
          )
    )
      try {
        return eval('(' + a + ')');
      } catch (b) {}
    throw Error('Invalid JSON string: ' + a);
  }
  function la() {
    this.mc = void 0;
  }
  function ma(a, b, c) {
    switch (typeof b) {
      case 'string':
        na(b, c);
        break;
      case 'number':
        c.push(isFinite(b) && !isNaN(b) ? b : 'null');
        break;
      case 'boolean':
        c.push(b);
        break;
      case 'undefined':
        c.push('null');
        break;
      case 'object':
        if (null == b) {
          c.push('null');
          break;
        }
        if ('array' == da(b)) {
          var d = b.length;
          c.push('[');
          for (var e = '', f = 0; f < d; f++) c.push(e), (e = b[f]), ma(a, a.mc ? a.mc.call(b, String(f), e) : e, c), (e = ',');
          c.push(']');
          break;
        }
        c.push('{');
        d = '';
        for (f in b)
          Object.prototype.hasOwnProperty.call(b, f) &&
            ((e = b[f]), 'function' != typeof e && (c.push(d), na(f, c), c.push(':'), ma(a, a.mc ? a.mc.call(b, f, e) : e, c), (d = ',')));
        c.push('}');
        break;
      case 'function':
        break;
      default:
        throw Error('Unknown type: ' + typeof b);
    }
  }
  var oa = { '"': '\\"', '\\': '\\\\', '/': '\\/', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t', '\x0B': '\\u000b' },
    pa = /\uffff/.test('\uffff') ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
  function na(a, b) {
    b.push(
      '"',
      a.replace(pa, function (a) {
        if (a in oa) return oa[a];
        var b = a.charCodeAt(0),
          e = '\\u';
        16 > b ? (e += '000') : 256 > b ? (e += '00') : 4096 > b && (e += '0');
        return (oa[a] = e + b.toString(16));
      }),
      '"'
    );
  }
  function qa(a) {
    return 'undefined' !== typeof JSON && n(JSON.parse) ? JSON.parse(a) : ka(a);
  }
  function u(a) {
    if ('undefined' !== typeof JSON && n(JSON.stringify)) a = JSON.stringify(a);
    else {
      var b = [];
      ma(new la(), a, b);
      a = b.join('');
    }
    return a;
  }
  function ra(a) {
    for (var b = [], c = 0, d = 0; d < a.length; d++) {
      var e = a.charCodeAt(d);
      55296 <= e && 56319 >= e && ((e -= 55296), d++, v(d < a.length, 'Surrogate pair missing trail surrogate.'), (e = 65536 + (e << 10) + (a.charCodeAt(d) - 56320)));
      128 > e
        ? (b[c++] = e)
        : (2048 > e
            ? (b[c++] = (e >> 6) | 192)
            : (65536 > e ? (b[c++] = (e >> 12) | 224) : ((b[c++] = (e >> 18) | 240), (b[c++] = ((e >> 12) & 63) | 128)), (b[c++] = ((e >> 6) & 63) | 128)),
          (b[c++] = (e & 63) | 128));
    }
    return b;
  }
  var sa = {};
  function x(a, b, c, d) {
    var e;
    d < b ? (e = 'at least ' + b) : d > c && (e = 0 === c ? 'none' : 'no more than ' + c);
    if (e) throw Error(a + ' failed: Was called with ' + d + (1 === d ? ' argument.' : ' arguments.') + ' Expects ' + e + '.');
  }
  function y(a, b, c) {
    var d = '';
    switch (b) {
      case 1:
        d = c ? 'first' : 'First';
        break;
      case 2:
        d = c ? 'second' : 'Second';
        break;
      case 3:
        d = c ? 'third' : 'Third';
        break;
      case 4:
        d = c ? 'fourth' : 'Fourth';
        break;
      default:
        ta.assert(!1, 'errorPrefix_ called with argumentNumber > 4.  Need to update it?');
    }
    return (a = a + ' failed: ' + (d + ' argument '));
  }
  function z(a, b, c, d) {
    if ((!d || n(c)) && 'function' != da(c)) throw Error(y(a, b, d) + 'must be a valid function.');
  }
  function ua(a, b, c) {
    if (n(c) && (!ga(c) || null === c)) throw Error(y(a, b, !0) + 'must be a valid context object.');
  }
  function A(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  function va(a, b) {
    if (Object.prototype.hasOwnProperty.call(a, b)) return a[b];
  }
  var ta = {},
    wa = /[\[\].#$\/]/,
    xa = /[\[\].#$]/;
  function ya(a) {
    return q(a) && 0 !== a.length && !wa.test(a);
  }
  function za(a, b, c) {
    (c && !n(b)) || Aa(y(a, 1, c), b);
  }
  function Aa(a, b, c, d) {
    c || (c = 0);
    d = d || [];
    if (!n(b)) throw Error(a + 'contains undefined' + Ba(d));
    if ('function' == da(b)) throw Error(a + 'contains a function' + Ba(d) + ' with contents: ' + b.toString());
    if (Ca(b)) throw Error(a + 'contains ' + b.toString() + Ba(d));
    if (1e3 < c) throw new TypeError(a + 'contains a cyclic object value (' + d.slice(0, 100).join('.') + '...)');
    if (q(b) && b.length > 10485760 / 3 && 10485760 < ra(b).length)
      throw Error(a + 'contains a string greater than 10485760 utf8 bytes' + Ba(d) + " ('" + b.substring(0, 50) + "...')");
    if (ga(b))
      for (var e in b)
        if (A(b, e)) {
          var f = b[e];
          if ('.priority' !== e && '.value' !== e && '.sv' !== e && !ya(e))
            throw Error(a + ' contains an invalid key (' + e + ')' + Ba(d) + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
          d.push(e);
          Aa(a, f, c + 1, d);
          d.pop();
        }
  }
  function Ba(a) {
    return 0 == a.length ? '' : " in property '" + a.join('.') + "'";
  }
  function Da(a, b) {
    if (!ga(b)) throw Error(y(a, 1, !1) + ' must be an object containing the children to replace.');
    za(a, b, !1);
  }
  function Ea(a, b, c, d) {
    if (!((d && !n(c)) || null === c || fa(c) || q(c) || (ga(c) && A(c, '.sv')))) throw Error(y(a, b, d) + 'must be a valid firebase priority (a string, number, or null).');
  }
  function Fa(a, b, c) {
    if (!c || n(b))
      switch (b) {
        case 'value':
        case 'child_added':
        case 'child_removed':
        case 'child_changed':
        case 'child_moved':
          break;
        default:
          throw Error(y(a, 1, c) + 'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');
      }
  }
  function Ga(a, b) {
    if (n(b) && !ya(b)) throw Error(y(a, 2, !0) + 'was an invalid key: "' + b + '".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');
  }
  function Ha(a, b) {
    if (!q(b) || 0 === b.length || xa.test(b))
      throw Error(y(a, 1, !1) + 'was an invalid path: "' + b + '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');
  }
  function B(a, b) {
    if ('.info' === C(b)) throw Error(a + " failed: Can't modify data under /.info/");
  }
  function D(a, b, c, d, e, f, g) {
    this.m = a;
    this.path = b;
    this.Ea = c;
    this.fa = d;
    this.ya = e;
    this.Ca = f;
    this.Wa = g;
    if (n(this.fa) && n(this.Ca) && n(this.Ea)) throw "Query: Can't combine startAt(), endAt(), and limit().";
  }
  D.prototype.Uc = function () {
    x('Query.ref', 0, 0, arguments.length);
    return new E(this.m, this.path);
  };
  D.prototype.ref = D.prototype.Uc;
  D.prototype.fb = function (a, b) {
    x('Query.on', 2, 4, arguments.length);
    Fa('Query.on', a, !1);
    z('Query.on', 2, b, !1);
    var c = Ia('Query.on', arguments[2], arguments[3]);
    this.m.Rb(this, a, b, c.cancel, c.Y);
    return b;
  };
  D.prototype.on = D.prototype.fb;
  D.prototype.yb = function (a, b, c) {
    x('Query.off', 0, 3, arguments.length);
    Fa('Query.off', a, !0);
    z('Query.off', 2, b, !0);
    ua('Query.off', 3, c);
    this.m.lc(this, a, b, c);
  };
  D.prototype.off = D.prototype.yb;
  D.prototype.Wd = function (a, b) {
    function c(g) {
      f && ((f = !1), e.yb(a, c), b.call(d.Y, g));
    }
    x('Query.once', 2, 4, arguments.length);
    Fa('Query.once', a, !1);
    z('Query.once', 2, b, !1);
    var d = Ia('Query.once', arguments[2], arguments[3]),
      e = this,
      f = !0;
    this.fb(a, c, function (b) {
      e.yb(a, c);
      d.cancel && d.cancel.call(d.Y, b);
    });
  };
  D.prototype.once = D.prototype.Wd;
  D.prototype.Pd = function (a) {
    x('Query.limit', 1, 1, arguments.length);
    if (!fa(a) || Math.floor(a) !== a || 0 >= a) throw 'Query.limit: First argument must be a positive integer.';
    return new D(this.m, this.path, a, this.fa, this.ya, this.Ca, this.Wa);
  };
  D.prototype.limit = D.prototype.Pd;
  D.prototype.ee = function (a, b) {
    x('Query.startAt', 0, 2, arguments.length);
    Ea('Query.startAt', 1, a, !0);
    Ga('Query.startAt', b);
    n(a) || (b = a = null);
    return new D(this.m, this.path, this.Ea, a, b, this.Ca, this.Wa);
  };
  D.prototype.startAt = D.prototype.ee;
  D.prototype.Jd = function (a, b) {
    x('Query.endAt', 0, 2, arguments.length);
    Ea('Query.endAt', 1, a, !0);
    Ga('Query.endAt', b);
    return new D(this.m, this.path, this.Ea, this.fa, this.ya, a, b);
  };
  D.prototype.endAt = D.prototype.Jd;
  function Ja(a) {
    var b = {};
    n(a.fa) && (b.sp = a.fa);
    n(a.ya) && (b.sn = a.ya);
    n(a.Ca) && (b.ep = a.Ca);
    n(a.Wa) && (b.en = a.Wa);
    n(a.Ea) && (b.l = a.Ea);
    n(a.fa) && n(a.ya) && null === a.fa && null === a.ya && (b.vf = 'l');
    return b;
  }
  D.prototype.Pa = function () {
    var a = Ka(Ja(this));
    return '{}' === a ? 'default' : a;
  };
  function Ia(a, b, c) {
    var d = {};
    if (b && c) (d.cancel = b), z(a, 3, d.cancel, !0), (d.Y = c), ua(a, 4, d.Y);
    else if (b)
      if ('object' === typeof b && null !== b) d.Y = b;
      else if ('function' === typeof b) d.cancel = b;
      else throw Error(sa.je(a, 3, !0) + 'must either be a cancel callback or a context object.');
    return d;
  }
  function F(a, b) {
    if (1 == arguments.length) {
      this.n = a.split('/');
      for (var c = 0, d = 0; d < this.n.length; d++) 0 < this.n[d].length && ((this.n[c] = this.n[d]), c++);
      this.n.length = c;
      this.da = 0;
    } else (this.n = a), (this.da = b);
  }
  function C(a) {
    return a.da >= a.n.length ? null : a.n[a.da];
  }
  function La(a) {
    var b = a.da;
    b < a.n.length && b++;
    return new F(a.n, b);
  }
  function Ma(a) {
    return a.da < a.n.length ? a.n[a.n.length - 1] : null;
  }
  h = F.prototype;
  h.toString = function () {
    for (var a = '', b = this.da; b < this.n.length; b++) '' !== this.n[b] && (a += '/' + this.n[b]);
    return a || '/';
  };
  h.parent = function () {
    if (this.da >= this.n.length) return null;
    for (var a = [], b = this.da; b < this.n.length - 1; b++) a.push(this.n[b]);
    return new F(a, 0);
  };
  h.G = function (a) {
    for (var b = [], c = this.da; c < this.n.length; c++) b.push(this.n[c]);
    if (a instanceof F) for (c = a.da; c < a.n.length; c++) b.push(a.n[c]);
    else for (a = a.split('/'), c = 0; c < a.length; c++) 0 < a[c].length && b.push(a[c]);
    return new F(b, 0);
  };
  h.f = function () {
    return this.da >= this.n.length;
  };
  function Na(a, b) {
    var c = C(a);
    if (null === c) return b;
    if (c === C(b)) return Na(La(a), La(b));
    throw 'INTERNAL ERROR: innerPath (' + b + ') is not within outerPath (' + a + ')';
  }
  h.contains = function (a) {
    var b = 0;
    if (this.n.length > a.n.length) return !1;
    for (; b < this.n.length; ) {
      if (this.n[b] !== a.n[b]) return !1;
      ++b;
    }
    return !0;
  };
  function Oa() {
    this.children = {};
    this.yc = 0;
    this.value = null;
  }
  function Pa(a, b, c) {
    this.Fa = a ? a : '';
    this.Eb = b ? b : null;
    this.B = c ? c : new Oa();
  }
  function I(a, b) {
    for (var c = b instanceof F ? b : new F(b), d = a, e; null !== (e = C(c)); ) (d = new Pa(e, d, va(d.B.children, e) || new Oa())), (c = La(c));
    return d;
  }
  h = Pa.prototype;
  h.j = function () {
    return this.B.value;
  };
  function J(a, b) {
    v('undefined' !== typeof b, 'Cannot set value to undefined');
    a.B.value = b;
    Qa(a);
  }
  h.sb = function () {
    return 0 < this.B.yc;
  };
  h.f = function () {
    return null === this.j() && !this.sb();
  };
  h.A = function (a) {
    for (var b in this.B.children) a(new Pa(b, this, this.B.children[b]));
  };
  function Ra(a, b, c, d) {
    c && !d && b(a);
    a.A(function (a) {
      Ra(a, b, !0, d);
    });
    c && d && b(a);
  }
  function Sa(a, b, c) {
    for (a = c ? a : a.parent(); null !== a; ) {
      if (b(a)) return !0;
      a = a.parent();
    }
    return !1;
  }
  h.path = function () {
    return new F(null === this.Eb ? this.Fa : this.Eb.path() + '/' + this.Fa);
  };
  h.name = function () {
    return this.Fa;
  };
  h.parent = function () {
    return this.Eb;
  };
  function Qa(a) {
    if (null !== a.Eb) {
      var b = a.Eb,
        c = a.Fa,
        d = a.f(),
        e = A(b.B.children, c);
      d && e ? (delete b.B.children[c], b.B.yc--, Qa(b)) : d || e || ((b.B.children[c] = a.B), b.B.yc++, Qa(b));
    }
  }
  function Ta(a, b) {
    this.Ta = a ? a : Ua;
    this.ea = b ? b : Va;
  }
  function Ua(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  h = Ta.prototype;
  h.sa = function (a, b) {
    return new Ta(this.Ta, this.ea.sa(a, b, this.Ta).J(null, null, !1, null, null));
  };
  h.remove = function (a) {
    return new Ta(this.Ta, this.ea.remove(a, this.Ta).J(null, null, !1, null, null));
  };
  h.get = function (a) {
    for (var b, c = this.ea; !c.f(); ) {
      b = this.Ta(a, c.key);
      if (0 === b) return c.value;
      0 > b ? (c = c.left) : 0 < b && (c = c.right);
    }
    return null;
  };
  function Wa(a, b) {
    for (var c, d = a.ea, e = null; !d.f(); ) {
      c = a.Ta(b, d.key);
      if (0 === c) {
        if (d.left.f()) return e ? e.key : null;
        for (d = d.left; !d.right.f(); ) d = d.right;
        return d.key;
      }
      0 > c ? (d = d.left) : 0 < c && ((e = d), (d = d.right));
    }
    throw Error('Attempted to find predecessor key for a nonexistent key.  What gives?');
  }
  h.f = function () {
    return this.ea.f();
  };
  h.count = function () {
    return this.ea.count();
  };
  h.xb = function () {
    return this.ea.xb();
  };
  h.bb = function () {
    return this.ea.bb();
  };
  h.Da = function (a) {
    return this.ea.Da(a);
  };
  h.Qa = function (a) {
    return this.ea.Qa(a);
  };
  h.Za = function (a) {
    return new Xa(this.ea, a);
  };
  function Xa(a, b) {
    this.ud = b;
    for (this.Zb = []; !a.f(); ) this.Zb.push(a), (a = a.left);
  }
  function Ya(a) {
    if (0 === a.Zb.length) return null;
    var b = a.Zb.pop(),
      c;
    c = a.ud ? a.ud(b.key, b.value) : { key: b.key, value: b.value };
    for (b = b.right; !b.f(); ) a.Zb.push(b), (b = b.left);
    return c;
  }
  function Za(a, b, c, d, e) {
    this.key = a;
    this.value = b;
    this.color = null != c ? c : !0;
    this.left = null != d ? d : Va;
    this.right = null != e ? e : Va;
  }
  h = Za.prototype;
  h.J = function (a, b, c, d, e) {
    return new Za(null != a ? a : this.key, null != b ? b : this.value, null != c ? c : this.color, null != d ? d : this.left, null != e ? e : this.right);
  };
  h.count = function () {
    return this.left.count() + 1 + this.right.count();
  };
  h.f = function () {
    return !1;
  };
  h.Da = function (a) {
    return this.left.Da(a) || a(this.key, this.value) || this.right.Da(a);
  };
  h.Qa = function (a) {
    return this.right.Qa(a) || a(this.key, this.value) || this.left.Qa(a);
  };
  function bb(a) {
    return a.left.f() ? a : bb(a.left);
  }
  h.xb = function () {
    return bb(this).key;
  };
  h.bb = function () {
    return this.right.f() ? this.key : this.right.bb();
  };
  h.sa = function (a, b, c) {
    var d, e;
    e = this;
    d = c(a, e.key);
    e = 0 > d ? e.J(null, null, null, e.left.sa(a, b, c), null) : 0 === d ? e.J(null, b, null, null, null) : e.J(null, null, null, null, e.right.sa(a, b, c));
    return cb(e);
  };
  function db(a) {
    if (a.left.f()) return Va;
    a.left.Q() || a.left.left.Q() || (a = eb(a));
    a = a.J(null, null, null, db(a.left), null);
    return cb(a);
  }
  h.remove = function (a, b) {
    var c, d;
    c = this;
    if (0 > b(a, c.key)) c.left.f() || c.left.Q() || c.left.left.Q() || (c = eb(c)), (c = c.J(null, null, null, c.left.remove(a, b), null));
    else {
      c.left.Q() && (c = fb(c));
      c.right.f() || c.right.Q() || c.right.left.Q() || ((c = gb(c)), c.left.left.Q() && ((c = fb(c)), (c = gb(c))));
      if (0 === b(a, c.key)) {
        if (c.right.f()) return Va;
        d = bb(c.right);
        c = c.J(d.key, d.value, null, null, db(c.right));
      }
      c = c.J(null, null, null, null, c.right.remove(a, b));
    }
    return cb(c);
  };
  h.Q = function () {
    return this.color;
  };
  function cb(a) {
    a.right.Q() && !a.left.Q() && (a = hb(a));
    a.left.Q() && a.left.left.Q() && (a = fb(a));
    a.left.Q() && a.right.Q() && (a = gb(a));
    return a;
  }
  function eb(a) {
    a = gb(a);
    a.right.left.Q() && ((a = a.J(null, null, null, null, fb(a.right))), (a = hb(a)), (a = gb(a)));
    return a;
  }
  function hb(a) {
    return a.right.J(null, null, a.color, a.J(null, null, !0, null, a.right.left), null);
  }
  function fb(a) {
    return a.left.J(null, null, a.color, null, a.J(null, null, !0, a.left.right, null));
  }
  function gb(a) {
    return a.J(null, null, !a.color, a.left.J(null, null, !a.left.color, null, null), a.right.J(null, null, !a.right.color, null, null));
  }
  function ib() {}
  h = ib.prototype;
  h.J = function () {
    return this;
  };
  h.sa = function (a, b) {
    return new Za(a, b, null);
  };
  h.remove = function () {
    return this;
  };
  h.count = function () {
    return 0;
  };
  h.f = function () {
    return !0;
  };
  h.Da = function () {
    return !1;
  };
  h.Qa = function () {
    return !1;
  };
  h.xb = function () {
    return null;
  };
  h.bb = function () {
    return null;
  };
  h.Q = function () {
    return !1;
  };
  var Va = new ib();
  function jb(a) {
    this.Ub = a;
    this.hc = 'firebase:';
  }
  jb.prototype.set = function (a, b) {
    null == b ? this.Ub.removeItem(this.hc + a) : this.Ub.setItem(this.hc + a, u(b));
  };
  jb.prototype.get = function (a) {
    a = this.Ub.getItem(this.hc + a);
    return null == a ? null : qa(a);
  };
  jb.prototype.remove = function (a) {
    this.Ub.removeItem(this.hc + a);
  };
  jb.prototype.nd = !1;
  function kb() {
    this.nb = {};
  }
  kb.prototype.set = function (a, b) {
    null == b ? delete this.nb[a] : (this.nb[a] = b);
  };
  kb.prototype.get = function (a) {
    return A(this.nb, a) ? this.nb[a] : null;
  };
  kb.prototype.remove = function (a) {
    delete this.nb[a];
  };
  kb.prototype.nd = !0;
  function lb(a) {
    try {
      if ('undefined' !== typeof window && 'undefined' !== typeof window[a]) {
        var b = window[a];
        b.setItem('firebase:sentinel', 'cache');
        b.removeItem('firebase:sentinel');
        return new jb(b);
      }
    } catch (c) {}
    return new kb();
  }
  var mb = lb('localStorage'),
    nb = lb('sessionStorage');
  function ob(a, b, c, d) {
    this.host = a.toLowerCase();
    this.domain = this.host.substr(this.host.indexOf('.') + 1);
    this.nc = b;
    this.Yb = c;
    this.ge = d;
    this.ha = mb.get('host:' + a) || this.host;
  }
  function pb(a, b) {
    b !== a.ha && ((a.ha = b), 's-' === a.ha.substr(0, 2) && mb.set('host:' + a.host, a.ha));
  }
  ob.prototype.toString = function () {
    return (this.nc ? 'https://' : 'http://') + this.host;
  };
  function qb() {
    this.qa = -1;
  }
  function rb() {
    this.qa = -1;
    this.qa = 64;
    this.C = [];
    this.xc = [];
    this.Ed = [];
    this.ec = [];
    this.ec[0] = 128;
    for (var a = 1; a < this.qa; ++a) this.ec[a] = 0;
    this.rc = this.$a = 0;
    this.reset();
  }
  ja(rb, qb);
  rb.prototype.reset = function () {
    this.C[0] = 1732584193;
    this.C[1] = 4023233417;
    this.C[2] = 2562383102;
    this.C[3] = 271733878;
    this.C[4] = 3285377520;
    this.rc = this.$a = 0;
  };
  function sb(a, b, c) {
    c || (c = 0);
    var d = a.Ed;
    if (q(b)) for (var e = 0; 16 > e; e++) (d[e] = (b.charCodeAt(c) << 24) | (b.charCodeAt(c + 1) << 16) | (b.charCodeAt(c + 2) << 8) | b.charCodeAt(c + 3)), (c += 4);
    else for (e = 0; 16 > e; e++) (d[e] = (b[c] << 24) | (b[c + 1] << 16) | (b[c + 2] << 8) | b[c + 3]), (c += 4);
    for (e = 16; 80 > e; e++) {
      var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
      d[e] = ((f << 1) | (f >>> 31)) & 4294967295;
    }
    b = a.C[0];
    c = a.C[1];
    for (var g = a.C[2], k = a.C[3], l = a.C[4], m, e = 0; 80 > e; e++)
      40 > e
        ? 20 > e
          ? ((f = k ^ (c & (g ^ k))), (m = 1518500249))
          : ((f = c ^ g ^ k), (m = 1859775393))
        : 60 > e
        ? ((f = (c & g) | (k & (c | g))), (m = 2400959708))
        : ((f = c ^ g ^ k), (m = 3395469782)),
        (f = (((b << 5) | (b >>> 27)) + f + l + m + d[e]) & 4294967295),
        (l = k),
        (k = g),
        (g = ((c << 30) | (c >>> 2)) & 4294967295),
        (c = b),
        (b = f);
    a.C[0] = (a.C[0] + b) & 4294967295;
    a.C[1] = (a.C[1] + c) & 4294967295;
    a.C[2] = (a.C[2] + g) & 4294967295;
    a.C[3] = (a.C[3] + k) & 4294967295;
    a.C[4] = (a.C[4] + l) & 4294967295;
  }
  rb.prototype.update = function (a, b) {
    n(b) || (b = a.length);
    for (var c = b - this.qa, d = 0, e = this.xc, f = this.$a; d < b; ) {
      if (0 == f) for (; d <= c; ) sb(this, a, d), (d += this.qa);
      if (q(a))
        for (; d < b; ) {
          if (((e[f] = a.charCodeAt(d)), ++f, ++d, f == this.qa)) {
            sb(this, e);
            f = 0;
            break;
          }
        }
      else
        for (; d < b; )
          if (((e[f] = a[d]), ++f, ++d, f == this.qa)) {
            sb(this, e);
            f = 0;
            break;
          }
    }
    this.$a = f;
    this.rc += b;
  };
  var tb = Array.prototype,
    ub = tb.forEach
      ? function (a, b, c) {
          tb.forEach.call(a, b, c);
        }
      : function (a, b, c) {
          for (var d = a.length, e = q(a) ? a.split('') : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a);
        },
    vb = tb.map
      ? function (a, b, c) {
          return tb.map.call(a, b, c);
        }
      : function (a, b, c) {
          for (var d = a.length, e = Array(d), f = q(a) ? a.split('') : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
          return e;
        },
    wb = tb.reduce
      ? function (a, b, c, d) {
          d && (b = r(b, d));
          return tb.reduce.call(a, b, c);
        }
      : function (a, b, c, d) {
          var e = c;
          ub(a, function (c, g) {
            e = b.call(d, e, c, g, a);
          });
          return e;
        },
    xb = tb.every
      ? function (a, b, c) {
          return tb.every.call(a, b, c);
        }
      : function (a, b, c) {
          for (var d = a.length, e = q(a) ? a.split('') : a, f = 0; f < d; f++) if (f in e && !b.call(c, e[f], f, a)) return !1;
          return !0;
        };
  function yb(a, b) {
    var c;
    a: {
      c = a.length;
      for (var d = q(a) ? a.split('') : a, e = 0; e < c; e++)
        if (e in d && b.call(void 0, d[e], e, a)) {
          c = e;
          break a;
        }
      c = -1;
    }
    return 0 > c ? null : q(a) ? a.charAt(c) : a[c];
  }
  var zb;
  a: {
    var Ab = aa.navigator;
    if (Ab) {
      var Bb = Ab.userAgent;
      if (Bb) {
        zb = Bb;
        break a;
      }
    }
    zb = '';
  }
  function Cb(a) {
    return -1 != zb.indexOf(a);
  }
  var Db = Cb('Opera') || Cb('OPR'),
    Eb = Cb('Trident') || Cb('MSIE'),
    Fb = Cb('Gecko') && -1 == zb.toLowerCase().indexOf('webkit') && !(Cb('Trident') || Cb('MSIE')),
    Gb = -1 != zb.toLowerCase().indexOf('webkit');
  (function () {
    var a = '',
      b;
    if (Db && aa.opera) return (a = aa.opera.version), 'function' == da(a) ? a() : a;
    Fb ? (b = /rv\:([^\);]+)(\)|;)/) : Eb ? (b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/) : Gb && (b = /WebKit\/(\S+)/);
    b && (a = (a = b.exec(zb)) ? a[1] : '');
    return Eb && ((b = (b = aa.document) ? b.documentMode : void 0), b > parseFloat(a)) ? String(b) : a;
  })();
  var Hb = null,
    Ib = null;
  function Jb(a, b) {
    if (!ea(a)) throw Error('encodeByteArray takes an array as a parameter');
    if (!Hb) {
      Hb = {};
      Ib = {};
      for (var c = 0; 65 > c; c++)
        (Hb[c] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(c)),
          (Ib[c] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.'.charAt(c));
    }
    for (var c = b ? Ib : Hb, d = [], e = 0; e < a.length; e += 3) {
      var f = a[e],
        g = e + 1 < a.length,
        k = g ? a[e + 1] : 0,
        l = e + 2 < a.length,
        m = l ? a[e + 2] : 0,
        p = f >> 2,
        f = ((f & 3) << 4) | (k >> 4),
        k = ((k & 15) << 2) | (m >> 6),
        m = m & 63;
      l || ((m = 64), g || (k = 64));
      d.push(c[p], c[f], c[k], c[m]);
    }
    return d.join('');
  }
  var Kb = (function () {
    var a = 1;
    return function () {
      return a++;
    };
  })();
  function v(a, b) {
    if (!a) throw Error('Firebase INTERNAL ASSERT FAILED:' + b);
  }
  function Lb(a) {
    var b = ra(a);
    a = new rb();
    a.update(b);
    var b = [],
      c = 8 * a.rc;
    56 > a.$a ? a.update(a.ec, 56 - a.$a) : a.update(a.ec, a.qa - (a.$a - 56));
    for (var d = a.qa - 1; 56 <= d; d--) (a.xc[d] = c & 255), (c /= 256);
    sb(a, a.xc);
    for (d = c = 0; 5 > d; d++) for (var e = 24; 0 <= e; e -= 8) (b[c] = (a.C[d] >> e) & 255), ++c;
    return Jb(b);
  }
  function Mb(a) {
    for (var b = '', c = 0; c < arguments.length; c++)
      (b = ea(arguments[c]) ? b + Mb.apply(null, arguments[c]) : 'object' === typeof arguments[c] ? b + u(arguments[c]) : b + arguments[c]), (b += ' ');
    return b;
  }
  var Nb = null,
    Ob = !0;
  function K(a) {
    !0 === Ob && ((Ob = !1), null === Nb && !0 === nb.get('logging_enabled') && Pb(!0));
    if (Nb) {
      var b = Mb.apply(null, arguments);
      Nb(b);
    }
  }
  function Qb(a) {
    return function () {
      K(a, arguments);
    };
  }
  function Rb(a) {
    if ('undefined' !== typeof console) {
      var b = 'FIREBASE INTERNAL ERROR: ' + Mb.apply(null, arguments);
      'undefined' !== typeof console.error ? console.error(b) : console.log(b);
    }
  }
  function Sb(a) {
    var b = Mb.apply(null, arguments);
    throw Error('FIREBASE FATAL ERROR: ' + b);
  }
  function L(a) {
    if ('undefined' !== typeof console) {
      var b = 'FIREBASE WARNING: ' + Mb.apply(null, arguments);
      'undefined' !== typeof console.warn ? console.warn(b) : console.log(b);
    }
  }
  function Ca(a) {
    return fa(a) && (a != a || a == Number.POSITIVE_INFINITY || a == Number.NEGATIVE_INFINITY);
  }
  function Tb(a) {
    if ('complete' === document.readyState) a();
    else {
      var b = !1,
        c = function () {
          document.body ? b || ((b = !0), a()) : setTimeout(c, 10);
        };
      document.addEventListener
        ? (document.addEventListener('DOMContentLoaded', c, !1), window.addEventListener('load', c, !1))
        : document.attachEvent &&
          (document.attachEvent('onreadystatechange', function () {
            'complete' === document.readyState && c();
          }),
          window.attachEvent('onload', c));
    }
  }
  function Ub(a, b) {
    return a !== b ? (null === a ? -1 : null === b ? 1 : typeof a !== typeof b ? ('number' === typeof a ? -1 : 1) : a > b ? 1 : -1) : 0;
  }
  function Vb(a, b) {
    if (a === b) return 0;
    var c = Wb(a),
      d = Wb(b);
    return null !== c ? (null !== d ? (0 == c - d ? a.length - b.length : c - d) : -1) : null !== d ? 1 : a < b ? -1 : 1;
  }
  function Xb(a, b) {
    if (b && a in b) return b[a];
    throw Error('Missing required key (' + a + ') in object: ' + u(b));
  }
  function Ka(a) {
    if ('object' !== typeof a || null === a) return u(a);
    var b = [],
      c;
    for (c in a) b.push(c);
    b.sort();
    c = '{';
    for (var d = 0; d < b.length; d++) 0 !== d && (c += ','), (c += u(b[d])), (c += ':'), (c += Ka(a[b[d]]));
    return c + '}';
  }
  function Yb(a, b) {
    if (a.length <= b) return [a];
    for (var c = [], d = 0; d < a.length; d += b) d + b > a ? c.push(a.substring(d, a.length)) : c.push(a.substring(d, d + b));
    return c;
  }
  function Zb(a, b) {
    if ('array' == da(a)) for (var c = 0; c < a.length; ++c) b(c, a[c]);
    else $b(a, b);
  }
  function ac(a, b) {
    return b ? r(a, b) : a;
  }
  function bc(a) {
    v(!Ca(a), 'Invalid JSON number');
    var b, c, d, e;
    0 === a
      ? ((d = c = 0), (b = -Infinity === 1 / a ? 1 : 0))
      : ((b = 0 > a),
        (a = Math.abs(a)),
        a >= Math.pow(2, -1022)
          ? ((d = Math.min(Math.floor(Math.log(a) / Math.LN2), 1023)), (c = d + 1023), (d = Math.round(a * Math.pow(2, 52 - d) - Math.pow(2, 52))))
          : ((c = 0), (d = Math.round(a / Math.pow(2, -1074)))));
    e = [];
    for (a = 52; a; a -= 1) e.push(d % 2 ? 1 : 0), (d = Math.floor(d / 2));
    for (a = 11; a; a -= 1) e.push(c % 2 ? 1 : 0), (c = Math.floor(c / 2));
    e.push(b ? 1 : 0);
    e.reverse();
    b = e.join('');
    c = '';
    for (a = 0; 64 > a; a += 8) (d = parseInt(b.substr(a, 8), 2).toString(16)), 1 === d.length && (d = '0' + d), (c += d);
    return c.toLowerCase();
  }
  function cc(a) {
    var b = 'Unknown Error';
    'too_big' === a
      ? (b = 'The data requested exceeds the maximum size that can be accessed with a single request.')
      : 'permission_denied' == a
      ? (b = "Client doesn't have permission to access the desired data.")
      : 'unavailable' == a && (b = 'The service is unavailable');
    b = Error(a + ': ' + b);
    b.code = a.toUpperCase();
    return b;
  }
  var dc = /^-?\d{1,10}$/;
  function Wb(a) {
    return dc.test(a) && ((a = Number(a)), -2147483648 <= a && 2147483647 >= a) ? a : null;
  }
  function ec(a) {
    try {
      a();
    } catch (b) {
      setTimeout(function () {
        throw b;
      }, 0);
    }
  }
  function fc(a, b) {
    this.F = a;
    v(null !== this.F, "LeafNode shouldn't be created with null value.");
    this.gb = 'undefined' !== typeof b ? b : null;
  }
  h = fc.prototype;
  h.P = function () {
    return !0;
  };
  h.k = function () {
    return this.gb;
  };
  h.Ia = function (a) {
    return new fc(this.F, a);
  };
  h.O = function () {
    return M;
  };
  h.L = function (a) {
    return null === C(a) ? this : M;
  };
  h.ga = function () {
    return null;
  };
  h.H = function (a, b) {
    return new N().H(a, b).Ia(this.gb);
  };
  h.Aa = function (a, b) {
    var c = C(a);
    return null === c ? b : this.H(c, M.Aa(La(a), b));
  };
  h.f = function () {
    return !1;
  };
  h.$b = function () {
    return 0;
  };
  h.V = function (a) {
    return a && null !== this.k() ? { '.value': this.j(), '.priority': this.k() } : this.j();
  };
  h.hash = function () {
    var a = '';
    null !== this.k() && (a += 'priority:' + gc(this.k()) + ':');
    var b = typeof this.F,
      a = a + (b + ':'),
      a = 'number' === b ? a + bc(this.F) : a + this.F;
    return Lb(a);
  };
  h.j = function () {
    return this.F;
  };
  h.toString = function () {
    return 'string' === typeof this.F ? this.F : '"' + this.F + '"';
  };
  function ic(a, b) {
    return Ub(a.ka, b.ka) || Vb(a.name, b.name);
  }
  function jc(a, b) {
    return Vb(a.name, b.name);
  }
  function kc(a, b) {
    return Vb(a, b);
  }
  function N(a, b) {
    this.o = a || new Ta(kc);
    this.gb = 'undefined' !== typeof b ? b : null;
  }
  h = N.prototype;
  h.P = function () {
    return !1;
  };
  h.k = function () {
    return this.gb;
  };
  h.Ia = function (a) {
    return new N(this.o, a);
  };
  h.H = function (a, b) {
    var c = this.o.remove(a);
    b && b.f() && (b = null);
    null !== b && (c = c.sa(a, b));
    return b && null !== b.k() ? new lc(c, null, this.gb) : new N(c, this.gb);
  };
  h.Aa = function (a, b) {
    var c = C(a);
    if (null === c) return b;
    var d = this.O(c).Aa(La(a), b);
    return this.H(c, d);
  };
  h.f = function () {
    return this.o.f();
  };
  h.$b = function () {
    return this.o.count();
  };
  var mc = /^\d+$/;
  h = N.prototype;
  h.V = function (a) {
    if (this.f()) return null;
    var b = {},
      c = 0,
      d = 0,
      e = !0;
    this.A(function (f, g) {
      b[f] = g.V(a);
      c++;
      e && mc.test(f) ? (d = Math.max(d, Number(f))) : (e = !1);
    });
    if (!a && e && d < 2 * c) {
      var f = [],
        g;
      for (g in b) f[g] = b[g];
      return f;
    }
    a && null !== this.k() && (b['.priority'] = this.k());
    return b;
  };
  h.hash = function () {
    var a = '';
    null !== this.k() && (a += 'priority:' + gc(this.k()) + ':');
    this.A(function (b, c) {
      var d = c.hash();
      '' !== d && (a += ':' + b + ':' + d);
    });
    return '' === a ? '' : Lb(a);
  };
  h.O = function (a) {
    a = this.o.get(a);
    return null === a ? M : a;
  };
  h.L = function (a) {
    var b = C(a);
    return null === b ? this : this.O(b).L(La(a));
  };
  h.ga = function (a) {
    return Wa(this.o, a);
  };
  h.hd = function () {
    return this.o.xb();
  };
  h.kd = function () {
    return this.o.bb();
  };
  h.A = function (a) {
    return this.o.Da(a);
  };
  h.Ec = function (a) {
    return this.o.Qa(a);
  };
  h.Za = function () {
    return this.o.Za();
  };
  h.toString = function () {
    var a = '{',
      b = !0;
    this.A(function (c, d) {
      b ? (b = !1) : (a += ', ');
      a += '"' + c + '" : ' + d.toString();
    });
    return (a += '}');
  };
  var M = new N();
  function lc(a, b, c) {
    N.call(this, a, c);
    null === b &&
      ((b = new Ta(ic)),
      a.Da(function (a, c) {
        b = b.sa({ name: a, ka: c.k() }, c);
      }));
    this.xa = b;
  }
  ja(lc, N);
  h = lc.prototype;
  h.H = function (a, b) {
    var c = this.O(a),
      d = this.o,
      e = this.xa;
    null !== c && ((d = d.remove(a)), (e = e.remove({ name: a, ka: c.k() })));
    b && b.f() && (b = null);
    null !== b && ((d = d.sa(a, b)), (e = e.sa({ name: a, ka: b.k() }, b)));
    return new lc(d, e, this.k());
  };
  h.ga = function (a, b) {
    var c = Wa(this.xa, { name: a, ka: b.k() });
    return c ? c.name : null;
  };
  h.A = function (a) {
    return this.xa.Da(function (b, c) {
      return a(b.name, c);
    });
  };
  h.Ec = function (a) {
    return this.xa.Qa(function (b, c) {
      return a(b.name, c);
    });
  };
  h.Za = function () {
    return this.xa.Za(function (a, b) {
      return { key: a.name, value: b };
    });
  };
  h.hd = function () {
    return this.xa.f() ? null : this.xa.xb().name;
  };
  h.kd = function () {
    return this.xa.f() ? null : this.xa.bb().name;
  };
  function O(a, b) {
    if (null === a) return M;
    var c = null;
    'object' === typeof a && '.priority' in a ? (c = a['.priority']) : 'undefined' !== typeof b && (c = b);
    v(null === c || 'string' === typeof c || 'number' === typeof c || ('object' === typeof c && '.sv' in c), 'Invalid priority type found: ' + typeof c);
    'object' === typeof a && '.value' in a && null !== a['.value'] && (a = a['.value']);
    if ('object' !== typeof a || '.sv' in a) return new fc(a, c);
    if (a instanceof Array) {
      var d = M,
        e = a;
      $b(e, function (a, b) {
        if (A(e, b) && '.' !== b.substring(0, 1)) {
          var c = O(a);
          if (c.P() || !c.f()) d = d.H(b, c);
        }
      });
      return d.Ia(c);
    }
    var f = [],
      g = {},
      k = !1,
      l = a;
    Zb(l, function (a, b) {
      if ('string' !== typeof b || '.' !== b.substring(0, 1)) {
        var c = O(l[b]);
        c.f() || ((k = k || null !== c.k()), f.push({ name: b, ka: c.k() }), (g[b] = c));
      }
    });
    var m = nc(f, g, !1);
    if (k) {
      var p = nc(f, g, !0);
      return new lc(m, p, c);
    }
    return new N(m, c);
  }
  var oc = Math.log(2);
  function pc(a) {
    this.count = parseInt(Math.log(a + 1) / oc, 10);
    this.ed = this.count - 1;
    this.Gd = (a + 1) & parseInt(Array(this.count + 1).join('1'), 2);
  }
  function qc(a) {
    var b = !(a.Gd & (1 << a.ed));
    a.ed--;
    return b;
  }
  function nc(a, b, c) {
    function d(e, f) {
      var l = f - e;
      if (0 == l) return null;
      if (1 == l) {
        var l = a[e].name,
          m = c ? a[e] : l;
        return new Za(m, b[l], !1, null, null);
      }
      var m = parseInt(l / 2, 10) + e,
        p = d(e, m),
        t = d(m + 1, f),
        l = a[m].name,
        m = c ? a[m] : l;
      return new Za(m, b[l], !1, p, t);
    }
    var e = c ? ic : jc;
    a.sort(e);
    var f = (function (e) {
        function f(e, g) {
          var k = p - e,
            t = p;
          p -= e;
          var s = a[k].name,
            k = new Za(c ? a[k] : s, b[s], g, null, d(k + 1, t));
          l ? (l.left = k) : (m = k);
          l = k;
        }
        for (var l = null, m = null, p = a.length, t = 0; t < e.count; ++t) {
          var s = qc(e),
            w = Math.pow(2, e.count - (t + 1));
          s ? f(w, !1) : (f(w, !1), f(w, !0));
        }
        return m;
      })(new pc(a.length)),
      e = c ? ic : kc;
    return null !== f ? new Ta(e, f) : new Ta(e);
  }
  function gc(a) {
    return 'number' === typeof a ? 'number:' + bc(a) : 'string:' + a;
  }
  function P(a, b) {
    this.B = a;
    this.kc = b;
  }
  P.prototype.V = function () {
    x('Firebase.DataSnapshot.val', 0, 0, arguments.length);
    return this.B.V();
  };
  P.prototype.val = P.prototype.V;
  P.prototype.Kd = function () {
    x('Firebase.DataSnapshot.exportVal', 0, 0, arguments.length);
    return this.B.V(!0);
  };
  P.prototype.exportVal = P.prototype.Kd;
  P.prototype.G = function (a) {
    x('Firebase.DataSnapshot.child', 0, 1, arguments.length);
    fa(a) && (a = String(a));
    Ha('Firebase.DataSnapshot.child', a);
    var b = new F(a),
      c = this.kc.G(b);
    return new P(this.B.L(b), c);
  };
  P.prototype.child = P.prototype.G;
  P.prototype.Hc = function (a) {
    x('Firebase.DataSnapshot.hasChild', 1, 1, arguments.length);
    Ha('Firebase.DataSnapshot.hasChild', a);
    var b = new F(a);
    return !this.B.L(b).f();
  };
  P.prototype.hasChild = P.prototype.Hc;
  P.prototype.k = function () {
    x('Firebase.DataSnapshot.getPriority', 0, 0, arguments.length);
    return this.B.k();
  };
  P.prototype.getPriority = P.prototype.k;
  P.prototype.forEach = function (a) {
    x('Firebase.DataSnapshot.forEach', 1, 1, arguments.length);
    z('Firebase.DataSnapshot.forEach', 1, a, !1);
    if (this.B.P()) return !1;
    var b = this;
    return this.B.A(function (c, d) {
      return a(new P(d, b.kc.G(c)));
    });
  };
  P.prototype.forEach = P.prototype.forEach;
  P.prototype.sb = function () {
    x('Firebase.DataSnapshot.hasChildren', 0, 0, arguments.length);
    return this.B.P() ? !1 : !this.B.f();
  };
  P.prototype.hasChildren = P.prototype.sb;
  P.prototype.name = function () {
    x('Firebase.DataSnapshot.name', 0, 0, arguments.length);
    return this.kc.name();
  };
  P.prototype.name = P.prototype.name;
  P.prototype.$b = function () {
    x('Firebase.DataSnapshot.numChildren', 0, 0, arguments.length);
    return this.B.$b();
  };
  P.prototype.numChildren = P.prototype.$b;
  P.prototype.Uc = function () {
    x('Firebase.DataSnapshot.ref', 0, 0, arguments.length);
    return this.kc;
  };
  P.prototype.ref = P.prototype.Uc;
  function rc(a) {
    v('array' == da(a) && 0 < a.length, 'Requires a non-empty array');
    this.Fd = a;
    this.wb = {};
  }
  rc.prototype.bd = function (a, b) {
    for (var c = this.wb[a] || [], d = 0; d < c.length; d++) c[d].ba.apply(c[d].Y, Array.prototype.slice.call(arguments, 1));
  };
  rc.prototype.fb = function (a, b, c) {
    sc(this, a);
    this.wb[a] = this.wb[a] || [];
    this.wb[a].push({ ba: b, Y: c });
    (a = this.jd(a)) && b.apply(c, a);
  };
  rc.prototype.yb = function (a, b, c) {
    sc(this, a);
    a = this.wb[a] || [];
    for (var d = 0; d < a.length; d++)
      if (a[d].ba === b && (!c || c === a[d].Y)) {
        a.splice(d, 1);
        break;
      }
  };
  function sc(a, b) {
    v(
      yb(a.Fd, function (a) {
        return a === b;
      }),
      'Unknown event: ' + b
    );
  }
  function tc() {
    rc.call(this, ['visible']);
    var a, b;
    'undefined' !== typeof document &&
      'undefined' !== typeof document.addEventListener &&
      ('undefined' !== typeof document.hidden
        ? ((b = 'visibilitychange'), (a = 'hidden'))
        : 'undefined' !== typeof document.mozHidden
        ? ((b = 'mozvisibilitychange'), (a = 'mozHidden'))
        : 'undefined' !== typeof document.msHidden
        ? ((b = 'msvisibilitychange'), (a = 'msHidden'))
        : 'undefined' !== typeof document.webkitHidden && ((b = 'webkitvisibilitychange'), (a = 'webkitHidden')));
    this.lb = !0;
    if (b) {
      var c = this;
      document.addEventListener(
        b,
        function () {
          var b = !document[a];
          b !== c.lb && ((c.lb = b), c.bd('visible', b));
        },
        !1
      );
    }
  }
  ja(tc, rc);
  ca(tc);
  tc.prototype.jd = function (a) {
    v('visible' === a, 'Unknown event type: ' + a);
    return [this.lb];
  };
  function uc() {
    rc.call(this, ['online']);
    this.Cb = !0;
    if ('undefined' !== typeof window && 'undefined' !== typeof window.addEventListener) {
      var a = this;
      window.addEventListener(
        'online',
        function () {
          a.Cb || a.bd('online', !0);
          a.Cb = !0;
        },
        !1
      );
      window.addEventListener(
        'offline',
        function () {
          a.Cb && a.bd('online', !1);
          a.Cb = !1;
        },
        !1
      );
    }
  }
  ja(uc, rc);
  ca(uc);
  uc.prototype.jd = function (a) {
    v('online' === a, 'Unknown event type: ' + a);
    return [this.Cb];
  };
  function $b(a, b) {
    for (var c in a) b.call(void 0, a[c], c, a);
  }
  function vc(a) {
    var b = [],
      c = 0,
      d;
    for (d in a) b[c++] = d;
    return b;
  }
  function wc(a) {
    var b = {},
      c;
    for (c in a) b[c] = a[c];
    return b;
  }
  function xc() {
    this.ob = {};
  }
  function yc(a, b, c) {
    n(c) || (c = 1);
    A(a.ob, b) || (a.ob[b] = 0);
    a.ob[b] += c;
  }
  xc.prototype.get = function () {
    return wc(this.ob);
  };
  function zc(a) {
    this.Hd = a;
    this.Wb = null;
  }
  zc.prototype.get = function () {
    var a = this.Hd.get(),
      b = wc(a);
    if (this.Wb) for (var c in this.Wb) b[c] -= this.Wb[c];
    this.Wb = a;
    return b;
  };
  function Ac(a, b) {
    this.Zc = {};
    this.qc = new zc(a);
    this.u = b;
    setTimeout(r(this.sd, this), 10 + 6e4 * Math.random());
  }
  Ac.prototype.sd = function () {
    var a = this.qc.get(),
      b = {},
      c = !1,
      d;
    for (d in a) 0 < a[d] && A(this.Zc, d) && ((b[d] = a[d]), (c = !0));
    c && ((a = this.u), a.S && ((b = { c: b }), a.e('reportStats', b), a.Ga('s', b)));
    setTimeout(r(this.sd, this), 6e5 * Math.random());
  };
  var Bc = {},
    Cc = {};
  function Dc(a) {
    a = a.toString();
    Bc[a] || (Bc[a] = new xc());
    return Bc[a];
  }
  function Ec(a, b) {
    var c = a.toString();
    Cc[c] || (Cc[c] = b());
    return Cc[c];
  }
  var Fc = null;
  'undefined' !== typeof MozWebSocket ? (Fc = MozWebSocket) : 'undefined' !== typeof WebSocket && (Fc = WebSocket);
  function Q(a, b, c) {
    this.Ac = a;
    this.e = Qb(this.Ac);
    this.frames = this.ub = null;
    this.ad = 0;
    this.aa = Dc(b);
    this.Ua = (b.nc ? 'wss://' : 'ws://') + b.ha + '/.ws?v=5';
    b.host !== b.ha && (this.Ua = this.Ua + '&ns=' + b.Yb);
    c && (this.Ua = this.Ua + '&s=' + c);
  }
  var Gc;
  Q.prototype.open = function (a, b) {
    this.ja = b;
    this.Td = a;
    this.e('Websocket connecting to ' + this.Ua);
    this.W = new Fc(this.Ua);
    this.pb = !1;
    mb.set('previous_websocket_failure', !0);
    var c = this;
    this.W.onopen = function () {
      c.e('Websocket connected.');
      c.pb = !0;
    };
    this.W.onclose = function () {
      c.e('Websocket connection was disconnected.');
      c.W = null;
      c.Oa();
    };
    this.W.onmessage = function (a) {
      if (null !== c.W)
        if (((a = a.data), yc(c.aa, 'bytes_received', a.length), Hc(c), null !== c.frames)) Ic(c, a);
        else {
          a: {
            v(null === c.frames, 'We already have a frame buffer');
            if (6 >= a.length) {
              var b = Number(a);
              if (!isNaN(b)) {
                c.ad = b;
                c.frames = [];
                a = null;
                break a;
              }
            }
            c.ad = 1;
            c.frames = [];
          }
          null !== a && Ic(c, a);
        }
    };
    this.W.onerror = function (a) {
      c.e('WebSocket error.  Closing connection.');
      (a = a.message || a.data) && c.e(a);
      c.Oa();
    };
  };
  Q.prototype.start = function () {};
  Q.isAvailable = function () {
    var a = !1;
    if ('undefined' !== typeof navigator && navigator.userAgent) {
      var b = navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);
      b && 1 < b.length && 4.4 > parseFloat(b[1]) && (a = !0);
    }
    return !a && null !== Fc && !Gc;
  };
  Q.responsesRequiredToBeHealthy = 2;
  Q.healthyTimeout = 3e4;
  h = Q.prototype;
  h.Lc = function () {
    mb.remove('previous_websocket_failure');
  };
  function Ic(a, b) {
    a.frames.push(b);
    if (a.frames.length == a.ad) {
      var c = a.frames.join('');
      a.frames = null;
      c = qa(c);
      a.Td(c);
    }
  }
  h.send = function (a) {
    Hc(this);
    a = u(a);
    yc(this.aa, 'bytes_sent', a.length);
    a = Yb(a, 16384);
    1 < a.length && this.W.send(String(a.length));
    for (var b = 0; b < a.length; b++) this.W.send(a[b]);
  };
  h.Mb = function () {
    this.Ma = !0;
    this.ub && (clearInterval(this.ub), (this.ub = null));
    this.W && (this.W.close(), (this.W = null));
  };
  h.Oa = function () {
    this.Ma || (this.e('WebSocket is closing itself'), this.Mb(), this.ja && (this.ja(this.pb), (this.ja = null)));
  };
  h.close = function () {
    this.Ma || (this.e('WebSocket is being closed'), this.Mb());
  };
  function Hc(a) {
    clearInterval(a.ub);
    a.ub = setInterval(function () {
      a.W && a.W.send('0');
      Hc(a);
    }, 45e3);
  }
  function Jc(a) {
    this.Pc = a;
    this.gc = [];
    this.Va = 0;
    this.zc = -1;
    this.Na = null;
  }
  function Kc(a, b, c) {
    a.zc = b;
    a.Na = c;
    a.zc < a.Va && (a.Na(), (a.Na = null));
  }
  function Lc(a, b, c) {
    for (a.gc[b] = c; a.gc[a.Va]; ) {
      var d = a.gc[a.Va];
      delete a.gc[a.Va];
      for (var e = 0; e < d.length; ++e)
        if (d[e]) {
          var f = a;
          ec(function () {
            f.Pc(d[e]);
          });
        }
      if (a.Va === a.zc) {
        a.Na && (clearTimeout(a.Na), a.Na(), (a.Na = null));
        break;
      }
      a.Va++;
    }
  }
  function Mc() {
    this.set = {};
  }
  h = Mc.prototype;
  h.add = function (a, b) {
    this.set[a] = null !== b ? b : !0;
  };
  h.contains = function (a) {
    return A(this.set, a);
  };
  h.get = function (a) {
    return this.contains(a) ? this.set[a] : void 0;
  };
  h.remove = function (a) {
    delete this.set[a];
  };
  h.f = function () {
    var a;
    a: {
      a = this.set;
      for (var b in a) {
        a = !1;
        break a;
      }
      a = !0;
    }
    return a;
  };
  h.count = function () {
    var a = this.set,
      b = 0,
      c;
    for (c in a) b++;
    return b;
  };
  function R(a, b) {
    $b(a.set, function (a, d) {
      b(d, a);
    });
  }
  h.keys = function () {
    var a = [];
    $b(this.set, function (b, c) {
      a.push(c);
    });
    return a;
  };
  function Nc(a, b, c) {
    this.Ac = a;
    this.e = Qb(a);
    this.aa = Dc(b);
    this.pc = c;
    this.pb = !1;
    this.Qb = function (a) {
      b.host !== b.ha && (a.ns = b.Yb);
      var c = [],
        f;
      for (f in a) a.hasOwnProperty(f) && c.push(f + '=' + a[f]);
      return (b.nc ? 'https://' : 'http://') + b.ha + '/.lp?' + c.join('&');
    };
  }
  var Oc, Pc;
  Nc.prototype.open = function (a, b) {
    this.dd = 0;
    this.T = b;
    this.od = new Jc(a);
    this.Ma = !1;
    var c = this;
    this.Ja = setTimeout(function () {
      c.e('Timed out trying to connect.');
      c.Oa();
      c.Ja = null;
    }, 3e4);
    Tb(function () {
      if (!c.Ma) {
        c.ma = new Qc(
          function (a, b, d, k, l) {
            yc(c.aa, 'bytes_received', u(arguments).length);
            if (c.ma)
              if ((c.Ja && (clearTimeout(c.Ja), (c.Ja = null)), (c.pb = !0), 'start' == a)) (c.id = b), (c.rd = d);
              else if ('close' === a)
                b
                  ? ((c.ma.oc = !1),
                    Kc(c.od, b, function () {
                      c.Oa();
                    }))
                  : c.Oa();
              else throw Error('Unrecognized command received: ' + a);
          },
          function (a, b) {
            yc(c.aa, 'bytes_received', u(arguments).length);
            Lc(c.od, a, b);
          },
          function () {
            c.Oa();
          },
          c.Qb
        );
        var a = { start: 't' };
        a.ser = Math.floor(1e8 * Math.random());
        c.ma.sc && (a.cb = c.ma.sc);
        a.v = '5';
        c.pc && (a.s = c.pc);
        a = c.Qb(a);
        c.e('Connecting via long-poll to ' + a);
        Rc(c.ma, a, function () {});
      }
    });
  };
  Nc.prototype.start = function () {
    var a = this.ma,
      b = this.rd;
    a.Rd = this.id;
    a.Sd = b;
    for (a.vc = !0; Sc(a); );
    a = this.id;
    b = this.rd;
    this.eb = document.createElement('iframe');
    var c = { dframe: 't' };
    c.id = a;
    c.pw = b;
    this.eb.src = this.Qb(c);
    this.eb.style.display = 'none';
    document.body.appendChild(this.eb);
  };
  Nc.isAvailable = function () {
    return (
      !Pc &&
      !('object' === typeof window && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href)) &&
      !('object' === typeof Windows && 'object' === typeof Windows.he) &&
      (Oc || !0)
    );
  };
  h = Nc.prototype;
  h.Lc = function () {};
  h.Mb = function () {
    this.Ma = !0;
    this.ma && (this.ma.close(), (this.ma = null));
    this.eb && (document.body.removeChild(this.eb), (this.eb = null));
    this.Ja && (clearTimeout(this.Ja), (this.Ja = null));
  };
  h.Oa = function () {
    this.Ma || (this.e('Longpoll is closing itself'), this.Mb(), this.T && (this.T(this.pb), (this.T = null)));
  };
  h.close = function () {
    this.Ma || (this.e('Longpoll is being closed.'), this.Mb());
  };
  h.send = function (a) {
    a = u(a);
    yc(this.aa, 'bytes_sent', a.length);
    a = ra(a);
    a = Jb(a, !0);
    a = Yb(a, 1840);
    for (var b = 0; b < a.length; b++) {
      var c = this.ma;
      c.Gb.push({ ae: this.dd, fe: a.length, fd: a[b] });
      c.vc && Sc(c);
      this.dd++;
    }
  };
  function Qc(a, b, c, d) {
    this.Qb = d;
    this.ja = c;
    this.Rc = new Mc();
    this.Gb = [];
    this.Bc = Math.floor(1e8 * Math.random());
    this.oc = !0;
    this.sc = Kb();
    window['pLPCommand' + this.sc] = a;
    window['pRTLPCB' + this.sc] = b;
    a = document.createElement('iframe');
    a.style.display = 'none';
    if (document.body) {
      document.body.appendChild(a);
      try {
        a.contentWindow.document || K('No IE domain setting required');
      } catch (e) {
        a.src = "javascript:void((function(){document.open();document.domain='" + document.domain + "';document.close();})())";
      }
    } else throw 'Document body has not initialized. Wait to initialize Firebase until after the document is ready.';
    a.contentDocument ? (a.Ba = a.contentDocument) : a.contentWindow ? (a.Ba = a.contentWindow.document) : a.document && (a.Ba = a.document);
    this.Z = a;
    a = '';
    this.Z.src && 'javascript:' === this.Z.src.substr(0, 11) && (a = '<script>document.domain="' + document.domain + '";\x3c/script>');
    a = '<html><body>' + a + '</body></html>';
    try {
      this.Z.Ba.open(), this.Z.Ba.write(a), this.Z.Ba.close();
    } catch (f) {
      K('frame writing exception'), f.stack && K(f.stack), K(f);
    }
  }
  Qc.prototype.close = function () {
    this.vc = !1;
    if (this.Z) {
      this.Z.Ba.body.innerHTML = '';
      var a = this;
      setTimeout(function () {
        null !== a.Z && (document.body.removeChild(a.Z), (a.Z = null));
      }, 0);
    }
    var b = this.ja;
    b && ((this.ja = null), b());
  };
  function Sc(a) {
    if (a.vc && a.oc && a.Rc.count() < (0 < a.Gb.length ? 2 : 1)) {
      a.Bc++;
      var b = {};
      b.id = a.Rd;
      b.pw = a.Sd;
      b.ser = a.Bc;
      for (var b = a.Qb(b), c = '', d = 0; 0 < a.Gb.length; )
        if (1870 >= a.Gb[0].fd.length + 30 + c.length) {
          var e = a.Gb.shift(),
            c = c + '&seg' + d + '=' + e.ae + '&ts' + d + '=' + e.fe + '&d' + d + '=' + e.fd;
          d++;
        } else break;
      Vc(a, b + c, a.Bc);
      return !0;
    }
    return !1;
  }
  function Vc(a, b, c) {
    function d() {
      a.Rc.remove(c);
      Sc(a);
    }
    a.Rc.add(c);
    var e = setTimeout(d, 25e3);
    Rc(a, b, function () {
      clearTimeout(e);
      d();
    });
  }
  function Rc(a, b, c) {
    setTimeout(function () {
      try {
        if (a.oc) {
          var d = a.Z.Ba.createElement('script');
          d.type = 'text/javascript';
          d.async = !0;
          d.src = b;
          d.onload = d.onreadystatechange = function () {
            var a = d.readyState;
            (a && 'loaded' !== a && 'complete' !== a) || ((d.onload = d.onreadystatechange = null), d.parentNode && d.parentNode.removeChild(d), c());
          };
          d.onerror = function () {
            K('Long-poll script failed to load: ' + b);
            a.oc = !1;
            a.close();
          };
          a.Z.Ba.body.appendChild(d);
        }
      } catch (e) {}
    }, 1);
  }
  function Wc(a) {
    Xc(this, a);
  }
  var Yc = [Nc, Q];
  function Xc(a, b) {
    var c = Q && Q.isAvailable(),
      d = c && !(mb.nd || !0 === mb.get('previous_websocket_failure'));
    b.ge && (c || L("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."), (d = !0));
    if (d) a.Nb = [Q];
    else {
      var e = (a.Nb = []);
      Zb(Yc, function (a, b) {
        b && b.isAvailable() && e.push(b);
      });
    }
  }
  function Zc(a) {
    if (0 < a.Nb.length) return a.Nb[0];
    throw Error('No transports available');
  }
  function $c(a, b, c, d, e, f) {
    this.id = a;
    this.e = Qb('c:' + this.id + ':');
    this.Pc = c;
    this.Bb = d;
    this.T = e;
    this.Oc = f;
    this.N = b;
    this.fc = [];
    this.cd = 0;
    this.Ad = new Wc(b);
    this.na = 0;
    this.e('Connection created');
    ad(this);
  }
  function ad(a) {
    var b = Zc(a.Ad);
    a.K = new b('c:' + a.id + ':' + a.cd++, a.N);
    a.Tc = b.responsesRequiredToBeHealthy || 0;
    var c = bd(a, a.K),
      d = cd(a, a.K);
    a.Ob = a.K;
    a.Lb = a.K;
    a.w = null;
    a.ab = !1;
    setTimeout(function () {
      a.K && a.K.open(c, d);
    }, 0);
    b = b.healthyTimeout || 0;
    0 < b &&
      (a.Vb = setTimeout(function () {
        a.Vb = null;
        a.ab || (a.e('Closing unhealthy connection after timeout.'), a.close());
      }, b));
  }
  function cd(a, b) {
    return function (c) {
      b === a.K
        ? ((a.K = null),
          c || 0 !== a.na
            ? 1 === a.na && a.e('Realtime connection lost.')
            : (a.e('Realtime connection failed.'), 's-' === a.N.ha.substr(0, 2) && (mb.remove('host:' + a.N.host), (a.N.ha = a.N.host))),
          a.close())
        : b === a.w
        ? (a.e('Secondary connection lost.'), (c = a.w), (a.w = null), (a.Ob !== c && a.Lb !== c) || a.close())
        : a.e('closing an old connection');
    };
  }
  function bd(a, b) {
    return function (c) {
      if (2 != a.na)
        if (b === a.Lb) {
          var d = Xb('t', c);
          c = Xb('d', c);
          if ('c' == d) {
            if (((d = Xb('t', c)), 'd' in c))
              if (((c = c.d), 'h' === d)) {
                var d = c.ts,
                  e = c.v,
                  f = c.h;
                a.pc = c.s;
                pb(a.N, f);
                0 == a.na && (a.K.start(), dd(a, a.K, d), '5' !== e && L('Protocol version mismatch detected'), (c = a.Ad), (c = 1 < c.Nb.length ? c.Nb[1] : null) && ed(a, c));
              } else if ('n' === d) {
                a.e('recvd end transmission on primary');
                a.Lb = a.w;
                for (c = 0; c < a.fc.length; ++c) a.cc(a.fc[c]);
                a.fc = [];
                fd(a);
              } else
                's' === d
                  ? (a.e('Connection shutdown command received. Shutting down...'), a.Oc && (a.Oc(c), (a.Oc = null)), (a.T = null), a.close())
                  : 'r' === d
                  ? (a.e('Reset packet received.  New host: ' + c), pb(a.N, c), 1 === a.na ? a.close() : (gd(a), ad(a)))
                  : 'e' === d
                  ? Rb('Server Error: ' + c)
                  : 'o' === d
                  ? (a.e('got pong on primary.'), hd(a), id(a))
                  : Rb('Unknown control packet command: ' + d);
          } else 'd' == d && a.cc(c);
        } else if (b === a.w)
          if (((d = Xb('t', c)), (c = Xb('d', c)), 'c' == d))
            't' in c &&
              ((c = c.t),
              'a' === c
                ? jd(a)
                : 'r' === c
                ? (a.e('Got a reset on secondary, closing it'), a.w.close(), (a.Ob !== a.w && a.Lb !== a.w) || a.close())
                : 'o' === c && (a.e('got pong on secondary.'), a.wd--, jd(a)));
          else if ('d' == d) a.fc.push(c);
          else throw Error('Unknown protocol layer: ' + d);
        else a.e('message on old connection');
    };
  }
  $c.prototype.xd = function (a) {
    kd(this, { t: 'd', d: a });
  };
  function fd(a) {
    a.Ob === a.w && a.Lb === a.w && (a.e('cleaning up and promoting a connection: ' + a.w.Ac), (a.K = a.w), (a.w = null));
  }
  function jd(a) {
    0 >= a.wd
      ? (a.e('Secondary connection is healthy.'),
        (a.ab = !0),
        a.w.Lc(),
        a.w.start(),
        a.e('sending client ack on secondary'),
        a.w.send({ t: 'c', d: { t: 'a', d: {} } }),
        a.e('Ending transmission on primary'),
        a.K.send({ t: 'c', d: { t: 'n', d: {} } }),
        (a.Ob = a.w),
        fd(a))
      : (a.e('sending ping on secondary.'), a.w.send({ t: 'c', d: { t: 'p', d: {} } }));
  }
  $c.prototype.cc = function (a) {
    hd(this);
    this.Pc(a);
  };
  function hd(a) {
    a.ab || (a.Tc--, 0 >= a.Tc && (a.e('Primary connection is healthy.'), (a.ab = !0), a.K.Lc()));
  }
  function ed(a, b) {
    a.w = new b('c:' + a.id + ':' + a.cd++, a.N, a.pc);
    a.wd = b.responsesRequiredToBeHealthy || 0;
    a.w.open(bd(a, a.w), cd(a, a.w));
    setTimeout(function () {
      a.w && (a.e('Timed out trying to upgrade.'), a.w.close());
    }, 6e4);
  }
  function dd(a, b, c) {
    a.e('Realtime connection established.');
    a.K = b;
    a.na = 1;
    a.Bb && (a.Bb(c), (a.Bb = null));
    0 === a.Tc
      ? (a.e('Primary connection is healthy.'), (a.ab = !0))
      : setTimeout(function () {
          id(a);
        }, 5e3);
  }
  function id(a) {
    a.ab || 1 !== a.na || (a.e('sending ping on primary.'), kd(a, { t: 'c', d: { t: 'p', d: {} } }));
  }
  function kd(a, b) {
    if (1 !== a.na) throw 'Connection is not connected';
    a.Ob.send(b);
  }
  $c.prototype.close = function () {
    2 !== this.na && (this.e('Closing realtime connection.'), (this.na = 2), gd(this), this.T && (this.T(), (this.T = null)));
  };
  function gd(a) {
    a.e('Shutting down all connections');
    a.K && (a.K.close(), (a.K = null));
    a.w && (a.w.close(), (a.w = null));
    a.Vb && (clearTimeout(a.Vb), (a.Vb = null));
  }
  function ld(a, b, c, d, e, f) {
    this.id = md++;
    this.e = Qb('p:' + this.id + ':');
    this.Ra = !0;
    this.ia = {};
    this.U = [];
    this.Db = 0;
    this.Ab = [];
    this.S = !1;
    this.ua = 1e3;
    this.Xb = 3e5;
    this.dc = b || ba;
    this.bc = c || ba;
    this.zb = d || ba;
    this.Qc = e || ba;
    this.Gc = f || ba;
    this.N = a;
    this.Vc = null;
    this.Kb = {};
    this.$d = 0;
    this.vb = this.Kc = null;
    nd(this, 0);
    tc.rb().fb('visible', this.Vd, this);
    -1 === a.host.indexOf('fblocal') && uc.rb().fb('online', this.Ud, this);
  }
  var md = 0,
    od = 0;
  h = ld.prototype;
  h.Ga = function (a, b, c) {
    var d = ++this.$d;
    a = { r: d, a: a, b: b };
    this.e(u(a));
    v(this.S, "sendRequest_ call when we're not connected not allowed.");
    this.la.xd(a);
    c && (this.Kb[d] = c);
  };
  function pd(a, b, c) {
    var d = b.toString(),
      e = b.path().toString();
    a.ia[e] = a.ia[e] || {};
    v(!a.ia[e][d], 'listen() called twice for same path/queryId.');
    a.ia[e][d] = { hb: b.hb(), D: c };
    a.S && qd(a, e, d, b.hb(), c);
  }
  function qd(a, b, c, d, e) {
    a.e('Listen on ' + b + ' for ' + c);
    var f = { p: b };
    d = vb(d, function (a) {
      return Ja(a);
    });
    '{}' !== c && (f.q = d);
    f.h = a.Gc(b);
    a.Ga('l', f, function (d) {
      a.e('listen response', d);
      d = d.s;
      'ok' !== d && rd(a, b, c);
      e && e(d);
    });
  }
  h.mb = function (a, b, c) {
    this.Ka = { Id: a, gd: !1, ba: b, Sb: c };
    this.e('Authenticating using credential: ' + this.Ka);
    sd(this);
    if (!(b = 40 == a.length))
      a: {
        var d;
        try {
          var e = a.split('.');
          if (3 !== e.length) {
            b = !1;
            break a;
          }
          var f;
          b: {
            try {
              if ('undefined' !== typeof atob) {
                f = atob(e[1]);
                break b;
              }
            } catch (g) {
              K('base64DecodeIfNativeSupport failed: ', g);
            }
            f = null;
          }
          null !== f && (d = qa(f));
        } catch (k) {
          K('isAdminAuthToken_ failed', k);
        }
        b = 'object' === typeof d && !0 === va(d, 'admin');
      }
    b && (this.e('Admin auth credential detected.  Reducing max reconnect time.'), (this.Xb = 3e4));
  };
  h.Pb = function (a) {
    delete this.Ka;
    this.zb(!1);
    this.S &&
      this.Ga('unauth', {}, function (b) {
        a(b.s, b.d);
      });
  };
  function sd(a) {
    var b = a.Ka;
    a.S &&
      b &&
      a.Ga('auth', { cred: b.Id }, function (c) {
        var d = c.s;
        c = c.d || 'error';
        'ok' !== d && a.Ka === b && delete a.Ka;
        a.zb('ok' === d);
        b.gd ? 'ok' !== d && b.Sb && b.Sb(d, c) : ((b.gd = !0), b.ba && b.ba(d, c));
      });
  }
  function td(a, b, c, d) {
    b = b.toString();
    rd(a, b, c) && a.S && ud(a, b, c, d);
  }
  function ud(a, b, c, d) {
    a.e('Unlisten on ' + b + ' for ' + c);
    b = { p: b };
    d = vb(d, function (a) {
      return Ja(a);
    });
    '{}' !== c && (b.q = d);
    a.Ga('u', b);
  }
  function vd(a, b, c, d) {
    a.S ? wd(a, 'o', b, c, d) : a.Ab.push({ Sc: b, action: 'o', data: c, D: d });
  }
  function xd(a, b, c, d) {
    a.S ? wd(a, 'om', b, c, d) : a.Ab.push({ Sc: b, action: 'om', data: c, D: d });
  }
  h.Nc = function (a, b) {
    this.S ? wd(this, 'oc', a, null, b) : this.Ab.push({ Sc: a, action: 'oc', data: null, D: b });
  };
  function wd(a, b, c, d, e) {
    c = { p: c, d: d };
    a.e('onDisconnect ' + b, c);
    a.Ga(b, c, function (a) {
      e &&
        setTimeout(function () {
          e(a.s, a.d);
        }, 0);
    });
  }
  h.put = function (a, b, c, d) {
    yd(this, 'p', a, b, c, d);
  };
  function zd(a, b, c, d) {
    yd(a, 'm', b, c, d, void 0);
  }
  function yd(a, b, c, d, e, f) {
    c = { p: c, d: d };
    n(f) && (c.h = f);
    a.U.push({ action: b, td: c, D: e });
    a.Db++;
    b = a.U.length - 1;
    a.S && Ad(a, b);
  }
  function Ad(a, b) {
    var c = a.U[b].action,
      d = a.U[b].td,
      e = a.U[b].D;
    a.U[b].Xd = a.S;
    a.Ga(c, d, function (d) {
      a.e(c + ' response', d);
      delete a.U[b];
      a.Db--;
      0 === a.Db && (a.U = []);
      e && e(d.s, d.d);
    });
  }
  h.cc = function (a) {
    if ('r' in a) {
      this.e('from server: ' + u(a));
      var b = a.r,
        c = this.Kb[b];
      c && (delete this.Kb[b], c(a.b));
    } else {
      if ('error' in a) throw 'A server-side error has occurred: ' + a.error;
      'a' in a &&
        ((b = a.a),
        (c = a.b),
        this.e('handleServerMessage', b, c),
        'd' === b
          ? this.dc(c.p, c.d, !1)
          : 'm' === b
          ? this.dc(c.p, c.d, !0)
          : 'c' === b
          ? Bd(this, c.p, c.q)
          : 'ac' === b
          ? ((a = c.s), (b = c.d), (c = this.Ka), delete this.Ka, c && c.Sb && c.Sb(a, b), this.zb(!1))
          : 'sd' === b
          ? this.Vc
            ? this.Vc(c)
            : 'msg' in c && 'undefined' !== typeof console && console.log('FIREBASE: ' + c.msg.replace('\n', '\nFIREBASE: '))
          : Rb('Unrecognized action received from server: ' + u(b) + '\nAre you using the latest client?'));
    }
  };
  h.Bb = function (a) {
    this.e('connection ready');
    this.S = !0;
    this.vb = new Date().getTime();
    this.Qc({ serverTimeOffset: a - new Date().getTime() });
    sd(this);
    for (var b in this.ia) for (var c in this.ia[b]) (a = this.ia[b][c]), qd(this, b, c, a.hb, a.D);
    for (b = 0; b < this.U.length; b++) this.U[b] && Ad(this, b);
    for (; this.Ab.length; ) (b = this.Ab.shift()), wd(this, b.action, b.Sc, b.data, b.D);
    this.bc(!0);
  };
  function nd(a, b) {
    v(!a.la, "Scheduling a connect when we're already connected/ing?");
    a.Xa && clearTimeout(a.Xa);
    a.Xa = setTimeout(function () {
      a.Xa = null;
      Cd(a);
    }, b);
  }
  h.Vd = function (a) {
    a && !this.lb && this.ua === this.Xb && (this.e('Window became visible.  Reducing delay.'), (this.ua = 1e3), this.la || nd(this, 0));
    this.lb = a;
  };
  h.Ud = function (a) {
    a
      ? (this.e('Browser went online.  Reconnecting.'), (this.ua = 1e3), (this.Ra = !0), this.la || nd(this, 0))
      : (this.e("Browser went offline.  Killing connection; don't reconnect."), (this.Ra = !1), this.la && this.la.close());
  };
  h.pd = function () {
    this.e('data client disconnected');
    this.S = !1;
    this.la = null;
    for (var a = 0; a < this.U.length; a++) {
      var b = this.U[a];
      b && 'h' in b.td && b.Xd && (b.D && b.D('disconnect'), delete this.U[a], this.Db--);
    }
    0 === this.Db && (this.U = []);
    if (this.Ra)
      this.lb
        ? this.vb && (3e4 < new Date().getTime() - this.vb && (this.ua = 1e3), (this.vb = null))
        : (this.e("Window isn't visible.  Delaying reconnect."), (this.ua = this.Xb), (this.Kc = new Date().getTime())),
        (a = Math.max(0, this.ua - (new Date().getTime() - this.Kc))),
        (a *= Math.random()),
        this.e('Trying to reconnect in ' + a + 'ms'),
        nd(this, a),
        (this.ua = Math.min(this.Xb, 1.3 * this.ua));
    else for (var c in this.Kb) delete this.Kb[c];
    this.bc(!1);
  };
  function Cd(a) {
    if (a.Ra) {
      a.e('Making a connection attempt');
      a.Kc = new Date().getTime();
      a.vb = null;
      var b = r(a.cc, a),
        c = r(a.Bb, a),
        d = r(a.pd, a),
        e = a.id + ':' + od++;
      a.la = new $c(e, a.N, b, c, d, function (b) {
        L(b + ' (' + a.N.toString() + ')');
        a.Ra = !1;
      });
    }
  }
  h.La = function () {
    this.Ra = !1;
    this.la ? this.la.close() : (this.Xa && (clearTimeout(this.Xa), (this.Xa = null)), this.S && this.pd());
  };
  h.jb = function () {
    this.Ra = !0;
    this.ua = 1e3;
    this.S || nd(this, 0);
  };
  function Bd(a, b, c) {
    c = c
      ? vb(c, function (a) {
          return Ka(a);
        }).join('$')
      : '{}';
    (a = rd(a, b, c)) && a.D && a.D('permission_denied');
  }
  function rd(a, b, c) {
    b = new F(b).toString();
    c || (c = '{}');
    var d = a.ia[b][c];
    delete a.ia[b][c];
    return d;
  }
  function Dd() {
    this.o = this.F = null;
  }
  function Ed(a, b, c) {
    if (b.f()) (a.F = c), (a.o = null);
    else if (null !== a.F) a.F = a.F.Aa(b, c);
    else {
      null == a.o && (a.o = new Mc());
      var d = C(b);
      a.o.contains(d) || a.o.add(d, new Dd());
      a = a.o.get(d);
      b = La(b);
      Ed(a, b, c);
    }
  }
  function Fd(a, b) {
    if (b.f()) return (a.F = null), (a.o = null), !0;
    if (null !== a.F) {
      if (a.F.P()) return !1;
      var c = a.F;
      a.F = null;
      c.A(function (b, c) {
        Ed(a, new F(b), c);
      });
      return Fd(a, b);
    }
    return null !== a.o ? ((c = C(b)), (b = La(b)), a.o.contains(c) && Fd(a.o.get(c), b) && a.o.remove(c), a.o.f() ? ((a.o = null), !0) : !1) : !0;
  }
  function Gd(a, b, c) {
    null !== a.F
      ? c(b, a.F)
      : a.A(function (a, e) {
          var f = new F(b.toString() + '/' + a);
          Gd(e, f, c);
        });
  }
  Dd.prototype.A = function (a) {
    null !== this.o &&
      R(this.o, function (b, c) {
        a(b, c);
      });
  };
  function Hd() {
    this.$ = M;
  }
  function S(a, b) {
    return a.$.L(b);
  }
  function T(a, b, c) {
    a.$ = a.$.Aa(b, c);
  }
  Hd.prototype.toString = function () {
    return this.$.toString();
  };
  function Id() {
    this.va = new Hd();
    this.M = new Hd();
    this.pa = new Hd();
    this.Fb = new Pa();
  }
  function Jd(a, b, c) {
    T(a.va, b, c);
    return Kd(a, b);
  }
  function Kd(a, b) {
    for (var c = S(a.va, b), d = S(a.M, b), e = I(a.Fb, b), f = !1, g = e; null !== g; ) {
      if (null !== g.j()) {
        f = !0;
        break;
      }
      g = g.parent();
    }
    if (f) return !1;
    c = Ld(c, d, e);
    return c !== d ? (T(a.M, b, c), !0) : !1;
  }
  function Ld(a, b, c) {
    if (c.f()) return a;
    if (null !== c.j()) return b;
    a = a || M;
    c.A(function (d) {
      d = d.name();
      var e = a.O(d),
        f = b.O(d),
        g = I(c, d),
        e = Ld(e, f, g);
      a = a.H(d, e);
    });
    return a;
  }
  Id.prototype.set = function (a, b) {
    var c = this,
      d = [];
    ub(b, function (a) {
      var b = a.path;
      a = a.ta;
      var g = Kb();
      J(I(c.Fb, b), g);
      T(c.M, b, a);
      d.push({ path: b, be: g });
    });
    return d;
  };
  function Md(a, b) {
    ub(b, function (b) {
      var d = b.be;
      b = I(a.Fb, b.path);
      var e = b.j();
      v(null !== e, 'pendingPut should not be null.');
      e === d && J(b, null);
    });
  }
  function Nd(a, b) {
    return a && 'object' === typeof a ? (v('.sv' in a, 'Unexpected leaf node or priority contents'), b[a['.sv']]) : a;
  }
  function Od(a, b) {
    var c = new Dd();
    Gd(a, new F(''), function (a, e) {
      Ed(c, a, Pd(e, b));
    });
    return c;
  }
  function Pd(a, b) {
    var c = Nd(a.k(), b),
      d;
    if (a.P()) {
      var e = Nd(a.j(), b);
      return e !== a.j() || c !== a.k() ? new fc(e, c) : a;
    }
    d = a;
    c !== a.k() && (d = d.Ia(c));
    a.A(function (a, c) {
      var e = Pd(c, b);
      e !== c && (d = d.H(a, e));
    });
    return d;
  }
  function Qd() {
    this.Ya = [];
  }
  function Rd(a, b) {
    if (0 !== b.length) for (var c = 0; c < b.length; c++) a.Ya.push(b[c]);
  }
  Qd.prototype.Ib = function () {
    for (var a = 0; a < this.Ya.length; a++)
      if (this.Ya[a]) {
        var b = this.Ya[a];
        this.Ya[a] = null;
        Sd(b);
      }
    this.Ya = [];
  };
  function Sd(a) {
    var b = a.ba,
      c = a.yd,
      d = a.Hb;
    ec(function () {
      b(c, d);
    });
  }
  function U(a, b, c, d) {
    this.type = a;
    this.wa = b;
    this.ca = c;
    this.Hb = d;
  }
  function Td(a) {
    this.R = a;
    this.ra = [];
    this.Dc = new Qd();
  }
  function Ud(a, b, c, d, e) {
    a.ra.push({ type: b, ba: c, cancel: d, Y: e });
    d = [];
    var f = Vd(a.i);
    a.tb && f.push(new U('value', a.i));
    for (var g = 0; g < f.length; g++)
      if (f[g].type === b) {
        var k = new E(a.R.m, a.R.path);
        f[g].ca && (k = k.G(f[g].ca));
        d.push({ ba: ac(c, e), yd: new P(f[g].wa, k), Hb: f[g].Hb });
      }
    Rd(a.Dc, d);
  }
  Td.prototype.ic = function (a, b) {
    b = this.jc(a, b);
    null != b && Wd(this, b);
  };
  function Wd(a, b) {
    for (var c = [], d = 0; d < b.length; d++) {
      var e = b[d],
        f = e.type,
        g = new E(a.R.m, a.R.path);
      b[d].ca && (g = g.G(b[d].ca));
      g = new P(b[d].wa, g);
      'value' !== e.type || g.sb() ? 'value' !== e.type && (f += ' ' + g.name()) : (f += '(' + g.V() + ')');
      K(a.R.m.u.id + ': event:' + a.R.path + ':' + a.R.Pa() + ':' + f);
      for (f = 0; f < a.ra.length; f++) {
        var k = a.ra[f];
        b[d].type === k.type && c.push({ ba: ac(k.ba, k.Y), yd: g, Hb: e.Hb });
      }
    }
    Rd(a.Dc, c);
  }
  Td.prototype.Ib = function () {
    this.Dc.Ib();
  };
  function Vd(a) {
    var b = [];
    if (!a.P()) {
      var c = null;
      a.A(function (a, e) {
        b.push(new U('child_added', e, a, c));
        c = a;
      });
    }
    return b;
  }
  function Xd(a) {
    a.tb || ((a.tb = !0), Wd(a, [new U('value', a.i)]));
  }
  function Yd(a, b) {
    Td.call(this, a);
    this.i = b;
  }
  ja(Yd, Td);
  Yd.prototype.jc = function (a, b) {
    this.i = a;
    this.tb && null != b && b.push(new U('value', this.i));
    return b;
  };
  Yd.prototype.qb = function () {
    return {};
  };
  function Zd(a, b) {
    this.Tb = a;
    this.Mc = b;
  }
  function $d(a, b, c, d, e) {
    var f = a.L(c),
      g = b.L(c);
    d = new Zd(d, e);
    e = ae(d, c, f, g);
    g = !f.f() && !g.f() && f.k() !== g.k();
    if (e || g)
      for (f = c, c = e; null !== f.parent(); ) {
        var k = a.L(f);
        e = b.L(f);
        var l = f.parent();
        if (!d.Tb || I(d.Tb, l).j()) {
          var m = b.L(l),
            p = [],
            f = Ma(f);
          k.f()
            ? ((k = m.ga(f, e)), p.push(new U('child_added', e, f, k)))
            : e.f()
            ? p.push(new U('child_removed', k, f))
            : ((k = m.ga(f, e)), g && p.push(new U('child_moved', e, f, k)), c && p.push(new U('child_changed', e, f, k)));
          d.Mc(l, m, p);
        }
        g && ((g = !1), (c = !0));
        f = l;
      }
  }
  function ae(a, b, c, d) {
    var e,
      f = [];
    c === d ? (e = !1) : c.P() && d.P() ? (e = c.j() !== d.j()) : c.P() ? (be(a, b, M, d, f), (e = !0)) : d.P() ? (be(a, b, c, M, f), (e = !0)) : (e = be(a, b, c, d, f));
    e ? a.Mc(b, d, f) : c.k() !== d.k() && a.Mc(b, d, null);
    return e;
  }
  function be(a, b, c, d, e) {
    var f = !1,
      g = !a.Tb || !I(a.Tb, b).f(),
      k = [],
      l = [],
      m = [],
      p = [],
      t = {},
      s = {},
      w,
      V,
      G,
      H;
    w = c.Za();
    G = Ya(w);
    V = d.Za();
    for (H = Ya(V); null !== G || null !== H; ) {
      c = H;
      c = null === G ? 1 : null === c ? -1 : G.key === c.key ? 0 : ic({ name: G.key, ka: G.value.k() }, { name: c.key, ka: c.value.k() });
      if (0 > c) (f = va(t, G.key)), n(f) ? (m.push({ Fc: G, $c: k[f] }), (k[f] = null)) : ((s[G.key] = l.length), l.push(G)), (f = !0), (G = Ya(w));
      else {
        if (0 < c) (f = va(s, H.key)), n(f) ? (m.push({ Fc: l[f], $c: H }), (l[f] = null)) : ((t[H.key] = k.length), k.push(H)), (f = !0);
        else {
          c = b.G(H.key);
          if ((c = ae(a, c, G.value, H.value))) p.push(H), (f = !0);
          G.value.k() !== H.value.k() && (m.push({ Fc: G, $c: H }), (f = !0));
          G = Ya(w);
        }
        H = Ya(V);
      }
      if (!g && f) return !0;
    }
    for (g = 0; g < l.length; g++) if ((t = l[g])) (c = b.G(t.key)), ae(a, c, t.value, M), e.push(new U('child_removed', t.value, t.key));
    for (g = 0; g < k.length; g++) if ((t = k[g])) (c = b.G(t.key)), (l = d.ga(t.key, t.value)), ae(a, c, M, t.value), e.push(new U('child_added', t.value, t.key, l));
    for (g = 0; g < m.length; g++)
      (t = m[g].Fc), (k = m[g].$c), (c = b.G(k.key)), (l = d.ga(k.key, k.value)), e.push(new U('child_moved', k.value, k.key, l)), (c = ae(a, c, t.value, k.value)) && p.push(k);
    for (g = 0; g < p.length; g++) (a = p[g]), (l = d.ga(a.key, a.value)), e.push(new U('child_changed', a.value, a.key, l));
    return f;
  }
  function ce() {
    this.X = this.za = null;
    this.set = {};
  }
  ja(ce, Mc);
  h = ce.prototype;
  h.setActive = function (a) {
    this.za = a;
  };
  function de(a, b, c) {
    a.add(b, c);
    a.X || (a.X = c.R.path);
  }
  function ee(a) {
    var b = a.za;
    a.za = null;
    return b;
  }
  function fe(a) {
    return a.contains('default');
  }
  function ge(a) {
    return null != a.za && fe(a);
  }
  h.defaultView = function () {
    return fe(this) ? this.get('default') : null;
  };
  h.path = function () {
    return this.X;
  };
  h.toString = function () {
    return vb(this.keys(), function (a) {
      return 'default' === a ? '{}' : a;
    }).join('$');
  };
  h.hb = function () {
    var a = [];
    R(this, function (b, c) {
      a.push(c.R);
    });
    return a;
  };
  function he(a, b) {
    Td.call(this, a);
    this.i = M;
    this.jc(b, Vd(b));
  }
  ja(he, Td);
  he.prototype.jc = function (a, b) {
    if (null === b) return b;
    var c = [],
      d = this.R;
    n(d.fa) &&
      (n(d.ya) && null != d.ya
        ? c.push(function (a, b) {
            var c = Ub(b, d.fa);
            return 0 < c || (0 === c && 0 <= Vb(a, d.ya));
          })
        : c.push(function (a, b) {
            return 0 <= Ub(b, d.fa);
          }));
    n(d.Ca) &&
      (n(d.Wa)
        ? c.push(function (a, b) {
            var c = Ub(b, d.Ca);
            return 0 > c || (0 === c && 0 >= Vb(a, d.Wa));
          })
        : c.push(function (a, b) {
            return 0 >= Ub(b, d.Ca);
          }));
    var e = null,
      f = null;
    if (n(this.R.Ea))
      if (n(this.R.fa)) {
        if ((e = ie(a, c, this.R.Ea, !1))) {
          var g = a.O(e).k();
          c.push(function (a, b) {
            var c = Ub(b, g);
            return 0 > c || (0 === c && 0 >= Vb(a, e));
          });
        }
      } else if ((f = ie(a, c, this.R.Ea, !0))) {
        var k = a.O(f).k();
        c.push(function (a, b) {
          var c = Ub(b, k);
          return 0 < c || (0 === c && 0 <= Vb(a, f));
        });
      }
    for (var l = [], m = [], p = [], t = [], s = 0; s < b.length; s++) {
      var w = b[s].ca,
        V = b[s].wa;
      switch (b[s].type) {
        case 'child_added':
          je(c, w, V) && ((this.i = this.i.H(w, V)), m.push(b[s]));
          break;
        case 'child_removed':
          this.i.O(w).f() || ((this.i = this.i.H(w, null)), l.push(b[s]));
          break;
        case 'child_changed':
          !this.i.O(w).f() && je(c, w, V) && ((this.i = this.i.H(w, V)), t.push(b[s]));
          break;
        case 'child_moved':
          var G = !this.i.O(w).f(),
            H = je(c, w, V);
          G
            ? H
              ? ((this.i = this.i.H(w, V)), p.push(b[s]))
              : (l.push(new U('child_removed', this.i.O(w), w)), (this.i = this.i.H(w, null)))
            : H && ((this.i = this.i.H(w, V)), m.push(b[s]));
      }
    }
    var Tc = e || f;
    if (Tc) {
      var Uc = (s = null !== f) ? this.i.hd() : this.i.kd(),
        hc = !1,
        $a = !1,
        ab = this;
      (s ? a.Ec : a.A).call(a, function (a, b) {
        $a || null !== Uc || ($a = !0);
        if ($a && hc) return !0;
        hc ? (l.push(new U('child_removed', ab.i.O(a), a)), (ab.i = ab.i.H(a, null))) : $a && (m.push(new U('child_added', b, a)), (ab.i = ab.i.H(a, b)));
        Uc === a && ($a = !0);
        a === Tc && (hc = !0);
      });
    }
    for (s = 0; s < m.length; s++) (c = m[s]), (w = this.i.ga(c.ca, c.wa)), l.push(new U('child_added', c.wa, c.ca, w));
    for (s = 0; s < p.length; s++) (c = p[s]), (w = this.i.ga(c.ca, c.wa)), l.push(new U('child_moved', c.wa, c.ca, w));
    for (s = 0; s < t.length; s++) (c = t[s]), (w = this.i.ga(c.ca, c.wa)), l.push(new U('child_changed', c.wa, c.ca, w));
    this.tb && 0 < l.length && l.push(new U('value', this.i));
    return l;
  };
  function ie(a, b, c, d) {
    if (a.P()) return null;
    var e = null;
    (d ? a.Ec : a.A).call(a, function (a, d) {
      if (je(b, a, d) && ((e = a), c--, 0 === c)) return !0;
    });
    return e;
  }
  function je(a, b, c) {
    for (var d = 0; d < a.length; d++) if (!a[d](b, c.k())) return !1;
    return !0;
  }
  he.prototype.Hc = function (a) {
    return this.i.O(a) !== M;
  };
  he.prototype.qb = function (a, b, c) {
    var d = {};
    this.i.P() ||
      this.i.A(function (a) {
        d[a] = 3;
      });
    var e = this.i;
    c = S(c, new F(''));
    var f = new Pa();
    J(I(f, this.R.path), !0);
    b = M.Aa(a, b);
    var g = this;
    $d(c, b, a, f, function (a, b, c) {
      null !== c && a.toString() === g.R.path.toString() && g.jc(b, c);
    });
    this.i.P()
      ? $b(d, function (a, b) {
          d[b] = 2;
        })
      : (this.i.A(function (a) {
          A(d, a) || (d[a] = 1);
        }),
        $b(d, function (a, b) {
          g.i.O(b).f() && (d[b] = 2);
        }));
    this.i = e;
    return d;
  };
  function ke(a, b) {
    this.u = a;
    this.g = b;
    this.ac = b.$;
    this.oa = new Pa();
  }
  ke.prototype.Rb = function (a, b, c, d, e) {
    var f = a.path,
      g = I(this.oa, f),
      k = g.j();
    null === k ? ((k = new ce()), J(g, k)) : v(!k.f(), "We shouldn't be storing empty QueryMaps");
    var l = a.Pa();
    if (k.contains(l)) (a = k.get(l)), Ud(a, b, c, d, e);
    else {
      var m = this.g.$.L(f);
      a = le(a, m);
      me(this, g, k, l, a);
      Ud(a, b, c, d, e);
      (b =
        (b = Sa(
          I(this.oa, f),
          function (a) {
            var b;
            if ((b = a.j() && a.j().defaultView())) b = a.j().defaultView().tb;
            if (b) return !0;
          },
          !0
        )) ||
        (null === this.u && !S(this.g, f).f())) && Xd(a);
    }
    a.Ib();
  };
  function ne(a, b, c, d, e) {
    var f = a.get(b),
      g;
    if ((g = f)) {
      g = !1;
      for (var k = f.ra.length - 1; 0 <= k; k--) {
        var l = f.ra[k];
        if (!((c && l.type !== c) || (d && l.ba !== d) || (e && l.Y !== e)) && (f.ra.splice(k, 1), (g = !0), c && d)) break;
      }
    }
    (c = g && !(0 < f.ra.length)) && a.remove(b);
    return c;
  }
  function oe(a, b, c, d, e) {
    b = b ? b.Pa() : null;
    var f = [];
    b && 'default' !== b
      ? ne(a, b, c, d, e) && f.push(b)
      : ub(a.keys(), function (b) {
          ne(a, b, c, d, e) && f.push(b);
        });
    return f;
  }
  ke.prototype.lc = function (a, b, c, d) {
    var e = I(this.oa, a.path).j();
    return null === e ? null : pe(this, e, a, b, c, d);
  };
  function pe(a, b, c, d, e, f) {
    var g = b.path(),
      g = I(a.oa, g);
    c = oe(b, c, d, e, f);
    b.f() && J(g, null);
    d = qe(g);
    if (0 < c.length && !d) {
      d = g;
      e = g.parent();
      for (c = !1; !c && e; ) {
        if ((f = e.j())) {
          v(!ge(f));
          var k = d.name(),
            l = !1;
          R(f, function (a, b) {
            l = b.Hc(k) || l;
          });
          l && (c = !0);
        }
        d = e;
        e = e.parent();
      }
      d = null;
      ge(b) || ((b = ee(b)), (d = re(a, g)), b && b());
      return c ? null : d;
    }
    return null;
  }
  function se(a, b, c) {
    Ra(
      I(a.oa, b),
      function (a) {
        (a = a.j()) &&
          R(a, function (a, b) {
            Xd(b);
          });
      },
      c,
      !0
    );
  }
  function W(a, b, c) {
    function d(a) {
      do {
        if (g[a.toString()]) return !0;
        a = a.parent();
      } while (null !== a);
      return !1;
    }
    var e = a.ac,
      f = a.g.$;
    a.ac = f;
    for (var g = {}, k = 0; k < c.length; k++) g[c[k].toString()] = !0;
    $d(e, f, b, a.oa, function (c, e, f) {
      if (b.contains(c)) {
        var g = d(c);
        g && se(a, c, !1);
        a.ic(c, e, f);
        g && se(a, c, !0);
      } else a.ic(c, e, f);
    });
    d(b) && se(a, b, !0);
    te(a, b);
  }
  function te(a, b) {
    var c = I(a.oa, b);
    Ra(
      c,
      function (a) {
        (a = a.j()) &&
          R(a, function (a, b) {
            b.Ib();
          });
      },
      !0,
      !0
    );
    Sa(
      c,
      function (a) {
        (a = a.j()) &&
          R(a, function (a, b) {
            b.Ib();
          });
      },
      !1
    );
  }
  ke.prototype.ic = function (a, b, c) {
    a = I(this.oa, a).j();
    null !== a &&
      R(a, function (a, e) {
        e.ic(b, c);
      });
  };
  function qe(a) {
    return Sa(a, function (a) {
      return a.j() && ge(a.j());
    });
  }
  function me(a, b, c, d, e) {
    if (ge(c) || qe(b)) de(c, d, e);
    else {
      var f, g;
      c.f() || ((f = c.toString()), (g = c.hb()));
      de(c, d, e);
      c.setActive(ue(a, c));
      f && g && td(a.u, c.path(), f, g);
    }
    ge(c) &&
      Ra(b, function (a) {
        if ((a = a.j())) a.za && a.za(), (a.za = null);
      });
  }
  function re(a, b) {
    function c(b) {
      var f = b.j();
      if (f && fe(f)) d.push(f.path()), null == f.za && f.setActive(ue(a, f));
      else {
        if (f) {
          null != f.za || f.setActive(ue(a, f));
          var g = {};
          R(f, function (a, b) {
            b.i.A(function (a) {
              A(g, a) || ((g[a] = !0), (a = f.path().G(a)), d.push(a));
            });
          });
        }
        b.A(c);
      }
    }
    var d = [];
    c(b);
    return d;
  }
  function ue(a, b) {
    if (a.u) {
      var c = a.u,
        d = b.path(),
        e = b.toString(),
        f = b.hb(),
        g,
        k = b.keys(),
        l = fe(b);
      pd(a.u, b, function (c) {
        'ok' !== c
          ? ((c = cc(c)), L('on() or once() for ' + b.path().toString() + ' failed: ' + c.toString()), ve(a, b, c))
          : g ||
            (l
              ? se(a, b.path(), !0)
              : ub(k, function (a) {
                  (a = b.get(a)) && Xd(a);
                }),
            te(a, b.path()));
      });
      return function () {
        g = !0;
        td(c, d, e, f);
      };
    }
    return ba;
  }
  function ve(a, b, c) {
    b &&
      (R(b, function (a, b) {
        for (var f = 0; f < b.ra.length; f++) {
          var g = b.ra[f];
          g.cancel && ac(g.cancel, g.Y)(c);
        }
      }),
      pe(a, b));
  }
  function le(a, b) {
    return 'default' === a.Pa() ? new Yd(a, b) : new he(a, b);
  }
  ke.prototype.qb = function (a, b, c, d) {
    function e(a) {
      $b(a, function (a, b) {
        f[b] = 3 === a ? 3 : (va(f, b) || a) === a ? a : 3;
      });
    }
    var f = {};
    R(b, function (b, f) {
      e(f.qb(a, c, d));
    });
    c.P() ||
      c.A(function (a) {
        A(f, a) || (f[a] = 4);
      });
    return f;
  };
  function we(a, b, c, d, e) {
    var f = b.path();
    b = a.qb(f, b, d, e);
    var g = M,
      k = [];
    $b(b, function (b, m) {
      var p = new F(m);
      3 === b || 1 === b ? (g = g.H(m, d.L(p))) : (2 === b && k.push({ path: f.G(m), ta: M }), (k = k.concat(xe(a, d.L(p), I(c, p), e))));
    });
    return [{ path: f, ta: g }].concat(k);
  }
  function ye(a, b, c, d) {
    var e;
    a: {
      var f = I(a.oa, b);
      e = f.parent();
      for (var g = []; null !== e; ) {
        var k = e.j();
        if (null !== k) {
          if (fe(k)) {
            e = [{ path: b, ta: c }];
            break a;
          }
          k = a.qb(b, k, c, d);
          f = va(k, f.name());
          if (3 === f || 1 === f) {
            e = [{ path: b, ta: c }];
            break a;
          }
          2 === f && g.push({ path: b, ta: M });
        }
        f = e;
        e = e.parent();
      }
      e = g;
    }
    if (1 == e.length && (!e[0].ta.f() || c.f())) return e;
    g = I(a.oa, b);
    f = g.j();
    null !== f ? (fe(f) ? e.push({ path: b, ta: c }) : (e = e.concat(we(a, f, g, c, d)))) : (e = e.concat(xe(a, c, g, d)));
    return e;
  }
  function xe(a, b, c, d) {
    var e = c.j();
    if (null !== e) return fe(e) ? [{ path: c.path(), ta: b }] : we(a, e, c, b, d);
    var f = [];
    c.A(function (c) {
      var e = b.P() ? M : b.O(c.name());
      c = xe(a, e, c, d);
      f = f.concat(c);
    });
    return f;
  }
  function ze(a) {
    this.N = a;
    this.aa = Dc(a);
    this.u = new ld(this.N, r(this.dc, this), r(this.bc, this), r(this.zb, this), r(this.Qc, this), r(this.Gc, this));
    this.zd = Ec(
      a,
      r(function () {
        return new Ac(this.aa, this.u);
      }, this)
    );
    this.Sa = new Pa();
    this.Ha = new Hd();
    this.g = new Id();
    this.I = new ke(this.u, this.g.pa);
    this.Ic = new Hd();
    this.Jc = new ke(null, this.Ic);
    Ae(this, 'connected', !1);
    Ae(this, 'authenticated', !1);
    this.T = new Dd();
    this.Cc = 0;
  }
  h = ze.prototype;
  h.toString = function () {
    return (this.N.nc ? 'https://' : 'http://') + this.N.host;
  };
  h.name = function () {
    return this.N.Yb;
  };
  function Be(a) {
    a = S(a.Ic, new F('.info/serverTimeOffset')).V() || 0;
    return new Date().getTime() + a;
  }
  function Ce(a) {
    a = a = { timestamp: Be(a) };
    a.timestamp = a.timestamp || new Date().getTime();
    return a;
  }
  h.dc = function (a, b, c) {
    this.Cc++;
    this.md && (b = this.md(a, b));
    var d,
      e,
      f = [];
    9 <= a.length && a.lastIndexOf('.priority') === a.length - 9
      ? ((d = new F(a.substring(0, a.length - 9))), (e = S(this.g.va, d).Ia(b)), f.push(d))
      : c
      ? ((d = new F(a)),
        (e = S(this.g.va, d)),
        $b(b, function (a, b) {
          var c = new F(b);
          '.priority' === b ? (e = e.Ia(a)) : ((e = e.Aa(c, O(a))), f.push(d.G(b)));
        }))
      : ((d = new F(a)), (e = O(b)), f.push(d));
    a = ye(this.I, d, e, this.g.M);
    b = !1;
    for (c = 0; c < a.length; ++c) {
      var g = a[c];
      b = Jd(this.g, g.path, g.ta) || b;
    }
    b && (d = De(this, d));
    W(this.I, d, f);
  };
  h.bc = function (a) {
    Ae(this, 'connected', a);
    !1 === a && Ee(this);
  };
  h.Qc = function (a) {
    var b = this;
    Zb(a, function (a, d) {
      Ae(b, d, a);
    });
  };
  h.Gc = function (a) {
    a = new F(a);
    return S(this.g.va, a).hash();
  };
  h.zb = function (a) {
    Ae(this, 'authenticated', a);
  };
  function Ae(a, b, c) {
    b = new F('/.info/' + b);
    T(a.Ic, b, O(c));
    W(a.Jc, b, [b]);
  }
  h.mb = function (a, b, c) {
    'firebaseio-demo.com' === this.N.domain &&
      L('FirebaseRef.auth() not supported on demo (*.firebaseio-demo.com) Firebases. Please use on production (*.firebaseio.com) Firebases only.');
    this.u.mb(
      a,
      function (a, c) {
        X(b, a, c);
      },
      function (a, b) {
        L('auth() was canceled: ' + b);
        if (c) {
          var f = Error(b);
          f.code = a.toUpperCase();
          c(f);
        }
      }
    );
  };
  h.Pb = function (a) {
    this.u.Pb(function (b, c) {
      X(a, b, c);
    });
  };
  h.kb = function (a, b, c, d) {
    this.e('set', { path: a.toString(), value: b, ka: c });
    var e = Ce(this);
    b = O(b, c);
    var e = Pd(b, e),
      e = ye(this.I, a, e, this.g.M),
      f = this.g.set(a, e),
      g = this;
    this.u.put(a.toString(), b.V(!0), function (b, c) {
      'ok' !== b && L('set at ' + a + ' failed: ' + b);
      Md(g.g, f);
      Kd(g.g, a);
      var e = De(g, a);
      W(g.I, e, []);
      X(d, b, c);
    });
    e = Fe(this, a);
    De(this, e);
    W(this.I, e, [a]);
  };
  h.update = function (a, b, c) {
    this.e('update', { path: a.toString(), value: b });
    var d = S(this.g.pa, a),
      e = !0,
      f = [],
      g = Ce(this),
      k = [],
      l;
    for (l in b) {
      var e = !1,
        m = O(b[l]),
        m = Pd(m, g),
        d = d.H(l, m),
        p = a.G(l);
      f.push(p);
      m = ye(this.I, p, m, this.g.M);
      k = k.concat(this.g.set(a, m));
    }
    if (e) K("update() called with empty data.  Don't do anything."), X(c, 'ok');
    else {
      var t = this;
      zd(this.u, a.toString(), b, function (b, d) {
        v('ok' === b || 'permission_denied' === b, 'merge at ' + a + ' failed.');
        'ok' !== b && L('update at ' + a + ' failed: ' + b);
        Md(t.g, k);
        Kd(t.g, a);
        var e = De(t, a);
        W(t.I, e, []);
        X(c, b, d);
      });
      b = Fe(this, a);
      De(this, b);
      W(t.I, b, f);
    }
  };
  h.Wc = function (a, b, c) {
    this.e('setPriority', { path: a.toString(), ka: b });
    var d = Ce(this),
      d = Nd(b, d),
      d = S(this.g.M, a).Ia(d),
      d = ye(this.I, a, d, this.g.M),
      e = this.g.set(a, d),
      f = this;
    this.u.put(a.toString() + '/.priority', b, function (b, d) {
      'permission_denied' === b && L('setPriority at ' + a + ' failed: ' + b);
      Md(f.g, e);
      Kd(f.g, a);
      var l = De(f, a);
      W(f.I, l, []);
      X(c, b, d);
    });
    b = De(this, a);
    W(f.I, b, []);
  };
  function Ee(a) {
    a.e('onDisconnectEvents');
    var b = [],
      c = Ce(a);
    Gd(Od(a.T, c), new F(''), function (c, e) {
      var f = ye(a.I, c, e, a.g.M);
      b.push.apply(b, a.g.set(c, f));
      f = Fe(a, c);
      De(a, f);
      W(a.I, f, [c]);
    });
    Md(a.g, b);
    a.T = new Dd();
  }
  h.Nc = function (a, b) {
    var c = this;
    this.u.Nc(a.toString(), function (d, e) {
      'ok' === d && Fd(c.T, a);
      X(b, d, e);
    });
  };
  function Ge(a, b, c, d) {
    var e = O(c);
    vd(a.u, b.toString(), e.V(!0), function (c, g) {
      'ok' === c && Ed(a.T, b, e);
      X(d, c, g);
    });
  }
  function He(a, b, c, d, e) {
    var f = O(c, d);
    vd(a.u, b.toString(), f.V(!0), function (c, d) {
      'ok' === c && Ed(a.T, b, f);
      X(e, c, d);
    });
  }
  function Ie(a, b, c, d) {
    var e = !0,
      f;
    for (f in c) e = !1;
    e
      ? (K("onDisconnect().update() called with empty data.  Don't do anything."), X(d, 'ok'))
      : xd(a.u, b.toString(), c, function (e, f) {
          if ('ok' === e)
            for (var l in c) {
              var m = O(c[l]);
              Ed(a.T, b.G(l), m);
            }
          X(d, e, f);
        });
  }
  function Je(a) {
    yc(a.aa, 'deprecated_on_disconnect');
    a.zd.Zc.deprecated_on_disconnect = !0;
  }
  h.Rb = function (a, b, c, d, e) {
    '.info' === C(a.path) ? this.Jc.Rb(a, b, c, d, e) : this.I.Rb(a, b, c, d, e);
  };
  h.lc = function (a, b, c, d) {
    if ('.info' === C(a.path)) this.Jc.lc(a, b, c, d);
    else {
      b = this.I.lc(a, b, c, d);
      if ((c = null !== b)) {
        c = this.g;
        d = a.path;
        for (var e = [], f = 0; f < b.length; ++f) e[f] = S(c.va, b[f]);
        T(c.va, d, M);
        for (f = 0; f < b.length; ++f) T(c.va, b[f], e[f]);
        c = Kd(c, d);
      }
      c &&
        (v(this.g.pa.$ === this.I.ac, "We should have raised any outstanding events by now.  Else, we'll blow them away."),
        T(this.g.pa, a.path, S(this.g.M, a.path)),
        (this.I.ac = this.g.pa.$));
    }
  };
  h.La = function () {
    this.u.La();
  };
  h.jb = function () {
    this.u.jb();
  };
  h.Xc = function (a) {
    if ('undefined' !== typeof console) {
      a ? (this.qc || (this.qc = new zc(this.aa)), (a = this.qc.get())) : (a = this.aa.get());
      var b = wb(
          vc(a),
          function (a, b) {
            return Math.max(b.length, a);
          },
          0
        ),
        c;
      for (c in a) {
        for (var d = a[c], e = c.length; e < b + 2; e++) c += ' ';
        console.log(c + d);
      }
    }
  };
  h.Yc = function (a) {
    yc(this.aa, a);
    this.zd.Zc[a] = !0;
  };
  h.e = function () {
    K('r:' + this.u.id + ':', arguments);
  };
  function X(a, b, c) {
    a &&
      ec(function () {
        if ('ok' == b) a(null, c);
        else {
          var d = (b || 'error').toUpperCase(),
            e = d;
          c && (e += ': ' + c);
          e = Error(e);
          e.code = d;
          a(e);
        }
      });
  }
  function Ke(a, b, c, d, e) {
    function f() {}
    a.e('transaction on ' + b);
    var g = new E(a, b);
    g.fb('value', f);
    c = {
      path: b,
      update: c,
      D: d,
      status: null,
      qd: Kb(),
      wc: e,
      vd: 0,
      tc: function () {
        g.yb('value', f);
      },
      uc: null,
    };
    a.Ha.$ = Le(a, a.Ha.$, a.g.M.$, a.Sa);
    d = c.update(S(a.Ha, b).V());
    if (n(d)) {
      Aa('transaction failed: Data returned ', d);
      c.status = 1;
      e = I(a.Sa, b);
      var k = e.j() || [];
      k.push(c);
      J(e, k);
      k = 'object' === typeof d && null !== d && A(d, '.priority') ? d['.priority'] : S(a.g.M, b).k();
      e = Ce(a);
      d = O(d, k);
      d = Pd(d, e);
      T(a.Ha, b, d);
      c.wc && (T(a.g.pa, b, d), W(a.I, b, [b]));
      Me(a);
    } else c.tc(), c.D && ((a = Ne(a, b)), c.D(null, !1, a));
  }
  function Me(a, b) {
    var c = b || a.Sa;
    b || Oe(a, c);
    if (null !== c.j()) {
      var d = Pe(a, c);
      v(0 < d.length);
      xb(d, function (a) {
        return 1 === a.status;
      }) && Qe(a, c.path(), d);
    } else
      c.sb() &&
        c.A(function (b) {
          Me(a, b);
        });
  }
  function Qe(a, b, c) {
    for (var d = 0; d < c.length; d++) v(1 === c[d].status, 'tryToSendTransactionQueue_: items in queue should all be run.'), (c[d].status = 2), c[d].vd++;
    var e = S(a.g.M, b).hash();
    T(a.g.M, b, S(a.g.pa, b));
    for (var f = S(a.Ha, b).V(!0), g = Kb(), k = Re(c), d = 0; d < k.length; d++) J(I(a.g.Fb, k[d]), g);
    a.u.put(
      b.toString(),
      f,
      function (e) {
        a.e('transaction put response', { path: b.toString(), status: e });
        for (d = 0; d < k.length; d++) {
          var f = I(a.g.Fb, k[d]),
            p = f.j();
          v(null !== p, 'sendTransactionQueue_: pendingPut should not be null.');
          p === g && (J(f, null), T(a.g.M, k[d], S(a.g.va, k[d])));
        }
        if ('ok' === e) {
          e = [];
          for (d = 0; d < c.length; d++) (c[d].status = 3), c[d].D && ((f = Ne(a, c[d].path)), e.push(r(c[d].D, null, null, !0, f))), c[d].tc();
          Oe(a, I(a.Sa, b));
          Me(a);
          for (d = 0; d < e.length; d++) ec(e[d]);
        } else {
          if ('datastale' === e) for (d = 0; d < c.length; d++) c[d].status = 4 === c[d].status ? 5 : 1;
          else for (L('transaction at ' + b + ' failed: ' + e), d = 0; d < c.length; d++) (c[d].status = 5), (c[d].uc = e);
          e = De(a, b);
          W(a.I, e, [b]);
        }
      },
      e
    );
  }
  function Re(a) {
    for (var b = {}, c = 0; c < a.length; c++) a[c].wc && (b[a[c].path.toString()] = a[c].path);
    a = [];
    for (var d in b) a.push(b[d]);
    return a;
  }
  function De(a, b) {
    var c = Se(a, b),
      d = c.path(),
      c = Pe(a, c);
    T(a.g.pa, d, S(a.g.M, d));
    T(a.Ha, d, S(a.g.M, d));
    if (0 !== c.length) {
      for (var e = S(a.g.pa, d), f = e, g = [], k = 0; k < c.length; k++) {
        var l = Na(d, c[k].path),
          m = !1,
          p;
        v(null !== l, 'rerunTransactionsUnderNode_: relativePath should not be null.');
        if (5 === c[k].status) (m = !0), (p = c[k].uc);
        else if (1 === c[k].status)
          if (25 <= c[k].vd) (m = !0), (p = 'maxretry');
          else {
            var t = e.L(l),
              s = c[k].update(t.V());
            if (n(s)) {
              Aa('transaction failed: Data returned ', s);
              var w = O(s);
              ('object' === typeof s && null != s && A(s, '.priority')) || (w = w.Ia(t.k()));
              e = e.Aa(l, w);
              c[k].wc && (f = f.Aa(l, w));
            } else (m = !0), (p = 'nodata');
          }
        m &&
          ((c[k].status = 3),
          setTimeout(c[k].tc, 0),
          c[k].D && ((m = new E(a, c[k].path)), (l = new P(e.L(l), m)), 'nodata' === p ? g.push(r(c[k].D, null, null, !1, l)) : g.push(r(c[k].D, null, Error(p), !1, l))));
      }
      T(a.Ha, d, e);
      T(a.g.pa, d, f);
      Oe(a, a.Sa);
      for (k = 0; k < g.length; k++) ec(g[k]);
      Me(a);
    }
    return d;
  }
  function Se(a, b) {
    for (var c, d = a.Sa; null !== (c = C(b)) && null === d.j(); ) (d = I(d, c)), (b = La(b));
    return d;
  }
  function Pe(a, b) {
    var c = [];
    Te(a, b, c);
    c.sort(function (a, b) {
      return a.qd - b.qd;
    });
    return c;
  }
  function Te(a, b, c) {
    var d = b.j();
    if (null !== d) for (var e = 0; e < d.length; e++) c.push(d[e]);
    b.A(function (b) {
      Te(a, b, c);
    });
  }
  function Oe(a, b) {
    var c = b.j();
    if (c) {
      for (var d = 0, e = 0; e < c.length; e++) 3 !== c[e].status && ((c[d] = c[e]), d++);
      c.length = d;
      J(b, 0 < c.length ? c : null);
    }
    b.A(function (b) {
      Oe(a, b);
    });
  }
  function Fe(a, b) {
    var c = Se(a, b).path(),
      d = I(a.Sa, b);
    Sa(d, function (a) {
      Ue(a);
    });
    Ue(d);
    Ra(d, function (a) {
      Ue(a);
    });
    return c;
  }
  function Ue(a) {
    var b = a.j();
    if (null !== b) {
      for (var c = [], d = -1, e = 0; e < b.length; e++)
        4 !== b[e].status &&
          (2 === b[e].status
            ? (v(d === e - 1, 'All SENT items should be at beginning of queue.'), (d = e), (b[e].status = 4), (b[e].uc = 'set'))
            : (v(1 === b[e].status), b[e].tc(), b[e].D && c.push(r(b[e].D, null, Error('set'), !1, null))));
      -1 === d ? J(a, null) : (b.length = d + 1);
      for (e = 0; e < c.length; e++) ec(c[e]);
    }
  }
  function Ne(a, b) {
    var c = new E(a, b);
    return new P(S(a.Ha, b), c);
  }
  function Le(a, b, c, d) {
    if (d.f()) return c;
    if (null != d.j()) return b;
    var e = c;
    d.A(function (d) {
      var g = d.name(),
        k = new F(g);
      d = Le(a, b.L(k), c.L(k), d);
      e = e.H(g, d);
    });
    return e;
  }
  function Y() {
    this.ib = {};
  }
  ca(Y);
  Y.prototype.La = function () {
    for (var a in this.ib) this.ib[a].La();
  };
  Y.prototype.interrupt = Y.prototype.La;
  Y.prototype.jb = function () {
    for (var a in this.ib) this.ib[a].jb();
  };
  Y.prototype.resume = Y.prototype.jb;
  var Z = {
    Nd: function (a) {
      var b = N.prototype.hash;
      N.prototype.hash = a;
      var c = fc.prototype.hash;
      fc.prototype.hash = a;
      return function () {
        N.prototype.hash = b;
        fc.prototype.hash = c;
      };
    },
  };
  Z.hijackHash = Z.Nd;
  Z.Pa = function (a) {
    return a.Pa();
  };
  Z.queryIdentifier = Z.Pa;
  Z.Qd = function (a) {
    return a.m.u.ia;
  };
  Z.listens = Z.Qd;
  Z.Yd = function (a) {
    return a.m.u.la;
  };
  Z.refConnection = Z.Yd;
  Z.Cd = ld;
  Z.DataConnection = Z.Cd;
  ld.prototype.sendRequest = ld.prototype.Ga;
  ld.prototype.interrupt = ld.prototype.La;
  Z.Dd = $c;
  Z.RealTimeConnection = Z.Dd;
  $c.prototype.sendRequest = $c.prototype.xd;
  $c.prototype.close = $c.prototype.close;
  Z.Bd = ob;
  Z.ConnectionTarget = Z.Bd;
  Z.Ld = function () {
    Oc = Gc = !0;
  };
  Z.forceLongPolling = Z.Ld;
  Z.Md = function () {
    Pc = !0;
  };
  Z.forceWebSockets = Z.Md;
  Z.de = function (a, b) {
    a.m.u.Vc = b;
  };
  Z.setSecurityDebugCallback = Z.de;
  Z.Xc = function (a, b) {
    a.m.Xc(b);
  };
  Z.stats = Z.Xc;
  Z.Yc = function (a, b) {
    a.m.Yc(b);
  };
  Z.statsIncrementCounter = Z.Yc;
  Z.Cc = function (a) {
    return a.m.Cc;
  };
  Z.Od = function (a, b) {
    a.m.md = b;
  };
  Z.interceptServerData = Z.Od;
  function $(a, b, c) {
    this.Jb = a;
    this.X = b;
    this.Fa = c;
  }
  $.prototype.cancel = function (a) {
    x('Firebase.onDisconnect().cancel', 0, 1, arguments.length);
    z('Firebase.onDisconnect().cancel', 1, a, !0);
    this.Jb.Nc(this.X, a);
  };
  $.prototype.cancel = $.prototype.cancel;
  $.prototype.remove = function (a) {
    x('Firebase.onDisconnect().remove', 0, 1, arguments.length);
    B('Firebase.onDisconnect().remove', this.X);
    z('Firebase.onDisconnect().remove', 1, a, !0);
    Ge(this.Jb, this.X, null, a);
  };
  $.prototype.remove = $.prototype.remove;
  $.prototype.set = function (a, b) {
    x('Firebase.onDisconnect().set', 1, 2, arguments.length);
    B('Firebase.onDisconnect().set', this.X);
    za('Firebase.onDisconnect().set', a, !1);
    z('Firebase.onDisconnect().set', 2, b, !0);
    Ge(this.Jb, this.X, a, b);
  };
  $.prototype.set = $.prototype.set;
  $.prototype.kb = function (a, b, c) {
    x('Firebase.onDisconnect().setWithPriority', 2, 3, arguments.length);
    B('Firebase.onDisconnect().setWithPriority', this.X);
    za('Firebase.onDisconnect().setWithPriority', a, !1);
    Ea('Firebase.onDisconnect().setWithPriority', 2, b, !1);
    z('Firebase.onDisconnect().setWithPriority', 3, c, !0);
    if ('.length' === this.Fa || '.keys' === this.Fa) throw 'Firebase.onDisconnect().setWithPriority failed: ' + this.Fa + ' is a read-only object.';
    He(this.Jb, this.X, a, b, c);
  };
  $.prototype.setWithPriority = $.prototype.kb;
  $.prototype.update = function (a, b) {
    x('Firebase.onDisconnect().update', 1, 2, arguments.length);
    B('Firebase.onDisconnect().update', this.X);
    Da('Firebase.onDisconnect().update', a);
    z('Firebase.onDisconnect().update', 2, b, !0);
    Ie(this.Jb, this.X, a, b);
  };
  $.prototype.update = $.prototype.update;
  var Ve = (function () {
    var a = 0,
      b = [];
    return function (c) {
      var d = c === a;
      a = c;
      for (var e = Array(8), f = 7; 0 <= f; f--) (e[f] = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'.charAt(c % 64)), (c = Math.floor(c / 64));
      v(0 === c, 'Cannot push at time == 0');
      c = e.join('');
      if (d) {
        for (f = 11; 0 <= f && 63 === b[f]; f--) b[f] = 0;
        b[f]++;
      } else for (f = 0; 12 > f; f++) b[f] = Math.floor(64 * Math.random());
      for (f = 0; 12 > f; f++) c += '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'.charAt(b[f]);
      v(20 === c.length, 'NextPushId: Length should be 20.');
      return c;
    };
  })();
  function E(a, b) {
    var c, d;
    if (a instanceof ze) (c = a), (d = b);
    else {
      x('new Firebase', 1, 2, arguments.length);
      var e = arguments[0];
      d = c = '';
      var f = !0,
        g = '';
      if (q(e)) {
        var k = e.indexOf('//');
        if (0 <= k)
          var l = e.substring(0, k - 1),
            e = e.substring(k + 2);
        k = e.indexOf('/');
        -1 === k && (k = e.length);
        c = e.substring(0, k);
        var e = e.substring(k + 1),
          m = c.split('.');
        if (3 == m.length) {
          k = m[2].indexOf(':');
          f = 0 <= k ? 'https' === l || 'wss' === l : !0;
          if ('firebase' === m[1]) Sb(c + ' is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead');
          else
            for (d = m[0], g = '', e = ('/' + e).split('/'), k = 0; k < e.length; k++)
              if (0 < e[k].length) {
                m = e[k];
                try {
                  m = decodeURIComponent(m.replace(/\+/g, ' '));
                } catch (p) {}
                g += '/' + m;
              }
          d = d.toLowerCase();
        } else Sb('Cannot parse Firebase url. Please use https:<YOUR FIREBASE>.firebaseio.com');
      }
      f ||
        ('undefined' !== typeof window &&
          window.location &&
          window.location.protocol &&
          -1 !== window.location.protocol.indexOf('https:') &&
          L('Insecure Firebase access from a secure page. Please use https in calls to new Firebase().'));
      c = new ob(c, f, d, 'ws' === l || 'wss' === l);
      d = new F(g);
      f = d.toString();
      !(l = !q(c.host) || 0 === c.host.length || !ya(c.Yb)) &&
        (l = 0 !== f.length) &&
        (f && (f = f.replace(/^\/*\.info(\/|$)/, '/')), (l = !(q(f) && 0 !== f.length && !xa.test(f))));
      if (l) throw Error(y('new Firebase', 1, !1) + 'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');
      if (b)
        if (b instanceof Y) f = b;
        else throw Error('Expected a valid Firebase.Context for second argument to new Firebase()');
      else f = Y.rb();
      l = c.toString();
      e = va(f.ib, l);
      e || ((e = new ze(c)), (f.ib[l] = e));
      c = e;
    }
    D.call(this, c, d);
  }
  ja(E, D);
  var We = E,
    Xe = ['Firebase'],
    Ye = aa;
  Xe[0] in Ye || !Ye.execScript || Ye.execScript('var ' + Xe[0]);
  for (var Ze; Xe.length && (Ze = Xe.shift()); ) !Xe.length && n(We) ? (Ye[Ze] = We) : (Ye = Ye[Ze] ? Ye[Ze] : (Ye[Ze] = {}));
  E.prototype.name = function () {
    x('Firebase.name', 0, 0, arguments.length);
    return this.path.f() ? null : Ma(this.path);
  };
  E.prototype.name = E.prototype.name;
  E.prototype.G = function (a) {
    x('Firebase.child', 1, 1, arguments.length);
    if (fa(a)) a = String(a);
    else if (!(a instanceof F))
      if (null === C(this.path)) {
        var b = a;
        b && (b = b.replace(/^\/*\.info(\/|$)/, '/'));
        Ha('Firebase.child', b);
      } else Ha('Firebase.child', a);
    return new E(this.m, this.path.G(a));
  };
  E.prototype.child = E.prototype.G;
  E.prototype.parent = function () {
    x('Firebase.parent', 0, 0, arguments.length);
    var a = this.path.parent();
    return null === a ? null : new E(this.m, a);
  };
  E.prototype.parent = E.prototype.parent;
  E.prototype.root = function () {
    x('Firebase.ref', 0, 0, arguments.length);
    for (var a = this; null !== a.parent(); ) a = a.parent();
    return a;
  };
  E.prototype.root = E.prototype.root;
  E.prototype.toString = function () {
    x('Firebase.toString', 0, 0, arguments.length);
    var a;
    if (null === this.parent()) a = this.m.toString();
    else {
      a = this.parent().toString() + '/';
      var b = this.name();
      a += encodeURIComponent(String(b));
    }
    return a;
  };
  E.prototype.toString = E.prototype.toString;
  E.prototype.set = function (a, b) {
    x('Firebase.set', 1, 2, arguments.length);
    B('Firebase.set', this.path);
    za('Firebase.set', a, !1);
    z('Firebase.set', 2, b, !0);
    this.m.kb(this.path, a, null, b);
  };
  E.prototype.set = E.prototype.set;
  E.prototype.update = function (a, b) {
    x('Firebase.update', 1, 2, arguments.length);
    B('Firebase.update', this.path);
    Da('Firebase.update', a);
    z('Firebase.update', 2, b, !0);
    if (A(a, '.priority')) throw Error('update() does not currently support updating .priority.');
    this.m.update(this.path, a, b);
  };
  E.prototype.update = E.prototype.update;
  E.prototype.kb = function (a, b, c) {
    x('Firebase.setWithPriority', 2, 3, arguments.length);
    B('Firebase.setWithPriority', this.path);
    za('Firebase.setWithPriority', a, !1);
    Ea('Firebase.setWithPriority', 2, b, !1);
    z('Firebase.setWithPriority', 3, c, !0);
    if ('.length' === this.name() || '.keys' === this.name()) throw 'Firebase.setWithPriority failed: ' + this.name() + ' is a read-only object.';
    this.m.kb(this.path, a, b, c);
  };
  E.prototype.setWithPriority = E.prototype.kb;
  E.prototype.remove = function (a) {
    x('Firebase.remove', 0, 1, arguments.length);
    B('Firebase.remove', this.path);
    z('Firebase.remove', 1, a, !0);
    this.set(null, a);
  };
  E.prototype.remove = E.prototype.remove;
  E.prototype.transaction = function (a, b, c) {
    x('Firebase.transaction', 1, 3, arguments.length);
    B('Firebase.transaction', this.path);
    z('Firebase.transaction', 1, a, !1);
    z('Firebase.transaction', 2, b, !0);
    if (n(c) && 'boolean' != typeof c) throw Error(y('Firebase.transaction', 3, !0) + 'must be a boolean.');
    if ('.length' === this.name() || '.keys' === this.name()) throw 'Firebase.transaction failed: ' + this.name() + ' is a read-only object.';
    'undefined' === typeof c && (c = !0);
    Ke(this.m, this.path, a, b, c);
  };
  E.prototype.transaction = E.prototype.transaction;
  E.prototype.Wc = function (a, b) {
    x('Firebase.setPriority', 1, 2, arguments.length);
    B('Firebase.setPriority', this.path);
    Ea('Firebase.setPriority', 1, a, !1);
    z('Firebase.setPriority', 2, b, !0);
    this.m.Wc(this.path, a, b);
  };
  E.prototype.setPriority = E.prototype.Wc;
  E.prototype.push = function (a, b) {
    x('Firebase.push', 0, 2, arguments.length);
    B('Firebase.push', this.path);
    za('Firebase.push', a, !0);
    z('Firebase.push', 2, b, !0);
    var c = Be(this.m),
      c = Ve(c),
      c = this.G(c);
    'undefined' !== typeof a && null !== a && c.set(a, b);
    return c;
  };
  E.prototype.push = E.prototype.push;
  E.prototype.ja = function () {
    return new $(this.m, this.path, this.name());
  };
  E.prototype.onDisconnect = E.prototype.ja;
  E.prototype.Zd = function () {
    L('FirebaseRef.removeOnDisconnect() being deprecated. Please use FirebaseRef.onDisconnect().remove() instead.');
    this.ja().remove();
    Je(this.m);
  };
  E.prototype.removeOnDisconnect = E.prototype.Zd;
  E.prototype.ce = function (a) {
    L('FirebaseRef.setOnDisconnect(value) being deprecated. Please use FirebaseRef.onDisconnect().set(value) instead.');
    this.ja().set(a);
    Je(this.m);
  };
  E.prototype.setOnDisconnect = E.prototype.ce;
  E.prototype.mb = function (a, b, c) {
    x('Firebase.auth', 1, 3, arguments.length);
    if (!q(a)) throw Error(y('Firebase.auth', 1, !1) + 'must be a valid credential (a string).');
    z('Firebase.auth', 2, b, !0);
    z('Firebase.auth', 3, b, !0);
    this.m.mb(a, b, c);
  };
  E.prototype.auth = E.prototype.mb;
  E.prototype.Pb = function (a) {
    x('Firebase.unauth', 0, 1, arguments.length);
    z('Firebase.unauth', 1, a, !0);
    this.m.Pb(a);
  };
  E.prototype.unauth = E.prototype.Pb;
  E.goOffline = function () {
    x('Firebase.goOffline', 0, 0, arguments.length);
    Y.rb().La();
  };
  E.goOnline = function () {
    x('Firebase.goOnline', 0, 0, arguments.length);
    Y.rb().jb();
  };
  function Pb(a, b) {
    v(!b || !0 === a || !1 === a, "Can't turn on custom loggers persistently.");
    !0 === a
      ? ('undefined' !== typeof console &&
          ('function' === typeof console.log
            ? (Nb = r(console.log, console))
            : 'object' === typeof console.log &&
              (Nb = function (a) {
                console.log(a);
              })),
        b && nb.set('logging_enabled', !0))
      : a
      ? (Nb = a)
      : ((Nb = null), nb.remove('logging_enabled'));
  }
  E.enableLogging = Pb;
  E.ServerValue = { TIMESTAMP: { '.sv': 'timestamp' } };
  E.INTERNAL = Z;
  E.Context = Y;
})();
