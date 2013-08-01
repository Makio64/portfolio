class Contact extends ASection

	constructor:( camera, scene, render )->

		super( camera, scene, render ) 
		
		$("#contact h1").css
			"paddingTop":"70px"
			"opacity":"0"

		$("#contact sub").css
			"paddingTop":"10px"
			"opacity":"0"
		
		$("#contact div").hide()
		$("#contact").show()

		TweenLite.to( $("#contact h1"), 1.1, {delay:.8, paddingTop: "0px", opacity:1, ease:Quad.easeOut} )
		TweenLite.to( $("#contact sub"), 0.65, {delay:1.1, paddingTop: "0px", opacity:1} )
		$("#contact div").delay( 1400 ).fadeIn( 600, @onOpenTweenComplete  )
		return
	

	onOpenTweenComplete : () ->
		currentSection.state = "open"
		return
	

	update : () ->
		renderer.render scene, camera 
		return

	
	close : ( callback ) ->
		@state = "closing"
		$("#contact").fadeOut 400, callback
		return