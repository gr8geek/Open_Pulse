window.addEventListener('DOMContentLoaded',(event)=>{
  var array = []
    const constraints = {
video: {facingMode :{exact:"environment"}}
};

navigator.mediaDevices.getUserMedia({
video: {
facingMode: 'environment',
}
})
.then((stream) => {
const video = document.querySelector('video');
video.srcObject = stream;

// get the active track of the stream
const track = stream.getVideoTracks()[0];

video.addEventListener('loadedmetadata', (e) => {  
window.setTimeout(() => (
  onCapabilitiesReady(track.getCapabilities())
), 500);
});

function onCapabilitiesReady(capabilities) {
if (capabilities.torch) {
  track.applyConstraints({
    advanced: [{torch: true}]
  })
  .catch(e => console.log(e));
}
}

})
.catch(err => console.error('getUserMedia() failed: ', err));
console.log("Loaded")
var processor = {  
timerCallback: function() {  
if (this.video.paused || this.video.ended) {  
return;  
}  
this.computeFrame();  
var self = this;  
setTimeout(function () {  
self.timerCallback();  
}, 16); // roughly 60 frames per second  
},

doLoad: function() {
this.video = document.getElementById("my-video");
this.c1 = document.getElementById("my-canvas");
this.ctx1 = this.c1.getContext("2d");
var self = this;  

this.video.addEventListener("play", function() {
self.width = self.video.width;  
self.height = self.video.height;  
self.timerCallback();
}, false);
},  

computeFrame: function() {
this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
var frame = this.ctx1.getImageData(0, 0, this.width, this.height);
var l = frame.data.length / 4;  
var sum = 0
for (var i = 0; i < l; i++) {
var grey = (frame.data[i * 4 + 0] + frame.data[i * 4 + 1] + frame.data[i * 4 + 2]) / 3;
//var grey = (frame.data[i * 4 + 0] ) / 3;
sum+=grey
frame.data[i * 4 + 0] = grey;
frame.data[i * 4 + 1] = grey;
frame.data[i * 4 + 2] = grey;
}
//array.push(sum/l)
console.log(sum/l)
this.ctx1.putImageData(frame, 0, 0);

return;
}
};  
processor.doLoad()


})
