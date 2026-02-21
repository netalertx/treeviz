var $n = Object.defineProperty;
var zn = (t, e, n) => e in t ? $n(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var rt = (t, e, n) => (zn(t, typeof e != "symbol" ? e + "" : e, n), n);
(function() {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload"))
    return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
    r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const a of o.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const o = {};
    return i.integrity && (o.integrity = i.integrity), i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? o.credentials = "include" : i.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
  }
  function r(i) {
    if (i.ep)
      return;
    i.ep = !0;
    const o = n(i);
    fetch(i.href, o);
  }
})();
function An(t) {
  var e = 0, n = t.children, r = n && n.length;
  if (!r)
    e = 1;
  else
    for (; --r >= 0; )
      e += n[r].value;
  t.value = e;
}
function Sn() {
  return this.eachAfter(An);
}
function En(t, e) {
  let n = -1;
  for (const r of this)
    t.call(e, r, ++n, this);
  return this;
}
function Mn(t, e) {
  for (var n = this, r = [n], i, o, a = -1; n = r.pop(); )
    if (t.call(e, n, ++a, this), i = n.children)
      for (o = i.length - 1; o >= 0; --o)
        r.push(i[o]);
  return this;
}
function Tn(t, e) {
  for (var n = this, r = [n], i = [], o, a, u, f = -1; n = r.pop(); )
    if (i.push(n), o = n.children)
      for (a = 0, u = o.length; a < u; ++a)
        r.push(o[a]);
  for (; n = i.pop(); )
    t.call(e, n, ++f, this);
  return this;
}
function Cn(t, e) {
  let n = -1;
  for (const r of this)
    if (t.call(e, r, ++n, this))
      return r;
}
function In(t) {
  return this.eachAfter(function(e) {
    for (var n = +t(e.data) || 0, r = e.children, i = r && r.length; --i >= 0; )
      n += r[i].value;
    e.value = n;
  });
}
function Ln(t) {
  return this.eachBefore(function(e) {
    e.children && e.children.sort(t);
  });
}
function Hn(t) {
  for (var e = this, n = Dn(e, t), r = [e]; e !== n; )
    e = e.parent, r.push(e);
  for (var i = r.length; t !== n; )
    r.splice(i, 0, t), t = t.parent;
  return r;
}
function Dn(t, e) {
  if (t === e)
    return t;
  var n = t.ancestors(), r = e.ancestors(), i = null;
  for (t = n.pop(), e = r.pop(); t === e; )
    i = t, t = n.pop(), e = r.pop();
  return i;
}
function Fn() {
  for (var t = this, e = [t]; t = t.parent; )
    e.push(t);
  return e;
}
function qn() {
  return Array.from(this);
}
function Rn() {
  var t = [];
  return this.eachBefore(function(e) {
    e.children || t.push(e);
  }), t;
}
function Pn() {
  var t = this, e = [];
  return t.each(function(n) {
    n !== t && e.push({ source: n.parent, target: n });
  }), e;
}
function* On() {
  var t = this, e, n = [t], r, i, o;
  do
    for (e = n.reverse(), n = []; t = e.pop(); )
      if (yield t, r = t.children)
        for (i = 0, o = r.length; i < o; ++i)
          n.push(r[i]);
  while (n.length);
}
function ce(t, e) {
  t instanceof Map ? (t = [void 0, t], e === void 0 && (e = Bn)) : e === void 0 && (e = Wn);
  for (var n = new at(t), r, i = [n], o, a, u, f; r = i.pop(); )
    if ((a = e(r.data)) && (f = (a = Array.from(a)).length))
      for (r.children = a, u = f - 1; u >= 0; --u)
        i.push(o = a[u] = new at(a[u])), o.parent = r, o.depth = r.depth + 1;
  return n.eachBefore(Be);
}
function Vn() {
  return ce(this).eachBefore(Xn);
}
function Wn(t) {
  return t.children;
}
function Bn(t) {
  return Array.isArray(t) ? t[1] : null;
}
function Xn(t) {
  t.data.value !== void 0 && (t.value = t.data.value), t.data = t.data.data;
}
function Be(t) {
  var e = 0;
  do
    t.height = e;
  while ((t = t.parent) && t.height < ++e);
}
function at(t) {
  this.data = t, this.depth = this.height = 0, this.parent = null;
}
at.prototype = ce.prototype = {
  constructor: at,
  count: Sn,
  each: En,
  eachAfter: Tn,
  eachBefore: Mn,
  find: Cn,
  sum: In,
  sort: Ln,
  path: Hn,
  ancestors: Fn,
  descendants: qn,
  leaves: Rn,
  links: Pn,
  copy: Vn,
  [Symbol.iterator]: On
};
function Yt(t) {
  return t == null ? null : Xe(t);
}
function Xe(t) {
  if (typeof t != "function")
    throw new Error();
  return t;
}
function lt() {
  return 0;
}
function ct(t) {
  return function() {
    return t;
  };
}
function Yn(t) {
  t.x0 = Math.round(t.x0), t.y0 = Math.round(t.y0), t.x1 = Math.round(t.x1), t.y1 = Math.round(t.y1);
}
function Gn(t, e, n, r, i) {
  for (var o = t.children, a, u = -1, f = o.length, s = t.value && (r - e) / t.value; ++u < f; )
    a = o[u], a.y0 = n, a.y1 = i, a.x0 = e, a.x1 = e += a.value * s;
}
var Un = { depth: -1 }, ve = {}, Gt = {};
function Kn(t) {
  return t.id;
}
function Zn(t) {
  return t.parentId;
}
function Qn() {
  var t = Kn, e = Zn, n;
  function r(i) {
    var o = Array.from(i), a = t, u = e, f, s, l, d, c, p, m, x, _ = /* @__PURE__ */ new Map();
    if (n != null) {
      const y = o.map((z, E) => Jn(n(z, E, i))), w = y.map(be), A = new Set(y).add("");
      for (const z of w)
        A.has(z) || (A.add(z), y.push(z), w.push(be(z)), o.push(Gt));
      a = (z, E) => y[E], u = (z, E) => w[E];
    }
    for (l = 0, f = o.length; l < f; ++l)
      s = o[l], p = o[l] = new at(s), (m = a(s, l, i)) != null && (m += "") && (x = p.id = m, _.set(x, _.has(x) ? ve : p)), (m = u(s, l, i)) != null && (m += "") && (p.parent = m);
    for (l = 0; l < f; ++l)
      if (p = o[l], m = p.parent) {
        if (c = _.get(m), !c)
          throw new Error("missing: " + m);
        if (c === ve)
          throw new Error("ambiguous: " + m);
        c.children ? c.children.push(p) : c.children = [p], p.parent = c;
      } else {
        if (d)
          throw new Error("multiple roots");
        d = p;
      }
    if (!d)
      throw new Error("no root");
    if (n != null) {
      for (; d.data === Gt && d.children.length === 1; )
        d = d.children[0], --f;
      for (let y = o.length - 1; y >= 0 && (p = o[y], p.data === Gt); --y)
        p.data = null;
    }
    if (d.parent = Un, d.eachBefore(function(y) {
      y.depth = y.parent.depth + 1, --f;
    }).eachBefore(Be), d.parent = null, f > 0)
      throw new Error("cycle");
    return d;
  }
  return r.id = function(i) {
    return arguments.length ? (t = Yt(i), r) : t;
  }, r.parentId = function(i) {
    return arguments.length ? (e = Yt(i), r) : e;
  }, r.path = function(i) {
    return arguments.length ? (n = Yt(i), r) : n;
  }, r;
}
function Jn(t) {
  t = `${t}`;
  let e = t.length;
  return te(t, e - 1) && !te(t, e - 2) && (t = t.slice(0, -1)), t[0] === "/" ? t : `/${t}`;
}
function be(t) {
  let e = t.length;
  if (e < 2)
    return "";
  for (; --e > 1 && !te(t, e); )
    ;
  return t.slice(0, e);
}
function te(t, e) {
  if (t[e] === "/") {
    let n = 0;
    for (; e > 0 && t[--e] === "\\"; )
      ++n;
    if (!(n & 1))
      return !0;
  }
  return !1;
}
function jn(t, e) {
  return t.parent === e.parent ? 1 : 2;
}
function Ut(t) {
  var e = t.children;
  return e ? e[0] : t.t;
}
function Kt(t) {
  var e = t.children;
  return e ? e[e.length - 1] : t.t;
}
function tr(t, e, n) {
  var r = n / (e.i - t.i);
  e.c -= r, e.s += n, t.c += r, e.z += n, e.m += n;
}
function er(t) {
  for (var e = 0, n = 0, r = t.children, i = r.length, o; --i >= 0; )
    o = r[i], o.z += e, o.m += e, e += o.s + (n += o.c);
}
function nr(t, e, n) {
  return t.a.parent === e.parent ? t.a : n;
}
function Mt(t, e) {
  this._ = t, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = e;
}
Mt.prototype = Object.create(at.prototype);
function rr(t) {
  for (var e = new Mt(t, 0), n, r = [e], i, o, a, u; n = r.pop(); )
    if (o = n._.children)
      for (n.children = new Array(u = o.length), a = u - 1; a >= 0; --a)
        r.push(i = n.children[a] = new Mt(o[a], a)), i.parent = n;
  return (e.parent = new Mt(null, 0)).children = [e], e;
}
function ir() {
  var t = jn, e = 1, n = 1, r = null;
  function i(s) {
    var l = rr(s);
    if (l.eachAfter(o), l.parent.m = -l.z, l.eachBefore(a), r)
      s.eachBefore(f);
    else {
      var d = s, c = s, p = s;
      s.eachBefore(function(w) {
        w.x < d.x && (d = w), w.x > c.x && (c = w), w.depth > p.depth && (p = w);
      });
      var m = d === c ? 1 : t(d, c) / 2, x = m - d.x, _ = e / (c.x + m + x), y = n / (p.depth || 1);
      s.eachBefore(function(w) {
        w.x = (w.x + x) * _, w.y = w.depth * y;
      });
    }
    return s;
  }
  function o(s) {
    var l = s.children, d = s.parent.children, c = s.i ? d[s.i - 1] : null;
    if (l) {
      er(s);
      var p = (l[0].z + l[l.length - 1].z) / 2;
      c ? (s.z = c.z + t(s._, c._), s.m = s.z - p) : s.z = p;
    } else
      c && (s.z = c.z + t(s._, c._));
    s.parent.A = u(s, c, s.parent.A || d[0]);
  }
  function a(s) {
    s._.x = s.z + s.parent.m, s.m += s.parent.m;
  }
  function u(s, l, d) {
    if (l) {
      for (var c = s, p = s, m = l, x = c.parent.children[0], _ = c.m, y = p.m, w = m.m, A = x.m, z; m = Kt(m), c = Ut(c), m && c; )
        x = Ut(x), p = Kt(p), p.a = s, z = m.z + w - c.z - _ + t(m._, c._), z > 0 && (tr(nr(m, s, d), s, z), _ += z, y += z), w += m.m, _ += c.m, A += x.m, y += p.m;
      m && !Kt(p) && (p.t = m, p.m += w - y), c && !Ut(x) && (x.t = c, x.m += _ - A, d = s);
    }
    return d;
  }
  function f(s) {
    s.x *= e, s.y = s.depth * n;
  }
  return i.separation = function(s) {
    return arguments.length ? (t = s, i) : t;
  }, i.size = function(s) {
    return arguments.length ? (r = !1, e = +s[0], n = +s[1], i) : r ? null : [e, n];
  }, i.nodeSize = function(s) {
    return arguments.length ? (r = !0, e = +s[0], n = +s[1], i) : r ? [e, n] : null;
  }, i;
}
function or(t, e, n, r, i) {
  for (var o = t.children, a, u = -1, f = o.length, s = t.value && (i - n) / t.value; ++u < f; )
    a = o[u], a.x0 = e, a.x1 = r, a.y0 = n, a.y1 = n += a.value * s;
}
var ar = (1 + Math.sqrt(5)) / 2;
function sr(t, e, n, r, i, o) {
  for (var a = [], u = e.children, f, s, l = 0, d = 0, c = u.length, p, m, x = e.value, _, y, w, A, z, E, C; l < c; ) {
    p = i - n, m = o - r;
    do
      _ = u[d++].value;
    while (!_ && d < c);
    for (y = w = _, E = Math.max(m / p, p / m) / (x * t), C = _ * _ * E, z = Math.max(w / C, C / y); d < c; ++d) {
      if (_ += s = u[d].value, s < y && (y = s), s > w && (w = s), C = _ * _ * E, A = Math.max(w / C, C / y), A > z) {
        _ -= s;
        break;
      }
      z = A;
    }
    a.push(f = { value: _, dice: p < m, children: u.slice(l, d) }), f.dice ? Gn(f, n, r, i, x ? r += m * _ / x : o) : or(f, n, r, x ? n += p * _ / x : i, o), x -= _, l = d;
  }
  return a;
}
const ur = function t(e) {
  function n(r, i, o, a, u) {
    sr(e, r, i, o, a, u);
  }
  return n.ratio = function(r) {
    return t((r = +r) > 1 ? r : 1);
  }, n;
}(ar);
function lr() {
  var t = ur, e = !1, n = 1, r = 1, i = [0], o = lt, a = lt, u = lt, f = lt, s = lt;
  function l(c) {
    return c.x0 = c.y0 = 0, c.x1 = n, c.y1 = r, c.eachBefore(d), i = [0], e && c.eachBefore(Yn), c;
  }
  function d(c) {
    var p = i[c.depth], m = c.x0 + p, x = c.y0 + p, _ = c.x1 - p, y = c.y1 - p;
    _ < m && (m = _ = (m + _) / 2), y < x && (x = y = (x + y) / 2), c.x0 = m, c.y0 = x, c.x1 = _, c.y1 = y, c.children && (p = i[c.depth + 1] = o(c) / 2, m += s(c) - p, x += a(c) - p, _ -= u(c) - p, y -= f(c) - p, _ < m && (m = _ = (m + _) / 2), y < x && (x = y = (x + y) / 2), t(c, m, x, _, y));
  }
  return l.round = function(c) {
    return arguments.length ? (e = !!c, l) : e;
  }, l.size = function(c) {
    return arguments.length ? (n = +c[0], r = +c[1], l) : [n, r];
  }, l.tile = function(c) {
    return arguments.length ? (t = Xe(c), l) : t;
  }, l.padding = function(c) {
    return arguments.length ? l.paddingInner(c).paddingOuter(c) : l.paddingInner();
  }, l.paddingInner = function(c) {
    return arguments.length ? (o = typeof c == "function" ? c : ct(+c), l) : o;
  }, l.paddingOuter = function(c) {
    return arguments.length ? l.paddingTop(c).paddingRight(c).paddingBottom(c).paddingLeft(c) : l.paddingTop();
  }, l.paddingTop = function(c) {
    return arguments.length ? (a = typeof c == "function" ? c : ct(+c), l) : a;
  }, l.paddingRight = function(c) {
    return arguments.length ? (u = typeof c == "function" ? c : ct(+c), l) : u;
  }, l.paddingBottom = function(c) {
    return arguments.length ? (f = typeof c == "function" ? c : ct(+c), l) : f;
  }, l.paddingLeft = function(c) {
    return arguments.length ? (s = typeof c == "function" ? c : ct(+c), l) : s;
  }, l;
}
var ee = "http://www.w3.org/1999/xhtml";
const ke = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ee,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Vt(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), ke.hasOwnProperty(e) ? { space: ke[e], local: t } : t;
}
function cr(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === ee && e.documentElement.namespaceURI === ee ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function fr(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ye(t) {
  var e = Vt(t);
  return (e.local ? fr : cr)(e);
}
function hr() {
}
function fe(t) {
  return t == null ? hr : function() {
    return this.querySelector(t);
  };
}
function dr(t) {
  typeof t != "function" && (t = fe(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, u = r[i] = new Array(a), f, s, l = 0; l < a; ++l)
      (f = o[l]) && (s = t.call(f, f.__data__, l, o)) && ("__data__" in f && (s.__data__ = f.__data__), u[l] = s);
  return new H(r, this._parents);
}
function Ge(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function pr() {
  return [];
}
function Ue(t) {
  return t == null ? pr : function() {
    return this.querySelectorAll(t);
  };
}
function gr(t) {
  return function() {
    return Ge(t.apply(this, arguments));
  };
}
function yr(t) {
  typeof t == "function" ? t = gr(t) : t = Ue(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var a = e[o], u = a.length, f, s = 0; s < u; ++s)
      (f = a[s]) && (r.push(t.call(f, f.__data__, s, a)), i.push(f));
  return new H(r, i);
}
function Ke(t) {
  return function() {
    return this.matches(t);
  };
}
function Ze(t) {
  return function(e) {
    return e.matches(t);
  };
}
var mr = Array.prototype.find;
function xr(t) {
  return function() {
    return mr.call(this.children, t);
  };
}
function _r() {
  return this.firstElementChild;
}
function wr(t) {
  return this.select(t == null ? _r : xr(typeof t == "function" ? t : Ze(t)));
}
var vr = Array.prototype.filter;
function br() {
  return Array.from(this.children);
}
function kr(t) {
  return function() {
    return vr.call(this.children, t);
  };
}
function Nr(t) {
  return this.selectAll(t == null ? br : kr(typeof t == "function" ? t : Ze(t)));
}
function $r(t) {
  typeof t != "function" && (t = Ke(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, u = r[i] = [], f, s = 0; s < a; ++s)
      (f = o[s]) && t.call(f, f.__data__, s, o) && u.push(f);
  return new H(r, this._parents);
}
function Qe(t) {
  return new Array(t.length);
}
function zr() {
  return new H(this._enter || this._groups.map(Qe), this._parents);
}
function Ht(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Ht.prototype = {
  constructor: Ht,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Ar(t) {
  return function() {
    return t;
  };
}
function Sr(t, e, n, r, i, o) {
  for (var a = 0, u, f = e.length, s = o.length; a < s; ++a)
    (u = e[a]) ? (u.__data__ = o[a], r[a] = u) : n[a] = new Ht(t, o[a]);
  for (; a < f; ++a)
    (u = e[a]) && (i[a] = u);
}
function Er(t, e, n, r, i, o, a) {
  var u, f, s = /* @__PURE__ */ new Map(), l = e.length, d = o.length, c = new Array(l), p;
  for (u = 0; u < l; ++u)
    (f = e[u]) && (c[u] = p = a.call(f, f.__data__, u, e) + "", s.has(p) ? i[u] = f : s.set(p, f));
  for (u = 0; u < d; ++u)
    p = a.call(t, o[u], u, o) + "", (f = s.get(p)) ? (r[u] = f, f.__data__ = o[u], s.delete(p)) : n[u] = new Ht(t, o[u]);
  for (u = 0; u < l; ++u)
    (f = e[u]) && s.get(c[u]) === f && (i[u] = f);
}
function Mr(t) {
  return t.__data__;
}
function Tr(t, e) {
  if (!arguments.length)
    return Array.from(this, Mr);
  var n = e ? Er : Sr, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Ar(t));
  for (var o = i.length, a = new Array(o), u = new Array(o), f = new Array(o), s = 0; s < o; ++s) {
    var l = r[s], d = i[s], c = d.length, p = Cr(t.call(l, l && l.__data__, s, r)), m = p.length, x = u[s] = new Array(m), _ = a[s] = new Array(m), y = f[s] = new Array(c);
    n(l, d, x, _, y, p, e);
    for (var w = 0, A = 0, z, E; w < m; ++w)
      if (z = x[w]) {
        for (w >= A && (A = w + 1); !(E = _[A]) && ++A < m; )
          ;
        z._next = E || null;
      }
  }
  return a = new H(a, r), a._enter = u, a._exit = f, a;
}
function Cr(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ir() {
  return new H(this._exit || this._groups.map(Qe), this._parents);
}
function Lr(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Hr(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, a = Math.min(i, o), u = new Array(i), f = 0; f < a; ++f)
    for (var s = n[f], l = r[f], d = s.length, c = u[f] = new Array(d), p, m = 0; m < d; ++m)
      (p = s[m] || l[m]) && (c[m] = p);
  for (; f < i; ++f)
    u[f] = n[f];
  return new H(u, this._parents);
}
function Dr() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], a; --i >= 0; )
      (a = r[i]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function Fr(t) {
  t || (t = qr);
  function e(d, c) {
    return d && c ? t(d.__data__, c.__data__) : !d - !c;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var a = n[o], u = a.length, f = i[o] = new Array(u), s, l = 0; l < u; ++l)
      (s = a[l]) && (f[l] = s);
    f.sort(e);
  }
  return new H(i, this._parents).order();
}
function qr(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Rr() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Pr() {
  return Array.from(this);
}
function Or() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var a = r[i];
      if (a)
        return a;
    }
  return null;
}
function Vr() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function Wr() {
  return !this.node();
}
function Br(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, a = i.length, u; o < a; ++o)
      (u = i[o]) && t.call(u, u.__data__, o, i);
  return this;
}
function Xr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Yr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Gr(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Ur(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Kr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Zr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Qr(t, e) {
  var n = Vt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Yr : Xr : typeof e == "function" ? n.local ? Zr : Kr : n.local ? Ur : Gr)(n, e));
}
function Je(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Jr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function jr(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function ti(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function ei(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Jr : typeof e == "function" ? ti : jr)(t, e, n ?? "")) : st(this.node(), t);
}
function st(t, e) {
  return t.style.getPropertyValue(e) || Je(t).getComputedStyle(t, null).getPropertyValue(e);
}
function ni(t) {
  return function() {
    delete this[t];
  };
}
function ri(t, e) {
  return function() {
    this[t] = e;
  };
}
function ii(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function oi(t, e) {
  return arguments.length > 1 ? this.each((e == null ? ni : typeof e == "function" ? ii : ri)(t, e)) : this.node()[t];
}
function je(t) {
  return t.trim().split(/^|\s+/);
}
function he(t) {
  return t.classList || new tn(t);
}
function tn(t) {
  this._node = t, this._names = je(t.getAttribute("class") || "");
}
tn.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function en(t, e) {
  for (var n = he(t), r = -1, i = e.length; ++r < i; )
    n.add(e[r]);
}
function nn(t, e) {
  for (var n = he(t), r = -1, i = e.length; ++r < i; )
    n.remove(e[r]);
}
function ai(t) {
  return function() {
    en(this, t);
  };
}
function si(t) {
  return function() {
    nn(this, t);
  };
}
function ui(t, e) {
  return function() {
    (e.apply(this, arguments) ? en : nn)(this, t);
  };
}
function li(t, e) {
  var n = je(t + "");
  if (arguments.length < 2) {
    for (var r = he(this.node()), i = -1, o = n.length; ++i < o; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? ui : e ? ai : si)(n, e));
}
function ci() {
  this.textContent = "";
}
function fi(t) {
  return function() {
    this.textContent = t;
  };
}
function hi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function di(t) {
  return arguments.length ? this.each(t == null ? ci : (typeof t == "function" ? hi : fi)(t)) : this.node().textContent;
}
function pi() {
  this.innerHTML = "";
}
function gi(t) {
  return function() {
    this.innerHTML = t;
  };
}
function yi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function mi(t) {
  return arguments.length ? this.each(t == null ? pi : (typeof t == "function" ? yi : gi)(t)) : this.node().innerHTML;
}
function xi() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function _i() {
  return this.each(xi);
}
function wi() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function vi() {
  return this.each(wi);
}
function bi(t) {
  var e = typeof t == "function" ? t : Ye(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function ki() {
  return null;
}
function Ni(t, e) {
  var n = typeof t == "function" ? t : Ye(t), r = e == null ? ki : typeof e == "function" ? e : fe(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function $i() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function zi() {
  return this.each($i);
}
function Ai() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Si() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ei(t) {
  return this.select(t ? Si : Ai);
}
function Mi(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Ti(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Ci(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Ii(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Li(t, e, n) {
  return function() {
    var r = this.__on, i, o = Ti(e);
    if (r) {
      for (var a = 0, u = r.length; a < u; ++a)
        if ((i = r[a]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), i = { type: t.type, name: t.name, value: e, listener: o, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function Hi(t, e, n) {
  var r = Ci(t + ""), i, o = r.length, a;
  if (arguments.length < 2) {
    var u = this.node().__on;
    if (u) {
      for (var f = 0, s = u.length, l; f < s; ++f)
        for (i = 0, l = u[f]; i < o; ++i)
          if ((a = r[i]).type === l.type && a.name === l.name)
            return l.value;
    }
    return;
  }
  for (u = e ? Li : Ii, i = 0; i < o; ++i)
    this.each(u(r[i], e, n));
  return this;
}
function rn(t, e, n) {
  var r = Je(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Di(t, e) {
  return function() {
    return rn(this, t, e);
  };
}
function Fi(t, e) {
  return function() {
    return rn(this, t, e.apply(this, arguments));
  };
}
function qi(t, e) {
  return this.each((typeof e == "function" ? Fi : Di)(t, e));
}
function* Ri() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, a; i < o; ++i)
      (a = r[i]) && (yield a);
}
var de = [null];
function H(t, e) {
  this._groups = t, this._parents = e;
}
function _t() {
  return new H([[document.documentElement]], de);
}
function Pi() {
  return this;
}
H.prototype = _t.prototype = {
  constructor: H,
  select: dr,
  selectAll: yr,
  selectChild: wr,
  selectChildren: Nr,
  filter: $r,
  data: Tr,
  enter: zr,
  exit: Ir,
  join: Lr,
  merge: Hr,
  selection: Pi,
  order: Dr,
  sort: Fr,
  call: Rr,
  nodes: Pr,
  node: Or,
  size: Vr,
  empty: Wr,
  each: Br,
  attr: Qr,
  style: ei,
  property: oi,
  classed: li,
  text: di,
  html: mi,
  raise: _i,
  lower: vi,
  append: bi,
  insert: Ni,
  remove: zi,
  clone: Ei,
  datum: Mi,
  on: Hi,
  dispatch: qi,
  [Symbol.iterator]: Ri
};
function R(t) {
  return typeof t == "string" ? new H([[document.querySelector(t)]], [document.documentElement]) : new H([[t]], de);
}
function Oi(t) {
  let e;
  for (; e = t.sourceEvent; )
    t = e;
  return t;
}
function j(t, e) {
  if (t = Oi(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(e.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
function Vi(t) {
  return typeof t == "string" ? new H([document.querySelectorAll(t)], [document.documentElement]) : new H([Ge(t)], de);
}
var Wi = { value: () => {
} };
function pe() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Tt(n);
}
function Tt(t) {
  this._ = t;
}
function Bi(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Tt.prototype = pe.prototype = {
  constructor: Tt,
  on: function(t, e) {
    var n = this._, r = Bi(t + "", n), i, o = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++o < a; )
        if ((i = (t = r[o]).type) && (i = Xi(n[i], t.name)))
          return i;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++o < a; )
      if (i = (t = r[o]).type)
        n[i] = Ne(n[i], t.name, e);
      else if (e == null)
        for (i in n)
          n[i] = Ne(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e)
      t[n] = e[n].slice();
    return new Tt(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0)
      for (var n = new Array(i), r = 0, i, o; r < i; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r)
      o[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(e, n);
  }
};
function Xi(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Ne(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Wi, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
const ne = { capture: !0, passive: !1 };
function re(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Yi(t) {
  var e = t.document.documentElement, n = R(t).on("dragstart.drag", re, ne);
  "onselectstart" in e ? n.on("selectstart.drag", re, ne) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Gi(t, e) {
  var n = t.document.documentElement, r = R(t).on("dragstart.drag", null);
  e && (r.on("click.drag", re, ne), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function ge(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function on(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e)
    n[r] = e[r];
  return n;
}
function wt() {
}
var gt = 0.7, Dt = 1 / gt, ot = "\\s*([+-]?\\d+)\\s*", yt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", W = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ui = /^#([0-9a-f]{3,8})$/, Ki = new RegExp(`^rgb\\(${ot},${ot},${ot}\\)$`), Zi = new RegExp(`^rgb\\(${W},${W},${W}\\)$`), Qi = new RegExp(`^rgba\\(${ot},${ot},${ot},${yt}\\)$`), Ji = new RegExp(`^rgba\\(${W},${W},${W},${yt}\\)$`), ji = new RegExp(`^hsl\\(${yt},${W},${W}\\)$`), to = new RegExp(`^hsla\\(${yt},${W},${W},${yt}\\)$`), $e = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
ge(wt, mt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ze,
  // Deprecated! Use color.formatHex.
  formatHex: ze,
  formatHex8: eo,
  formatHsl: no,
  formatRgb: Ae,
  toString: Ae
});
function ze() {
  return this.rgb().formatHex();
}
function eo() {
  return this.rgb().formatHex8();
}
function no() {
  return an(this).formatHsl();
}
function Ae() {
  return this.rgb().formatRgb();
}
function mt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Ui.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Se(e) : n === 3 ? new D(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? zt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? zt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Ki.exec(t)) ? new D(e[1], e[2], e[3], 1) : (e = Zi.exec(t)) ? new D(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Qi.exec(t)) ? zt(e[1], e[2], e[3], e[4]) : (e = Ji.exec(t)) ? zt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = ji.exec(t)) ? Te(e[1], e[2] / 100, e[3] / 100, 1) : (e = to.exec(t)) ? Te(e[1], e[2] / 100, e[3] / 100, e[4]) : $e.hasOwnProperty(t) ? Se($e[t]) : t === "transparent" ? new D(NaN, NaN, NaN, 0) : null;
}
function Se(t) {
  return new D(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function zt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new D(t, e, n, r);
}
function ro(t) {
  return t instanceof wt || (t = mt(t)), t ? (t = t.rgb(), new D(t.r, t.g, t.b, t.opacity)) : new D();
}
function ie(t, e, n, r) {
  return arguments.length === 1 ? ro(t) : new D(t, e, n, r ?? 1);
}
function D(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
ge(D, ie, on(wt, {
  brighter(t) {
    return t = t == null ? Dt : Math.pow(Dt, t), new D(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? gt : Math.pow(gt, t), new D(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new D(et(this.r), et(this.g), et(this.b), Ft(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ee,
  // Deprecated! Use color.formatHex.
  formatHex: Ee,
  formatHex8: io,
  formatRgb: Me,
  toString: Me
}));
function Ee() {
  return `#${tt(this.r)}${tt(this.g)}${tt(this.b)}`;
}
function io() {
  return `#${tt(this.r)}${tt(this.g)}${tt(this.b)}${tt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Me() {
  const t = Ft(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${et(this.r)}, ${et(this.g)}, ${et(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Ft(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function et(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function tt(t) {
  return t = et(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Te(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new P(t, e, n, r);
}
function an(t) {
  if (t instanceof P)
    return new P(t.h, t.s, t.l, t.opacity);
  if (t instanceof wt || (t = mt(t)), !t)
    return new P();
  if (t instanceof P)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), a = NaN, u = o - i, f = (o + i) / 2;
  return u ? (e === o ? a = (n - r) / u + (n < r) * 6 : n === o ? a = (r - e) / u + 2 : a = (e - n) / u + 4, u /= f < 0.5 ? o + i : 2 - o - i, a *= 60) : u = f > 0 && f < 1 ? 0 : a, new P(a, u, f, t.opacity);
}
function oo(t, e, n, r) {
  return arguments.length === 1 ? an(t) : new P(t, e, n, r ?? 1);
}
function P(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
ge(P, oo, on(wt, {
  brighter(t) {
    return t = t == null ? Dt : Math.pow(Dt, t), new P(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? gt : Math.pow(gt, t), new P(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new D(
      Zt(t >= 240 ? t - 240 : t + 120, i, r),
      Zt(t, i, r),
      Zt(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new P(Ce(this.h), At(this.s), At(this.l), Ft(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Ft(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Ce(this.h)}, ${At(this.s) * 100}%, ${At(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Ce(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function At(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Zt(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const sn = (t) => () => t;
function ao(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function so(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function uo(t) {
  return (t = +t) == 1 ? un : function(e, n) {
    return n - e ? so(e, n, t) : sn(isNaN(e) ? n : e);
  };
}
function un(t, e) {
  var n = e - t;
  return n ? ao(t, n) : sn(isNaN(t) ? e : t);
}
const Ie = function t(e) {
  var n = uo(e);
  function r(i, o) {
    var a = n((i = ie(i)).r, (o = ie(o)).r), u = n(i.g, o.g), f = n(i.b, o.b), s = un(i.opacity, o.opacity);
    return function(l) {
      return i.r = a(l), i.g = u(l), i.b = f(l), i.opacity = s(l), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Q(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var oe = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Qt = new RegExp(oe.source, "g");
function lo(t) {
  return function() {
    return t;
  };
}
function co(t) {
  return function(e) {
    return t(e) + "";
  };
}
function fo(t, e) {
  var n = oe.lastIndex = Qt.lastIndex = 0, r, i, o, a = -1, u = [], f = [];
  for (t = t + "", e = e + ""; (r = oe.exec(t)) && (i = Qt.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), u[a] ? u[a] += o : u[++a] = o), (r = r[0]) === (i = i[0]) ? u[a] ? u[a] += i : u[++a] = i : (u[++a] = null, f.push({ i: a, x: Q(r, i) })), n = Qt.lastIndex;
  return n < e.length && (o = e.slice(n), u[a] ? u[a] += o : u[++a] = o), u.length < 2 ? f[0] ? co(f[0].x) : lo(e) : (e = f.length, function(s) {
    for (var l = 0, d; l < e; ++l)
      u[(d = f[l]).i] = d.x(s);
    return u.join("");
  });
}
var Le = 180 / Math.PI, ae = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ln(t, e, n, r, i, o) {
  var a, u, f;
  return (a = Math.sqrt(t * t + e * e)) && (t /= a, e /= a), (f = t * n + e * r) && (n -= t * f, r -= e * f), (u = Math.sqrt(n * n + r * r)) && (n /= u, r /= u, f /= u), t * r < e * n && (t = -t, e = -e, f = -f, a = -a), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * Le,
    skewX: Math.atan(f) * Le,
    scaleX: a,
    scaleY: u
  };
}
var St;
function ho(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? ae : ln(e.a, e.b, e.c, e.d, e.e, e.f);
}
function po(t) {
  return t == null || (St || (St = document.createElementNS("http://www.w3.org/2000/svg", "g")), St.setAttribute("transform", t), !(t = St.transform.baseVal.consolidate())) ? ae : (t = t.matrix, ln(t.a, t.b, t.c, t.d, t.e, t.f));
}
function cn(t, e, n, r) {
  function i(s) {
    return s.length ? s.pop() + " " : "";
  }
  function o(s, l, d, c, p, m) {
    if (s !== d || l !== c) {
      var x = p.push("translate(", null, e, null, n);
      m.push({ i: x - 4, x: Q(s, d) }, { i: x - 2, x: Q(l, c) });
    } else
      (d || c) && p.push("translate(" + d + e + c + n);
  }
  function a(s, l, d, c) {
    s !== l ? (s - l > 180 ? l += 360 : l - s > 180 && (s += 360), c.push({ i: d.push(i(d) + "rotate(", null, r) - 2, x: Q(s, l) })) : l && d.push(i(d) + "rotate(" + l + r);
  }
  function u(s, l, d, c) {
    s !== l ? c.push({ i: d.push(i(d) + "skewX(", null, r) - 2, x: Q(s, l) }) : l && d.push(i(d) + "skewX(" + l + r);
  }
  function f(s, l, d, c, p, m) {
    if (s !== d || l !== c) {
      var x = p.push(i(p) + "scale(", null, ",", null, ")");
      m.push({ i: x - 4, x: Q(s, d) }, { i: x - 2, x: Q(l, c) });
    } else
      (d !== 1 || c !== 1) && p.push(i(p) + "scale(" + d + "," + c + ")");
  }
  return function(s, l) {
    var d = [], c = [];
    return s = t(s), l = t(l), o(s.translateX, s.translateY, l.translateX, l.translateY, d, c), a(s.rotate, l.rotate, d, c), u(s.skewX, l.skewX, d, c), f(s.scaleX, s.scaleY, l.scaleX, l.scaleY, d, c), s = l = null, function(p) {
      for (var m = -1, x = c.length, _; ++m < x; )
        d[(_ = c[m]).i] = _.x(p);
      return d.join("");
    };
  };
}
var go = cn(ho, "px, ", "px)", "deg)"), yo = cn(po, ", ", ")", ")"), mo = 1e-12;
function He(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function xo(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function _o(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const wo = function t(e, n, r) {
  function i(o, a) {
    var u = o[0], f = o[1], s = o[2], l = a[0], d = a[1], c = a[2], p = l - u, m = d - f, x = p * p + m * m, _, y;
    if (x < mo)
      y = Math.log(c / s) / e, _ = function(Z) {
        return [
          u + Z * p,
          f + Z * m,
          s * Math.exp(e * Z * y)
        ];
      };
    else {
      var w = Math.sqrt(x), A = (c * c - s * s + r * x) / (2 * s * n * w), z = (c * c - s * s - r * x) / (2 * c * n * w), E = Math.log(Math.sqrt(A * A + 1) - A), C = Math.log(Math.sqrt(z * z + 1) - z);
      y = (C - E) / e, _ = function(Z) {
        var kt = Z * y, Nt = He(E), $t = s / (n * w) * (Nt * _o(e * kt + E) - xo(E));
        return [
          u + $t * p,
          f + $t * m,
          s * Nt / He(e * kt + E)
        ];
      };
    }
    return _.duration = y * 1e3 * e / Math.SQRT2, _;
  }
  return i.rho = function(o) {
    var a = Math.max(1e-3, +o), u = a * a, f = u * u;
    return t(a, u, f);
  }, i;
}(Math.SQRT2, 2, 4);
var ut = 0, dt = 0, ft = 0, fn = 1e3, qt, pt, Rt = 0, nt = 0, Wt = 0, xt = typeof performance == "object" && performance.now ? performance : Date, hn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function ye() {
  return nt || (hn(vo), nt = xt.now() + Wt);
}
function vo() {
  nt = 0;
}
function Pt() {
  this._call = this._time = this._next = null;
}
Pt.prototype = dn.prototype = {
  constructor: Pt,
  restart: function(t, e, n) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? ye() : +n) + (e == null ? 0 : +e), !this._next && pt !== this && (pt ? pt._next = this : qt = this, pt = this), this._call = t, this._time = n, se();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, se());
  }
};
function dn(t, e, n) {
  var r = new Pt();
  return r.restart(t, e, n), r;
}
function bo() {
  ye(), ++ut;
  for (var t = qt, e; t; )
    (e = nt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --ut;
}
function De() {
  nt = (Rt = xt.now()) + Wt, ut = dt = 0;
  try {
    bo();
  } finally {
    ut = 0, No(), nt = 0;
  }
}
function ko() {
  var t = xt.now(), e = t - Rt;
  e > fn && (Wt -= e, Rt = t);
}
function No() {
  for (var t, e = qt, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : qt = n);
  pt = t, se(r);
}
function se(t) {
  if (!ut) {
    dt && (dt = clearTimeout(dt));
    var e = t - nt;
    e > 24 ? (t < 1 / 0 && (dt = setTimeout(De, t - xt.now() - Wt)), ft && (ft = clearInterval(ft))) : (ft || (Rt = xt.now(), ft = setInterval(ko, fn)), ut = 1, hn(De));
  }
}
function Fe(t, e, n) {
  var r = new Pt();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var $o = pe("start", "end", "cancel", "interrupt"), zo = [], pn = 0, qe = 1, ue = 2, Ct = 3, Re = 4, le = 5, It = 6;
function Bt(t, e, n, r, i, o) {
  var a = t.__transition;
  if (!a)
    t.__transition = {};
  else if (n in a)
    return;
  Ao(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: $o,
    tween: zo,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: pn
  });
}
function me(t, e) {
  var n = O(t, e);
  if (n.state > pn)
    throw new Error("too late; already scheduled");
  return n;
}
function B(t, e) {
  var n = O(t, e);
  if (n.state > Ct)
    throw new Error("too late; already running");
  return n;
}
function O(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function Ao(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = dn(o, 0, n.time);
  function o(s) {
    n.state = qe, n.timer.restart(a, n.delay, n.time), n.delay <= s && a(s - n.delay);
  }
  function a(s) {
    var l, d, c, p;
    if (n.state !== qe)
      return f();
    for (l in r)
      if (p = r[l], p.name === n.name) {
        if (p.state === Ct)
          return Fe(a);
        p.state === Re ? (p.state = It, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[l]) : +l < e && (p.state = It, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[l]);
      }
    if (Fe(function() {
      n.state === Ct && (n.state = Re, n.timer.restart(u, n.delay, n.time), u(s));
    }), n.state = ue, n.on.call("start", t, t.__data__, n.index, n.group), n.state === ue) {
      for (n.state = Ct, i = new Array(c = n.tween.length), l = 0, d = -1; l < c; ++l)
        (p = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++d] = p);
      i.length = d + 1;
    }
  }
  function u(s) {
    for (var l = s < n.duration ? n.ease.call(null, s / n.duration) : (n.timer.restart(f), n.state = le, 1), d = -1, c = i.length; ++d < c; )
      i[d].call(t, l);
    n.state === le && (n.on.call("end", t, t.__data__, n.index, n.group), f());
  }
  function f() {
    n.state = It, n.timer.stop(), delete r[e];
    for (var s in r)
      return;
    delete t.__transition;
  }
}
function Lt(t, e) {
  var n = t.__transition, r, i, o = !0, a;
  if (n) {
    e = e == null ? null : e + "";
    for (a in n) {
      if ((r = n[a]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > ue && r.state < le, r.state = It, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[a];
    }
    o && delete t.__transition;
  }
}
function So(t) {
  return this.each(function() {
    Lt(this, t);
  });
}
function Eo(t, e) {
  var n, r;
  return function() {
    var i = B(this, t), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var a = 0, u = r.length; a < u; ++a)
        if (r[a].name === e) {
          r = r.slice(), r.splice(a, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Mo(t, e, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var o = B(this, t), a = o.tween;
    if (a !== r) {
      i = (r = a).slice();
      for (var u = { name: e, value: n }, f = 0, s = i.length; f < s; ++f)
        if (i[f].name === e) {
          i[f] = u;
          break;
        }
      f === s && i.push(u);
    }
    o.tween = i;
  };
}
function To(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = O(this.node(), n).tween, i = 0, o = r.length, a; i < o; ++i)
      if ((a = r[i]).name === t)
        return a.value;
    return null;
  }
  return this.each((e == null ? Eo : Mo)(n, t, e));
}
function xe(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = B(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return O(i, r).value[e];
  };
}
function gn(t, e) {
  var n;
  return (typeof e == "number" ? Q : e instanceof mt ? Ie : (n = mt(e)) ? (e = n, Ie) : fo)(t, e);
}
function Co(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Io(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Lo(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttribute(t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Ho(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttributeNS(t.space, t.local);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Do(t, e, n) {
  var r, i, o;
  return function() {
    var a, u = n(this), f;
    return u == null ? void this.removeAttribute(t) : (a = this.getAttribute(t), f = u + "", a === f ? null : a === r && f === i ? o : (i = f, o = e(r = a, u)));
  };
}
function Fo(t, e, n) {
  var r, i, o;
  return function() {
    var a, u = n(this), f;
    return u == null ? void this.removeAttributeNS(t.space, t.local) : (a = this.getAttributeNS(t.space, t.local), f = u + "", a === f ? null : a === r && f === i ? o : (i = f, o = e(r = a, u)));
  };
}
function qo(t, e) {
  var n = Vt(t), r = n === "transform" ? yo : gn;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Fo : Do)(n, r, xe(this, "attr." + t, e)) : e == null ? (n.local ? Io : Co)(n) : (n.local ? Ho : Lo)(n, r, e));
}
function Ro(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Po(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Oo(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Po(t, o)), n;
  }
  return i._value = e, i;
}
function Vo(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Ro(t, o)), n;
  }
  return i._value = e, i;
}
function Wo(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (e == null)
    return this.tween(n, null);
  if (typeof e != "function")
    throw new Error();
  var r = Vt(t);
  return this.tween(n, (r.local ? Oo : Vo)(r, e));
}
function Bo(t, e) {
  return function() {
    me(this, t).delay = +e.apply(this, arguments);
  };
}
function Xo(t, e) {
  return e = +e, function() {
    me(this, t).delay = e;
  };
}
function Yo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Bo : Xo)(e, t)) : O(this.node(), e).delay;
}
function Go(t, e) {
  return function() {
    B(this, t).duration = +e.apply(this, arguments);
  };
}
function Uo(t, e) {
  return e = +e, function() {
    B(this, t).duration = e;
  };
}
function Ko(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Go : Uo)(e, t)) : O(this.node(), e).duration;
}
function Zo(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    B(this, t).ease = e;
  };
}
function Qo(t) {
  var e = this._id;
  return arguments.length ? this.each(Zo(e, t)) : O(this.node(), e).ease;
}
function Jo(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    B(this, t).ease = n;
  };
}
function jo(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(Jo(this._id, t));
}
function ta(t) {
  typeof t != "function" && (t = Ke(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, u = r[i] = [], f, s = 0; s < a; ++s)
      (f = o[s]) && t.call(f, f.__data__, s, o) && u.push(f);
  return new K(r, this._parents, this._name, this._id);
}
function ea(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), a = new Array(r), u = 0; u < o; ++u)
    for (var f = e[u], s = n[u], l = f.length, d = a[u] = new Array(l), c, p = 0; p < l; ++p)
      (c = f[p] || s[p]) && (d[p] = c);
  for (; u < r; ++u)
    a[u] = e[u];
  return new K(a, this._parents, this._name, this._id);
}
function na(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function ra(t, e, n) {
  var r, i, o = na(e) ? me : B;
  return function() {
    var a = o(this, t), u = a.on;
    u !== r && (i = (r = u).copy()).on(e, n), a.on = i;
  };
}
function ia(t, e) {
  var n = this._id;
  return arguments.length < 2 ? O(this.node(), n).on.on(t) : this.each(ra(n, t, e));
}
function oa(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition)
      if (+n !== t)
        return;
    e && e.removeChild(this);
  };
}
function aa() {
  return this.on("end.remove", oa(this._id));
}
function sa(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = fe(t));
  for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
    for (var u = r[a], f = u.length, s = o[a] = new Array(f), l, d, c = 0; c < f; ++c)
      (l = u[c]) && (d = t.call(l, l.__data__, c, u)) && ("__data__" in l && (d.__data__ = l.__data__), s[c] = d, Bt(s[c], e, n, c, s, O(l, n)));
  return new K(o, this._parents, e, n);
}
function ua(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ue(t));
  for (var r = this._groups, i = r.length, o = [], a = [], u = 0; u < i; ++u)
    for (var f = r[u], s = f.length, l, d = 0; d < s; ++d)
      if (l = f[d]) {
        for (var c = t.call(l, l.__data__, d, f), p, m = O(l, n), x = 0, _ = c.length; x < _; ++x)
          (p = c[x]) && Bt(p, e, n, x, c, m);
        o.push(c), a.push(l);
      }
  return new K(o, a, e, n);
}
var la = _t.prototype.constructor;
function ca() {
  return new la(this._groups, this._parents);
}
function fa(t, e) {
  var n, r, i;
  return function() {
    var o = st(this, t), a = (this.style.removeProperty(t), st(this, t));
    return o === a ? null : o === n && a === r ? i : i = e(n = o, r = a);
  };
}
function yn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ha(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = st(this, t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function da(t, e, n) {
  var r, i, o;
  return function() {
    var a = st(this, t), u = n(this), f = u + "";
    return u == null && (f = u = (this.style.removeProperty(t), st(this, t))), a === f ? null : a === r && f === i ? o : (i = f, o = e(r = a, u));
  };
}
function pa(t, e) {
  var n, r, i, o = "style." + e, a = "end." + o, u;
  return function() {
    var f = B(this, t), s = f.on, l = f.value[o] == null ? u || (u = yn(e)) : void 0;
    (s !== n || i !== l) && (r = (n = s).copy()).on(a, i = l), f.on = r;
  };
}
function ga(t, e, n) {
  var r = (t += "") == "transform" ? go : gn;
  return e == null ? this.styleTween(t, fa(t, r)).on("end.style." + t, yn(t)) : typeof e == "function" ? this.styleTween(t, da(t, r, xe(this, "style." + t, e))).each(pa(this._id, t)) : this.styleTween(t, ha(t, r, e), n).on("end.style." + t, null);
}
function ya(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function ma(t, e, n) {
  var r, i;
  function o() {
    var a = e.apply(this, arguments);
    return a !== i && (r = (i = a) && ya(t, a, n)), r;
  }
  return o._value = e, o;
}
function xa(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, ma(t, e, n ?? ""));
}
function _a(t) {
  return function() {
    this.textContent = t;
  };
}
function wa(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function va(t) {
  return this.tween("text", typeof t == "function" ? wa(xe(this, "text", t)) : _a(t == null ? "" : t + ""));
}
function ba(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function ka(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && ba(i)), e;
  }
  return r._value = t, r;
}
function Na(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, ka(t));
}
function $a() {
  for (var t = this._name, e = this._id, n = mn(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], u = a.length, f, s = 0; s < u; ++s)
      if (f = a[s]) {
        var l = O(f, e);
        Bt(f, t, n, s, a, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new K(r, this._parents, t, n);
}
function za() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, a) {
    var u = { value: a }, f = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var s = B(this, r), l = s.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(u), e._.interrupt.push(u), e._.end.push(f)), s.on = e;
    }), i === 0 && o();
  });
}
var Aa = 0;
function K(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function mn() {
  return ++Aa;
}
var G = _t.prototype;
K.prototype = {
  constructor: K,
  select: sa,
  selectAll: ua,
  selectChild: G.selectChild,
  selectChildren: G.selectChildren,
  filter: ta,
  merge: ea,
  selection: ca,
  transition: $a,
  call: G.call,
  nodes: G.nodes,
  node: G.node,
  size: G.size,
  empty: G.empty,
  each: G.each,
  on: ia,
  attr: qo,
  attrTween: Wo,
  style: ga,
  styleTween: xa,
  text: va,
  textTween: Na,
  remove: aa,
  tween: To,
  delay: Yo,
  duration: Ko,
  ease: Qo,
  easeVarying: jo,
  end: za,
  [Symbol.iterator]: G[Symbol.iterator]
};
function Sa(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ea = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Sa
};
function Ma(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Ta(t) {
  var e, n;
  t instanceof K ? (e = t._id, t = t._name) : (e = mn(), (n = Ea).time = ye(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], u = a.length, f, s = 0; s < u; ++s)
      (f = a[s]) && Bt(f, t, e, s, a, n || Ma(f, e));
  return new K(r, this._parents, t, e);
}
_t.prototype.interrupt = So;
_t.prototype.transition = Ta;
const Et = (t) => () => t;
function Ca(t, {
  sourceEvent: e,
  target: n,
  transform: r,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function U(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
U.prototype = {
  constructor: U,
  scale: function(t) {
    return t === 1 ? this : new U(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new U(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var xn = new U(1, 0, 0);
U.prototype;
function Jt(t) {
  t.stopImmediatePropagation();
}
function ht(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Ia(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function La() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Pe() {
  return this.__zoom || xn;
}
function Ha(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Da() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Fa(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], o = t.invertY(e[0][1]) - n[0][1], a = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)
  );
}
function qa() {
  var t = Ia, e = La, n = Fa, r = Ha, i = Da, o = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], u = 250, f = wo, s = pe("start", "zoom", "end"), l, d, c, p = 500, m = 150, x = 0, _ = 10;
  function y(h) {
    h.property("__zoom", Pe).on("wheel.zoom", kt, { passive: !1 }).on("mousedown.zoom", Nt).on("dblclick.zoom", $t).filter(i).on("touchstart.zoom", bn).on("touchmove.zoom", kn).on("touchend.zoom touchcancel.zoom", Nn).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(h, v, g, b) {
    var k = h.selection ? h.selection() : h;
    k.property("__zoom", Pe), h !== k ? E(h, v, g, b) : k.interrupt().each(function() {
      C(this, arguments).event(b).start().zoom(null, typeof v == "function" ? v.apply(this, arguments) : v).end();
    });
  }, y.scaleBy = function(h, v, g, b) {
    y.scaleTo(h, function() {
      var k = this.__zoom.k, N = typeof v == "function" ? v.apply(this, arguments) : v;
      return k * N;
    }, g, b);
  }, y.scaleTo = function(h, v, g, b) {
    y.transform(h, function() {
      var k = e.apply(this, arguments), N = this.__zoom, $ = g == null ? z(k) : typeof g == "function" ? g.apply(this, arguments) : g, S = N.invert($), M = typeof v == "function" ? v.apply(this, arguments) : v;
      return n(A(w(N, M), $, S), k, a);
    }, g, b);
  }, y.translateBy = function(h, v, g, b) {
    y.transform(h, function() {
      return n(this.__zoom.translate(
        typeof v == "function" ? v.apply(this, arguments) : v,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), e.apply(this, arguments), a);
    }, null, b);
  }, y.translateTo = function(h, v, g, b, k) {
    y.transform(h, function() {
      var N = e.apply(this, arguments), $ = this.__zoom, S = b == null ? z(N) : typeof b == "function" ? b.apply(this, arguments) : b;
      return n(xn.translate(S[0], S[1]).scale($.k).translate(
        typeof v == "function" ? -v.apply(this, arguments) : -v,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), N, a);
    }, b, k);
  };
  function w(h, v) {
    return v = Math.max(o[0], Math.min(o[1], v)), v === h.k ? h : new U(v, h.x, h.y);
  }
  function A(h, v, g) {
    var b = v[0] - g[0] * h.k, k = v[1] - g[1] * h.k;
    return b === h.x && k === h.y ? h : new U(h.k, b, k);
  }
  function z(h) {
    return [(+h[0][0] + +h[1][0]) / 2, (+h[0][1] + +h[1][1]) / 2];
  }
  function E(h, v, g, b) {
    h.on("start.zoom", function() {
      C(this, arguments).event(b).start();
    }).on("interrupt.zoom end.zoom", function() {
      C(this, arguments).event(b).end();
    }).tween("zoom", function() {
      var k = this, N = arguments, $ = C(k, N).event(b), S = e.apply(k, N), M = g == null ? z(S) : typeof g == "function" ? g.apply(k, N) : g, V = Math.max(S[1][0] - S[0][0], S[1][1] - S[0][1]), L = k.__zoom, F = typeof v == "function" ? v.apply(k, N) : v, X = f(L.invert(M).concat(V / L.k), F.invert(M).concat(V / F.k));
      return function(q) {
        if (q === 1)
          q = F;
        else {
          var Y = X(q), Xt = V / Y[2];
          q = new U(Xt, M[0] - Y[0] * Xt, M[1] - Y[1] * Xt);
        }
        $.zoom(null, q);
      };
    });
  }
  function C(h, v, g) {
    return !g && h.__zooming || new Z(h, v);
  }
  function Z(h, v) {
    this.that = h, this.args = v, this.active = 0, this.sourceEvent = null, this.extent = e.apply(h, v), this.taps = 0;
  }
  Z.prototype = {
    event: function(h) {
      return h && (this.sourceEvent = h), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(h, v) {
      return this.mouse && h !== "mouse" && (this.mouse[1] = v.invert(this.mouse[0])), this.touch0 && h !== "touch" && (this.touch0[1] = v.invert(this.touch0[0])), this.touch1 && h !== "touch" && (this.touch1[1] = v.invert(this.touch1[0])), this.that.__zoom = v, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(h) {
      var v = R(this.that).datum();
      s.call(
        h,
        this.that,
        new Ca(h, {
          sourceEvent: this.sourceEvent,
          target: y,
          transform: this.that.__zoom,
          dispatch: s
        }),
        v
      );
    }
  };
  function kt(h, ...v) {
    if (!t.apply(this, arguments))
      return;
    var g = C(this, v).event(h), b = this.__zoom, k = Math.max(o[0], Math.min(o[1], b.k * Math.pow(2, r.apply(this, arguments)))), N = j(h);
    if (g.wheel)
      (g.mouse[0][0] !== N[0] || g.mouse[0][1] !== N[1]) && (g.mouse[1] = b.invert(g.mouse[0] = N)), clearTimeout(g.wheel);
    else {
      if (b.k === k)
        return;
      g.mouse = [N, b.invert(N)], Lt(this), g.start();
    }
    ht(h), g.wheel = setTimeout($, m), g.zoom("mouse", n(A(w(b, k), g.mouse[0], g.mouse[1]), g.extent, a));
    function $() {
      g.wheel = null, g.end();
    }
  }
  function Nt(h, ...v) {
    if (c || !t.apply(this, arguments))
      return;
    var g = h.currentTarget, b = C(this, v, !0).event(h), k = R(h.view).on("mousemove.zoom", M, !0).on("mouseup.zoom", V, !0), N = j(h, g), $ = h.clientX, S = h.clientY;
    Yi(h.view), Jt(h), b.mouse = [N, this.__zoom.invert(N)], Lt(this), b.start();
    function M(L) {
      if (ht(L), !b.moved) {
        var F = L.clientX - $, X = L.clientY - S;
        b.moved = F * F + X * X > x;
      }
      b.event(L).zoom("mouse", n(A(b.that.__zoom, b.mouse[0] = j(L, g), b.mouse[1]), b.extent, a));
    }
    function V(L) {
      k.on("mousemove.zoom mouseup.zoom", null), Gi(L.view, b.moved), ht(L), b.event(L).end();
    }
  }
  function $t(h, ...v) {
    if (t.apply(this, arguments)) {
      var g = this.__zoom, b = j(h.changedTouches ? h.changedTouches[0] : h, this), k = g.invert(b), N = g.k * (h.shiftKey ? 0.5 : 2), $ = n(A(w(g, N), b, k), e.apply(this, v), a);
      ht(h), u > 0 ? R(this).transition().duration(u).call(E, $, b, h) : R(this).call(y.transform, $, b, h);
    }
  }
  function bn(h, ...v) {
    if (t.apply(this, arguments)) {
      var g = h.touches, b = g.length, k = C(this, v, h.changedTouches.length === b).event(h), N, $, S, M;
      for (Jt(h), $ = 0; $ < b; ++$)
        S = g[$], M = j(S, this), M = [M, this.__zoom.invert(M), S.identifier], k.touch0 ? !k.touch1 && k.touch0[2] !== M[2] && (k.touch1 = M, k.taps = 0) : (k.touch0 = M, N = !0, k.taps = 1 + !!l);
      l && (l = clearTimeout(l)), N && (k.taps < 2 && (d = M[0], l = setTimeout(function() {
        l = null;
      }, p)), Lt(this), k.start());
    }
  }
  function kn(h, ...v) {
    if (this.__zooming) {
      var g = C(this, v).event(h), b = h.changedTouches, k = b.length, N, $, S, M;
      for (ht(h), N = 0; N < k; ++N)
        $ = b[N], S = j($, this), g.touch0 && g.touch0[2] === $.identifier ? g.touch0[0] = S : g.touch1 && g.touch1[2] === $.identifier && (g.touch1[0] = S);
      if ($ = g.that.__zoom, g.touch1) {
        var V = g.touch0[0], L = g.touch0[1], F = g.touch1[0], X = g.touch1[1], q = (q = F[0] - V[0]) * q + (q = F[1] - V[1]) * q, Y = (Y = X[0] - L[0]) * Y + (Y = X[1] - L[1]) * Y;
        $ = w($, Math.sqrt(q / Y)), S = [(V[0] + F[0]) / 2, (V[1] + F[1]) / 2], M = [(L[0] + X[0]) / 2, (L[1] + X[1]) / 2];
      } else if (g.touch0)
        S = g.touch0[0], M = g.touch0[1];
      else
        return;
      g.zoom("touch", n(A($, S, M), g.extent, a));
    }
  }
  function Nn(h, ...v) {
    if (this.__zooming) {
      var g = C(this, v).event(h), b = h.changedTouches, k = b.length, N, $;
      for (Jt(h), c && clearTimeout(c), c = setTimeout(function() {
        c = null;
      }, p), N = 0; N < k; ++N)
        $ = b[N], g.touch0 && g.touch0[2] === $.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === $.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0)
        g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && ($ = j($, this), Math.hypot(d[0] - $[0], d[1] - $[1]) < _)) {
        var S = R(this).on("dblclick.zoom");
        S && S.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : Et(+h), y) : r;
  }, y.filter = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : Et(!!h), y) : t;
  }, y.touchable = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : Et(!!h), y) : i;
  }, y.extent = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : Et([[+h[0][0], +h[0][1]], [+h[1][0], +h[1][1]]]), y) : e;
  }, y.scaleExtent = function(h) {
    return arguments.length ? (o[0] = +h[0], o[1] = +h[1], y) : [o[0], o[1]];
  }, y.translateExtent = function(h) {
    return arguments.length ? (a[0][0] = +h[0][0], a[1][0] = +h[1][0], a[0][1] = +h[0][1], a[1][1] = +h[1][1], y) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, y.constrain = function(h) {
    return arguments.length ? (n = h, y) : n;
  }, y.duration = function(h) {
    return arguments.length ? (u = +h, y) : u;
  }, y.interpolate = function(h) {
    return arguments.length ? (f = h, y) : f;
  }, y.on = function() {
    var h = s.on.apply(s, arguments);
    return h === s ? y : h;
  }, y.clickDistance = function(h) {
    return arguments.length ? (x = (h = +h) * h, y) : Math.sqrt(x);
  }, y.tapDistance = function(h) {
    return arguments.length ? (_ = +h, y) : _;
  }, y;
}
const J = {
  hierarchy: ce,
  stratify: Qn,
  tree: ir,
  treemap: lr,
  select: R,
  selectAll: Vi,
  zoom: qa
}, _n = (t) => {
  const e = document.querySelector(`#${t}`);
  if (e === null)
    throw new Error(`Cannot find dom element with id:${t}`);
  const n = e.clientWidth, r = e.clientHeight;
  if (r === 0 || n === 0)
    throw new Error(
      "The tree can't be display because the svg height or width of the container is null"
    );
  return { areaWidth: n, areaHeight: r };
}, vt = (t, e, n) => {
  try {
    const r = t.find((a) => a.id === n), i = r.ancestors()[1].id;
    return e.some(
      (a) => a.id === i
    ) ? r.ancestors()[1] : vt(t, e, i);
  } catch {
    return t.find((i) => i.id === n);
  }
}, wn = (t, e, n) => n.isHorizontal ? "translate(" + e + "," + t + ")" : "translate(" + t + "," + e + ")";
class it {
  // Adds one refresh action to the queue. When safe callback will be
  // triggered
  static add(e, n) {
    this.queue.push({
      delayNextCallback: e + this.extraDelayBetweenCallbacks,
      callback: n
    }), this.log(
      this.queue.map((r) => r.delayNextCallback),
      "<-- New task !!!"
    ), this.runner || (this.runnerFunction(), this.runner = setInterval(() => this.runnerFunction(), this.runnerSpeed));
  }
  // Each this.runnerSpeed milliseconds it's executed. It stops when finish.
  static runnerFunction() {
    if (this.queue[0]) {
      if (this.queue[0].callback) {
        this.log("Executing task, delaying next task...");
        try {
          this.queue[0].callback();
        } catch (e) {
          console.error(e);
        } finally {
          this.queue[0].callback = null;
        }
      }
      this.queue[0].delayNextCallback -= this.runnerSpeed, this.log(this.queue.map((e) => e.delayNextCallback)), this.queue[0].delayNextCallback <= 0 && this.queue.shift();
    } else
      this.log("No task found"), clearInterval(this.runner), this.runner = 0;
  }
  // Print to console debug data if this.showQueueLog = true
  static log(...e) {
    this.showQueueLog && console.log(...e);
  }
}
// The queue is an array that contains objects. Each object represents an
// refresh action and only they have 2 properties:
// {
//     callback:          triggers when it's the first of queue and then it
//                        becomes null to prevent that callback executes more
//                        than once.
//     delayNextCallback: when callback is executed, queue will subtracts
//                        milliseconds from it. When it becomes 0, the entire
//                        object is destroyed (shifted) from the array and then
//                        the next item (if exists) will be executed similary
//                        to this.
// }
rt(it, "queue", []), // Contains setInterval ID
rt(it, "runner"), // Milliseconds of each iteration
rt(it, "runnerSpeed", 100), // Developer internal magic number. Time added at end of refresh transition to
// let DOM and d3 rest before another refresh.
// 0 creates console and visual errors because getFirstDisplayedAncestor never
// found the needed id and setNodeLocation receives undefined parameters.
// Between 50 and 100 milliseconds seems enough for 10 nodes (demo example)
rt(it, "extraDelayBetweenCallbacks", 100), // Developer internal for debugging RefreshQueue class. Set true to see
// console "real time" queue of tasks.
// If there is a cleaner method, remove it!
rt(it, "showQueueLog", !1);
const Ra = (t) => {
  const {
    htmlId: e,
    isHorizontal: n,
    hasPan: r,
    hasZoom: i,
    mainAxisNodeSpacing: o,
    nodeHeight: a,
    nodeWidth: u,
    marginBottom: f,
    marginLeft: s,
    marginRight: l,
    marginTop: d
  } = t, c = {
    top: d,
    right: l,
    bottom: f,
    left: s
  }, { areaHeight: p, areaWidth: m } = _n(t.htmlId), x = m - c.left - c.right, _ = p - c.top - c.bottom, y = J.select("#" + e).append("svg").attr("width", m).attr("height", p), w = y.append("g"), A = J.zoom().on("zoom", (E) => {
    w.attr("transform", () => E.transform);
  });
  return y.call(A), r || y.on("mousedown.zoom", null).on("touchstart.zoom", null).on("touchmove.zoom", null).on("touchend.zoom", null), i || y.on("wheel.zoom", null).on("mousewheel.zoom", null).on("mousemove.zoom", null).on("DOMMouseScroll.zoom", null).on("dblclick.zoom", null), w.append("g").attr(
    "transform",
    o === "auto" ? "translate(0,0)" : n ? "translate(" + c.left + "," + (c.top + _ / 2 - a / 2) + ")" : "translate(" + (c.left + x / 2 - u / 2) + "," + c.top + ")"
  );
}, _e = (t, e, n) => {
  const { isHorizontal: r, nodeHeight: i, nodeWidth: o, linkShape: a } = n;
  return a === "orthogonal" ? r ? `M ${t.y} ${t.x + i / 2}
        L ${(t.y + e.y + o) / 2} ${t.x + i / 2}
        L  ${(t.y + e.y + o) / 2} ${e.x + i / 2}
          ${e.y + o} ${e.x + i / 2}` : `M ${t.x + o / 2} ${t.y}
        L ${t.x + o / 2} ${(t.y + e.y + i) / 2}
        L  ${e.x + o / 2} ${(t.y + e.y + i) / 2}
          ${e.x + o / 2} ${e.y + i} ` : a === "curve" ? r ? `M ${t.y} ${t.x + i / 2}
      L ${t.y - (t.y - e.y - o) / 2 + 15} ${t.x + i / 2}
      Q${t.y - (t.y - e.y - o) / 2} ${t.x + i / 2}
       ${t.y - (t.y - e.y - o) / 2} ${t.x + i / 2 - Oe(t.x, e.x, 15)}
      L ${t.y - (t.y - e.y - o) / 2} ${e.x + i / 2}
      L ${e.y + o} ${e.x + i / 2}` : `M ${t.x + o / 2} ${t.y}
      L ${t.x + o / 2} ${t.y - (t.y - e.y - i) / 2 + 15}
      Q${t.x + o / 2} ${t.y - (t.y - e.y - i) / 2}
      ${t.x + o / 2 - Oe(t.x, e.x, 15)} ${t.y - (t.y - e.y - i) / 2}
      L ${e.x + o / 2} ${t.y - (t.y - e.y - i) / 2} 
      L ${e.x + o / 2} ${e.y + i} ` : r ? `M ${t.y} ${t.x + i / 2}
        C ${(t.y + e.y + o) / 2} ${t.x + i / 2}
          ${(t.y + e.y + o) / 2} ${e.x + i / 2}
          ${e.y + o} ${e.x + i / 2}` : `M ${t.x + o / 2} ${t.y}
        C ${t.x + o / 2} ${(t.y + e.y + i) / 2}
          ${e.x + o / 2} ${(t.y + e.y + i) / 2}
          ${e.x + o / 2} ${e.y + i} `;
}, Oe = (t, e, n) => t > e ? n : t < e ? -n : 0, Pa = (t, e, n, r) => t.enter().insert("path", "g").attr("class", "link").attr("d", (i) => {
  const o = vt(
    n,
    r,
    i.id
  ), a = {
    x: o.x0,
    y: o.y0
  };
  return _e(a, a, e);
}).attr("fill", "none").attr(
  "stroke-width",
  (i) => e.linkWidth(i)
  // Pass the correct `d` object to linkWidth
).attr(
  "stroke",
  (i) => e.linkColor(i)
  // Pass the correct `d` object to linkColor
), Oa = (t, e, n, r) => {
  t.exit().transition().duration(e.duration).style("opacity", 0).attr("d", (i) => {
    const o = vt(
      r,
      n,
      i.id
    ), a = {
      x: o.x0,
      y: o.y0
    };
    return _e(a, a, e);
  }).remove();
}, vn = (t, e) => {
  var n, r, i, o;
  if (t.nodeType === 3) {
    const a = (n = t.textContent) == null ? void 0 : n.trim();
    a && e.append("tspan").text(a);
  } else if (t.nodeType === 1)
    if (t.tagName === "TSPAN" || t.tagName === "tspan") {
      const a = e.append("tspan").text(((r = t.textContent) == null ? void 0 : r.trim()) || "");
      t.getAttribute("dy") && a.attr("dy", t.getAttribute("dy"));
    } else if (t.tagName === "STRONG" || t.tagName === "strong")
      e.append("tspan").attr("font-weight", "bold").text(((i = t.textContent) == null ? void 0 : i.trim()) || "");
    else if (t.tagName === "I" || t.tagName === "i")
      e.append("tspan").attr("font-style", "italic").text(((o = t.textContent) == null ? void 0 : o.trim()) || "");
    else
      for (let a = 0; a < t.childNodes.length; a++)
        vn(t.childNodes[a], e);
}, Ve = (t, e) => t === "quadraticBeziers" ? e ? 0 : 20 : 0, Va = (t, e, n) => {
  var i;
  const r = t.merge(e);
  if (r.transition().duration(n.duration).attr("d", (o) => _e(o, o.parent, n)).attr("fill", "none").attr("stroke-width", (o) => n.linkWidth(o)).attr("stroke", (o) => n.linkColor(o)), n.linkLabel) {
    const o = (i = r.node()) == null ? void 0 : i.parentNode, u = R(o).selectAll("text.link-label").data(r.data(), (s, l) => `link-label-${l}`);
    u.exit().remove(), u.enter().append("text").attr("class", "link-label").attr("text-anchor", "middle").attr("dominant-baseline", "middle").attr("fill", n.linkLabel.color || "#000000").attr("font-size", n.linkLabel.fontSize || 12).attr("pointer-events", "none").attr("opacity", 0).merge(u).attr("x", function(s) {
      const l = Ve(n.linkShape || "quadraticBeziers", n.isHorizontal);
      return n.isHorizontal ? s.parent.y + (s.y - s.parent.y) - n.nodeWidth / 4 + l : s.parent.x + (s.x - s.parent.x) + n.nodeWidth / 2;
    }).attr("y", function(s) {
      const l = Ve(n.linkShape || "quadraticBeziers", n.isHorizontal);
      return n.isHorizontal ? s.parent.x + (s.x - s.parent.x) + n.nodeHeight / 2 : s.parent.y + (s.y - s.parent.y) - n.nodeHeight / 2 + l;
    }).text("").each(function(s) {
      R(this).selectAll("tspan").remove();
      const l = {
        ...s.parent,
        data: s.parent.data,
        settings: n
      }, d = {
        ...s,
        data: s.data,
        settings: n
      }, c = n.linkLabel.render(l, d), p = R(this);
      if (c.includes("<tspan") || c.includes("<strong") || c.includes("<i>")) {
        const x = new DOMParser().parseFromString(`<root>${c}</root>`, "text/xml");
        vn(x.documentElement, p);
      } else
        p.text(c);
    }).transition().delay(n.duration).duration(300).attr("opacity", 1);
  }
}, Wa = (t, e, n, r) => {
  const i = t.enter().append("g").attr("class", "node").attr("id", (o) => o == null ? void 0 : o.id).attr("transform", (o) => {
    const a = vt(
      n,
      r,
      o.id
    );
    return wn(
      a.x0,
      a.y0,
      e
    );
  });
  return i.append("foreignObject").attr("width", e.nodeWidth).attr("height", e.nodeHeight), i;
}, Ba = (t, e, n, r) => {
  const i = t.exit().transition().duration(e.duration).style("opacity", 0).attr("transform", (o) => {
    const a = vt(
      r,
      n,
      o.id
    );
    return wn(
      a.x0,
      a.y0,
      e
    );
  }).remove();
  i.select("rect").style("fill-opacity", 1e-6), i.select("circle").attr("r", 1e-6), i.select("text").style("fill-opacity", 1e-6);
}, Xa = (t, e, n) => {
  const r = t.merge(e);
  r.transition().duration(n.duration).attr("transform", (i) => n.isHorizontal ? "translate(" + i.y + "," + i.x + ")" : "translate(" + i.x + "," + i.y + ")"), r.select("foreignObject").attr("width", n.nodeWidth).attr("height", n.nodeHeight).style("overflow", "visible").on("click", (i, o) => n.onNodeClick({ ...o, settings: n })).on("mouseenter", (i, o) => n.onNodeMouseEnter({ ...o, settings: n })).on("mouseleave", (i, o) => n.onNodeMouseLeave({ ...o, settings: n })).html((i) => n.renderNode({ ...i, settings: n }));
}, Ya = (t, e) => {
  const { idKey: n, relationnalField: r, hasFlatData: i } = e;
  return i ? J.stratify().id((o) => o[n]).parentId((o) => o[r])(t) : J.hierarchy(t, (o) => o[r]);
}, Ga = (t) => {
  const { areaHeight: e, areaWidth: n } = _n(t.htmlId);
  return t.mainAxisNodeSpacing === "auto" && t.isHorizontal ? J.tree().size([
    e - t.nodeHeight,
    n - t.nodeWidth
  ]) : t.mainAxisNodeSpacing === "auto" && !t.isHorizontal ? J.tree().size([
    n - t.nodeWidth,
    e - t.nodeHeight
  ]) : t.isHorizontal === !0 ? J.tree().nodeSize([
    t.nodeHeight * t.secondaryAxisNodeSpacing,
    t.nodeWidth
  ]) : J.tree().nodeSize([
    t.nodeWidth * t.secondaryAxisNodeSpacing,
    t.nodeHeight
  ]);
}, we = {
  create: Ua
};
typeof window < "u" && (window.Treeviz = we);
function Ua(t) {
  let n = {
    ...{
      data: [],
      htmlId: "",
      idKey: "id",
      relationnalField: "father",
      hasFlatData: !0,
      nodeWidth: 160,
      nodeHeight: 100,
      mainAxisNodeSpacing: 300,
      renderNode: () => "Node",
      linkColor: () => "#ffcc80",
      linkWidth: () => 10,
      linkShape: "quadraticBeziers",
      isHorizontal: !0,
      hasPan: !1,
      hasZoom: !1,
      duration: 600,
      onNodeClick: () => {
      },
      onNodeMouseEnter: () => {
      },
      onNodeMouseLeave: () => {
      },
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      secondaryAxisNodeSpacing: 1.25
    },
    ...t
  }, r = [];
  function i(s, l) {
    const d = l.descendants(), c = l.descendants().slice(1), { mainAxisNodeSpacing: p } = n;
    p !== "auto" && d.forEach((w) => {
      w.y = w.depth * n.nodeWidth * p;
    }), d.forEach((w) => {
      const A = r.find(
        (z) => z.id === w.id
      );
      w.x0 = A ? A.x0 : w.x, w.y0 = A ? A.y0 : w.y;
    });
    const m = s.selectAll("g.node").data(d, (w) => w[n.idKey]), x = Wa(m, n, d, r);
    Xa(x, m, n), Ba(m, n, d, r);
    const _ = s.selectAll("path.link").data(c, (w) => w.id), y = Pa(_, n, d, r);
    Va(y, _, n), Oa(_, n, d, r), r = [...d];
  }
  function o(s, l) {
    it.add(n.duration, () => {
      l && (n = { ...n, ...l });
      const d = Ya(s, n), p = Ga(n)(d);
      i(f, p);
    });
  }
  function a(s) {
    const l = s ? document.querySelector(`#${n.htmlId} svg g`) : document.querySelector(`#${n.htmlId}`);
    if (l)
      for (; l.firstChild; )
        l.removeChild(l.firstChild);
    r = [];
  }
  const u = { refresh: o, clean: a }, f = Ra(n);
  return u;
}
var bt = [
  {
    id: 1,
    text_1: "Chaos",
    text_2: "Void",
    father: null,
    color: "#FF5722"
  },
  {
    id: 2,
    text_1: "Tartarus",
    text_2: "Abyss",
    father: 1,
    color: "#FFC107"
  },
  {
    id: 3,
    text_1: "Gaia",
    text_2: "Earth",
    father: 1,
    color: "#8BC34A"
  },
  {
    id: 4,
    text_1: "Eros",
    text_2: "Desire",
    father: 1,
    color: "#00BCD4"
  }
], Ka = [
  {
    id: 1,
    text_1: "Chaos",
    text_2: " Void",
    father: null,
    color: "#2196F3"
  },
  {
    id: 2,
    text_1: "Tartarus",
    text_2: "Abyss",
    father: 1,
    color: "#F44336"
  },
  {
    id: 3,
    text_1: "Gaia",
    text_2: "Earth",
    father: 1,
    color: "#673AB7"
  },
  {
    id: 4,
    text_1: "Eros",
    text_2: "Desire",
    father: 1,
    color: "#009688"
  },
  {
    id: 5,
    text_1: "Uranus",
    text_2: "Sky",
    father: 3,
    color: "#4CAF50"
  },
  {
    id: 6,
    text_1: "Ourea",
    text_2: "Mountains",
    father: 3,
    color: "#FF9800"
  }
], Za = [
  {
    id: 1,
    text_1: "Chaos",
    text_2: "Void",
    father: null,
    color: "#2196F3"
  },
  {
    id: 2,
    text_1: "Tartarus",
    text_2: "Abyss",
    father: 1,
    color: "#F44336"
  },
  {
    id: 3,
    text_1: "Gaia",
    text_2: "Earth",
    father: 1,
    color: "#673AB7"
  },
  {
    id: 4,
    text_1: "Eros",
    text_2: "Desire",
    father: 1,
    color: "#009688"
  },
  {
    id: 5,
    text_1: "Uranus",
    text_2: "Sky",
    father: 3,
    color: "#4CAF50"
  },
  {
    id: 6,
    text_1: "Ourea",
    text_2: "Mountains",
    father: 3,
    color: "#FF9800"
  },
  {
    id: 7,
    text_1: "Hermes",
    text_2: " Sky",
    father: 4,
    color: "#2196F3"
  },
  {
    id: 8,
    text_1: "Aphrodite",
    text_2: "Love",
    father: 4,
    color: "#8BC34A"
  },
  {
    id: 3.3,
    text_1: "Love",
    text_2: "Peace",
    father: 8,
    color: "#c72e99"
  },
  {
    id: 4.1,
    text_1: "Hope",
    text_2: "Life",
    father: 8,
    color: "#2eecc7"
  }
], Ot = we.create({
  data: bt,
  // for Typescript projects only.
  htmlId: "tree",
  idKey: "id",
  hasFlatData: !0,
  relationnalField: "father",
  nodeWidth: 120,
  hasPan: !0,
  hasZoom: !0,
  nodeHeight: 80,
  mainAxisNodeSpacing: 2,
  isHorizontal: !1,
  renderNode: function(e) {
    return "<div class='box' style='cursor:pointer;height:" + e.settings.nodeHeight + "px; width:" + e.settings.nodeWidth + "px;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:" + e.data.color + ";border-radius:5px;'><div><strong>" + e.data.text_1 + "</strong></div><div>is</div><div><i>" + e.data.text_2 + "</i></div></div>";
  },
  linkWidth: (t) => t.data.id * 2,
  linkColor: () => "#B0BEC5",
  linkLabel: {
    render: (t, e) => "is child",
    color: "#455A64",
    fontSize: 11
  },
  onNodeClick: (t) => {
    console.log(t.data);
  },
  onNodeMouseEnter: (t) => {
    console.log(t.data);
  }
});
Ot.refresh(bt);
var We = !0;
const I = document.querySelector("#add"), T = document.querySelector("#remove"), jt = document.querySelector("#doTasks");
I == null || I.addEventListener("click", function() {
  console.log("addButton clicked"), We ? Ot.refresh(Ka) : Ot.refresh(Za), We = !1;
});
T == null || T.addEventListener("click", function() {
  console.log("removeButton clicked"), Ot.refresh(bt);
});
jt == null || jt.addEventListener("click", function() {
  I == null || I.click(), T == null || T.click(), I == null || I.click(), T == null || T.click(), T == null || T.click(), I == null || I.click(), T == null || T.click(), I == null || I.click(), I == null || I.click(), T == null || T.click(), T == null || T.click();
});
var Qa = we.create({
  data: bt,
  htmlId: "tree-horizontal",
  idKey: "id",
  hasFlatData: !0,
  relationnalField: "father",
  nodeWidth: 120,
  hasPan: !0,
  hasZoom: !0,
  nodeHeight: 80,
  mainAxisNodeSpacing: 2,
  isHorizontal: !0,
  renderNode: function(e) {
    return "<div class='box' style='cursor:pointer;height:" + e.settings.nodeHeight + "px; width:" + e.settings.nodeWidth + "px;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:" + e.data.color + ";border-radius:5px;'><div><strong>" + e.data.text_1 + "</strong></div><div>is</div><div><i>" + e.data.text_2 + "</i></div></div>";
  },
  linkWidth: (t) => t.data.id * 2,
  linkShape: "curve",
  linkColor: () => "#B0BEC5",
  linkLabel: {
    render: (t, e) => "is child",
    color: "#455A64",
    fontSize: 11
  },
  onNodeClick: (t) => {
    console.log(t.data);
  }
});
Qa.refresh(bt);
