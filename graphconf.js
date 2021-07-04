var ConfFontName = "Arial, Helvetica, Verdana, sans-serif";
var ConfSignalColor = ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(255, 255, 0)", "rgb(0, 0, 255)"];
var ConfSignalSymbol = ["FLfl0", "THth1", "Nn-2", "Bb#3"];
var ConfSignalName = ["false", "true", "none", "both"];
var ConfOrientationMarkSize = 4;
var ConfSelectMarkSize = 2;
var ConfLogicW = 100000;
var ConfLogicH = 100000;
var ConfDrawBack = "rgb(0, 0, 0)";
var ConfDrawFore = "rgb(255, 255, 255)";
var ConfDrawSele = "rgb(64, 64, 64)";
var ConfFontSize1 = "1px";
var ConfFontSize2 = "1px";
var ConfNameSeparator = "|";

var ConfGridStep = DataGetIDefault("TriStateLogic_ConfGridStep", 10);
var ConfGridText = DataGetIDefault("TriStateLogic_ConfGridText", 10);
var ConfFontSize1x = DataGetIDefault("TriStateLogic_ConfFontSize1", 12);
var ConfFontSize2x = DataGetIDefault("TriStateLogic_ConfFontSize2", 16);
var ConfElementSize = DataGetIDefault("TriStateLogic_ConfElementSize", 2);
var ConfTruthLines = DataGetIDefault("TriStateLogic_ConfTruthLines", 20);
var ConfCanvasW = DataGetIDefault("TriStateLogic_ConfCanvasW", 500);
var ConfCanvasH = DataGetIDefault("TriStateLogic_ConfCanvasH", 500);
var ConfButtonHeight = DataGetIDefault("TriStateLogic_ConfButtonHeight", 30);
var ConfTouch = DataGetIDefault("TriStateLogic_ConfTouch", 0);

function ConfigReset()
{
    DataDelete("TriStateLogic_ConfGridStep");
    DataDelete("TriStateLogic_ConfGridText");
    DataDelete("TriStateLogic_ConfFontSize1");
    DataDelete("TriStateLogic_ConfFontSize2");
    DataDelete("TriStateLogic_ConfElementSize");
    DataDelete("TriStateLogic_ConfTruthLines");
    DataDelete("TriStateLogic_ConfCanvasW");
    DataDelete("TriStateLogic_ConfCanvasH");
    DataDelete("TriStateLogic_ConfButtonHeight");
    DataDelete("TriStateLogic_ConfTouch");
}

function ConfigGet()
{
    document.getElementById("ConfGridStep").value = ConfGridStep;
    document.getElementById("ConfGridText").value = ConfGridText;
    document.getElementById("ConfFontSize1").value = ConfFontSize1x;
    document.getElementById("ConfFontSize2").value = ConfFontSize2x;
    document.getElementById("ConfElementSize").value = ConfElementSize;
    document.getElementById("ConfTruthLines").value = ConfTruthLines;
    document.getElementById("ConfCanvasW").value = ConfCanvasW;
    document.getElementById("ConfCanvasH").value = ConfCanvasH;
    document.getElementById("ConfButtonHeight").value = ConfButtonHeight;
    document.getElementById("ConfTouch").selectedIndex = ConfTouch;
}

function ConfigSet()
{
    ConfGridStep = parseInt(document.getElementById("ConfGridStep").value);
    ConfGridText = parseInt(document.getElementById("ConfGridText").value);
    ConfFontSize1x = parseInt(document.getElementById("ConfFontSize1").value);
    ConfFontSize2x = parseInt(document.getElementById("ConfFontSize2").value);
    ConfElementSize = parseInt(document.getElementById("ConfElementSize").value);
    ConfTruthLines = parseInt(document.getElementById("ConfTruthLines").value);
    ConfCanvasW = parseInt(document.getElementById("ConfCanvasW").value);
    ConfCanvasH = parseInt(document.getElementById("ConfCanvasH").value);
    ConfButtonHeight = parseInt(document.getElementById("ConfButtonHeight").value);
    ConfTouch = parseInt(document.getElementById("ConfTouch").selectedIndex);

    DataSetI("TriStateLogic_ConfGridStep", ConfGridStep);
    DataSetI("TriStateLogic_ConfGridText", ConfGridText);
    DataSetI("TriStateLogic_ConfFontSize1", ConfFontSize1x);
    DataSetI("TriStateLogic_ConfFontSize2", ConfFontSize2x);
    DataSetI("TriStateLogic_ConfElementSize", ConfElementSize);
    DataSetI("TriStateLogic_ConfTruthLines", ConfTruthLines);
    DataSetI("TriStateLogic_ConfCanvasW", ConfCanvasW);
    DataSetI("TriStateLogic_ConfCanvasH", ConfCanvasH);
    DataSetI("TriStateLogic_ConfButtonHeight", ConfButtonHeight);
    DataSetI("TriStateLogic_ConfTouch", ConfTouch);
    
    ConfFontSize1 = Math.round(ConfGridStep * ConfFontSize1x / 10) + "px";
    ConfFontSize2 = Math.round(ConfGridText * ConfFontSize2x / 10) + "px";

    for (var I = 0; I < 10; I++)
    {
        document.getElementById("t_I" + I).height = ConfButtonHeight + "px";
        document.getElementById("t_O" + I).height = ConfButtonHeight + "px";
        document.getElementById("_0" + I).style["height"] = ConfButtonHeight + "px";
        document.getElementById("_1" + I).style["height"] = ConfButtonHeight + "px";
        document.getElementById("_2" + I).style["height"] = ConfButtonHeight + "px";
        document.getElementById("_3" + I).style["height"] = ConfButtonHeight + "px";
    }
    
    WindowResize();
    Repaint();
}

