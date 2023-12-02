const config = require('../../config/defaultConfig');
const ApplicationComments = require('../../models/applicationComments');
const Application = require('../../models/application');
const PostsInfo = require('../../models/posts');
const { DataModulePopulate, paginationChatData } = require("../../utils");

exports.addUser = (id, room, loadPage, callback) => {
    try {
        DataModulePopulate(
            ApplicationComments.findOne({
                room_id: 'application' + room
            })
        )
            .then((data) => {
                if (data === null) {
                    let varData = new ApplicationComments();
                    varData.application_id = room;
                    varData.room_id = 'application' + room;
                    varData.comments = [];
                    varData.save((error, varData) => {
                        if (error) {
                            callback({ error: error });
                        }
                        const page = loadPage !== null ? loadPage : null;
                        const pageData = paginationChatData(varData.comments, page);
                        callback({ data: pageData })
                    })
                } else {
                    const page = loadPage !== null ? loadPage : null;
                    const pageData = paginationChatData(data.comments, page);
                    callback({ data: pageData })
                }
            })
            .catch((err) => {
                callback({ error: err?.toString() });
            });
    } catch (e) {
        callback({ error: e?.toString() });
    }
}

exports.updateMsg = (room, user_id, msg, image, callback) => {
    try {
        DataModulePopulate(
            ApplicationComments.findOne({
                room_id: 'application' + room
            }).populate({
                path: 'application_id',
                populate: {
                    path: 'post_id'
                },
            })
        ) .then((data) => {
            DataModulePopulate(
                Application.findOne({
                    _id: room
                }).populate("post_id")
            ).then((aData) => {
                try{
                    if (data === null) {
                        if (aData === null) {
                            callback({ error: 'Data not available' });
                        }
                        let tempMsg = {
                            msg: msg,
                            image: image,
                            created_by: aData.created_by,
                            post_owner: aData.post_owner,
                            post_name: aData.post_id.title,
                            ...user_id && user_id.length > 1 && { user: user_id },
                            time: new Date()
                        }
                        let varData = new ApplicationComments();
                        varData.application_id = room;
                        varData.room_id = 'application' + room;
                        varData.comments = [{
                            ...user_id && user_id.length > 1 && { user: user_id },
                            msg: msg,
                            image: image,
                        }];
                        varData.save((error) => {
                            if (error) {
                                callback({ error: error });
                            }
                            callback({ data: tempMsg });
                        })
                        callback()
                    } else if(aData.isBlocked) {
                        callback({ error: "Chat room is blocked!" });
                    } else {
                        let varData = data.comments;
                        let tempMsg = {
                            msg: msg,
                            image: image,
                            created_by: data.application_id.created_by,
                            post_owner: data.application_id.post_owner,
                            post_name: data.application_id.post_id.title,
                            ...user_id && user_id.length > 1 && { user: user_id },
                            time: new Date()
                        }
                        varData.push({
                            ...user_id && user_id.length > 1 && { user: user_id },
                            msg: msg,
                            image: image
                        })
                        if (varData?.length > config[config.env].chatLength) {
                            varData.shift();
                        }
                        data.comments = varData;
                        data.save((error) => {
                            if (error) {
                                callback({ error: error });
                            }

                            callback({ data: tempMsg });
                        });
                    }
                }catch(e){
                    callback({ error: e?.toString() });
                }
            })
        }).catch((err) => {
            callback({ error: err?.toString() });
        });
    } catch (e) {
        callback({ error: e?.toString() });
    }
}
