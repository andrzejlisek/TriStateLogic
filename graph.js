var LogicSvg = document.getElementById("LogicSvg");
var LogicSvgScr = document.getElementById("LogicSvgScr");



var WorkMode = 0;

function SetWorkMode()
{
    WorkMode = document.getElementById("WorkMode").selectedIndex;
}

var TruthX = 2;
var TruthY = 4;
var TruthX_ = 2;
var TruthY_ = 2;
var TruthW = 2;
var TruthH = 2;
var TruthLinesPos = 0;
var TruthLinesLast = -1;

function GetTerminalX(Elem, N)
{
    var T = 0;
    if ((Elem.Rot == 0) || (Elem.Rot == 2) || (Elem.Rot == 5) || (Elem.Rot == 7))
    {
        if (N < 0)
        {
            T = 0 - ConfGridStep * ConfElementSize - ConfGridStep;
        }
        if (N > 0)
        {
            T = 0 + ConfGridStep * ConfElementSize + ConfGridStep;
        }
        if ((Elem.Rot == 2) || (Elem.Rot == 5))
        {
            T = 0 - T;
        }
    }
    else
    {
        if (N < 0)
        {
            T = 0 - (ConfGridStep * 2 * N + (Elem.TermI * ConfGridStep) + ConfGridStep);
        }
        if (N > 0)
        {
            T = 0 + (ConfGridStep * 2 * N - (Elem.TermO * ConfGridStep) - ConfGridStep);
        }
        if ((Elem.Rot == 1) || (Elem.Rot == 6))
        {
            T = 0 - T;
        }
    }
    return T;
}

function GetTerminalY(Elem, N)
{
    if ((Elem.Rot == 0) || (Elem.Rot == 2) || (Elem.Rot == 5) || (Elem.Rot == 7))
    {
        if (N < 0)
        {
            T = 0 - (ConfGridStep * 2 * N + (Elem.TermI * ConfGridStep) + ConfGridStep);
        }
        if (N > 0)
        {
            T = 0 + (ConfGridStep * 2 * N - (Elem.TermO * ConfGridStep) - ConfGridStep);
        }
        if ((Elem.Rot == 2) || (Elem.Rot == 7))
        {
            T = 0 - T;
        }
    }
    else
    {
        if (N < 0)
        {
            T = 0 - ConfGridStep * ConfElementSize - ConfGridStep;
        }
        if (N > 0)
        {
            T = 0 + ConfGridStep * ConfElementSize + ConfGridStep;
        }
        if ((Elem.Rot == 3) || (Elem.Rot == 6))
        {
            T = 0 - T;
        }
    }
    return T;
}

var SvgGroups = [];

function RepaintPath()
{
    var ElemPath = "";
    for (var I = 1; I < ViewStackI; I++)
    {
        ElemPath = ElemPath + "->" + Elements[ViewStack[I]].Name;
    }
    if (ViewStackI > 0)
    {
        ElemPath = ElemPath + "->" + Elements[ElementsCurrent].Name;
    }
    document.getElementById("Path").innerHTML = ElemPath;
}

function Repaint()
{
    var TruthLines1 = ConfTruthLines;
    var TruthLines2 = ConfTruthLines + 2;

    RepaintPath();

    if (TruthLinesLast != ElementsCurrent)
    {
        TruthLinesPos = 0;
        TruthLinesLast = ElementsCurrent;
    }

    var LogicInfo = SvgCreate();

    // Get element object
    var Elem = Elements[ElementsCurrent];

    // Clear screen
    SvgAddRect(LogicInfo, 0, 0, ConfCanvasW, ConfCanvasH, "", ConfDrawBack);
    
    // Selecting area
    if ((SelectedElementW > 0) && (SelectedElementH > 0))
    {
        SvgAddRect(LogicInfo, SelectedElementX, SelectedElementY, SelectedElementW, SelectedElementH, "", ConfDrawSele);
    }

    // Scrolling characters
    var ScrollUp = "↑";
    var ScrollDn = "↓";

    // Draw circuit
    if (Elem.Type == 0)
    {
        SvgTextSize = ConfFontSize1;
    
        // Draw elements
        for (var I = 0; I < Elem.Elements.length; I++)
        {
            var Elem_ = Elements[Elem.Elements[I]];
            if (Elem_.Type >= 0)
            {
                var X = Elem_.X * ConfCanvasW / ConfLogicW;
                var Y = Elem_.Y * ConfCanvasH / ConfLogicH;
                
                // Element name
                var NameArray = Elem_.Name.split(ConfNameSeparator[0]);
                var Y_ = 0 - (ConfGridStep * (NameArray.length - 1));
                for (var II = 0; II < NameArray.length; II++)
                {
                    SvgAddText(LogicInfo, X, Y + Y_, NameArray[II], ConfDrawFore)
                    Y_ = Y_ + ConfGridStep;
                    Y_ = Y_ + ConfGridStep;
                }
                
                // Input and output pins
                var ElementH = Elem_.TermI;
                if (Elem_.TermO > Elem_.TermI)
                {
                    ElementH = Elem_.TermO;
                }
                if (ElementH < ConfElementSize)
                {
                    ElementH = ConfElementSize;
                }
                ElementH = ConfGridStep * ElementH;
                var ElemTermX = 0;
                var ElemTermY = 0;
                if ((Elem_.Rot == 0) || (Elem_.Rot == 2) || (Elem_.Rot == 5) || (Elem_.Rot == 7))
                {
                    if ((Elem_.Rot == 0) || (Elem_.Rot == 7))
                    {
                        ElemTermX = 0 + ConfGridStep;
                    }
                    if ((Elem_.Rot == 2) || (Elem_.Rot == 5))
                    {
                        ElemTermX = 0 - ConfGridStep;
                    }
                }
                else
                {
                    if ((Elem_.Rot == 1) || (Elem_.Rot == 4))
                    {
                        ElemTermY = 0 + ConfGridStep;
                    }
                    if ((Elem_.Rot == 3) || (Elem_.Rot == 6))
                    {
                        ElemTermY = 0 - ConfGridStep;
                    }
                }
                for (var II = 1; II <= Elem_.TermI; II++)
                {
                    SvgAddLine(LogicInfo, X + GetTerminalX(Elem_, 0 - II), Y + GetTerminalY(Elem_, 0 - II), X + GetTerminalX(Elem_, 0 - II) + ElemTermX, Y + GetTerminalY(Elem_, 0 - II) + ElemTermY, ConfSignalColor[Elem_.ValI[II - 1]]);
                }
                for (var II = 1; II <= Elem_.TermO; II++)
                {
                    SvgAddLine(LogicInfo, X + GetTerminalX(Elem_, 0 + II), Y + GetTerminalY(Elem_, 0 + II), X + GetTerminalX(Elem_, 0 + II) - ElemTermX, Y + GetTerminalY(Elem_, 0 + II) - ElemTermY, ConfSignalColor[Elem_.ValO[II - 1]]);
                }
                
                // Element border and marker at the first input pin
                var MarkPosX = 0;
                var MarkPosY = 0;
                if ((Elem_.Rot == 0) || (Elem_.Rot == 2) || (Elem_.Rot == 5) || (Elem_.Rot == 7))
                {
                    SvgAddRect(LogicInfo, X - ConfGridStep * ConfElementSize, Y - ElementH, ConfGridStep * (ConfElementSize + ConfElementSize), ElementH + ElementH, ConfDrawFore, "");
                    if ((SelectedElementListN == ElementsCurrent) && (SelectedElementList.includes(I)))
                    {
                        SvgAddRect(LogicInfo, X - ConfGridStep * ConfElementSize + ConfSelectMarkSize, Y - ElementH + ConfSelectMarkSize, ConfGridStep * (ConfElementSize + ConfElementSize) - ConfSelectMarkSize - ConfSelectMarkSize, ElementH + ElementH - ConfSelectMarkSize - ConfSelectMarkSize, ConfDrawFore, "");
                    }
                    if ((Elem_.Rot == 0) || (Elem_.Rot == 5))
                    {
                        MarkPosY = 0 - ElementH;
                    }
                    else
                    {
                        MarkPosY = 0 + ElementH - ConfOrientationMarkSize;
                    }
                    if ((Elem_.Rot == 0) || (Elem_.Rot == 7))
                    {
                        MarkPosX = 0 - ConfGridStep * ConfElementSize;
                    }
                    else
                    {
                        MarkPosX = 0 + ConfGridStep * ConfElementSize - ConfOrientationMarkSize;
                    }
                }
                else
                {
                    SvgAddRect(LogicInfo, X - ElementH, Y - ConfGridStep * ConfElementSize, ElementH + ElementH, ConfGridStep * (ConfElementSize + ConfElementSize), ConfDrawFore, "");
                    if ((SelectedElementListN == ElementsCurrent) && (SelectedElementList.includes(I)))
                    {
                        SvgAddRect(LogicInfo, X - ElementH + ConfSelectMarkSize, Y - ConfGridStep * ConfElementSize + ConfSelectMarkSize, ElementH + ElementH - ConfSelectMarkSize - ConfSelectMarkSize, ConfGridStep * (ConfElementSize + ConfElementSize) - ConfSelectMarkSize - ConfSelectMarkSize, ConfDrawFore, "");
                    }
                    if ((Elem_.Rot == 4) || (Elem_.Rot == 1))
                    {
                        MarkPosY = 0 - ConfGridStep * ConfElementSize;
                    }
                    else
                    {
                        MarkPosY = 0 + ConfGridStep * ConfElementSize - ConfOrientationMarkSize;
                    }
                    if ((Elem_.Rot == 3) || (Elem_.Rot == 4))
                    {
                        MarkPosX = 0 - ElementH;
                    }
                    else
                    {
                        MarkPosX = 0 + ElementH - ConfOrientationMarkSize;
                    }
                }
                SvgAddRect(LogicInfo, X + MarkPosX, Y + MarkPosY, ConfOrientationMarkSize, ConfOrientationMarkSize, ConfDrawFore, "");
            }
        }

        // Draw connections
        for (var I = 0; I < Elem.Conn.length; I++)
        {
            var Conn_ = Elem.Conn[I];
            var Elem_1 = Elements[Elem.Elements[Conn_[0]]];
            var X_1 = Math.round(Elem_1.X * ConfCanvasW / ConfLogicW) + GetTerminalX(Elem_1, 0 + Conn_[1]);
            var Y_1 = Math.round(Elem_1.Y * ConfCanvasH / ConfLogicH) + GetTerminalY(Elem_1, 0 + Conn_[1]);
            var Elem_2 = Elements[Elem.Elements[Conn_[2]]];
            var X_2 = Math.round(Elem_2.X * ConfCanvasW / ConfLogicW) + GetTerminalX(Elem_2, 0 - Conn_[3]);
            var Y_2 = Math.round(Elem_2.Y * ConfCanvasH / ConfLogicH) + GetTerminalY(Elem_2, 0 - Conn_[3]);
            var X_0 = Math.round((X_1 + X_2) / 2);
            var Y_0 = Math.round((Y_1 + Y_2) / 2);
            SvgAddLine(LogicInfo, X_0, Y_0, X_2, Y_2, ConfSignalColor[Elem_2.ValI[Conn_[3] - 1]]);
            SvgAddLine(LogicInfo, X_1, Y_1, X_0, Y_0, ConfSignalColor[Elem_1.ValO[Conn_[1] - 1]]);
        }
    }

    // Draw truth table
    if (Elem.Type == 1)
    {
        SvgTextSize = ConfFontSize2;

        var X = TruthX * ConfGridText;
        var Y = TruthY * ConfGridText;
        SvgAddText(LogicInfo, X, Y, "+", ConfDrawFore)
        SvgAddText(LogicInfo, X, Y + (ConfGridText * TruthH), ScrollUp, ConfDrawFore)
        SvgAddText(LogicInfo, X, Y + (ConfGridText * TruthH * (TruthLines1 + 2)), ScrollDn, ConfDrawFore)

        for (var I = 0; I < Elem.TermI; I++)
        {
            X = (TruthX + (I * TruthW) + 2) * ConfGridText;
            SvgAddText(LogicInfo, X, Y, "I" + I, ConfDrawFore)
            SvgAddText(LogicInfo, X, Y + (ConfGridText * TruthH), ScrollUp, ConfDrawFore)
            SvgAddText(LogicInfo, X, Y + (ConfGridText * TruthH * (TruthLines1 + 2)), ScrollDn, ConfDrawFore)
        }
        for (var I = 0; I < Elem.TermO; I++)
        {
            X = (TruthX + ((Elem.TermI + I + 1) * TruthW)) * ConfGridText;
            SvgAddText(LogicInfo, X, Y, "O" + I, ConfDrawFore)
            SvgAddText(LogicInfo, X, Y + (ConfGridText * TruthH), ScrollUp, ConfDrawFore)
            SvgAddText(LogicInfo, X, Y + (ConfGridText * TruthH * (TruthLines1 + 2)), ScrollDn, ConfDrawFore)
            SvgAddText(LogicInfo, X, Y - (ConfGridText * TruthH), ConfSignalSymbol[Elem.DefaultVal[I]][0], ConfDrawFore)
        }
        Y += ConfGridText * TruthH;
        Y += ConfGridText * TruthH;
        
        for (var II = 0; II < Elem.FuncTable.length; II++)
        {
            X = TruthX * ConfGridText;
            var Val = true;
            var Y_ = Y + ((II - TruthLinesPos) * ConfGridText * TruthH);

            if ((II >= TruthLines1 + TruthLinesPos) || (II < TruthLinesPos))
            {
                Val = false;
            }
            
            if (Val)
            {
                SvgAddText(LogicInfo, X, Y_, "-", ConfDrawFore)
            }
            for (var I = 0; I < Elem.TermI; I++)
            {
                X = (TruthX + (I * TruthW) + 2) * ConfGridText;
                if (Val)
                {
                    SvgAddText(LogicInfo, X, Y_, ConfSignalSymbol[Elem.FuncTable[II][I]][0], ConfDrawFore)
                }
            }
            for (var I = 0; I < Elem.TermO; I++)
            {
                X = (TruthX + ((Elem.TermI + I + 1) * TruthW)) * ConfGridText;
                if (Val)
                {
                    SvgAddText(LogicInfo, X, Y_, ConfSignalSymbol[Elem.FuncTable[II][I + Elem.TermI]][0], ConfDrawFore)
                }
            }
        }
    }
    
    // Draw input and output assignment
    if (Elem.Type == 2)
    {
        SvgTextSize = ConfFontSize2;

        var X = TruthX_ * ConfGridText;
        var Y = TruthY_ * ConfGridText;
        SvgAddText(LogicInfo, X + (0 * TruthW * ConfGridText), Y, ScrollUp, ConfDrawFore);
        SvgAddText(LogicInfo, X + (1 * TruthW * ConfGridText), Y, ScrollUp, ConfDrawFore);
        SvgAddText(LogicInfo, X + (2 * TruthW * ConfGridText), Y, ScrollUp, ConfDrawFore);
        SvgAddText(LogicInfo, X + (3 * TruthW * ConfGridText), Y, ScrollUp, ConfDrawFore);
        SvgAddText(LogicInfo, X + (0 * TruthW * ConfGridText), Y + (ConfGridText * TruthH * (TruthLines2 + 1)), ScrollDn, ConfDrawFore);
        SvgAddText(LogicInfo, X + (1 * TruthW * ConfGridText), Y + (ConfGridText * TruthH * (TruthLines2 + 1)), ScrollDn, ConfDrawFore);
        SvgAddText(LogicInfo, X + (2 * TruthW * ConfGridText), Y + (ConfGridText * TruthH * (TruthLines2 + 1)), ScrollDn, ConfDrawFore);
        SvgAddText(LogicInfo, X + (3 * TruthW * ConfGridText), Y + (ConfGridText * TruthH * (TruthLines2 + 1)), ScrollDn, ConfDrawFore);


        for (var I = 0; I < Elem.TermI; I++)
        {
            if ((I >= TruthLinesPos) && (I < (TruthLines2 + TruthLinesPos)))
            {
                Y = (TruthY_ + ((I + 1 - TruthLinesPos) * TruthH)) * ConfGridText;
                SvgAddText(LogicInfo, X + (0 * TruthW * ConfGridText), Y, "I" + I, ConfDrawFore);
                SvgAddText(LogicInfo, X + (1 * TruthW * ConfGridText), Y, "←", ConfDrawFore);
                SvgAddText(LogicInfo, X + (3 * TruthW * ConfGridText), Y, "→", ConfDrawFore);
            }
        }
        for (var I = 0; I < Elem.TermO; I++)
        {
            if (((I + Elem.TermI) >= TruthLinesPos) && ((I + Elem.TermI) < (TruthLines2 + TruthLinesPos)))
            {
                Y = (TruthY_ + (Elem.TermI * TruthH) + ((I + 1 - TruthLinesPos) * TruthH)) * ConfGridText;
                SvgAddText(LogicInfo, X + (0 * TruthW * ConfGridText), Y, "O" + I, ConfDrawFore);
                SvgAddText(LogicInfo, X + (1 * TruthW * ConfGridText), Y, "←", ConfDrawFore);
                SvgAddText(LogicInfo, X + (3 * TruthW * ConfGridText), Y, "→", ConfDrawFore);
            }
        }
        for (var I = 0; I < Elem.FuncTable.length; I++)
        {
            var Y = 0;
            if (Elem.FuncTable[I][0] == 0)
            {
                Y = ((Elem.FuncTable[I][1] - TruthLinesPos)) + (Elem.TermI);
            }
            else
            {
                Y = ((Elem.FuncTable[I][1] - TruthLinesPos));
            }
            if ((Y >= 0) && (Y < TruthLines2))
            {
                Y = (TruthY_ + ((Y + 1) * TruthH)) * ConfGridText;
                if (Elem.FuncTable[I][2] < 10)
                {
                    SvgAddText(LogicInfo, X + (2 * TruthW * ConfGridText), Y, Elem.FuncTable[I][2], ConfDrawFore);
                }
                else
                {
                    SvgAddText(LogicInfo, X + (2 * TruthW * ConfGridText), Y, ConfSignalSymbol[Elem.FuncTable[I][2] - 10][0], ConfDrawFore);
                }
            }
        }
    }

    // Remove groups
    for (var I = 0; I < SvgGroups.length; I++)
    {
        SvgRemove(SvgGroups[I]);
    }
    SvgGroups = [];
    
    // Push new group
    SvgGroups.push(LogicInfo);
    SvgAdd(LogicInfo);
}

var MouseBtn = false;
var MouseX = 0;
var MouseY = 0;
var MouseX_ = 0;
var MouseY_ = 0;

var SelectedElement = -1;
var SelectedElement0 = -1;
var SelectedElementTerminal = 0;
var SelectedElementTerminal0 = 0;

function MouseDown(X, Y)
{
    MouseX = X;
    MouseY = Y;
    MouseX_ = X;
    MouseY_ = Y;
    SelectedElement0 = SelectedElement;
    SelectedElementTerminal0 = SelectedElementTerminal;
    SelectedElement = -1;
    SelectedElementTerminal = 0;

    var TruthLines1 = ConfTruthLines;
    var TruthLines2 = ConfTruthLines + 2;
    
    // Get element object
    var Elem = Elements[ElementsCurrent];

    // Circuit
    if (Elem.Type == 0)
    {
        var OutOfElement = true;
        for (var I = 0; I < Elem.Elements.length; I++)
        {
            var Elem_ = Elements[Elem.Elements[I]];
            if (Elem_.Type >= 0)
            {
                var X = Elem_.X * ConfCanvasW / ConfLogicW;
                var Y = Elem_.Y * ConfCanvasH / ConfLogicH;

                var ElementH = Elem_.TermI;
                if (Elem_.TermO > Elem_.TermI)
                {
                    ElementH = Elem_.TermO;
                }
                ElementH = ConfGridStep * ElementH;
                var ElemX;
                var ElemY;
                var ElemW;
                var ElemH;
                
                if ((Elem_.Rot == 0) || (Elem_.Rot == 2) || (Elem_.Rot == 5) || (Elem_.Rot == 7))
                {
                    ElemX = X - ConfGridStep * ConfElementSize;
                    ElemY = Y - ElementH;
                    ElemW = ConfGridStep * (ConfElementSize + ConfElementSize);
                    ElemH = ElementH + ElementH;
                }
                else
                {
                    ElemX = X - ElementH;
                    ElemY = Y - ConfGridStep * ConfElementSize;
                    ElemW = ElementH + ElementH;
                    ElemH = ConfGridStep * (ConfElementSize + ConfElementSize);
                }
                
                ElemX -= ConfGridStep;
                ElemY -= ConfGridStep;
                ElemW += ConfGridStep;
                ElemW += ConfGridStep;
                ElemH += ConfGridStep;
                ElemH += ConfGridStep;

                if ((MouseX >= ElemX) && (MouseY >= ElemY) && (MouseX <= (ElemX + ElemW)) && (MouseY <= (ElemY + ElemH)))
                {
                    OutOfElement = false;
                
                    SelectedElement = I;
                    var ElemX_;
                    var ElemY_;
                    var ElemW_ = ConfGridStep + ConfGridStep;
                    var ElemH_ = ConfGridStep + ConfGridStep;

                    for (var II = 1; II <= Elem_.TermI; II++)
                    {
                        ElemX_ = X + GetTerminalX(Elem_, 0 - II) - ConfGridStep;
                        ElemY_ = Y + GetTerminalY(Elem_, 0 - II) - ConfGridStep;
                        if ((MouseX >= ElemX_) && (MouseY >= ElemY_) && (MouseX <= (ElemX_ + ElemW_)) && (MouseY <= (ElemY_ + ElemH_)))
                        {
                            SelectedElementTerminal = 0 - II;
                        }
                    }
                    for (var II = 1; II <= Elem_.TermO; II++)
                    {
                        ElemX_ = X + GetTerminalX(Elem_, 0 + II) - ConfGridStep;
                        ElemY_ = Y + GetTerminalY(Elem_, 0 + II) - ConfGridStep;
                        if ((MouseX >= ElemX_) && (MouseY >= ElemY_) && (MouseX <= (ElemX_ + ElemW_)) && (MouseY <= (ElemY_ + ElemH_)))
                        {
                            SelectedElementTerminal = 0 + II;
                        }
                    }
                    
                    if (WorkMode == 0)
                    {
                        if (SelectedElementTerminal != 0)
                        {
                            Elem_.Rot++;
                            if (Elem_.Rot >= 8)
                            {
                                Elem_.Rot = 0;
                            }
                            SelectedElement = -1;
                        }
                        Repaint();
                    }
                    if (WorkMode == 1)
                    {
                        if (SelectedElementTerminal != 0)
                        {
                            if ((SelectedElementTerminal0 != 0) && (SelectedElementTerminal != 0))
                            {
                                if (((SelectedElementTerminal0 * SelectedElementTerminal) < 0))
                                {
                                    if (SelectedElementTerminal < 0)
                                    {
                                        if (SelectedElement >= 0)
                                        {
                                            Elem.SetConn(SelectedElement0, SelectedElementTerminal0, SelectedElement, 0 - SelectedElementTerminal);
                                        }
                                    }
                                    else
                                    {
                                        if (SelectedElement >= 0)
                                        {
                                            Elem.SetConn(SelectedElement, SelectedElementTerminal, SelectedElement0, 0 - SelectedElementTerminal0);
                                        }
                                    }
                                }
                                SelectedElement0 = -1;
                                SelectedElement = -1;
                                SelectedElementTerminal0 = 0;
                                SelectedElementTerminal = 0;
                            }
                        }
                        else
                        {
                            for (var II = 0; II < Elements.length; II++)
                            {
                                if (Elements[II] === Elem_)
                                {
                                    ViewStack[ViewStackI] = ElementsCurrent;
                                    ViewStackI++;
                                    ElementsCurrent = II;
                                }
                            }
                        }
                        Repaint();
                    }
                    if (WorkMode == 2)
                    {
                        if (SelectedElementTerminal == 0)
                        {
                            Elem_.Name = PromptChange("Element name", Elem_.Name);
                        }
                        else
                        {
                            RemoveElement(SelectedElement);
                        }
                        Repaint();
                    }
                    if (WorkMode == 3)
                    {
                        if (NewElement(document.getElementById("BoolFunction").selectedIndex, SelectedElement, false))
                        {
                            SelectedElementList = [];
                            SelectedElementListN = ElementsCurrent;
                            SelectedElementList.push(SelectedElement);
                            Repaint();
                        }
                    }
                }
            }
        }
        
        if (OutOfElement)
        {
            if (WorkMode == 1)
            {
                Elem.Propagation = parseInt(PromptChange("Propagation cycle", Elem.Propagation));
            }
            if (WorkMode == 3)
            {
                Repaint();
                if (NewElement(document.getElementById("BoolFunction").selectedIndex, -1, false))
                {
                    SelectedElementList = [];
                    SelectedElementListN = ElementsCurrent;
                    SelectedElementList.push(Elem.Elements.length - 1);
                    Repaint();
                }
            }
        }

        
    }
    
    // Truth table
    if (Elem.Type == 1)
    {

        var X = TruthX * ConfGridText;
        var Y = TruthY * ConfGridText;
        if ((MouseX > (X - ConfGridText)) && (MouseX < (X + ConfGridText)) && (MouseY > (Y - ConfGridText)) && (MouseY < (Y + ConfGridText)))
        {
            var Tbl = [];
            for (var I = 0; I < (Elem.TermI + Elem.TermO); I++)
            {
                Tbl.push(2);
            }
            Elem.FuncTable.push(Tbl);
        }
        Y -= ConfGridText * TruthH;
        for (var I = 0; I < Elem.TermO; I++)
        {
            X = (TruthX + ((Elem.TermI + I + 1) * TruthW)) * ConfGridText;
            if ((MouseX > (X - ConfGridText)) && (MouseX < (X + ConfGridText)) && (MouseY > (Y - ConfGridText)) && (MouseY < (Y + ConfGridText)))
            {
                Elem.DefaultVal[I]++;
                if (Elem.DefaultVal[I] == ConfSignalSymbol.length)
                {
                    Elem.DefaultVal[I] = 0;
                }
            }
        }
        Y += ConfGridText * TruthH;
        Y += ConfGridText * TruthH;
        
        var ClickLine = -1;
        var ClickCol = -1;
        
        for (var II = 0; II < (TruthLines1 + 2); II++)
        {
            X = TruthX * ConfGridText
            var Y_ = Y + ((II) * ConfGridText * TruthH);

            if ((MouseX > (X - ConfGridText)) && (MouseX < (X + ConfGridText)) && (MouseY > (Y_ - ConfGridText)) && (MouseY < (Y_ + ConfGridText)))
            {
                ClickLine = II;
                ClickCol = -1;
            }

            for (var I = 0; I < Elem.TermI; I++)
            {
                X = (TruthX + (I * TruthW) + 2) * ConfGridText;
                if ((MouseX > (X - ConfGridText)) && (MouseX < (X + ConfGridText)) && (MouseY > (Y_ - ConfGridText)) && (MouseY < (Y_ + ConfGridText)))
                {
                    ClickLine = II;
                    ClickCol = I;
                }
            }
            for (var I = 0; I < Elem.TermO; I++)
            {
                X = (TruthX + ((Elem.TermI + I + 1) * TruthW)) * ConfGridText;
                if ((MouseX > (X - ConfGridText)) && (MouseX < (X + ConfGridText)) && (MouseY > (Y_ - ConfGridText)) && (MouseY < (Y_ + ConfGridText)))
                {
                    ClickLine = II;
                    ClickCol = I + Elem.TermI;
                }
            }
        }
        
        if (ClickLine >= 0)
        {
            var Act = true;
            if ((ClickLine == 0) && (TruthLinesPos > 0))
            {
                TruthLinesPos--;
                Act = false;
            }
            if (((ClickLine) == (TruthLines1 + 1)) && (TruthLinesPos < (Elem.FuncTable.length - TruthLines1)))
            {
                TruthLinesPos++;
                Act = false;
            }
            if ((ClickLine > 0) && ((ClickLine) < (TruthLines1 + 1)))
            {
                var ItemPos = ClickLine - 1 + TruthLinesPos;
                if (Elem.FuncTable.length > ItemPos)
                {
                    if (ClickCol >= 0)
                    {
                        Elem.FuncTable[ItemPos][ClickCol]++;
                        if (Elem.FuncTable[ItemPos][ClickCol] == ConfSignalSymbol.length)
                        {
                            Elem.FuncTable[ItemPos][ClickCol] = 0;
                        }
                    }
                    else
                    {
                        Elem.FuncTable.splice(ItemPos, 1);
                    }
                }
            }
        }
        Repaint();
    }
    
    // Input/Output
    if (Elem.Type == 2)
    {
        var X = TruthX_ * ConfGridText;
        var Y = TruthY_ * ConfGridText;
        var X1 = X + (ConfGridText * 2);
        var X2 = X + (ConfGridText * 6);
        var BtnDec = 0;
        var BtnInc = 0;

        if ((MouseX > (X - ConfGridText)) && (MouseY > (Y - ConfGridText)) && (MouseX < (X - ConfGridText + 4 * TruthW * ConfGridText)) && (MouseY < (Y + ConfGridText)))
        {
            if (TruthLinesPos > 0)
            {
                TruthLinesPos--;
            }
        }
        if ((MouseX > (X - ConfGridText)) && (MouseY > (Y - ConfGridText + ((TruthLines2 + 1) * TruthH * ConfGridText))) && (MouseX < (X - ConfGridText + 4 * TruthW * ConfGridText)) && (MouseY < (Y + ConfGridText + ((TruthLines2 + 1) * TruthH * ConfGridText))))
        {
            if (TruthLinesPos < (Elem.TermI + Elem.TermO - TruthLines2))
            {
                TruthLinesPos++;
            }
        }

        for (var I = 0; I < TruthLines2; I++)
        {
            Y = ((TruthY_) * ConfGridText) + ((I + 1) * TruthH * ConfGridText);
            if ((MouseY > (Y - ConfGridText)) && (MouseY < (Y + ConfGridText)))
            {
                if ((MouseX > (X + (1 * ConfGridText))) && (MouseX < (X + (3 * ConfGridText))))
                {
                    if (((I + TruthLinesPos) < Elem.TermI))
                    {
                        BtnDec = 0 - 1 - I - TruthLinesPos;
                    }
                    if (((I + TruthLinesPos) >= Elem.TermI) && ((I + TruthLinesPos) < (Elem.TermI + Elem.TermO)))
                    {
                        BtnDec = 0 + 1 + I + TruthLinesPos - Elem.TermI;
                    }
                }
                if ((MouseX > (X + (5 * ConfGridText))) && (MouseX < (X + (7 * ConfGridText))))
                {
                    if (((I + TruthLinesPos) < Elem.TermI))
                    {
                        BtnInc = 0 - 1 - I - TruthLinesPos;
                    }
                    if (((I + TruthLinesPos) >= Elem.TermI) && ((I + TruthLinesPos) < (Elem.TermI + Elem.TermO)))
                    {
                        BtnInc = 0 + 1 + I + TruthLinesPos - Elem.TermI;
                    }
                }
            }
        }

        if (BtnDec != 0)
        {
            Elem.SetIO(BtnDec, -1);
        }
        if (BtnInc != 0)
        {
            Elem.SetIO(BtnInc, +1);
        }
        Repaint();
    }
}

var SelectedElementListN = -1;
var SelectedElementList = [];
var SelectedElementX = -1;
var SelectedElementY = -1;
var SelectedElementW = -1;
var SelectedElementH = -1;

function MouseMove(X, Y)
{
    if (WorkMode == 0)
    {
        if (SelectedElementTerminal == 0)
        {
            var SelectedElementList0;
            if (SelectedElement >= 0)
            {
                SelectedElementList0 = [SelectedElement];
                var Elem = Elements[Elements[ElementsCurrent].Elements[SelectedElement]];
                var X__ = Math.round(Elem.X * ConfCanvasW / ConfLogicW) - MouseX;
                var Y__ = Math.round(Elem.Y * ConfCanvasH / ConfLogicH) - MouseY;
                Elem.X = Math.round((X + X__) * ConfLogicW / ConfCanvasW);
                Elem.Y = Math.round((Y + Y__) * ConfLogicH / ConfCanvasH);
            }
            else
            {
                if ((SelectedElementList.length > 0) && (SelectedElementListN == ElementsCurrent))
                {
                    SelectedElementList0 = SelectedElementList;
                }
                else
                {
                    SelectedElementList0 = [];
                    for (var I = 0; I < Elements[ElementsCurrent].Elements.length; I++)
                    {
                        SelectedElementList0.push(I);
                    }
                }
                for (var I = 0; I < SelectedElementList0.length; I++)
                {
                    var Elem = Elements[Elements[ElementsCurrent].Elements[SelectedElementList0[I]]];
                    var X__ = Math.round(Elem.X * ConfCanvasW / ConfLogicW) - MouseX;
                    var Y__ = Math.round(Elem.Y * ConfCanvasH / ConfLogicH) - MouseY;
                    Elem.X = Math.round((X + X__) * ConfLogicW / ConfCanvasW);
                    Elem.Y = Math.round((Y + Y__) * ConfLogicH / ConfCanvasH);
                }
            }
        }
    }
    if (WorkMode == 2)
    {
        if ((SelectedElementTerminal == 0) && (SelectedElement < 0))
        {
            SelectedElementListN = ElementsCurrent;
            SelectedElementList = [];
            for (var I = 0; I < Elements[ElementsCurrent].Elements.length; I++)
            {
                var Elem = Elements[Elements[ElementsCurrent].Elements[I]];
                var X__ = Math.round(Elem.X * ConfCanvasW / ConfLogicW);
                var Y__ = Math.round(Elem.Y * ConfCanvasH / ConfLogicH);
                var XSel = false;
                var YSel = false;
                if ((X > MouseX_) && (X > X__) && (MouseX_ < X__))
                {
                    XSel = true;
                }
                if ((X < MouseX_) && (X < X__) && (MouseX_ > X__))
                {
                    XSel = true;
                }
                if ((Y > MouseY_) && (Y > Y__) && (MouseY_ < Y__))
                {
                    YSel = true;
                }
                if ((Y < MouseY_) && (Y < Y__) && (MouseY_ > Y__))
                {
                    YSel = true;
                }
                if (XSel && YSel)
                {
                    SelectedElementList.push(I);
                }
            }
            if (X > MouseX_)
            {
                SelectedElementX = MouseX_;
                SelectedElementW = X - MouseX_ + 1;
            }
            else
            {
                SelectedElementX = X;
                SelectedElementW = MouseX_ - X + 1;
            }
            if (Y > MouseY_)
            {
                SelectedElementY = MouseY_;
                SelectedElementH = Y - MouseY_ + 1;
            }
            else
            {
                SelectedElementY = Y;
                SelectedElementH = MouseY_ - Y + 1;
            }
        }
    }
    MouseX = X;
    MouseY = Y;
    Repaint();
}

function MouseUp(X, Y)
{
    SelectedElementX = -1;
    SelectedElementY = -1;
    SelectedElementW = -1;
    SelectedElementH = -1;
    Repaint();
}


function MouseDown_(Evt)
{
    var _ = LogicSvg.getBoundingClientRect();
    MouseBtn = true;
    MouseDown(Evt.clientX + window.scrollX - _.left, Evt.clientY + window.scrollX - _.top);
}

function MouseMove_(Evt)
{
    if (MouseBtn)
    {
        var _ = LogicSvg.getBoundingClientRect();
        MouseMove(Evt.clientX + window.scrollX - _.left, Evt.clientY + window.scrollX - _.top);
    }
}

function MouseUp_(Evt)
{
    var _ = LogicSvg.getBoundingClientRect();
    MouseUp(Evt.clientX + window.scrollX - _.left, Evt.clientY + window.scrollX - _.top);
    MouseBtn = false;
}


function Reset()
{
    var SelectedElementList0;
    if ((SelectedElementList.length > 0) && (SelectedElementListN == ElementsCurrent))
    {
        SelectedElementList0 = SelectedElementList;
    }
    else
    {
        SelectedElementList0 = [];
        for (var I = 0; I < Elements[ElementsCurrent].Elements.length; I++)
        {
            SelectedElementList0.push(I);
        }
    }
    SelectedElementList = [];
    SelectedElementListN = ElementsCurrent;
    for (var I = 0; I < SelectedElementList0.length; I++)
    {
        if (ResetElement(SelectedElementList0[I]))
        {
            SelectedElementList.push(SelectedElementList0[I]);
        }
    }
    Repaint();
}



var SvgLineWidth = "1";
var SvgTextAlign = "middle";
var SvgTextSize = "12px";



function SvgAddRect(Group, X, Y, W, H, StrokeColor, FillColor)
{
    var Temp = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    Temp.setAttribute("x", X);
    Temp.setAttribute("y", Y);
    Temp.setAttribute("width", W);
    Temp.setAttribute("height", H);
    Temp.setAttribute("shape-rendering", "crispEdges");
    if (StrokeColor)
    {
        Temp.setAttribute("stroke", StrokeColor);
        Temp.setAttribute("stroke-width", SvgLineWidth);
    }
    if (FillColor)
    {
        Temp.setAttribute("fill", FillColor);
    }
    else
    {
        Temp.setAttribute("fill", "none");
    }
    Group.appendChild(Temp);
}

function SvgAddCircle(Group, X, Y, R, StrokeColor, FillColor)
{
    var Temp = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    Temp.setAttribute("cx", X);
    Temp.setAttribute("cy", Y);
    Temp.setAttribute("r", R);
    if (StrokeColor)
    {
        Temp.setAttribute("stroke", StrokeColor);
        Temp.setAttribute("stroke-width", SvgLineWidth);
    }
    if (FillColor)
    {
        Temp.setAttribute("fill", FillColor);
    }
    Group.appendChild(Temp);
}

function SvgAddText(Group, X, Y, T, TextColor)
{
    var Temp = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    Temp.setAttribute("x", X);
    Temp.setAttribute("y", Y);
    Temp.setAttribute("text-anchor", SvgTextAlign);
    Temp.setAttribute("dominant-baseline", "central");
//    Temp.setAttribute("alignment-baseline", "middle");
    Temp.setAttribute("font-size", SvgTextSize);
    Temp.setAttribute("font-family", ConfFontName);
/// Verdana, Helvetica, Arial, sans-serif

    var Temp_ = document.createTextNode(T);
    Temp.appendChild(Temp_);
    Temp.setAttribute("fill", TextColor);
    Group.appendChild(Temp);
}

function SvgAddLine(Group, X1, Y1, X2, Y2, StrokeColor)
{
    var Temp = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    Temp.setAttribute("shape-rendering", "crispEdges");
    Temp.setAttribute("x1", X1);
    Temp.setAttribute("y1", Y1);
    Temp.setAttribute("x2", X2);
    Temp.setAttribute("y2", Y2);
    Temp.setAttribute("stroke", StrokeColor);
    Temp.setAttribute("stroke-width", SvgLineWidth);
    Group.appendChild(Temp);
}

function SvgAddPolygon(Group, PointList, StrokeColor, FillColor)
{
    var Temp = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
    Temp.setAttribute("points", PointList);
    if (StrokeColor)
    {
        Temp.style.stroke = StrokeColor;
        Temp.style.strokeWidth = SvgLineWidth;
    }
    if (FillColor)
    {
        Temp.style.fill = FillColor;
    }
    Group.appendChild(Temp);
}

function SvgCreate()
{
    var Group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    return Group;
}

function SvgAdd(Group)
{
    LogicSvg.appendChild(Group);
    //!!LogicSvg.appendChild(SvgBack);
    /*if (SvgPlayer)
    {
        LogicSvg.appendChild(SvgPlayer);
    }*/
    LogicSvg.appendChild(LogicSvgTxt);
    LogicSvg.appendChild(LogicSvgScr);
}

function SvgRemove(Group)
{
    if (Group)
    {
        Group.remove();
    }
}

