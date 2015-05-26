/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../models/tsd.d.ts" />


module linkster.server {
    Meteor.startup(() => {
        Folders._ensureIndex('folder_collaborators', { collaborators: 1 });
    });
    
    Meteor.publish('folders', function() {
        var me = <Subscription>this;
        return Folders.find({collaborators: me.userId});
    });
    
    var test: SimpleSchema.CleaningOptions = {extendAutoValueContext: {}};
}