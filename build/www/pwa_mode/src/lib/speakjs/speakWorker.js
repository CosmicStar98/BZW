importScripts('speakGenerator.js');

onmessage = function(event) {
  postMessage(generateSpeech(event.data.text, event.data.args));
};



/*
     FILE ARCHIVED ON 10:59:13 May 29, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 00:07:09 May 23, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 76.124
  exclusion.robots: 0.103
  exclusion.robots.policy: 0.095
  RedisCDXSource: 0.638
  esindex: 0.013
  LoadShardBlock: 57.537 (3)
  PetaboxLoader3.datanode: 82.513 (4)
  CDXLines.iter: 15.652 (3)
  load_resource: 68.511
  PetaboxLoader3.resolve: 36.088
*/