

/**
 * StoreHandlerModule handles  the local storage of the browser 
 * DEPENDENCIES
 * 
 */
var StoreHandlerModule=(function(){
	
	/**
	 * 	Wrapper for the module
	 */
	function StoreHandlerModule(){
		
		/**
		 * Checks if the value exist in the store 
		 */
		this.checkValue=function(valueName){
	        	    	   
		   if(localStorage.getItem(valueName)!=null){
			   return true;
		   }else{    		   
			   return false;
		   }    	   
	   };
	   
	   /**
	    * Gets  value form the store 
	    */
	   this.getValue=function(valueName){
		 
		   return localStorage.getItem(valueName);    	       	   
		   
	   };	   
	   
	   /**
	    * Sets a value in the store
	    */
	   this.setValue=function(valueName,value){
		 
		   localStorage.setItem(valueName,value);
		   
	   };                         
	}		 
	/** return the module*/
   return StoreHandlerModule;    
	
})();


/**
 * DataConnectionModule handles  the  encryption 
 * DEPENDENCIES
 *  StoreHandlerModule
 */
var DataConnectionModule=(function(storeHandlerModule){
		
		
   var __storeHandlerModule=storeHandlerModule || null;
	   
   var __valueExist=null;	
   var __iterationCount =1000;
   var __keySize =128;   
   var __salt="3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55";
   var __iv="F27D5C9927726BCEFE7510B1BDD3D137";
   var __passphrase=null;	   	       
   var __aesUtil = null;
   
   function  DataConnectionModule(){ 
	        
       this.setPassphrase=function(passphrase){
        	       	       	   
    	   __passphrase=passphrase;    	   
    	   __aesUtil = new AesUtil(__keySize, __iterationCount);    	   
    	   __storeHandlerModule.setValue('valueClient',passphrase);
    	   
    	   
       };
                            
       this.getStateValueClient=function(){
    	 
    	   return __valueExist;
    	   
       };
       
       this.encrypt=function (plainText){
    	   
    	   console.info(__salt);
    	   var ciphertext = __aesUtil.encrypt(__salt, __iv, __passphrase, plainText);
    	   console.info(ciphertext);
    	   return ciphertext;
       }
       
       this.decrypt=function (cipherText){
    	   
    	   var plainText = __aesUtil.decrypt(__salt, __iv, __passphrase, cipherText);
    	   console.info(plainText);
    	   return plainText;
       }
       
	}
	
	(function InitModule(){
		    
		__valueExist=__storeHandlerModule.checkValue('valueClient');
	            
	})();
	    
	return DataConnectionModule;    
	
})(new StoreHandlerModule());




var ModalHandlerModule=(function(divForModalId, checkId){
	
	var __divForModalId=divForModalId || null;
	var __checkId=checkId || null;
	var __modalId="modalInfo_id";
	var __modalCargado=0;
	var __user=null;
	var __pass=null;
	var __encrypt=false;
	
	function ModalHandlerModule(){
		
		
		this.getIsEncrypt=function(){
			
			return  __encrypt; 
			
		}
		
		this.getInfoUser=function(){
			
			return {"user":__user,"pass":__pass};
			
		};
		
		var __eventCheck=function(){
			
			
			$(':checkbox').checkboxpicker({
     			html: true,
      			offLabel: '<span>Not encrypt</span>',
        		onLabel: '<span>Encrypt</span>'		
        	});
			
			
			$('#'+__checkId).change(function(val) {								
							   
				if(__encrypt==false){
					if(__user==null && __pass==null){
			    		$('#'+__modalId).modal('show');			    		
			    	}
					__encrypt=true;
				}else{
					__encrypt=false;
				}
		    	
				
				});
			/*
			
			$('#'+__checkId).click(function() {
			    var $this = $(this);			       
			    if ($this.is(':checked')) {
			    	if(__user==null && __pass==null){
			    		$('#'+__modalId).modal('show');
			    	}			    	
			    	__encrypt=true;
			    } else {
			    	__encrypt=false;	
			    }
			});
			
			*/
			$('#btn_encrypt_id').click(function() {
				
				__pass=$('#pass_id').val();
				__user=$('#user_id').val();
				$('#'+__modalId).modal('hide');
				
			});
			
			$('#btn_cancel_encrypt_id').click(function() {
								
				$('#'+__modalId).modal('hide');
				$('#'+__checkId).prop('checked', false);
				
				
			});
			
		}
		
		var __addModal=function(){
			
			if(document.getElementById(__divForModalId)){
				if(__modalCargado==0){
					var htmlModal=__getHtmlModal();
					$("#"+__divForModalId).append(htmlModal);
					__modalLoaded=1;
				}	
				return true;
			}else{
				return false;
			}
			
		};
		
		var __getHtmlModal=function(){
	    	
		   	  var htmlModal='' +
		   	'<div class="modal fade" id="modalInfo_id" tabindex="-1" role="dialog" data-backdrop="static">'+
		   	  '<div class="modal-dialog">'+
		   	   ' <div class="modal-content">'+
		   	   '   <div class="modal-header">'+
		   	  
		   	   '	     <h4 class="modal-title">Please, introduce your login information</h4>'+
		   	   '   </div>'+
		   	   '   <div class="modal-body">'+
		   	   			   	  
			          '<div class="form-group">'+
				          '  <label for="recipient-name" class="control-label">User name</label>'+
				          '  <input type="text" class="form-control" id="user_id">'+
				          '</div>'+
				          '<div class="form-group">'+
				          '  <label for="message-text" class="control-label">User password</label>'+
				          '  <input  type="password" class="form-control" id="pass_id">'+
				       '</div>'+			          
	   	    	  '</div>'+
		   	    '  <div class="modal-footer">'+
		   	    '    <button type="button" class="btn btn-default" id="btn_cancel_encrypt_id"   data-dismiss="modal">Cancel</button>'+
		   	    '    <button type="button" class="btn btn-danger" id="btn_encrypt_id">Encrypt</button>'+
		   	    '  </div>'+
		   	    
		   	    '</div>'+
		   	 ' </div>'+
		   	'</div>';
		   	  return htmlModal;
		   	
		};
		
		(function InitModule(){
		    
			__addModal();
			__eventCheck();
	 	            
	    })();
	}
	
	
	/** returns the module*/
	return ModalHandlerModule;    
		
})("modal_id","encryption_id");



/**
 * AjaxModule  can handle  all the ajax calls  that  are made on a webpage.
 * As it has a function   as  a constructor, this module can be instanced many times
 * every time  a  request  is made the module returns a promise  that will  be resolved after  analysing  the response  gotten  from  the server called.
 *
 * DEPENDENCIES
 * JQUERY
 */
var AjaxModule=(function (modalHandlerModule,dataConnectionModule){


	__dataConnectionModule=dataConnectionModule||null;
	__modalHandlerModule=modalHandlerModule||null;
	
    /**
     * has all the  requests   and responses done on the system.
     * @property  __dataHistoryRequest
     * @type {Array}
     * @private
     */
    var __dataHistoryRequest=Array();


    /**
     *  This method registers every request.
     * @method  __registerInfoRequest
     * @param urlRequest {String} URL  of te  request.
     * @param dataToSend  {String}  Data which be sent through the request.
     * @returns           {number} Unique id to identify the request.
     * @private
     */
    var __registerInfoRequest=function(urlRequest,dataToSend){

        __dataHistoryRequest.push(
            {
                id:__dataHistoryRequest.length, 
                url:urlRequest,                 
                dataSent:dataToSend,            
                responseStatus: null,           
                responseData:null,              
                responseCode:null               
            }
        )
        return (__dataHistoryRequest.length -1);

    };

    /**
     * This method is called once the response was analized.
     * @method  __registerInfoRequest
     * @param idUniqueRequest {Integer} Unique id of the request.
     * @param responseObject  {Object}  The object which was made with the data.
     * @private
     */
    var __registerInfoResponse=function(idUniqueRequest,responseObject){

        __dataHistoryRequest[idUniqueRequest].responseStatus=responseObject.status;
        __dataHistoryRequest[idUniqueRequest].responseData=responseObject.data;
        __dataHistoryRequest[idUniqueRequest].responseCode=responseObject.code;
        

    };


    /**
     *  Returns the deferred.
     * @returns {$.Deferred} Jquery's deferred.
     * @private
     */
    var __newDeferred= function(){

        return  new $.Deferred();

    };


    /**
     * Handles the ajax can send data to the server.
     * Call with Jquery's implementation.
     * @method __ajaxCallWithData
     * @param url         {String} Url to request.
     * @param typeRequest {String} It can be POST,PUT,DELETE,GET.
     * @param dataToSend  {Object} data to send.
     * @returns           {Object} the promise
     * @private
     */
    var  __ajaxCallWithData= function(url,typeRequest,dataToSend){

        var deferred= __newDeferred();
        $.ajax({
            url         : url,
            async       : true,
            type        : typeRequest,
            contentType : "application/json",
            data        : JSON.stringify(__checkEncryption(dataToSend)),
            success     : deferred.resolve, 
            error       : deferred.resolve  
        });
        return deferred.promise();

    };
    
    var __checkEncryption=function(dataToSend){
    	    	
    	var oData={}
    	if(__modalHandlerModule.getIsEncrypt()){
    		var infoUser=__modalHandlerModule.getInfoUser();
    		__dataConnectionModule.setPassphrase(infoUser.pass);
    		oData.data=__dataConnectionModule.encrypt(dataToSend);
    		oData.user=infoUser.user;
    	}else{
    		oData.data=dataToSend;
    		
    	}
    	return oData;
    };


    /**
     * Handles the ajax without sending data to the server.
     * Call with Jquery's implementation.
     * @method __ajaxCallWithData
     * @param url         {String} Url to request.
     * @param typeRequest {String} It can be POST,PUT,DELETE,GET.
     * @returns           {Object} the promise
     * @private
     */
    var  __ajaxCallWithoutData= function(url,typeRequest){

        var deferred= __newDeferred();
        $.ajax({
            url         : url,
            async       : true,
            type        : typeRequest,
            contentType : "application/json",
            success     : deferred.resolve,
            error       : deferred.resolve
        });
        return deferred.promise();

    };


    /**
     * This method defines which Ajax method should be called(request  which  send data in the request  or  doesn't).
     * Besides it returns a promise which will be delivered to  the  module  that  made the request.
     * @param urlRequest        {String} Url to request.
     * @param dataToSend        {Object}  Data, if it exists, which will be sent   with the request.
     * @param uniqueIdRequest   {Integer} Unique id of the request.
     * @param callMethod Method {String} GET, PUT, DELETE, POST
     * @returns                 {Object} A promise
     * @private
     */
    var __requestMethod= function(urlRequest,dataToSend,uniqueIdRequest,callMethod){

        var promise= null;
        if(dataToSend!= null){
            promise= __ajaxCallWithData(urlRequest,callMethod,dataToSend);
        }else{
            promise= __ajaxCallWithoutData(urlRequest,callMethod);
        }
        return promise.then(function(dataResponse,textStatusResponse,rawResponse) {
            var internalStatusCode=__analizeStatusResponse(dataResponse,rawResponse);
            return __setResponse(internalStatusCode,dataResponse,uniqueIdRequest);
        });

    };


    /**
     * Sets up the response gotten from the server and makes  the  object which  will be returned.
     * @param internalStatusCode {String}  Code of each possibility status code.
     * @param rawResponseData    {Object} Raw data  gotten from the server.
     * @param idUniqueRequest    {Integer} Unique id of the request.
     * @returns                  {Object} data to be delivered.
     * @private
     */
    var __setResponse=function(internalStatusCode,rawResponseData,idUniqueRequest){

        var oReturn={};
        oReturn.idRequest=idUniqueRequest;
        switch(internalStatusCode){
            case '500_error':
                oReturn.status=-1;
                oReturn.data=null;
                oReturn.code=500;
                break;
            case '401_error':
                oReturn.status=-1;
                oReturn.data=null;
                oReturn.code=401;
                break;
            case '200_json':
                oReturn.status=1;
                oReturn.data=__decryptDataFromServer(rawResponseData);                
                oReturn.code=200;
                break;
            case '200_noJson':
                oReturn.status=0;
                oReturn.data=null;
                oReturn.code=200;
                break;
            case '0_error':
                oReturn.status=-1;
                oReturn.data=null;
                oReturn.code=0;
                break;
        }
        __registerInfoResponse(idUniqueRequest,oReturn);
        return oReturn;

    };
    

    var __decryptDataFromServer=function(rawResponseData){
    	
    	var oData=JSON.parse(rawResponseData);    	
    	if(oData.user!=undefined){    		
    		console.info(__dataConnectionModule.decrypt(oData.data));
    		oData.data= __dataConnectionModule.decrypt(oData.data);
    		
    	}
    	return oData;
    	
    };



    /**
     * This method analyzes  the status  of  the response. The status is taken from the  raw data when
     *  the status is ok and  from the data response when  occurred an error.
     * @param dataResponse    {Object} Data response that was gotten form the server.
     * @param rawDataResponse {Object} Raw data that was gotten form the server.
     * @returns               {String}  an internal status.
     * @private
     */
    var __analizeStatusResponse=function(dataResponse,rawDataResponse){

        var status=null;
        if (typeof(rawDataResponse.status) !== 'undefined'){
            status= rawDataResponse.status;
        }else{
            status= dataResponse.status;
        }
        switch(status){
            case 500:
                return "500_error";
                break;
            case 401:
                return "401_error";
                break;
            case 200:
                return __analizeResponseText(rawDataResponse.responseText);
                break;
            default :
                return "0_error";
                break;
        }

    };

    /**
     * Takes the response and  checks if it is a JSON object then makes a status code for a 200 status.
     * @param responseText {String} Data  from the server.
     * @returns            {string} The status of  the data  which was gotten.
     * @private
     */
     var __analizeResponseText=function(responseText){

         if(__isJsonString(responseText)){
             return "200_json";
         }else{
             return "200_noJson";
         }

     };

    /**
     * Checks if the String is a  JSON  well made.
     * @param text {String} String to check.
     * @returns    {boolean}
     * @private
     */
    var __isJsonString=function (text) {
        try {
            JSON.parse(text);
        } catch (e) {
            return false;
        }
        return true;
    };


    /**
     * Constructor of the module.  This  function is returns every time  the module is called   whit  the new operator.
     * @constructor
      */
      function  constructor(){

        /**
         * Handles the POST request.
         * @param urlRequest {String} Url to request.
         * @param dataToSend {Object} Data, if it exists, which will be sent   with the request.
         * @returns {Object} A promise
         */
        this.post= function(urlRequest,dataToSend){

            urlRequest=urlRequest || null;
            dataToSend=dataToSend  || null;
            var uniqueIdRequest=__registerInfoRequest(urlRequest,dataToSend);
            return __requestMethod(urlRequest,dataToSend,uniqueIdRequest,"POST");

        };

        /**
         * Handles the GET request.
         * @param urlRequest {String} Url to request.
         * @param dataToSend {Object} Data, if it exists, which will be sent   with the request.
         * @returns {Object} A promise
         */
        this.get= function(urlRequest,dataToSend){

            urlRequest=urlRequest || null;
            dataToSend=dataToSend  || null;
            var uniqueIdRequest=__registerInfoRequest(urlRequest,dataToSend);
            return __requestMethod(urlRequest,dataToSend,uniqueIdRequest,"GET");

        };
       
        /**
         * Handles the PUT request.
         * @param urlRequest {String} Url to request.
         * @param dataToSend {Object} Data, if it exists, which will be sent   with the request.
         * @returns {Object} A promise
         */
        this.put= function(urlRequest,dataToSend){

            urlRequest=urlRequest || null;
            dataToSend=dataToSend  || null;
            var uniqueIdRequest=__registerInfoRequest(urlRequest,dataToSend);
            return __requestMethod(urlRequest,dataToSend,uniqueIdRequest,"PUT");

        };

        /**
         * Handles the DELETE request.
         * @param urlRequest {String} Url to request.
         * @param dataToSend {Object} Data, if it exists, which will be sent   with the request.
         * @returns {Object} A promise
         */
        this.delete= function(urlRequest,dataToSend){

            urlRequest=urlRequest || null;
            dataToSend=dataToSend  || null;
            var uniqueIdRequest=__registerInfoRequest(urlRequest,dataToSend);
            return __requestMethod(urlRequest,dataToSend,uniqueIdRequest,"DELETE");

        };

      }

      return  constructor;

    })(new ModalHandlerModule(),new DataConnectionModule());