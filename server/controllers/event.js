const Event = require("../models/event");
const messages =  require("../utility/Messages");
const Response = require('../utility/Response');



exports.postEvent = function (req, res) { 
    if(!req.body.event_name  || !req.body.description || !req.body.discount  || !req.body.venue  || !req.body.price ){
        return res.json(Response.faliureRes(messages.missing));
    }
    let event = new Event({ 
        event_name: req.body.event_name,
        description: req.body.description,
        discount : req.body.discount,
        venue : req.body.venue,
        price:req.body.price,
        updated_at : new Date()

    });
    event.save(function (err, response) { 
        if (err) {
            return res.json(Response.faliureRes(messages.error));
        }
        else{
            return res.json(Response.successRes(messages.save,response));
        }
    });
};


exports.getEvents = function (req, res) { 
   
    Event.find({},function(err,data){
        if(err){
            return res.json(Response.faliureRes(messages.error));
        }
        else if ((data || []).length === 0){
            return res.json(Response.successRes(messages.noData,data));
        }
        else{
           return res.json(Response.successRes(messages.success,data));

        }
    });
};

exports.filterDiscount = function(req,res){
  
    Event.find({discount : req.body.discount},function(err,data){
        if(err){
            return res.json(Response.faliureRes(messages.error));
        }
        else if ((data || []).length === 0){
            return res.json(Response.successRes(messages.noData,data));
        }
        else{
           return res.json(Response.successRes(messages.success,data));

        }
    });
}

