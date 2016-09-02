﻿/*
     * @ngdoc model
     * @name DataType
     * @function
     * 
     * @description
     * Represents the DataType object
     * 
     */

var DataType = function () {
    var self = this;

    self.guid = '';
    self.name = '';
    self.prevalues = null;
    self.propertyTypeAlias = '';
    self.view = '';
};

angular.module('notely.models').constant('DataType', DataType);


/*
     * @ngdoc model
     * @name Property
     * @function
     * 
     * @description
     * Represents the Property object
     * 
     */

var Property = function () {
    var self = this;

    self.config = {};
    self.view = '';
};

angular.module('notely.models').constant('Property', Property);


/*
 * @ngdoc model
 * @name ContentProperty
 * @function
 * Used to link comments to the right content node and property type
 * 
 * @description
 * Represents the js version of the Notely's PropertyViewModel
 * 
 */

var ContentProperty = function () {
    var self = this;

    self.contentId = -1;
    self.propertyDataId = -1;
    self.propertyTypeAlias = '';
};

angular.module('notely.models').constant('ContentProperty', ContentProperty);


/*
 * @ngdoc model
 * @name Comment
 * @function
 * 
 * @description
 * Represents the js version of the Notely's CommentViewModel
 * 
 */

var Comment = function () {
    var self = this;

    self.id = -1;
    self.title = '';
    self.description = '';
    self.type = 0;
    self.assignedTo = null;
    self.state = false;
    self.contentProperty = null;
};

angular.module('notely.models').constant('Comment', Comment);



/*
 * @ngdoc model
 * @name User
 * @function
 * 
 * @description
 * Represents the js version of the Notely's UserViewModel
 * 
 */

var User = function () {
    var self = this;

    self.id = -1;
    self.name = '';
};

angular.module('notely.models').constant('User', User);

/*
* @ngdoc service
* @name modelsBuilder
* 
* @description 
* Convert json result into angular model
* 
*/
angular.module('notely.models').factory('modelsBuilder', [

    function () {

        // Private convert function
        function convertItem(jsonResult, Constructor) {
            var model = new Constructor();
            angular.extend(model, jsonResult);
            return model;
        }

        // Convert json result to the provided model
        function convert(jsonResult, Constructor) {
            if (angular.isArray(jsonResult)) {
                // Array: So we need to convert each element and push it into a new array to send back
                var models = [];
                angular.forEach(jsonResult, function (item) {
                    models.push(convertItem(item, Constructor));
                });
                return models;
            } else {
                return convertItem(jsonResult, Constructor);
            }
        }

        // Make functions public
        return {
            convert: convert
        };

    }

]);

/*
 * @ngdoc service
 * @name DataTypeBuilder
 * 
 * @decription
 * Modelsbuilder for the DataType model
 * 
 */
angular.module('notely.models').factory('dataTypeBuilder', [

    'modelsBuilder',
    'DataType',

    function (modelsBuilder, DataType) {

        var Constructor = DataType;

        return {
            createEmpty: function () {
                return new Constructor();
            },
            convert: function (jsonResult) {
                return modelsBuilder.convert(jsonResult, Constructor);
            }
        };

    }

]);

/*
 * @ngdoc service
 * @name propertyBuilder
 * 
 * @decription
 * Modelsbuilder for the Property model
 * 
 */
angular.module('notely.models').factory('propertyBuilder', [

    'modelsBuilder',
    'Property',

    function (modelsBuilder, Property) {

        var Constructor = Property;

        return {
            createEmpty: function () {
                return new Constructor();
            },
            convert: function (jsonResult) {
                return modelsBuilder.convert(jsonResult, Constructor);
            }
        };

    }

]);

/*
 * @ngdoc service
 * @name contentPropertyBuilder
 * 
 * @decription
 * Modelsbuilder for the ContentProperty model
 * 
 */
angular.module('notely.models').factory('contentPropertyBuilder', [

    'modelsBuilder',
    'ContentProperty',

    function (modelsBuilder, ContentProperty) {

        var Constructor = ContentProperty;

        return {
            createEmpty: function () {
                return new Constructor();
            },
            convert: function (jsonResult) {
                return modelsBuilder.convert(jsonResult, Constructor);
            }
        };

    }

]);

/*
 * @ngdoc service
 * @name commentsBuilder
 * 
 * @decription
 * Modelsbuilder for the Comment model
 * 
 */
angular.module('notely.models').factory('commentsBuilder', [

    'modelsBuilder',
    'Comment',
    'contentPropertyBuilder',

    function (modelsBuilder, Comment, contentPropertyBuilder) {

        var Constructor = Comment;

        return {
            createEmpty: function () {
                var _c = new Constructor();
                _c.contentProperty = contentPropertyBuilder.createEmpty();
                return _c;
            },
            convert: function (jsonResult) {
                return modelsBuilder.convert(jsonResult, Constructor);
            }
        };

    }

]);

/*
 * @ngdoc service
 * @name usersBuilder
 * 
 * @decription
 * Modelsbuilder for the User model
 * 
 */
angular.module('notely.models').factory('usersBuilder', [

    'modelsBuilder',
    'User',

    function (modelsBuilder, User) {

        var Constructor = User;

        return {
            createEmpty: function () {
                return new Constructor();
            },
            convert: function (jsonResult) {
                return modelsBuilder.convert(jsonResult, Constructor);
            }
        };

    }

]);