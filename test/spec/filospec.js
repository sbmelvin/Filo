/*
The MIT License (MIT)

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/


function formatHTML(html) {
  var ele = document.createElement('div');
  ele.innerHTML = html;
  return ele.innerHTML;
}

describe("Filo", function() {

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

    var template =  "<div id='top'>{{middle}}</div>" +
                    "<div id='middle'>{{bottom}}</div>" +
                    "<div id='bottom'>{{myVar}}</div>";

    var overrides = {
      myVar: "myVarString"
    };

    var correctTemplate = formatHTML("<div id='top'><div id='middle'><div id='bottom'>myVarString</div></div></div>");

    var result = F.render(rootID, template, overrides);
    
    expect(result).not.toBe(null);
    
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
    
    var correctTemplate = formatHTML("<div id='top'><div id='middle'><div id='bottom'>Bottom Div</div></div></div>");

    var result = F.render(rootID, template);

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

    var template =  "<!-- <div id='outside'>{{top}}</div> -->" +
                    "<div id='top'>{{middle}}</div>" +
                    "<div id='middle'>{{bottom}}</div>" +
                    "<div id='bottom'>{{myVar}}</div>";

    var overrides = {
      myVar: "myVarString"
    };

    var correctTemplate = formatHTML('<div id="filo-root">' +
                          '<div id="top"><div id="middle"><div id="bottom">myVarString</div></div></div>' +
                          '<div id="middle"><div id="bottom">myVarString</div></div>' +
                          '<div id="bottom">myVarString</div></div>');

    var result = F.render(rootID, template, overrides);

    expect(result).toMatch(correctTemplate);
  });

  it("should remove HTML comments and therefore ignore template tags within comments", function() {
    var template =  "<div id='hasComment'>{{beforeComment}}<!-- {{middle}} -->{{afterComment}}</div>" +
                    "<div id='beforeComment'>There shouldn't be a comment between this --></div>" +
                    "<div id='afterComment'><-- and this.</div>";

    var correctTemplate = formatHTML("<div id='hasComment'><div id='beforeComment'>There shouldn't be a comment between this --&gt;</div><div id='afterComment'>&lt;-- and this.</div></div>");
    var result = F.render('hasComment', template);
    console.log(result);
    console.log(correctTemplate);
    expect(result).toMatch(correctTemplate);
  });
});