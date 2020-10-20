function LogicElement()
{
    this.Propagation = 1;
    
    this.DefaultVal = [];
    

    // 0 - Circuit
    // 1 - Truth table
    // 2 - Input/Output
    this.Type = 0;
    
    // Placement on canvas
    this.X = 0;
    this.Y = 0;
    
    // Rotation on canvas
    // 0 - Normal
    // 1 - Rotated 90
    // 2 - Rotated 180
    // 3 - Rotated 270
    // 4 - Inverted normal
    // 5 - Inverted rotated 90
    // 6 - Inverted rotated 180
    // 7 - Inverted rotated 270
    this.Rot = 0;
    
    // Terminals
    this.TermI = 0;
    this.TermO = 0;
    this.ValI = [];
    this.ValO = [];
    this.ValI_ = [];
    this.ValO_ = [];
    
    // List of element objects
    this.Elements = [];
    
    // List of element connections
    this.Conn = [];
    
    // Element name
    this.Name = "";
    
    this.GetElemObj = function(N)
    {
        return Elements[this.Elements[N]];
    }
    
    this.NameId = function()
    {
        var NameSep = this.Name.indexOf(ConfNameSeparator);
        if (NameSep < 0)
        {
            return this.Name.toUpperCase();
        }
        else
        {
            return this.Name.substr(0, NameSep).toUpperCase();
        }
    }
    
    // IO, Truth table
    this.FuncTable = [];

    // Set number of input and output terminals
    this.SetTerm = function(TermI_, TermO_, LogicDefault_)
    {
        this.TermI = TermI_;
        this.TermO = TermO_;
        this.ValI = [];
        this.ValO = [];
        this.ValI_ = [];
        this.ValO_ = [];
        this.DefaultVal = [];
        while (TermI_ > 0)
        {
            this.ValI.push(LogicDefault_);
            this.ValI_.push(LogicDefault_);
            TermI_--;
        }
        while (TermO_ > 0)
        {
            this.ValO.push(LogicDefault_);
            this.ValO_.push(LogicDefault_);
            this.DefaultVal.push(LogicDefault_);
            TermO_--;
        }
    }

    // Set terminal assignment to IO element
    this.SetIO = function(Term, Delta)
    {
        if (this.Type == 2)
        {
            if (Term < 0)
            {
                for (var I = 0; I < this.FuncTable.length; I++)
                {
                    if ((this.FuncTable[I][0] == 1) && (this.FuncTable[I][1] == (0 - Term - 1)))
                    {
                        this.FuncTable[I][2] += Delta;
                        if ((this.FuncTable[I][2] < 0) || (this.FuncTable[I][2] > 9))
                        {
                            this.FuncTable.splice(I, 1);
                        }
                        return;
                    }
                }
                if (Delta > 0)
                {
                    this.FuncTable.push([1, (0 - Term - 1), (Delta - 1)]);
                }
                else
                {
                    this.FuncTable.push([1, (0 - Term - 1), (10 + Delta)]);
                }
            }
            if (Term > 0)
            {
                for (var I = 0; I < this.FuncTable.length; I++)
                {
                    if ((this.FuncTable[I][0] == 0) && (this.FuncTable[I][1] == (Term - 1)))
                    {
                        this.FuncTable[I][2] += Delta;
                        if ((this.FuncTable[I][2] < 0) || (this.FuncTable[I][2] > (9 + LogicValues)))
                        {
                            this.FuncTable.splice(I, 1);
                        }
                        return;
                    }
                }
                if (Delta > 0)
                {
                    this.FuncTable.push([0, (Term - 1), (Delta - 1)]);
                }
                else
                {
                    this.FuncTable.push([0, (Term - 1), (10 + LogicValues + Delta)]);
                }
            }
        }
    }
    
    // Set truth table function element
    this.SetFunc = function(Val)
    {
        if (this.Type == 1)
        {
            this.FuncTable.push(Val);
        }
    }
    
    // Add or remove connection
    this.SetConn = function(Elem1, Term1, Elem2, Term2)
    {
        for (var I = 0; I < this.Conn.length; I++)
        {
            if ((this.Conn[I][0] == Elem1) && (this.Conn[I][1] == Term1) && (this.Conn[I][2] == Elem2) && (this.Conn[I][3] == Term2))
            {
                this.Conn.splice(I, 1);
                return;
            }
            if ((this.Conn[I][2] == Elem2) && (this.Conn[I][3] == Term2))
            {
                this.Conn.splice(I, 1);
                I--;
            }
        }
        this.Conn.push([Elem1, Term1, Elem2, Term2]);
    }
    
    // Remove element
    this.DeleteElem = function(Elem0)
    {
        // Remove connections with element
        for (var I = 0; I < this.Conn.length; I++)
        {
            if ((this.Conn[I][0] == Elem0) || (this.Conn[I][2] == Elem0))
            {
                this.Conn.splice(I, 1);
                I--;
            }
        }

        // Remove element
        this.Elements.splice(Elem0, 1);
        
        // Correct connections
        for (var I = 0; I < this.Conn.length; I++)
        {
            if (this.Conn[I][0] > Elem0)
            {
                this.Conn[I][0]--;
            }
            if (this.Conn[I][2] > Elem0)
            {
                this.Conn[I][2]--;
            }
        }
    }
    
    
    this.Process = function()
    {
        // Circuit
        if (this.Type == 0)
        {
            // Put input
            for (var I = 0; I < this.Elements.length; I++)
            {
                var E = this.GetElemObj(I);
                if (E.Type == 2)
                {
                    for (var II = 0; II < E.FuncTable.length; II++)
                    {
                        if (E.FuncTable[II][0] == 0)
                        {
                            if (E.FuncTable[II][2] < 10)
                            {
                                E.ValO_[E.FuncTable[II][1]] = this.ValI[E.FuncTable[II][2]];
                            }
                            else
                            {
                                E.ValO_[E.FuncTable[II][1]] = E.FuncTable[II][2] - 10;
                            }
                        }
                    }
                }
            }
            
            var Prop = this.Propagation;
            while (Prop > 0)
            {
                // Propagate signal
                for (var I = 0; I < this.Conn.length; I++)
                {
                    var E_1 = this.GetElemObj(this.Conn[I][0]);
                    var E_2 = this.GetElemObj(this.Conn[I][2]);
                    E_2.ValI[this.Conn[I][3] - 1] = E_1.ValO[this.Conn[I][1] - 1];
                }
            
                // Process elemets
                for (var I = 0; I < this.Elements.length; I++)
                {
                    this.GetElemObj(I).Process();
                }
                
                Prop--;
            }
            
            
            // Get output
            for (var I = 0; I < this.Elements.length; I++)
            {
                var E = this.GetElemObj(I);
                if (E.Type == 2)
                {
                    for (var II = 0; II < E.FuncTable.length; II++)
                    {
                        if (E.FuncTable[II][0] == 1)
                        {
                            this.ValO[E.FuncTable[II][2]] = E.ValI_[E.FuncTable[II][1]];
                        }
                    }
                }
            }
        }

        // Truth table
        if (this.Type == 1)
        {
            // Set default value
            for (var I = 0; I < this.TermO; I++)
            {
                this.ValO[I] = this.DefaultVal[I];
            }
            
            // Search the truth table
            for (var I = 0; I < this.FuncTable.length; I++)
            {
                var Match = true;
                //console.log(this.FuncTable[I] + "|" + this.ValI);
                for (var II = 0; II < this.TermI; II++)
                {
                    if (this.FuncTable[I][II] != this.ValI[II])
                    {
                        Match = false;
                    }
                }
                if (Match)
                {
                    for (var II = 0; II < this.TermO; II++)
                    {
                        this.ValO[II] = this.FuncTable[I][II + this.TermI];
                    }
                }
            }
            
        }

        // Input/Output
        if (this.Type == 2)
        {
            for (var I = 0; I < this.TermI; I++)
            {
                this.ValI_[I] = this.ValI[I];
            }
            for (var I = 0; I < this.TermO; I++)
            {
                this.ValO[I] = this.ValO_[I];
            }
        }
    }
    
    this.GetFormulaConn = [];
    
    this.GetFormulaNotConn = function(ConnDef)
    {
        var ConnVal = ConnDef[0] + "_" + ConnDef[1] + "_" + ConnDef[2] + "_" + ConnDef[3];
        if (this.GetFormulaConn.indexOf(ConnVal) >= 0)
        {
            return false;
        }
        else
        {
            this.GetFormulaConn.push(ConnVal);
            return true;
        }
    }
    
    // Get function formula in circuit by connection back tracing
    this.GetFormulaFromTerm = function(ElemN, TermN, X1, X2, FormType)
    {
        for (var I = 0; I < this.Conn.length; I++)
        {
            if ((this.Conn[I][2] == ElemN) && (this.Conn[I][3] == (TermN + 1)))
            {
                if (!this.GetFormulaNotConn(this.Conn[I]))
                {
                    return "$";
                }
            
                var ElemObj = this.GetElemObj(this.Conn[I][0]);
                if (ElemObj.Type == 0)
                {
                    var F = ElemObj.GetFormula(this.Conn[I][1] - 1, "#", "#", FormType);
                    for (var II = 0; II < ElemObj.TermI; II++)
                    {
                        var Idx = F.indexOf("#" + II + "#");
                        while (Idx >= 0)
                        {
                            var F1 = F.substr(0, Idx);
                            var F2 = this.GetFormulaFromTerm(this.Conn[I][0], II, X1, X2, FormType);
                            var F3 = F.substr(Idx + 3);
                            F = F1 + F2 + F3;
                            Idx = F.indexOf("#" + II + "#");
                        }
                    }
                    return F;
                }
                if (ElemObj.Type == 1)
                {
                    var F = ElemObj.GetFormula(this.Conn[I][1] - 1, X1, X2, FormType);
                    for (var II = 0; II < ElemObj.TermI; II++)
                    {
                        var Idx = F.indexOf("#" + II + "#");
                        while (Idx >= 0)
                        {
                            var F1 = F.substr(0, Idx);
                            var F2 = this.GetFormulaFromTerm(this.Conn[I][0], II, X1, X2, FormType);
                            var F3 = F.substr(Idx + 3);
                            F = F1 + F2 + F3;
                            Idx = F.indexOf("#" + II + "#");
                        }
                    }
                    return F;
                }
                if (ElemObj.Type == 2)
                {
                    return ElemObj.GetFormula(this.Conn[I][1] - 1, X1, X2, FormType);
                }
                return "Not_implemented";
            }
        }
        return "_";
    }
    
    // Get function formula
    this.GetFormula = function(N, X1, X2, FormType)
    {
        // Circuit
        if (this.Type == 0)
        {
            // Search for output element associated with output number
            this.GetFormulaConn = [];
            for (var I = 0; I < this.Elements.length; I++)
            {
                var ObjO = this.GetElemObj(I);
                if (ObjO.Type == 2)
                {
                    for (var II = 0; II < ObjO.FuncTable.length; II++)
                    {
                        if ((ObjO.FuncTable[II][0] == 1) && (ObjO.FuncTable[II][2] == N))
                        {
                            return this.GetFormulaFromTerm(I, ObjO.FuncTable[II][1], X1, X2, FormType);
                        }
                    }
                }
            }
        }

        // Truth table
        if (this.Type == 1)
        {
            var F = "";

            if ((FormType == 1) || (FormType == 2) || (FormType == 3))
            {
                var SymbolAND = "";
                var SymbolOR = "";
                var SymbolNOT = "";
                var SymbolXOR = "";
                var SymbolEQU = "";
                var SymbolNEQU = "";
                var SymbolIMP = "";
                var SymbolNIMP = "";
                var SymbolCON = "";
                var SymbolNCON = "";

                if (FormType == 1)
                {
                    SymbolAND = "∧";
                    SymbolOR = "∨";
                    SymbolNOT = "¬";
                    SymbolXOR = "⊻";
                    SymbolEQU = "⇔";
                    SymbolNEQU = "⇎";
                    SymbolIMP = "⇒";
                    SymbolNIMP = "⇏";
                    SymbolCON = "⇐";
                    SymbolNCON = "⇍";
                }            
                if (FormType == 2)
                {
                    SymbolAND = "&";
                    SymbolOR = "|";
                    SymbolNOT = "!";
                    SymbolXOR = "^";
                    SymbolEQU = "=";
                    SymbolNEQU = "≠";
                    SymbolIMP = "≤";
                    SymbolNIMP = ">";
                    SymbolCON = "≥";
                    SymbolNCON = "<";
                }

                // One-argument function acts as BUF or NOT
                if (this.TermI == 1)
                {
                    var NM = this.Name;
                    if ((NM == "BUF") || (NM == "AND") || (NM == "OR") || (NM == "XOR"))
                    {
                        return "#0#";
                    }
                    if ((NM == "NOT") || (NM == "NAND") || (NM == "NOR") || (NM == "XNOR"))
                    {
                        return SymbolNOT + "#0#";
                    }
                }

                // Determine function by element name
                switch (this.NameId())
                {
                    case "AND":
                    {
                        F = "#0#";
                        for (var I = 1; I < this.TermI; I++)
                        {
                            F = F + " " + SymbolAND + " #" + I + "#";
                        }
                        return "(" + F + ")";
                    }
                    case "NAND":
                    {
                        F = "#0#";
                        for (var I = 1; I < this.TermI; I++)
                        {
                            F = F + " " + SymbolAND + " #" + I + "#";
                        }
                        return SymbolNOT + "(" + F + ")";
                    }
                    case "OR":
                    {
                        F = "#0#";
                        for (var I = 1; I < this.TermI; I++)
                        {
                            F = F + " " + SymbolOR + " #" + I + "#";
                        }
                        return "(" + F + ")";
                    }
                    case "NOR":
                    {
                        F = "#0#";
                        for (var I = 1; I < this.TermI; I++)
                        {
                            F = F + " " + SymbolOR + " #" + I + "#";
                        }
                        return SymbolNOT + "(" + F + ")";
                    }
                    case "XOR":
                    {
                        F = "#0#";
                        for (var I = 1; I < this.TermI; I++)
                        {
                            F = F + " " + SymbolXOR + " #" + I + "#";
                        }
                        return "(" + F + ")";
                    }
                    case "XNOR":
                    {
                        F = "#0#";
                        for (var I = 1; I < this.TermI; I++)
                        {
                            F = F + " " + SymbolXOR + " #" + I + "#";
                        }
                        return SymbolNOT + "(" + F + ")";
                    }

                    case "EQU":
                    {
                        if (this.TermI == 1)
                        {
                            return ConfSignalName[1];
                        }
                        if (this.TermI == 2)
                        {
                            return "#0# " + SymbolEQU + " #1#";
                        }
                        if (this.TermI > 2)
                        {
                            var F1 = "#0#";
                            var F2 = SymbolNOT + "#0#";
                            for (var I = 1; I < this.TermI; I++)
                            {
                                F1 = F1 + " " + SymbolAND + " #" + I + "#";
                                F2 = F2 + " " + SymbolAND + " " + SymbolNOT + "#" + I + "#";
                            }
                            return "((" + F1 + ") " + SymbolOR + " (" + F2 + "))";
                        }
                        break;
                    }
                    case "NEQU":
                    {
                        if (this.TermI == 1)
                        {
                            return ConfSignalName[0];
                        }
                        if (this.TermI == 2)
                        {
                            return "#0# " + SymbolNEQU + " #1#";
                        }
                        if (this.TermI > 2)
                        {
                            var F1 = "#0#";
                            var F2 = SymbolNOT + "#0#";
                            for (var I = 1; I < this.TermI; I++)
                            {
                                F1 = F1 + " " + SymbolOR + " #" + I + "#";
                                F2 = F2 + " " + SymbolOR + " " + SymbolNOT + "#" + I + "#";
                            }
                            return "((" + F1 + ") " + SymbolAND + " (" + F2 + "))";
                        }
                        break;
                    }

                    case "IMP":
                    {
                        if (this.TermI == 2)
                        {
                            return "(#0# " + SymbolIMP + " #1#)";
                        }
                    }
                    case "NIMP":
                    {
                        if (this.TermI == 2)
                        {
                            return "(#0# " + SymbolNIMP + " #1#)";
                        }
                    }
                    case "CON":
                    {
                        if (this.TermI == 2)
                        {
                            return "(#0# " + SymbolCON + " #1#)";
                        }
                    }
                    case "NCON":
                    {
                        if (this.TermI == 2)
                        {
                            return "(#0# " + SymbolNCON + " #1#)";
                        }
                    }
                }
            }
            
            
            F = "()";
            if (this.TermI > 0)
            {
                F = "(#0#";
                for (var I = 1; I < this.TermI; I++)
                {
                    F = F + ", #" + I + "#";
                }
                F = F + ")";
            }
            if (this.TermO > 1)
            {
                return this.Name + "[" + N + "]" + F;
            }
            else
            {
                return this.Name + F;
            }
        }

        // Input/Output
        if (this.Type == 2)
        {
            for (var II = 0; II < this.FuncTable.length; II++)
            {
                if ((this.FuncTable[II][0] == 0) && (this.FuncTable[II][1] == N))
                {
                    if (this.FuncTable[II][2] >= 10)
                    {
                        return ConfSignalName[this.FuncTable[II][2] - 10];
                    }
                    return X1 + this.FuncTable[II][2] + X2;
                }
            }
            return "_";
        }

        return "Undefined";
    }
}

