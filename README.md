lowfat-json
===========

Lightweight JSON-like data structure which can be decompressed into JSON.

Format
------

The purpose of the lowfat-JSON format is to reduce bandwidth required for transmitting JSON data by identifying and symbolizing repetitive portions of the JSON format such as extra spacing, seperator characters, and repeating property names. Lowfat-JSON has the following format:

[definition of properties (a"prop 1"b"prop 2"c"prop 3")]<br />
[start of data (implied by either a "{" or a "[")]<br />
[end of data (any "}" or "]" not specified will be implied based on the remaining items on the scope stack)]<br />

Braces "{ }" and square brackets "[ ]" retain their same meaning as in JSON.

How to use
----------

1) Include the .js file in your html file.

2) Compress or decompress JSON and lowfat-JSON data:

```javascript

var data = 'a"menu"b"header"c"items"d"id"e"label"{a{b"SVG Viewer"c[{d"Open"}{d"OpenNew"e"Open New"}{d"ZoomIn"e"Zoom In"}{d"ZoomOut"e"Zoom Out';

var json = lowFatJson.decompress(data);

```

Roadmap
-------

Currently the library has a decompression algorithm built, but no compression algorithm. Also, server-side implementations of this format will be required in order to encode data on the server-side before sending across the wire.