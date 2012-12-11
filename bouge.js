Positions = new Meteor.Collection("positions");

if (Meteor.is_client) {
  Template.movable.preserve(["img"]);

  Template.hello.movables = function () {
    return Positions.find();
  };

  Template.hello.rules = function () {
    return Positions.find();
  };


  Template.hello.events = {
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  };
  
  Meteor.startup(function () {
        Template.hello.rendered = function() {
            console.log($("img").length);
            $("img").draggable( {
                stop: function(ev,ui){
                    // How could we insert 2 fields in 1 update?
                    Positions.update($(this).attr("id"), {$set: {top: ui.position.top }});
                    Positions.update($(this).attr("id"), {$set: {left: ui.position.left }});
                    console.log($(this).attr("id"));
                    console.log("position:" + ui.position.left + "," + ui.position.top);
                }
            } );
        };
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Positions.find().count() === 0) {
      var positions = [{
                        "name": '0.svg',
                        "top": 0,
                        "left": 0},
                    {
                        "name": '1.svg',
                        "top": 0,
                        "left": 100},
                    {
                        "name": '2.svg',
                        "top": 0,
                        "left": 200},
                    {
                        "name": '3.svg',
                        "top": 150,
                        "left": 0},
                    {
                        "name": '4.svg',
                        "top": 150,
                        "left": 300},
                    {
                        "name": '5.svg',
                        "top": 150,
                        "left": 450},
                    {
                        "name": '6.svg',
                        "top": 300,
                        "left": 0},
                    ];
      for (var i = 0; i < positions.length; i++)
        Positions.insert(positions[i]);
    }
  });
}
