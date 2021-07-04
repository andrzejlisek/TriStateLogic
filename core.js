


var Elements = [];
var ElementsCurrent = 0;

var ViewStack = [];
var ViewStackI = 0;


function Process()
{
    Elements[0].Process();
    Repaint();
    SetVal(-1, 0);
}

function ViewBack(N)
{
    if (ViewStackI > 0)
    {
        ViewStackI--;
        ElementsCurrent = ViewStack[ViewStackI];
    }
    Repaint();
}

function SetVal(N, V)
{
    if (N >= 0)
    {
        Elements[0].ValI[N] = V;
        document.getElementById("ValI" + N).innerHTML = ConfSignalSymbol[Elements[0].ValI[N]][0];
        document.getElementById("t_I" + N).style["background-color"] = ConfSignalColor[Elements[0].ValI[N]];
        Process();
    }
    else
    {
        for (var I = 0; I < 10; I++)
        {
            document.getElementById("ValI" + I).innerHTML = ConfSignalSymbol[Elements[0].ValI[I]][0];
            document.getElementById("t_I" + I).style["background-color"] = ConfSignalColor[Elements[0].ValI[I]];
            document.getElementById("ValO" + I).innerHTML = ConfSignalSymbol[Elements[0].ValO[I]][0];
            document.getElementById("t_O" + I).style["background-color"] = ConfSignalColor[Elements[0].ValO[I]];
        }
    }
}

function SetValBtnOpt()
{
    var Idx1 = document.getElementById("ValBtnOpt1").selectedIndex;
    var Idx2 = document.getElementById("ValBtnOpt2").selectedIndex;
    var Obj0 = document.getElementById("_0");
    var Obj1 = document.getElementById("_1");
    var Obj2 = document.getElementById("_2");
    var Obj3 = document.getElementById("_3");
    if (Idx1 == 0)
    {
        Obj2.style["display"] = "";
        Obj3.style["display"] = "";
    }
    if (Idx1 == 1)
    {
        Obj2.style["display"] = "";
        Obj3.style["display"] = "none";
    }
    if (Idx1 == 2)
    {
        Obj2.style["display"] = "none";
        Obj3.style["display"] = "none";
    }
    if (Idx2 == 0)
    {
        for (var I = 0; I < 10; I++)
        {
            document.getElementById("t_I" + I).width = "10%";
            document.getElementById("t_O" + I).width = "10%";
            document.getElementById("t_I" + I).style["display"] = "";
            document.getElementById("t_O" + I).style["display"] = "";
            document.getElementById("t_0" + I).style["display"] = "";
            document.getElementById("t_1" + I).style["display"] = "";
            document.getElementById("t_2" + I).style["display"] = "";
            document.getElementById("t_3" + I).style["display"] = "";
        }
    }
    if (Idx2 == 1)
    {
        for (var I = 0; I < 5; I++)
        {
            document.getElementById("t_I" + I).width = "20%";
            document.getElementById("t_O" + I).width = "20%";
            document.getElementById("t_I" + I).style["display"] = "";
            document.getElementById("t_O" + I).style["display"] = "";
            document.getElementById("t_0" + I).style["display"] = "";
            document.getElementById("t_1" + I).style["display"] = "";
            document.getElementById("t_2" + I).style["display"] = "";
            document.getElementById("t_3" + I).style["display"] = "";
        }
        for (var I = 5; I < 10; I++)
        {
            document.getElementById("t_I" + I).width = "20%";
            document.getElementById("t_O" + I).width = "20%";
            document.getElementById("t_I" + I).style["display"] = "none";
            document.getElementById("t_O" + I).style["display"] = "none";
            document.getElementById("t_0" + I).style["display"] = "none";
            document.getElementById("t_1" + I).style["display"] = "none";
            document.getElementById("t_2" + I).style["display"] = "none";
            document.getElementById("t_3" + I).style["display"] = "none";
        }
    }
    if (Idx2 == 2)
    {
        for (var I = 0; I < 5; I++)
        {
            document.getElementById("t_I" + I).width = "20%";
            document.getElementById("t_O" + I).width = "20%";
            document.getElementById("t_I" + I).style["display"] = "none";
            document.getElementById("t_O" + I).style["display"] = "none";
            document.getElementById("t_0" + I).style["display"] = "none";
            document.getElementById("t_1" + I).style["display"] = "none";
            document.getElementById("t_2" + I).style["display"] = "none";
            document.getElementById("t_3" + I).style["display"] = "none";
        }
        for (var I = 5; I < 10; I++)
        {
            document.getElementById("t_I" + I).width = "20%";
            document.getElementById("t_O" + I).width = "20%";
            document.getElementById("t_I" + I).style["display"] = "";
            document.getElementById("t_O" + I).style["display"] = "";
            document.getElementById("t_0" + I).style["display"] = "";
            document.getElementById("t_1" + I).style["display"] = "";
            document.getElementById("t_2" + I).style["display"] = "";
            document.getElementById("t_3" + I).style["display"] = "";
        }
    }
}

function Init()
{
    for (var I = 0; I < 10; I++)
    {
        document.getElementById("_0" + I).value = ConfSignalSymbol[0][0];
        document.getElementById("_1" + I).value = ConfSignalSymbol[1][0];
        document.getElementById("_2" + I).value = ConfSignalSymbol[2][0];
        document.getElementById("_3" + I).value = ConfSignalSymbol[3][0];
        
        document.getElementById("t_I" + I).height = ConfButtonHeight + "px";
        document.getElementById("t_O" + I).height = ConfButtonHeight + "px";
        document.getElementById("_0" + I).style["height"] = ConfButtonHeight + "px";
        document.getElementById("_1" + I).style["height"] = ConfButtonHeight + "px";
        document.getElementById("_2" + I).style["height"] = ConfButtonHeight + "px";
        document.getElementById("_3" + I).style["height"] = ConfButtonHeight + "px";
    }

    Elements.push(new LogicElement());
    Elements[0].SetTerm(10, 10, LogicDefault());

    LogicSvg.addEventListener("mousedown", MouseDown_);
    LogicSvg.addEventListener("mousemove", MouseMove_);
    LogicSvg.addEventListener("mouseup", MouseUp_);
    LogicSvg.addEventListener("touchstart", MouseDown_0);
    LogicSvg.addEventListener("touchmove", MouseMove_0);
    LogicSvg.addEventListener("touchend", MouseUp_0);
    LogicSvg.addEventListener("touchcancel", MouseReset);
    SetVal(-1, 0);

    window.addEventListener("resize", WindowResize, false);
    ConfigGet();
    ConfigSet();
}

function WindowResize()
{
    /*ConfCanvasW = window.innerWidth;
    ConfCanvasH = window.innerHeight;
    ConfCanvasW = document.documentElement.clientWidth;
    ConfCanvasH = document.documentElement.clientHeight;*/

    LogicSvg.setAttribute("width", ConfCanvasW);
    LogicSvg.setAttribute("height", ConfCanvasH);
    LogicSvgScr.setAttribute("width", ConfCanvasW);
    LogicSvgScr.setAttribute("height", ConfCanvasH);

}

function ResetElement(ElemSel)
{
    var Result = false;
    var ElemObj = Elements[Elements[ElementsCurrent].Elements[ElemSel]];
    var ElemIdx = 0;
    switch (ElemObj.NameId())
    {
        case "BUF": ElemIdx = 1; break;
        case "NOT": ElemIdx = 2; break;
        case "FALSE": ElemIdx = 3; break;
        case "TRUE": ElemIdx = 4; break;
        case "AND": ElemIdx = 5; break;
        case "NAND": ElemIdx = 6; break;
        case "OR": ElemIdx = 7; break;
        case "NOR": ElemIdx = 8; break;
        case "XOR": ElemIdx = 9; break;
        case "XNOR": ElemIdx = 10; break;
        case "EQU": ElemIdx = 11; break;
        case "NEQU": ElemIdx = 12; break;
        case "IMP": ElemIdx = 13; break;
        case "NIMP": ElemIdx = 14; break;
        case "CON": ElemIdx = 15; break;
        case "NCON": ElemIdx = 16; break;
    }
    if (ElemIdx > 0)
    {
        Result = NewElement(ElemIdx, ElemSel, true);
    }
    return Result;
}

function CopyElementWork(NewElem_, ElemObj)
{
    NewElem_.Name = ElemObj.Name;
    NewElem_.SetTerm(ElemObj.TermI, ElemObj.TermO, 0);
    for (var I = 0; I < ElemObj.TermI; I++)
    {
        NewElem_.ValI[I] = ElemObj.ValI[I];
        NewElem_.ValI_[I] = ElemObj.ValI_[I];
    }
    for (var I = 0; I < ElemObj.TermO; I++)
    {
        NewElem_.ValO[I] = ElemObj.ValO[I];
        NewElem_.ValO_[I] = ElemObj.ValO_[I];
        NewElem_.DefaultVal[I] = ElemObj.DefaultVal[I];
    }
    
    NewElem_.X = ElemObj.X;
    NewElem_.Y = ElemObj.Y;
    NewElem_.Rot = ElemObj.Rot;
    NewElem_.Type = ElemObj.Type;
    NewElem_.Propagation = ElemObj.Propagation;
    if (NewElem_.Type == 0)
    {
        for (var I = 0; I < ElemObj.Elements.length; I++)
        {
            var SubElem0 = Elements[ElemObj.Elements[I]];
            var SubElem = new LogicElement();
            NewElem_.Elements.push(Elements.length);
            Elements.push(SubElem);
            CopyElementWork(SubElem, SubElem0);
        }
        for (var I = 0; I < ElemObj.Conn.length; I++)
        {
            var ConnItem = [0, 0, 0, 0];
            ConnItem[0] = ElemObj.Conn[I][0];
            ConnItem[1] = ElemObj.Conn[I][1];
            ConnItem[2] = ElemObj.Conn[I][2];
            ConnItem[3] = ElemObj.Conn[I][3];
            NewElem_.Conn.push(ConnItem);
        }
    }
    else
    {
        for (var I = 0; I < ElemObj.FuncTable.length; I++)
        {
            var FuncItem = [];
            for (var II = 0; II < ElemObj.FuncTable[I].length; II++)
            {
                FuncItem.push(ElemObj.FuncTable[I][II]);
            }
            NewElem_.FuncTable.push(FuncItem);
        }
    }
}

function CopyElement(NewElem_, TermI, TermO)
{
    if (SelectedElementList.length != 1)
    {
        return "Select exactly one element";
    }
    
    var ElemN = Elements[SelectedElementListN].Elements[SelectedElementList[0]];
    var ElemObj = Elements[ElemN];
    
    if ((TermI >= 0) || (TermO >= 0))
    {
        if ((ElemObj.TermI != TermI) || (ElemObj.TermO != TermO))
        {
            return("Terminal count mismatch");
        }
    }
    
    CopyElementWork(NewElem_, ElemObj);
    
    return "";
}

function NewElement(ElemIdx, ElemSel, Auto)
{
    var Result = false;
    var NewElem = null;
    var TermI = 0;
    var TermO = 0;
    var ElemObj;

    if (Elements[ElementsCurrent].Type == 0)
    {
        if (ElemSel >= 0)
        {
            ElemObj = Elements[Elements[ElementsCurrent].Elements[ElemSel]];
            TermI = ElemObj.TermI;
            TermO = ElemObj.TermO;
            if (ElemIdx == 0)
            {
                ResetElement(ElemSel);
                return true;
            }
        }
        if (ElemIdx > 0)
        {
            if (ElemSel < 0)
            {
                if ((ElemIdx == 20))
                {
                    TermI = -2;
                    TermO = -2;
                }
                if ((ElemIdx >= 1) && (ElemIdx <= 4))
                {
                    TermI = 1;
                }
                if ((ElemIdx >= 5) && (ElemIdx <= 12))
                {
                    TermI = parseInt(prompt("Number of input terminals", "2"));
                }
                if ((ElemIdx >= 13) && (ElemIdx <= 16))
                {
                    TermI = 2;
                }
                if ((ElemIdx >= 17) && (ElemIdx <= 19))
                {
                    TermI = parseInt(prompt("Number of input terminals", "1"));
                }
                if (isNaN(TermI))
                {
                    TermI = -1;
                }
                if ((ElemIdx >= 1) && (ElemIdx <= 19))
                {
                    TermO = parseInt(prompt("Number of output terminals", "1"));
                }
                if (isNaN(TermO))
                {
                    TermO = -1;
                }
            }
            
            var ErrMsg = "";
            NewElem = new LogicElement();
            switch(ElemIdx)
            {
                case  1: ErrMsg = LogicStdBUF(NewElem, TermI, TermO); break;
                case  2: ErrMsg = LogicStdNOT(NewElem, TermI, TermO); break;
                case  3: ErrMsg = LogicStdTO0(NewElem, TermI, TermO); break;
                case  4: ErrMsg = LogicStdTO1(NewElem, TermI, TermO); break;

                case  5: ErrMsg = LogicStdAND(NewElem, TermI, TermO); break;
                case  6: ErrMsg = LogicStdNAND(NewElem, TermI, TermO); break;
                case  7: ErrMsg = LogicStdOR(NewElem, TermI, TermO); break;
                case  8: ErrMsg = LogicStdNOR(NewElem, TermI, TermO); break;
                case  9: ErrMsg = LogicStdXOR(NewElem, TermI, TermO); break;
                case 10: ErrMsg = LogicStdXNOR(NewElem, TermI, TermO); break;
                case 11: ErrMsg = LogicStdEQU(NewElem, TermI, TermO); break;
                case 12: ErrMsg = LogicStdNEQU(NewElem, TermI, TermO); break;

                case 13: ErrMsg = LogicStdIMP1(NewElem, TermI, TermO); break;
                case 14: ErrMsg = LogicStdNIMP1(NewElem, TermI, TermO); break;
                case 15: ErrMsg = LogicStdIMP2(NewElem, TermI, TermO); break;
                case 16: ErrMsg = LogicStdNIMP2(NewElem, TermI, TermO); break;

                case 17: ErrMsg = LogicStd(NewElem, 2, TermI, TermO); break;
                case 18: ErrMsg = LogicStd(NewElem, 0, TermI, TermO); break;
                case 19: ErrMsg = LogicStd(NewElem, 1, TermI, TermO); break;
                
                case 20: ErrMsg = CopyElement(NewElem, TermI, TermO); break;
            }
            if (ErrMsg == "")
            {
                if (ElemSel >= 0)
                {
                    NewElem.X = Math.round(ElemObj.X);
                    NewElem.Y = Math.round(ElemObj.Y);
                    NewElem.Rot = Math.round(ElemObj.Rot);
                    for (var I = 0; I < Elements.length; I++)
                    {
                        if (Elements[I] === ElemObj)
                        {
                            if (Elements[I].Type == 0)
                            {
                                var ElementsCurrent_ = ElementsCurrent;
                                ElementsCurrent = I;
                                while (Elements[I].Elements.length > 0)
                                {
                                    RemoveElement(0);
                                }
                                ElementsCurrent = ElementsCurrent_;
                            }
                            Elements[I] = NewElem;
                        }
                    }
                }
                else
                {
                    NewElem.X = Math.round(MouseX * ConfLogicW / ConfCanvasW);
                    NewElem.Y = Math.round(MouseY * ConfLogicH / ConfCanvasH);
                    Elements.push(NewElem);
                    Elements[ElementsCurrent].Elements.push(Elements.length - 1);
                }
                Result = true;
            }
            else
            {
                if (!Auto)
                {
                    alert(ErrMsg);
                }
            }
            if (!Auto)
            {
                Repaint();
            }
        }
        else
        {
            ErrMsg = "You have to select an element to reset";
            if (!Auto)
            {
                alert(ErrMsg);
            }
            if (!Auto)
            {
                Repaint();
            }
            return false;
        }
    }
    return Result;
}

var ElementTreeList = [];

function ElementGetTree(ElemNum)
{
    if (Elements[ElemNum].Type == 0)
    {
        for (var I = 0; I < Elements[ElemNum].Elements.length; I++)
        {
            ElementGetTree(Elements[ElemNum].Elements[I]);
        }
    }
    ElementTreeList.push(ElemNum);
}


function RemoveElement(ElemSel)
{
    var ElemNum = Elements[ElementsCurrent].Elements[ElemSel];

    ElementTreeList = [];
    ElementGetTree(ElemNum);

    for (var I = 0; I < ElementTreeList.length; I++)
    {
        // Remove references in circuits and correct element index
        for (var II = 0; II < Elements.length; II++)
        {
            if (Elements[II].Type == 0)
            {
                for (var III = 0; III < Elements[II].Elements.length; III++)
                {
                    if (Elements[II].Elements[III] == ElementTreeList[I])
                    {
                        Elements[II].DeleteElem(III);
                        III--;
                    }
                }
            }
        }
        
        // Remove element object
        Elements.splice(ElementTreeList[I], 1);
        
        // Correct higher element index
        for (var II = I; II < ElementTreeList.length; II++)
        {
            if (ElementTreeList[II] > ElementTreeList[I])
            {
                ElementTreeList[II]--;
            }
        }
        for (var II = 0; II < Elements.length; II++)
        {
            if (Elements[II].Type == 0)
            {
                for (var III = 0; III < Elements[II].Elements.length; III++)
                {
                    if (Elements[II].Elements[III] > ElementTreeList[I])
                    {
                        Elements[II].Elements[III]--;
                    }
                }
            }
        }

    }
}

function PromptChange(Question, Default)
{
    var _ = prompt(Question, Default);
    if (_)
    {
        return _;
    }
    else
    {
        return Default;
    }
}
