/**
 * Enum for types of action related to an interaction
 */
const Action = Object.freeze({
    NONE:       "none",
    SUBMIT:     "submit",
    CANCEL:     "cancel",
    NAVIGATION: "navigation",
    BACK:       "back",  // gestures + browser back + app back
});

export default Action;