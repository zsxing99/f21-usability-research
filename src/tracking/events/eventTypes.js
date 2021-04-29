import moment from "moment";

/**
 * get page view event object
 * @param {Number} friendId 
 */
export const pageView = pageName => ({
    type: "PAGE_VIEW",
    data: {
        pageName: pageName,
        timestamp: moment().format()
    }
});

export const step = (pageName, interactionType, actionType, action) => ({
    type: "STEP",
    data: {
        pageName,
        interactionType,
        actionType,
        action,
        timestamp: moment().format()
    }
})