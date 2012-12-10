Positions = new Meteor.Collection("positions");

if (Meteor.is_client) {
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
      $("img").drags();
/*    setTimeout( function() {
        console.log($("img").length);
            $("img").draggable( {
                stop: function(ev,ui){
                    console.log(Positions.fin);
                    console.log("position:" + ui.position.left + "," + ui.position.top); 
                } }
            ); 
        }, 1000 ); */
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Positions.find().count() === 0) {
      var positions = [{
                        "name": '0.svg',
                        "top": 790,
                        "left": 750},
                    {
                        "name": '1.svg',
                        "top": 390,
                        "left": -172},
                    {
                        "name": '2.svg',
                        "top": 180,
                        "left": 850},
                    {
                        "name": '3.svg',
                        "top": 150,
                        "left": 970},
                    {
                        "name": '4.svg',
                        "top": 30,
                        "left": 150},
                    {
                        "name": '5.svg',
                        "top": 100,
                        "left": 500},
                    {
                        "name": '6.svg',
                        "top": 706,
                        "left": 226.5},
                    ];
      for (var i = 0; i < positions.length; i++)
        Positions.insert(positions[i]);
    }
  });
}