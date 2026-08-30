var En = Object.defineProperty;
var Mn = (t, e, n) => e in t ? En(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var rt = (t, e, n) => (Mn(t, typeof e != "symbol" ? e + "" : e, n), n);
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
function Tn(t) {
  var e = 0, n = t.children, r = n && n.length;
  if (!r)
    e = 1;
  else
    for (; --r >= 0; )
      e += n[r].value;
  t.value = e;
}
function Cn() {
  return this.eachAfter(Tn);
}
function In(t, e) {
  let n = -1;
  for (const r of this)
    t.call(e, r, ++n, this);
  return this;
}
function Ln(t, e) {
  for (var n = this, r = [n], i, o, a = -1; n = r.pop(); )
    if (t.call(e, n, ++a, this), i = n.children)
      for (o = i.length - 1; o >= 0; --o)
        r.push(i[o]);
  return this;
}
function Hn(t, e) {
  for (var n = this, r = [n], i = [], o, a, s, f = -1; n = r.pop(); )
    if (i.push(n), o = n.children)
      for (a = 0, s = o.length; a < s; ++a)
        r.push(o[a]);
  for (; n = i.pop(); )
    t.call(e, n, ++f, this);
  return this;
}
function qn(t, e) {
  let n = -1;
  for (const r of this)
    if (t.call(e, r, ++n, this))
      return r;
}
function Dn(t) {
  return this.eachAfter(function(e) {
    for (var n = +t(e.data) || 0, r = e.children, i = r && r.length; --i >= 0; )
      n += r[i].value;
    e.value = n;
  });
}
function Fn(t) {
  return this.eachBefore(function(e) {
    e.children && e.children.sort(t);
  });
}
function Rn(t) {
  for (var e = this, n = Pn(e, t), r = [e]; e !== n; )
    e = e.parent, r.push(e);
  for (var i = r.length; t !== n; )
    r.splice(i, 0, t), t = t.parent;
  return r;
}
function Pn(t, e) {
  if (t === e)
    return t;
  var n = t.ancestors(), r = e.ancestors(), i = null;
  for (t = n.pop(), e = r.pop(); t === e; )
    i = t, t = n.pop(), e = r.pop();
  return i;
}
function On() {
  for (var t = this, e = [t]; t = t.parent; )
    e.push(t);
  return e;
}
function Vn() {
  return Array.from(this);
}
function Bn() {
  var t = [];
  return this.eachBefore(function(e) {
    e.children || t.push(e);
  }), t;
}
function Xn() {
  var t = this, e = [];
  return t.each(function(n) {
    n !== t && e.push({ source: n.parent, target: n });
  }), e;
}
function* Wn() {
  var t = this, e, n = [t], r, i, o;
  do
    for (e = n.reverse(), n = []; t = e.pop(); )
      if (yield t, r = t.children)
        for (i = 0, o = r.length; i < o; ++i)
          n.push(r[i]);
  while (n.length);
}
function he(t, e) {
  t instanceof Map ? (t = [void 0, t], e === void 0 && (e = Un)) : e === void 0 && (e = Gn);
  for (var n = new at(t), r, i = [n], o, a, s, f; r = i.pop(); )
    if ((a = e(r.data)) && (f = (a = Array.from(a)).length))
      for (r.children = a, s = f - 1; s >= 0; --s)
        i.push(o = a[s] = new at(a[s])), o.parent = r, o.depth = r.depth + 1;
  return n.eachBefore(Ge);
}
function Yn() {
  return he(this).eachBefore(Kn);
}
function Gn(t) {
  return t.children;
}
function Un(t) {
  return Array.isArray(t) ? t[1] : null;
}
function Kn(t) {
  t.data.value !== void 0 && (t.value = t.data.value), t.data = t.data.data;
}
function Ge(t) {
  var e = 0;
  do
    t.height = e;
  while ((t = t.parent) && t.height < ++e);
}
function at(t) {
  this.data = t, this.depth = this.height = 0, this.parent = null;
}
at.prototype = he.prototype = {
  constructor: at,
  count: Cn,
  each: In,
  eachAfter: Hn,
  eachBefore: Ln,
  find: qn,
  sum: Dn,
  sort: Fn,
  path: Rn,
  ancestors: On,
  descendants: Vn,
  leaves: Bn,
  links: Xn,
  copy: Yn,
  [Symbol.iterator]: Wn
};
function Gt(t) {
  return t == null ? null : Ue(t);
}
function Ue(t) {
  if (typeof t != "function")
    throw new Error();
  return t;
}
function ct() {
  return 0;
}
function ft(t) {
  return function() {
    return t;
  };
}
function Zn(t) {
  t.x0 = Math.round(t.x0), t.y0 = Math.round(t.y0), t.x1 = Math.round(t.x1), t.y1 = Math.round(t.y1);
}
function Qn(t, e, n, r, i) {
  for (var o = t.children, a, s = -1, f = o.length, u = t.value && (r - e) / t.value; ++s < f; )
    a = o[s], a.y0 = n, a.y1 = i, a.x0 = e, a.x1 = e += a.value * u;
}
var Jn = { depth: -1 }, ke = {}, Ut = {};
function jn(t) {
  return t.id;
}
function tr(t) {
  return t.parentId;
}
function er() {
  var t = jn, e = tr, n;
  function r(i) {
    var o = Array.from(i), a = t, s = e, f, u, l, d, c, p, m, _, x = /* @__PURE__ */ new Map();
    if (n != null) {
      const g = o.map((z, E) => nr(n(z, E, i))), w = g.map($e), A = new Set(g).add("");
      for (const z of w)
        A.has(z) || (A.add(z), g.push(z), w.push($e(z)), o.push(Ut));
      a = (z, E) => g[E], s = (z, E) => w[E];
    }
    for (l = 0, f = o.length; l < f; ++l)
      u = o[l], p = o[l] = new at(u), (m = a(u, l, i)) != null && (m += "") && (_ = p.id = m, x.set(_, x.has(_) ? ke : p)), (m = s(u, l, i)) != null && (m += "") && (p.parent = m);
    for (l = 0; l < f; ++l)
      if (p = o[l], m = p.parent) {
        if (c = x.get(m), !c)
          throw new Error("missing: " + m);
        if (c === ke)
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
      for (; d.data === Ut && d.children.length === 1; )
        d = d.children[0], --f;
      for (let g = o.length - 1; g >= 0 && (p = o[g], p.data === Ut); --g)
        p.data = null;
    }
    if (d.parent = Jn, d.eachBefore(function(g) {
      g.depth = g.parent.depth + 1, --f;
    }).eachBefore(Ge), d.parent = null, f > 0)
      throw new Error("cycle");
    return d;
  }
  return r.id = function(i) {
    return arguments.length ? (t = Gt(i), r) : t;
  }, r.parentId = function(i) {
    return arguments.length ? (e = Gt(i), r) : e;
  }, r.path = function(i) {
    return arguments.length ? (n = Gt(i), r) : n;
  }, r;
}
function nr(t) {
  t = `${t}`;
  let e = t.length;
  return ne(t, e - 1) && !ne(t, e - 2) && (t = t.slice(0, -1)), t[0] === "/" ? t : `/${t}`;
}
function $e(t) {
  let e = t.length;
  if (e < 2)
    return "";
  for (; --e > 1 && !ne(t, e); )
    ;
  return t.slice(0, e);
}
function ne(t, e) {
  if (t[e] === "/") {
    let n = 0;
    for (; e > 0 && t[--e] === "\\"; )
      ++n;
    if (!(n & 1))
      return !0;
  }
  return !1;
}
function rr(t, e) {
  return t.parent === e.parent ? 1 : 2;
}
function Kt(t) {
  var e = t.children;
  return e ? e[0] : t.t;
}
function Zt(t) {
  var e = t.children;
  return e ? e[e.length - 1] : t.t;
}
function ir(t, e, n) {
  var r = n / (e.i - t.i);
  e.c -= r, e.s += n, t.c += r, e.z += n, e.m += n;
}
function or(t) {
  for (var e = 0, n = 0, r = t.children, i = r.length, o; --i >= 0; )
    o = r[i], o.z += e, o.m += e, e += o.s + (n += o.c);
}
function ar(t, e, n) {
  return t.a.parent === e.parent ? t.a : n;
}
function Mt(t, e) {
  this._ = t, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = e;
}
Mt.prototype = Object.create(at.prototype);
function ur(t) {
  for (var e = new Mt(t, 0), n, r = [e], i, o, a, s; n = r.pop(); )
    if (o = n._.children)
      for (n.children = new Array(s = o.length), a = s - 1; a >= 0; --a)
        r.push(i = n.children[a] = new Mt(o[a], a)), i.parent = n;
  return (e.parent = new Mt(null, 0)).children = [e], e;
}
function sr() {
  var t = rr, e = 1, n = 1, r = null;
  function i(u) {
    var l = ur(u);
    if (l.eachAfter(o), l.parent.m = -l.z, l.eachBefore(a), r)
      u.eachBefore(f);
    else {
      var d = u, c = u, p = u;
      u.eachBefore(function(w) {
        w.x < d.x && (d = w), w.x > c.x && (c = w), w.depth > p.depth && (p = w);
      });
      var m = d === c ? 1 : t(d, c) / 2, _ = m - d.x, x = e / (c.x + m + _), g = n / (p.depth || 1);
      u.eachBefore(function(w) {
        w.x = (w.x + _) * x, w.y = w.depth * g;
      });
    }
    return u;
  }
  function o(u) {
    var l = u.children, d = u.parent.children, c = u.i ? d[u.i - 1] : null;
    if (l) {
      or(u);
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
      for (var c = u, p = u, m = l, _ = c.parent.children[0], x = c.m, g = p.m, w = m.m, A = _.m, z; m = Zt(m), c = Kt(c), m && c; )
        _ = Kt(_), p = Zt(p), p.a = u, z = m.z + w - c.z - x + t(m._, c._), z > 0 && (ir(ar(m, u, d), u, z), x += z, g += z), w += m.m, x += c.m, A += _.m, g += p.m;
      m && !Zt(p) && (p.t = m, p.m += w - g), c && !Kt(_) && (_.t = c, _.m += x - A, d = u);
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
function lr(t, e, n, r, i) {
  for (var o = t.children, a, s = -1, f = o.length, u = t.value && (i - n) / t.value; ++s < f; )
    a = o[s], a.x0 = e, a.x1 = r, a.y0 = n, a.y1 = n += a.value * u;
}
var cr = (1 + Math.sqrt(5)) / 2;
function fr(t, e, n, r, i, o) {
  for (var a = [], s = e.children, f, u, l = 0, d = 0, c = s.length, p, m, _ = e.value, x, g, w, A, z, E, C; l < c; ) {
    p = i - n, m = o - r;
    do
      x = s[d++].value;
    while (!x && d < c);
    for (g = w = x, E = Math.max(m / p, p / m) / (_ * t), C = x * x * E, z = Math.max(w / C, C / g); d < c; ++d) {
      if (x += u = s[d].value, u < g && (g = u), u > w && (w = u), C = x * x * E, A = Math.max(w / C, C / g), A > z) {
        x -= u;
        break;
      }
      z = A;
    }
    a.push(f = { value: x, dice: p < m, children: s.slice(l, d) }), f.dice ? Qn(f, n, r, i, _ ? r += m * x / _ : o) : lr(f, n, r, _ ? n += p * x / _ : i, o), _ -= x, l = d;
  }
  return a;
}
const hr = function t(e) {
  function n(r, i, o, a, s) {
    fr(e, r, i, o, a, s);
  }
  return n.ratio = function(r) {
    return t((r = +r) > 1 ? r : 1);
  }, n;
}(cr);
function dr() {
  var t = hr, e = !1, n = 1, r = 1, i = [0], o = ct, a = ct, s = ct, f = ct, u = ct;
  function l(c) {
    return c.x0 = c.y0 = 0, c.x1 = n, c.y1 = r, c.eachBefore(d), i = [0], e && c.eachBefore(Zn), c;
  }
  function d(c) {
    var p = i[c.depth], m = c.x0 + p, _ = c.y0 + p, x = c.x1 - p, g = c.y1 - p;
    x < m && (m = x = (m + x) / 2), g < _ && (_ = g = (_ + g) / 2), c.x0 = m, c.y0 = _, c.x1 = x, c.y1 = g, c.children && (p = i[c.depth + 1] = o(c) / 2, m += u(c) - p, _ += a(c) - p, x -= s(c) - p, g -= f(c) - p, x < m && (m = x = (m + x) / 2), g < _ && (_ = g = (_ + g) / 2), t(c, m, _, x, g));
  }
  return l.round = function(c) {
    return arguments.length ? (e = !!c, l) : e;
  }, l.size = function(c) {
    return arguments.length ? (n = +c[0], r = +c[1], l) : [n, r];
  }, l.tile = function(c) {
    return arguments.length ? (t = Ue(c), l) : t;
  }, l.padding = function(c) {
    return arguments.length ? l.paddingInner(c).paddingOuter(c) : l.paddingInner();
  }, l.paddingInner = function(c) {
    return arguments.length ? (o = typeof c == "function" ? c : ft(+c), l) : o;
  }, l.paddingOuter = function(c) {
    return arguments.length ? l.paddingTop(c).paddingRight(c).paddingBottom(c).paddingLeft(c) : l.paddingTop();
  }, l.paddingTop = function(c) {
    return arguments.length ? (a = typeof c == "function" ? c : ft(+c), l) : a;
  }, l.paddingRight = function(c) {
    return arguments.length ? (s = typeof c == "function" ? c : ft(+c), l) : s;
  }, l.paddingBottom = function(c) {
    return arguments.length ? (f = typeof c == "function" ? c : ft(+c), l) : f;
  }, l.paddingLeft = function(c) {
    return arguments.length ? (u = typeof c == "function" ? c : ft(+c), l) : u;
  }, l;
}
var re = "http://www.w3.org/1999/xhtml";
const Ne = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: re,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Bt(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Ne.hasOwnProperty(e) ? { space: Ne[e], local: t } : t;
}
function pr(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === re && e.documentElement.namespaceURI === re ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function yr(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ke(t) {
  var e = Bt(t);
  return (e.local ? yr : pr)(e);
}
function gr() {
}
function de(t) {
  return t == null ? gr : function() {
    return this.querySelector(t);
  };
}
function mr(t) {
  typeof t != "function" && (t = de(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, s = r[i] = new Array(a), f, u, l = 0; l < a; ++l)
      (f = o[l]) && (u = t.call(f, f.__data__, l, o)) && ("__data__" in f && (u.__data__ = f.__data__), s[l] = u);
  return new H(r, this._parents);
}
function Ze(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function _r() {
  return [];
}
function Qe(t) {
  return t == null ? _r : function() {
    return this.querySelectorAll(t);
  };
}
function xr(t) {
  return function() {
    return Ze(t.apply(this, arguments));
  };
}
function wr(t) {
  typeof t == "function" ? t = xr(t) : t = Qe(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var a = e[o], s = a.length, f, u = 0; u < s; ++u)
      (f = a[u]) && (r.push(t.call(f, f.__data__, u, a)), i.push(f));
  return new H(r, i);
}
function Je(t) {
  return function() {
    return this.matches(t);
  };
}
function je(t) {
  return function(e) {
    return e.matches(t);
  };
}
var vr = Array.prototype.find;
function br(t) {
  return function() {
    return vr.call(this.children, t);
  };
}
function kr() {
  return this.firstElementChild;
}
function $r(t) {
  return this.select(t == null ? kr : br(typeof t == "function" ? t : je(t)));
}
var Nr = Array.prototype.filter;
function zr() {
  return Array.from(this.children);
}
function Ar(t) {
  return function() {
    return Nr.call(this.children, t);
  };
}
function Sr(t) {
  return this.selectAll(t == null ? zr : Ar(typeof t == "function" ? t : je(t)));
}
function Er(t) {
  typeof t != "function" && (t = Je(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, s = r[i] = [], f, u = 0; u < a; ++u)
      (f = o[u]) && t.call(f, f.__data__, u, o) && s.push(f);
  return new H(r, this._parents);
}
function tn(t) {
  return new Array(t.length);
}
function Mr() {
  return new H(this._enter || this._groups.map(tn), this._parents);
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
function Tr(t) {
  return function() {
    return t;
  };
}
function Cr(t, e, n, r, i, o) {
  for (var a = 0, s, f = e.length, u = o.length; a < u; ++a)
    (s = e[a]) ? (s.__data__ = o[a], r[a] = s) : n[a] = new Ht(t, o[a]);
  for (; a < f; ++a)
    (s = e[a]) && (i[a] = s);
}
function Ir(t, e, n, r, i, o, a) {
  var s, f, u = /* @__PURE__ */ new Map(), l = e.length, d = o.length, c = new Array(l), p;
  for (s = 0; s < l; ++s)
    (f = e[s]) && (c[s] = p = a.call(f, f.__data__, s, e) + "", u.has(p) ? i[s] = f : u.set(p, f));
  for (s = 0; s < d; ++s)
    p = a.call(t, o[s], s, o) + "", (f = u.get(p)) ? (r[s] = f, f.__data__ = o[s], u.delete(p)) : n[s] = new Ht(t, o[s]);
  for (s = 0; s < l; ++s)
    (f = e[s]) && u.get(c[s]) === f && (i[s] = f);
}
function Lr(t) {
  return t.__data__;
}
function Hr(t, e) {
  if (!arguments.length)
    return Array.from(this, Lr);
  var n = e ? Ir : Cr, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Tr(t));
  for (var o = i.length, a = new Array(o), s = new Array(o), f = new Array(o), u = 0; u < o; ++u) {
    var l = r[u], d = i[u], c = d.length, p = qr(t.call(l, l && l.__data__, u, r)), m = p.length, _ = s[u] = new Array(m), x = a[u] = new Array(m), g = f[u] = new Array(c);
    n(l, d, _, x, g, p, e);
    for (var w = 0, A = 0, z, E; w < m; ++w)
      if (z = _[w]) {
        for (w >= A && (A = w + 1); !(E = x[A]) && ++A < m; )
          ;
        z._next = E || null;
      }
  }
  return a = new H(a, r), a._enter = s, a._exit = f, a;
}
function qr(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Dr() {
  return new H(this._exit || this._groups.map(tn), this._parents);
}
function Fr(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Rr(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, a = Math.min(i, o), s = new Array(i), f = 0; f < a; ++f)
    for (var u = n[f], l = r[f], d = u.length, c = s[f] = new Array(d), p, m = 0; m < d; ++m)
      (p = u[m] || l[m]) && (c[m] = p);
  for (; f < i; ++f)
    s[f] = n[f];
  return new H(s, this._parents);
}
function Pr() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], a; --i >= 0; )
      (a = r[i]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function Or(t) {
  t || (t = Vr);
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
function Vr(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Br() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Xr() {
  return Array.from(this);
}
function Wr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var a = r[i];
      if (a)
        return a;
    }
  return null;
}
function Yr() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function Gr() {
  return !this.node();
}
function Ur(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, a = i.length, s; o < a; ++o)
      (s = i[o]) && t.call(s, s.__data__, o, i);
  return this;
}
function Kr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Zr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Qr(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Jr(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function jr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function ti(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function ei(t, e) {
  var n = Bt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Zr : Kr : typeof e == "function" ? n.local ? ti : jr : n.local ? Jr : Qr)(n, e));
}
function en(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function ni(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ri(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function ii(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function oi(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? ni : typeof e == "function" ? ii : ri)(t, e, n ?? "")) : ut(this.node(), t);
}
function ut(t, e) {
  return t.style.getPropertyValue(e) || en(t).getComputedStyle(t, null).getPropertyValue(e);
}
function ai(t) {
  return function() {
    delete this[t];
  };
}
function ui(t, e) {
  return function() {
    this[t] = e;
  };
}
function si(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function li(t, e) {
  return arguments.length > 1 ? this.each((e == null ? ai : typeof e == "function" ? si : ui)(t, e)) : this.node()[t];
}
function nn(t) {
  return t.trim().split(/^|\s+/);
}
function pe(t) {
  return t.classList || new rn(t);
}
function rn(t) {
  this._node = t, this._names = nn(t.getAttribute("class") || "");
}
rn.prototype = {
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
function on(t, e) {
  for (var n = pe(t), r = -1, i = e.length; ++r < i; )
    n.add(e[r]);
}
function an(t, e) {
  for (var n = pe(t), r = -1, i = e.length; ++r < i; )
    n.remove(e[r]);
}
function ci(t) {
  return function() {
    on(this, t);
  };
}
function fi(t) {
  return function() {
    an(this, t);
  };
}
function hi(t, e) {
  return function() {
    (e.apply(this, arguments) ? on : an)(this, t);
  };
}
function di(t, e) {
  var n = nn(t + "");
  if (arguments.length < 2) {
    for (var r = pe(this.node()), i = -1, o = n.length; ++i < o; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? hi : e ? ci : fi)(n, e));
}
function pi() {
  this.textContent = "";
}
function yi(t) {
  return function() {
    this.textContent = t;
  };
}
function gi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function mi(t) {
  return arguments.length ? this.each(t == null ? pi : (typeof t == "function" ? gi : yi)(t)) : this.node().textContent;
}
function _i() {
  this.innerHTML = "";
}
function xi(t) {
  return function() {
    this.innerHTML = t;
  };
}
function wi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function vi(t) {
  return arguments.length ? this.each(t == null ? _i : (typeof t == "function" ? wi : xi)(t)) : this.node().innerHTML;
}
function bi() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ki() {
  return this.each(bi);
}
function $i() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ni() {
  return this.each($i);
}
function zi(t) {
  var e = typeof t == "function" ? t : Ke(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Ai() {
  return null;
}
function Si(t, e) {
  var n = typeof t == "function" ? t : Ke(t), r = e == null ? Ai : typeof e == "function" ? e : de(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Ei() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Mi() {
  return this.each(Ei);
}
function Ti() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ci() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ii(t) {
  return this.select(t ? Ci : Ti);
}
function Li(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Hi(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function qi(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Di(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Fi(t, e, n) {
  return function() {
    var r = this.__on, i, o = Hi(e);
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
function Ri(t, e, n) {
  var r = qi(t + ""), i, o = r.length, a;
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
  for (s = e ? Fi : Di, i = 0; i < o; ++i)
    this.each(s(r[i], e, n));
  return this;
}
function un(t, e, n) {
  var r = en(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Pi(t, e) {
  return function() {
    return un(this, t, e);
  };
}
function Oi(t, e) {
  return function() {
    return un(this, t, e.apply(this, arguments));
  };
}
function Vi(t, e) {
  return this.each((typeof e == "function" ? Oi : Pi)(t, e));
}
function* Bi() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, a; i < o; ++i)
      (a = r[i]) && (yield a);
}
var ye = [null];
function H(t, e) {
  this._groups = t, this._parents = e;
}
function wt() {
  return new H([[document.documentElement]], ye);
}
function Xi() {
  return this;
}
H.prototype = wt.prototype = {
  constructor: H,
  select: mr,
  selectAll: wr,
  selectChild: $r,
  selectChildren: Sr,
  filter: Er,
  data: Hr,
  enter: Mr,
  exit: Dr,
  join: Fr,
  merge: Rr,
  selection: Xi,
  order: Pr,
  sort: Or,
  call: Br,
  nodes: Xr,
  node: Wr,
  size: Yr,
  empty: Gr,
  each: Ur,
  attr: ei,
  style: oi,
  property: li,
  classed: di,
  text: mi,
  html: vi,
  raise: ki,
  lower: Ni,
  append: zi,
  insert: Si,
  remove: Mi,
  clone: Ii,
  datum: Li,
  on: Ri,
  dispatch: Vi,
  [Symbol.iterator]: Bi
};
function V(t) {
  return typeof t == "string" ? new H([[document.querySelector(t)]], [document.documentElement]) : new H([[t]], ye);
}
function Wi(t) {
  let e;
  for (; e = t.sourceEvent; )
    t = e;
  return t;
}
function j(t, e) {
  if (t = Wi(t), e === void 0 && (e = t.currentTarget), e) {
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
function Yi(t) {
  return typeof t == "string" ? new H([document.querySelectorAll(t)], [document.documentElement]) : new H([Ze(t)], ye);
}
var Gi = { value: () => {
} };
function ge() {
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
function Ui(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Tt.prototype = ge.prototype = {
  constructor: Tt,
  on: function(t, e) {
    var n = this._, r = Ui(t + "", n), i, o = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++o < a; )
        if ((i = (t = r[o]).type) && (i = Ki(n[i], t.name)))
          return i;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++o < a; )
      if (i = (t = r[o]).type)
        n[i] = ze(n[i], t.name, e);
      else if (e == null)
        for (i in n)
          n[i] = ze(n[i], t.name, null);
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
function Ki(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function ze(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Gi, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
const ie = { capture: !0, passive: !1 };
function oe(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Zi(t) {
  var e = t.document.documentElement, n = V(t).on("dragstart.drag", oe, ie);
  "onselectstart" in e ? n.on("selectstart.drag", oe, ie) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Qi(t, e) {
  var n = t.document.documentElement, r = V(t).on("dragstart.drag", null);
  e && (r.on("click.drag", oe, ie), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function me(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function sn(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e)
    n[r] = e[r];
  return n;
}
function vt() {
}
var gt = 0.7, qt = 1 / gt, ot = "\\s*([+-]?\\d+)\\s*", mt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", B = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ji = /^#([0-9a-f]{3,8})$/, ji = new RegExp(`^rgb\\(${ot},${ot},${ot}\\)$`), to = new RegExp(`^rgb\\(${B},${B},${B}\\)$`), eo = new RegExp(`^rgba\\(${ot},${ot},${ot},${mt}\\)$`), no = new RegExp(`^rgba\\(${B},${B},${B},${mt}\\)$`), ro = new RegExp(`^hsl\\(${mt},${B},${B}\\)$`), io = new RegExp(`^hsla\\(${mt},${B},${B},${mt}\\)$`), Ae = {
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
me(vt, _t, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Se,
  // Deprecated! Use color.formatHex.
  formatHex: Se,
  formatHex8: oo,
  formatHsl: ao,
  formatRgb: Ee,
  toString: Ee
});
function Se() {
  return this.rgb().formatHex();
}
function oo() {
  return this.rgb().formatHex8();
}
function ao() {
  return ln(this).formatHsl();
}
function Ee() {
  return this.rgb().formatRgb();
}
function _t(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Ji.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Me(e) : n === 3 ? new q(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? zt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? zt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = ji.exec(t)) ? new q(e[1], e[2], e[3], 1) : (e = to.exec(t)) ? new q(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = eo.exec(t)) ? zt(e[1], e[2], e[3], e[4]) : (e = no.exec(t)) ? zt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = ro.exec(t)) ? Ie(e[1], e[2] / 100, e[3] / 100, 1) : (e = io.exec(t)) ? Ie(e[1], e[2] / 100, e[3] / 100, e[4]) : Ae.hasOwnProperty(t) ? Me(Ae[t]) : t === "transparent" ? new q(NaN, NaN, NaN, 0) : null;
}
function Me(t) {
  return new q(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function zt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new q(t, e, n, r);
}
function uo(t) {
  return t instanceof vt || (t = _t(t)), t ? (t = t.rgb(), new q(t.r, t.g, t.b, t.opacity)) : new q();
}
function ae(t, e, n, r) {
  return arguments.length === 1 ? uo(t) : new q(t, e, n, r ?? 1);
}
function q(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
me(q, ae, sn(vt, {
  brighter(t) {
    return t = t == null ? qt : Math.pow(qt, t), new q(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? gt : Math.pow(gt, t), new q(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new q(et(this.r), et(this.g), et(this.b), Dt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Te,
  // Deprecated! Use color.formatHex.
  formatHex: Te,
  formatHex8: so,
  formatRgb: Ce,
  toString: Ce
}));
function Te() {
  return `#${tt(this.r)}${tt(this.g)}${tt(this.b)}`;
}
function so() {
  return `#${tt(this.r)}${tt(this.g)}${tt(this.b)}${tt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ce() {
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
function Ie(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new R(t, e, n, r);
}
function ln(t) {
  if (t instanceof R)
    return new R(t.h, t.s, t.l, t.opacity);
  if (t instanceof vt || (t = _t(t)), !t)
    return new R();
  if (t instanceof R)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), a = NaN, s = o - i, f = (o + i) / 2;
  return s ? (e === o ? a = (n - r) / s + (n < r) * 6 : n === o ? a = (r - e) / s + 2 : a = (e - n) / s + 4, s /= f < 0.5 ? o + i : 2 - o - i, a *= 60) : s = f > 0 && f < 1 ? 0 : a, new R(a, s, f, t.opacity);
}
function lo(t, e, n, r) {
  return arguments.length === 1 ? ln(t) : new R(t, e, n, r ?? 1);
}
function R(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
me(R, lo, sn(vt, {
  brighter(t) {
    return t = t == null ? qt : Math.pow(qt, t), new R(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? gt : Math.pow(gt, t), new R(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new q(
      Qt(t >= 240 ? t - 240 : t + 120, i, r),
      Qt(t, i, r),
      Qt(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new R(Le(this.h), At(this.s), At(this.l), Dt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Dt(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Le(this.h)}, ${At(this.s) * 100}%, ${At(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Le(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function At(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Qt(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const cn = (t) => () => t;
function co(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function fo(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function ho(t) {
  return (t = +t) == 1 ? fn : function(e, n) {
    return n - e ? fo(e, n, t) : cn(isNaN(e) ? n : e);
  };
}
function fn(t, e) {
  var n = e - t;
  return n ? co(t, n) : cn(isNaN(t) ? e : t);
}
const He = function t(e) {
  var n = ho(e);
  function r(i, o) {
    var a = n((i = ae(i)).r, (o = ae(o)).r), s = n(i.g, o.g), f = n(i.b, o.b), u = fn(i.opacity, o.opacity);
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
var ue = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Jt = new RegExp(ue.source, "g");
function po(t) {
  return function() {
    return t;
  };
}
function yo(t) {
  return function(e) {
    return t(e) + "";
  };
}
function go(t, e) {
  var n = ue.lastIndex = Jt.lastIndex = 0, r, i, o, a = -1, s = [], f = [];
  for (t = t + "", e = e + ""; (r = ue.exec(t)) && (i = Jt.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), s[a] ? s[a] += o : s[++a] = o), (r = r[0]) === (i = i[0]) ? s[a] ? s[a] += i : s[++a] = i : (s[++a] = null, f.push({ i: a, x: Q(r, i) })), n = Jt.lastIndex;
  return n < e.length && (o = e.slice(n), s[a] ? s[a] += o : s[++a] = o), s.length < 2 ? f[0] ? yo(f[0].x) : po(e) : (e = f.length, function(u) {
    for (var l = 0, d; l < e; ++l)
      s[(d = f[l]).i] = d.x(u);
    return s.join("");
  });
}
var qe = 180 / Math.PI, se = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function hn(t, e, n, r, i, o) {
  var a, s, f;
  return (a = Math.sqrt(t * t + e * e)) && (t /= a, e /= a), (f = t * n + e * r) && (n -= t * f, r -= e * f), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, f /= s), t * r < e * n && (t = -t, e = -e, f = -f, a = -a), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * qe,
    skewX: Math.atan(f) * qe,
    scaleX: a,
    scaleY: s
  };
}
var St;
function mo(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? se : hn(e.a, e.b, e.c, e.d, e.e, e.f);
}
function _o(t) {
  return t == null || (St || (St = document.createElementNS("http://www.w3.org/2000/svg", "g")), St.setAttribute("transform", t), !(t = St.transform.baseVal.consolidate())) ? se : (t = t.matrix, hn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function dn(t, e, n, r) {
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
var xo = dn(mo, "px, ", "px)", "deg)"), wo = dn(_o, ", ", ")", ")"), vo = 1e-12;
function De(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function bo(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function ko(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const $o = function t(e, n, r) {
  function i(o, a) {
    var s = o[0], f = o[1], u = o[2], l = a[0], d = a[1], c = a[2], p = l - s, m = d - f, _ = p * p + m * m, x, g;
    if (_ < vo)
      g = Math.log(c / u) / e, x = function(Z) {
        return [
          s + Z * p,
          f + Z * m,
          u * Math.exp(e * Z * g)
        ];
      };
    else {
      var w = Math.sqrt(_), A = (c * c - u * u + r * _) / (2 * u * n * w), z = (c * c - u * u - r * _) / (2 * c * n * w), E = Math.log(Math.sqrt(A * A + 1) - A), C = Math.log(Math.sqrt(z * z + 1) - z);
      g = (C - E) / e, x = function(Z) {
        var kt = Z * g, $t = De(E), Nt = u / (n * w) * ($t * ko(e * kt + E) - bo(E));
        return [
          s + Nt * p,
          f + Nt * m,
          u * $t / De(e * kt + E)
        ];
      };
    }
    return x.duration = g * 1e3 * e / Math.SQRT2, x;
  }
  return i.rho = function(o) {
    var a = Math.max(1e-3, +o), s = a * a, f = s * s;
    return t(a, s, f);
  }, i;
}(Math.SQRT2, 2, 4);
var st = 0, pt = 0, ht = 0, pn = 1e3, Ft, yt, Rt = 0, nt = 0, Xt = 0, xt = typeof performance == "object" && performance.now ? performance : Date, yn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function _e() {
  return nt || (yn(No), nt = xt.now() + Xt);
}
function No() {
  nt = 0;
}
function Pt() {
  this._call = this._time = this._next = null;
}
Pt.prototype = gn.prototype = {
  constructor: Pt,
  restart: function(t, e, n) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? _e() : +n) + (e == null ? 0 : +e), !this._next && yt !== this && (yt ? yt._next = this : Ft = this, yt = this), this._call = t, this._time = n, le();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, le());
  }
};
function gn(t, e, n) {
  var r = new Pt();
  return r.restart(t, e, n), r;
}
function zo() {
  _e(), ++st;
  for (var t = Ft, e; t; )
    (e = nt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --st;
}
function Fe() {
  nt = (Rt = xt.now()) + Xt, st = pt = 0;
  try {
    zo();
  } finally {
    st = 0, So(), nt = 0;
  }
}
function Ao() {
  var t = xt.now(), e = t - Rt;
  e > pn && (Xt -= e, Rt = t);
}
function So() {
  for (var t, e = Ft, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Ft = n);
  yt = t, le(r);
}
function le(t) {
  if (!st) {
    pt && (pt = clearTimeout(pt));
    var e = t - nt;
    e > 24 ? (t < 1 / 0 && (pt = setTimeout(Fe, t - xt.now() - Xt)), ht && (ht = clearInterval(ht))) : (ht || (Rt = xt.now(), ht = setInterval(Ao, pn)), st = 1, yn(Fe));
  }
}
function Re(t, e, n) {
  var r = new Pt();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Eo = ge("start", "end", "cancel", "interrupt"), Mo = [], mn = 0, Pe = 1, ce = 2, Ct = 3, Oe = 4, fe = 5, It = 6;
function Wt(t, e, n, r, i, o) {
  var a = t.__transition;
  if (!a)
    t.__transition = {};
  else if (n in a)
    return;
  To(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Eo,
    tween: Mo,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: mn
  });
}
function xe(t, e) {
  var n = P(t, e);
  if (n.state > mn)
    throw new Error("too late; already scheduled");
  return n;
}
function X(t, e) {
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
function To(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = gn(o, 0, n.time);
  function o(u) {
    n.state = Pe, n.timer.restart(a, n.delay, n.time), n.delay <= u && a(u - n.delay);
  }
  function a(u) {
    var l, d, c, p;
    if (n.state !== Pe)
      return f();
    for (l in r)
      if (p = r[l], p.name === n.name) {
        if (p.state === Ct)
          return Re(a);
        p.state === Oe ? (p.state = It, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[l]) : +l < e && (p.state = It, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[l]);
      }
    if (Re(function() {
      n.state === Ct && (n.state = Oe, n.timer.restart(s, n.delay, n.time), s(u));
    }), n.state = ce, n.on.call("start", t, t.__data__, n.index, n.group), n.state === ce) {
      for (n.state = Ct, i = new Array(c = n.tween.length), l = 0, d = -1; l < c; ++l)
        (p = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++d] = p);
      i.length = d + 1;
    }
  }
  function s(u) {
    for (var l = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(f), n.state = fe, 1), d = -1, c = i.length; ++d < c; )
      i[d].call(t, l);
    n.state === fe && (n.on.call("end", t, t.__data__, n.index, n.group), f());
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
      i = r.state > ce && r.state < fe, r.state = It, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[a];
    }
    o && delete t.__transition;
  }
}
function Co(t) {
  return this.each(function() {
    Lt(this, t);
  });
}
function Io(t, e) {
  var n, r;
  return function() {
    var i = X(this, t), o = i.tween;
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
function Lo(t, e, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var o = X(this, t), a = o.tween;
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
function Ho(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = P(this.node(), n).tween, i = 0, o = r.length, a; i < o; ++i)
      if ((a = r[i]).name === t)
        return a.value;
    return null;
  }
  return this.each((e == null ? Io : Lo)(n, t, e));
}
function we(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = X(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return P(i, r).value[e];
  };
}
function _n(t, e) {
  var n;
  return (typeof e == "number" ? Q : e instanceof _t ? He : (n = _t(e)) ? (e = n, He) : go)(t, e);
}
function qo(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Do(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Fo(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttribute(t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Ro(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttributeNS(t.space, t.local);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Po(t, e, n) {
  var r, i, o;
  return function() {
    var a, s = n(this), f;
    return s == null ? void this.removeAttribute(t) : (a = this.getAttribute(t), f = s + "", a === f ? null : a === r && f === i ? o : (i = f, o = e(r = a, s)));
  };
}
function Oo(t, e, n) {
  var r, i, o;
  return function() {
    var a, s = n(this), f;
    return s == null ? void this.removeAttributeNS(t.space, t.local) : (a = this.getAttributeNS(t.space, t.local), f = s + "", a === f ? null : a === r && f === i ? o : (i = f, o = e(r = a, s)));
  };
}
function Vo(t, e) {
  var n = Bt(t), r = n === "transform" ? wo : _n;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Oo : Po)(n, r, we(this, "attr." + t, e)) : e == null ? (n.local ? Do : qo)(n) : (n.local ? Ro : Fo)(n, r, e));
}
function Bo(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Xo(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Wo(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Xo(t, o)), n;
  }
  return i._value = e, i;
}
function Yo(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Bo(t, o)), n;
  }
  return i._value = e, i;
}
function Go(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (e == null)
    return this.tween(n, null);
  if (typeof e != "function")
    throw new Error();
  var r = Bt(t);
  return this.tween(n, (r.local ? Wo : Yo)(r, e));
}
function Uo(t, e) {
  return function() {
    xe(this, t).delay = +e.apply(this, arguments);
  };
}
function Ko(t, e) {
  return e = +e, function() {
    xe(this, t).delay = e;
  };
}
function Zo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Uo : Ko)(e, t)) : P(this.node(), e).delay;
}
function Qo(t, e) {
  return function() {
    X(this, t).duration = +e.apply(this, arguments);
  };
}
function Jo(t, e) {
  return e = +e, function() {
    X(this, t).duration = e;
  };
}
function jo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Qo : Jo)(e, t)) : P(this.node(), e).duration;
}
function ta(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    X(this, t).ease = e;
  };
}
function ea(t) {
  var e = this._id;
  return arguments.length ? this.each(ta(e, t)) : P(this.node(), e).ease;
}
function na(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    X(this, t).ease = n;
  };
}
function ra(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(na(this._id, t));
}
function ia(t) {
  typeof t != "function" && (t = Je(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, s = r[i] = [], f, u = 0; u < a; ++u)
      (f = o[u]) && t.call(f, f.__data__, u, o) && s.push(f);
  return new K(r, this._parents, this._name, this._id);
}
function oa(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), a = new Array(r), s = 0; s < o; ++s)
    for (var f = e[s], u = n[s], l = f.length, d = a[s] = new Array(l), c, p = 0; p < l; ++p)
      (c = f[p] || u[p]) && (d[p] = c);
  for (; s < r; ++s)
    a[s] = e[s];
  return new K(a, this._parents, this._name, this._id);
}
function aa(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function ua(t, e, n) {
  var r, i, o = aa(e) ? xe : X;
  return function() {
    var a = o(this, t), s = a.on;
    s !== r && (i = (r = s).copy()).on(e, n), a.on = i;
  };
}
function sa(t, e) {
  var n = this._id;
  return arguments.length < 2 ? P(this.node(), n).on.on(t) : this.each(ua(n, t, e));
}
function la(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition)
      if (+n !== t)
        return;
    e && e.removeChild(this);
  };
}
function ca() {
  return this.on("end.remove", la(this._id));
}
function fa(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = de(t));
  for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
    for (var s = r[a], f = s.length, u = o[a] = new Array(f), l, d, c = 0; c < f; ++c)
      (l = s[c]) && (d = t.call(l, l.__data__, c, s)) && ("__data__" in l && (d.__data__ = l.__data__), u[c] = d, Wt(u[c], e, n, c, u, P(l, n)));
  return new K(o, this._parents, e, n);
}
function ha(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Qe(t));
  for (var r = this._groups, i = r.length, o = [], a = [], s = 0; s < i; ++s)
    for (var f = r[s], u = f.length, l, d = 0; d < u; ++d)
      if (l = f[d]) {
        for (var c = t.call(l, l.__data__, d, f), p, m = P(l, n), _ = 0, x = c.length; _ < x; ++_)
          (p = c[_]) && Wt(p, e, n, _, c, m);
        o.push(c), a.push(l);
      }
  return new K(o, a, e, n);
}
var da = wt.prototype.constructor;
function pa() {
  return new da(this._groups, this._parents);
}
function ya(t, e) {
  var n, r, i;
  return function() {
    var o = ut(this, t), a = (this.style.removeProperty(t), ut(this, t));
    return o === a ? null : o === n && a === r ? i : i = e(n = o, r = a);
  };
}
function xn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ga(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = ut(this, t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function ma(t, e, n) {
  var r, i, o;
  return function() {
    var a = ut(this, t), s = n(this), f = s + "";
    return s == null && (f = s = (this.style.removeProperty(t), ut(this, t))), a === f ? null : a === r && f === i ? o : (i = f, o = e(r = a, s));
  };
}
function _a(t, e) {
  var n, r, i, o = "style." + e, a = "end." + o, s;
  return function() {
    var f = X(this, t), u = f.on, l = f.value[o] == null ? s || (s = xn(e)) : void 0;
    (u !== n || i !== l) && (r = (n = u).copy()).on(a, i = l), f.on = r;
  };
}
function xa(t, e, n) {
  var r = (t += "") == "transform" ? xo : _n;
  return e == null ? this.styleTween(t, ya(t, r)).on("end.style." + t, xn(t)) : typeof e == "function" ? this.styleTween(t, ma(t, r, we(this, "style." + t, e))).each(_a(this._id, t)) : this.styleTween(t, ga(t, r, e), n).on("end.style." + t, null);
}
function wa(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function va(t, e, n) {
  var r, i;
  function o() {
    var a = e.apply(this, arguments);
    return a !== i && (r = (i = a) && wa(t, a, n)), r;
  }
  return o._value = e, o;
}
function ba(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, va(t, e, n ?? ""));
}
function ka(t) {
  return function() {
    this.textContent = t;
  };
}
function $a(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Na(t) {
  return this.tween("text", typeof t == "function" ? $a(we(this, "text", t)) : ka(t == null ? "" : t + ""));
}
function za(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Aa(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && za(i)), e;
  }
  return r._value = t, r;
}
function Sa(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, Aa(t));
}
function Ea() {
  for (var t = this._name, e = this._id, n = wn(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], s = a.length, f, u = 0; u < s; ++u)
      if (f = a[u]) {
        var l = P(f, e);
        Wt(f, t, n, u, a, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new K(r, this._parents, t, n);
}
function Ma() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, a) {
    var s = { value: a }, f = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var u = X(this, r), l = u.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(s), e._.interrupt.push(s), e._.end.push(f)), u.on = e;
    }), i === 0 && o();
  });
}
var Ta = 0;
function K(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function wn() {
  return ++Ta;
}
var G = wt.prototype;
K.prototype = {
  constructor: K,
  select: fa,
  selectAll: ha,
  selectChild: G.selectChild,
  selectChildren: G.selectChildren,
  filter: ia,
  merge: oa,
  selection: pa,
  transition: Ea,
  call: G.call,
  nodes: G.nodes,
  node: G.node,
  size: G.size,
  empty: G.empty,
  each: G.each,
  on: sa,
  attr: Vo,
  attrTween: Go,
  style: xa,
  styleTween: ba,
  text: Na,
  textTween: Sa,
  remove: ca,
  tween: Ho,
  delay: Zo,
  duration: jo,
  ease: ea,
  easeVarying: ra,
  end: Ma,
  [Symbol.iterator]: G[Symbol.iterator]
};
function Ca(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ia = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ca
};
function La(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Ha(t) {
  var e, n;
  t instanceof K ? (e = t._id, t = t._name) : (e = wn(), (n = Ia).time = _e(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], s = a.length, f, u = 0; u < s; ++u)
      (f = a[u]) && Wt(f, t, e, u, a, n || La(f, e));
  return new K(r, this._parents, t, e);
}
wt.prototype.interrupt = Co;
wt.prototype.transition = Ha;
const Et = (t) => () => t;
function qa(t, {
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
var vn = new U(1, 0, 0);
U.prototype;
function jt(t) {
  t.stopImmediatePropagation();
}
function dt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Da(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Fa() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Ve() {
  return this.__zoom || vn;
}
function Ra(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Pa() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Oa(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], o = t.invertY(e[0][1]) - n[0][1], a = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)
  );
}
function Va() {
  var t = Da, e = Fa, n = Oa, r = Ra, i = Pa, o = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, f = $o, u = ge("start", "zoom", "end"), l, d, c, p = 500, m = 150, _ = 0, x = 10;
  function g(h) {
    h.property("__zoom", Ve).on("wheel.zoom", kt, { passive: !1 }).on("mousedown.zoom", $t).on("dblclick.zoom", Nt).filter(i).on("touchstart.zoom", zn).on("touchmove.zoom", An).on("touchend.zoom touchcancel.zoom", Sn).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  g.transform = function(h, v, y, b) {
    var k = h.selection ? h.selection() : h;
    k.property("__zoom", Ve), h !== k ? E(h, v, y, b) : k.interrupt().each(function() {
      C(this, arguments).event(b).start().zoom(null, typeof v == "function" ? v.apply(this, arguments) : v).end();
    });
  }, g.scaleBy = function(h, v, y, b) {
    g.scaleTo(h, function() {
      var k = this.__zoom.k, $ = typeof v == "function" ? v.apply(this, arguments) : v;
      return k * $;
    }, y, b);
  }, g.scaleTo = function(h, v, y, b) {
    g.transform(h, function() {
      var k = e.apply(this, arguments), $ = this.__zoom, N = y == null ? z(k) : typeof y == "function" ? y.apply(this, arguments) : y, S = $.invert(N), M = typeof v == "function" ? v.apply(this, arguments) : v;
      return n(A(w($, M), N, S), k, a);
    }, y, b);
  }, g.translateBy = function(h, v, y, b) {
    g.transform(h, function() {
      return n(this.__zoom.translate(
        typeof v == "function" ? v.apply(this, arguments) : v,
        typeof y == "function" ? y.apply(this, arguments) : y
      ), e.apply(this, arguments), a);
    }, null, b);
  }, g.translateTo = function(h, v, y, b, k) {
    g.transform(h, function() {
      var $ = e.apply(this, arguments), N = this.__zoom, S = b == null ? z($) : typeof b == "function" ? b.apply(this, arguments) : b;
      return n(vn.translate(S[0], S[1]).scale(N.k).translate(
        typeof v == "function" ? -v.apply(this, arguments) : -v,
        typeof y == "function" ? -y.apply(this, arguments) : -y
      ), $, a);
    }, b, k);
  };
  function w(h, v) {
    return v = Math.max(o[0], Math.min(o[1], v)), v === h.k ? h : new U(v, h.x, h.y);
  }
  function A(h, v, y) {
    var b = v[0] - y[0] * h.k, k = v[1] - y[1] * h.k;
    return b === h.x && k === h.y ? h : new U(h.k, b, k);
  }
  function z(h) {
    return [(+h[0][0] + +h[1][0]) / 2, (+h[0][1] + +h[1][1]) / 2];
  }
  function E(h, v, y, b) {
    h.on("start.zoom", function() {
      C(this, arguments).event(b).start();
    }).on("interrupt.zoom end.zoom", function() {
      C(this, arguments).event(b).end();
    }).tween("zoom", function() {
      var k = this, $ = arguments, N = C(k, $).event(b), S = e.apply(k, $), M = y == null ? z(S) : typeof y == "function" ? y.apply(k, $) : y, O = Math.max(S[1][0] - S[0][0], S[1][1] - S[0][1]), L = k.__zoom, D = typeof v == "function" ? v.apply(k, $) : v, W = f(L.invert(M).concat(O / L.k), D.invert(M).concat(O / D.k));
      return function(F) {
        if (F === 1)
          F = D;
        else {
          var Y = W(F), Yt = O / Y[2];
          F = new U(Yt, M[0] - Y[0] * Yt, M[1] - Y[1] * Yt);
        }
        N.zoom(null, F);
      };
    });
  }
  function C(h, v, y) {
    return !y && h.__zooming || new Z(h, v);
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
      var v = V(this.that).datum();
      u.call(
        h,
        this.that,
        new qa(h, {
          sourceEvent: this.sourceEvent,
          target: g,
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
    var y = C(this, v).event(h), b = this.__zoom, k = Math.max(o[0], Math.min(o[1], b.k * Math.pow(2, r.apply(this, arguments)))), $ = j(h);
    if (y.wheel)
      (y.mouse[0][0] !== $[0] || y.mouse[0][1] !== $[1]) && (y.mouse[1] = b.invert(y.mouse[0] = $)), clearTimeout(y.wheel);
    else {
      if (b.k === k)
        return;
      y.mouse = [$, b.invert($)], Lt(this), y.start();
    }
    dt(h), y.wheel = setTimeout(N, m), y.zoom("mouse", n(A(w(b, k), y.mouse[0], y.mouse[1]), y.extent, a));
    function N() {
      y.wheel = null, y.end();
    }
  }
  function $t(h, ...v) {
    if (c || !t.apply(this, arguments))
      return;
    var y = h.currentTarget, b = C(this, v, !0).event(h), k = V(h.view).on("mousemove.zoom", M, !0).on("mouseup.zoom", O, !0), $ = j(h, y), N = h.clientX, S = h.clientY;
    Zi(h.view), jt(h), b.mouse = [$, this.__zoom.invert($)], Lt(this), b.start();
    function M(L) {
      if (dt(L), !b.moved) {
        var D = L.clientX - N, W = L.clientY - S;
        b.moved = D * D + W * W > _;
      }
      b.event(L).zoom("mouse", n(A(b.that.__zoom, b.mouse[0] = j(L, y), b.mouse[1]), b.extent, a));
    }
    function O(L) {
      k.on("mousemove.zoom mouseup.zoom", null), Qi(L.view, b.moved), dt(L), b.event(L).end();
    }
  }
  function Nt(h, ...v) {
    if (t.apply(this, arguments)) {
      var y = this.__zoom, b = j(h.changedTouches ? h.changedTouches[0] : h, this), k = y.invert(b), $ = y.k * (h.shiftKey ? 0.5 : 2), N = n(A(w(y, $), b, k), e.apply(this, v), a);
      dt(h), s > 0 ? V(this).transition().duration(s).call(E, N, b, h) : V(this).call(g.transform, N, b, h);
    }
  }
  function zn(h, ...v) {
    if (t.apply(this, arguments)) {
      var y = h.touches, b = y.length, k = C(this, v, h.changedTouches.length === b).event(h), $, N, S, M;
      for (jt(h), N = 0; N < b; ++N)
        S = y[N], M = j(S, this), M = [M, this.__zoom.invert(M), S.identifier], k.touch0 ? !k.touch1 && k.touch0[2] !== M[2] && (k.touch1 = M, k.taps = 0) : (k.touch0 = M, $ = !0, k.taps = 1 + !!l);
      l && (l = clearTimeout(l)), $ && (k.taps < 2 && (d = M[0], l = setTimeout(function() {
        l = null;
      }, p)), Lt(this), k.start());
    }
  }
  function An(h, ...v) {
    if (this.__zooming) {
      var y = C(this, v).event(h), b = h.changedTouches, k = b.length, $, N, S, M;
      for (dt(h), $ = 0; $ < k; ++$)
        N = b[$], S = j(N, this), y.touch0 && y.touch0[2] === N.identifier ? y.touch0[0] = S : y.touch1 && y.touch1[2] === N.identifier && (y.touch1[0] = S);
      if (N = y.that.__zoom, y.touch1) {
        var O = y.touch0[0], L = y.touch0[1], D = y.touch1[0], W = y.touch1[1], F = (F = D[0] - O[0]) * F + (F = D[1] - O[1]) * F, Y = (Y = W[0] - L[0]) * Y + (Y = W[1] - L[1]) * Y;
        N = w(N, Math.sqrt(F / Y)), S = [(O[0] + D[0]) / 2, (O[1] + D[1]) / 2], M = [(L[0] + W[0]) / 2, (L[1] + W[1]) / 2];
      } else if (y.touch0)
        S = y.touch0[0], M = y.touch0[1];
      else
        return;
      y.zoom("touch", n(A(N, S, M), y.extent, a));
    }
  }
  function Sn(h, ...v) {
    if (this.__zooming) {
      var y = C(this, v).event(h), b = h.changedTouches, k = b.length, $, N;
      for (jt(h), c && clearTimeout(c), c = setTimeout(function() {
        c = null;
      }, p), $ = 0; $ < k; ++$)
        N = b[$], y.touch0 && y.touch0[2] === N.identifier ? delete y.touch0 : y.touch1 && y.touch1[2] === N.identifier && delete y.touch1;
      if (y.touch1 && !y.touch0 && (y.touch0 = y.touch1, delete y.touch1), y.touch0)
        y.touch0[1] = this.__zoom.invert(y.touch0[0]);
      else if (y.end(), y.taps === 2 && (N = j(N, this), Math.hypot(d[0] - N[0], d[1] - N[1]) < x)) {
        var S = V(this).on("dblclick.zoom");
        S && S.apply(this, arguments);
      }
    }
  }
  return g.wheelDelta = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : Et(+h), g) : r;
  }, g.filter = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : Et(!!h), g) : t;
  }, g.touchable = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : Et(!!h), g) : i;
  }, g.extent = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : Et([[+h[0][0], +h[0][1]], [+h[1][0], +h[1][1]]]), g) : e;
  }, g.scaleExtent = function(h) {
    return arguments.length ? (o[0] = +h[0], o[1] = +h[1], g) : [o[0], o[1]];
  }, g.translateExtent = function(h) {
    return arguments.length ? (a[0][0] = +h[0][0], a[1][0] = +h[1][0], a[0][1] = +h[0][1], a[1][1] = +h[1][1], g) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, g.constrain = function(h) {
    return arguments.length ? (n = h, g) : n;
  }, g.duration = function(h) {
    return arguments.length ? (s = +h, g) : s;
  }, g.interpolate = function(h) {
    return arguments.length ? (f = h, g) : f;
  }, g.on = function() {
    var h = u.on.apply(u, arguments);
    return h === u ? g : h;
  }, g.clickDistance = function(h) {
    return arguments.length ? (_ = (h = +h) * h, g) : Math.sqrt(_);
  }, g.tapDistance = function(h) {
    return arguments.length ? (x = +h, g) : x;
  }, g;
}
const J = {
  hierarchy: he,
  stratify: er,
  tree: sr,
  treemap: dr,
  select: V,
  selectAll: Yi,
  zoom: Va
}, bn = (t) => {
  const e = document.querySelector(`#${t}`);
  if (e === null)
    throw new Error(`Cannot find dom element with id:${t}`);
  const n = e.clientWidth, r = e.clientHeight;
  if (r === 0 || n === 0)
    throw new Error(
      "The tree can't be display because the svg height or width of the container is null"
    );
  return { areaWidth: n, areaHeight: r };
}, bt = (t, e, n) => {
  try {
    const r = t.find((a) => a.id === n), i = r.ancestors()[1].id;
    return e.some(
      (a) => a.id === i
    ) ? r.ancestors()[1] : bt(t, e, i);
  } catch {
    return t.find((i) => i.id === n);
  }
}, kn = (t, e, n) => n.isHorizontal ? "translate(" + e + "," + t + ")" : "translate(" + t + "," + e + ")";
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
const Ba = (t) => {
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
  }, { areaHeight: p, areaWidth: m } = bn(t.htmlId), _ = m - c.left - c.right, x = p - c.top - c.bottom, g = J.select("#" + e).append("svg").attr("width", m).attr("height", p), w = g.append("g"), A = J.zoom().on("zoom", (E) => {
    w.attr("transform", () => E.transform);
  });
  return g.call(A), r || g.on("mousedown.zoom", null).on("touchstart.zoom", null).on("touchmove.zoom", null).on("touchend.zoom", null), i || g.on("wheel.zoom", null).on("mousewheel.zoom", null).on("mousemove.zoom", null).on("DOMMouseScroll.zoom", null).on("dblclick.zoom", null), w.append("g").attr(
    "transform",
    o === "auto" ? "translate(0,0)" : n ? "translate(" + c.left + "," + (c.top + x / 2 - a / 2) + ")" : "translate(" + (c.left + _ / 2 - s / 2) + "," + c.top + ")"
  );
}, ve = (t, e, n) => {
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
       ${t.y - (t.y - e.y - o) / 2} ${t.x + i / 2 - Be(t.x, e.x, 15)}
      L ${t.y - (t.y - e.y - o) / 2} ${e.x + i / 2}
      L ${e.y + o} ${e.x + i / 2}` : `M ${t.x + o / 2} ${t.y}
      L ${t.x + o / 2} ${t.y - (t.y - e.y - i) / 2 + 15}
      Q${t.x + o / 2} ${t.y - (t.y - e.y - i) / 2}
      ${t.x + o / 2 - Be(t.x, e.x, 15)} ${t.y - (t.y - e.y - i) / 2}
      L ${e.x + o / 2} ${t.y - (t.y - e.y - i) / 2} 
      L ${e.x + o / 2} ${e.y + i} ` : r ? `M ${t.y} ${t.x + i / 2}
        C ${(t.y + e.y + o) / 2} ${t.x + i / 2}
          ${(t.y + e.y + o) / 2} ${e.x + i / 2}
          ${e.y + o} ${e.x + i / 2}` : `M ${t.x + o / 2} ${t.y}
        C ${t.x + o / 2} ${(t.y + e.y + i) / 2}
          ${e.x + o / 2} ${(t.y + e.y + i) / 2}
          ${e.x + o / 2} ${e.y + i} `;
}, Be = (t, e, n) => t > e ? n : t < e ? -n : 0, $n = (t, e) => {
  switch (t) {
    case "dashed":
      return `${e * 2},${e * 1.2}`;
    case "dotted":
      return `${e * 0.1},${e * 1.5}`;
    case "dashdot":
      return `${e * 2},${e * 1.2},${e * 0.1},${e * 1.2}`;
    case "solid":
    default:
      return null;
  }
}, Nn = (t) => t === "dotted" || t === "dashdot" ? "round" : "butt", Xa = (t, e, n, r) => t.enter().insert("path", "g").attr("class", "link").attr("d", (i) => {
  const o = bt(
    n,
    r,
    i.id
  ), a = {
    x: o.x0,
    y: o.y0
  };
  return ve(a, a, e);
}).attr("fill", "none").attr(
  "stroke-width",
  (i) => e.linkWidth(i)
  // Pass the correct `d` object to linkWidth
).attr(
  "stroke",
  (i) => e.linkColor(i)
  // Pass the correct `d` object to linkColor
).attr(
  "stroke-dasharray",
  (i) => {
    var o;
    return $n((o = e.linkStyle) == null ? void 0 : o.call(e, i), e.linkWidth(i));
  }
).attr("stroke-linecap", (i) => {
  var o;
  return Nn((o = e.linkStyle) == null ? void 0 : o.call(e, i));
}), Wa = (t, e, n, r) => {
  t.exit().transition().duration(e.duration).style("opacity", 0).attr("d", (i) => {
    const o = bt(
      r,
      n,
      i.id
    ), a = {
      x: o.x0,
      y: o.y0
    };
    return ve(a, a, e);
  }).remove();
}, Xe = (t, e) => t === "quadraticBeziers" ? e ? 0 : 20 : 0, Ya = (t, e, n) => {
  var i;
  const r = t.merge(e);
  if (r.transition().duration(n.duration).attr("d", (o) => ve(o, o.parent, n)).attr("fill", "none").attr("stroke-width", (o) => n.linkWidth(o)).attr("stroke", (o) => n.linkColor(o)).attr(
    "stroke-dasharray",
    (o) => {
      var a;
      return $n((a = n.linkStyle) == null ? void 0 : a.call(n, o), n.linkWidth(o));
    }
  ).attr("stroke-linecap", (o) => {
    var a;
    return Nn((a = n.linkStyle) == null ? void 0 : a.call(n, o));
  }), n.linkLabel) {
    const o = (i = r.node()) == null ? void 0 : i.parentNode, s = V(o).selectAll("text.link-label").data(r.data(), (u, l) => `link-label-${l}`);
    s.exit().remove(), s.enter().append("text").attr("class", "link-label").attr("text-anchor", "middle").attr("dominant-baseline", "middle").attr("fill", n.linkLabel.color || "#000000").attr("font-size", n.linkLabel.fontSize || 12).attr("pointer-events", "none").attr("opacity", 0).merge(s).attr("x", function(u) {
      const l = Xe(n.linkShape || "quadraticBeziers", n.isHorizontal);
      return n.isHorizontal ? u.parent.y + (u.y - u.parent.y) - n.nodeWidth / 4 + l : u.parent.x + (u.x - u.parent.x) + n.nodeWidth / 2;
    }).attr("y", function(u) {
      const l = Xe(n.linkShape || "quadraticBeziers", n.isHorizontal);
      return n.isHorizontal ? u.parent.x + (u.x - u.parent.x) + n.nodeHeight / 2 : u.parent.y + (u.y - u.parent.y) - n.nodeHeight / 2 + l;
    }).text("").each(function(u) {
      const l = {
        ...u.parent,
        data: u.parent.data,
        settings: n
      }, d = {
        ...u,
        data: u.data,
        settings: n
      }, c = n.linkLabel.render(l, d);
      V(this).text(c);
    }).transition().delay(n.duration).duration(300).attr("opacity", 1);
  }
}, Ga = (t, e, n, r) => {
  const i = t.enter().append("g").attr("class", "node").attr("id", (o) => o == null ? void 0 : o.id).attr("transform", (o) => {
    const a = bt(
      n,
      r,
      o.id
    );
    return kn(
      a.x0,
      a.y0,
      e
    );
  });
  return i.append("foreignObject").attr("width", e.nodeWidth).attr("height", e.nodeHeight), i;
}, Ua = (t, e, n, r) => {
  const i = t.exit().transition().duration(e.duration).style("opacity", 0).attr("transform", (o) => {
    const a = bt(
      r,
      n,
      o.id
    );
    return kn(
      a.x0,
      a.y0,
      e
    );
  }).remove();
  i.select("rect").style("fill-opacity", 1e-6), i.select("circle").attr("r", 1e-6), i.select("text").style("fill-opacity", 1e-6);
}, Ka = (t, e, n) => {
  const r = t.merge(e);
  r.transition().duration(n.duration).attr("transform", (i) => n.isHorizontal ? "translate(" + i.y + "," + i.x + ")" : "translate(" + i.x + "," + i.y + ")"), r.select("foreignObject").attr("width", n.nodeWidth).attr("height", n.nodeHeight).style("overflow", "visible").on("click", (i, o) => n.onNodeClick({ ...o, settings: n })).on("mouseenter", (i, o) => n.onNodeMouseEnter({ ...o, settings: n })).on("mouseleave", (i, o) => n.onNodeMouseLeave({ ...o, settings: n })).html((i) => n.renderNode({ ...i, settings: n }));
}, Za = (t, e) => {
  const { idKey: n, relationnalField: r, hasFlatData: i } = e;
  return i ? J.stratify().id((o) => o[n]).parentId((o) => o[r])(t) : J.hierarchy(t, (o) => o[r]);
}, Qa = (t) => {
  const { areaHeight: e, areaWidth: n } = bn(t.htmlId);
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
}, be = {
  create: Ja
};
typeof window < "u" && (window.Treeviz = be);
function Ja(t) {
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
      linkStyle: () => "solid",
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
    const m = u.selectAll("g.node").data(d, (w) => w[n.idKey]), _ = Ga(m, n, d, r);
    Ka(_, m, n), Ua(m, n, d, r);
    const x = u.selectAll("path.link").data(c, (w) => w.id), g = Xa(x, n, d, r);
    Ya(g, x, n), Wa(x, n, d, r), r = [...d];
  }
  function o(u, l) {
    it.add(n.duration, () => {
      l && (n = { ...n, ...l });
      const d = Za(u, n), p = Qa(n)(d);
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
  const s = { refresh: o, clean: a }, f = Ba(n);
  return s;
}
var lt = [
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
], We = [
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
], Ye = [
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
], Ot = be.create({
  data: lt,
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
Ot.refresh(lt);
var te = !0;
const I = document.querySelector("#add"), T = document.querySelector("#remove"), ee = document.querySelector("#doTasks");
var Vt = be.create({
  data: lt,
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
  linkStyle: (t) => t.data.id % 2 === 0 ? "dashed" : "solid",
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
Vt.refresh(lt);
I == null || I.addEventListener("click", function() {
  console.log("addButton clicked"), te ? Ot.refresh(We) : Ot.refresh(Ye), te ? Vt.refresh(We) : Vt.refresh(Ye), te = !1;
});
T == null || T.addEventListener("click", function() {
  console.log("removeButton clicked"), Ot.refresh(lt), Vt.refresh(lt);
});
ee == null || ee.addEventListener("click", function() {
  I == null || I.click(), T == null || T.click(), I == null || I.click(), T == null || T.click(), T == null || T.click(), I == null || I.click(), T == null || T.click(), I == null || I.click(), I == null || I.click(), T == null || T.click(), T == null || T.click();
});
