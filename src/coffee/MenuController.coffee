class MenuController

	constructor:()->

		$("#contactBtn").click (e)->
			e.preventDefault()

			if currentSectionType is "contact"
				return false  

			TweenLite.to( $("#currentSection"), .7, {top: 16, ease:Quad.easeOut})
			
			currentSection.close ->
				currentSection.dispose()
				currentSection = null
				currentSection = new Contact(camera, scene, renderer)
				currentSectionType = "contact"
			
			return false

		$("#skillBtn").click (e)->
			e.preventDefault()
		
			if currentSectionType is "skill"
				return false

			TweenLite.to( $("#currentSection"), .7, {top: 64, ease:Quad.easeOut})
		
			currentSection.close ->
				currentSection.dispose()
				currentSection = null
				currentSection = new Skill(camera, scene, renderer)
				currentSectionType = "skill"
		
			return false

		$("#workBtn").click (e)->
			e.preventDefault()

			if currentSectionType is "work"
				return false  

			TweenLite.to( $("#currentSection"), .7, {top: 110, ease:Quad.easeOut})
		
			currentSection.close ->
				currentSection.dispose()
				currentSection = null
				currentSection = new Work(camera, scene, renderer)
				currentSectionType = "work"
		
			return false