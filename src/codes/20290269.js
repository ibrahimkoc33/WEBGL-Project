var gl;
var isDirClockwise = false;
var delay = 50;
var colorr_location;

var theta=0;
var thetaLoc;

var renk=0;
var renkLoc;

var dondur=false;
var dondurLoc;

var yonx=0;
var yonxLoc;

var yony=0;
var yonyLoc;

var size=1;
var sizeLoc;
function buttonPressedFunc(){
	isDirClockwise=!isDirClockwise;
}

window.onload = function init() {

	const canvas = document.querySelector("#glcanvas");
	// Initialize the GL context
	gl = WebGLUtils.setupWebGL(canvas);
	// Only continue if WebGL is available and working
	if (!gl) {
	alert("Unable to initialize WebGL. Your browser or machine may not support it.");
	return;
	}
  
	var program = initShaders(gl, "vertex-shader", "fragment-shader")
	gl.useProgram( program );
	
	var myButton = document.getElementById("DirectionButton"); 
	myButton.addEventListener("click", buttonPressedFunc);
	
	sizeLoc=gl.getUniformLocation(program,"size");
	
	renkLoc = gl.getUniformLocation(program, "renk");
	
	yonxLoc = gl.getUniformLocation(program, "yonx");
	
	yonyLoc = gl.getUniformLocation(program, "yony");
	
	dondurLoc=gl.getUniformLocation(program,"dondur");
	
	thetaLoc = gl.getUniformLocation(program, "theta");
	
	colorr_location = gl.getUniformLocation(program,"colorr");
	
	document.getElementById("slide").onchange = function() {delay = 100-this.value;};
	document.getElementById("x").onchange = function() {yonx = 0 + Number(this.value);};
	document.getElementById("y").onchange = function() {yony = 0 +  Number(this.value);};
	
	var m = document.getElementById("mymenu");
	m.addEventListener("click", function() {
		switch (m.selectedIndex) {
			case 0:
				size+=0.1;
				break;
			case 1:
				size-=0.1;
				break;
		}
	});
	var t = document.getElementById("turn");
	t.addEventListener("click", function() {
		switch (t.selectedIndex) {
			case 0:
				dondur=true;
				break;
			case 1:
				dondur=false;
				break;
		}
	});
	window.addEventListener("keydown", 
   function() {
      switch (event.keyCode) {
         case 49: // 1 key
			dondur=!dondur;
            break;
         case 50: // 2 key
            delay /= 2.0;
            break;
         case 51: // 3 key
            delay *= 2.0;
            break;
		 case 52: // 4 key
			renk=1;
			break;
		 case 53: // 5 key
			renk=2;
			break;
		 case 54: // 6 key
			renk=3;
			break;
		 case 55: // 7 key
			renk=4;
			break;
		 case 56: // 8 key
			renk=5;
			break;
		 case 57: // 9 key
			renk=6;
			break;
		 case 48: // 0 key
			renk=7;
			break;
		 case 37: // arrow left
			yonx-=0.1;
			break;
			
		 case 38: // arrow up
			yony+=0.1;
			break;
			
		 case 39: // arrow right
			yonx+=0.1;
			break;
			
		 case 40: // arrow down
			yony-=0.1;
			break;
      }
   });
		var vertices = [
				// C nin  üst yatay dörtgeni
			vec2(.5, .5), 
			vec2(.5, .4), 
			vec2(0, .5), 
			
			vec2(0, .5), 
			vec2(.5, .4), 
			vec2(0, .4),
			
			// C nin dikey dörtgeni
			vec2(0, .5),
			vec2(0, -.3),
			vec2(-.1, -.3),
			
			vec2(-.1, -.3),
			vec2(-.1, .5),
			vec2(0, .5),
			
			// C nin alt yatay dörgeni
			vec2(0, -.3),
			vec2(.5, -.3),
			vec2(0, -.2),
			
			vec2(0, -.2),
			vec2(.5, -.2),
			vec2(.5,-.3),
			
			// ç nin noktası
			vec2(.15, -.4),
			vec2(.25, -.4),
			vec2(.25, -.5),
			
			vec2(.25, -.5),
			vec2(.15, -.5),
			vec2(.15, -.4),
			
			// I 
			vec2(-.3, .5),
			vec2(-.4, .5),
			vec2(-.4, -.3),
			
			vec2(-.4, -.3),
			vec2(-.3, -.3),
			vec2(-.3, .5),
			
			// İ nin noktası
			
			vec2(-.3, .65),
			vec2(-.3, .55),
			vec2(-.4, .55),
			
			vec2(-.4, .55),
			vec2(-.4, .65),
			vec2(-.3, .65),
			];

	
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
	
	// Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	// Set clear color to black, fully opaque
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	requestAnimFrame(render);
}

function render(){
	setTimeout(function() {
		// Clear the color buffer with specified clear color
		gl.clear(gl.COLOR_BUFFER_BIT);
		
		if(dondur){
			theta += (isDirClockwise ? -0.1 : 0.1);
		}
		
		if(renk==1){
			gl.uniform4f(colorr_location,1.0, 0.0, 0.0, 1.0);
		}
		else if(renk==2){
			gl.uniform4f(colorr_location,1.0, 1.0, 0.0, 1.0);
		}
		else if(renk==3){
			gl.uniform4f(colorr_location,0.0, 0.0, 0.0, 1.0);
		}
		else if(renk==4){
			gl.uniform4f(colorr_location,0.0, 1.0, 0.0, 1.0);
		}
		else if(renk==5){
			gl.uniform4f(colorr_location,1.0, 0.0, 1.0, 1.0);
		}
		else if(renk==6){
			gl.uniform4f(colorr_location,0.0, 0.0, 1.0, 1.0);
		}
		else if(renk==7){
			gl.uniform4f(colorr_location,0.0, 1.0, 1.0, 1.0);
		}
		gl.uniform1f(sizeLoc,size);
		gl.uniform1f(yonxLoc,yonx);
		gl.uniform1f(yonyLoc,yony);
		gl.uniform1f(thetaLoc, theta);
		
		gl.drawArrays(gl.TRIANGLES, 0, 36);
		
		render();
		}, delay);
}