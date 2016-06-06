
 /**
 * TestModule uses AjaxModule to make HTTP request and   it shows  the response inside  a  div.
 *
 * DEPENDENCIES
 * JQUERY
 */

/**
 * Constructor
 * @param ajaxModule    {Module} Module  which handles ajax calls.
 * @param oConfigIdHtml {Object} Object with the  html ids  of  buttons and the div  that displays the response. The attributes are idJsonBtn, idHtmlBtn, id401Btn, id500btn and idDisplayDiv.
 * @param oConfigUrls   {Object} Object with the  urls  to request and the methods  that will be used. The attributes are urlJson:{url:,method:}, urlHtml:{url:,method:} and url401:{url:, method:}, url500:{url:,method:}.
 * @constructor
 */
var  TestModule= function (ajaxModule){

    /**
     * Module  which handles ajax calls.
     * @property __ajaxModule
     * @type {Module}
     * @private
     */
    var __ajaxModule=null;
    
    var __divId="wellModule1Response_id";

    /**
     * This method  sets  up  the parameters  passed through  the constructor.
     * @method  __setUpModule
     * @param ajaxModule    {Module} AjaxModule.
     * @param oConfigIdHtml {Object} Object with the ids.
     * @param oConfigUrls   {Object} Object with the urls.
     * @private
     */
    var __setUpModule= function(ajaxModule){

        __ajaxModule=ajaxModule;
        __loadAction();
        //__loadAction(oConfigIdHtml,oConfigUrls);

    };

    /**
     * Sets the actions of each button.
     * @method  __loadAction
     * @param oConfigIdHtml {Object} Object with the ids.
     * @param oConfigUrls   {Object} Object with the urls.
     * @private
     */
    var __loadAction=function(){
    	        
        $("#btnModule1_id").click(function(){        	
        	
        	var value=$("#txtModule1_id").val();
        	var promise= __ajaxModule.post("/getInformation",value);        
            promise.then(function(data) {
                console.info(data);
                __showRequest(JSON.stringify(data),__divId);
            });
                    	
        });
		
    };

    
    /**
     * Shows data on a specific div.
     * @method  __showRequest
     * @param dataToShow   {String} Data to show.
     * @param idDivDisplay {String} Div's id where the data will be displayed.
     * @private
     */
    var __showRequest= function(dataToShow,idDivDisplay){

        var divDisplay=$("#"+idDivDisplay);
        divDisplay.removeClass("hide");        
        divDisplay.append('<div class="well ">"<b>Response:</b> '+dataToShow+' </div>');

    };

    /**
     * This method is executed after the  constructor  was called and  initializes the setup.
     */
    __setUpModule(ajaxModule);

};
