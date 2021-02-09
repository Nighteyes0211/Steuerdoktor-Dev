import { Condition } from "../common/Condition";

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
export class Conditions {
    private static instance: Conditions;

    // Religion changed last year?
    public RELIGION_CHANGE: Condition = null;

    // Disabled me?
    public HANDICAP : Condition = null;

    // Disabled partner?
    public HANDICAP_PARTNER : Condition = null;

    // Degree of handicap me
    public HANDICAP_DEGREE : Condition = null;

    // Degree of handicap partner
    public HANDICAP_DEGREE_PARTNER : Condition = null;

    // Handicap pass unlimited available?
    public HANDICAP_PASS_UNLIMITED : Condition = null;

    // Handicap pass unlimited available?
    public HANDICAP_PASS_UNLIMITED_PARTNER : Condition = null;

    // Married?
    public FAMILY_STATUS_MARRIED: Condition = null;

    // Partnered?
    public FAMILY_STATUS_PARTNERED: Condition = null;

    // Widowed?
    public FAMILY_STATUS_WIDOWED: Condition = null;

    // Widowed and separated before?
    public WIDOWED_SEPARATED: Condition = null;

    // Joint Taxation
    public JOINT_TAXATION: Condition = null;

    // Joint property? (Gütergemeinschaft)
    public JOINT_PROPERTY: Condition = null;

    // Divorced?
    public DIVORCE: Condition = null;

    // 
    public CIVIL_PARTNERSHIP_ANNULATED: Condition = null;

    // partner is woman?
    public PARTNER_IS_WOMAN: Condition = null;

    // Same place like partner?
    public ADDRESS_PARTNER: Condition = null;

    // Religion of partner changed?
    public RELIGION_PARTNER_CHANGE: Condition = null;

    // Hinterbliebenenbezüge erhalten
    public WIDOW_PENSION: Condition = null;

    // Widow pass always valid?
    public WIDOW_PASS_UNLIMITED: Condition = null;

    // Hat sich der Verwitwet Status im aktuellen Steuerjahr geändert?
    public WIDOW_CHANGE: Condition = null;

    // Hat der Partner Hinterbliebenenbezüge erhalten
    public WIDOW_PENSION_PARTNER: Condition = null;

    // Widow pass partner always valid?
    public WIDOW_PASS_UNLIMITED_PARTNER: Condition = null;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): Conditions {
        if (!Conditions.instance) {
            Conditions.instance = new Conditions();
        }

        return Conditions.instance;
    }

}