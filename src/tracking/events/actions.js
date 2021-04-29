/**
 * Enum for types of action related to an interaction
 */
const Action = Object.freeze({
    NONE:       "none",
    SUBMIT:     "submit",
    CANCEL:     "cancel",  // "cancel"
    // PAUSE:      "pause", // cannot really log
    // WAIT:       "wait",  // cannot really log (remove)
    NAVIGATION: "navigation",
    BACK:       "back",  // gestures + browser back + app back
});

export default Action;