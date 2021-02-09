import { eTINStatus } from './eTINStatus';
import { HashSet } from './../../../datatypes/HashSet';
import { Dictionary } from './../../../datatypes/Dictionary';
import { exception } from 'console';



export class eTIN
{
    /**
     * Alle für eine eTIN gültigen Zeichen
     */
    public readonly validCharacters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    /**
     * Alle für den Namen gültigen Zeichen
     */
    private static readonly validNameCharacters : string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static get validNameCharactersArray() : string[]
    {
        return this.toCharArray(this.validNameCharacters);
    }

    /**
     * Prüfziffern
     */
    private static readonly _evenValues : Dictionary<number> = new Dictionary(
    [
        { key: '0', value: 0 },
        { key: '1', value: 1 },
        { key: '2', value: 2 },
        { key: '3', value: 3 },
        { key: '4', value: 4 },
        { key: '5', value: 5 },
        { key: '6', value: 6 },
        { key: '7', value: 7 },
        { key: '8', value: 8 },
        { key: '9', value: 9 },
        { key: 'A', value: 0 },
        { key: 'B', value: 1 },
        { key: 'C', value: 2 },
        { key: 'D', value: 3 },
        { key: 'E', value: 4 },
        { key: 'F', value: 5 },
        { key: 'G', value: 6 },
        { key: 'H', value: 7 },
        { key: 'I', value: 8 },
        { key: 'J', value: 9 },
        { key: 'K', value: 10 },
        { key: 'L', value: 11 },
        { key: 'M', value: 12 },
        { key: 'N', value: 13 },
        { key: 'O', value: 14 },
        { key: 'P', value: 15 },
        { key: 'Q', value: 16 },
        { key: 'R', value: 17 },
        { key: 'S', value: 18 },
        { key: 'T', value: 19 },
        { key: 'U', value: 20 },
        { key: 'V', value: 21 },
        { key: 'W', value: 22 },
        { key: 'X', value: 23 },
        { key: 'Y', value: 24 },
        { key: 'Z', value: 25 }
    ]);

    private static readonly _oddValues: Dictionary<number> = new Dictionary(
    [
        { key: '0', value: 1 },
        { key: '1', value: 0 },
        { key: '2', value: 5 },
        { key: '3', value: 7 },
        { key: '4', value: 9 },
        { key: '5', value: 13 },
        { key: '6', value: 15 },
        { key: '7', value: 17 },
        { key: '8', value: 19 },
        { key: '9', value: 21 },
        { key: 'A', value: 1 },
        { key: 'B', value: 0 },
        { key: 'C', value: 5 },
        { key: 'D', value: 7 },
        { key: 'E', value: 9 },
        { key: 'F', value: 13 },
        { key: 'G', value: 15 },
        { key: 'H', value: 17 },
        { key: 'I', value: 19 },
        { key: 'J', value: 21 },
        { key: 'K', value: 2 },
        { key: 'L', value: 4 },
        { key: 'M', value: 18 },
        { key: 'N', value: 20 },
        { key: 'O', value: 11 },
        { key: 'P', value: 3 },
        { key: 'Q', value: 6 },
        { key: 'R', value: 8 },
        { key: 'S', value: 12 },
        { key: 'T', value: 14 },
        { key: 'U', value: 16 },
        { key: 'V', value: 10 },
        { key: 'W', value: 22 },
        { key: 'X', value: 23 },
        { key: 'Y', value: 24 },
        { key: 'Z', value: 25 }
    ]);

    /** 
     * Diese Tabelle enthaelt die zu ersetzenden Zeichen 
     */
    private static get _replacementCharacters() : Dictionary<string> 
    {
        var arr = new Array<[string, string]>
        (
            ['À', "A"], 
            ['Á', "A"],
            ['Â', "A"],
            ['Ã', "A"],
            ['Å', "A"],
            ['à', "A"],
            ['á', "A"],
            ['â', "A"],
            ['ã', "A"],
            ['å', "A"],
            ['Ä', "AE"],
            ['ä', "AE"],
            ['Æ', "AE"],
            ['æ', "AE"],
            ['ç', "C"],
            ['Ç', "C"],
            ['Ð', "D"],
            ['ð', "D"],
            ['È', "E"],
            ['É', "E"],
            ['Ê', "E"],
            ['Ë', "E"],
            ['è', "E"],
            ['é', "E"],
            ['ê', "E"],
            ['ë', "E"],
            ['Ì', "I"],
            ['Í', "I"],
            ['Î', "I"],
            ['Ï', "I"],
            ['ì', "I"],
            ['í', "I"],
            ['î', "I"],
            ['ï', "I"],
            ['Ñ', "N"],
            ['ñ', "N"],
            ['Ò', "O"],
            ['Ó', "O"],
            ['Ô', "O"],
            ['Õ', "O"],
            ['Ö', "OE"],
            ['Ø', "O"],
            ['ò', "O"],
            ['ó', "O"],
            ['ô', "O"],
            ['õ', "O"],
            ['ö', "OE"],
            ['ø', "O"],
            ['Š', "S"],
            ['š', "S"],
            ['Ù', "U"],
            ['Ú', "U"],
            ['Û', "U"],
            ['ù', "U"],
            ['ú', "U"],
            ['û', "U"],
            ['Ü', "UE"],
            ['ü', "UE"],
            ['Ÿ', "Y"],
            ['Ý', "Y"],
            ['ý', "Y"],
            ['ÿ', "Y"],
            ['Ž', "Z"],
            ['ž', "Z"],
            ['ß', "SS"]
        ).concat(this.validNameCharactersArray.map(ch => [ch, ch.toUpperCase()]));

        var dict: Dictionary<string> = new Dictionary();

        for(let i = 0; i < arr.length; i++)
        {
            dict.add(arr[i][0], arr[i][1]);
        }

        return dict;
    }

    /**
     * Hier werden nur die Vokale gespeichert
     */
    private static readonly _vowels: HashSet = new HashSet(["A", "E", "I", "O", "U"]);

    /**
     * Liste der Buchstaben, die einem Monat entsprechen (A = Januar, B = Februar, etc...)
     */
    private static readonly _monthCharacters: string = "ABCDEFGHIJKL";

    /**
     * Struktur einer gültigen eTIN
     */
    private static readonly _etinRegex: RegExp = new RegExp("^[A-Z]{8}\d{2}[A-L](([0-2][0-9])|(3[01]))[A-Z]$");

    /**
     * Holt die im Konstruktor übergebene eTIN (ohne Leerzeichen)
     */
    private _value: string = "";
    public get value(): string 
    {
        return this._value;
    }

    /**
     * Holt den Status der eTIN
     */
    private _status: eTINStatus;
    public get status(): eTINStatus 
    {
        return this._status;
    }

    public get statusMessage(): string
    {
        switch(this.status)
        {
            case eTINStatus.Ok:
                return "Die eTIN ist korrekt";
            case eTINStatus.CheckDigigMismatch:
                return "Die Prüfsumme der eTIN ist fehlerhaft";
            case eTINStatus.InvalidCharacter:
                return "Die eTIN enhält ungültige Zeichen. Erlaubt sind nur Großbuchstaben (A-Z) und Ziffern (0-9)";
            case eTINStatus.InvalidLength:
                return "Die eTIN ist nicht 14 Zeichen lang";
            case eTINStatus.InvalidStructure:
                return "Die Struktur der eTIN ist ungültig. Die eTIN muss aus acht Buchstaben, zwei Ziffern, einem Buchstaben, zwei Ziffern und einem Buchstaben bestehen";
            default:
                throw new exception("Unbekannter Status");
        }
    }

    /**
     * Holt einen Wert, der angibt, ob die eTIN gültig ist
     */
    public get valid(): boolean 
    {
        return this._status == eTINStatus.Ok;
    }

    /**
     * Holt die Prüfziffer von value
     */
    public get checkDigit(): string
    {
        return this.GetNumberPart(13, 1, "X")[0];
    }

    constructor(pValue: string)
    {
        if (pValue == null)
            throw new exception("Value cannot be null");
        this._value = pValue.replace(" ", "");
    }

    /**
     * Cast string to char array
     * @param pValue string
     */
    private static toCharArray(pValue: string) : string[]
    {
        return pValue.split('');
    }

    private  GetNumberPart(offset: number, length: number, defaultValue: string) : string
    {
        if (this.value.length >= (offset + length))
            return this.value.substring(offset, length);
        return defaultValue;
    }

    /**
     * Überprüft ob die eTIN gültig ist
     * @param eTin Die zu überprüfende eTIN
     */
    public isValid(eTin: string): boolean
    {
        return new eTIN(eTin).valid
    }

    public toString = (): string =>
    {
        return this.value;
    }

    public static Create(surname: string, forename: string, dateOfBirth: Date): string
    {
        var birthdayCode = `${("0" + dateOfBirth.getFullYear() % 100).slice(-2), this._monthCharacters[dateOfBirth.getMonth() - 1], ("0" + dateOfBirth.getDate()).slice(-2)}`;
        var stringToCheckSum = this.GetFourCharacters(surname) + this.GetFourCharacters(forename) + birthdayCode;
        return stringToCheckSum + this.CalculateCheckDigit(stringToCheckSum);
    }

    /**
     * String normalisieren
     * Alle unbekannten Zeichen werden entfernt und Umlaute werden durch "normale" Zeichen ersetzt.
     * @param s Der zu normalisierende String
     */
    private static NormalizeString(s: string): string
    {
        var result: string = "";

        for(let i = 0; i < s.length; i++)
        {
            if (this._replacementCharacters.containsKey(s[i]))
                result += this._replacementCharacters[s[i]];
        }

        return result;
    }

    private static CalculateCheckDigit(value: string): string
    {
        // vgl. http://www.pruefziffernberechnung.de/E/eTIN.shtml
        var sum: number = 0;
        for (let i = 0; i < value.length; i++)
        {
            if ((i + 1) % 2 == 0) // Für gerade/ungerade fängt der Index mit 1 an!
                sum += this._evenValues[value[i]];
            else
                sum += this._oddValues[value[i]];
        }

        return (String.fromCharCode('A'.charCodeAt(0) + (sum % 26)));
    }

    /**
     * Erzeugt aus einem String wie z.B. Nachname die lt. Anforderung benoetigten 4 Zeichen zum Aufbau der eTIN
     * @param str Ein String aus dem die 4 Zeichen zum eTIN-Aufbau ermittelt werden
     */
    private static GetFourCharacters(str: string): string
    {
        var erg: string = "";

        // Zuerst einmal alle Sonderzeichen umwandeln bzw. ersetzen
        var s = this.NormalizeString(str);

        // Jedes SCH durch 'Y' ersetzen, lt. Anforderung
        s = s.replace("SCH", "Y");

        // Die Konsonanten von links nach rechts aufbauen,
        // wobei maximal 4 benoetigt werden
        for (let i = 0; i < s.length && erg.length < 4; i++)
        {
            if (!this._vowels.has(s[i]))
            {
                erg += s[i];
            }
        }

        if (erg.length < 4)
        {
            // Wenn nicht mehr genuegend Konsonanten zur Verfuegung standen,
            // dann den Rest mit Vokalen auffuellen, die von der Zeichenkette
            // von rechts nach links ermittelt werden
            for (let i = s.length - 1; i >= 0 && erg.length < 4; i--)
            {
                if (this._vowels.has(s[i]))
                {
                    erg += s[i];
                }
            }

            // Wenn auch dann immer noch keine 4 Zeichen zusammengekommen sind,
            // dann den Rest mit 'X' auffuellen
            while (erg.length < 4)
            {
                erg += "X";
            }
        }

        return erg;
    }
}