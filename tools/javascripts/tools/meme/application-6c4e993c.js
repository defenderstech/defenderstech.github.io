/**
 * Copyright (c) 2011 Pere Monfort Pàmies (http://www.pmphp.net)
 * Official site: http://www.canvastext.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function CanvasText() { this.canvasId = null, this.canvas = null, this.context = null, this.bufferCanvas = null, this.bufferContext = null, this.cacheCanvas = [], this.cacheContext = [], this.savedClasses = [], this.fontFamily = "Verdana", this.fontWeight = "normal", this.fontSize = "12px", this.fontColor = "#000", this.fontStyle = "normal", this.textAlign = "start", this.textBaseline = "alphabetic", this.lineHeight = "16", this.textShadow = null, this.initTime = null, this.endTime = null, this.config = function(t) { var e; if ("object" != typeof t) return alert("\xa1Invalid configuration!"), !1; for (e in t) void 0 !== this[e] && (this[e] = t[e]) }, this.drawText = function(t) { if (this.initTime = (new Date).getTime(), null == this.canvas && !this.getCanvas()) return alert("Incorrect canvas ID!"), !1; if (null == this.bufferCanvas && this.getBufferCanvas(), void 0 !== t.cacheId && (t.cacheId = "ct" + t.cacheId, this.getCache(t.cacheId))) { if (t.returnImage) { if (t.returnImage) return this.cacheCanvas[t.cacheId] } else this.context.drawImage(this.cacheCanvas[t.cacheId], 0, 0); return this.endTime = (new Date).getTime(), !1 } if ("object" != typeof t) return alert("Invalid text format!"), !1; if (!this.isNumber(t.x) || !this.isNumber(t.y)) return alert('You should specify a correct "x" & "y" axis value.'), !1; if (this.bufferCanvas.width = this.bufferCanvas.width, this.bufferContext.fillStyle = this.fontColor, this.bufferContext.font = this.fontWeight + " " + this.fontSize + " " + this.fontFamily, this.drawStyledText(t), void 0 != t.cacheId && this.setCache(t.cacheId), this.endTime = (new Date).getTime(), t.returnImage) { if (t.returnImage) return this.bufferCanvas } else this.context.drawImage(this.bufferCanvas, 0, 0) }, this.drawStyledText = function(t) { var e, n, i, r, a, o, s, l, u, h, c, f, d, p, g, m = t.text,
            v = t.x,
            y = t.y,
            w = [],
            b = t.boxWidth,
            x = [],
            k = m.match(/<\s*br\s*\/>|<\s*class=["|']([^"|']+)["|']\s*\>([^>]+)<\s*\/class\s*\>|<\s*style=["|']([^"|']+)["|']\s*\>([^>]+)<\s*\/style\s*\>|[^<]+/g),
            _ = null; for (f = 0; f < k.length; f++) { if (this.bufferContext.save(), u = this.fontColor, x.style = this.fontStyle, x.weight = this.fontWeight, x.size = this.fontSize, x.family = this.fontFamily, c = this.textShadow, /<\s*style=/i.test(k[f])) { for (_ = k[f].match(/<\s*style=["|']([^"|']+)["|']\s*\>([^>]+)<\s*\/style\s*\>/), i = _[1].split(";"), d = 0; d < i.length; d++)
                    if (r = i[d].split(":"), !this.isEmpty(r[0]) && !this.isEmpty(r[1])) switch (a = r[0], o = r[1], a) {
                        case "font":
                            x = o; break;
                        case "font-family":
                            x.family = o; break;
                        case "font-weight":
                            x.weight = o; break;
                        case "font-size":
                            x.size = o; break;
                        case "font-style":
                            x.style = o; break;
                        case "text-shadow":
                            c = this.trim(o), c = c.split(" "), 4 != c.length && (c = null); break;
                        case "color":
                            this.isHex(o) && (u = o) } h = _[2] } else if (/<\s*class=/i.test(k[f])) { _ = k[f].match(/<\s*class=["|']([^"|']+)["|']\s*\>([^>]+)<\s*\/class\s*\>/), l = this.getClass(_[1]); for (s in l) switch (s) {
                    case "font":
                        x = l[s]; break;
                    case "fontFamily":
                        x.family = l[s]; break;
                    case "fontWeight":
                        x.weight = l[s]; break;
                    case "fontSize":
                        x.size = l[s]; break;
                    case "fontStyle":
                        x.style = l[s]; break;
                    case "fontColor":
                        this.isHex(l[s]) && (u = l[s]); break;
                    case "textShadow":
                        c = this.trim(l[s]), c = c.split(" "), 4 != c.length && (c = null) } h = _[2] } else { if (/<\s*br\s*\/>/i.test(k[f])) { y += 1.5 * parseInt(this.lineHeight, 10), v = t.x; continue } h = k[f] } if (this.bufferContext.textBaseline = this.textBaseline, this.bufferContext.textAlign = this.textAlign, x instanceof Array ? this.bufferContext.font = x.style + " " + x.weight + " " + x.size + " " + x.family : this.bufferContext.font = x, this.bufferContext.font = x, this.bufferContext.fillStyle = u, null != c && (this.bufferContext.shadowOffsetX = c[0].replace("px", ""), this.bufferContext.shadowOffsetY = c[1].replace("px", ""), this.bufferContext.shadowBlur = c[2].replace("px", ""), this.bufferContext.shadowColor = c[3].replace("px", "")), w = [], h = h.replace(/\s*\n\s*/g, " "), void 0 !== b && this.checkLineBreak(h, b + t.x, v))
                if (e = this.trim(h).split(" "), 1 == e.length) w.push({ text: this.trim(h) + " ", linebreak: !0 });
                else { n = v; var C = 0; for (w[C] = { text: void 0, linebreak: !1 }, p = 0; p < e.length; p++) e[p] += " ", this.checkLineBreak(e[p], b + t.x, n) ? (n = t.x, void 0 !== w[C].text && C++, w[C] = { text: e[p], linebreak: !0 }, n += this.bufferContext.measureText(e[p]).width) : (void 0 == w[C].text ? w[C].text = e[p] : w[C].text += e[p], n += this.bufferContext.measureText(e[p]).width) }
            for (0 == w.length && w.push({ text: this.trim(h) + " ", linebreak: !1 }), g = 0; g < w.length; g++) w[g].linebreak && (y += parseInt(this.lineHeight, 10), v = t.x), this.bufferContext.fillText(w[g].text, v, y), v += this.bufferContext.measureText(w[g].text).width;
            this.bufferContext.restore() } }, this.defineClass = function(t, e) { return "object" != typeof e ? (alert("\xa1Invalid class!"), !1) : this.isEmpty(t) ? (alert("You must specify a Class Name."), !1) : (this.savedClasses[t] = e, !0) }, this.getClass = function(t) { return void 0 !== this.savedClasses[t] ? this.savedClasses[t] : void 0 }, this.getCanvas = function() { return null == this.canvasId ? (alert("You must specify the canvas ID!"), !1) : (this.canvas = document.getElementById(this.canvasId), this.context = this.canvas.getContext("2d"), this.getBufferCanvas(), !0) }, this.getBufferCanvas = function() { this.bufferCanvas = document.createElement("canvas"), this.bufferCanvas.width = this.canvas.width, this.bufferCanvas.height = this.canvas.height, this.bufferContext = this.bufferCanvas.getContext("2d") }, this.getCache = function(t) { return void 0 === this.cacheCanvas[t] ? !1 : !0 }, this.setCache = function(t) { this.cacheCanvas[t] = document.createElement("canvas"), this.cacheCanvas[t].width = this.bufferCanvas.width, this.cacheCanvas[t].height = this.bufferCanvas.height, this.cacheContext[t] = this.cacheCanvas[t].getContext("2d"), this.cacheContext[t].drawImage(this.bufferCanvas, 0, 0) }, this.checkLineBreak = function(t, e, n) { return this.bufferContext.measureText(t).width + n > e }, this.isHex = function(t) { return /^(#[a-fA-F0-9]{3,6})$/i.test(t) }, this.isNumber = function(t) { return !isNaN(parseFloat(t)) && isFinite(t) }, this.isEmpty = function(t) { return t = t.replace(/^\s+|\s+$/, ""), 0 == t.length }, this.trim = function(t) { var e, n; for (t = t.replace(/^\s\s*/, ""), e = /\s/, n = t.length; e.test(t.charAt(--n));); return t.slice(0, n + 1) } }(function() { var t = this,
        e = t._,
        n = Array.prototype,
        i = Object.prototype,
        r = Function.prototype,
        a = n.push,
        o = n.slice,
        s = n.concat,
        l = i.toString,
        u = i.hasOwnProperty,
        h = Array.isArray,
        c = Object.keys,
        f = r.bind,
        d = function(t) { return t instanceof d ? t : this instanceof d ? void(this._wrapped = t) : new d(t) }; "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = d), exports._ = d) : t._ = d, d.VERSION = "1.7.0"; var p = function(t, e, n) { if (void 0 === e) return t; switch (null == n ? 3 : n) {
            case 1:
                return function(n) { return t.call(e, n) };
            case 2:
                return function(n, i) { return t.call(e, n, i) };
            case 3:
                return function(n, i, r) { return t.call(e, n, i, r) };
            case 4:
                return function(n, i, r, a) { return t.call(e, n, i, r, a) } } return function() { return t.apply(e, arguments) } };
    d.iteratee = function(t, e, n) { return null == t ? d.identity : d.isFunction(t) ? p(t, e, n) : d.isObject(t) ? d.matches(t) : d.property(t) }, d.each = d.forEach = function(t, e, n) { if (null == t) return t;
        e = p(e, n); var i, r = t.length; if (r === +r)
            for (i = 0; r > i; i++) e(t[i], i, t);
        else { var a = d.keys(t); for (i = 0, r = a.length; r > i; i++) e(t[a[i]], a[i], t) } return t }, d.map = d.collect = function(t, e, n) { if (null == t) return [];
        e = d.iteratee(e, n); for (var i, r = t.length !== +t.length && d.keys(t), a = (r || t).length, o = Array(a), s = 0; a > s; s++) i = r ? r[s] : s, o[s] = e(t[i], i, t); return o }; var g = "Reduce of empty array with no initial value";
    d.reduce = d.foldl = d.inject = function(t, e, n, i) { null == t && (t = []), e = p(e, i, 4); var r, a = t.length !== +t.length && d.keys(t),
            o = (a || t).length,
            s = 0; if (arguments.length < 3) { if (!o) throw new TypeError(g);
            n = t[a ? a[s++] : s++] } for (; o > s; s++) r = a ? a[s] : s, n = e(n, t[r], r, t); return n }, d.reduceRight = d.foldr = function(t, e, n, i) { null == t && (t = []), e = p(e, i, 4); var r, a = t.length !== +t.length && d.keys(t),
            o = (a || t).length; if (arguments.length < 3) { if (!o) throw new TypeError(g);
            n = t[a ? a[--o] : --o] } for (; o--;) r = a ? a[o] : o, n = e(n, t[r], r, t); return n }, d.find = d.detect = function(t, e, n) { var i; return e = d.iteratee(e, n), d.some(t, function(t, n, r) { return e(t, n, r) ? (i = t, !0) : void 0 }), i }, d.filter = d.select = function(t, e, n) { var i = []; return null == t ? i : (e = d.iteratee(e, n), d.each(t, function(t, n, r) { e(t, n, r) && i.push(t) }), i) }, d.reject = function(t, e, n) { return d.filter(t, d.negate(d.iteratee(e)), n) }, d.every = d.all = function(t, e, n) { if (null == t) return !0;
        e = d.iteratee(e, n); var i, r, a = t.length !== +t.length && d.keys(t),
            o = (a || t).length; for (i = 0; o > i; i++)
            if (r = a ? a[i] : i, !e(t[r], r, t)) return !1; return !0 }, d.some = d.any = function(t, e, n) { if (null == t) return !1;
        e = d.iteratee(e, n); var i, r, a = t.length !== +t.length && d.keys(t),
            o = (a || t).length; for (i = 0; o > i; i++)
            if (r = a ? a[i] : i, e(t[r], r, t)) return !0; return !1 }, d.contains = d.include = function(t, e) { return null == t ? !1 : (t.length !== +t.length && (t = d.values(t)), d.indexOf(t, e) >= 0) }, d.invoke = function(t, e) { var n = o.call(arguments, 2),
            i = d.isFunction(e); return d.map(t, function(t) { return (i ? e : t[e]).apply(t, n) }) }, d.pluck = function(t, e) { return d.map(t, d.property(e)) }, d.where = function(t, e) { return d.filter(t, d.matches(e)) }, d.findWhere = function(t, e) { return d.find(t, d.matches(e)) }, d.max = function(t, e, n) { var i, r, a = -(1 / 0),
            o = -(1 / 0); if (null == e && null != t) { t = t.length === +t.length ? t : d.values(t); for (var s = 0, l = t.length; l > s; s++) i = t[s], i > a && (a = i) } else e = d.iteratee(e, n), d.each(t, function(t, n, i) { r = e(t, n, i), (r > o || r === -(1 / 0) && a === -(1 / 0)) && (a = t, o = r) }); return a }, d.min = function(t, e, n) { var i, r, a = 1 / 0,
            o = 1 / 0; if (null == e && null != t) { t = t.length === +t.length ? t : d.values(t); for (var s = 0, l = t.length; l > s; s++) i = t[s], a > i && (a = i) } else e = d.iteratee(e, n), d.each(t, function(t, n, i) { r = e(t, n, i), (o > r || r === 1 / 0 && a === 1 / 0) && (a = t, o = r) }); return a }, d.shuffle = function(t) { for (var e, n = t && t.length === +t.length ? t : d.values(t), i = n.length, r = Array(i), a = 0; i > a; a++) e = d.random(0, a), e !== a && (r[a] = r[e]), r[e] = n[a]; return r }, d.sample = function(t, e, n) { return null == e || n ? (t.length !== +t.length && (t = d.values(t)), t[d.random(t.length - 1)]) : d.shuffle(t).slice(0, Math.max(0, e)) }, d.sortBy = function(t, e, n) { return e = d.iteratee(e, n), d.pluck(d.map(t, function(t, n, i) { return { value: t, index: n, criteria: e(t, n, i) } }).sort(function(t, e) { var n = t.criteria,
                i = e.criteria; if (n !== i) { if (n > i || void 0 === n) return 1; if (i > n || void 0 === i) return -1 } return t.index - e.index }), "value") }; var m = function(t) { return function(e, n, i) { var r = {}; return n = d.iteratee(n, i), d.each(e, function(i, a) { var o = n(i, a, e);
                t(r, i, o) }), r } };
    d.groupBy = m(function(t, e, n) { d.has(t, n) ? t[n].push(e) : t[n] = [e] }), d.indexBy = m(function(t, e, n) { t[n] = e }), d.countBy = m(function(t, e, n) { d.has(t, n) ? t[n]++ : t[n] = 1 }), d.sortedIndex = function(t, e, n, i) { n = d.iteratee(n, i, 1); for (var r = n(e), a = 0, o = t.length; o > a;) { var s = a + o >>> 1;
            n(t[s]) < r ? a = s + 1 : o = s } return a }, d.toArray = function(t) { return t ? d.isArray(t) ? o.call(t) : t.length === +t.length ? d.map(t, d.identity) : d.values(t) : [] }, d.size = function(t) { return null == t ? 0 : t.length === +t.length ? t.length : d.keys(t).length }, d.partition = function(t, e, n) { e = d.iteratee(e, n); var i = [],
            r = []; return d.each(t, function(t, n, a) {
            (e(t, n, a) ? i : r).push(t) }), [i, r] }, d.first = d.head = d.take = function(t, e, n) { return null == t ? void 0 : null == e || n ? t[0] : 0 > e ? [] : o.call(t, 0, e) }, d.initial = function(t, e, n) { return o.call(t, 0, Math.max(0, t.length - (null == e || n ? 1 : e))) }, d.last = function(t, e, n) { return null == t ? void 0 : null == e || n ? t[t.length - 1] : o.call(t, Math.max(t.length - e, 0)) }, d.rest = d.tail = d.drop = function(t, e, n) { return o.call(t, null == e || n ? 1 : e) }, d.compact = function(t) { return d.filter(t, d.identity) }; var v = function(t, e, n, i) { if (e && d.every(t, d.isArray)) return s.apply(i, t); for (var r = 0, o = t.length; o > r; r++) { var l = t[r];
            d.isArray(l) || d.isArguments(l) ? e ? a.apply(i, l) : v(l, e, n, i) : n || i.push(l) } return i };
    d.flatten = function(t, e) { return v(t, e, !1, []) }, d.without = function(t) { return d.difference(t, o.call(arguments, 1)) }, d.uniq = d.unique = function(t, e, n, i) { if (null == t) return [];
        d.isBoolean(e) || (i = n, n = e, e = !1), null != n && (n = d.iteratee(n, i)); for (var r = [], a = [], o = 0, s = t.length; s > o; o++) { var l = t[o]; if (e) o && a === l || r.push(l), a = l;
            else if (n) { var u = n(l, o, t);
                d.indexOf(a, u) < 0 && (a.push(u), r.push(l)) } else d.indexOf(r, l) < 0 && r.push(l) } return r }, d.union = function() { return d.uniq(v(arguments, !0, !0, [])) }, d.intersection = function(t) { if (null == t) return []; for (var e = [], n = arguments.length, i = 0, r = t.length; r > i; i++) { var a = t[i]; if (!d.contains(e, a)) { for (var o = 1; n > o && d.contains(arguments[o], a); o++);
                o === n && e.push(a) } } return e }, d.difference = function(t) { var e = v(o.call(arguments, 1), !0, !0, []); return d.filter(t, function(t) { return !d.contains(e, t) }) }, d.zip = function(t) { if (null == t) return []; for (var e = d.max(arguments, "length").length, n = Array(e), i = 0; e > i; i++) n[i] = d.pluck(arguments, i); return n }, d.object = function(t, e) { if (null == t) return {}; for (var n = {}, i = 0, r = t.length; r > i; i++) e ? n[t[i]] = e[i] : n[t[i][0]] = t[i][1]; return n }, d.indexOf = function(t, e, n) { if (null == t) return -1; var i = 0,
            r = t.length; if (n) { if ("number" != typeof n) return i = d.sortedIndex(t, e), t[i] === e ? i : -1;
            i = 0 > n ? Math.max(0, r + n) : n } for (; r > i; i++)
            if (t[i] === e) return i; return -1 }, d.lastIndexOf = function(t, e, n) { if (null == t) return -1; var i = t.length; for ("number" == typeof n && (i = 0 > n ? i + n + 1 : Math.min(i, n + 1)); --i >= 0;)
            if (t[i] === e) return i; return -1 }, d.range = function(t, e, n) { arguments.length <= 1 && (e = t || 0, t = 0), n = n || 1; for (var i = Math.max(Math.ceil((e - t) / n), 0), r = Array(i), a = 0; i > a; a++, t += n) r[a] = t; return r }; var y = function() {};
    d.bind = function(t, e) { var n, i; if (f && t.bind === f) return f.apply(t, o.call(arguments, 1)); if (!d.isFunction(t)) throw new TypeError("Bind must be called on a function"); return n = o.call(arguments, 2), i = function() { if (!(this instanceof i)) return t.apply(e, n.concat(o.call(arguments)));
            y.prototype = t.prototype; var r = new y;
            y.prototype = null; var a = t.apply(r, n.concat(o.call(arguments))); return d.isObject(a) ? a : r } }, d.partial = function(t) { var e = o.call(arguments, 1); return function() { for (var n = 0, i = e.slice(), r = 0, a = i.length; a > r; r++) i[r] === d && (i[r] = arguments[n++]); for (; n < arguments.length;) i.push(arguments[n++]); return t.apply(this, i) } }, d.bindAll = function(t) { var e, n, i = arguments.length; if (1 >= i) throw new Error("bindAll must be passed function names"); for (e = 1; i > e; e++) n = arguments[e], t[n] = d.bind(t[n], t); return t }, d.memoize = function(t, e) { var n = function(i) { var r = n.cache,
                a = e ? e.apply(this, arguments) : i; return d.has(r, a) || (r[a] = t.apply(this, arguments)), r[a] }; return n.cache = {}, n }, d.delay = function(t, e) { var n = o.call(arguments, 2); return setTimeout(function() { return t.apply(null, n) }, e) }, d.defer = function(t) { return d.delay.apply(d, [t, 1].concat(o.call(arguments, 1))) }, d.throttle = function(t, e, n) { var i, r, a, o = null,
            s = 0;
        n || (n = {}); var l = function() { s = n.leading === !1 ? 0 : d.now(), o = null, a = t.apply(i, r), o || (i = r = null) }; return function() { var u = d.now();
            s || n.leading !== !1 || (s = u); var h = e - (u - s); return i = this, r = arguments, 0 >= h || h > e ? (clearTimeout(o), o = null, s = u, a = t.apply(i, r), o || (i = r = null)) : o || n.trailing === !1 || (o = setTimeout(l, h)), a } }, d.debounce = function(t, e, n) { var i, r, a, o, s, l = function() { var u = d.now() - o;
            e > u && u > 0 ? i = setTimeout(l, e - u) : (i = null, n || (s = t.apply(a, r), i || (a = r = null))) }; return function() { a = this, r = arguments, o = d.now(); var u = n && !i; return i || (i = setTimeout(l, e)), u && (s = t.apply(a, r), a = r = null), s } }, d.wrap = function(t, e) { return d.partial(e, t) }, d.negate = function(t) { return function() { return !t.apply(this, arguments) } }, d.compose = function() { var t = arguments,
            e = t.length - 1; return function() { for (var n = e, i = t[e].apply(this, arguments); n--;) i = t[n].call(this, i); return i } }, d.after = function(t, e) { return function() { return --t < 1 ? e.apply(this, arguments) : void 0 } }, d.before = function(t, e) { var n; return function() { return --t > 0 ? n = e.apply(this, arguments) : e = null, n } }, d.once = d.partial(d.before, 2), d.keys = function(t) { if (!d.isObject(t)) return []; if (c) return c(t); var e = []; for (var n in t) d.has(t, n) && e.push(n); return e }, d.values = function(t) { for (var e = d.keys(t), n = e.length, i = Array(n), r = 0; n > r; r++) i[r] = t[e[r]]; return i }, d.pairs = function(t) { for (var e = d.keys(t), n = e.length, i = Array(n), r = 0; n > r; r++) i[r] = [e[r], t[e[r]]]; return i }, d.invert = function(t) { for (var e = {}, n = d.keys(t), i = 0, r = n.length; r > i; i++) e[t[n[i]]] = n[i]; return e }, d.functions = d.methods = function(t) { var e = []; for (var n in t) d.isFunction(t[n]) && e.push(n); return e.sort() }, d.extend = function(t) { if (!d.isObject(t)) return t; for (var e, n, i = 1, r = arguments.length; r > i; i++) { e = arguments[i]; for (n in e) u.call(e, n) && (t[n] = e[n]) } return t }, d.pick = function(t, e, n) { var i, r = {}; if (null == t) return r; if (d.isFunction(e)) { e = p(e, n); for (i in t) { var a = t[i];
                e(a, i, t) && (r[i] = a) } } else { var l = s.apply([], o.call(arguments, 1));
            t = new Object(t); for (var u = 0, h = l.length; h > u; u++) i = l[u], i in t && (r[i] = t[i]) } return r }, d.omit = function(t, e, n) { if (d.isFunction(e)) e = d.negate(e);
        else { var i = d.map(s.apply([], o.call(arguments, 1)), String);
            e = function(t, e) { return !d.contains(i, e) } } return d.pick(t, e, n) }, d.defaults = function(t) { if (!d.isObject(t)) return t; for (var e = 1, n = arguments.length; n > e; e++) { var i = arguments[e]; for (var r in i) void 0 === t[r] && (t[r] = i[r]) } return t }, d.clone = function(t) { return d.isObject(t) ? d.isArray(t) ? t.slice() : d.extend({}, t) : t }, d.tap = function(t, e) { return e(t), t }; var w = function(t, e, n, i) { if (t === e) return 0 !== t || 1 / t === 1 / e; if (null == t || null == e) return t === e;
        t instanceof d && (t = t._wrapped), e instanceof d && (e = e._wrapped); var r = l.call(t); if (r !== l.call(e)) return !1; switch (r) {
            case "[object RegExp]":
            case "[object String]":
                return "" + t == "" + e;
            case "[object Number]":
                return +t !== +t ? +e !== +e : 0 === +t ? 1 / +t === 1 / e : +t === +e;
            case "[object Date]":
            case "[object Boolean]":
                return +t === +e } if ("object" != typeof t || "object" != typeof e) return !1; for (var a = n.length; a--;)
            if (n[a] === t) return i[a] === e; var o = t.constructor,
            s = e.constructor; if (o !== s && "constructor" in t && "constructor" in e && !(d.isFunction(o) && o instanceof o && d.isFunction(s) && s instanceof s)) return !1;
        n.push(t), i.push(e); var u, h; if ("[object Array]" === r) { if (u = t.length, h = u === e.length)
                for (; u-- && (h = w(t[u], e[u], n, i));); } else { var c, f = d.keys(t); if (u = f.length, h = d.keys(e).length === u)
                for (; u-- && (c = f[u], h = d.has(e, c) && w(t[c], e[c], n, i));); } return n.pop(), i.pop(), h };
    d.isEqual = function(t, e) { return w(t, e, [], []) }, d.isEmpty = function(t) { if (null == t) return !0; if (d.isArray(t) || d.isString(t) || d.isArguments(t)) return 0 === t.length; for (var e in t)
            if (d.has(t, e)) return !1; return !0 }, d.isElement = function(t) { return !(!t || 1 !== t.nodeType) }, d.isArray = h || function(t) { return "[object Array]" === l.call(t) }, d.isObject = function(t) { var e = typeof t; return "function" === e || "object" === e && !!t }, d.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(t) { d["is" + t] = function(e) { return l.call(e) === "[object " + t + "]" } }), d.isArguments(arguments) || (d.isArguments = function(t) { return d.has(t, "callee") }), "function" != typeof /./ && (d.isFunction = function(t) { return "function" == typeof t || !1 }), d.isFinite = function(t) { return isFinite(t) && !isNaN(parseFloat(t)) }, d.isNaN = function(t) { return d.isNumber(t) && t !== +t }, d.isBoolean = function(t) { return t === !0 || t === !1 || "[object Boolean]" === l.call(t) }, d.isNull = function(t) { return null === t }, d.isUndefined = function(t) { return void 0 === t }, d.has = function(t, e) { return null != t && u.call(t, e) }, d.noConflict = function() { return t._ = e, this }, d.identity = function(t) { return t }, d.constant = function(t) { return function() { return t } }, d.noop = function() {}, d.property = function(t) { return function(e) { return e[t] } }, d.matches = function(t) { var e = d.pairs(t),
            n = e.length; return function(t) { if (null == t) return !n;
            t = new Object(t); for (var i = 0; n > i; i++) { var r = e[i],
                    a = r[0]; if (r[1] !== t[a] || !(a in t)) return !1 } return !0 } }, d.times = function(t, e, n) { var i = Array(Math.max(0, t));
        e = p(e, n, 1); for (var r = 0; t > r; r++) i[r] = e(r); return i }, d.random = function(t, e) { return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1)) }, d.now = Date.now || function() { return (new Date).getTime() }; var b = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" },
        x = d.invert(b),
        k = function(t) { var e = function(e) { return t[e] },
                n = "(?:" + d.keys(t).join("|") + ")",
                i = RegExp(n),
                r = RegExp(n, "g"); return function(t) { return t = null == t ? "" : "" + t, i.test(t) ? t.replace(r, e) : t } };
    d.escape = k(b), d.unescape = k(x), d.result = function(t, e) { if (null == t) return void 0; var n = t[e]; return d.isFunction(n) ? t[e]() : n }; var _ = 0;
    d.uniqueId = function(t) { var e = ++_ + ""; return t ? t + e : e }, d.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g }; var C = /(.)^/,
        S = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029" },
        A = /\\|'|\r|\n|\u2028|\u2029/g,
        T = function(t) { return "\\" + S[t] };
    d.template = function(t, e, n) {!e && n && (e = n), e = d.defaults({}, e, d.templateSettings); var i = RegExp([(e.escape || C).source, (e.interpolate || C).source, (e.evaluate || C).source].join("|") + "|$", "g"),
            r = 0,
            a = "__p+='";
        t.replace(i, function(e, n, i, o, s) { return a += t.slice(r, s).replace(A, T), r = s + e.length, n ? a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : i ? a += "'+\n((__t=(" + i + "))==null?'':__t)+\n'" : o && (a += "';\n" + o + "\n__p+='"), e }), a += "';\n", e.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n"; try { var o = new Function(e.variable || "obj", "_", a) } catch (s) { throw s.source = a, s } var l = function(t) { return o.call(this, t, d) },
            u = e.variable || "obj"; return l.source = "function(" + u + "){\n" + a + "}", l }, d.chain = function(t) { var e = d(t); return e._chain = !0, e }; var $ = function(t) { return this._chain ? d(t).chain() : t };
    d.mixin = function(t) { d.each(d.functions(t), function(e) { var n = d[e] = t[e];
            d.prototype[e] = function() { var t = [this._wrapped]; return a.apply(t, arguments), $.call(this, n.apply(d, t)) } }) }, d.mixin(d), d.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) { var e = n[t];
        d.prototype[t] = function() { var n = this._wrapped; return e.apply(n, arguments), "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0], $.call(this, n) } }), d.each(["concat", "join", "slice"], function(t) { var e = n[t];
        d.prototype[t] = function() { return $.call(this, e.apply(this._wrapped, arguments)) } }), d.prototype.value = function() { return this._wrapped }, "function" == typeof define && define.amd && define("underscore", [], function() { return d }) }).call(this),
    function(t, e) { if ("function" == typeof define && define.amd) define(["underscore", "jquery", "exports"], function(n, i, r) { t.Backbone = e(t, r, n, i) });
        else if ("undefined" != typeof exports) { var n = require("underscore");
            e(t, exports, n) } else t.Backbone = e(t, {}, t._, t.jQuery || t.Zepto || t.ender || t.$) }(this, function(t, e, n, i) {
        var r = t.Backbone,
            a = [],
            o = (a.push, a.slice);
        a.splice;
        e.VERSION = "1.1.2", e.$ = i, e.noConflict = function() { return t.Backbone = r, this }, e.emulateHTTP = !1, e.emulateJSON = !1;
        var s = e.Events = { on: function(t, e, n) { if (!u(this, "on", t, [e, n]) || !e) return this;
                    this._events || (this._events = {}); var i = this._events[t] || (this._events[t] = []); return i.push({ callback: e, context: n, ctx: n || this }), this }, once: function(t, e, i) { if (!u(this, "once", t, [e, i]) || !e) return this; var r = this,
                        a = n.once(function() { r.off(t, a), e.apply(this, arguments) }); return a._callback = e, this.on(t, a, i) }, off: function(t, e, i) { var r, a, o, s, l, h, c, f; if (!this._events || !u(this, "off", t, [e, i])) return this; if (!t && !e && !i) return this._events = void 0, this; for (s = t ? [t] : n.keys(this._events), l = 0, h = s.length; h > l; l++)
                        if (t = s[l], o = this._events[t]) { if (this._events[t] = r = [], e || i)
                                for (c = 0, f = o.length; f > c; c++) a = o[c], (e && e !== a.callback && e !== a.callback._callback || i && i !== a.context) && r.push(a);
                            r.length || delete this._events[t] }
                    return this }, trigger: function(t) { if (!this._events) return this; var e = o.call(arguments, 1); if (!u(this, "trigger", t, e)) return this; var n = this._events[t],
                        i = this._events.all; return n && h(n, e), i && h(i, arguments), this }, stopListening: function(t, e, i) { var r = this._listeningTo; if (!r) return this; var a = !e && !i;
                    i || "object" != typeof e || (i = this), t && ((r = {})[t._listenId] = t); for (var o in r) t = r[o], t.off(e, i, this), (a || n.isEmpty(t._events)) && delete this._listeningTo[o]; return this } },
            l = /\s+/,
            u = function(t, e, n, i) { if (!n) return !0; if ("object" == typeof n) { for (var r in n) t[e].apply(t, [r, n[r]].concat(i)); return !1 } if (l.test(n)) { for (var a = n.split(l), o = 0, s = a.length; s > o; o++) t[e].apply(t, [a[o]].concat(i)); return !1 } return !0 },
            h = function(t, e) { var n, i = -1,
                    r = t.length,
                    a = e[0],
                    o = e[1],
                    s = e[2]; switch (e.length) {
                    case 0:
                        for (; ++i < r;)(n = t[i]).callback.call(n.ctx); return;
                    case 1:
                        for (; ++i < r;)(n = t[i]).callback.call(n.ctx, a); return;
                    case 2:
                        for (; ++i < r;)(n = t[i]).callback.call(n.ctx, a, o); return;
                    case 3:
                        for (; ++i < r;)(n = t[i]).callback.call(n.ctx, a, o, s); return;
                    default:
                        for (; ++i < r;)(n = t[i]).callback.apply(n.ctx, e); return } },
            c = { listenTo: "on", listenToOnce: "once" };
        n.each(c, function(t, e) { s[e] = function(e, i, r) { var a = this._listeningTo || (this._listeningTo = {}),
                    o = e._listenId || (e._listenId = n.uniqueId("l")); return a[o] = e, r || "object" != typeof i || (r = this), e[t](i, r, this), this } }), s.bind = s.on, s.unbind = s.off, n.extend(e, s);
        var f = e.Model = function(t, e) { var i = t || {};
            e || (e = {}), this.cid = n.uniqueId("c"), this.attributes = {}, e.collection && (this.collection = e.collection), e.parse && (i = this.parse(i, e) || {}), i = n.defaults({}, i, n.result(this, "defaults")), this.set(i, e), this.changed = {}, this.initialize.apply(this, arguments) };
        n.extend(f.prototype, s, { changed: null, validationError: null, idAttribute: "id", initialize: function() {}, toJSON: function(t) { return n.clone(this.attributes) }, sync: function() { return e.sync.apply(this, arguments) }, get: function(t) { return this.attributes[t] }, escape: function(t) { return n.escape(this.get(t)) }, has: function(t) { return null != this.get(t) }, set: function(t, e, i) { var r, a, o, s, l, u, h, c; if (null == t) return this; if ("object" == typeof t ? (a = t, i = e) : (a = {})[t] = e, i || (i = {}), !this._validate(a, i)) return !1;
                o = i.unset, l = i.silent, s = [], u = this._changing, this._changing = !0, u || (this._previousAttributes = n.clone(this.attributes), this.changed = {}), c = this.attributes, h = this._previousAttributes, this.idAttribute in a && (this.id = a[this.idAttribute]); for (r in a) e = a[r], n.isEqual(c[r], e) || s.push(r), n.isEqual(h[r], e) ? delete this.changed[r] : this.changed[r] = e, o ? delete c[r] : c[r] = e; if (!l) { s.length && (this._pending = i); for (var f = 0, d = s.length; d > f; f++) this.trigger("change:" + s[f], this, c[s[f]], i) } if (u) return this; if (!l)
                    for (; this._pending;) i = this._pending, this._pending = !1, this.trigger("change", this, i); return this._pending = !1, this._changing = !1, this }, unset: function(t, e) { return this.set(t, void 0, n.extend({}, e, { unset: !0 })) }, clear: function(t) { var e = {}; for (var i in this.attributes) e[i] = void 0; return this.set(e, n.extend({}, t, { unset: !0 })) }, hasChanged: function(t) { return null == t ? !n.isEmpty(this.changed) : n.has(this.changed, t) }, changedAttributes: function(t) { if (!t) return this.hasChanged() ? n.clone(this.changed) : !1; var e, i = !1,
                    r = this._changing ? this._previousAttributes : this.attributes; for (var a in t) n.isEqual(r[a], e = t[a]) || ((i || (i = {}))[a] = e); return i }, previous: function(t) { return null != t && this._previousAttributes ? this._previousAttributes[t] : null }, previousAttributes: function() { return n.clone(this._previousAttributes) }, fetch: function(t) { t = t ? n.clone(t) : {}, void 0 === t.parse && (t.parse = !0); var e = this,
                    i = t.success; return t.success = function(n) { return e.set(e.parse(n, t), t) ? (i && i(e, n, t), void e.trigger("sync", e, n, t)) : !1 }, R(this, t), this.sync("read", this, t) }, save: function(t, e, i) { var r, a, o, s = this.attributes; if (null == t || "object" == typeof t ? (r = t, i = e) : (r = {})[t] = e, i = n.extend({ validate: !0 }, i), r && !i.wait) { if (!this.set(r, i)) return !1 } else if (!this._validate(r, i)) return !1;
                r && i.wait && (this.attributes = n.extend({}, s, r)), void 0 === i.parse && (i.parse = !0); var l = this,
                    u = i.success; return i.success = function(t) { l.attributes = s; var e = l.parse(t, i); return i.wait && (e = n.extend(r || {}, e)), n.isObject(e) && !l.set(e, i) ? !1 : (u && u(l, t, i), void l.trigger("sync", l, t, i)) }, R(this, i), a = this.isNew() ? "create" : i.patch ? "patch" : "update", "patch" === a && (i.attrs = r), o = this.sync(a, this, i), r && i.wait && (this.attributes = s), o }, destroy: function(t) { t = t ? n.clone(t) : {}; var e = this,
                    i = t.success,
                    r = function() { e.trigger("destroy", e, e.collection, t) }; if (t.success = function(n) {
                        (t.wait || e.isNew()) && r(), i && i(e, n, t), e.isNew() || e.trigger("sync", e, n, t) }, this.isNew()) return t.success(), !1;
                R(this, t); var a = this.sync("delete", this, t); return t.wait || r(), a }, url: function() { var t = n.result(this, "urlRoot") || n.result(this.collection, "url") || N(); return this.isNew() ? t : t.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id) }, parse: function(t, e) { return t }, clone: function() { return new this.constructor(this.attributes) }, isNew: function() { return !this.has(this.idAttribute) }, isValid: function(t) { return this._validate({}, n.extend(t || {}, { validate: !0 })) }, _validate: function(t, e) { if (!e.validate || !this.validate) return !0;
                t = n.extend({}, this.attributes, t); var i = this.validationError = this.validate(t, e) || null; return i ? (this.trigger("invalid", this, i, n.extend(e, { validationError: i })), !1) : !0 } });
        var d = ["keys", "values", "pairs", "invert", "pick", "omit"];
        n.each(d, function(t) { f.prototype[t] = function() { var e = o.call(arguments); return e.unshift(this.attributes), n[t].apply(n, e) } });
        var p = e.Collection = function(t, e) { e || (e = {}), e.model && (this.model = e.model), void 0 !== e.comparator && (this.comparator = e.comparator), this._reset(), this.initialize.apply(this, arguments), t && this.reset(t, n.extend({ silent: !0 }, e)) },
            g = { add: !0, remove: !0, merge: !0 },
            m = { add: !0, remove: !1 };
        n.extend(p.prototype, s, { model: f, initialize: function() {}, toJSON: function(t) { return this.map(function(e) { return e.toJSON(t) }) }, sync: function() { return e.sync.apply(this, arguments) }, add: function(t, e) { return this.set(t, n.extend({ merge: !1 }, e, m)) }, remove: function(t, e) { var i = !n.isArray(t);
                t = i ? [t] : n.clone(t), e || (e = {}); var r, a, o, s; for (r = 0, a = t.length; a > r; r++) s = t[r] = this.get(t[r]), s && (delete this._byId[s.id], delete this._byId[s.cid], o = this.indexOf(s), this.models.splice(o, 1), this.length--, e.silent || (e.index = o, s.trigger("remove", s, this, e)), this._removeReference(s, e)); return i ? t[0] : t }, set: function(t, e) { e = n.defaults({}, e, g), e.parse && (t = this.parse(t, e)); var i = !n.isArray(t);
                t = i ? t ? [t] : [] : n.clone(t); var r, a, o, s, l, u, h, c = e.at,
                    d = this.model,
                    p = this.comparator && null == c && e.sort !== !1,
                    m = n.isString(this.comparator) ? this.comparator : null,
                    v = [],
                    y = [],
                    w = {},
                    b = e.add,
                    x = e.merge,
                    k = e.remove,
                    _ = !p && b && k ? [] : !1; for (r = 0, a = t.length; a > r; r++) { if (l = t[r] || {}, o = l instanceof f ? s = l : l[d.prototype.idAttribute || "id"], u = this.get(o)) k && (w[u.cid] = !0), x && (l = l === s ? s.attributes : l, e.parse && (l = u.parse(l, e)), u.set(l, e), p && !h && u.hasChanged(m) && (h = !0)), t[r] = u;
                    else if (b) { if (s = t[r] = this._prepareModel(l, e), !s) continue;
                        v.push(s), this._addReference(s, e) } s = u || s, !_ || !s.isNew() && w[s.id] || _.push(s), w[s.id] = !0 } if (k) { for (r = 0, a = this.length; a > r; ++r) w[(s = this.models[r]).cid] || y.push(s);
                    y.length && this.remove(y, e) } if (v.length || _ && _.length)
                    if (p && (h = !0), this.length += v.length, null != c)
                        for (r = 0, a = v.length; a > r; r++) this.models.splice(c + r, 0, v[r]);
                    else { _ && (this.models.length = 0); var C = _ || v; for (r = 0, a = C.length; a > r; r++) this.models.push(C[r]) }
                if (h && this.sort({ silent: !0 }), !e.silent) { for (r = 0, a = v.length; a > r; r++)(s = v[r]).trigger("add", s, this, e);
                    (h || _ && _.length) && this.trigger("sort", this, e) } return i ? t[0] : t }, reset: function(t, e) { e || (e = {}); for (var i = 0, r = this.models.length; r > i; i++) this._removeReference(this.models[i], e); return e.previousModels = this.models, this._reset(), t = this.add(t, n.extend({ silent: !0 }, e)), e.silent || this.trigger("reset", this, e), t }, push: function(t, e) { return this.add(t, n.extend({ at: this.length }, e)) }, pop: function(t) { var e = this.at(this.length - 1); return this.remove(e, t), e }, unshift: function(t, e) { return this.add(t, n.extend({ at: 0 }, e)) }, shift: function(t) { var e = this.at(0); return this.remove(e, t), e }, slice: function() { return o.apply(this.models, arguments) }, get: function(t) { return null == t ? void 0 : this._byId[t] || this._byId[t.id] || this._byId[t.cid] }, at: function(t) { return this.models[t] }, where: function(t, e) { return n.isEmpty(t) ? e ? void 0 : [] : this[e ? "find" : "filter"](function(e) { for (var n in t)
                        if (t[n] !== e.get(n)) return !1; return !0 }) }, findWhere: function(t) { return this.where(t, !0) }, sort: function(t) { if (!this.comparator) throw new Error("Cannot sort a set without a comparator"); return t || (t = {}), n.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(n.bind(this.comparator, this)), t.silent || this.trigger("sort", this, t), this }, pluck: function(t) { return n.invoke(this.models, "get", t) }, fetch: function(t) { t = t ? n.clone(t) : {}, void 0 === t.parse && (t.parse = !0); var e = t.success,
                    i = this; return t.success = function(n) { var r = t.reset ? "reset" : "set";
                    i[r](n, t), e && e(i, n, t), i.trigger("sync", i, n, t) }, R(this, t), this.sync("read", this, t) }, create: function(t, e) { if (e = e ? n.clone(e) : {}, !(t = this._prepareModel(t, e))) return !1;
                e.wait || this.add(t, e); var i = this,
                    r = e.success; return e.success = function(t, n) { e.wait && i.add(t, e), r && r(t, n, e) }, t.save(null, e), t }, parse: function(t, e) { return t }, clone: function() { return new this.constructor(this.models) }, _reset: function() { this.length = 0, this.models = [], this._byId = {} }, _prepareModel: function(t, e) { if (t instanceof f) return t;
                e = e ? n.clone(e) : {}, e.collection = this; var i = new this.model(t, e); return i.validationError ? (this.trigger("invalid", this, i.validationError, e), !1) : i }, _addReference: function(t, e) { this._byId[t.cid] = t, null != t.id && (this._byId[t.id] = t), t.collection || (t.collection = this), t.on("all", this._onModelEvent, this) }, _removeReference: function(t, e) { this === t.collection && delete t.collection, t.off("all", this._onModelEvent, this) }, _onModelEvent: function(t, e, n, i) {
                ("add" !== t && "remove" !== t || n === this) && ("destroy" === t && this.remove(e, i), e && t === "change:" + e.idAttribute && (delete this._byId[e.previous(e.idAttribute)], null != e.id && (this._byId[e.id] = e)), this.trigger.apply(this, arguments)) } });
        var v = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
        n.each(v, function(t) {
            p.prototype[t] = function() {
                var e = o.call(arguments);
                return e.unshift(this.models),
                    n[t].apply(n, e)
            }
        });
        var y = ["groupBy", "countBy", "sortBy", "indexBy"];
        n.each(y, function(t) { p.prototype[t] = function(e, i) { var r = n.isFunction(e) ? e : function(t) { return t.get(e) }; return n[t](this.models, r, i) } });
        var w = e.View = function(t) { this.cid = n.uniqueId("view"), t || (t = {}), n.extend(this, n.pick(t, x)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents() },
            b = /^(\S+)\s*(.*)$/,
            x = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
        n.extend(w.prototype, s, { tagName: "div", $: function(t) { return this.$el.find(t) }, initialize: function() {}, render: function() { return this }, remove: function() { return this.$el.remove(), this.stopListening(), this }, setElement: function(t, n) { return this.$el && this.undelegateEvents(), this.$el = t instanceof e.$ ? t : e.$(t), this.el = this.$el[0], n !== !1 && this.delegateEvents(), this }, delegateEvents: function(t) { if (!t && !(t = n.result(this, "events"))) return this;
                this.undelegateEvents(); for (var e in t) { var i = t[e]; if (n.isFunction(i) || (i = this[t[e]]), i) { var r = e.match(b),
                            a = r[1],
                            o = r[2];
                        i = n.bind(i, this), a += ".delegateEvents" + this.cid, "" === o ? this.$el.on(a, i) : this.$el.on(a, o, i) } } return this }, undelegateEvents: function() { return this.$el.off(".delegateEvents" + this.cid), this }, _ensureElement: function() { if (this.el) this.setElement(n.result(this, "el"), !1);
                else { var t = n.extend({}, n.result(this, "attributes"));
                    this.id && (t.id = n.result(this, "id")), this.className && (t["class"] = n.result(this, "className")); var i = e.$("<" + n.result(this, "tagName") + ">").attr(t);
                    this.setElement(i, !1) } } }), e.sync = function(t, i, r) { var a = _[t];
            n.defaults(r || (r = {}), { emulateHTTP: e.emulateHTTP, emulateJSON: e.emulateJSON }); var o = { type: a, dataType: "json" }; if (r.url || (o.url = n.result(i, "url") || N()), null != r.data || !i || "create" !== t && "update" !== t && "patch" !== t || (o.contentType = "application/json", o.data = JSON.stringify(r.attrs || i.toJSON(r))), r.emulateJSON && (o.contentType = "application/x-www-form-urlencoded", o.data = o.data ? { model: o.data } : {}), r.emulateHTTP && ("PUT" === a || "DELETE" === a || "PATCH" === a)) { o.type = "POST", r.emulateJSON && (o.data._method = a); var s = r.beforeSend;
                r.beforeSend = function(t) { return t.setRequestHeader("X-HTTP-Method-Override", a), s ? s.apply(this, arguments) : void 0 } } "GET" === o.type || r.emulateJSON || (o.processData = !1), "PATCH" === o.type && k && (o.xhr = function() { return new ActiveXObject("Microsoft.XMLHTTP") }); var l = r.xhr = e.ajax(n.extend(o, r)); return i.trigger("request", i, l, r), l };
        var k = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent),
            _ = { create: "POST", update: "PUT", patch: "PATCH", "delete": "DELETE", read: "GET" };
        e.ajax = function() { return e.$.ajax.apply(e.$, arguments) };
        var C = e.Router = function(t) { t || (t = {}), t.routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments) },
            S = /\((.*?)\)/g,
            A = /(\(\?)?:\w+/g,
            T = /\*\w+/g,
            $ = /[\-{}\[\]+?.,\\\^$|#\s]/g;
        n.extend(C.prototype, s, { initialize: function() {}, route: function(t, i, r) { n.isRegExp(t) || (t = this._routeToRegExp(t)), n.isFunction(i) && (r = i, i = ""), r || (r = this[i]); var a = this; return e.history.route(t, function(n) { var o = a._extractParameters(t, n);
                    a.execute(r, o), a.trigger.apply(a, ["route:" + i].concat(o)), a.trigger("route", i, o), e.history.trigger("route", a, i, o) }), this }, execute: function(t, e) { t && t.apply(this, e) }, navigate: function(t, n) { return e.history.navigate(t, n), this }, _bindRoutes: function() { if (this.routes) { this.routes = n.result(this, "routes"); for (var t, e = n.keys(this.routes); null != (t = e.pop());) this.route(t, this.routes[t]) } }, _routeToRegExp: function(t) { return t = t.replace($, "\\$&").replace(S, "(?:$1)?").replace(A, function(t, e) { return e ? t : "([^/?]+)" }).replace(T, "([^?]*?)"), new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$") }, _extractParameters: function(t, e) { var i = t.exec(e).slice(1); return n.map(i, function(t, e) { return e === i.length - 1 ? t || null : t ? decodeURIComponent(t) : null }) } });
        var E = e.History = function() { this.handlers = [], n.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history) },
            O = /^[#\/]|\s+$/g,
            F = /^\/+|\/+$/g,
            M = /msie [\w.]+/,
            I = /\/$/,
            j = /#.*$/;
        E.started = !1, n.extend(E.prototype, s, { interval: 50, atRoot: function() { return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root }, getHash: function(t) { var e = (t || this).location.href.match(/#(.*)$/); return e ? e[1] : "" }, getFragment: function(t, e) { if (null == t)
                    if (this._hasPushState || !this._wantsHashChange || e) { t = decodeURI(this.location.pathname + this.location.search); var n = this.root.replace(I, "");
                        t.indexOf(n) || (t = t.slice(n.length)) } else t = this.getHash(); return t.replace(O, "") }, start: function(t) { if (E.started) throw new Error("Backbone.history has already been started");
                E.started = !0, this.options = n.extend({ root: "/" }, this.options, t), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState); var i = this.getFragment(),
                    r = document.documentMode,
                    a = M.exec(navigator.userAgent.toLowerCase()) && (!r || 7 >= r); if (this.root = ("/" + this.root + "/").replace(F, "/"), a && this._wantsHashChange) { var o = e.$('<iframe src="javascript:0" tabindex="-1">');
                    this.iframe = o.hide().appendTo("body")[0].contentWindow, this.navigate(i) } this._hasPushState ? e.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !a ? e.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = i; var s = this.location; if (this._wantsHashChange && this._wantsPushState) { if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + "#" + this.fragment), !0;
                    this._hasPushState && this.atRoot() && s.hash && (this.fragment = this.getHash().replace(O, ""), this.history.replaceState({}, document.title, this.root + this.fragment)) } return this.options.silent ? void 0 : this.loadUrl() }, stop: function() { e.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), this._checkUrlInterval && clearInterval(this._checkUrlInterval), E.started = !1 }, route: function(t, e) { this.handlers.unshift({ route: t, callback: e }) }, checkUrl: function(t) { var e = this.getFragment(); return e === this.fragment && this.iframe && (e = this.getFragment(this.getHash(this.iframe))), e === this.fragment ? !1 : (this.iframe && this.navigate(e), void this.loadUrl()) }, loadUrl: function(t) { return t = this.fragment = this.getFragment(t), n.any(this.handlers, function(e) { return e.route.test(t) ? (e.callback(t), !0) : void 0 }) }, navigate: function(t, e) { if (!E.started) return !1;
                e && e !== !0 || (e = { trigger: !!e }); var n = this.root + (t = this.getFragment(t || "")); if (t = t.replace(j, ""), this.fragment !== t) { if (this.fragment = t, "" === t && "/" !== n && (n = n.slice(0, -1)), this._hasPushState) this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, n);
                    else { if (!this._wantsHashChange) return this.location.assign(n);
                        this._updateHash(this.location, t, e.replace), this.iframe && t !== this.getFragment(this.getHash(this.iframe)) && (e.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, t, e.replace)) } return e.trigger ? this.loadUrl(t) : void 0 } }, _updateHash: function(t, e, n) { if (n) { var i = t.href.replace(/(javascript:|#).*$/, "");
                    t.replace(i + "#" + e) } else t.hash = "#" + e } }), e.history = new E;
        var z = function(t, e) { var i, r = this;
            i = t && n.has(t, "constructor") ? t.constructor : function() { return r.apply(this, arguments) }, n.extend(i, r, e); var a = function() { this.constructor = i }; return a.prototype = r.prototype, i.prototype = new a, t && n.extend(i.prototype, t), i.__super__ = r.prototype, i };
        f.extend = p.extend = C.extend = w.extend = E.extend = z;
        var N = function() { throw new Error('A "url" property or function must be specified') },
            R = function(t, e) { var n = e.error;
                e.error = function(i) { n && n(t, i, e), t.trigger("error", t, i, e) } };
        return e
    }), MEME = { $: jQuery, render: function() { this.canvas && this.canvas.render() }, init: function() { this.model = new this.MemeModel(window.MEME_SETTINGS || {}), this.canvas = new this.MemeCanvasView({ el: "#meme-canvas-view", model: this.model }), this.editor = new this.MemeEditorView({ el: "#meme-editor-view", model: this.model }), this.waitForFonts().then(function() { MEME.render() }) } }, MEME.$(function() { MEME.init() }), MEME.MemeModel = Backbone.Model.extend({ defaults: { aspectRatio: "twitter", backgroundPosition: { x: null, y: null }, backgroundColor: null, backgroundColorOpts: ["#FFF", "#000", "#CCC"], creditFont: "", creditText: "Source:", creditSize: 12, downloadName: "share", fontColor: "#FFF", fontColorOpts: ["#FFF", "#000", "#CCC"], fontStyle: "", fontFamily: "Helvetica Neue", fontFamilyOpts: ["Helvetica", "Helvetica Neue", "Comic Sans MS"], fontSize: 24, fontSizeOpts: [14, 24, 36], letterSpacing: 0, logoSide: "right", paddingScale: 0, headlineText: "Write your own headline", height: 378, imageScale: 1, imageSrc: "", overlayAlpha: .5, overlayColor: "#000", overlayColorOpts: ["#000", "#777", "#2980b9"], paddingRatio: .05, textAlign: "left", textAlignOpts: ["left", "center", "right"], textAlignVertical: "Align top", textAlignVerticalOpts: ["Align top", "Align middle", "Align bottom"], textShadow: !0, textShadowEdit: !0, headUppercase: !1, sourceUppercase: !1, textUppercaseEdit: !1, watermarkAlpha: .75, watermarkMaxWidthRatio: .25, watermarkColor: "default", watermarkDark: "", watermarkSrc: "", watermarkOpts: ["Rumi (color)","Rumi (white)"], width: 755 }, initialize: function() { this.background = new Image, this.watermark = new Image, this.background.onload = this.watermark.onload = _.bind(function() { this.trigger("change") }, this), this.get("imageSrc") && (this.background.src = this.get("imageSrc")), this.get("watermarkSrc") && this.setWatermarkSrc(this.get("watermarkSrc")), this.listenTo(this, "change:imageSrc", function() { this.background.src = this.get("imageSrc") }), this.listenTo(this, "change:watermarkSrc", function() { this.setWatermarkSrc(this.get("watermarkSrc")) }) }, hasBackground: function() { return this.background.width && this.background.height }, loadFileForImage: function(t, e) { var n = new FileReader;
            n.onload = function() { e.src = n.result }, n.readAsDataURL(t) }, loadBackground: function(t) { this.loadFileForImage(t, this.background) }, loadWatermark: function(t) { this.loadFileForImage(t, this.watermark) }, setWatermarkSrc: function(t) { var e = _.findWhere(this.get("watermarkOpts"), { value: t }),
                n = e && e.data || t;
            0 === n.indexOf("data:") ? this.watermark.removeAttribute("crossorigin") : this.watermark.setAttribute("crossorigin", "anonymous"), this.watermark.src = n, this.set("watermarkSrc", t) } }), MEME.MemeCanvasView = Backbone.View.extend({ changelog: void 0, initialize: function() { var t = document.createElement("canvas"),
                e = MEME.$("#meme-canvas");
            t && t.getContext ? (e.html(t), this.canvas = t, this.setDownload(), this.render()) : e.html(this.$("noscript").html()), this.listenTo(this.model, "change", this.render) }, setDownload: function() { var t = document.createElement("a"); "undefined" == typeof t.download && this.$el.append('<p class="m-canvas__download-note">Right-click button and select "Download Linked File..." to save image.</p>') }, render: function() {
            function t(t) { var e = s.background.height,
                    n = s.background.width; if (e && n) { var i = e * l.imageScale,
                        r = n * l.imageScale,
                        a = l.backgroundPosition.x || l.width / 2,
                        o = l.backgroundPosition.y || l.height / 2;
                    t.drawImage(s.background, 0, 0, n, e, a - r / 2, o - i / 2, r, i) } }

            function e(t) { l.backgroundColor && (t.fillStyle = l.backgroundColor, t.fillRect(0, 0, l.width, l.height)) }

            function n(t) { l.overlayColor && (t.save(), t.globalAlpha = l.overlayAlpha, t.fillStyle = l.overlayColor, t.fillRect(0, 0, l.width, l.height), t.globalAlpha = 1, t.restore()) }

            function i(t) { var e = Math.round(.75 * l.width),
                    n = c,
                    i = c; "DINNextLTPro-BoldCondensed" == l.fontFamily || "Harriet display" == l.fontFamily ? l.fontStyle = "bold italic" : "Gotham SSm A, Gotham SSm B" == l.fontFamily && (l.fontStyle = ""), t.font = (l.fontStyle ? l.fontStyle + " " : "") + l.fontSize + "pt " + l.fontFamily, t.fillStyle = l.fontColor, t.textBaseline = "top", l.textShadow && (t.shadowColor = "#666", t.shadowOffsetX = -2, t.shadowOffsetY = 1, t.shadowBlur = 10); var r = 0; "left-right" == l.alternateLayout && (r = l.width / 2 - 2 * c), "center" == l.textAlign ? (t.textAlign = "center", n = l.width / 2, e = l.width - l.width / 3) : "right" == l.textAlign ? (t.textAlign = "right", n = l.width - c, e -= r) : (t.textAlign = "left", e -= r); var a = parseInt(l.paddingScale); "Align top" == l.textAlignVertical ? i = c + a : "Align middle" == l.textAlignVertical ? i = l.height - l.height / 1.5 : (t.textBaseline = "Align bottom", i = l.height - 3 * c - a), l.headUppercase && (l.headlineText = l.headlineText.toUpperCase()); var o, s = l.headlineText,
                    u = s.match(/\*[^\*_]+\*|_[^\*_]+_|\*_[^\*_]+_\*|_\*[^\*_]+\*_/g),
                    h = [],
                    f = {};
                u && (_.each(u, function(t) { var e = t;
                    t.match(/\*_[^\*_]+_\*|_\*[^\*_]+\*_/g) ? (e = e.replace("_*", "%"), e = e.replace("*_", "%"), e = e.split(" ").join("% %"), h.unshift(t)) : (e = t.match(/\*[^\*_]+\*/g) ? t.split(" ").join("* *") : t.split(" ").join("_ _"), h.push(t)); var n = "\u2981" + e + "\u2981";
                    f[t] = n }), _.each(h, function(t) { s = s.replace(t, f[t]) }), o = s.split(/\s/)); for (var d = l.headlineText.split(" "), p = "", g = "", m = "\u200a", v = "\u2009", y = "\u205f", w = "\u2002", b = [g, m, v, y, w], x = [], k = 0; k < d.length; k++) { for (var C = 0; C < d[k].length; C++) x.push(d[k][C]), x.push(b[l.letterSpacing]);
                    x.push("&nbsp;") } for (var S = "", A = [], T = [], $ = 0; $ < x.length; $++) "&nbsp;" == x[$] ? (A.push(S), A.push("&nbsp;"), S = "") : S += x[$]; if (d = A, "undefined" != typeof o) { d = o; for (var E = 0; E < d.length; E++) T.push(" ");
                    d = _.flatten(_.zip(d, T)), d = _.flatten(_.map(d, function(t) { return t.split(/\u2981/) })) } if ("left" == l.textAlign)
                    for (var O = 0, F = "", M = "", I = !1, E = 0; E < d.length; E++) I = !1, l.headUppercase && (F = F.toUpperCase()), F = d[E], "&nbsp;" == F && (F = " "), O >= e ? (O = 0, i += Math.round(1.5 * l.fontSize)) : "\\n" == F.toLowerCase() ? (O = 0, i += Math.round(1.5 * l.fontSize), E++) : O <= t.measureText(" ").width && " " == F ? E++ : "%" == F[0] && "%" == F[F.length - 1] ? (t.font = "bold italic " + l.fontSize + "pt " + l.fontFamily, t.fillText(F.substring(1, F.length - 1), O + c, i), O += t.measureText(F.substring(1, F.length - 1)).width) : "*" == F[0] && "*" == F[F.length - 1] ? (t.font = "bold " + l.fontSize + "pt " + l.fontFamily, t.fillText(F.substring(1, F.length - 1), O + c, i), O += t.measureText(F.substring(1, F.length - 1)).width) : "_" == F[0] && "_" == F[F.length - 1] ? (t.font = "italic " + l.fontSize + "pt " + l.fontFamily, t.fillText(F.substring(1, F.length - 1), O + c, i), O += t.measureText(F.substring(1, F.length - 1)).width) : "bold" == M || "italic" == M ? (t.font = M + " " + l.fontSize + "pt " + l.fontFamily, t.fillText(F.substring(1, F.length - 1), O + c, i), O += t.measureText(F.substring(1, F.length - 1)).width) : (t.font = (l.fontStyle ? l.fontStyle + " " : "") + l.fontSize + "pt " + l.fontFamily, t.fillText(F, O + c, i), O += t.measureText(F).width);
                else { var p = "";
                    console.log(d); for (var E = 0; E < d.length; E++)
                        if ("&nbsp;" != d[E]) { var j = p + d[E],
                                z = t.measureText(j),
                                N = z.width;
                            N > e && E > 0 ? (t.fillText(p, n, i), p = d[E] + " ", i += Math.round(1.5 * l.fontSize)) : p = j + " " }
                    l.headUppercase && (p = p.toUpperCase()), t.fillText(p, n, i) } t.shadowColor = "transparent" }

            function r(t) { "left-right" == l.alternateLayout && (t.fillStyle = l.backgroundColor, t.fillRect(0, 0, Math.round(.5 * l.width), l.height)) }

            function a(t) { l.creditFont && (l.fontFamily = l.creditFont), t.textBaseline = "bottom", t.textAlign = "left", t.fillStyle = l.fontColor, t.font = "normal " + l.creditSize + "pt " + l.fontFamily, l.sourceUppercase && (l.creditText = l.creditText.toUpperCase()), t.fillText(l.creditText, c, l.height - c) }

            function o(t) { "default" != l.watermarkColor && ("light" == l.watermarkColor ? s.watermark.src = l.watermarkSrc : s.watermark.src = l.watermarkDark); var e, n, i, r; if (n = r = s.watermark.height, e = i = s.watermark.width, n && e) { var a = l.width * l.watermarkMaxWidthRatio;
                    e > a && (r = n * (a / e), i = a), t.globalAlpha = l.watermarkAlpha, "left" == l.logoSide ? (t.drawImage(s.watermark, 0, 0, e, n, c, l.height - c - r, i, r), l.creditText = "") : t.drawImage(s.watermark, 0, 0, e, n, l.width - c - i, l.height - c - r, i, r), t.globalAlpha = 1 } } if (this.canvas && JSON.stringify(this.changelog) !== JSON.stringify(this.model.changedAttributes())) { this.changelog = this.model.changedAttributes(); var s = this.model,
                    l = this.model.toJSON(),
                    u = this.canvas.getContext("2d"),
                    h = 30,
                    c = Math.round(l.width * l.paddingRatio + h); switch (l.aspectRatio) {
                    case "twitter":
                        l.width = 1024, l.height = 512; break;
                    case "facebook":
                        l.width = 1200, l.height = 630; break;
                    case "instagram":
                        l.width = 1080, l.height = 1080; break;
                    case "pinterest":
                        l.width = 736, l.height = 1128 } this.canvas.width = l.width, this.canvas.height = l.height, u.clearRect(0, 0, l.width, l.height), e(u), "no-image" != l.alternateLayout && t(u), n(u), r(u), i(u), o(u), a(u); var f = this.canvas.toDataURL();
                this.$("#meme-download").attr({ href: f, download: (l.downloadName || "share") + ".png" }), this.canvas.style.cursor = this.model.background.width ? "move" : "default" } }, events: { "mousedown canvas": "onDrag" }, onDrag: function(t) {
            function e(t) { t.preventDefault(), n.set("backgroundPosition", { x: Math.max(i.width - r, Math.min(s.x - (o.x - t.clientX), r)), y: Math.max(i.height - a, Math.min(s.y - (o.y - t.clientY), a)) }) } if (t.preventDefault(), this.model.hasBackground()) { var n = this.model,
                    i = n.toJSON(),
                    r = n.background.width * i.imageScale / 2,
                    a = n.background.height * i.imageScale / 2,
                    o = { x: t.clientX, y: t.clientY },
                    s = i.backgroundPosition;
                s.x = s.x || i.width / 2, s.y = s.y || i.height / 2; var l = MEME.$(document).on("mousemove.drag", e).on("mouseup.drag", function(t) { l.off("mouseup.drag mousemove.drag"), e(t) }) } } }), MEME.MemeEditorView = Backbone.View.extend({ initialize: function() { this.buildForms(), this.listenTo(this.model, "change", this.render), this.render(), $(".tab").click(function() { $("." + $(this).attr("data-pane")).css("display", "block"), $(this).css("border-bottom", "2px solid rgba(76, 78, 77, .2)"), $(this).siblings().css("border-bottom", "2px solid rgba(76, 78, 77, .025)"), $("." + $(this).siblings().attr("data-pane")).css("display", "none") }) }, contrastCheck: function() {
            function t(t, e) { return e ? Math.max(t.r, e.r) - Math.min(t.r, e.r) + (Math.max(t.g, e.g) - Math.min(t.g, e.g)) + (Math.max(t.b, e.b) - Math.min(t.b, e.b)) : 255 }

            function e(t) { t.length <= 4 ? t = t[0] + t[1] + t[1] + t[2] + t[2] + t[3] + t[3] : t; var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t); return e ? { r: parseInt(e[1], 16), g: parseInt(e[2], 16), b: parseInt(e[3], 16) } : null } var n = e(this.model.get("overlayColor")),
                i = e(this.model.get("fontColor")),
                r = t(i, n); if (this.model.get("backgroundColor")) var a = e(this.model.get("backgroundColor")),
                o = t(i, a),
                s = !0;
            (this.model.get("overlayColor") && 250 > r || s && 250 > o) && alert("You've selected a color combination with low contrast. For accessibility purposes, consider making a new selection") }, buildForms: function() {
            function t(t) { return _.reduce(t, function(t, e) { return t += ['<option value="', e.hasOwnProperty("value") ? e.value : e, '">', e.hasOwnProperty("text") ? e.text : e, "</option>"].join("") }, "") } var e = this.model.toJSON(); if (e.textShadowEdit && $("#text-shadow").parent().show(), e.fontColorOpts && e.fontColorOpts.length) { var n = _.reduce(e.fontColorOpts, function(t, e) { var n = e.hasOwnProperty("value") ? e.value : e; return t += '<li><label><input class="m-editor__swatch" style="background-color:' + n + '" type="radio" name="font-color" value="' + n + '"></label></li>' }, "");
                $("#font-color").show().find("ul").append(n) } if (e.backgroundColorOpts && e.backgroundColorOpts.length) { var i = _.reduce(e.backgroundColorOpts, function(t, e) { var n = e.hasOwnProperty("value") ? e.value : e; return t += '<li><label><input class="m-editor__swatch" style="background-color:' + n + '" type="radio" name="background-color" value="' + n + '"></label></li>' }, "");
                $("#background-color").show().find("ul").append(i) } if (e.textAlignOpts && e.textAlignOpts.length && $("#text-align").append(t(e.textAlignOpts)).show(), e.textAlignVerticalOpts && e.textAlignVerticalOpts.length && $("#text-align-vertical").append(t(e.textAlignVerticalOpts)).show(), e.fontFamilyOpts && e.fontFamilyOpts.length && $("#font-family").append(t(e.fontFamilyOpts)).show(), e.overlayColorOpts && e.overlayColorOpts.length) { var r = _.reduce(e.overlayColorOpts, function(t, e) { var n = e.hasOwnProperty("value") ? e.value : e; return t += '<li><label><input class="m-editor__swatch" style="background-color:' + n + '" type="radio" name="overlay" value="' + n + '"></label></li>' }, "");
                $("#overlay").show().find("ul").append(r) } }, render: function() { var t = this.model.toJSON();
            this.$("#headline").val(t.headlineText), this.$("#background-color").val(t.backgroundColor), this.$("#credit").val(t.creditText), this.$("#image-scale").val(t.imageScale), this.$("#font-color").val(t.fontColor), this.$("#font-size").val(t.fontSize), this.$("#padding-scale").val(t.paddingScale), this.$("#font-family").val(t.fontFamily), this.$("#text-align").val(t.textAlign), this.$("#text-align-vertical").val(t.textAlignVertical), this.$("#text-shadow").prop("checked", t.textShadow), this.$("#head-uppercase").prop("checked", t.headUppercase), this.$("#source-uppercase").prop("checked", t.sourceUppercase), this.$("#overlay").find('[value="' + t.overlayColor + '"]').prop("checked", !0), this.$("#overlay-opacity").val(t.overlayAlpha), this.$("#watermark-color").val(t.watermarkColor), this.$("#alternate-layout").val(t.alternateLayout), this.$("#letter-spacing").val(t.letterSpacing), this.$("#logo-side").val(t.logoSide) }, events: { "input #headline": "onHeadline", "input #credit": "onCredit", "input #image-scale": "onScale", "change #background-color": "onBackgroundColor", "change #aspect-ratio": "onAspectRatio", "change #file-input": "onFileSelect", "change #watermark-file-input": "onWatermark", "change #font-color": "onFontColor", "change #font-size": "onFontSize", "change #font-scale": "onFontScale", "change #padding-scale": "onPaddingScale", "change #font-family": "onFontFamily", "change #text-align": "onTextAlign", "change #text-align-vertical": "onTextAlignVertical", "change #text-shadow": "onTextShadow", "change #head-uppercase": "onHeadUppercase", "change #source-uppercase": "onSourceUppercase", 'change [name="overlay"]': "onOverlayColor", "change #overlay-opacity": "onOverlayOpacity", "change #alternate-layout": "onAlternateLayout", "change #letter-spacing": "onLetterSpacing", "change #logo-side": "onLogoSide", "dragover #dropzone": "onZoneOver", "dragleave #dropzone": "onZoneOut", "drop #dropzone": "onZoneDrop", "dragover #dropzone-watermark": "onWatermarkZoneOver", "dragleave #dropzone-watermark": "onWatermarkZoneOut", "drop #dropzone-watermark": "onWatermarkZoneDrop", "click #dropzone": "onZoneClick", "click #dropzone-watermark": "onWatermarkClick", "change #watermark-color": "onWatermarkColor" }, onCredit: function() { this.model.set("creditText", this.$("#credit").val()) }, onHeadline: function() { this.model.set("headlineText", this.$("#headline").val()) }, onAspectRatio: function() { this.model.set("aspectRatio", this.$("#aspect-ratio").val()) }, onBackgroundColor: function(t) { this.model.set("backgroundColor", this.$(t.target).val()), this.contrastCheck() }, onTextAlign: function() { this.model.set("textAlign", this.$("#text-align").val()) }, onTextAlignVertical: function() { this.model.set("textAlignVertical", this.$("#text-align-vertical").val()) }, onTextShadow: function() { this.model.set("textShadow", this.$("#text-shadow").prop("checked")) }, onHeadUppercase: function() { this.model.set("headUppercase", this.$("#head-uppercase").prop("checked")) }, onSourceUppercase: function() { this.model.set("sourceUppercase", this.$("#source-uppercase").prop("checked")) }, onFontColor: function(t) { this.model.set("fontColor", this.$(t.target).val()), this.contrastCheck() }, onFontSize: function() { this.model.set("fontSize", this.$("#font-size").val()) }, onPaddingScale: function() { this.model.set("paddingScale", this.$("#padding-scale").val()) }, onFontFamily: function() { this.model.set("fontFamily", this.$("#font-family").val()) }, onLetterSpacing: function() { this.model.set("letterSpacing", this.$("#letter-spacing").val()) }, onWatermark: function(t) { var e = t.target;
            e && this.model.loadWatermark(e.files[0]) }, onLogoSide: function() { this.model.set("logoSide", this.$("#logo-side").val()) }, onScale: function() { this.model.set("imageScale", this.$("#image-scale").val()) }, onOverlayColor: function(t) { this.model.set("overlayColor", this.$(t.target).val()), this.contrastCheck() }, onOverlayOpacity: function() { this.model.set("overlayAlpha", this.$("#overlay-opacity").val()) }, getDataTransfer: function(t) { return t.stopPropagation(), t.preventDefault(), t.originalEvent.dataTransfer || null }, onZoneOver: function(t) { var e = this.getDataTransfer(t);
            e && (e.dropEffect = "copy", this.$("#dropzone").addClass("pulse")) }, onZoneOut: function(t) { this.$("#dropzone").removeClass("pulse") }, onWatermarkZoneOver: function(t) { var e = this.getDataTransfer(t);
            e && (e.dropEffect = "copy", this.$("#dropzone-watermark").addClass("pulse")) }, onWatermarkZoneOut: function(t) { this.$("#dropzone-watermark").removeClass("pulse") }, onWatermarkZoneDrop: function(t) { var e = this.getDataTransfer(t);
            e && (this.model.loadWatermark(e.files[0]), this.$("#dropzone-watermark").removeClass("pulse")) }, onZoneDrop: function(t) { var e = this.getDataTransfer(t),
                n = this.model;
            e && (n.loadBackground(e.files[0]), this.$("#dropzone").removeClass("pulse"), n.background.onload = function() { n.set("imageSrc", n.background.src) }) }, onFileSelect: function(t) { var e = t.target,
                n = this.model;
            e && (n.loadBackground(e.files[0]), n.background.onload = function() { n.set("imageSrc", n.background.src) }) }, onZoneClick: function() { $("#file-input").click() }, onWatermarkClick: function() { $("#watermark-file-input").click() }, onWatermarkColor: function() { this.model.set("watermarkColor", this.$("#watermark-color").val()) }, onAlternateLayout: function() { this.model.set("alternateLayout", this.$("#alternate-layout").val()) } }), MEME.waitForFonts = function(t) {
        function e(t) { var e = document.createElement("span");
            e.innerHTML = "giItT1WQy@!-/#", e.style.position = "absolute", e.style.left = e.style.top = "-10000px", e.style.fontSize = "300px", e.style.fontFamily = "sans-serif", e.style.fontVariant = "normal", e.style.fontStyle = "normal", e.style.fontWeight = "normal", e.style.letterSpacing = "0", document.body.appendChild(e), this.el = e, this.sw = e.offsetWidth, e.style.fontFamily = t }

        function n() { if (!(a < o.length)) return r.resolve(), void("function" == typeof t && t());
            setTimeout(n, 50); for (var e = 0; e < o.length; e++) { var i = o[e];
                i.el && i.el.offsetWidth != i.sw && (i.el.parentNode.removeChild(i.el), i.el = null, a++) } } var i = this.model.get("fontFamily").split(",");
        i = _.map(this.model.get("fontFamilyOpts") || [], function(t) { return t.hasOwnProperty("value") ? t.value : t }).concat(i), i = _.unique(i); for (var r = this.$.Deferred(), a = 0, o = [], s = 0; s < i.length; s++) o.push(new e(i[s])); return n(), r.promise() };