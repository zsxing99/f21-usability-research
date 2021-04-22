import { step } from './eventTypes';
import Interaction from './interactions';

/**
 * NAVIGATION EVENTS
 */
export const navigateTo = (pageName) => {
    return step(
        pageName,
        Interaction.NAVIGATION,
        `User elected to navigate to ${pageName} page`
    )
};

/**
 * AVAILABILITY PAGE EVENTS
 */
export const availabilitySubmit = () => {
    return step(
        "AVAILABILITY",
        Interaction.CLICK,
        "User elected to submit their availiability changes."
    )
};

export const availabilityChange = () => {
    return step(
        "AVAILABILITY",
        Interaction.CLICK,
        "User elected to change their availiability."
    )
}

export const availabilityDetailChange = () => {
    return step(
        "AVAILABILITY",
        Interaction.CLICK,
        "User elected to change their availability details."
    )
}

export const availabilityDetailSubmit = () => {
    return step(
        "AVAILABILITY",
        Interaction.CLICK,
        "User elected to submit their availability details changes."
    )
}

export const availabilityDetailCancel = () => {
    return step(
        "AVAILABILITY",
        Interaction.UNDO,
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
        "User elected to submit their health status changes."
    )
};

export const statusChange = () => {
    return step(
        "HEALTH_STATUS",
        Interaction.CLICK,
        "User elected to change their health status."
    )
}