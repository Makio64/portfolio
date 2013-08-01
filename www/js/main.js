// Generated by CoffeeScript 1.6.3
(function() {
  var ASection, Contact, Labs, Lines, Main, MenuController, Scrollbar, Skill, Work, camera, composer, currentSection, currentSectionType, lines, main, menuController, mouseX, mouseY, renderer, scene, sh, stats, sw, tanFOV,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Lines = (function() {
    Lines.prototype.distance = 600;

    Lines.prototype.amount = 60;

    Lines.prototype.mouse_streng = .7;

    Lines.prototype.line_alpha = .6;

    Lines.prototype.geometry = new THREE.Geometry();

    Lines.prototype.particles = null;

    Lines.prototype.line = null;

    Lines.prototype.MOUSE_MOVEMENT = .7;

    Lines.prototype.count = 0;

    function Lines(camera, scene) {
      var i, material, materialLine, vectorf, _i, _ref;
      this.camera = camera;
      this.scene = scene;
      material = new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 16,
        opacity: 0,
        map: THREE.ImageUtils.loadTexture("./img/particle.png"),
        transparent: true
      });
      for (i = _i = 0, _ref = this.amount; _i <= _ref; i = _i += 1) {
        vectorf = new THREE.Vector3((Math.random() * 2 - 1) * this.distance, (Math.random() * 2 - 1) * this.distance, (Math.random() * 2 - 1) * this.distance);
        this.geometry.vertices.push(vectorf);
      }
      TweenLite.to(material, 2.6, {
        opacity: 1,
        ease: Quad.EaseIn
      });
      this.particles = new THREE.ParticleSystem(this.geometry, material);
      materialLine = new THREE.LineBasicMaterial({
        color: 0xFFFFFF,
        opacity: .6,
        transparent: true
      });
      this.line = new THREE.Line(this.geometry.clone(), materialLine);
      this.scene.add(this.particles);
      this.scene.add(this.line);
    }

    Lines.prototype.update = function() {
      camera.position.x += (mouseX * this.MOUSE_MOVEMENT - camera.position.x) * .05;
      camera.position.y += (-mouseY * this.MOUSE_MOVEMENT - camera.position.y) * .05;
      this.particles.rotation.x += Math.PI / 1800;
      this.line.rotation.x += Math.PI / 1800;
      return camera.lookAt(scene.position);
    };

    return Lines;

  })();

  mouseX = 0;

  mouseY = 0;

  sw = $(window).width();

  sh = $(window).width();

  tanFOV = void 0;

  currentSection = void 0;

  currentSectionType = void 0;

  stats = void 0;

  camera = void 0;

  scene = void 0;

  renderer = void 0;

  composer = void 0;

  lines = void 0;

  menuController = void 0;

  Main = (function() {
    function Main() {
      this.mainLoop = __bind(this.mainLoop, this);
      this.onDocumentTouchMove = __bind(this.onDocumentTouchMove, this);
      this.onDocumentTouchStart = __bind(this.onDocumentTouchStart, this);
      this.onDocumentMouseMove = __bind(this.onDocumentMouseMove, this);
      this.addListener = __bind(this.addListener, this);
      this.addStat = __bind(this.addStat, this);
      this.imagesLoaded = __bind(this.imagesLoaded, this);
      this.preload = __bind(this.preload, this);
      TweenLite.to($(".inside"), .8, {
        delay: 1.4,
        opacity: .8,
        width: "120px",
        ease: Quad.easeOut
      });
      $("nav li a").each(function(index) {
        return TweenLite.to($(this), .7, {
          delay: 1.9 + index * .25,
          opacity: 1,
          paddingLeft: "35px",
          ease: Quad.easeOut
        });
      });
      TweenLite.to($("#currentSection"), .5, {
        delay: 2.5,
        opacity: .7,
        left: 13,
        ease: Quad.easeOut
      });
      menuController = new MenuController();
      this.menuAnimation();
      this.preload();
      $(window).resize(function() {
        return renderer.setSize($(window).width(), $(window).height());
      });
    }

    Main.prototype.menuAnimation = function() {
      $(".inside").mouseenter(function(e) {
        return $(".inside").animate({
          borderTopRightRadius: 20
        }, 300);
      });
      $(".inside").mouseleave(function(e) {
        return $(".inside").animate({
          borderTopRightRadius: 0
        }, 300);
      });
      $("nav li a").mouseenter(function(e) {
        return $(this).animate({
          paddingLeft: "40px"
        }, 300);
      });
      $("nav li a").mouseleave(function(e) {
        return $(this).animate({
          paddingLeft: "35px"
        }, 300);
      });
      $("#currentSection").css({
        opacity: 0,
        left: 0
      });
    };

    Main.prototype.preload = function() {
      var objImage;
      objImage = new Image();
      objImage.onLoad = this.imagesLoaded();
      objImage.src = "img/particle.png";
    };

    Main.prototype.imagesLoaded = function() {
      var container;
      container = document.createElement("div");
      document.body.appendChild(container);
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
      camera.position.z = 100;
      scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xFFFFFF, 0.0005);
      scene.add(camera);
      if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          precision: "highp",
          maxLights: 4,
          stencil: true,
          preserveDrawingBuffer: true
        });
      } else if (Modernizr.canvas) {
        renderer = new THREE.CanvasRenderer();
      }
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);
      lines = new Lines(camera, scene, renderer);
      currentSection = new Contact(camera, scene, renderer);
      currentSectionType = "contact";
      this.addListener();
      this.mainLoop();
    };

    Main.prototype.addStat = function() {
      stats = new Stats();
      stats.domElement.style.position = "absolute";
      stats.domElement.style.top = "0px";
    };

    Main.prototype.addListener = function() {
      if (Modernizr.touch) {
        document.addEventListener("touchstart", this.onDocumentTouchStart, false);
        document.addEventListener("touchmove", this.onDocumentTouchMove, false);
      } else {
        document.addEventListener("mousemove", this.onDocumentMouseMove, false);
      }
    };

    Main.prototype.onDocumentMouseMove = function(event) {
      mouseX = event.clientX - sw / 2;
      mouseY = event.clientY - sh / 2;
    };

    Main.prototype.onDocumentTouchStart = function(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - sw / 2;
        mouseY = event.touches[0].pageY - sh / 2;
      }
    };

    Main.prototype.onDocumentTouchMove = function(event) {
      if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - sw / 2;
        mouseY = event.touches[0].pageY - sh / 2;
      }
    };

    Main.prototype.mainLoop = function() {
      requestAnimationFrame(this.mainLoop);
      if (stats) {
        stats.update();
      }
      lines.update();
      if (currentSection) {
        currentSection.update();
      }
    };

    return Main;

  })();

  main = null;

  $(document).ready(function() {
    main = new Main();
  });

  MenuController = (function() {
    function MenuController() {
      $("#contactBtn").click(function(e) {
        e.preventDefault();
        if (currentSectionType === "contact") {
          return false;
        }
        TweenLite.to($("#currentSection"), .7, {
          top: 16,
          ease: Quad.easeOut
        });
        currentSection.close(function() {
          currentSection.dispose();
          currentSection = null;
          currentSection = new Contact(camera, scene, renderer);
          return currentSectionType = "contact";
        });
        return false;
      });
      $("#skillBtn").click(function(e) {
        e.preventDefault();
        if (currentSectionType === "skill") {
          return false;
        }
        TweenLite.to($("#currentSection"), .7, {
          top: 64,
          ease: Quad.easeOut
        });
        currentSection.close(function() {
          currentSection.dispose();
          currentSection = null;
          currentSection = new Skill(camera, scene, renderer);
          return currentSectionType = "skill";
        });
        return false;
      });
      $("#workBtn").click(function(e) {
        e.preventDefault();
        if (currentSectionType === "work") {
          return false;
        }
        TweenLite.to($("#currentSection"), .7, {
          top: 110,
          ease: Quad.easeOut
        });
        currentSection.close(function() {
          currentSection.dispose();
          currentSection = null;
          currentSection = new Work(camera, scene, renderer);
          return currentSectionType = "work";
        });
        return false;
      });
    }

    return MenuController;

  })();

  ASection = (function() {
    ASection.prototype.camera = null;

    ASection.prototype.scene = null;

    ASection.prototype.render = null;

    function ASection(camera, scene, render) {
      this.camera = camera;
      this.scene = scene;
      this.render = render;
      this.state = "none";
      return;
    }

    ASection.prototype.close = function(callback) {
      alert("close");
      apply(callback);
    };

    ASection.prototype.open = function() {
      alert("open");
    };

    ASection.prototype.update = function() {
      alert("update");
    };

    ASection.prototype.dispose = function() {
      this.scene = null;
      this.camera = null;
      this.render = null;
    };

    return ASection;

  })();

  Contact = (function(_super) {
    __extends(Contact, _super);

    function Contact(camera, scene, render) {
      Contact.__super__.constructor.call(this, camera, scene, render);
      $("#contact h1").css({
        "paddingTop": "70px",
        "opacity": "0"
      });
      $("#contact sub").css({
        "paddingTop": "10px",
        "opacity": "0"
      });
      $("#contact div").hide();
      $("#contact").show();
      TweenLite.to($("#contact h1"), 1.1, {
        delay: .8,
        paddingTop: "0px",
        opacity: 1,
        ease: Quad.easeOut
      });
      TweenLite.to($("#contact sub"), 0.65, {
        delay: 1.1,
        paddingTop: "0px",
        opacity: 1
      });
      $("#contact div").delay(1400).fadeIn(600, this.onOpenTweenComplete);
      return;
    }

    Contact.prototype.onOpenTweenComplete = function() {
      currentSection.state = "open";
    };

    Contact.prototype.update = function() {
      renderer.render(scene, camera);
    };

    Contact.prototype.close = function(callback) {
      this.state = "closing";
      $("#contact").fadeOut(400, callback);
    };

    return Contact;

  })(ASection);

  Labs = (function() {
    function Labs() {
      return;
    }

    return Labs;

  })();

  Skill = (function(_super) {
    __extends(Skill, _super);

    function Skill(camera, scene, render) {
      var i, index, skills, _i, _ref;
      $("#skill p").css({
        "opacity": "0",
        "paddingTop": "40px"
      });
      $("#skill li").css({
        "opacity": "0"
      });
      $("#skill").show();
      TweenLite.to($("#skill p"), 1.5, {
        delay: .8,
        paddingTop: "0px",
        opacity: 1,
        ease: Quad.easeOut
      });
      index = 0;
      skills = $("#skill li");
      for (i = _i = 0, _ref = skills.length; _i <= _ref; i = _i += 1) {
        this.bouboup(skills[i], i);
      }
      return;
    }

    Skill.prototype.bouboup = function(skill, index) {
      TweenLite.to($(skill), 1.1, {
        delay: .7 + index * .15,
        opacity: .8
      });
    };

    Skill.prototype.update = function() {
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    Skill.prototype.close = function(callback) {
      $("#skill").fadeOut(400, callback);
    };

    return Skill;

  })(ASection);

  Work = (function(_super) {
    __extends(Work, _super);

    function Work(camera, scene, render) {
      Work.__super__.constructor.call(this, camera, scene, render);
      $("#work h1").css({
        "paddingTop": "70px",
        "opacity": 0
      });
      $("#work sub").css({
        "paddingTop": "10px",
        "opacity": 0
      });
      $("#work div").hide();
      $("#work").show();
      TweenLite.to($("#work h1"), 1.1, {
        delay: .8,
        paddingTop: "0px",
        opacity: 1,
        ease: Quad.easeOut
      });
      TweenLite.to($("#work sub"), 0.65, {
        delay: 1.1,
        paddingTop: "0px",
        opacity: 1
      });
      return;
    }

    Work.prototype.onOpenTweenComplete = function() {
      currentSection.state = "open";
    };

    Work.prototype.update = function() {
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    Work.prototype.close = function(callback) {
      $("#work").fadeOut(250, callback);
    };

    return Work;

  })(ASection);

  Scrollbar = (function() {
    Scrollbar.prototype.width = 145;

    Scrollbar.prototype.height = 100;

    Scrollbar.prototype.totalHeight = 700;

    Scrollbar.prototype.domElement = null;

    Scrollbar.prototype.style = null;

    function Scrollbar(container) {
      this.domElement = document.createElement('div');
      this.domElement.className = 'preview';
      this.style = this.domElement.style;
      return;
    }

    Scrollbar.prototype.update = function(percent) {
      var top, transform;
      top = percent * totalHeight;
      transform = "translate3d(" + top + "px,0,0)";
      this.style.transform = transform;
      this.style.WebkitTransform = transform;
      this.style.MozTransform = transform;
      this.style.oTransform = transform;
    };

    return Scrollbar;

  })();

}).call(this);