import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { Restivus } from "meteor/nimble:restivus";
import { Persons } from "../imports/api/persons";

if (Meteor.isServer) {
  // const Items = new Mongo.Collection('items');
  // const Articles = new Mongo.Collection('articles');
  Meteor.startup(() => {
    // code to run on server at startup
  });

  // Meteor.publish(
  //   "persons/add",
  //   function(index) {
  //     console.log("test", index);
  //     return Persons.find({});
  //   },
  //   {
  //     url: "persons",
  //     httpMethod: "get"
  //   }
  // );

  // Meteor.publish(
  //   "persons",
  //   function(index) {
  //     console.log("test", index);
  //     return Persons.find({});
  //   },
  //   {
  //     url: "persons",
  //     httpMethod: "get"
  //   }
  // );

  // Meteor.publish("persons/add", function (index) {
  //   console.log('test')
  //   return Persons.find({});
  // }, {
  //   url: "persons",
  //   httpMethod: "get"
  // });
  // // Global API configuration
  var Api = new Restivus({
    useDefaultAuth: false,
    prettyJson: true
  });

  // // // Generates: GET, POST on /api/items and GET, PUT, PATCH, DELETE on
  // // // /api/items/:id for the Items collection
  Api.addCollection(Persons);
  // Api.addCollection(Meteor.users);

  Api.addRoute("/persons", {
    routeOptions: {
      authRequired: false
    },
    endpoints: {
      get: function() {
        console.log("test bodyparams", this.bodyParams);
        // var temp = Persons.insert(this.bodyParams);
        if (temp) {
          return temp;
        }
        return {
          statusCode: 400,
          body: {
            status: "failure",
            message: "unable to create person"
          }
        };
      },
      post: {
        action: function() {
          console.log(this);
        }
      }
    }
  });

  Api.addRoute(
    "/persons/:id",
    { authRequired: false },
    {
      get: function() {
        return "test get for /api/persons/:id";
        // return Persons.find(this.urlParams.id)
      },
      put: function() {
        console.log("test put rest for /api/persons/:id");
      },
      delete: function() {
        console.log("test delete rest for /api/persons/:id");
      }
    }
  );

  // Api.addRoute('/persons', {authRequired: false}, {
  //   get: function () {
  //     return Persons.find({})
  //   }
  // })
  // Api.addRoute('/persons/add',
  //   {
  //     authRequired: false
  //   },
  //   {
  //     endpoints : {post: function(){
  //       var temp = Persons.insert(this.bodyParams)
  //       if(temp){
  //         return temp
  //       }
  //       return {
  //         statusCode: 400,
  //         body: {
  //           status: "failure",
  //           message: "unable to create person"
  //         }
  //       }
  //     }
  //   }
  //   }

  // )

  // // Generates: POST on /api/users and GET, DELETE /api/users/:id for
  // // Meteor.users collection
  // Api.addCollection(Meteor.users, {
  //   excludedEndpoints: ['getAll', 'put'],
  //   routeOptions: {
  //     authRequired: true
  //   },
  //   endpoints: {
  //     post: {
  //       authRequired: false
  //     },
  //     delete: {
  //       roleRequired: 'admin'
  //     }
  //   }
  // });

  // // Maps to: /api/articles/:id
  // Api.addRoute('articles/:id', {authRequired: true}, {
  //   get: function () {
  //     return Articles.findOne(this.urlParams.id);
  //   },
  //   delete: {
  //     roleRequired: ['author', 'admin'],
  //     action: function () {
  //       if (Articles.remove(this.urlParams.id)) {
  //         return {status: 'success', data: {message: 'Article removed'}};
  //       }
  //       return {
  //         statusCode: 404,
  //         body: {status: 'fail', message: 'Article not found'}
  //       };
  //     }
  //   }
  // });
}
