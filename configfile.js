function ConfigFile()
{
    this.Raw = {};
    
    this.TextLoad = function(Text)
    {
        this.Raw = {};
        var Txt = Text.split('\n');
        for (var I = 0; I < Txt.length; I++)
        {
            var Idx = Txt[I].indexOf("=");
            if (Idx >= 0)
            {
                this.Raw[Txt[I].substr(0, Idx)] = Txt[I].substr(Idx + 1);
            }
        }
    };
    
    this.TextSave = function()
    {
        var Txt = "";
        for (var Key in this.Raw)
        {
            Txt = Txt + Key + "=" + CF.Raw[Key] + "\n";
        }
        return Txt;
    };
    
    this.ParamClear = function()
    {
        Raw = {};
    };
    
    this.ParamRemove = function(Name)
    {
        delete this.Raw[Name]; 
    };
    
    this.ParamGetS = function(Name)
    {
        if (this.Raw[Name])
        {
            return this.Raw[Name];
        }
        else
        {
            return "";
        }
    };

    this.ParamGetI = function(Name)
    {
        return parseInt(this.ParamGetS(Name));
    };

    this.ParamGetB = function(Name)
    {
        if ((this.ParamGetS(Name) == "1") || (this.ParamGetS(Name) == "true"))
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    this.ParamSetS = function(Name, Value)
    {
        this.Raw[Name] = Value;
    };

    this.ParamSetI = function(Name, Value)
    {
        this.ParamSetS(Name, "" + Value + "");
    };

    this.ParamSetB = function(Name, Value)
    {
        if (Value)
        {
            this.ParamSetS(Name, "1");
        }
        else
        {
            this.ParamSetS(Name, "0");
        }
    };

    this.ParamExists = function(Name)
    {
        if (this.Raw[Name])
        {
            return true;
        }
        else
        {
            return false;
        }
    };
}

