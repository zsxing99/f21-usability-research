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
        Interaction.BACK,
        `User elected to navigate back to the previous page.`
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
export const statusSubmit = () => {
    return step(
        "HEALTH_STATUS",
        Interaction.CLICK,
        Action.SUBMIT,
        "User elected to submit their health status changes."
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