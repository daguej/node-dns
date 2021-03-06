/*
Copyright 2011 Timothy J Fontaine <tjfontaine@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN

*/

"use strict";

exports.createServer = require('./lib/server').createServer;

var client = require('./lib/client');
exports.lookup = client.lookup;
exports.resolve = client.resolve;
exports.resolve4 = client.resolve4;
exports.resolve6 = client.resolve6;
exports.resolveMx = client.resolveMx;
exports.resolveTxt = client.resolveTxt;
exports.resolveSrv = client.resolveSrv;
exports.resolveNs = client.resolveNs;
exports.resolveCname = client.resolveCname;
exports.reverse = client.reverse;

var consts = require('./lib/consts');
exports.BADNAME = consts.BADNAME;
exports.BADRESP = consts.BADRESP;
exports.CONNREFUSED = consts.CONNREFUSED;
exports.DESTRUCTION = consts.DESTRUCTION;
exports.REFUSED = consts.REFUSED;
exports.FORMERR = consts.FORMERR;
exports.NODATA = consts.NODATA;
exports.NOMEM = consts.NOMEM;
exports.NOTFOUND = consts.NOTFOUND;
exports.NOTIMP = consts.NOTIMP;
exports.SERVFAIL = consts.SERVFAIL;
exports.TIMEOUT = consts.TIMEOUT;

var types = require('./lib/types');

var createType = function(name) {
  exports[name] = function (vals) {
    return new types.exported[name](vals);
  };
};

var n;
for (n in types.exported) {
  if (types.exported.hasOwnProperty(n)) {
    createType(n);
  }
}

exports.registerType = function(name, fields) {
  types.registerType(name, fields);
  createType(name);
};
