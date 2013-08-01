# --------------------------------------------- GLOBAL VARIABLE

mouseX = 0
mouseY = 0
sw = $(window).width()
sh = $(window).width()

tanFOV = undefined

currentSection = undefined
currentSectionType = undefined
stats = undefined

camera = undefined
scene = undefined
renderer = undefined
composer = undefined

lines 			= undefined
menuController  = undefined

# --------------------------------------------- ENTRY POINT

class Main 

	constructor:()->
	# Intro animation
		TweenLite.to( $(".inside"), .8, {delay:1.4, opacity: .8, width: "120px", ease:Quad.easeOut})
		$("nav li a").each (index) ->
			TweenLite.to( $(this), .7, {delay:1.9 + index * .25, opacity: 1, paddingLeft: "35px", ease:Quad.easeOut})
		TweenLite.to( $("#currentSection"), .5, {delay:2.5, opacity: .7, left: 13, ease:Quad.easeOut})

		menuController = new MenuController()
		
		@menuAnimation()
		@preload()

		$(window).resize ->
			renderer.setSize $(window).width(), $(window).height()

	# do it in css3
	menuAnimation : () ->
		
		$(".inside").mouseenter (e) ->
			$(".inside").animate
				borderTopRightRadius: 20
			, 300

		$(".inside").mouseleave (e) ->
			$(".inside").animate
				borderTopRightRadius: 0
			, 300

		$("nav li a").mouseenter (e) ->
			$(this).animate
				paddingLeft: "40px"
			, 300

		$("nav li a").mouseleave (e) ->
			$(this).animate
				paddingLeft: "35px"
			, 300

		$("#currentSection").css
			opacity: 0
			left: 0
			
		return



	preload : =>
		objImage = new Image()
		objImage.onLoad = @imagesLoaded()
		objImage.src = "img/particle.png"
		return


	imagesLoaded : =>
		container = document.createElement("div")
		document.body.appendChild container

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000)
		camera.position.z = 100
		scene = new THREE.Scene()
		scene.fog = new THREE.Fog(0xFFFFFF, 0.0005)
		scene.add camera

		if Detector.webgl
			renderer = new THREE.WebGLRenderer(
				antialias 		: true		# antialiasing
				precision 		: "highp" 	# highp mediump lowp
				maxLights 		: 4 		# number of light max ( 1 ambient, 1 camera , 2 others )
				stencil 		: true		# 
				preserveDrawingBuffer 	: true
			)
		else if Modernizr.canvas
			renderer = new THREE.CanvasRenderer()

		renderer.setSize window.innerWidth,window.innerHeight
		container.appendChild renderer.domElement
		
		lines = new Lines(camera, scene, renderer)
		
		currentSection = new Contact(camera, scene, renderer)
		# currentSection = new TestSection(camera, scene, renderer)
		currentSectionType = "contact"
		
		# addStat()
		@addListener()
		@mainLoop()
		return


	addStat : =>
		stats = new Stats()
		stats.domElement.style.position = "absolute"
		stats.domElement.style.top = "0px"
		# document.body.appendChild stats.domElement
		return


	addListener : =>
		if Modernizr.touch
			document.addEventListener "touchstart", @onDocumentTouchStart, false
			document.addEventListener "touchmove", @onDocumentTouchMove, false
		else
			document.addEventListener "mousemove", @onDocumentMouseMove, false
		return


	onDocumentMouseMove : (event) =>
		mouseX = event.clientX - sw/2
		mouseY = event.clientY - sh/2
		return


	onDocumentTouchStart : (event) =>
		if event.touches.length > 1
			event.preventDefault()
			mouseX = event.touches[0].pageX - sw/2
			mouseY = event.touches[0].pageY - sh/2
		return


	onDocumentTouchMove : (event) =>
		if event.touches.length is 1
			event.preventDefault()
			mouseX = event.touches[0].pageX - sw/2
			mouseY = event.touches[0].pageY - sh/2
		return


	mainLoop : ()=>
		requestAnimationFrame @mainLoop
		if stats
			stats.update()
		lines.update()
		if currentSection
			currentSection.update()
		return

main = null
$(document).ready ->
	main = new Main()
	return
