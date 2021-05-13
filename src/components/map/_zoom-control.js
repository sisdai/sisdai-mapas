import {Control, } from 'ol/control';


const CustomZoomControl = /*@__PURE__*/(function (Control) {
    function CustomZoomControl(opt_options) {
      var options = opt_options || {};
  
      var button = document.createElement('button');
      button.className = "dai-zoom-button"
      button.innerHTML = '<span class="dai-acercar"></span>'//'<img src="icons/acercar.svg" height="25px" width="25px"/>';

      var button2 = document.createElement('button');
      button2.className = "dai-zoom-button"
      button2.innerHTML = '<span class="dai-alejar"></span>'
  
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
        this.getMap().getView().animate({zoom:this.getMap().getView().getZoom()+1,duration:250})
        
    };
    CustomZoomControl.prototype.handleZoomOut = function handleZoomOut () {
        this.getMap().getView().animate({zoom:this.getMap().getView().getZoom()-1,duration:250})
        
    };
  
    return CustomZoomControl;
  }(Control));

  const ResetControl = /*@__PURE__*/(function (Control) {
    function ResetControl(opt_options) {
      var options = opt_options || {};
  
      var button = document.createElement('button');
      button.className = "dai-reset-button"
      button.innerHTML = '<span class="dai-centrar"></span>'//'<img src="icons/acercar.svg" height="25px" width="25px"/>';

      
  
      var element = document.createElement('div');
      element.className = 'dai-reset ol-unselectable ol-control';
      element.appendChild(button);
      
  
      Control.call(this, {
        element: element,
        target: options.target,
      });
  
      button.addEventListener('click', this.handleReset.bind(this), false);
    }
  
    if ( Control ) ResetControl.__proto__ = Control;
    ResetControl.prototype = Object.create( Control && Control.prototype );
    ResetControl.prototype.constructor = ResetControl;
  
    ResetControl.prototype.handleReset = function handleReset () {
        //this.getMap().getView().animate({zoom:this.getMap().getView().getZoom()+1,duration:250})
        let view_options = this.getMap().get("_reset_view");
        if(view_options.type == "extent"){
            this.getMap().getView().fit(view_options.value,{duration:500,padding:[10,10,10,10]})
        }else{
            this.getMap().getView().animate(view_options.value)
        }
        this.dispatchEvent("reset")
        
    };
    
  
    return ResetControl;
  }(Control));

  export default CustomZoomControl;
  export {ResetControl}