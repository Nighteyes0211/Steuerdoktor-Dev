export class HashSet {
    private values = {}

    add(val) {
        this.values[val] = true
    }

    has(val) {
        return this.values[val] === true
    }

    remove(val) {
       delete this.values[val]
    }

    getValues() {
        return Object.keys(this.values)
    }

    constructor(init? : any[])
    {
        if(init)
        {
            for(let i = 0; i < init.length; i++)
            {
                if(!this.has(init[i]))
                    this.add(init[i]);
            }
        }
    }
}