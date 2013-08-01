class Skill extends ASection

	constructor:( camera, scene, render )->

		$("#skill p").css
			"opacity":"0"
			"paddingTop":"40px"

		$("#skill li").css
			"opacity":"0"

		$("#skill").show()
		
		TweenLite.to( $("#skill p"), 1.5, {delay:.8, paddingTop:"0px", opacity:1, ease:Quad.easeOut } )
		index = 0
		skills = $("#skill li");
		for i in [0..skills.length] by 1
			@bouboup(skills[i], i)
		return
	
	bouboup:(skill,index)->
		TweenLite.to( $(skill), 1.1, { delay : .7+index*.15, opacity:.8} )
		return


	update:()->
		camera.lookAt scene.position 
		renderer.render scene, camera
		return
	
	close : ( callback ) ->
		$("#skill").fadeOut 400, callback 
		return