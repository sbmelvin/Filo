// jQuery.filo.insertFilo
// Replaces an element's html with the output of F.render
(function($){
	$.fn.htmlFilo = function(bodyID, template, overrides) {
		this.each(function() {
			var html = F.render(bodyID, template, overrides);
			if(html){
				$(this).html(html);
			}
		});
	};

	$.fn.appendFilo = function(bodyID, template, overrides) {
		this.each(function() {
			var html = F.render(bodyID, template, overrides);
			if(html){
				$(this).append(html);
			}
		});
	};

	$.fn.prependFilo = function(bodyID, template, overrides) {
		this.each(function() {
			var html = F.render(bodyID, template, overrides);
			if(html){
				$(this).prepend(html);
			}
		});
	};
})(jQuery);