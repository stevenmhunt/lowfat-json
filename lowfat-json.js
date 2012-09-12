/* Low-fat JSON
 * version 0.1
 * http://github.com/stevenmtwhunt/lowfat-json */

var lowFatJson = {};

(function(global, jQuery, undefined) {

	var decompress = function(compressed) {
		var codes = {};
	    var uncompressed = [];
	
	    var dataindex = -1;
	    var isdata = false, inquotes = false, key = "", value = "";
	    var bracestack = [];
	
	    for (var i = 0; i < compressed.length; i++)
	    {
	        //decide if we've hit the data section yet.
	        if (!isdata && !inquotes && (compressed[i] == '{' || compressed[i] == '['))
	        {
	           isdata = true;
	           dataindex = i;
	           value = "";
	           key = "";
	        }
	
	        if (!isdata)
	        {
	            //beginning of value for key
	            if (!inquotes && compressed[i] == '"')
		    {
	                inquotes = true;
	            }
	            //end of value for key
	            else if (inquotes && compressed[i] == '"' && i > 0 && compressed[i-1] != '\\')
	            {
	                inquotes = false;
	                
	                //save the key/value and clear the temp variables.
	                codes[key] = value;
	                key = "";
	                value = "";
	            }
	            //read key data
	            else if (!inquotes)
	                key += compressed[i];
	            //read value data
	            else if (inquotes)
			value += compressed[i];
	        }
	        else
	        {
	
	            if (!inquotes && (compressed[i] == "{" || compressed[i] == "[" || compressed[i] == '"' || compressed[i] == "}" || compressed[i] == "]"))
	            {
	                //handle closing braces optimization.
	                if (compressed[i] == "{")
	                    bracestack.push("}");
	                else if (compressed[i] == "[")
	                    bracestack.push("]");
	                else if (compressed[i] == "}" || compressed[i] == "]")
	                    bracestack.pop();
	
	                if (key.length > 0)
	                {
	                    if (uncompressed.length > 0)
	                    {
	                        var lastVal = uncompressed[uncompressed.length-1];
	                        if (lastVal[lastVal.length-1] == '"' || lastVal[lastVal.length-1] == "}" || lastVal[lastVal.length-1] == "]")
	                            uncompressed.push(',\r\n');
	                        uncompressed.push('"' + codes[key] + '": ');
	                        key = "";
	                    }
	                }
	
	                //if two arrays or objects appear next to each other, add a comma.
	                if (i > dataindex && (compressed[i-1] == '}' || compressed[i-1] == "]" || compressed[i-1] == '"') && (compressed[i] == '{' || compressed[i] == "["))
	                    uncompressed.push(',\r\n');
	
	                uncompressed.push(compressed[i]);
	
			if (compressed[i] == '"')
		        {
	                    inquotes = true;
	                }
	            }
	            else if (inquotes && compressed[i] == '"' && i > 0 && compressed[i-1] != '\\')
	            {
	                uncompressed.push(value);
	                value = "";
	                uncompressed.push(compressed[i]);
	                inquotes = false;
	            }
	            else if (inquotes)
	            {
	                value += compressed[i];
	            }
	            else if (!inquotes)
	            {
	                key += compressed[i];
	            }
	        }
	    }
	
	    return uncompressed.join("") + bracestack.reverse().join("");
	};
	
	var compress = function(data) {
		throw "Method Not Implemented.";
	};
	
	lowFatJson.decompress = decompress;
	lowFatJson.compress = compress;
	
})(this, this.jQuery);