export enum eTINStatus
{
    /**
     * Die eTIN ist gültig
     */
    Ok,

    /**
     * Die eTIN hat eine ungültige Länge
     * Eine eTIN muss genau 14 Zeichen lang sein.
     */
    InvalidLength,

    /**
     * Die eTIN enthält ein ungültiges Zeichen
     */
    InvalidCharacter,

    /**
     * Die Struktur der eTIN ist falsch
     * Die eTIN muss folgenden Aufbau haben: <code>[A-Z]{8}\d{2}[A-Z]{1}\d{2}[A-Z]{1}</code>
     */
    InvalidStructure,

    /**
     * Die Prüfsumme der eTIN ist falsch 
     */
    CheckDigigMismatch
}