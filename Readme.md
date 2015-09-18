## Filo
#### id-based html templates

Filo does one thing. It replaces tags in the form of `{{tag_name}}` within the provided template with the html element whose html ID matches `tag_name` or with a value from an 'override' object.

Here is an example template for a blog post (stored as post.htm):
```html
<!-- post.htm -->

<div id="post">
{{post-header}}
{{post-body}}
{{post-footer}}
</div>

<div id="post-header">
{{post_title}}
</div>

<div id="post-body">
{{post_content}}
</div>

<div id="post-footer">
{{post_date}}
</div>
```

To render this post, load post.htm into a JS string (we'll call it template). Next Filo needs to know which html node is the root node. We specify the root node by its html ID. Lastly, we need to provide values for the template tags that don't correspond to html IDs, such as {{post_title}}. These values are stored in an opional 'overrides' object. To render the post, we write:

```Javascript  
var myPost = F.render('post', template, {
	post_title: 'My Post Title',
	post_content: 'Blah Blah Blog',
	post_date: '03-22-2013'
});
```

**Result:**
```html
<div id="post">
  <div id="post-header">
    My Post Title
  </div>
  <div id="post-body">
    Blah Blah Blog
  </div>
  <div id="post-footer">
    03-22-2013
  </div>
</div>
```

*If Filo encounters a template tag that cannot be resolved to an html ID or override key, the render will fail.*

#FAQ

**Q**) This looks like Mustache.js, how is this not Mustache.js?

**A**) Filo is not a replacement for Mustache.js, but uses the same tag syntax so developers can easily migrate to Mustache.js if they need a more-powerful templating system. Filo allows developers to build html by writing reusable html nodes that are linked together by html ids and template tags. 




