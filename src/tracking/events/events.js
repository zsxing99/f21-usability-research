import { step } from './eventTypes';
import Interaction from './interactions';
import Action from './actions';

/**
 * NAVIGATION EVENTS
 */
export const navigateTo = (pageName) => {
    return step(
        pageName,
        Interaction.CLICK,
        Action.NAVIGATION,
        `User elected to navigate to ${pageName} page.`
    )
};

export const navigateBack = () => {
    return step(
        null,
        Interaction.CLICK,
        Action.BACK,
        `User elected to navigate back to the previous page.`
    )
}

/**
 * HELP BUTTON
 */
 export const helpButtonClick = () => {
    return step(
        null,
        Interaction.CLICK,
        Action.HELP,
        "User clicked on help button."
    )
}

/**
 * TASK DESCRIPTION BUTTON
 */
export const taskDescriptionButtonClick = () => {
    return step(
        null,
        Interaction.CLICK,
        Action.TASK_DESCRIPTION,
        "User clicked on task description button."
    )
}

/**
 * AVAILABILITY PAGE EVENTS
 */
export const availabilitySubmit = () => {
    return step(
        "AVAILABILITY",
        Interaction.CLICK,
        Action.SUBMIT,
        "User elected to submit their availiability changes."
    )
};

export const availabilityChange = () => {
    return step(
        "AVAILABILITY",
        Interaction.CLICK,
        Action.NONE,
        "User elected to change their availiability."
    )
}

export const availabilityDetailChange = () => {
    return step(
        "AVAILABILITY",
        Interaction.CLICK,
        Action.NONE,
        "User elected to change their availability details."
    )
}

export const availabilityDetailSubmit = () => {
    return step(
        "AVAILABILITY",
        Interaction.CLICK,
        Action.SUBMIT,
        "User elected to submit their availability details changes."
    )
}

export const availabilityDetailCancel = () => {
    return step(
        "AVAILABILITY",
        Interaction.CLICK,
        Action.CANCEL,
        "User elected to undo their availability details changes."
    )
}

/**
 * HEALTH STATUS PAGE EVENTS
 */
export const statusSubmit = (isFeverChecked) => {
    return step(
        "HEALTH_STATUS",
        Interaction.CLICK,
        Action.SUBMIT,
        `User elected to submit their health status changes, fever selected is ${isFeverChecked}.`
    )
};

export const statusChange = () => {
    return step(
        "HEALTH_STATUS",
        Interaction.CLICK,
        Action.NONE,
        "User elected to change their health status."
    )
};

/**
 * REQUESTS PAGE EVENTS
 */
export const markRequestAsDone = () => {
    return step(
        "ON_DEMAND_REQUEST",
        Interaction.CLICK,
        Action.SUBMIT,
        "User electected to mark the on-demand request as done."
    )
};

export const requestItemClick = () => {
    return step(
        "ON_DEMAND_REQUEST",
        Interaction.CLICK,
        Action.NONE,
        "User clicked an item."
    )
};

export const calendarClick = () => {
    return step(
        "ON_DEMAND_REQUEST",
        Interaction.CLICK,
        Action.NONE,
        "User clicked on request calendar."
    )
};

/**
 * EDIT REQUEST ITEMS PAGE EVENTS
 */
export const newRequestItemDetailChange = () => {
    return step(
        "EDIT_REQUEST_ITEMS",
        Interaction.WRITE,
        Action.NONE,
        "User elected to change a new request item detail."
    )
}

export const newRequestItemDetailSubmit = () => {
    return step(
        "EDIT_REQUEST_ITEMS",
        Interaction.CLICK,
        Action.SUBMIT,
        "User elected to submit a new request item detail."
    )
}

/**
 * EDIT REQUEST ITEM DETAILS PAGE EVENTS
 */
export const requestItemDetailChange = () => {
    return step(
        "EDIT_REQUEST_ITEM_DETAILS",
        Interaction.WRITE,
        Action.NONE,
        "User elected to change the request item details."
    )
};

export const requestItemDetailSubmit = () => {
    return step(
        "EDIT_REQUEST_ITEM_DETAILS",
        Interaction.CLICK,
        Action.SUBMIT,
        "User elected to submit the request item details changes."
    )
};

export const requestItemDetailCancel = () => {
    return step(
        "EDIT_REQUEST_ITEM_DETAILS",
        Interaction.CLICK,
        Action.CANCEL,
        "User elected to undo the request item details changes."
    )
};

export const requestItemDelete = () => {
    return step(
        "EDIT_REQUEST_ITEM_DETAILS",
        Interaction.CLICK,
        Action.SUBMIT,
        "User elected to delete the request item."
    )
};