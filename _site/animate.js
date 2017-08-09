var timeStarted = getTime()

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


(function animloop(){
  requestAnimFrame(animloop);
  render();
})();

var pulseScale = 0.0

function render()
{
	var frequency = 1.0/65.0*60.0;
	var bobTime = 0.2;

	var timeElapsed = getTime() - timeStarted

	// image pulsing

	var pulsingImages = document.getElementsByClassName('pulse');

	var pulseTime = 0.04;
	var bobbing = ((timeElapsed % frequency) > pulseTime);

	if(bobbing)
	{
		var decreaseSpeed = 2.0
		pulseScale = Math.max(pulseScale - 1.0/60.0 * decreaseSpeed, 0.0)
	}
	else
	{
		pulseScale = 0.1;
	}

	for(i in pulsingImages)
	{
		var image = pulsingImages[i]

		if(image.style != null)
		{
			var variation = .9

			var pulseAdded = 1.0 + pulseScale * variation;
			image.style.transform = 'scale(' + pulseAdded + ',' + pulseAdded + ')'
		}

	}
}

function getTime()
{
	return (new Date().getTime() / 1000.0)
}
