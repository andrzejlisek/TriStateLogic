var LogicValues = 4;

function LogicNeg(Elem, TermI, TermO)
{
    for (var I = 0; I < Elem.FuncTable.length; I++)
    {
        for (var II = 0; II < TermO; II++)
        {
            Elem.FuncTable[I][TermI + II] = LogicCalcNOT(Elem.FuncTable[I][TermI]);
        }
    }
}

function LogicOut(Elem, TermO)
{
    for (var I = 0; I < Elem.FuncTable.length; I++)
    {
        for (var II = 1; II < TermO; II++)
        {
            Elem.FuncTable[I].push(Elem.FuncTable[I][Elem.FuncTable[I].length - 1]);
        }
    }
}

function LogicGenTable(TermI)
{
    var FuncList = [];
    var FuncList_ = [];
    var FuncCount = 1;
    for (var I = 0; I < TermI; I++)
    {
        FuncCount = FuncCount * LogicValues;
        FuncList_.push(0);
    }
    for (var I = 0; I < FuncCount; I++)
    {
        var FuncList__ = [];
        for (var II = 0; II < TermI; II++)
        {
            FuncList__[II] = FuncList_[II];
        }
        FuncList.push(FuncList__);
        FuncList_[TermI - 1]++;
        if (FuncList_[TermI - 1] == LogicValues)
        {
            FuncList_[TermI - 1] = 0;
            if (TermI >= 2)
            {
                FuncList_[TermI - 2]++;
                if (FuncList_[TermI - 2] == LogicValues)
                {
                    FuncList_[TermI - 2] = 0;
                    if (TermI >= 3)
                    {
                        FuncList_[TermI - 3]++;
                        if (FuncList_[TermI - 3] == LogicValues)
                        {
                            FuncList_[TermI - 3] = 0;
                            if (TermI >= 4)
                            {
                                FuncList_[TermI - 4]++;
                                if (FuncList_[TermI - 4] == LogicValues)
                                {
                                    FuncList_[TermI - 4] = 0;
                                    if (TermI >= 5)
                                    {
                                        FuncList_[TermI - 5]++;
                                        if (FuncList_[TermI - 5] == LogicValues)
                                        {
                                            FuncList_[TermI - 5] = 0;
                                            if (TermI >= 6)
                                            {
                                                FuncList_[TermI - 6]++;
                                                if (FuncList_[TermI - 6] == LogicValues)
                                                {
                                                    FuncList_[TermI - 6] = 0;
                                                    if (TermI >= 7)
                                                    {
                                                        FuncList_[TermI - 7]++;
                                                        if (FuncList_[TermI - 7] == LogicValues)
                                                        {
                                                            FuncList_[TermI - 7] = 0;
                                                            if (TermI >= 8)
                                                            {
                                                                FuncList_[TermI - 8]++;
                                                                if (FuncList_[TermI - 8] == LogicValues)
                                                                {
                                                                    FuncList_[TermI - 8] = 0;
                                                                    if (TermI >= 9)
                                                                    {
                                                                        FuncList_[TermI - 9]++;
                                                                        if (FuncList_[TermI - 9] == LogicValues)
                                                                        {
                                                                            FuncList_[TermI - 9] = 0;
                                                                            if (TermI >= 10)
                                                                            {
                                                                                FuncList_[TermI - 10]++;
                                                                                if (FuncList_[TermI - 10] == LogicValues)
                                                                                {
                                                                                    FuncList_[TermI - 10] = 0;
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return FuncList;
}




function LogicStd(Elem, Type, TermI, TermO)
{
    if ((TermI < 0) || (TermI > 10))
    {
        return "Logic element can have from 0 to 10 input terminals";
    }
    if ((TermO < 0) || (TermO > 10))
    {
        return "Logic element can have from 0 to 10 output terminals";
    }
    if ((TermI == 0) && (TermO == 0))
    {
        return "Logic element must have at least one terminal";
    }
    Elem.SetTerm(TermI, TermO, LogicDefault());
    if (Type == 0)
    {
        Elem.Name = "IC";
    }
    if (Type == 1)
    {
        Elem.Name = "TT";
    }
    if (Type == 2)
    {
        Elem.Name = "I/O";
    }
    Elem.Type = Type;
    return "";
}

function LogicStdBUF(Elem, TermI, TermO)
{
    if (TermI != 1)
    {
        return "BUF element must have exactly 1 input terminal";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "BUF element must have from 1 to 10 output terminals";
    }
    Elem.SetTerm(TermI, TermO, LogicDefault());
    Elem.Name = "BUF";
    Elem.Type = 1;
    Elem.FuncTable.push([0, 0]);
    Elem.FuncTable.push([1, 1]);
    Elem.FuncTable.push([2, 2]);
    Elem.FuncTable.push([3, 3]);
    LogicOut(Elem, TermO);
    return "";
}

function LogicStdNOT(Elem, TermI, TermO)
{
    if (TermI != 1)
    {
        return "NOT element must have exactly 1 input terminal";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "NOT element must have from 1 to 10 output terminals";
    }
    LogicStdBUF(Elem, TermI, TermO);
    if (LogicConvention == 1)
    {
        Elem.Name = LogicConvName("NOT");
    }
    else
    {
        Elem.Name = "NOT";
    }
    LogicNeg(Elem, 1, TermO);
    return "";
}

function LogicStdTO0(Elem, TermI, TermO)
{
    if (TermI != 1)
    {
        return "FALSE element must have exactly 1 input terminal";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "FALSE element must have from 1 to 10 output terminals";
    }
    Elem.SetTerm(TermI, TermO, LogicDefault());
    Elem.Name = "FALSE";
    Elem.Type = 1;
    Elem.FuncTable.push([0, 0]);
    Elem.FuncTable.push([1, 1]);
    Elem.FuncTable.push([2, 0]);
    Elem.FuncTable.push([3, 0]);
    LogicOut(Elem, TermO);
    return "";
}

function LogicStdTO1(Elem, TermI, TermO)
{
    if (TermI != 1)
    {
        return "TRUE element must have exactly 1 input terminal";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "TRUE element must have from 1 to 10 output terminals";
    }
    Elem.SetTerm(TermI, TermO, LogicDefault());
    Elem.Name = "TRUE";
    Elem.Type = 1;
    Elem.FuncTable.push([0, 0]);
    Elem.FuncTable.push([1, 1]);
    Elem.FuncTable.push([2, 1]);
    Elem.FuncTable.push([3, 1]);
    LogicOut(Elem, TermO);
    return "";
}

function LogicStdAND(Elem, TermI, TermO)
{
    if ((TermI < 1) || (TermI > 10))
    {
        return "AND element must have from 1 to 10 input terminals";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "AND element must have from 1 to 10 output terminals";
    }
    Elem.SetTerm(TermI, TermO, LogicDefault());
    Elem.Name = LogicConvName("AND");
    Elem.Type = 1;
    var LogicFunc = LogicGenTable(TermI);
    var LogicFuncL = LogicFunc.length;
    for (var I = 0; I < LogicFuncL; I++)
    {
        LogicFunc[I].push(LogicCalcAND(TermI, LogicFunc[I]));
        Elem.SetFunc(LogicFunc[I]);
    }
    LogicOut(Elem, TermO);
    return "";
}

function LogicStdNAND(Elem, TermI, TermO)
{
    if ((TermI < 1) || (TermI > 10))
    {
        return "NAND element must have from 1 to 10 input terminals";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "NAND element must have from 1 to 10 output terminals";
    }
    LogicStdAND(Elem, TermI, TermO);
    Elem.Name = LogicConvName("NAND");
    LogicNeg(Elem, TermI, TermO);
    return "";
}

function LogicStdOR(Elem, TermI, TermO)
{
    if ((TermI < 1) || (TermI > 10))
    {
        return "OR element must have from 1 to 10 input terminals";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "OR element must have from 1 to 10 output terminals";
    }
    Elem.SetTerm(TermI, TermO, LogicDefault());
    Elem.Name = LogicConvName("OR");
    Elem.Type = 1;
    var LogicFunc = LogicGenTable(TermI);
    var LogicFuncL = LogicFunc.length;
    for (var I = 0; I < LogicFuncL; I++)
    {
        LogicFunc[I].push(LogicCalcOR(TermI, LogicFunc[I]));
        Elem.SetFunc(LogicFunc[I]);
    }
    LogicOut(Elem, TermO);
    return "";
}

function LogicStdNOR(Elem, TermI, TermO)
{
    if ((TermI < 1) || (TermI > 10))
    {
        return "NOR element must have from 1 to 10 input terminals";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "NOR element must have from 1 to 10 output terminals";
    }
    LogicStdOR(Elem, TermI, TermO);
    Elem.Name = LogicConvName("NOR");
    LogicNeg(Elem, TermI, TermO);
    return "";
}

function LogicStdXOR(Elem, TermI, TermO)
{
    if ((TermI < 1) || (TermI > 10))
    {
        return "XOR element must have from 1 to 10 input terminals";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "XOR element must have from 1 to 10 output terminals";
    }
    Elem.SetTerm(TermI, TermO, LogicDefault());
    Elem.Name = LogicConvName("XOR");
    Elem.Type = 1;
    var LogicFunc = LogicGenTable(TermI);
    var LogicFuncL = LogicFunc.length;
    var LogicVal;
    for (var I = 0; I < LogicFuncL; I++)
    {
        LogicVal = LogicFunc[I][0];
        for (var II = 1; II < TermI; II++)
        {
            LogicVal = LogicCalcXOR(LogicVal, LogicFunc[I][II]);
        }
        LogicFunc[I].push(LogicVal);
        Elem.SetFunc(LogicFunc[I]);
    }
    LogicOut(Elem, TermO);
    return "";
}

function LogicStdXNOR(Elem, TermI, TermO)
{
    if ((TermI < 1) || (TermI > 10))
    {
        return "XNOR element must have from 1 to 10 input terminals";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "XNOR element must have from 1 to 10 output terminals";
    }
    Elem.SetTerm(TermI, TermO, LogicDefault());
    Elem.Name = LogicConvName("XNOR");
    Elem.Type = 1;
    var LogicFunc = LogicGenTable(TermI);
    var LogicFuncL = LogicFunc.length;
    var LogicVal;
    for (var I = 0; I < LogicFuncL; I++)
    {
        if (TermI > 1)
        {
            LogicVal = LogicFunc[I][0];
        }
        else
        {
            LogicVal = LogicCalcNOT(LogicFunc[I][0]);
        }
        for (var II = 1; II < TermI; II++)
        {
            LogicVal = LogicCalcXNOR(LogicVal, LogicFunc[I][II]);
        }
        LogicFunc[I].push(LogicVal);
        Elem.SetFunc(LogicFunc[I]);
    }
    return "";
}

function LogicStdEQU(Elem, TermI, TermO)
{
    if ((TermI < 1) || (TermI > 10))
    {
        return "EQU element must have from 1 to 10 input terminals";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "EQU element must have from 1 to 10 output terminals";
    }
    Elem.SetTerm(TermI, TermO, LogicDefault());
    Elem.Name = LogicConvName("EQU");
    Elem.Type = 1;
    var LogicFunc = LogicGenTable(TermI);
    var LogicFuncL = LogicFunc.length;
    for (var I = 0; I < LogicFuncL; I++)
    {
        LogicFunc[I].push(LogicCalcEQU(TermI, LogicFunc[I]));
        Elem.SetFunc(LogicFunc[I]);
    }
    LogicOut(Elem, TermO);
    return "";
}

function LogicStdNEQU(Elem, TermI, TermO)
{
    if ((TermI < 1) || (TermI > 10))
    {
        return "NEQU element must have from 1 to 10 input terminals";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "NEQU element must have from 1 to 10 output terminals";
    }
    Elem.SetTerm(TermI, TermO, LogicDefault());
    Elem.Name = LogicConvName("NEQU");
    Elem.Type = 1;
    var LogicFunc = LogicGenTable(TermI);
    var LogicFuncL = LogicFunc.length;
    var LogicVal;
    for (var I = 0; I < LogicFuncL; I++)
    {
        LogicFunc[I].push(LogicCalcNEQU(TermI, LogicFunc[I]));
        Elem.SetFunc(LogicFunc[I]);
    }
    LogicOut(Elem, TermO);
    return "";
}


function LogicStdIMP1(Elem, TermI, TermO)
{
    if (TermI != 2)
    {
        return "IMP element must have exactly 2 input terminals";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "IMP element must have from 1 to 10 output terminals";
    }
    Elem.SetTerm(TermI, TermO, LogicDefault());
    Elem.Name = LogicConvName("IMP");
    Elem.Type = 1;
    var LogicFunc = LogicGenTable(2);
    var LogicFuncL = LogicFunc.length;
    for (var I = 0; I < LogicFuncL; I++)
    {
        LogicFunc[I].push(LogicCalcImp(LogicFunc[I][0], LogicFunc[I][1]));
        Elem.SetFunc(LogicFunc[I]);
    }
    LogicOut(Elem, TermO);
    return "";
}

function LogicStdNIMP1(Elem, TermI, TermO)
{
    if (TermI != 2)
    {
        return "NIMP element must have exactly 2 input terminals";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "NIMP element must have from 1 to 10 output terminals";
    }
    LogicStdIMP1(Elem, TermI, TermO);
    Elem.Name = LogicConvName("NIMP");
    LogicNeg(Elem, 2, TermO);
    return "";
}

function LogicStdIMP2(Elem, TermI, TermO)
{
    if (TermI != 2)
    {
        return "CON element must have exactly 2 input terminals";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "CON element must have from 1 to 10 output terminals";
    }
    Elem.SetTerm(TermI, TermO, LogicDefault());
    Elem.Name = LogicConvName("CON");
    Elem.Type = 1;
    var LogicFunc = LogicGenTable(2);
    var LogicFuncL = LogicFunc.length;
    for (var I = 0; I < LogicFuncL; I++)
    {
        LogicFunc[I].push(LogicCalcImp(LogicFunc[I][1], LogicFunc[I][0]));
        Elem.SetFunc(LogicFunc[I]);
    }
    LogicOut(Elem, TermO);
    return "";
}

function LogicStdNIMP2(Elem, TermI, TermO)
{
    if (TermI != 2)
    {
        return "NCON element must have exactly 2 input terminals";
    }
    if ((TermO < 1) || (TermO > 10))
    {
        return "NCON element must have from 1 to 10 output terminals";
    }
    LogicStdIMP2(Elem, TermI, TermO);
    Elem.Name = LogicConvName("NCON");
    LogicNeg(Elem, 2, TermO);
    return "";
}


