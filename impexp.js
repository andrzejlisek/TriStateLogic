var CF = new ConfigFile();

function Export()
{
    CF.ParamClear();
    CF.ParamSetS("Obj", Elements.length);
    for (var I = 0; I < Elements.length; I++)
    {
        var Elem = Elements[I];
    
        CF.ParamSetS("Obj" + I + "Name", Elem.Name);
        CF.ParamSetI("Obj" + I + "Type", Elem.Type);
        CF.ParamSetI("Obj" + I + "X", Elem.X);
        CF.ParamSetI("Obj" + I + "Y", Elem.Y);
        CF.ParamSetI("Obj" + I + "Rot", Elem.Rot);
        CF.ParamSetI("Obj" + I + "TermI", Elem.TermI);
        CF.ParamSetI("Obj" + I + "TermO", Elem.TermO);
        for (var II = 0; II < Elem.TermO; II++)
        {
            CF.ParamSetI("Obj" + I + "Default" + II, Elem.DefaultVal[II]);
        }
        
        if (Elem.Type == 0)
        {
            CF.ParamSetI("Obj" + I + "Propagation", Elem.Propagation);

            CF.ParamSetI("Obj" + I + "Elem", Elem.Elements.length);
            for (var II = 0; II < Elem.Elements.length; II++)
            {
                CF.ParamSetI("Obj" + I + "Elem" + II, Elem.Elements[II]);
            }

            CF.ParamSetI("Obj" + I + "Conn", Elem.Conn.length);
            for (var II = 0; II < Elem.Conn.length; II++)
            {
                CF.ParamSetI("Obj" + I + "Conn" + II + "ElemO", Elem.Conn[II][0]);
                CF.ParamSetI("Obj" + I + "Conn" + II + "TermO", (Elem.Conn[II][1] - 1));
                CF.ParamSetI("Obj" + I + "Conn" + II + "ElemI", Elem.Conn[II][2]);
                CF.ParamSetI("Obj" + I + "Conn" + II + "TermI", (Elem.Conn[II][3] - 1));
            }
        }
        if (Elem.Type == 1)
        {
            CF.ParamSetI("Obj" + I + "Func", Elem.FuncTable.length);
            for (var II = 0; II < Elem.FuncTable.length; II++)
            {
                for (var III = 0; III < Elem.TermI; III++)
                {
                    CF.ParamSetI("Obj" + I + "Func" + II + "I" + III, Elem.FuncTable[II][III]);
                }
                for (var III = 0; III < Elem.TermO; III++)
                {
                    CF.ParamSetI("Obj" + I + "Func" + II + "O" + III, Elem.FuncTable[II][Elem.TermI + III]);
                }
            }
        }
        
        if (Elem.Type == 2)
        {
            CF.ParamSetI("Obj" + I + "Term", Elem.FuncTable.length);
            for (var II = 0; II < Elem.FuncTable.length; II++)
            {
                if (Elem.FuncTable[II][0] == 0)
                {
                    CF.ParamSetI("Obj" + I + "Term" + II + "T", "O");
                }
                else
                {
                    CF.ParamSetI("Obj" + I + "Term" + II + "T", "I");
                }
                CF.ParamSetI("Obj" + I + "Term" + II + "N", Elem.FuncTable[II][1]);
                CF.ParamSetI("Obj" + I + "Term" + II + "A", Elem.FuncTable[II][2]);
            }
        }
        
    }
    document.getElementById("ImpExp").value = CF.TextSave();
}

function Import()
{
    Elements = [];
    TruthLinesLast = -1;
    ElementsCurrent = 0;
    CF.TextLoad(document.getElementById("ImpExp").value);

    var ObjC = CF.ParamGetI("Obj");
    var LogicDefault_ = LogicDefault();
    for (var I = 0; I < ObjC; I++)
    {
        var Elem = new LogicElement();
        Elem.Name = CF.ParamGetS("Obj" + I + "Name");
        Elem.Type = CF.ParamGetI("Obj" + I + "Type");
        Elem.X = CF.ParamGetI("Obj" + I + "X");
        Elem.Y = CF.ParamGetI("Obj" + I + "Y");
        Elem.Rot = CF.ParamGetI("Obj" + I + "Rot");
        Elem.SetTerm(CF.ParamGetI("Obj" + I + "TermI"), CF.ParamGetI("Obj" + I + "TermO"), LogicDefault_);

        for (var II = 0; II < Elem.TermO; II++)
        {
            Elem.DefaultVal.push(CF.ParamGetI("Obj" + I + "Default" + II));
        }
        
        if (Elem.Type == 0)
        {
            Elem.Propagation = CF.ParamGetI("Obj" + I + "Propagation");
        }

        if (Elem.Type == 1)
        {
            var FuncC = CF.ParamGetI("Obj" + I + "Func");
            for (var II = 0; II < FuncC; II++)
            {
                var FuncItem = [];
                for (var III = 0; III < Elem.TermI; III++)
                {
                    FuncItem.push(CF.ParamGetI("Obj" + I + "Func" + II + "I" + III));
                }
                for (var III = 0; III < Elem.TermO; III++)
                {
                    FuncItem.push(CF.ParamGetI("Obj" + I + "Func" + II + "O" + III));
                }
                Elem.FuncTable.push(FuncItem);
            }
        }

        if (Elem.Type == 2)
        {
            var TermC = CF.ParamGetI("Obj" + I + "Term");
            for (var II = 0; II < TermC; II++)
            {
                var TermN = CF.ParamGetI("Obj" + I + "Term" + II + "N");
                var TermA = CF.ParamGetI("Obj" + I + "Term" + II + "A");
                if (CF.ParamGetS("Obj" + I + "Term" + II + "T") == "I")
                {
                    Elem.SetIO(0 - 1 - TermN, TermA + 1);
                }
                if (CF.ParamGetS("Obj" + I + "Term" + II + "T") == "O")
                {
                    Elem.SetIO(0 + 1 + TermN, TermA + 1);
                }
            }
        }
        
        Elements.push(Elem);
    }

    for (var I = 0; I < ObjC; I++)
    {
        var Elem = Elements[I];
        if (Elem.Type == 0)
        {
            var ElemC = CF.ParamGetI("Obj" + I + "Elem");
            for (var II = 0; II < ElemC; II++)
            {
                Elem.Elements.push(CF.ParamGetI("Obj" + I + "Elem" + II));
            }
            
            var ConnC = CF.ParamGetI("Obj" + I + "Conn");
            for (var II = 0; II < ConnC; II++)
            {
                var ConnEO = CF.ParamGetI("Obj" + I + "Conn" + II + "ElemO");
                var ConnTO = CF.ParamGetI("Obj" + I + "Conn" + II + "TermO") + 1;
                var ConnEI = CF.ParamGetI("Obj" + I + "Conn" + II + "ElemI");
                var ConnTI = CF.ParamGetI("Obj" + I + "Conn" + II + "TermI") + 1;
                Elem.SetConn(ConnEO, ConnTO, ConnEI, ConnTI);
            }
        }
    }
    
    SetVal(-1, 0);
    Repaint();
}

