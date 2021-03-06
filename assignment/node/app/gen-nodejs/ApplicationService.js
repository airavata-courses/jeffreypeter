//
// Autogenerated by Thrift Compiler (0.10.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = require('./application_types');
//HELPER FUNCTIONS AND STRUCTURES

var ApplicationService_communicate_args = function(args) {
  this.input = null;
  if (args) {
    if (args.input !== undefined && args.input !== null) {
      this.input = args.input;
    }
  }
};
ApplicationService_communicate_args.prototype = {};
ApplicationService_communicate_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.input = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ApplicationService_communicate_args.prototype.write = function(output) {
  output.writeStructBegin('ApplicationService_communicate_args');
  if (this.input !== null && this.input !== undefined) {
    output.writeFieldBegin('input', Thrift.Type.STRING, 1);
    output.writeString(this.input);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var ApplicationService_communicate_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
  }
};
ApplicationService_communicate_result.prototype = {};
ApplicationService_communicate_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ApplicationService_communicate_result.prototype.write = function(output) {
  output.writeStructBegin('ApplicationService_communicate_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var ApplicationServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
ApplicationServiceClient.prototype = {};
ApplicationServiceClient.prototype.seqid = function() { return this._seqid; };
ApplicationServiceClient.prototype.new_seqid = function() { return this._seqid += 1; };
ApplicationServiceClient.prototype.communicate = function(input, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_communicate(input);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_communicate(input);
  }
};

ApplicationServiceClient.prototype.send_communicate = function(input) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('communicate', Thrift.MessageType.CALL, this.seqid());
  var args = new ApplicationService_communicate_args();
  args.input = input;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

ApplicationServiceClient.prototype.recv_communicate = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new ApplicationService_communicate_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('communicate failed: unknown result');
};
var ApplicationServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler;
}
;
ApplicationServiceProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}
;
ApplicationServiceProcessor.prototype.process_communicate = function(seqid, input, output) {
  var args = new ApplicationService_communicate_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.communicate.length === 1) {
    Q.fcall(this._handler.communicate, args.input)
      .then(function(result) {
        var result_obj = new ApplicationService_communicate_result({success: result});
        output.writeMessageBegin("communicate", Thrift.MessageType.REPLY, seqid);
        result_obj.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result;
        result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("communicate", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.communicate(args.input, function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined')) {
        result_obj = new ApplicationService_communicate_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("communicate", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("communicate", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};
