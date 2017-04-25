;(function($){
	$.fn.cityPickerPlugin = function(options){
		var cityPicker = new CityPicker(this,options);
		return cityPicker.init();
	};
	function CityPicker(ele,opt){
		this.ele = ele;
		this.options = opt;
		this.defaults = {
			elem : this.ele;
		};
		this.options = $.extend({},this.defaults,opt);
	};
	CityPicker.prototype = {
		init : function(){
			
		}
	}
}(jQuery))