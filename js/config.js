
var Config = (function () {

  // *** private fields
  var _ractive = null;


  // *** private methods
  var _getConfigFromServer = function (param) {

       $.get('config/' + param + '.yml')
          .done(function (data) {
              
              var cfg = jsyaml.load(data);
              console.log(cfg);
              
              _ractive.set( param, cfg );
              // var jsonString = JSON.stringify(data);
              // console.log(jsonString);
              // console.log($.parseJSON(jsonString));        
          });  

  };


  // *** public api
  var init = function () {

      _ractive = new Ractive({
        el: '#container',
        template: '#template',
        data: { bentley: { greeting: 'NA', name: 'NA', desc: 'NA'} , gis: { greeting: 'NA', name: 'NA', desc: 'NA'}}
      });  

      _ractive.observe( 'bentley.desc', function ( newValue, oldValue ) {
         console.log('oldValue', oldValue);
         console.log('newValue', newValue);
      });  

      _ractive.observe( 'gis.HelloWorld.integer', function ( newValue, oldValue ) {
         console.log('oldValue', oldValue);
         console.log('newValue', newValue);
      });       
  };  

  var getBentleyConfig = function () {
      _getConfigFromServer('bentley');
  };

  var getGISConfig = function () {
  		_getConfigFromServer('gis');
  };



  // *** define/expose public api
  return {
     init: init,
     getBentleyConfig: getBentleyConfig,
     getGISConfig: getGISConfig
  };

})();