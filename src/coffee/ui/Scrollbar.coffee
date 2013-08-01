class Scrollbar
	
	width 				: 145
	height 				: 100
	totalHeight 		: 700

	domElement 			: null
	style 				: null

	constructor:(container)->
		
		@domElement 			= document.createElement('div')
		@domElement.className 	= 'preview'
		@style					= @domElement.style

		return


	update:(percent)->
		
		top 					= percent * totalHeight
		
		transform 				= "translate3d(#{top}px,0,0)"
		
		@style.transform 		= transform
		@style.WebkitTransform 	= transform
		@style.MozTransform 	= transform
		@style.oTransform 		= transform

		return