import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Font } from 'ngx-font-picker';
import 'fabric';
let EditorAdafriComponent = class EditorAdafriComponent {
    constructor() {
        this.urlName = "";
        this.Direction = {
            LEFT: 0,
            UP: 1,
            RIGHT: 2,
            DOWN: 3
        };
        this.DirectionSteps = {
            REGULAR: 1,
            SHIFT: 5
        };
        this.presetFonts = ['Arial', 'Serif', 'Helvetica', 'Sans-Serif', 'Open Sans', 'Roboto Slab'];
        this.font = new Font({
            family: 'Roboto',
            size: '14px',
            style: 'regular',
            styles: ['regular']
        });
        this.props = {
            canvasFill: '#ffffff',
            canvasImage: '',
            id: null,
            opacity: null,
            fill: null,
            stroke: null,
            strokeWidth: null,
            fontSize: null,
            lineHeight: null,
            charSpacing: null,
            fontWeight: null,
            fontStyle: null,
            textAlign: null,
            fontFamily: 'Open Sans',
            TextDecoration: '',
            scale: 1,
            angle: 0
        };
        this.elementTypes = {
            'image': { key: 'image', text: 'Bild', icon: 'fa-image' },
            'i-text': { key: 'i-text', text: 'Text', icon: 'fa-font' },
            'rect': { key: 'rect', text: 'Rechteck', icon: 'fa-square' },
            'triangle': { key: 'triangle', text: 'Dreieck', icon: 'fa-square' },
            'circle': { key: 'circle', text: 'Kreis', icon: 'fa-square' },
            'polygon': { key: 'polygon', text: 'Stern', icon: 'fa-square' }
        };
        this.textString = '';
        this.url = '';
        this.size = {
            width: 300,
            height: 250
        };
        this.selectedSize = null;
        this.sizes = [
            { width: 640, height: 480 },
            { width: 1024, height: 768 },
            { width: 1920, height: 1080 }
        ];
        this.globalEditor = false;
        this.textEditor = false;
        this.imageEditor = false;
        this.shapeEditor = false;
        this.layers = [];
        /**
         * Rasterize PNG
         *
         */
        this.imageCanvas = "";
    }
    /**
     *
     */
    ngOnInit() {
        // setup canvas
        this.canvas = new fabric.Canvas('canvas', {
            hoverCursor: 'pointer',
            selection: true,
            selectionBorderColor: 'blue',
            preserveObjectStacking: true
        });
        // register keyboard events
        fabric.util.addListener(document.body, 'keydown', (opt) => {
            // do not invoke keyboard events on input fields
            if (opt.target.tagName === 'INPUT') {
                return;
            }
            // if(opt.repeat) return; // prevent repeating (keyhold)
            const key = opt.which || opt.keyCode;
            this.handleKeyPress(key, opt);
        });
        // register fabric.js events
        this.canvas.on({
            'object:moving': (e) => {
            },
            'object:modified': (e) => {
            },
            'object:selected': (e) => {
                const selectedObject = e.target;
                this.selected = selectedObject;
                selectedObject.hasRotatingPoint = true;
                selectedObject.transparentCorners = false;
                selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';
                this.resetPanels();
                if (selectedObject.type !== 'group' && selectedObject) {
                    this.getId();
                    this.getOpacity();
                    this.getTitle();
                    switch (selectedObject.type) {
                        case 'polygon':
                        case 'rect':
                        case 'circle':
                        case 'triangle':
                            this.shapeEditor = true;
                            this.getFill();
                            this.getStroke();
                            this.getStrokeWidth();
                            break;
                        case 'i-text':
                            this.textEditor = true;
                            this.getLineHeight();
                            this.getCharSpacing();
                            this.getBold();
                            this.getFontStyle();
                            this.getFontSize();
                            this.getFill();
                            this.getStroke();
                            this.getStrokeWidth();
                            this.getTextDecoration();
                            this.getTextAlign();
                            this.getFontFamily();
                            break;
                        case 'image':
                            break;
                    }
                }
            },
            'selection:cleared': (e) => {
                this.selected = null;
                this.resetPanels();
            }
        });
        this.canvas.setWidth(this.size.width);
        this.canvas.setHeight(this.size.height);
        // get references to the html canvas element & its context
        // this.canvas.on('mouse:down', (e) => {
        // let canvasElement: any = document.getElementById('canvas');
        // console.log(canvasElement)
        // });
    }
    /**
     * Handles user keyboard input
     *
     * @param key
     * @param event
     */
    handleKeyPress(key, event) {
        switch (key) {
            case 37:
                this.moveSelectedObject(this.Direction.LEFT, event.shiftKey ? this.DirectionSteps.SHIFT : this.DirectionSteps.REGULAR);
                event.preventDefault();
                break;
            case 38:
                this.moveSelectedObject(this.Direction.UP, event.shiftKey ? this.DirectionSteps.SHIFT : this.DirectionSteps.REGULAR);
                event.preventDefault();
                break;
            case 39:
                this.moveSelectedObject(this.Direction.RIGHT, event.shiftKey ? this.DirectionSteps.SHIFT : this.DirectionSteps.REGULAR);
                event.preventDefault();
                break;
            case 40:
                this.moveSelectedObject(this.Direction.DOWN, event.shiftKey ? this.DirectionSteps.SHIFT : this.DirectionSteps.REGULAR);
                event.preventDefault();
                break;
            case 46:
                this.removeSelected();
                event.preventDefault();
                break;
            case 65:
                if (event.ctrlKey) {
                    this.selectAllObjects();
                }
                event.preventDefault();
                break;
        }
    }
    /**
     * Select all objects/layers in canvas
     *
     */
    selectAllObjects() {
        const objs = this.canvas.getObjects().map(function (o) {
            return o.set('active', true);
        });
        const group = new fabric.Group(objs, {
            originX: 'center',
            originY: 'center'
        });
        this.canvas._activeObject = null;
        this.canvas.setActiveGroup(group.setCoords()).renderAll();
    }
    /**
     * Move the current selected object
     *
     * @param direction
     * @param value
     */
    moveSelectedObject(direction, value) {
        const activeGroup = this.canvas.getActiveObjects();
        const activeObject = this.canvas.getActiveObject();
        if (activeObject) {
            switch (direction) {
                case this.Direction.LEFT:
                    activeObject.setLeft(activeObject.getLeft() - value);
                    break;
                case this.Direction.UP:
                    activeObject.setTop(activeObject.getTop() - value);
                    break;
                case this.Direction.RIGHT:
                    activeObject.setLeft(activeObject.getLeft() + value);
                    break;
                case this.Direction.DOWN:
                    activeObject.setTop(activeObject.getTop() + value);
                    break;
            }
            activeObject.setCoords();
            this.canvas.renderAll();
        }
        else if (activeGroup) {
            alert('active group');
            switch (direction) {
                case this.Direction.LEFT:
                    activeGroup.setLeft(activeGroup.getLeft() - value);
                    break;
                case this.Direction.UP:
                    activeGroup.setTop(activeGroup.getTop() - value);
                    break;
                case this.Direction.RIGHT:
                    activeGroup.setLeft(activeGroup.getLeft() + value);
                    break;
                case this.Direction.DOWN:
                    activeGroup.setTop(activeGroup.getTop() + value);
                    break;
            }
            activeGroup.setCoords();
            this.canvas.renderAll();
        }
    }
    /**
     * Recalculate layer list for layer panel
     *
     */
    updateLayers() {
        this.layers = this.canvas.getObjects();
    }
    /**
     * Set layer as active one
     *
     * @param layer
     */
    selectLayer(layer) {
        this.canvas.setActiveObject(layer);
    }
    /**
     * Show/Hide layer
     *
     * @param layer
     */
    toggleLayer(layer) {
        layer.visible = !layer.visible;
    }
    /**
     * Locks/Unlocks layer
     *
     */
    lockLayer() {
        const layer = this.canvas.getActiveObject();
        layer.evented = !layer.evented;
        layer.selectable = !layer.selectable;
    }
    /**
     * Updates layer index
     *
     */
    updateLayerSort() {
        this.layers.forEach((layer, ind) => {
            this.canvas.moveTo(layer, ind);
        });
    }
    /*------------------------Block elements------------------------*/
    /**
     * Size - set canvas dimensions
     *
     * @param event
     */
    changeSize(event) {
        this.canvas.setWidth(this.size.width);
        this.canvas.setHeight(this.size.height);
    }
    /**
     * Size - apply preset to canvas
     *
     * @param event
     */
    changeToPreset(event) {
        this.size.width = this.selectedSize.width;
        this.size.height = this.selectedSize.height;
        this.changeSize(event);
    }
    /**
     * Text - add text element
     *
     */
    addText() {
        const textString = this.textString;
        const text = new fabric.IText(textString, {
            left: 10,
            top: 10,
            fontFamily: 'Arial',
            angle: 0,
            fill: '#000000',
            scaleX: 1,
            scaleY: 1,
            fontWeight: '',
            hasRotatingPoint: true,
            title: textString
        });
        this.extend(text, this.randomId());
        this.canvas.add(text);
        this.selectItemAfterAdded(text);
        this.textString = '';
        this.updateLayers();
    }
    /**
     * Image - Add a dom image to canvas
     *
     * @param event
     */
    getImgPolaroid(event) {
        const el = event.target;
        fabric.Image.fromURL(el.src, (image) => {
            image.set({
                left: 10,
                top: 10,
                angle: 0,
                padding: 10,
                cornersize: 10,
                hasRotatingPoint: true,
                title: el.title,
                lockUniScaling: true
            });
            image.scaleToWidth(150);
            image.scaleToHeight(150);
            this.extend(image, this.randomId());
            this.canvas.add(image);
            this.selectItemAfterAdded(image);
        });
        this.updateLayers();
    }
    /**
     * Image - Add an external image to canvas
     *
     * @param url
     */
    addImageOnCanvas(url) {
        if (url) {
            fabric.Image.fromURL(url, (image) => {
                image.set({
                    left: 10,
                    top: 10,
                    angle: 0,
                    padding: 10,
                    cornersize: 10,
                    hasRotatingPoint: true,
                    title: this.urlName
                });
                image.scaleToWidth(Math.round(this.size.width / 2));
                this.extend(image, this.randomId());
                this.canvas.add(image);
                this.selectItemAfterAdded(image);
                this.updateLayers();
            });
        }
    }
    /**
     * Image - Read image data
     *
     * @param event
     */
    readUrl(event) {
        if (event.target.files && event.target.files[0]) {
            this.urlName = event.target.files[0].name;
            const reader = new FileReader();
            var self = this;
            reader.onload = (revent) => {
                this.url = revent.target['result'];
                this.addImageOnCanvas(this.url);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    /**
     * Image - Clears custom user image selection/file handler
     *
     * @param url
     */
    removeWhite(url) {
        this.url = '';
    }
    ;
    /**
     * Shape - Add custom shape
     *
     * @param shape - can be rectangle, square, triangle, circle, star
     */
    addShape(shape) {
        let add;
        switch (shape) {
            case 'rectangle':
                add = new fabric.Rect({
                    width: 200, height: 100, left: 10, top: 10, angle: 0,
                    fill: '#3f51b5',
                    title: 'Rectangle'
                });
                break;
            case 'square':
                add = new fabric.Rect({
                    width: 100, height: 100, left: 10, top: 10, angle: 0,
                    fill: '#4caf50',
                    title: 'Carrée'
                });
                break;
            case 'triangle':
                add = new fabric.Triangle({
                    width: 100, height: 100, left: 10, top: 10, fill: '#2196f3', title: 'Triangle'
                });
                break;
            case 'circle':
                add = new fabric.Circle({
                    radius: 50, left: 10, top: 10, fill: '#ff5722', title: 'Cercle'
                });
                break;
            case 'star':
                add = new fabric.Polygon([
                    { x: 350, y: 75 },
                    { x: 380, y: 160 },
                    { x: 470, y: 160 },
                    { x: 400, y: 215 },
                    { x: 423, y: 301 },
                    { x: 350, y: 250 },
                    { x: 277, y: 301 },
                    { x: 303, y: 215 },
                    { x: 231, y: 161 },
                    { x: 321, y: 161 }
                ], {
                    top: 10,
                    left: 10,
                    fill: '#ff5722',
                    stroke: '#ff5722',
                    strokeWidth: 2,
                    title: 'Etoile'
                });
                break;
        }
        this.extend(add, this.randomId());
        this.canvas.add(add);
        this.selectItemAfterAdded(add);
        this.updateLayers();
    }
    // CANVAS ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Canvas - clear current selection
     */
    colorChange(event) {
        if (this.canvas.getActiveObjects().length === 0) {
            this.setCanvasFill(event.currentValue.hex);
        }
        else {
            this.setFillColor(event.currentValue.hex);
        }
    }
    cleanSelect() {
        this.canvas.discardActiveObject().renderAll();
        this.updateLayers();
    }
    /**
     * Canvas - select item
     *
     * @param obj
     */
    selectItemAfterAdded(obj) {
        this.canvas.discardActiveObject().renderAll();
        this.canvas.setActiveObject(obj);
    }
    /**
     * Canvas - update background color
     *
     */
    setCanvasFill(color) {
        this.canvas.backgroundColor = color;
        this.canvas.renderAll();
        /*  if (!this.props.canvasImage) {
         } */
    }
    /**
     * Helper
     *
     * @param obj
     * @param id
     */
    extend(obj, id) {
        obj.toObject = (function (toObject) {
            return function () {
                return fabric.util.object.extend(toObject.call(this), {
                    id: id
                });
            };
        })(obj.toObject);
    }
    /**
     * Canvas - update background image
     *
     */
    setCanvasImage() {
        const self = this;
        if (this.props.canvasImage) {
            this.canvas.setBackgroundColor({ source: this.props.canvasImage, repeat: 'repeat' }, function () {
                self.canvas.renderAll();
            });
        }
        this.updateLayers();
    }
    /**
     * Helper - Generates a random id, no dupe checks
     *
     * @returns {number}
     */
    randomId() {
        return Math.floor(Math.random() * 999999) + 1;
    }
    // ELEMENTS //////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Returns styleName from object
     *
     * @param styleName
     * @param object
     * @returns {any}
     */
    getActiveStyle(styleName, object) {
        object = object || this.canvas.getActiveObject();
        if (!object) {
            return '';
        }
        return (object.getSelectionStyles && object.isEditing)
            ? (object.getSelectionStyles()[styleName] || '')
            : (object[styleName] || '');
    }
    /**
     * Sets styleName to given value
     *
     * @param styleName
     * @param value
     * @param object
     */
    setActiveStyle(styleName, value, object) {
        object = object || this.canvas.getActiveObject();
        if (!object) {
            return;
        }
        if (object.setSelectionStyles && object.isEditing) {
            const style = {};
            style[styleName] = value;
            object.setSelectionStyles(style);
            object.setCoords();
        }
        else {
            object.set(styleName, value);
        }
        object.setCoords();
        this.canvas.renderAll();
    }
    /**
     * Get property for active object
     *
     * @param name
     * @returns {any}
     */
    getActiveProp(name) {
        const object = this.canvas.getActiveObject();
        if (!object) {
            return '';
        }
        return object[name] || '';
    }
    /**
     * Set property for active object
     *
     * @param name
     * @param value
     */
    setActiveProp(name, value) {
        const object = this.canvas.getActiveObject();
        if (!object) {
            return;
        }
        object.set(name, value).setCoords();
        this.canvas.renderAll();
    }
    /**
     * Clones the currently active object and sets the close as active
     *
     */
    clone() {
        const activeObject = this.canvas.getActiveObject(), activeGroup = this.canvas.getActiveObjects();
        if (activeObject) {
            let clone;
            switch (activeObject.type) {
                case 'rect':
                    clone = new fabric.Rect(activeObject.toObject());
                    break;
                case 'circle':
                    clone = new fabric.Circle(activeObject.toObject());
                    break;
                case 'triangle':
                    clone = new fabric.Triangle(activeObject.toObject());
                    break;
                case 'polygon':
                    clone = new fabric.Polygon(activeObject.toObject());
                    break;
                case 'i-text':
                    clone = new fabric.IText('', activeObject.toObject());
                    break;
                case 'image':
                    clone = fabric.util.object.clone(activeObject);
                    break;
            }
            if (clone) {
                clone.set({ left: 10, top: 10, title: 'Kopie von ' + activeObject.title });
                this.canvas.add(clone);
                this.selectItemAfterAdded(clone);
            }
            this.updateLayers();
        }
    }
    getId() {
        this.props.id = this.canvas.getActiveObject().toObject().id;
    }
    setId() {
        const val = this.props.id;
        const complete = this.canvas.getActiveObject().toObject();
        // console.log(complete);
        this.canvas.getActiveObject().toObject = () => {
            complete.id = val;
            return complete;
        };
    }
    getTitle() {
        this.props.title = this.getActiveProp('title');
    }
    setTitle() {
        this.setActiveProp('title', this.props.title);
    }
    opacityChange(event) {
        this.props.opacity = event.value;
        this.setOpacity();
    }
    getOpacity() {
        this.props.opacity = this.getActiveStyle('opacity', null) * 100;
    }
    setOpacity() {
        this.setActiveStyle('opacity', parseInt(this.props.opacity, 10) / 100, null);
    }
    getFill() {
        this.props.fill = this.getActiveStyle('fill', null);
    }
    setFill() {
        this.setActiveStyle('fill', this.props.fill, null);
    }
    getStroke() {
        this.props.stroke = this.getActiveStyle('stroke', null);
    }
    setStroke() {
        this.setActiveStyle('stroke', this.props.stroke, null);
    }
    getStrokeWidth() {
        this.props.strokeWidth = this.getActiveStyle('strokeWidth', null);
    }
    setStrokeWidth() {
        this.setActiveStyle('strokeWidth', this.props.strokeWidth, null);
    }
    getLineHeight() {
        this.props.lineHeight = this.getActiveStyle('lineHeight', null);
    }
    setLineHeight() {
        this.setActiveStyle('lineHeight', parseFloat(this.props.lineHeight), null);
    }
    getCharSpacing() {
        this.props.charSpacing = this.getActiveStyle('charSpacing', null);
    }
    setCharSpacing() {
        this.setActiveStyle('charSpacing', this.props.charSpacing, null);
    }
    getFontSize() {
        this.props.fontSize = this.getActiveStyle('fontSize', null);
    }
    setFontSize() {
        this.setActiveStyle('fontSize', parseInt(this.props.fontSize, 10), null);
    }
    getBold() {
        this.props.fontWeight = this.getActiveStyle('fontWeight', null);
    }
    setBold() {
        this.props.fontWeight = !this.props.fontWeight;
        this.setActiveStyle('fontWeight', this.props.fontWeight ? 'bold' : '', null);
    }
    getFontStyle() {
        this.props.fontStyle = this.getActiveStyle('fontStyle', null);
    }
    setFontStyle() {
        this.props.fontStyle = !this.props.fontStyle;
        this.setActiveStyle('fontStyle', this.props.fontStyle ? 'italic' : '', null);
    }
    setWebfont() {
        this.props.fontSize = this.font.size;
        this.setActiveStyle('fontSize', parseInt(this.props.fontSize, 10), null);
        this.props.fontFamily = this.font.family;
        this.setActiveProp('fontFamily', this.props.fontFamily);
    }
    getTextDecoration() {
        this.props.TextDecoration = this.getActiveStyle('textDecoration', null);
    }
    setTextDecoration(value) {
        let iclass = this.props.TextDecoration;
        if (iclass.includes(value)) {
            iclass = iclass.replace(RegExp(value, 'g'), '');
        }
        else {
            iclass += ` ${value}`;
        }
        this.props.TextDecoration = iclass;
        this.setActiveStyle('textDecoration', this.props.TextDecoration, null);
    }
    hasTextDecoration(value) {
        return this.props.TextDecoration.includes(value);
    }
    getTextAlign() {
        this.props.textAlign = this.getActiveProp('textAlign');
    }
    setTextAlign(value) {
        this.props.textAlign = value;
        this.setActiveProp('textAlign', this.props.textAlign);
    }
    getFontFamily() {
        this.props.fontFamily = this.getActiveProp('fontFamily');
    }
    setFontFamily() {
        this.setActiveProp('fontFamily', this.props.fontFamily);
    }
    setFillColor(color) {
        /* this.palettes.selected = swatch; */
        this.props.fill = color;
        this.setFill();
    }
    // SYSTEM ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Remove currently selected element from canvas
     *
     */
    removeSelected() {
        const activeObject = this.canvas.getActiveObject(), activeGroup = this.canvas.getActiveObjects();
        if (activeObject) {
            this.canvas.remove(activeObject);
        }
        else if (activeGroup) {
            const objectsInGroup = activeGroup.getObjects();
            this.canvas.discardActiveGroup();
            const self = this;
            objectsInGroup.forEach(function (object) {
                self.canvas.remove(object);
            });
        }
        this.updateLayers();
    }
    /**
     * Send active object to front
     *
     */
    bringToFront() {
        const activeObject = this.canvas.getActiveObject(), activeGroup = this.canvas.getActiveObjects();
        if (activeObject) {
            activeObject.bringToFront();
        }
        else if (activeGroup) {
            const objectsInGroup = activeGroup.getObjects();
            this.canvas.discardActiveGroup();
            objectsInGroup.forEach((object) => {
                object.bringToFront();
            });
        }
    }
    /**
     * Send active object to back
     *
     */
    sendToBack() {
        const activeObject = this.canvas.getActiveObject(), activeGroup = this.canvas.getActiveObjects();
        if (activeObject) {
            activeObject.sendToBack();
            // activeObject.opacity = 1;
        }
        else if (activeGroup) {
            const objectsInGroup = activeGroup.getObjects();
            this.canvas.discardActiveGroup();
            objectsInGroup.forEach((object) => {
                object.sendToBack();
            });
        }
    }
    /**
     * Handle canvas reset/clear
     *
     */
    confirmClear() {
        if (confirm('Vous etes s�r de vouloir tout effacer')) {
            this.canvas.clear();
        }
    }
    handleDragOverCanvas(event) {
        event.stopPropagation();
        return false; // prevenDefault;
    }
    /**
     *
     * @param event
     */
    handleDropOnCanvas(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        const el = this.dragObject;
        fabric.Image.fromURL(el.src, (image) => {
            image.set({
                originX: 'center',
                originY: 'center',
                left: event.layerX,
                top: event.layerY,
                angle: 0,
                padding: 10,
                cornersize: 10,
                hasRotatingPoint: true,
                title: el.title,
                lockUniScaling: true
            });
            image.scaleToWidth(150);
            image.scaleToHeight(150);
            this.extend(image, this.randomId());
            this.canvas.add(image);
            this.selectItemAfterAdded(image);
        });
        this.updateLayers();
        this.dragObject = null;
        return false;
    }
    rasterize() {
        this.imageCanvas = this.canvas.toDataURL('png');
        console.log(this.imageCanvas);
        /*  if (!fabric.Canvas.supports('toDataURL')) {
             alert('Ihr Browser unterstützt diese Funktion nicht.');
         } else {
             // chrome workaround: https://stackoverflow.com/a/45700813
             const _w = window.open();
             _w.document.write('<iframe src="' + this.canvas.toDataURL('png') +
                 '" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;"' +
                 'allowfullscreen></iframe>');
         } */
    }
    /**
     * Rasterize SVG
     *
     */
    rasterizeSVG() {
        // chrome workaround: https://stackoverflow.com/a/45700813
        const _w = window.open();
        _w.document.write('<iframe src="data:image/svg+xml;utf8,' + encodeURIComponent(this.canvas.toSVG()) +
            '" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;"' +
            ' allowfullscreen></iframe>');
    }
    ;
    saveCanvasToJSON() {
        const json = JSON.stringify(this.canvas);
        this.jsonCanvas = json;
        console.log(this.jsonCanvas);
        /*    localStorage.setItem('ffFabricQuicksave', json); */
    }
    /**
     * Load canvas from JSON data
     *
     */
    loadCanvasFromJSON() {
        const CANVAS = localStorage.getItem('ffFabricQuicksave');
        // and load everything from the same json
        this.canvas.loadFromJSON(CANVAS, () => {
            // making sure to render canvas at the end
            this.canvas.renderAll();
            // TODO: Retrieve additional data and bind accordingly
            console.log(this.canvas);
        });
    }
    ;
    /**
     * Stringify canvas objects
     *
     */
    rasterizeJSON() {
        this.json = JSON.stringify(this.canvas, null, 2);
        console.log(this.json);
    }
    /**
     * Reset panel visibility
     *
     */
    resetPanels() {
        this.textEditor = false;
        this.imageEditor = false;
        this.shapeEditor = false;
    }
    /** HELPERS ***********************/
    componentToHex(c) {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }
    rgbToHex(r, g, b) {
        return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
};
tslib_1.__decorate([
    ViewChild('slider', { static: true })
], EditorAdafriComponent.prototype, "slider", void 0);
EditorAdafriComponent = tslib_1.__decorate([
    Component({
        selector: 'app-editor-adafri',
        templateUrl: './editor-adafri.component.html',
        styleUrls: ['./editor-adafri.component.scss']
    })
], EditorAdafriComponent);
export { EditorAdafriComponent };
//# sourceMappingURL=editor-adafri.component.js.map