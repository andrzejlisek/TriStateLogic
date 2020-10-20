var LogicConvention = 0;


// 0 - Classic
// 1 - Both/None negation
// 2 - Sobocinski ternary
// 3 - Binary with error
// 4 - Lukasiewicz ternary
function SetConvention()
{
    LogicConvention = document.getElementById("LogicConvention").selectedIndex;
}

function LogicConvName(N)
{
    switch (LogicConvention)
    {
        case 0: return N;
        case 1: return N + "|B/N";
        case 2: return N + "|Sob";
        case 3: return N + "|Err";
        case 4: return N + "|Luk";
    }
}

function LogicDefault()
{
    return document.getElementById("LogicDefault").selectedIndex;
}

function LogicCalcNOT(TermVal)
{
    if (TermVal == 0)
    {
        return 1;
    }
    if (TermVal == 1)
    {
        return 0;
    }
    if (LogicConvention == 1)
    {
        if (TermVal == 2)
        {
            return 3;
        }
        if (TermVal == 3)
        {
            return 2;
        }
    }
    return TermVal;
}

function LogicCalcAND(TermI, TermArr)
{
    var LogicArg = [0, 0, 0, 0];
    for (var I = 0; I < TermI; I++)
    {
        LogicArg[TermArr[I]]++;
    }
    if ((LogicConvention == 0) || (LogicConvention == 1))
    {
        if (LogicArg[0] > 0)
        {
            return 0;
        }
        else
        {
            if ((LogicArg[2] == 0) && (LogicArg[3] == 0))
            {
                return 1;
            }
            else
            {
                if ((LogicArg[2] > 0) && (LogicArg[3] > 0))
                {
                    return 0;
                }
                else
                {
                    if (LogicArg[2] > 0)
                    {
                        return 2;
                    }
                    else
                    {
                        return 3;
                    }
                }
            }
        }
    }
    if (LogicConvention == 2)
    {
        if ((LogicArg[0] > 0) || (LogicArg[1] > 0))
        {
            if (LogicArg[0] > 0)
            {
                return 0;
            }
            else
            {
                return 1;
            }
        }
        else
        {
            return 2;
        }
    }
    if (LogicConvention == 3)
    {
        if ((LogicArg[2] > 0) || (LogicArg[3] > 0))
        {
            return 2;
        }
        else
        {
            if (LogicArg[0] > 0)
            {
                return 0;
            }
            else
            {
                return 1;
            }
        }
    }
    if (LogicConvention == 4)
    {
        var Val = 0;
        for (var I = 0; I < TermI; I++)
        {
            switch (TermArr[I])
            {
                case 1:
                    Val += 2;
                    break;
                case 2:
                case 3:
                    Val += 1;
                    break;
            }
        }
        Val = Val - (TermI + TermI - 2);
        if (Val <= 0) { return 0; }
        if (Val >= 2) { return 1; }
        return 2;
    }
}

function LogicCalcOR(TermI, TermArr)
{
    var LogicArg = [0, 0, 0, 0];
    for (var I = 0; I < TermI; I++)
    {
        LogicArg[TermArr[I]]++;
    }
    if ((LogicConvention == 0) || (LogicConvention == 1))
    {
        if (LogicArg[1] > 0)
        {
            return 1;
        }
        else
        {
            if ((LogicArg[2] == 0) && (LogicArg[3] == 0))
            {
                return 0;
            }
            else
            {
                if ((LogicArg[2] > 0) && (LogicArg[3] > 0))
                {
                    return 1;
                }
                else
                {
                    if (LogicArg[2] > 0)
                    {
                        return 2;
                    }
                    else
                    {
                        return 3;
                    }
                }
            }
        }
    }
    if (LogicConvention == 2)
    {
        if ((LogicArg[0] > 0) || (LogicArg[1] > 0))
        {
            if (LogicArg[1] > 0)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        else
        {
            return 2;
        }
    }
    if (LogicConvention == 3)
    {
        if ((LogicArg[2] > 0) || (LogicArg[3] > 0))
        {
            return 2;
        }
        else
        {
            if (LogicArg[1] > 0)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
    }
    if (LogicConvention == 4)
    {
        var Val = 0;
        for (var I = 0; I < TermI; I++)
        {
            switch (TermArr[I])
            {
                case 1:
                    Val += 2;
                    break;
                case 2:
                case 3:
                    Val += 1;
                    break;
            }
        }
        if (Val <= 0) { return 0; }
        if (Val >= 2) { return 1; }
        return 2;
    }
}

// Q = (~(P & Q)) & (P | Q)
function LogicCalcXOR(TermVal1, TermVal2)
{
    if ((TermVal1 < 2) && (TermVal2 < 2))
    {
        if (TermVal1 == TermVal2)
        {
            return 0;
        }
        else
        {
            return 1;
        }
    }
    if (LogicConvention == 0)
    {
        if (((TermVal1 == 2) && (TermVal2 == 3)) || ((TermVal1 == 3) && (TermVal2 == 2))) return 1;
        if ((TermVal1 == 3) || (TermVal2 == 3)) return 3;
        return 2;
    }
    if (LogicConvention == 1)
    {
        if (((TermVal1 == 2) && (TermVal2 == 3)) || ((TermVal1 == 3) && (TermVal2 == 2))) return 1;
        if (TermVal1 == TermVal2) { return 0; }
        if (TermVal1 == 0) return TermVal2;
        if (TermVal2 == 0) return TermVal1;
        if (TermVal1 == 1) return LogicCalcNOT(TermVal2);
        if (TermVal2 == 1) return LogicCalcNOT(TermVal1);
        return 2;
    }
    if (LogicConvention == 2)
    {
        if ((TermVal1 < 2) || (TermVal2 < 2))
        {
            return 1;
        }
        else
        {
            return 2;
        }
    }
    if (LogicConvention == 3)
    {
        return 2;
    }
    if (LogicConvention == 4)
    {
        if (TermVal1 == TermVal2) return 0;
        if (((TermVal1 == 0) && (TermVal2 == 1)) || ((TermVal1 == 1) && (TermVal2 == 0))) return 1;
        return 2;
    }
}

// Q = (~(P | Q)) | (P & Q)
function LogicCalcXNOR(TermVal1, TermVal2)
{
    if ((TermVal1 < 2) && (TermVal2 < 2))
    {
        if (TermVal1 == TermVal2)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
    if (LogicConvention == 0)
    {
        if (((TermVal1 == 2) && (TermVal2 == 3)) || ((TermVal1 == 3) && (TermVal2 == 2))) return 0;
        if ((TermVal1 == 3) || (TermVal2 == 3)) return 3;
        return 2;
    }
    if (LogicConvention == 1)
    {
        if (((TermVal1 == 2) && (TermVal2 == 3)) || ((TermVal1 == 3) && (TermVal2 == 2))) return 0;
        if (TermVal1 == TermVal2) { return 1; }
        if (TermVal1 == 0) return LogicCalcNOT(TermVal2);
        if (TermVal2 == 0) return LogicCalcNOT(TermVal1);
        if (TermVal1 == 1) return TermVal2;
        if (TermVal2 == 1) return TermVal1;
        return 3;
    }
    if (LogicConvention == 2)
    {
        if ((TermVal1 < 2) || (TermVal2 < 2))
        {
            return 0;
        }
        else
        {
            return 2;
        }
    }
    if (LogicConvention == 3)
    {
        return 2;
    }
    if (LogicConvention == 4)
    {
        if (TermVal1 == TermVal2) return 1;
        if (((TermVal1 == 0) && (TermVal2 == 1)) || ((TermVal1 == 1) && (TermVal2 == 0))) return 0;
        return 2;
    }
}

// Q = ~(A & ~B)
// Q = ~A | B
function LogicCalcImp(TermVal1, TermVal2)
{
    if ((TermVal1 < 2) && (TermVal2 < 2))
    {
        if ((TermVal1 == 1) && (TermVal2 == 0))
        {
            return 0;
        }
        else
        {
            return 1;
        }
    }
    if ((LogicConvention == 0) || (LogicConvention == 1))
    {
        if ((TermVal1 == 0) || (TermVal2 == 1))
        {
            return 1;
        }
        if (TermVal1 == 1)
        {
            return TermVal2;
        }
        if (TermVal2 == 0)
        {
            return LogicCalcNOT(TermVal1);
        }
        if (LogicConvention == 0)
        {
            if ((TermVal1 == 2) && (TermVal2 == 2)) { return 2; }
            if ((TermVal1 == 2) && (TermVal2 == 3)) { return 1; }
            if ((TermVal1 == 3) && (TermVal2 == 3)) { return 3; }
            if ((TermVal1 == 3) && (TermVal2 == 2)) { return 1; }
        }
        if (LogicConvention == 1)
        {
            if ((TermVal1 == 2) && (TermVal2 == 2)) { return 1; }
            if ((TermVal1 == 2) && (TermVal2 == 3)) { return 3; }
            if ((TermVal1 == 3) && (TermVal2 == 3)) { return 1; }
            if ((TermVal1 == 3) && (TermVal2 == 2)) { return 2; }
        }
    }
    if (LogicConvention == 2)
    {
        if ((TermVal1 >= 2) && (TermVal2 < 2))
        {
            return TermVal2;
        }
        if ((TermVal1 < 2) && (TermVal2 >= 2))
        {
            return 1 - TermVal1;
        }
        return 2;
    }
    if (LogicConvention == 3)
    {
        return 2;
    }
    if (LogicConvention == 4)
    {
        if (TermVal1 == 0)
        {
            return 1;
        }
        if (TermVal1 == 1)
        {
            if (TermVal2 >= 2)
            {
                return 2;
            }
            else
            {
                return TermVal2;
            }
        }
        if (TermVal2 == 0)
        {
            return 2;
        }
        else
        {
            return 1;
        }
    }
}

// Q = (A & B & C) | (~A & ~B & ~C)
// Q = (A & B & C) | ~(A | B | C)
function LogicCalcEQU(TermI, TermArr)
{
    var LogicVal;
    if (LogicConvention != 4)
    {
        LogicVal = [LogicCalcAND(TermI, TermArr), LogicCalcNOT(LogicCalcOR(TermI, TermArr))];
        return LogicCalcOR(2, LogicVal);
    }
    if (LogicConvention == 4)
    {
        LogicConvention = 0;
        LogicVal = [LogicCalcAND(TermI, TermArr), LogicCalcNOT(LogicCalcOR(TermI, TermArr))];
        LogicConvention = 4;
        return LogicCalcOR(2, LogicVal);
    }
}

// Q = (A | B | C) & (~A | ~B | ~C)
// Q = (A | B | C) & ~(A & B & C)
function LogicCalcNEQU(TermI, TermArr)
{
    var LogicVal;
    if (LogicConvention != 4)
    {
        LogicVal = [LogicCalcOR(TermI, TermArr), LogicCalcNOT(LogicCalcAND(TermI, TermArr))];
        return LogicCalcAND(2, LogicVal);
    }
    if (LogicConvention == 4)
    {
        LogicConvention = 0;
        LogicVal = [LogicCalcOR(TermI, TermArr), LogicCalcNOT(LogicCalcAND(TermI, TermArr))];
        LogicConvention = 4;
        return LogicCalcAND(2, LogicVal);
    }
}

