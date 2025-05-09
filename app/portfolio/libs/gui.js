import jQuery from "jquery";

class Element extends jQuery.fn.init {
	
	constructor(element, classes, id, el){
		if(!el) el = document.createElement(element);
		super(el);
		if(classes) this.addClass(classes);
		if(id) this.attr({ id });
	}

	add(...items){
		Array.from(items).forEach(item => {
			this.append(item);
		});
		return this;
	}

}

class Frame extends Element {
	constructor(qry, classes, id){
		if(qry.startsWith('#')){
			super(null, null, null, jQuery(qry)[0]);
		} else {
			super(qry, classes || "", id || "");
		}
	}
}

class Section extends Frame{
	constructor(id, type){
		super('section', 'section section-'+type, id);
	}
}

const Root = new Frame("#root");

export { Frame, Root, Section, jQuery as $ };