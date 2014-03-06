// jQuery.filo.insertFilo
// Replaces an element's html with the output of F.render
(function($){
	$.fn.insertFilo = function(bodyID, template, overrides) {
		this.each(function() {
			var html = F.render(bodyID, template, overrides);
			if(html){
				$(this).html(html);
			}
		});
	};
})(jQuery);
