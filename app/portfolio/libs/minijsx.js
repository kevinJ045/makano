
const jsxParser = (code) => {
  const result = [];
  const componentStack = [];

  const componentRegex = /<(\/|)(\w+)\s*([^>]*)\s*\/?>/g;
  const attributeRegex = /(\w+\:|)(\w+)\s*=\s*("([^"]*)"|\{([^}]*)\})/g;
  const attributeRegexTrue = /(\w+\:|\{|)(\w+)\s*(\}|=|)\s/g;
  const spreadPropsRegex = /\{...\{([^}]+)\}\}/;

  let match;

  while ((match = componentRegex.exec(code))) {
    const [full, close, type, attributeString] = match;
    let params = {};
    const children = [];

    var addAttr = (attrKind, attributeName, attributeValue, isvar, onlyifnull) => {
      if(isvar ) attributeValue = '${'+attributeValue+'}';
      if(attrKind){
        attrKind = attrKind.split(':')[0];
        if(!params[attrKind]) params[attrKind] = {};
        if(onlyifnull && params[attrKind][attributeName]) return;
        params[attrKind][attributeName] = attributeValue;
      } else {
        if(onlyifnull && params[attributeName]) return;
        params[attributeName] = attributeValue;
      }
    }

    if(spreadPropsRegex.test(attributeString)){
      var f = spreadPropsRegex.exec(attributeString) || [];
      params = '${'+f[1]+'}';
    } else {
      let attributeMatch;
      while ((attributeMatch = attributeRegex.exec(attributeString))) {
        let [, attrKind, attributeName, sep2, attributeValue, attributeVar] = attributeMatch;
        var v = false;
        if(attributeVar) v = true, attributeValue = attributeVar;

        addAttr(attrKind, attributeName, attributeValue, v);
      }
      while ((attributeMatch = attributeRegexTrue.exec(attributeString))) {
        let [, attrKind, attributeName] = attributeMatch;
        var val = true;
        if(attrKind == '{'){
          attrKind = null;
          val = attributeName;
        }
        addAttr(attrKind, attributeName, val, !(val === true), val === true);
      }
    }

    const component = {
      type,
      params,
      children
    };

    if (componentStack.length > 0) {
      const parentComponent = componentStack[componentStack.length - 1];
      if(!close) parentComponent.children.push(component);
    } else {
      if(!close) result.push(component);
    }

    if (!full.endsWith("/>")) {
      if(!close) componentStack.push(component);
    }

    if (full.endsWith(`</${type}>`) && close) {
      componentStack.pop();
    }
  }

  return result;
}

function convertGUIToJSON(element) {
  var children = [];
  $(element).children().each(function() {
    var child = this;
    if (child.GUIElement) {
      var childObj = { type: child.GUIElement.constructor.name, children: [], params: {} };
      var i = child.GUIElement.attrs?.id || child.GUIElement._id_();
      
      if (child.firstChild.nodeType === Node.TEXT_NODE) {
        childObj.params.text = child.firstChild.textContent;
      } else {
        childObj.params.text = '';
      }
      if(i) childObj.params.id = i;
      
      childObj.children = convertGUIToJSON(child);
      children.push(childObj);
    } else {
      var unknownChildren = convertGUIToJSON(child);
      children = children.concat(unknownChildren);
    }
  });
  return children;
}

function convertToJSX(json, indentLevel = 0) {
  var jsx = '';

  for (var i = 0; i < json.length; i++) {
    var element = json[i];
    var type = element.type;
    var children = element.children;
    var params = element.params;

    var childJSX = '';
    if (children.length > 0) {
      childJSX = convertToJSX(children, indentLevel + 1);
    }

    var attributes = Object.entries(params).map(function([key, value]) {
      return key + '="' + value + '"';
    }).join(' ');

    var indent = ' '.repeat(indentLevel * 2);

    if (childJSX === '') {
      jsx += indent + '<' + type + ' ' + attributes + ' />' + '\n';
    } else {
      jsx += indent + '<' + type + ' ' + attributes + '>' + '\n';
      jsx += childJSX;
      jsx += indent + '</' + type + '>' + '\n';
    }
  }

  return jsx;
}

export { jsxParser, convertGUIToJSON, convertToJSX };