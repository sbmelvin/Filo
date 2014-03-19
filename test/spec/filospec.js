describe("Filo", function() {

  beforeEach(function() {
  });

  it("should return null if not given a rootID or template", function() {
    var result = F.render();

    //demonstrates use of custom matcher
    expect(result).toBe(null);
  });

  it("should return null if not given a template", function() {
    var rootID = 'menuID';

    var result = F.render(rootID);

    expect(result).toBe(null);
  });

  it("should return the correct template when given a valid rootID and template", function() {
    var rootID = 'top';

    var template = "<div id='top'>{{middle}}</div>" +
    "<div id='middle'>{{bottom}}</div>" +
    "<div id='bottom'>{{myVar}}</div>";

    var overrides = {
      myVar: "myVarString"
    };

    var correctTemplate = "<div id='top'><div id='middle'><div id='bottom'>myVarString</div></div></div>";

    var result = F.render(rootID, template, overrides);
    
    expect(result).not.toBe(null);
    
    result = result.outerHTML.replace(/\"/g,"'");

    expect(result).toMatch(correctTemplate);
  });

  it("should return null if a tag cannot be mapped to an ID or override", function() {
    var rootID = 'top';

    var template = "<div id='top'>{{middle}}</div>" +
    "<div id='middle'>{{bottom}}</div>" +
    "<div id='bottom'>{{myVar}}</div>";

    var overrides = {};

    var result = F.render(rootID, template, overrides);

    expect(result).toBe(null);
  });

  it("should return null if the rootID cannot be found within the template", function() {
    var rootID = "corndogs_are_delicious";

    var template = "<div id='top'>{{middle}}</div>" +
    "<div id='middle'>{{bottom}}</div>" +
    "<div id='bottom'>{{myVar}}</div>";

    var overrides = {
      myVar: "myVarString"
    };

    var result = F.render(rootID, template, overrides);

    expect(result).toBe(null);
    
  });

  xit("should return null if an infinite parse loop is detected", function() {
  });

  it("should return null if the template is not of type jQuery, Element, or String", function() {
    var rootID = 'top';

    var template = new Date();

    var overrides = {
      myVar: "myVarString"
    };

    var result = F.render(rootID, template, overrides);

    expect(result).toBe(null);

  });
  
  it("should not return null if the template is of type jQuery", function() {
    var rootID = 'top';

    var template = "<div id='top'>{{middle}}</div>" +
    "<div id='middle'>{{bottom}}</div>" +
    "<div id='bottom'>{{myVar}}</div>";

    template = $(template);

    var overrides = {
      myVar: "myVarString"
    };

    var result = F.render(rootID, template, overrides);

    expect(result).not.toBe(null);

  });
  
  it("should not return null if the template is of type Element", function() {
    var rootID = 'top';

    var template = "<div id='top'>{{middle}}</div>" +
    "<div id='middle'>{{bottom}}</div>" +
    "<div id='bottom'>{{myVar}}</div>";

    template = document.createElement('div').innerHTML = template;

    var overrides = {
      myVar: "myVarString"
    };


    var result = F.render(rootID, template, overrides);

    expect(result).not.toBe(null);

  });

  it("should not return null if the template is of type String", function() {
    var rootID = 'top';

    var template = "<div id='top'>{{middle}}</div>" +
    "<div id='middle'>{{bottom}}</div>" +
    "<div id='bottom'>{{myVar}}</div>";

    var overrides = {
      myVar: "myVarString"
    };

    var result = F.render(rootID, template, overrides);

    expect(result).not.toBe(null);
  });

  it("should return null if the rootID is not of type String", function() {
    var rootID = new Date();

    var template = "<div id='top'>{{middle}}</div>" +
    "<div id='middle'>{{bottom}}</div>" +
    "<div id='bottom'>{{myVar}}</div>";

    var overrides = {
      myVar: "myVarString"
    };

    var result = F.render(rootID, template, overrides);

    expect(result).toBe(null);

  });

  it("should not return null if rootID and template are valid but overrides is missing", function() {
    var rootID = 'top';

    var template = "<div id='top'>{{middle}}</div>" +
    "<div id='middle'>{{bottom}}</div>" +
    "<div id='bottom'>Bottom Div</div>";
    
    var correctTemplate = "<div id='top'><div id='middle'><div id='bottom'>Bottom Div</div></div></div>";

    var result = F.render(rootID, template);
    result = result.outerHTML.replace(/\"/g,"'");

    expect(result).toMatch(correctTemplate);
  });

  it("should return null if rootID is a zero-length string", function() {
    var rootID = '';
    var template = "<div id='top'>{{middle}}</div>" +
    "<div id='middle'>{{bottom}}</div>" +
    "<div id='bottom'>Bottom Div</div>";

    var result = F.render(rootID, template);

    expect(result).toBe(null);
  });

  it("should return null if template is a zero-length string", function() {
    var rootID = 'filo-root';
    var template = "";

    var result = F.render(rootID, template);

    expect(result).toBe(null);
  });

  it("should return the entire parsed template when given the rootID: filo-root", function() {
    var rootID = 'filo-root';

    var template = "<!-- <div id='outside'>{{top}}</div> --><div id='top'>{{middle}}</div>" +
    "<div id='middle'>{{bottom}}</div>" +
    "<div id='bottom'>{{myVar}}</div>";

    var overrides = {
      myVar: "myVarString"
    };

    var correctTemplate = '<div id="filo-root"><!-- <div id="outside">' + escape('{{top}}') + '</div> --><div id="top"><div id="middle"><div id="bottom">myVarString</div></div></div><div id="middle"><div id="bottom">myVarString</div></div><div id="bottom">myVarString</div></div>';

    var result = F.render(rootID, template, overrides);

    expect(result).not.toBe(null);
    
    result = result.outerHTML.replace(/\'/g,'"');
    console.log(result);
    console.log(correctTemplate);
    expect(result).toMatch(correctTemplate);
  });
});
