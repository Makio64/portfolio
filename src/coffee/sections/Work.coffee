class Work extends ASection
	

	constructor:( camera, scene, render )->

		super(camera, scene, render)

		$("#work h1").css 
			"paddingTop": "70px"
			"opacity": 0

		$("#work sub").css 
			"paddingTop": "10px"
			"opacity": 0

		$("#work div").hide()
		$("#work").show()
		
		TweenLite.to( $("#work h1"), 1.1, {delay:.8, paddingTop:"0px", opacity:1, ease:Quad.easeOut} )
		TweenLite.to( $("#work sub"), 0.65, {delay:1.1, paddingTop: "0px", opacity: 1} )
		return


	onOpenTweenComplete : () ->
		currentSection.state = "open"
		return


	update:()->
		camera.lookAt scene.position
		renderer.render scene, camera
		return


	close:(callback) ->
		$("#work").fadeOut 250, callback
		return