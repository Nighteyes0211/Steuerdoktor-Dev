export enum IdNrStatus
{
    /// <summary>Die Steueridentifikationsnummer ist gültig</summary>
    Ok,
    /// <summary>
    /// Die Steueridentifikationsnummer hat eine ungültige Länge
    /// </summary>
    /// <remarks>
    /// Die Länge der Steueridentifikationsnummer ohne Leerzeichen muss 11 Zeichen betragen.
    /// </remarks>
    InvalidLength,
    /// <summary>
    /// Die Steueridentifikationsnummer enthält ein ungültiges Zeichen.
    /// </summary>
    /// <remarks>Es sind nur die Zeichen aus <see cref="F:Dataline.Elster.IdNr.ValidCharacters" /> gültig</remarks>
    InvalidCharacter,
    /// <summary>
    /// Die Struktur der Steueridentifikationsnummer ist ungültig
    /// </summary>
    /// <remarks>
    /// Von 11 Ziffern muss eine doppelt vorhanden sein. Die anderen dürfen nur einmal vorkommen
    /// </remarks>
    InvalidStructure,
    /// <summary>
    /// Die Prüfsumme der Steueridentifikationsnummer ist ungültig
    /// </summary>
    CheckDigigMismatch,
}