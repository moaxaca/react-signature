import { createElement, Component, forwardRef } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Hello = /** @class */ (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hello.prototype.render = function () {
        return createElement("h1", null,
            "Hello from ",
            this.props.compiler,
            " and ",
            this.props.framework,
            "!!!");
    };
    return Hello;
}(Component));
//# sourceMappingURL=Hello.js.map

var ElasticContainer = /** @class */ (function (_super) {
    __extends(ElasticContainer, _super);
    function ElasticContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            height: 0,
            width: 0,
        };
        return _this;
    }
    ElasticContainer.prototype.componentDidMount = function () {
        this.resize();
        window.addEventListener('resize', this.resize.bind(this));
    };
    ElasticContainer.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.resize.bind(this));
    };
    ElasticContainer.prototype.resize = function () {
        if (this.container) {
            var height = this.props.height || this.container.clientHeight;
            var width = this.props.width || this.container.clientWidth;
            this.props.resize(height, width);
        }
    };
    ElasticContainer.prototype.render = function () {
        var _this = this;
        return (createElement("div", { ref: function (ref) { return _this.container = ref; } }, this.props.children));
    };
    return ElasticContainer;
}(Component));
//# sourceMappingURL=ElasticContainer.js.map

var ElasticCanvas = forwardRef(function (props, ref) { return (createElement(ElasticContainer, { height: props.height, width: props.width, resize: props.resize },
    createElement("canvas", { ref: ref }))); });

var States;
(function (States) {
    States[States["SignatureEngaged"] = 0] = "SignatureEngaged";
    States[States["Idle"] = 1] = "Idle";
})(States || (States = {}));
var SignaturePad = /** @class */ (function (_super) {
    __extends(SignaturePad, _super);
    function SignaturePad(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            strokes: [],
            strokeIndex: 0,
            signingState: States.Idle,
        };
        return _this;
    }
    SignaturePad.prototype.componentDidMount = function () {
        this.ctx = this.canvas.getContext("2d");
        this.canvas.addEventListener('mousemove', this.captureMotion.bind(this));
        this.canvas.addEventListener('mousedown', this.captureEngage.bind(this));
        this.canvas.addEventListener('mouseup', this.captureRelease.bind(this));
    };
    SignaturePad.prototype.componentWillUnmount = function () {
        this.canvas.removeEventListener('mousemove', this.captureMotion.bind(this));
        this.canvas.removeEventListener('mousedown', this.captureEngage.bind(this));
        this.canvas.removeEventListener('mouseup', this.captureRelease.bind(this));
    };
    SignaturePad.prototype.getSignature = function () {
        return this.canvas.toDataURL();
    };
    SignaturePad.prototype.captureEngage = function (event) {
        this.setState({
            signingState: States.SignatureEngaged,
            strokes: this.state.strokes.concat([{
                    points: [],
                }]),
            strokeIndex: this.state.strokes.length,
        });
    };
    SignaturePad.prototype.captureMotion = function (event) {
        if (this.state.signingState === States.SignatureEngaged) {
            var strokeIndex = this.state.strokeIndex;
            var strokes = this.state.strokes.slice();
            strokes[strokeIndex].points.push({
                x: event.clientX - 10,
                y: event.clientY - 15,
            });
            this.setState({ strokes: strokes });
            this.drawSignature();
        }
    };
    SignaturePad.prototype.captureRelease = function (event) {
        this.setState({
            signingState: States.Idle,
        });
    };
    SignaturePad.prototype.resize = function (height, width) {
        this.canvas.height = height;
        this.canvas.width = width;
        this.drawSignature();
    };
    SignaturePad.prototype.drawSignature = function () {
        for (var _i = 0, _a = this.state.strokes; _i < _a.length; _i++) {
            var stroke = _a[_i];
            this.drawStroke(stroke);
        }
    };
    SignaturePad.prototype.drawStroke = function (stroke) {
        var ctx = this.ctx;
        var lastPoint;
        for (var _i = 0, _a = stroke.points; _i < _a.length; _i++) {
            var point = _a[_i];
            ctx.moveTo(point.x, point.y);
            if (lastPoint) {
                ctx.lineTo(lastPoint.x, lastPoint.y);
            }
            lastPoint = point;
        }
        ctx.closePath();
        ctx.stroke();
    };
    SignaturePad.prototype.render = function () {
        var _this = this;
        return (createElement(ElasticCanvas, { resize: function (height, width) { return _this.resize(height, width); }, ref: function (ref) { return _this.canvas = ref; }, height: this.props.height, width: this.props.width }));
    };
    return SignaturePad;
}(Component));

//# sourceMappingURL=index.js.map

//# sourceMappingURL=index.js.map

export { Hello, SignaturePad };
