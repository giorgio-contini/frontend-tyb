/**
 * Enum
 *  @description Enum object, set of button classes
 */
export var ButtonTypeEnum;
(function (ButtonTypeEnum) {
    ButtonTypeEnum["DANGER"] = "btn btn-danger";
    ButtonTypeEnum["DANGER_OUTLINE"] = "btn btn-outline-danger";
    ButtonTypeEnum["PRIMARY"] = "btn btn-primary";
    ButtonTypeEnum["PRIMARY_OUTLINE"] = "btn btn-outline-primary";
    ButtonTypeEnum["WARNING"] = "btn btn-warning";
    ButtonTypeEnum["WARNING_OUTLINE"] = "btn btn-outline-warning";
    ButtonTypeEnum["SECONDARY"] = "btn btn-secondary";
})(ButtonTypeEnum || (ButtonTypeEnum = {}));
/**
 *  ENUM_CARD_STATUS
 *  @description Enum object, set of cards status
 */
export var CardStatusEnum;
(function (CardStatusEnum) {
    CardStatusEnum["HIDDEN"] = "Hidden";
    CardStatusEnum["LOCKED"] = "Locked";
    CardStatusEnum["ACTIVE"] = "Active";
    CardStatusEnum["ERROR"] = "Error";
    CardStatusEnum["COMPLETED"] = "Completed";
    CardStatusEnum["WARNING"] = "Warning";
})(CardStatusEnum || (CardStatusEnum = {}));
/**
 *  BadgeIconEnum
 *  @description Enum object, set of icons to show in the card
 */
export var BadgeIconEnum;
(function (BadgeIconEnum) {
    BadgeIconEnum["Active"] = "bi bi-unlock";
    BadgeIconEnum["Locked"] = "bi bi-lock";
    BadgeIconEnum["Error"] = "bi bi-exclamation-octagon";
    BadgeIconEnum["Completed"] = "bi bi-check-circle ";
    BadgeIconEnum["Warning"] = "bi bi-clock";
})(BadgeIconEnum || (BadgeIconEnum = {}));
