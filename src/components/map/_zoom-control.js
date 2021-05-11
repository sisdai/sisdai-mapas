import {Control, } from 'ol/control';


const CustomZoomControl = /*@__PURE__*/(function (Control) {
    function CustomZoomControl(opt_options) {
      var options = opt_options || {};
  
      var button = document.createElement('button');
      button.className = "dai-zoom-button"
      button.innerHTML = '<span class="zoom-in"></span>'//'<img src="icons/acercar.svg" height="25px" width="25px"/>';

      var button2 = document.createElement('button');
      button2.className = "dai-zoom-button"
      button2.innerHTML = '<span class="zoom-out"></span>'
  
      var element = document.createElement('div');
      element.className = 'dai-zoom ol-unselectable ol-control';
      element.appendChild(button);
      element.appendChild(button2);
  
      Control.call(this, {
        element: element,
        target: options.target,
      });
  
      button.addEventListener('click', this.handleZoomIn.bind(this), false);
      button2.addEventListener('click', this.handleZoomOut.bind(this), false);
    }
  
    if ( Control ) CustomZoomControl.__proto__ = Control;
    CustomZoomControl.prototype = Object.create( Control && Control.prototype );
    CustomZoomControl.prototype.constructor = CustomZoomControl;
  
    CustomZoomControl.prototype.handleZoomIn = function handleZoomIn () {
      this.getMap().getView().setZoom(this.getMap().getView().getZoom()+1)
    };
    CustomZoomControl.prototype.handleZoomOut = function handleZoomOut () {
        this.getMap().getView().setZoom(this.getMap().getView().getZoom()-1)
    };
  
    return CustomZoomControl;
  }(Control));

  export default CustomZoomControl;