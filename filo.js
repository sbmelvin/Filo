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

        if(node instanceof jQuery){     // If jQuery obj, fetch the Element object
            node = node[0];
        }

        if(node instanceof Element){    // Make sure node is an Element object
            return node.outerHTML;
        }else{
            return null;
        }
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
                    return null;
                }

                var parsedNode = parseNode(tagNode, template, overrides);

                if(parsedNode === null){
                    return null;
                }

                replaceFunc = htmlReplace;
            }

            $(node).html(replaceFunc);
        }

        return node;
    }

    return {
        render: function (rootID, template, overrides) {
            // Sanity check

            if((rootID === undefined) || (template === undefined)){
                return null;
            }

            if( ((rootID instanceof String) || (typeof rootID === 'string')) === false){
                return null;
            }


            if(((template instanceof Element)  ||
                (template instanceof jQuery)   ||
                (template instanceof String)   ||
                (typeof template === 'string')) === false){
                return null;
            }

            overrides = overrides || {};

            // Encapsulate template in div and place into jQuery object
            template = $('<div>').append(template);

            var rootNode = $('#' + rootID, template)[0];

            return parseNode(rootNode, template, overrides);
        }
    };
})();