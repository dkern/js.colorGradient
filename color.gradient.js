/*!
 * js.colorGradient - v0.1.0
 * http://eisbehr.de
 *
 * Copyright 2014, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * var gradient = new ColorGradient(["#fff", "#000"]);
 * gradient.getHexColorAtPercent([1...100]);
 */

function ColorGradient(colors)
{
    /**
     * array of colors used for gradient
     * @access private
     * @type {Array}
     */
    this._colors = [];

    /**
     * pre-calculated steps of gradient
     * @access private
     * @type {Array}
     */
    this._buffer = [];

    /**
     * convert color hex string to integer array
     * @access private
     * @param {string} color
     * @returns {*}
     */
    this._colorStrToIntArray = function(color)
    {
        if( color.length == 4 || color.length == 7 )
            color = color.substr(1);

        if( color.length == 3 )
        {
            var r = parseInt(color.substr(0, 1) + color.substr(0, 1), 16),
                g = parseInt(color.substr(1, 1) + color.substr(1, 1), 16),
                b = parseInt(color.substr(2, 1) + color.substr(2, 1), 16);

            return [r, g, b];
        }

        else if( color.length == 6 )
            return [parseInt(color.substr(0, 2), 16), parseInt(color.substr(2, 2), 16), parseInt(color.substr(4, 2), 16)];

        return false;
    };

    /**
     * calculate color step buffer
     * @access private
     * @returns void
     */
    this._calculateBufferSteps = function()
    {
        var i, s;
        this._buffer = [];

        // just fill the buffer if only one color is available
        if( this._colors.length == 1 )
        {
            for( i = 0; i < 100; i++ )
                this._buffer.push(this._colors[0]);

            return;
        }

        var colorAreas = 100 / (this._colors.length - 1),
            calculate = function(start, end, step, areas)
            {
                return (start + Math.round((end - start) * (step / areas)));
            };

        for( i = 0; i < this._colors.length - 1; i++ )
        {
            var start = this._colors[i], end = this._colors[i + 1];

            for( s = 0; s < colorAreas; s++ )
            {
                var color = [0, 0, 0];

                color[0] = calculate(start[0], end[0], s, colorAreas);
                color[1] = calculate(start[1], end[1], s, colorAreas);
                color[2] = calculate(start[2], end[2], s, colorAreas);

                this._buffer.push(color);
            }
        }
    };

    // setup gradient
    var colorArray;
    for( var i = 0; i < colors.length; i++ )
        if( (colorArray = this._colorStrToIntArray(colors[i])) )
            this._colors.push(colorArray);

    this._calculateBufferSteps();
}

/**
 * get color at a given percentage as integer rgb array
 * @param {number} percent
 * @return {Array}
 */
ColorGradient.prototype.getColorAtPercent = function(percent)
{
    percent = Math.floor(percent);
    percent = Math.min(percent, 100);
    percent = Math.max(percent, 1);

    return this._buffer[percent - 1];
};

/**
 * get color at a given percentage as hex string
 * @param {number} percent
 * @return {string}
 */
ColorGradient.prototype.getHexColorAtPercent = function(percent)
{
    var color = this.getColorAtPercent(percent);

    return "#" + ("0" + color[0].toString(16)).slice(-2) +
                 ("0" + color[1].toString(16)).slice(-2) +
                 ("0" + color[2].toString(16)).slice(-2);
};