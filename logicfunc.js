function StringSetChar(str, index, replacement)
{
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

var FuncDef_ = "";

function GenTableTempl()
{
    var FuncList = [];

    var T = prompt("Input template", FuncDef_);
    if (T)
    {
        FuncDef_ = T.toUpperCase();
    }
    else
    {
        return;
    }
    var FuncDef = ["", "", "", "", "", "", "", "", "", ""];
    var FuncDefO = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    var FuncDefI = -1;
    var S = "";
    for (var I = 0; I < 10; I++)
    {
        S = S + ConfSignalSymbol[Elements[0].ValI[I]][0];
    }
    
    for (var I = 0; I < FuncDef_.length; I++)
    {
        var C = FuncDef_.substr(I, 1);
        if ((C >= "0") && (C <= "9"))
        {
            FuncDefI++;
            if ((FuncDefI >= 0) && (FuncDefI <= 9))
            {
                FuncDefO[FuncDefI] = parseInt(C);
            }
        }
        else
        {
            if ((FuncDefI >= 0) && (FuncDefI <= 9))
            {
                for (var II = 0; II < ConfSignalSymbol.length; II++)
                {
                    if (ConfSignalSymbol[II].indexOf(C) >= 0)
                    {
                        FuncDef[FuncDefI] = FuncDef[FuncDefI] + ConfSignalSymbol[II][0];
                    }
                }
            }
        }
    }


    if (FuncDefI >= 0)
    {
        for (var I0 = 0; I0 < FuncDef[0].length; I0++)
        {
            S = StringSetChar(S, FuncDefO[0], FuncDef[0][I0]);
            if (FuncDefI >= 1)
            {
                for (var I1 = 0; I1 < FuncDef[1].length; I1++)
                {
                    S = StringSetChar(S, FuncDefO[1], FuncDef[1][I1]);
                    if (FuncDefI >= 2)
                    {
                        for (var I2 = 0; I2 < FuncDef[2].length; I2++)
                        {
                            S = StringSetChar(S, FuncDefO[2], FuncDef[2][I2]);
                            if (FuncDefI >= 3)
                            {
                                for (var I3 = 0; I3 < FuncDef[3].length; I3++)
                                {
                                    S = StringSetChar(S, FuncDefO[3], FuncDef[3][I3]);
                                    if (FuncDefI >= 4)
                                    {
                                        for (var I4 = 0; I4 < FuncDef[4].length; I4++)
                                        {
                                            S = StringSetChar(S, FuncDefO[4], FuncDef[4][I4]);
                                            if (FuncDefI >= 5)
                                            {
                                                for (var I5 = 0; I5 < FuncDef[5].length; I5++)
                                                {
                                                    S = StringSetChar(S, FuncDefO[5], FuncDef[5][I5]);
                                                    if (FuncDefI >= 6)
                                                    {
                                                        for (var I6 = 0; I6 < FuncDef[6].length; I6++)
                                                        {
                                                            S = StringSetChar(S, FuncDefO[6], FuncDef[6][I6]);
                                                            if (FuncDefI >= 7)
                                                            {
                                                                for (var I7 = 0; I7 < FuncDef[7].length; I7++)
                                                                {
                                                                    S = StringSetChar(S, FuncDefO[7], FuncDef[7][I7]);
                                                                    if (FuncDefI >= 8)
                                                                    {
                                                                        for (var I8 = 0; I8 < FuncDef[8].length; I8++)
                                                                        {
                                                                            S = StringSetChar(S, FuncDefO[8], FuncDef[8][I8]);
                                                                            if (FuncDefI >= 9)
                                                                            {
                                                                                for (var I9 = 0; I9 < FuncDef[9].length; I9++)
                                                                                {
                                                                                    S = StringSetChar(S, FuncDefO[9], FuncDef[9][I9]);
                                                                                    {
                                                                                        FuncList.push(S);
                                                                                    }
                                                                                }
                                                                            }
                                                                            else
                                                                            {
                                                                                FuncList.push(S);
                                                                            }
                                                                        }
                                                                    }
                                                                    else
                                                                    {
                                                                        FuncList.push(S);
                                                                    }
                                                                }
                                                            }
                                                            else
                                                            {
                                                                FuncList.push(S);
                                                            }
                                                        }
                                                    }
                                                    else
                                                    {
                                                        FuncList.push(S);
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                FuncList.push(S);
                                            }
                                        }
                                    }
                                    else
                                    {
                                        FuncList.push(S);
                                    }
                                }
                            }
                            else
                            {
                                FuncList.push(S);
                            }
                        }
                    }
                    else
                    {
                        FuncList.push(S);
                    }
                }
            }
            else
            {
                FuncList.push(S);
            }
        }
    }
    else
    {
        FuncList.push(S);
    }


    var FuncListL = FuncList.length;
    var FuncList_ = "";
    for (var I = 0; I < FuncListL; I++)
    {
        FuncList_ = FuncList_ + FuncList[I] + "\n";
    }
    document.getElementById("ImpExp").value = FuncList_;
}

function GenTable()
{
    var FuncList = document.getElementById("ImpExp").value.split("\n");

    var FuncListL = FuncList.length;
    var LogicDefault_ = LogicDefault();
    
    var TempVal = [];
    TempVal[0] = Elements[0].ValI[0];
    TempVal[1] = Elements[0].ValI[1];
    TempVal[2] = Elements[0].ValI[2];
    TempVal[3] = Elements[0].ValI[3];
    TempVal[4] = Elements[0].ValI[4];
    TempVal[5] = Elements[0].ValI[5];
    TempVal[6] = Elements[0].ValI[6];
    TempVal[7] = Elements[0].ValI[7];
    TempVal[8] = Elements[0].ValI[8];
    TempVal[9] = Elements[0].ValI[9];

    for (var I = 0; I < FuncListL; I++)
    {
        if (FuncList[I].length > 0)
        {
            for (var II = 0; II < 10; II++)
            {
                if (FuncList[I].length > II)
                {
                    for (var III = 0; III < ConfSignalSymbol.length; III++)
                    {
                        if (ConfSignalSymbol[III].indexOf(FuncList[I][II]) >= 0)
                        {
                            Elements[0].ValI[II] = III;
                        }
                    }
                }
                FuncList[I] = StringSetChar(FuncList[I], II, ConfSignalSymbol[Elements[0].ValI[II]][0]);
            }
            Process();
            if (FuncList[I].length > 10)
            {
                FuncList[I] = FuncList[I].substr(0, 10);
            }
            FuncList[I] = FuncList[I] + " ";
            for (var II = 0; II < 10; II++)
            {
                FuncList[I] = FuncList[I] + ConfSignalSymbol[Elements[0].ValO[II]][0];
            }
        }
    }

    Elements[0].ValI[0] = TempVal[0];
    Elements[0].ValI[1] = TempVal[1];
    Elements[0].ValI[2] = TempVal[2];
    Elements[0].ValI[3] = TempVal[3];
    Elements[0].ValI[4] = TempVal[4];
    Elements[0].ValI[5] = TempVal[5];
    Elements[0].ValI[6] = TempVal[6];
    Elements[0].ValI[7] = TempVal[7];
    Elements[0].ValI[8] = TempVal[8];
    Elements[0].ValI[9] = TempVal[9];
    Process();

    SetVal(-1, -1);

    var FuncList_ = "";
    for (var I = 0; I < FuncListL; I++)
    {
        if (FuncList[I].length > 10)
        {
            FuncList_ = FuncList_ + FuncList[I] + "\n";
        }
    }
    document.getElementById("ImpExp").value = FuncList_;
}


function GetFormula(FormType)
{
    var Formula = "";
    for (var I = 0; I < 10; I++)
    {
        var FormDef = Elements[0].GetFormula(I, "x", "", FormType);
        if (FormDef != "Undefined")
        {
            Formula = Formula + "y" + I + " = " + FormDef + "\n";
        }
    }
    document.getElementById("ImpExp").value = Formula;
}

