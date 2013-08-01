class ASection

	camera 		: null
	scene 		: null
	render 		: null

	constructor :(@camera, @scene, @render)->
		this.state = "none"
		return
	
	close : (callback) ->
		alert "close"
		apply callback
		return

	open : ()->
		alert "open"
		return

	update : ()->
		alert "update"
		return

	dispose : ()->
		@scene = null
		@camera = null
		@render = null
		return