import { exception } from 'console';
import { IdNrStatus } from './IdNrStatus';
import { TestValues } from './TestValues';

export class IdNr
{
    /**
     *  Die für eine Steueridentifikationsnummer gültigen Zeichen
     */
    public readonly validCharacters: string = "0123456789"; 

    /**
     * Holt den Status der Steueridentifikationsnummer
     */
    private _status?: IdNrStatus = null;
    public get status(): IdNrStatus 
    {
        if (this._status == null)
            this._status = this.determineStatus();
        
        return this._status;
    }

    /**
     * Holt den beim Konstruktor übergebenen Wert (ohne Leerzeichen)
     */
    private _value: string;
    public get value(): string
    {
        return this._value;
    }

    /**
     * Holt eine Statusmeldung für den status
     */
    public get statusMessage(): string
    {
        switch (this.status)
        {
            case IdNrStatus.Ok:
                return "Die IdNr ist korrekt.";
            case IdNrStatus.InvalidLength:
                return "Die IdNr ist nicht 11 Zeichen lang.";
            case IdNrStatus.InvalidCharacter:
                return "Die IdNr enhält ungültige Zeichen. Erlaubt sind nur Ziffern (0-9).";
            case IdNrStatus.InvalidStructure:
                return "Die Struktur der IdNr ist ungültig.";
            case IdNrStatus.CheckDigigMismatch:
                return "Die Prüfsumme der IdNr ist fehlerhaft.";
            default:
                throw new exception("InvalidOperationException");
        }
    }

    /**
     * Holt einen Wert, der angibt, ob die Steueridentifikationsnummer gültig ist.
     */
    public get valid(): boolean
    {
        return this.status == IdNrStatus.Ok;
    }

    /**
     * Holt die Prüfziffer der im Konstruktor übergebenen Steueridentifikationsnummer
     */
    public get checkDigit(): number
    {
        return Number(this.getNumberPart(10, 1, "0"));
    }

    /**
     * Holt einen Wert, der angibt, ob die Steueridentifikationsnummer eine Testnummer ist
     */
    public get isTestNumber(): boolean
    {
        return TestValues.IsTestIdNr(this.value);
    }

    /**
     * Ctr
     * @param pValue idnr
     */
    constructor(pValue: string)
    {
        if(pValue == null)
            throw new exception("Wert darf nicht null sein");

        this._value = pValue.replace(" ", "");
    }

    /**
     * Prüft, ob die übergebene Steueridentifikationsnummer gültig ist
     * @param idnr Die zu prüfende Steueridentifikationsnummer
     */
    public static isValid(idnr: string): boolean
    {
        return new IdNr(idnr).valid;
    }

    public toString = (): string =>
    {
        if (!this.valid)
            return this.value;

        var a = this.value.substring(0, 2);
        var b = this.value.substring(2, 3);
        var c = this.value.substring(5, 3);
        var d = this.value.substring(8, 3);
        var text = `${a} ${b} ${c} ${d}`

        return text;
    }

    private determineStatus() : IdNrStatus
    {
        if (this.value.length != 11)
            return IdNrStatus.InvalidLength;

        var numArray: number[] = new Array<number>(10);
        
        for (let ch of this.value.substring(0, 10))
        {
            var index: number = "0123456789".indexOf(ch);

            if (index == -1)
                return IdNrStatus.InvalidCharacter;
            ++numArray[index];
        }
            
        var num1: number = numArray.filter(x => x == 1).length;
        switch (num1)
        {
            case 7:
            case 8:
                var num2: number = numArray.filter(x => x == 0).length;
                if (9 - num1 != num2)
                    return IdNrStatus.InvalidStructure;
                return this.checkDigit != this.calculateCheckDigit() ? IdNrStatus.CheckDigigMismatch : IdNrStatus.Ok;
            default:
                return IdNrStatus.InvalidStructure;
        }
    }

    private getNumberPart(offset: number, length: number, defaultValue: string): string
    {
        if (this.value.length >= offset + length)
            return this.value.substring(offset, length);
        
        return defaultValue;
    }

    private calculateCheckDigit() : number
    {
        var num1: number = 10;
        var length: number = this.value.length;

        for(let i = 0; i != length - 1; ++i)
        {
            var num2: number = (this.value.charCodeAt(i) + num1) % 10;

            if(num2 == 0)
                num2 = 10;
            
            num1 = 2 * num2 % 11;
        }

        var num3: number = 11 - num1;

        if(num3 == 10)
            num3 = 0;

        return num3;
    }
}