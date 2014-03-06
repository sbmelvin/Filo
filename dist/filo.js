var F = (function () {

    function tagsInNode(node) {
        var regex = /{{([^{^}]+)}}/g;

        var matches = [];
        
        var str = outerHTMLForNode(node);

        var match = regex.exec(str);

        while(match) {
            matches.push(match[1]);
            match = regex.exec(str);
        }

        return matches;
    }

    function outerHTMLForNode(node) {
        if(node === undefined){
            return null;
        }

        if(isInstanceOf(node, [jQuery])){     // If jQuery obj, fetch the Element object
            node = node[0];
        }

        if(isInstanceOf(node, [Element])){    // Make sure node is an Element object
            return node.outerHTML;
        }
    
        return null;
    }

    function parseNode(node, template, overrides){
        if((node === undefined) || (template === undefined)){
            return null;
        }

        var tags = tagsInNode(node);

        var htmlReplace = function () {
            return $(this).html().replace("{{" + tag + "}}", outerHTMLForNode(parsedNode));
        };

        var overrideReplace = function () {
            return $(this).html().replace("{{" + tag + "}}", overrides[tag]);
        };

        for(var i = 0; i < tags.length; i++){
            var tag = tags[i];
            var replaceFunc = null;

            // Check to see if the tag has an override, otherwise parse the tag.
            if(overrides.hasOwnProperty(tag)){
                replaceFunc = overrideReplace;
            }else{
                var tagNode = $('#' + tag, template)[0];

                if(tagNode === undefined){
                    console.error("Filo: No template with id: " + tag);
                    return null;
                }

                var parsedNode = parseNode(tagNode, template, overrides);

                if(parsedNode === null){
                    console.error("Filo: Could not parse node: " + outerHTMLForNode(tagNode));
                    return null;
                }

                replaceFunc = htmlReplace;
            }

            $(node).html(replaceFunc);
        }

        return node;
    }

    function isInstanceOf(obj, instanceTypes) {
        var result = false;

        if(obj === undefined || instanceTypes === undefined){
            return result;
        }

        instanceTypes = ( instanceTypes instanceof Array ? instanceTypes : [instanceTypes]);

        for(var i = 0; i < instanceTypes.length; i++) {
            result = (obj instanceof instanceTypes[i] ? true : result);
        }

        return result;
    }

    function isTypeOf(obj, types) {
        var result = false;

        if(obj === undefined || types === undefined){
            return result;
        }

        types = ( types instanceof Array ? types : [types]);

        for(var i = 0; i < types.length; i++) {
            result = (typeof obj === types[i] ? true : result);
        }

        return result;
    }

    return {
        render: function (rootID, template, overrides) {
            // Sanity check
            if((isInstanceOf(template, [Element, jQuery, String]) || isTypeOf(template, 'string')) === false){
                console.error("Filo: template is not of type Element, jQuery, or String");
                return null;
            }

            if((isInstanceOf(rootID, [String]) || isTypeOf(rootID, 'string')) === false){
                console.error("Filo: rootID is not of type String");
                return null;
            }

            if(!rootID.length || !template.length){
                return null;
            }

            overrides = overrides || {};

            // Encapsulate template in div and place into jQuery object
            template = $('<div id="filo-root">').append(template);
            
            var rootNode = null;

            if(rootID === 'filo-root'){
                rootNode = template[0];
            }else{
                rootNode = $('#' + rootID, template)[0];
            }

            return parseNode(rootNode, template, overrides);
        }
    };
})();
