"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EvmType = /** @class */ (function () {
    function EvmType() {
    }
    EvmType.prototype.generateCodeForInput = function () {
        return this.generateCodeForOutput();
    };
    EvmType.prototype.generateCodeForInputConversion = function (paramName) {
        return paramName + ".toString()";
    };
    return EvmType;
}());
exports.EvmType = EvmType;
var BooleanType = /** @class */ (function (_super) {
    __extends(BooleanType, _super);
    function BooleanType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BooleanType.prototype.generateCodeForOutput = function () {
        return 'boolean';
    };
    return BooleanType;
}(EvmType));
exports.BooleanType = BooleanType;
var IntegerType = /** @class */ (function (_super) {
    __extends(IntegerType, _super);
    function IntegerType(bits) {
        var _this = _super.call(this) || this;
        _this.bits = bits;
        return _this;
    }
    IntegerType.prototype.generateCodeForInput = function () {
        return 'EtherInteger';
    };
    IntegerType.prototype.generateCodeForOutput = function () {
        return 'BigNumber';
    };
    return IntegerType;
}(EvmType));
exports.IntegerType = IntegerType;
var UnsignedIntegerType = /** @class */ (function (_super) {
    __extends(UnsignedIntegerType, _super);
    function UnsignedIntegerType(bits) {
        var _this = _super.call(this) || this;
        _this.bits = bits;
        return _this;
    }
    UnsignedIntegerType.prototype.generateCodeForInput = function () {
        return 'EtherInteger';
    };
    UnsignedIntegerType.prototype.generateCodeForOutput = function () {
        return 'BigNumber';
    };
    return UnsignedIntegerType;
}(EvmType));
exports.UnsignedIntegerType = UnsignedIntegerType;
var VoidType = /** @class */ (function (_super) {
    __extends(VoidType, _super);
    function VoidType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VoidType.prototype.generateCodeForOutput = function () {
        return 'void';
    };
    return VoidType;
}(EvmType));
exports.VoidType = VoidType;
var StringType = /** @class */ (function (_super) {
    __extends(StringType, _super);
    function StringType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringType.prototype.generateCodeForOutput = function () {
        return 'string';
    };
    StringType.prototype.generateCodeForInputConversion = function (paramName) {
        return paramName;
    };
    return StringType;
}(EvmType));
exports.StringType = StringType;
var BytesType = /** @class */ (function (_super) {
    __extends(BytesType, _super);
    function BytesType(size) {
        var _this = _super.call(this) || this;
        _this.size = size;
        return _this;
    }
    BytesType.prototype.generateCodeForOutput = function () {
        return 'BigNumber';
    };
    return BytesType;
}(EvmType));
exports.BytesType = BytesType;
var AddressType = /** @class */ (function (_super) {
    __extends(AddressType, _super);
    function AddressType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddressType.prototype.generateCodeForOutput = function () {
        return 'string';
    };
    AddressType.prototype.generateCodeForInput = function () {
        return 'EtherAddress';
    };
    return AddressType;
}(EvmType));
exports.AddressType = AddressType;
var ArrayType = /** @class */ (function (_super) {
    __extends(ArrayType, _super);
    function ArrayType(itemType, size) {
        var _this = _super.call(this) || this;
        _this.itemType = itemType;
        _this.size = size;
        return _this;
    }
    ArrayType.prototype.generateCodeForOutput = function () {
        return this.itemType.generateCodeForOutput() + '[]';
    };
    ArrayType.prototype.generateCodeForInput = function () {
        return this.itemType instanceof BytesType ? 'string' : this.generateCodeForOutput();
    };
    ArrayType.prototype.generateCodeForInputConversion = function (paramName) {
        if (this.itemType instanceof BytesType) {
            return paramName;
        }
        else {
            return paramName + ".map(val => " + this.itemType.generateCodeForInputConversion('val') + ")";
        }
    };
    return ArrayType;
}(EvmType));
exports.ArrayType = ArrayType;
var isUIntTypeRegex = /^uint([0-9]*)$/;
var isIntTypeRegex = /^int([0-9]*)$/;
var isBytesTypeRegex = /^bytes([0-9]+)$/;
function parseEvmType(rawType) {
    var lastChar = rawType[rawType.length - 1];
    if (lastChar === ']') {
        // we parse array type
        var finishArrayTypeIndex = rawType.length - 2;
        while (rawType[finishArrayTypeIndex] !== '[') {
            finishArrayTypeIndex--;
        }
        var arraySizeRaw = rawType.slice(finishArrayTypeIndex + 1, rawType.length - 1);
        var arraySize = arraySizeRaw !== '' ? parseInt(arraySizeRaw) : undefined;
        var restOfTheType = rawType.slice(0, finishArrayTypeIndex);
        return new ArrayType(parseEvmType(restOfTheType), arraySize);
    }
    // this has to be primitive type
    //first deal with simple types
    switch (rawType) {
        case 'bool':
            return new BooleanType();
        case 'address':
            return new AddressType();
        case 'string':
            return new StringType();
        case 'byte':
            return new BytesType(1);
        case 'bytes':
            return new ArrayType(new BytesType(1));
    }
    if (isUIntTypeRegex.test(rawType)) {
        var match = isUIntTypeRegex.exec(rawType);
        return new UnsignedIntegerType(parseInt(match[1] || '256'));
    }
    if (isIntTypeRegex.test(rawType)) {
        var match = isIntTypeRegex.exec(rawType);
        return new IntegerType(parseInt(match[1] || '256'));
    }
    if (isBytesTypeRegex.test(rawType)) {
        var match = isBytesTypeRegex.exec(rawType);
        return new BytesType(parseInt(match[1] || '1'));
    }
    throw new Error('Unknown type: ' + rawType);
}
exports.parseEvmType = parseEvmType;
