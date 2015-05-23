/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../models/tsd.d.ts" />


module linkster.server {
    interface IRootFolder extends IFolder {
        owner: string;
    }
    
    function getEmptyRootFolder(userId: string): IRootFolder {
        return {
            content: [],
            owner: userId,
            name: '_root'
        };
    }
    
    Meteor.publish('rootFolder', function() {
        var me = <Subscription>this;
        var rootFolder = Folders.findOne({owner: me.userId, name: '_root'});
        
        if (!rootFolder) {
            var id = Folders.insert(getEmptyRootFolder(me.userId));
            rootFolder = Folders.findOne({_id: id});
        }
        return rootFolder;
    });
}