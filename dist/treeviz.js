var kn = Object.defineProperty;
var Nn = (t, e, n) => e in t ? kn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var rt = (t, e, n) => (Nn(t, typeof e != "symbol" ? e + "" : e, n), n);
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
function $n(t) {
  var e = 0, n = t.children, r = n && n.length;
  if (!r)
    e = 1;
  else
    for (; --r >= 0; )
      e += n[r].value;
  t.value = e;
}
function zn() {
  return this.eachAfter($n);
}
function An(t, e) {
  let n = -1;
  for (const r of this)
    t.call(e, r, ++n, this);
  return this;
}
function Sn(t, e) {
  for (var n = this, r = [n], i, o, a = -1; n = r.pop(); )
    if (t.call(e, n, ++a, this), i = n.children)
      for (o = i.length - 1; o >= 0; --o)
        r.push(i[o]);
  return this;
}
function En(t, e) {
  for (var n = this, r = [n], i = [], o, a, s, f = -1; n = r.pop(); )
    if (i.push(n), o = n.children)
      for (a = 0, s = o.length; a < s; ++a)
        r.push(o[a]);
  for (; n = i.pop(); )
    t.call(e, n, ++f, this);
  return this;
}
function Mn(t, e) {
  let n = -1;
  for (const r of this)
    if (t.call(e, r, ++n, this))
      return r;
}
function Tn(t) {
  return this.eachAfter(function(e) {
    for (var n = +t(e.data) || 0, r = e.children, i = r && r.length; --i >= 0; )
      n += r[i].value;
    e.value = n;
  });
}
function Cn(t) {
  return this.eachBefore(function(e) {
    e.children && e.children.sort(t);
  });
}
function In(t) {
  for (var e = this, n = Ln(e, t), r = [e]; e !== n; )
    e = e.parent, r.push(e);
  for (var i = r.length; t !== n; )
    r.splice(i, 0, t), t = t.parent;
  return r;
}
function Ln(t, e) {
  if (t === e)
    return t;
  var n = t.ancestors(), r = e.ancestors(), i = null;
  for (t = n.pop(), e = r.pop(); t === e; )
    i = t, t = n.pop(), e = r.pop();
  return i;
}
function Hn() {
  for (var t = this, e = [t]; t = t.parent; )
    e.push(t);
  return e;
}
function Fn() {
  return Array.from(this);
}
function Dn() {
  var t = [];
  return this.eachBefore(function(e) {
    e.children || t.push(e);
  }), t;
}
function qn() {
  var t = this, e = [];
  return t.each(function(n) {
    n !== t && e.push({ source: n.parent, target: n });
  }), e;
}
function* Rn() {
  var t = this, e, n = [t], r, i, o;
  do
    for (e = n.reverse(), n = []; t = e.pop(); )
      if (yield t, r = t.children)
        for (i = 0, o = r.length; i < o; ++i)
          n.push(r[i]);
  while (n.length);
}
function ce(t, e) {
  t instanceof Map ? (t = [void 0, t], e === void 0 && (e = Vn)) : e === void 0 && (e = On);
  for (var n = new at(t), r, i = [n], o, a, s, f; r = i.pop(); )
    if ((a = e(r.data)) && (f = (a = Array.from(a)).length))
      for (r.children = a, s = f - 1; s >= 0; --s)
        i.push(o = a[s] = new at(a[s])), o.parent = r, o.depth = r.depth + 1;
  return n.eachBefore(We);
}
function Pn() {
  return ce(this).eachBefore(Wn);
}
function On(t) {
  return t.children;
}
function Vn(t) {
  return Array.isArray(t) ? t[1] : null;
}
function Wn(t) {
  t.data.value !== void 0 && (t.value = t.data.value), t.data = t.data.data;
}
function We(t) {
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
  count: zn,
  each: An,
  eachAfter: En,
  eachBefore: Sn,
  find: Mn,
  sum: Tn,
  sort: Cn,
  path: In,
  ancestors: Hn,
  descendants: Fn,
  leaves: Dn,
  links: qn,
  copy: Pn,
  [Symbol.iterator]: Rn
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
function Xn(t) {
  t.x0 = Math.round(t.x0), t.y0 = Math.round(t.y0), t.x1 = Math.round(t.x1), t.y1 = Math.round(t.y1);
}
function Bn(t, e, n, r, i) {
  for (var o = t.children, a, s = -1, f = o.length, u = t.value && (r - e) / t.value; ++s < f; )
    a = o[s], a.y0 = n, a.y1 = i, a.x0 = e, a.x1 = e += a.value * u;
}
var Yn = { depth: -1 }, ve = {}, Gt = {};
function Gn(t) {
  return t.id;
}
function Un(t) {
  return t.parentId;
}
function Kn() {
  var t = Gn, e = Un, n;
  function r(i) {
    var o = Array.from(i), a = t, s = e, f, u, l, d, c, p, m, _, x = /* @__PURE__ */ new Map();
    if (n != null) {
      const y = o.map((z, E) => Zn(n(z, E, i))), w = y.map(be), A = new Set(y).add("");
      for (const z of w)
        A.has(z) || (A.add(z), y.push(z), w.push(be(z)), o.push(Gt));
      a = (z, E) => y[E], s = (z, E) => w[E];
    }
    for (l = 0, f = o.length; l < f; ++l)
      u = o[l], p = o[l] = new at(u), (m = a(u, l, i)) != null && (m += "") && (_ = p.id = m, x.set(_, x.has(_) ? ve : p)), (m = s(u, l, i)) != null && (m += "") && (p.parent = m);
    for (l = 0; l < f; ++l)
      if (p = o[l], m = p.parent) {
        if (c = x.get(m), !c)
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
    if (d.parent = Yn, d.eachBefore(function(y) {
      y.depth = y.parent.depth + 1, --f;
    }).eachBefore(We), d.parent = null, f > 0)
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
function Zn(t) {
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
function Qn(t, e) {
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
function Jn(t, e, n) {
  var r = n / (e.i - t.i);
  e.c -= r, e.s += n, t.c += r, e.z += n, e.m += n;
}
function jn(t) {
  for (var e = 0, n = 0, r = t.children, i = r.length, o; --i >= 0; )
    o = r[i], o.z += e, o.m += e, e += o.s + (n += o.c);
}
function tr(t, e, n) {
  return t.a.parent === e.parent ? t.a : n;
}
function Mt(t, e) {
  this._ = t, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = e;
}
Mt.prototype = Object.create(at.prototype);
function er(t) {
  for (var e = new Mt(t, 0), n, r = [e], i, o, a, s; n = r.pop(); )
    if (o = n._.children)
      for (n.children = new Array(s = o.length), a = s - 1; a >= 0; --a)
        r.push(i = n.children[a] = new Mt(o[a], a)), i.parent = n;
  return (e.parent = new Mt(null, 0)).children = [e], e;
}
function nr() {
  var t = Qn, e = 1, n = 1, r = null;
  function i(u) {
    var l = er(u);
    if (l.eachAfter(o), l.parent.m = -l.z, l.eachBefore(a), r)
      u.eachBefore(f);
    else {
      var d = u, c = u, p = u;
      u.eachBefore(function(w) {
        w.x < d.x && (d = w), w.x > c.x && (c = w), w.depth > p.depth && (p = w);
      });
      var m = d === c ? 1 : t(d, c) / 2, _ = m - d.x, x = e / (c.x + m + _), y = n / (p.depth || 1);
      u.eachBefore(function(w) {
        w.x = (w.x + _) * x, w.y = w.depth * y;
      });
    }
    return u;
  }
  function o(u) {
    var l = u.children, d = u.parent.children, c = u.i ? d[u.i - 1] : null;
    if (l) {
      jn(u);
      var p = (l[0].z + l[l.length - 1].z) / 2;
      c ? (u.z = c.z + t(u._, c._), u.m = u.z - p) : u.z = p;
    } else
      c && (u.z = c.z + t(u._, c._));
    u.parent.A = s(u, c, u.parent.A || d[0]);
  }
  function a(u) {
    u._.x = u.z + u.parent.m, u.m += u.parent.m;
  }
  function s(u, l, d) {
    if (l) {
      for (var c = u, p = u, m = l, _ = c.parent.children[0], x = c.m, y = p.m, w = m.m, A = _.m, z; m = Kt(m), c = Ut(c), m && c; )
        _ = Ut(_), p = Kt(p), p.a = u, z = m.z + w - c.z - x + t(m._, c._), z > 0 && (Jn(tr(m, u, d), u, z), x += z, y += z), w += m.m, x += c.m, A += _.m, y += p.m;
      m && !Kt(p) && (p.t = m, p.m += w - y), c && !Ut(_) && (_.t = c, _.m += x - A, d = u);
    }
    return d;
  }
  function f(u) {
    u.x *= e, u.y = u.depth * n;
  }
  return i.separation = function(u) {
    return arguments.length ? (t = u, i) : t;
  }, i.size = function(u) {
    return arguments.length ? (r = !1, e = +u[0], n = +u[1], i) : r ? null : [e, n];
  }, i.nodeSize = function(u) {
    return arguments.length ? (r = !0, e = +u[0], n = +u[1], i) : r ? [e, n] : null;
  }, i;
}
function rr(t, e, n, r, i) {
  for (var o = t.children, a, s = -1, f = o.length, u = t.value && (i - n) / t.value; ++s < f; )
    a = o[s], a.x0 = e, a.x1 = r, a.y0 = n, a.y1 = n += a.value * u;
}
var ir = (1 + Math.sqrt(5)) / 2;
function or(t, e, n, r, i, o) {
  for (var a = [], s = e.children, f, u, l = 0, d = 0, c = s.length, p, m, _ = e.value, x, y, w, A, z, E, C; l < c; ) {
    p = i - n, m = o - r;
    do
      x = s[d++].value;
    while (!x && d < c);
    for (y = w = x, E = Math.max(m / p, p / m) / (_ * t), C = x * x * E, z = Math.max(w / C, C / y); d < c; ++d) {
      if (x += u = s[d].value, u < y && (y = u), u > w && (w = u), C = x * x * E, A = Math.max(w / C, C / y), A > z) {
        x -= u;
        break;
      }
      z = A;
    }
    a.push(f = { value: x, dice: p < m, children: s.slice(l, d) }), f.dice ? Bn(f, n, r, i, _ ? r += m * x / _ : o) : rr(f, n, r, _ ? n += p * x / _ : i, o), _ -= x, l = d;
  }
  return a;
}
const ar = function t(e) {
  function n(r, i, o, a, s) {
    or(e, r, i, o, a, s);
  }
  return n.ratio = function(r) {
    return t((r = +r) > 1 ? r : 1);
  }, n;
}(ir);
function ur() {
  var t = ar, e = !1, n = 1, r = 1, i = [0], o = lt, a = lt, s = lt, f = lt, u = lt;
  function l(c) {
    return c.x0 = c.y0 = 0, c.x1 = n, c.y1 = r, c.eachBefore(d), i = [0], e && c.eachBefore(Xn), c;
  }
  function d(c) {
    var p = i[c.depth], m = c.x0 + p, _ = c.y0 + p, x = c.x1 - p, y = c.y1 - p;
    x < m && (m = x = (m + x) / 2), y < _ && (_ = y = (_ + y) / 2), c.x0 = m, c.y0 = _, c.x1 = x, c.y1 = y, c.children && (p = i[c.depth + 1] = o(c) / 2, m += u(c) - p, _ += a(c) - p, x -= s(c) - p, y -= f(c) - p, x < m && (m = x = (m + x) / 2), y < _ && (_ = y = (_ + y) / 2), t(c, m, _, x, y));
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
    return arguments.length ? (s = typeof c == "function" ? c : ct(+c), l) : s;
  }, l.paddingBottom = function(c) {
    return arguments.length ? (f = typeof c == "function" ? c : ct(+c), l) : f;
  }, l.paddingLeft = function(c) {
    return arguments.length ? (u = typeof c == "function" ? c : ct(+c), l) : u;
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
function sr(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === ee && e.documentElement.namespaceURI === ee ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function lr(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Be(t) {
  var e = Vt(t);
  return (e.local ? lr : sr)(e);
}
function cr() {
}
function fe(t) {
  return t == null ? cr : function() {
    return this.querySelector(t);
  };
}
function fr(t) {
  typeof t != "function" && (t = fe(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, s = r[i] = new Array(a), f, u, l = 0; l < a; ++l)
      (f = o[l]) && (u = t.call(f, f.__data__, l, o)) && ("__data__" in f && (u.__data__ = f.__data__), s[l] = u);
  return new H(r, this._parents);
}
function Ye(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function hr() {
  return [];
}
function Ge(t) {
  return t == null ? hr : function() {
    return this.querySelectorAll(t);
  };
}
function dr(t) {
  return function() {
    return Ye(t.apply(this, arguments));
  };
}
function pr(t) {
  typeof t == "function" ? t = dr(t) : t = Ge(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var a = e[o], s = a.length, f, u = 0; u < s; ++u)
      (f = a[u]) && (r.push(t.call(f, f.__data__, u, a)), i.push(f));
  return new H(r, i);
}
function Ue(t) {
  return function() {
    return this.matches(t);
  };
}
function Ke(t) {
  return function(e) {
    return e.matches(t);
  };
}
var gr = Array.prototype.find;
function yr(t) {
  return function() {
    return gr.call(this.children, t);
  };
}
function mr() {
  return this.firstElementChild;
}
function _r(t) {
  return this.select(t == null ? mr : yr(typeof t == "function" ? t : Ke(t)));
}
var xr = Array.prototype.filter;
function wr() {
  return Array.from(this.children);
}
function vr(t) {
  return function() {
    return xr.call(this.children, t);
  };
}
function br(t) {
  return this.selectAll(t == null ? wr : vr(typeof t == "function" ? t : Ke(t)));
}
function kr(t) {
  typeof t != "function" && (t = Ue(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, s = r[i] = [], f, u = 0; u < a; ++u)
      (f = o[u]) && t.call(f, f.__data__, u, o) && s.push(f);
  return new H(r, this._parents);
}
function Ze(t) {
  return new Array(t.length);
}
function Nr() {
  return new H(this._enter || this._groups.map(Ze), this._parents);
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
function $r(t) {
  return function() {
    return t;
  };
}
function zr(t, e, n, r, i, o) {
  for (var a = 0, s, f = e.length, u = o.length; a < u; ++a)
    (s = e[a]) ? (s.__data__ = o[a], r[a] = s) : n[a] = new Ht(t, o[a]);
  for (; a < f; ++a)
    (s = e[a]) && (i[a] = s);
}
function Ar(t, e, n, r, i, o, a) {
  var s, f, u = /* @__PURE__ */ new Map(), l = e.length, d = o.length, c = new Array(l), p;
  for (s = 0; s < l; ++s)
    (f = e[s]) && (c[s] = p = a.call(f, f.__data__, s, e) + "", u.has(p) ? i[s] = f : u.set(p, f));
  for (s = 0; s < d; ++s)
    p = a.call(t, o[s], s, o) + "", (f = u.get(p)) ? (r[s] = f, f.__data__ = o[s], u.delete(p)) : n[s] = new Ht(t, o[s]);
  for (s = 0; s < l; ++s)
    (f = e[s]) && u.get(c[s]) === f && (i[s] = f);
}
function Sr(t) {
  return t.__data__;
}
function Er(t, e) {
  if (!arguments.length)
    return Array.from(this, Sr);
  var n = e ? Ar : zr, r = this._parents, i = this._groups;
  typeof t != "function" && (t = $r(t));
  for (var o = i.length, a = new Array(o), s = new Array(o), f = new Array(o), u = 0; u < o; ++u) {
    var l = r[u], d = i[u], c = d.length, p = Mr(t.call(l, l && l.__data__, u, r)), m = p.length, _ = s[u] = new Array(m), x = a[u] = new Array(m), y = f[u] = new Array(c);
    n(l, d, _, x, y, p, e);
    for (var w = 0, A = 0, z, E; w < m; ++w)
      if (z = _[w]) {
        for (w >= A && (A = w + 1); !(E = x[A]) && ++A < m; )
          ;
        z._next = E || null;
      }
  }
  return a = new H(a, r), a._enter = s, a._exit = f, a;
}
function Mr(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Tr() {
  return new H(this._exit || this._groups.map(Ze), this._parents);
}
function Cr(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Ir(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, a = Math.min(i, o), s = new Array(i), f = 0; f < a; ++f)
    for (var u = n[f], l = r[f], d = u.length, c = s[f] = new Array(d), p, m = 0; m < d; ++m)
      (p = u[m] || l[m]) && (c[m] = p);
  for (; f < i; ++f)
    s[f] = n[f];
  return new H(s, this._parents);
}
function Lr() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], a; --i >= 0; )
      (a = r[i]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function Hr(t) {
  t || (t = Fr);
  function e(d, c) {
    return d && c ? t(d.__data__, c.__data__) : !d - !c;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var a = n[o], s = a.length, f = i[o] = new Array(s), u, l = 0; l < s; ++l)
      (u = a[l]) && (f[l] = u);
    f.sort(e);
  }
  return new H(i, this._parents).order();
}
function Fr(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Dr() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function qr() {
  return Array.from(this);
}
function Rr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var a = r[i];
      if (a)
        return a;
    }
  return null;
}
function Pr() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function Or() {
  return !this.node();
}
function Vr(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, a = i.length, s; o < a; ++o)
      (s = i[o]) && t.call(s, s.__data__, o, i);
  return this;
}
function Wr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Xr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Br(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Yr(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Gr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Ur(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Kr(t, e) {
  var n = Vt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Xr : Wr : typeof e == "function" ? n.local ? Ur : Gr : n.local ? Yr : Br)(n, e));
}
function Qe(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Zr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Qr(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Jr(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function jr(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Zr : typeof e == "function" ? Jr : Qr)(t, e, n ?? "")) : ut(this.node(), t);
}
function ut(t, e) {
  return t.style.getPropertyValue(e) || Qe(t).getComputedStyle(t, null).getPropertyValue(e);
}
function ti(t) {
  return function() {
    delete this[t];
  };
}
function ei(t, e) {
  return function() {
    this[t] = e;
  };
}
function ni(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function ri(t, e) {
  return arguments.length > 1 ? this.each((e == null ? ti : typeof e == "function" ? ni : ei)(t, e)) : this.node()[t];
}
function Je(t) {
  return t.trim().split(/^|\s+/);
}
function he(t) {
  return t.classList || new je(t);
}
function je(t) {
  this._node = t, this._names = Je(t.getAttribute("class") || "");
}
je.prototype = {
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
function tn(t, e) {
  for (var n = he(t), r = -1, i = e.length; ++r < i; )
    n.add(e[r]);
}
function en(t, e) {
  for (var n = he(t), r = -1, i = e.length; ++r < i; )
    n.remove(e[r]);
}
function ii(t) {
  return function() {
    tn(this, t);
  };
}
function oi(t) {
  return function() {
    en(this, t);
  };
}
function ai(t, e) {
  return function() {
    (e.apply(this, arguments) ? tn : en)(this, t);
  };
}
function ui(t, e) {
  var n = Je(t + "");
  if (arguments.length < 2) {
    for (var r = he(this.node()), i = -1, o = n.length; ++i < o; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? ai : e ? ii : oi)(n, e));
}
function si() {
  this.textContent = "";
}
function li(t) {
  return function() {
    this.textContent = t;
  };
}
function ci(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function fi(t) {
  return arguments.length ? this.each(t == null ? si : (typeof t == "function" ? ci : li)(t)) : this.node().textContent;
}
function hi() {
  this.innerHTML = "";
}
function di(t) {
  return function() {
    this.innerHTML = t;
  };
}
function pi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function gi(t) {
  return arguments.length ? this.each(t == null ? hi : (typeof t == "function" ? pi : di)(t)) : this.node().innerHTML;
}
function yi() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function mi() {
  return this.each(yi);
}
function _i() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function xi() {
  return this.each(_i);
}
function wi(t) {
  var e = typeof t == "function" ? t : Be(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function vi() {
  return null;
}
function bi(t, e) {
  var n = typeof t == "function" ? t : Be(t), r = e == null ? vi : typeof e == "function" ? e : fe(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function ki() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Ni() {
  return this.each(ki);
}
function $i() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function zi() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ai(t) {
  return this.select(t ? zi : $i);
}
function Si(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Ei(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Mi(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Ti(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Ci(t, e, n) {
  return function() {
    var r = this.__on, i, o = Ei(e);
    if (r) {
      for (var a = 0, s = r.length; a < s; ++a)
        if ((i = r[a]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), i = { type: t.type, name: t.name, value: e, listener: o, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function Ii(t, e, n) {
  var r = Mi(t + ""), i, o = r.length, a;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var f = 0, u = s.length, l; f < u; ++f)
        for (i = 0, l = s[f]; i < o; ++i)
          if ((a = r[i]).type === l.type && a.name === l.name)
            return l.value;
    }
    return;
  }
  for (s = e ? Ci : Ti, i = 0; i < o; ++i)
    this.each(s(r[i], e, n));
  return this;
}
function nn(t, e, n) {
  var r = Qe(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Li(t, e) {
  return function() {
    return nn(this, t, e);
  };
}
function Hi(t, e) {
  return function() {
    return nn(this, t, e.apply(this, arguments));
  };
}
function Fi(t, e) {
  return this.each((typeof e == "function" ? Hi : Li)(t, e));
}
function* Di() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, a; i < o; ++i)
      (a = r[i]) && (yield a);
}
var de = [null];
function H(t, e) {
  this._groups = t, this._parents = e;
}
function xt() {
  return new H([[document.documentElement]], de);
}
function qi() {
  return this;
}
H.prototype = xt.prototype = {
  constructor: H,
  select: fr,
  selectAll: pr,
  selectChild: _r,
  selectChildren: br,
  filter: kr,
  data: Er,
  enter: Nr,
  exit: Tr,
  join: Cr,
  merge: Ir,
  selection: qi,
  order: Lr,
  sort: Hr,
  call: Dr,
  nodes: qr,
  node: Rr,
  size: Pr,
  empty: Or,
  each: Vr,
  attr: Kr,
  style: jr,
  property: ri,
  classed: ui,
  text: fi,
  html: gi,
  raise: mi,
  lower: xi,
  append: wi,
  insert: bi,
  remove: Ni,
  clone: Ai,
  datum: Si,
  on: Ii,
  dispatch: Fi,
  [Symbol.iterator]: Di
};
function G(t) {
  return typeof t == "string" ? new H([[document.querySelector(t)]], [document.documentElement]) : new H([[t]], de);
}
function Ri(t) {
  let e;
  for (; e = t.sourceEvent; )
    t = e;
  return t;
}
function j(t, e) {
  if (t = Ri(t), e === void 0 && (e = t.currentTarget), e) {
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
function Pi(t) {
  return typeof t == "string" ? new H([document.querySelectorAll(t)], [document.documentElement]) : new H([Ye(t)], de);
}
var Oi = { value: () => {
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
function Vi(t, e) {
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
    var n = this._, r = Vi(t + "", n), i, o = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++o < a; )
        if ((i = (t = r[o]).type) && (i = Wi(n[i], t.name)))
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
function Wi(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Ne(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Oi, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
const ne = { capture: !0, passive: !1 };
function re(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Xi(t) {
  var e = t.document.documentElement, n = G(t).on("dragstart.drag", re, ne);
  "onselectstart" in e ? n.on("selectstart.drag", re, ne) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Bi(t, e) {
  var n = t.document.documentElement, r = G(t).on("dragstart.drag", null);
  e && (r.on("click.drag", re, ne), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function ge(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function rn(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e)
    n[r] = e[r];
  return n;
}
function wt() {
}
var gt = 0.7, Ft = 1 / gt, ot = "\\s*([+-]?\\d+)\\s*", yt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", V = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Yi = /^#([0-9a-f]{3,8})$/, Gi = new RegExp(`^rgb\\(${ot},${ot},${ot}\\)$`), Ui = new RegExp(`^rgb\\(${V},${V},${V}\\)$`), Ki = new RegExp(`^rgba\\(${ot},${ot},${ot},${yt}\\)$`), Zi = new RegExp(`^rgba\\(${V},${V},${V},${yt}\\)$`), Qi = new RegExp(`^hsl\\(${yt},${V},${V}\\)$`), Ji = new RegExp(`^hsla\\(${yt},${V},${V},${yt}\\)$`), $e = {
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
  formatHex8: ji,
  formatHsl: to,
  formatRgb: Ae,
  toString: Ae
});
function ze() {
  return this.rgb().formatHex();
}
function ji() {
  return this.rgb().formatHex8();
}
function to() {
  return on(this).formatHsl();
}
function Ae() {
  return this.rgb().formatRgb();
}
function mt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Yi.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Se(e) : n === 3 ? new F(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? zt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? zt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Gi.exec(t)) ? new F(e[1], e[2], e[3], 1) : (e = Ui.exec(t)) ? new F(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Ki.exec(t)) ? zt(e[1], e[2], e[3], e[4]) : (e = Zi.exec(t)) ? zt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Qi.exec(t)) ? Te(e[1], e[2] / 100, e[3] / 100, 1) : (e = Ji.exec(t)) ? Te(e[1], e[2] / 100, e[3] / 100, e[4]) : $e.hasOwnProperty(t) ? Se($e[t]) : t === "transparent" ? new F(NaN, NaN, NaN, 0) : null;
}
function Se(t) {
  return new F(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function zt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new F(t, e, n, r);
}
function eo(t) {
  return t instanceof wt || (t = mt(t)), t ? (t = t.rgb(), new F(t.r, t.g, t.b, t.opacity)) : new F();
}
function ie(t, e, n, r) {
  return arguments.length === 1 ? eo(t) : new F(t, e, n, r ?? 1);
}
function F(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
ge(F, ie, rn(wt, {
  brighter(t) {
    return t = t == null ? Ft : Math.pow(Ft, t), new F(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? gt : Math.pow(gt, t), new F(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new F(et(this.r), et(this.g), et(this.b), Dt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ee,
  // Deprecated! Use color.formatHex.
  formatHex: Ee,
  formatHex8: no,
  formatRgb: Me,
  toString: Me
}));
function Ee() {
  return `#${tt(this.r)}${tt(this.g)}${tt(this.b)}`;
}
function no() {
  return `#${tt(this.r)}${tt(this.g)}${tt(this.b)}${tt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Me() {
  const t = Dt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${et(this.r)}, ${et(this.g)}, ${et(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Dt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function et(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function tt(t) {
  return t = et(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Te(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new R(t, e, n, r);
}
function on(t) {
  if (t instanceof R)
    return new R(t.h, t.s, t.l, t.opacity);
  if (t instanceof wt || (t = mt(t)), !t)
    return new R();
  if (t instanceof R)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), a = NaN, s = o - i, f = (o + i) / 2;
  return s ? (e === o ? a = (n - r) / s + (n < r) * 6 : n === o ? a = (r - e) / s + 2 : a = (e - n) / s + 4, s /= f < 0.5 ? o + i : 2 - o - i, a *= 60) : s = f > 0 && f < 1 ? 0 : a, new R(a, s, f, t.opacity);
}
function ro(t, e, n, r) {
  return arguments.length === 1 ? on(t) : new R(t, e, n, r ?? 1);
}
function R(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
ge(R, ro, rn(wt, {
  brighter(t) {
    return t = t == null ? Ft : Math.pow(Ft, t), new R(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? gt : Math.pow(gt, t), new R(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new F(
      Zt(t >= 240 ? t - 240 : t + 120, i, r),
      Zt(t, i, r),
      Zt(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new R(Ce(this.h), At(this.s), At(this.l), Dt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Dt(this.opacity);
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
const an = (t) => () => t;
function io(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function oo(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function ao(t) {
  return (t = +t) == 1 ? un : function(e, n) {
    return n - e ? oo(e, n, t) : an(isNaN(e) ? n : e);
  };
}
function un(t, e) {
  var n = e - t;
  return n ? io(t, n) : an(isNaN(t) ? e : t);
}
const Ie = function t(e) {
  var n = ao(e);
  function r(i, o) {
    var a = n((i = ie(i)).r, (o = ie(o)).r), s = n(i.g, o.g), f = n(i.b, o.b), u = un(i.opacity, o.opacity);
    return function(l) {
      return i.r = a(l), i.g = s(l), i.b = f(l), i.opacity = u(l), i + "";
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
function uo(t) {
  return function() {
    return t;
  };
}
function so(t) {
  return function(e) {
    return t(e) + "";
  };
}
function lo(t, e) {
  var n = oe.lastIndex = Qt.lastIndex = 0, r, i, o, a = -1, s = [], f = [];
  for (t = t + "", e = e + ""; (r = oe.exec(t)) && (i = Qt.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), s[a] ? s[a] += o : s[++a] = o), (r = r[0]) === (i = i[0]) ? s[a] ? s[a] += i : s[++a] = i : (s[++a] = null, f.push({ i: a, x: Q(r, i) })), n = Qt.lastIndex;
  return n < e.length && (o = e.slice(n), s[a] ? s[a] += o : s[++a] = o), s.length < 2 ? f[0] ? so(f[0].x) : uo(e) : (e = f.length, function(u) {
    for (var l = 0, d; l < e; ++l)
      s[(d = f[l]).i] = d.x(u);
    return s.join("");
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
function sn(t, e, n, r, i, o) {
  var a, s, f;
  return (a = Math.sqrt(t * t + e * e)) && (t /= a, e /= a), (f = t * n + e * r) && (n -= t * f, r -= e * f), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, f /= s), t * r < e * n && (t = -t, e = -e, f = -f, a = -a), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * Le,
    skewX: Math.atan(f) * Le,
    scaleX: a,
    scaleY: s
  };
}
var St;
function co(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? ae : sn(e.a, e.b, e.c, e.d, e.e, e.f);
}
function fo(t) {
  return t == null || (St || (St = document.createElementNS("http://www.w3.org/2000/svg", "g")), St.setAttribute("transform", t), !(t = St.transform.baseVal.consolidate())) ? ae : (t = t.matrix, sn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function ln(t, e, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, l, d, c, p, m) {
    if (u !== d || l !== c) {
      var _ = p.push("translate(", null, e, null, n);
      m.push({ i: _ - 4, x: Q(u, d) }, { i: _ - 2, x: Q(l, c) });
    } else
      (d || c) && p.push("translate(" + d + e + c + n);
  }
  function a(u, l, d, c) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), c.push({ i: d.push(i(d) + "rotate(", null, r) - 2, x: Q(u, l) })) : l && d.push(i(d) + "rotate(" + l + r);
  }
  function s(u, l, d, c) {
    u !== l ? c.push({ i: d.push(i(d) + "skewX(", null, r) - 2, x: Q(u, l) }) : l && d.push(i(d) + "skewX(" + l + r);
  }
  function f(u, l, d, c, p, m) {
    if (u !== d || l !== c) {
      var _ = p.push(i(p) + "scale(", null, ",", null, ")");
      m.push({ i: _ - 4, x: Q(u, d) }, { i: _ - 2, x: Q(l, c) });
    } else
      (d !== 1 || c !== 1) && p.push(i(p) + "scale(" + d + "," + c + ")");
  }
  return function(u, l) {
    var d = [], c = [];
    return u = t(u), l = t(l), o(u.translateX, u.translateY, l.translateX, l.translateY, d, c), a(u.rotate, l.rotate, d, c), s(u.skewX, l.skewX, d, c), f(u.scaleX, u.scaleY, l.scaleX, l.scaleY, d, c), u = l = null, function(p) {
      for (var m = -1, _ = c.length, x; ++m < _; )
        d[(x = c[m]).i] = x.x(p);
      return d.join("");
    };
  };
}
var ho = ln(co, "px, ", "px)", "deg)"), po = ln(fo, ", ", ")", ")"), go = 1e-12;
function He(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function yo(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function mo(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const _o = function t(e, n, r) {
  function i(o, a) {
    var s = o[0], f = o[1], u = o[2], l = a[0], d = a[1], c = a[2], p = l - s, m = d - f, _ = p * p + m * m, x, y;
    if (_ < go)
      y = Math.log(c / u) / e, x = function(Z) {
        return [
          s + Z * p,
          f + Z * m,
          u * Math.exp(e * Z * y)
        ];
      };
    else {
      var w = Math.sqrt(_), A = (c * c - u * u + r * _) / (2 * u * n * w), z = (c * c - u * u - r * _) / (2 * c * n * w), E = Math.log(Math.sqrt(A * A + 1) - A), C = Math.log(Math.sqrt(z * z + 1) - z);
      y = (C - E) / e, x = function(Z) {
        var kt = Z * y, Nt = He(E), $t = u / (n * w) * (Nt * mo(e * kt + E) - yo(E));
        return [
          s + $t * p,
          f + $t * m,
          u * Nt / He(e * kt + E)
        ];
      };
    }
    return x.duration = y * 1e3 * e / Math.SQRT2, x;
  }
  return i.rho = function(o) {
    var a = Math.max(1e-3, +o), s = a * a, f = s * s;
    return t(a, s, f);
  }, i;
}(Math.SQRT2, 2, 4);
var st = 0, dt = 0, ft = 0, cn = 1e3, qt, pt, Rt = 0, nt = 0, Wt = 0, _t = typeof performance == "object" && performance.now ? performance : Date, fn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function ye() {
  return nt || (fn(xo), nt = _t.now() + Wt);
}
function xo() {
  nt = 0;
}
function Pt() {
  this._call = this._time = this._next = null;
}
Pt.prototype = hn.prototype = {
  constructor: Pt,
  restart: function(t, e, n) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? ye() : +n) + (e == null ? 0 : +e), !this._next && pt !== this && (pt ? pt._next = this : qt = this, pt = this), this._call = t, this._time = n, ue();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ue());
  }
};
function hn(t, e, n) {
  var r = new Pt();
  return r.restart(t, e, n), r;
}
function wo() {
  ye(), ++st;
  for (var t = qt, e; t; )
    (e = nt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --st;
}
function Fe() {
  nt = (Rt = _t.now()) + Wt, st = dt = 0;
  try {
    wo();
  } finally {
    st = 0, bo(), nt = 0;
  }
}
function vo() {
  var t = _t.now(), e = t - Rt;
  e > cn && (Wt -= e, Rt = t);
}
function bo() {
  for (var t, e = qt, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : qt = n);
  pt = t, ue(r);
}
function ue(t) {
  if (!st) {
    dt && (dt = clearTimeout(dt));
    var e = t - nt;
    e > 24 ? (t < 1 / 0 && (dt = setTimeout(Fe, t - _t.now() - Wt)), ft && (ft = clearInterval(ft))) : (ft || (Rt = _t.now(), ft = setInterval(vo, cn)), st = 1, fn(Fe));
  }
}
function De(t, e, n) {
  var r = new Pt();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var ko = pe("start", "end", "cancel", "interrupt"), No = [], dn = 0, qe = 1, se = 2, Ct = 3, Re = 4, le = 5, It = 6;
function Xt(t, e, n, r, i, o) {
  var a = t.__transition;
  if (!a)
    t.__transition = {};
  else if (n in a)
    return;
  $o(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: ko,
    tween: No,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: dn
  });
}
function me(t, e) {
  var n = P(t, e);
  if (n.state > dn)
    throw new Error("too late; already scheduled");
  return n;
}
function W(t, e) {
  var n = P(t, e);
  if (n.state > Ct)
    throw new Error("too late; already running");
  return n;
}
function P(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function $o(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = hn(o, 0, n.time);
  function o(u) {
    n.state = qe, n.timer.restart(a, n.delay, n.time), n.delay <= u && a(u - n.delay);
  }
  function a(u) {
    var l, d, c, p;
    if (n.state !== qe)
      return f();
    for (l in r)
      if (p = r[l], p.name === n.name) {
        if (p.state === Ct)
          return De(a);
        p.state === Re ? (p.state = It, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[l]) : +l < e && (p.state = It, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[l]);
      }
    if (De(function() {
      n.state === Ct && (n.state = Re, n.timer.restart(s, n.delay, n.time), s(u));
    }), n.state = se, n.on.call("start", t, t.__data__, n.index, n.group), n.state === se) {
      for (n.state = Ct, i = new Array(c = n.tween.length), l = 0, d = -1; l < c; ++l)
        (p = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++d] = p);
      i.length = d + 1;
    }
  }
  function s(u) {
    for (var l = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(f), n.state = le, 1), d = -1, c = i.length; ++d < c; )
      i[d].call(t, l);
    n.state === le && (n.on.call("end", t, t.__data__, n.index, n.group), f());
  }
  function f() {
    n.state = It, n.timer.stop(), delete r[e];
    for (var u in r)
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
      i = r.state > se && r.state < le, r.state = It, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[a];
    }
    o && delete t.__transition;
  }
}
function zo(t) {
  return this.each(function() {
    Lt(this, t);
  });
}
function Ao(t, e) {
  var n, r;
  return function() {
    var i = W(this, t), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var a = 0, s = r.length; a < s; ++a)
        if (r[a].name === e) {
          r = r.slice(), r.splice(a, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function So(t, e, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var o = W(this, t), a = o.tween;
    if (a !== r) {
      i = (r = a).slice();
      for (var s = { name: e, value: n }, f = 0, u = i.length; f < u; ++f)
        if (i[f].name === e) {
          i[f] = s;
          break;
        }
      f === u && i.push(s);
    }
    o.tween = i;
  };
}
function Eo(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = P(this.node(), n).tween, i = 0, o = r.length, a; i < o; ++i)
      if ((a = r[i]).name === t)
        return a.value;
    return null;
  }
  return this.each((e == null ? Ao : So)(n, t, e));
}
function _e(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = W(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return P(i, r).value[e];
  };
}
function pn(t, e) {
  var n;
  return (typeof e == "number" ? Q : e instanceof mt ? Ie : (n = mt(e)) ? (e = n, Ie) : lo)(t, e);
}
function Mo(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function To(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Co(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttribute(t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Io(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttributeNS(t.space, t.local);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Lo(t, e, n) {
  var r, i, o;
  return function() {
    var a, s = n(this), f;
    return s == null ? void this.removeAttribute(t) : (a = this.getAttribute(t), f = s + "", a === f ? null : a === r && f === i ? o : (i = f, o = e(r = a, s)));
  };
}
function Ho(t, e, n) {
  var r, i, o;
  return function() {
    var a, s = n(this), f;
    return s == null ? void this.removeAttributeNS(t.space, t.local) : (a = this.getAttributeNS(t.space, t.local), f = s + "", a === f ? null : a === r && f === i ? o : (i = f, o = e(r = a, s)));
  };
}
function Fo(t, e) {
  var n = Vt(t), r = n === "transform" ? po : pn;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Ho : Lo)(n, r, _e(this, "attr." + t, e)) : e == null ? (n.local ? To : Mo)(n) : (n.local ? Io : Co)(n, r, e));
}
function Do(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function qo(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Ro(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && qo(t, o)), n;
  }
  return i._value = e, i;
}
function Po(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Do(t, o)), n;
  }
  return i._value = e, i;
}
function Oo(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (e == null)
    return this.tween(n, null);
  if (typeof e != "function")
    throw new Error();
  var r = Vt(t);
  return this.tween(n, (r.local ? Ro : Po)(r, e));
}
function Vo(t, e) {
  return function() {
    me(this, t).delay = +e.apply(this, arguments);
  };
}
function Wo(t, e) {
  return e = +e, function() {
    me(this, t).delay = e;
  };
}
function Xo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Vo : Wo)(e, t)) : P(this.node(), e).delay;
}
function Bo(t, e) {
  return function() {
    W(this, t).duration = +e.apply(this, arguments);
  };
}
function Yo(t, e) {
  return e = +e, function() {
    W(this, t).duration = e;
  };
}
function Go(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Bo : Yo)(e, t)) : P(this.node(), e).duration;
}
function Uo(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    W(this, t).ease = e;
  };
}
function Ko(t) {
  var e = this._id;
  return arguments.length ? this.each(Uo(e, t)) : P(this.node(), e).ease;
}
function Zo(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    W(this, t).ease = n;
  };
}
function Qo(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(Zo(this._id, t));
}
function Jo(t) {
  typeof t != "function" && (t = Ue(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, s = r[i] = [], f, u = 0; u < a; ++u)
      (f = o[u]) && t.call(f, f.__data__, u, o) && s.push(f);
  return new K(r, this._parents, this._name, this._id);
}
function jo(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), a = new Array(r), s = 0; s < o; ++s)
    for (var f = e[s], u = n[s], l = f.length, d = a[s] = new Array(l), c, p = 0; p < l; ++p)
      (c = f[p] || u[p]) && (d[p] = c);
  for (; s < r; ++s)
    a[s] = e[s];
  return new K(a, this._parents, this._name, this._id);
}
function ta(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function ea(t, e, n) {
  var r, i, o = ta(e) ? me : W;
  return function() {
    var a = o(this, t), s = a.on;
    s !== r && (i = (r = s).copy()).on(e, n), a.on = i;
  };
}
function na(t, e) {
  var n = this._id;
  return arguments.length < 2 ? P(this.node(), n).on.on(t) : this.each(ea(n, t, e));
}
function ra(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition)
      if (+n !== t)
        return;
    e && e.removeChild(this);
  };
}
function ia() {
  return this.on("end.remove", ra(this._id));
}
function oa(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = fe(t));
  for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
    for (var s = r[a], f = s.length, u = o[a] = new Array(f), l, d, c = 0; c < f; ++c)
      (l = s[c]) && (d = t.call(l, l.__data__, c, s)) && ("__data__" in l && (d.__data__ = l.__data__), u[c] = d, Xt(u[c], e, n, c, u, P(l, n)));
  return new K(o, this._parents, e, n);
}
function aa(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ge(t));
  for (var r = this._groups, i = r.length, o = [], a = [], s = 0; s < i; ++s)
    for (var f = r[s], u = f.length, l, d = 0; d < u; ++d)
      if (l = f[d]) {
        for (var c = t.call(l, l.__data__, d, f), p, m = P(l, n), _ = 0, x = c.length; _ < x; ++_)
          (p = c[_]) && Xt(p, e, n, _, c, m);
        o.push(c), a.push(l);
      }
  return new K(o, a, e, n);
}
var ua = xt.prototype.constructor;
function sa() {
  return new ua(this._groups, this._parents);
}
function la(t, e) {
  var n, r, i;
  return function() {
    var o = ut(this, t), a = (this.style.removeProperty(t), ut(this, t));
    return o === a ? null : o === n && a === r ? i : i = e(n = o, r = a);
  };
}
function gn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ca(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = ut(this, t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function fa(t, e, n) {
  var r, i, o;
  return function() {
    var a = ut(this, t), s = n(this), f = s + "";
    return s == null && (f = s = (this.style.removeProperty(t), ut(this, t))), a === f ? null : a === r && f === i ? o : (i = f, o = e(r = a, s));
  };
}
function ha(t, e) {
  var n, r, i, o = "style." + e, a = "end." + o, s;
  return function() {
    var f = W(this, t), u = f.on, l = f.value[o] == null ? s || (s = gn(e)) : void 0;
    (u !== n || i !== l) && (r = (n = u).copy()).on(a, i = l), f.on = r;
  };
}
function da(t, e, n) {
  var r = (t += "") == "transform" ? ho : pn;
  return e == null ? this.styleTween(t, la(t, r)).on("end.style." + t, gn(t)) : typeof e == "function" ? this.styleTween(t, fa(t, r, _e(this, "style." + t, e))).each(ha(this._id, t)) : this.styleTween(t, ca(t, r, e), n).on("end.style." + t, null);
}
function pa(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function ga(t, e, n) {
  var r, i;
  function o() {
    var a = e.apply(this, arguments);
    return a !== i && (r = (i = a) && pa(t, a, n)), r;
  }
  return o._value = e, o;
}
function ya(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, ga(t, e, n ?? ""));
}
function ma(t) {
  return function() {
    this.textContent = t;
  };
}
function _a(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function xa(t) {
  return this.tween("text", typeof t == "function" ? _a(_e(this, "text", t)) : ma(t == null ? "" : t + ""));
}
function wa(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function va(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && wa(i)), e;
  }
  return r._value = t, r;
}
function ba(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, va(t));
}
function ka() {
  for (var t = this._name, e = this._id, n = yn(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], s = a.length, f, u = 0; u < s; ++u)
      if (f = a[u]) {
        var l = P(f, e);
        Xt(f, t, n, u, a, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new K(r, this._parents, t, n);
}
function Na() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, a) {
    var s = { value: a }, f = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var u = W(this, r), l = u.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(s), e._.interrupt.push(s), e._.end.push(f)), u.on = e;
    }), i === 0 && o();
  });
}
var $a = 0;
function K(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function yn() {
  return ++$a;
}
var Y = xt.prototype;
K.prototype = {
  constructor: K,
  select: oa,
  selectAll: aa,
  selectChild: Y.selectChild,
  selectChildren: Y.selectChildren,
  filter: Jo,
  merge: jo,
  selection: sa,
  transition: ka,
  call: Y.call,
  nodes: Y.nodes,
  node: Y.node,
  size: Y.size,
  empty: Y.empty,
  each: Y.each,
  on: na,
  attr: Fo,
  attrTween: Oo,
  style: da,
  styleTween: ya,
  text: xa,
  textTween: ba,
  remove: ia,
  tween: Eo,
  delay: Xo,
  duration: Go,
  ease: Ko,
  easeVarying: Qo,
  end: Na,
  [Symbol.iterator]: Y[Symbol.iterator]
};
function za(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Aa = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: za
};
function Sa(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Ea(t) {
  var e, n;
  t instanceof K ? (e = t._id, t = t._name) : (e = yn(), (n = Aa).time = ye(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], s = a.length, f, u = 0; u < s; ++u)
      (f = a[u]) && Xt(f, t, e, u, a, n || Sa(f, e));
  return new K(r, this._parents, t, e);
}
xt.prototype.interrupt = zo;
xt.prototype.transition = Ea;
const Et = (t) => () => t;
function Ma(t, {
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
var mn = new U(1, 0, 0);
U.prototype;
function Jt(t) {
  t.stopImmediatePropagation();
}
function ht(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Ta(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Ca() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Pe() {
  return this.__zoom || mn;
}
function Ia(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function La() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ha(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], o = t.invertY(e[0][1]) - n[0][1], a = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)
  );
}
function Fa() {
  var t = Ta, e = Ca, n = Ha, r = Ia, i = La, o = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, f = _o, u = pe("start", "zoom", "end"), l, d, c, p = 500, m = 150, _ = 0, x = 10;
  function y(h) {
    h.property("__zoom", Pe).on("wheel.zoom", kt, { passive: !1 }).on("mousedown.zoom", Nt).on("dblclick.zoom", $t).filter(i).on("touchstart.zoom", wn).on("touchmove.zoom", vn).on("touchend.zoom touchcancel.zoom", bn).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
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
      return n(mn.translate(S[0], S[1]).scale($.k).translate(
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
      var k = this, N = arguments, $ = C(k, N).event(b), S = e.apply(k, N), M = g == null ? z(S) : typeof g == "function" ? g.apply(k, N) : g, O = Math.max(S[1][0] - S[0][0], S[1][1] - S[0][1]), L = k.__zoom, D = typeof v == "function" ? v.apply(k, N) : v, X = f(L.invert(M).concat(O / L.k), D.invert(M).concat(O / D.k));
      return function(q) {
        if (q === 1)
          q = D;
        else {
          var B = X(q), Bt = O / B[2];
          q = new U(Bt, M[0] - B[0] * Bt, M[1] - B[1] * Bt);
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
      var v = G(this.that).datum();
      u.call(
        h,
        this.that,
        new Ma(h, {
          sourceEvent: this.sourceEvent,
          target: y,
          transform: this.that.__zoom,
          dispatch: u
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
    var g = h.currentTarget, b = C(this, v, !0).event(h), k = G(h.view).on("mousemove.zoom", M, !0).on("mouseup.zoom", O, !0), N = j(h, g), $ = h.clientX, S = h.clientY;
    Xi(h.view), Jt(h), b.mouse = [N, this.__zoom.invert(N)], Lt(this), b.start();
    function M(L) {
      if (ht(L), !b.moved) {
        var D = L.clientX - $, X = L.clientY - S;
        b.moved = D * D + X * X > _;
      }
      b.event(L).zoom("mouse", n(A(b.that.__zoom, b.mouse[0] = j(L, g), b.mouse[1]), b.extent, a));
    }
    function O(L) {
      k.on("mousemove.zoom mouseup.zoom", null), Bi(L.view, b.moved), ht(L), b.event(L).end();
    }
  }
  function $t(h, ...v) {
    if (t.apply(this, arguments)) {
      var g = this.__zoom, b = j(h.changedTouches ? h.changedTouches[0] : h, this), k = g.invert(b), N = g.k * (h.shiftKey ? 0.5 : 2), $ = n(A(w(g, N), b, k), e.apply(this, v), a);
      ht(h), s > 0 ? G(this).transition().duration(s).call(E, $, b, h) : G(this).call(y.transform, $, b, h);
    }
  }
  function wn(h, ...v) {
    if (t.apply(this, arguments)) {
      var g = h.touches, b = g.length, k = C(this, v, h.changedTouches.length === b).event(h), N, $, S, M;
      for (Jt(h), $ = 0; $ < b; ++$)
        S = g[$], M = j(S, this), M = [M, this.__zoom.invert(M), S.identifier], k.touch0 ? !k.touch1 && k.touch0[2] !== M[2] && (k.touch1 = M, k.taps = 0) : (k.touch0 = M, N = !0, k.taps = 1 + !!l);
      l && (l = clearTimeout(l)), N && (k.taps < 2 && (d = M[0], l = setTimeout(function() {
        l = null;
      }, p)), Lt(this), k.start());
    }
  }
  function vn(h, ...v) {
    if (this.__zooming) {
      var g = C(this, v).event(h), b = h.changedTouches, k = b.length, N, $, S, M;
      for (ht(h), N = 0; N < k; ++N)
        $ = b[N], S = j($, this), g.touch0 && g.touch0[2] === $.identifier ? g.touch0[0] = S : g.touch1 && g.touch1[2] === $.identifier && (g.touch1[0] = S);
      if ($ = g.that.__zoom, g.touch1) {
        var O = g.touch0[0], L = g.touch0[1], D = g.touch1[0], X = g.touch1[1], q = (q = D[0] - O[0]) * q + (q = D[1] - O[1]) * q, B = (B = X[0] - L[0]) * B + (B = X[1] - L[1]) * B;
        $ = w($, Math.sqrt(q / B)), S = [(O[0] + D[0]) / 2, (O[1] + D[1]) / 2], M = [(L[0] + X[0]) / 2, (L[1] + X[1]) / 2];
      } else if (g.touch0)
        S = g.touch0[0], M = g.touch0[1];
      else
        return;
      g.zoom("touch", n(A($, S, M), g.extent, a));
    }
  }
  function bn(h, ...v) {
    if (this.__zooming) {
      var g = C(this, v).event(h), b = h.changedTouches, k = b.length, N, $;
      for (Jt(h), c && clearTimeout(c), c = setTimeout(function() {
        c = null;
      }, p), N = 0; N < k; ++N)
        $ = b[N], g.touch0 && g.touch0[2] === $.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === $.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0)
        g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && ($ = j($, this), Math.hypot(d[0] - $[0], d[1] - $[1]) < x)) {
        var S = G(this).on("dblclick.zoom");
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
    return arguments.length ? (s = +h, y) : s;
  }, y.interpolate = function(h) {
    return arguments.length ? (f = h, y) : f;
  }, y.on = function() {
    var h = u.on.apply(u, arguments);
    return h === u ? y : h;
  }, y.clickDistance = function(h) {
    return arguments.length ? (_ = (h = +h) * h, y) : Math.sqrt(_);
  }, y.tapDistance = function(h) {
    return arguments.length ? (x = +h, y) : x;
  }, y;
}
const J = {
  hierarchy: ce,
  stratify: Kn,
  tree: nr,
  treemap: ur,
  select: G,
  selectAll: Pi,
  zoom: Fa
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
}, xn = (t, e, n) => n.isHorizontal ? "translate(" + e + "," + t + ")" : "translate(" + t + "," + e + ")";
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
const Da = (t) => {
  const {
    htmlId: e,
    isHorizontal: n,
    hasPan: r,
    hasZoom: i,
    mainAxisNodeSpacing: o,
    nodeHeight: a,
    nodeWidth: s,
    marginBottom: f,
    marginLeft: u,
    marginRight: l,
    marginTop: d
  } = t, c = {
    top: d,
    right: l,
    bottom: f,
    left: u
  }, { areaHeight: p, areaWidth: m } = _n(t.htmlId), _ = m - c.left - c.right, x = p - c.top - c.bottom, y = J.select("#" + e).append("svg").attr("width", m).attr("height", p), w = y.append("g"), A = J.zoom().on("zoom", (E) => {
    w.attr("transform", () => E.transform);
  });
  return y.call(A), r || y.on("mousedown.zoom", null).on("touchstart.zoom", null).on("touchmove.zoom", null).on("touchend.zoom", null), i || y.on("wheel.zoom", null).on("mousewheel.zoom", null).on("mousemove.zoom", null).on("DOMMouseScroll.zoom", null).on("dblclick.zoom", null), w.append("g").attr(
    "transform",
    o === "auto" ? "translate(0,0)" : n ? "translate(" + c.left + "," + (c.top + x / 2 - a / 2) + ")" : "translate(" + (c.left + _ / 2 - s / 2) + "," + c.top + ")"
  );
}, xe = (t, e, n) => {
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
}, Oe = (t, e, n) => t > e ? n : t < e ? -n : 0, qa = (t, e, n, r) => t.enter().insert("path", "g").attr("class", "link").attr("d", (i) => {
  const o = vt(
    n,
    r,
    i.id
  ), a = {
    x: o.x0,
    y: o.y0
  };
  return xe(a, a, e);
}).attr("fill", "none").attr(
  "stroke-width",
  (i) => e.linkWidth(i)
  // Pass the correct `d` object to linkWidth
).attr(
  "stroke",
  (i) => e.linkColor(i)
  // Pass the correct `d` object to linkColor
), Ra = (t, e, n, r) => {
  t.exit().transition().duration(e.duration).style("opacity", 0).attr("d", (i) => {
    const o = vt(
      r,
      n,
      i.id
    ), a = {
      x: o.x0,
      y: o.y0
    };
    return xe(a, a, e);
  }).remove();
}, Pa = (t, e, n) => {
  var i;
  const r = t.merge(e);
  if (r.transition().duration(n.duration).attr("d", (o) => xe(o, o.parent, n)).attr("fill", "none").attr("stroke-width", (o) => n.linkWidth(o)).attr("stroke", (o) => n.linkColor(o)), n.linkLabel) {
    const o = (i = r.node()) == null ? void 0 : i.parentNode, s = G(o).selectAll("text.link-label").data(r.data(), (u, l) => `link-label-${l}`);
    s.exit().remove(), s.enter().append("text").attr("class", "link-label").attr("text-anchor", "middle").attr("dominant-baseline", "middle").attr("fill", n.linkLabel.color || "#000000").attr("font-size", n.linkLabel.fontSize || 12).attr("pointer-events", "none").merge(s).attr("x", function(u) {
      return n.isHorizontal ? u.parent.y + (u.y - u.parent.y) - n.nodeWidth / 4 : u.parent.x + (u.x - u.parent.x) + n.nodeWidth / 2;
    }).attr("y", function(u) {
      return n.isHorizontal ? u.parent.x + (u.x - u.parent.x) + n.nodeHeight / 2 : u.parent.y + (u.y - u.parent.y) - n.nodeHeight / 2;
    }).html(function(u) {
      const l = {
        ...u.parent,
        data: u.parent.data,
        settings: n
      }, d = {
        ...u,
        data: u.data,
        settings: n
      };
      return n.linkLabel.render(l, d);
    });
  }
}, Oa = (t, e, n, r) => {
  const i = t.enter().append("g").attr("class", "node").attr("id", (o) => o == null ? void 0 : o.id).attr("transform", (o) => {
    const a = vt(
      n,
      r,
      o.id
    );
    return xn(
      a.x0,
      a.y0,
      e
    );
  });
  return i.append("foreignObject").attr("width", e.nodeWidth).attr("height", e.nodeHeight), i;
}, Va = (t, e, n, r) => {
  const i = t.exit().transition().duration(e.duration).style("opacity", 0).attr("transform", (o) => {
    const a = vt(
      r,
      n,
      o.id
    );
    return xn(
      a.x0,
      a.y0,
      e
    );
  }).remove();
  i.select("rect").style("fill-opacity", 1e-6), i.select("circle").attr("r", 1e-6), i.select("text").style("fill-opacity", 1e-6);
}, Wa = (t, e, n) => {
  const r = t.merge(e);
  r.transition().duration(n.duration).attr("transform", (i) => n.isHorizontal ? "translate(" + i.y + "," + i.x + ")" : "translate(" + i.x + "," + i.y + ")"), r.select("foreignObject").attr("width", n.nodeWidth).attr("height", n.nodeHeight).style("overflow", "visible").on("click", (i, o) => n.onNodeClick({ ...o, settings: n })).on("mouseenter", (i, o) => n.onNodeMouseEnter({ ...o, settings: n })).on("mouseleave", (i, o) => n.onNodeMouseLeave({ ...o, settings: n })).html((i) => n.renderNode({ ...i, settings: n }));
}, Xa = (t, e) => {
  const { idKey: n, relationnalField: r, hasFlatData: i } = e;
  return i ? J.stratify().id((o) => o[n]).parentId((o) => o[r])(t) : J.hierarchy(t, (o) => o[r]);
}, Ba = (t) => {
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
  create: Ya
};
typeof window < "u" && (window.Treeviz = we);
function Ya(t) {
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
  function i(u, l) {
    const d = l.descendants(), c = l.descendants().slice(1), { mainAxisNodeSpacing: p } = n;
    p !== "auto" && d.forEach((w) => {
      w.y = w.depth * n.nodeWidth * p;
    }), d.forEach((w) => {
      const A = r.find(
        (z) => z.id === w.id
      );
      w.x0 = A ? A.x0 : w.x, w.y0 = A ? A.y0 : w.y;
    });
    const m = u.selectAll("g.node").data(d, (w) => w[n.idKey]), _ = Oa(m, n, d, r);
    Wa(_, m, n), Va(m, n, d, r);
    const x = u.selectAll("path.link").data(c, (w) => w.id), y = qa(x, n, d, r);
    Pa(y, x, n), Ra(x, n, d, r), r = [...d];
  }
  function o(u, l) {
    it.add(n.duration, () => {
      l && (n = { ...n, ...l });
      const d = Xa(u, n), p = Ba(n)(d);
      i(f, p);
    });
  }
  function a(u) {
    const l = u ? document.querySelector(`#${n.htmlId} svg g`) : document.querySelector(`#${n.htmlId}`);
    if (l)
      for (; l.firstChild; )
        l.removeChild(l.firstChild);
    r = [];
  }
  const s = { refresh: o, clean: a }, f = Da(n);
  return s;
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
], Ga = [
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
], Ua = [
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
  linkShape: "curve",
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
var Ve = !0;
const I = document.querySelector("#add"), T = document.querySelector("#remove"), jt = document.querySelector("#doTasks");
I == null || I.addEventListener("click", function() {
  console.log("addButton clicked"), Ve ? Ot.refresh(Ga) : Ot.refresh(Ua), Ve = !1;
});
T == null || T.addEventListener("click", function() {
  console.log("removeButton clicked"), Ot.refresh(bt);
});
jt == null || jt.addEventListener("click", function() {
  I == null || I.click(), T == null || T.click(), I == null || I.click(), T == null || T.click(), T == null || T.click(), I == null || I.click(), T == null || T.click(), I == null || I.click(), I == null || I.click(), T == null || T.click(), T == null || T.click();
});
var Ka = we.create({
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
Ka.refresh(bt);
