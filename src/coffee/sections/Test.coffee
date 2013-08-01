# class TestSection extends ASection

# 	previousX					: 0
# 	previousY 					: 0

# 	cameraVector				: 0

# 	vx 							: 0
# 	vy 							: 0

# 	friction 					: 0.97

# 	lightController 			: null
# 	cameraController			: null

# 	gui 						: null

# 	snakes 						: []


# 	constructor:( camera, scene, render )->

# 		super camera, scene, render 
		
# 		@addElements()
# 		@addEvents()
# 		@addHead()
# 		@addStone()

# 		@gui = new GuiController(@)
# 		@gui.controllScene(scene)

# 		@cameraController = new CameraController( camera )
# 		@gui.controllCamera(@, @cameraController)

# 		@lightController = new LightController(scene, camera, @cameraController.radius)
# 		@gui.controllLight( @lightController )

# 		@particlesSpeed = new SpeedParticle(@scene,4500,@cameraController.radius)

# 		$("body").get(0).style.cursor = "url(./img/cursor_open.png),auto"

# 		@camera.lookAt( scene.position )

# 		@octopus = new Octopus(scene)
		
# 		# @gui.controlMaterial(@octopus)

# 		return


# 	addElements:()->

# 		material = new THREE.MeshLambertMaterial( 
# 			color 	:	0x00FF00
# 		)

# 		for i in [0..200] by 1
# 			geometry = new THREE.CubeGeometry( 20, 20, 20 )
# 			mesh = new THREE.Mesh(geometry, material)
# 			mesh.position.set( Math.random()*20, 20*i, Math.random()*20 )
# 			@scene.add( mesh )
# 			# mesh.matrixAutoUpdate = false
# 		return


# 	addHead:()->
# 		@head = new Head3D(@scene)
# 		@head.setPosition 0, 100*20+50, 0
# 		return


# 	addStone:()->
# 		@stone = new LifeStone(@scene, 0, 200*20+100, 0)
# 		# @stone = new LifeStone(@scene, 0, -50, 0)
# 		return


# 	addEvents:()->
# 		window.addEventListener("mousedown", @onTouch, false)
# 		return


# 	onTouch:(e)=>
# 		e.preventDefault()

# 		@previousX = e.pageX
# 		@previousY = e.pageY
# 		window.addEventListener("mouseup", @onRelease, false)
# 		window.addEventListener("mousemove", @onMove, false)
# 		window.addEventListener("mouseleave", @onRelease, false)
# 		$("body").get(0).style.cursor = "url(./img/cursor_close.png),auto"
# 		return


# 	onMove:(e)=>
# 		e.preventDefault()

# 		distX			= e.pageX - @previousX
# 		distY 			= e.pageY - @previousY
# 		@previousX 		= e.pageX
# 		@previousY 		= e.pageY
# 		@vx 			+= distX / 1000
# 		@vy 			+=  distY / 20

# 		return


# 	onRelease:(e)=>
# 		e.preventDefault()

# 		window.removeEventListener("mouseup", @onRelease, false)
# 		window.removeEventListener("mousemove", @onMove, false)
# 		window.removeEventListener("mouseleave", @onRelease, false)
# 		$("body").get(0).style.cursor = "url(./img/cursor_open.png),auto"
# 		return


# 	update : () ->

# 		@lightController.update()
# 		@particlesSpeed.update(@vy)
# 		@cameraController.update(@vx, @vy)

# 		@octopus.update()

# 		@vy *= @friction
# 		@vx *= @friction
# 		renderer.render scene, camera 
# 		return

	
# 	close : ( callback ) ->
# 		@state = "closing"
# 		$("#contact").fadeOut 400, callback
# 		return

