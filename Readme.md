# Overview

TriStateLogic is the HTML\-based logic circuit and formula simulator, which can use binary, ternary and quaternary logic system\. The circuit can consist of gates and I/I elements\. The gate can be defined by truth table or by another circuit\. After designing the circuit, you can get logical formula \(for cominational circuits only\) or you can generate input\-output table in the specified order by input, to allow test both combinational and sequential circuits\. For every circuit element there can by from 0 to 10 input terminals or from 0 to 10 output terminals, with some exceptions\.

# Conventions

There is only one convention for binary logic system\. For ternary system there are a few logic conventions, which are not compatible with other\. The most common and most widely used convention is the Classic convention, which is compatible with Boolean algebra\. You can use functions meeting several conventions in one circuit\.

## Classic

There is the most common convention, compatible with classic binary, classic ternary and classic quaternary logic conventions\. This convention has defined explicitly for all one\-argument functions, and AND, OR for two aarguments\.

BUF, NOT, FALSE, TRUE functions:

| p | BUF\(p\) = p | NOT\(p\) = ¬p | FALSE\(p\) | TRUE\(p\) |
| --- | --- | --- | --- | --- |
| False | False | True | False | False |
| True | True | False | True | True |
| None | None | None | False | True |
| Both | Both | Both | False | True |

AND, OR functions:

| p | q | p ∧ q | p ∨ q |
| --- | --- | --- | --- |
| False | False | False | False |
| False | True | False | True |
| True | False | False | True |
| True | True | True | True |
| False | None | False | None |
| None | False | False | None |
| True | None | None | True |
| None | True | None | True |
| None | None | None | None |
| False | Both | False | Both |
| Both | False | False | Both |
| True | Both | Both | True |
| Both | True | Both | True |
| Both | Both | Both | Both |
| None | Both | False | True |
| Both | None | False | True |

Based on above definition, the AND and OR functions for more than two arguments, is treated as cascaded two\-argument functions and one\-argument AND and OR acts as BUF\.

| Arguments | AND | OR |
| --- | --- | --- |
| False | False | False |
| True | True | True |
| None | None | None |
| Both | Both | Both |
| False, True | False | True |
| False, None | False | None |
| False, Both | False | Both |
| True, None | None | True |
| True, Both | Both | True |
| None, Both | False | True |
| None, Both, False | False | True |
| None, Both, True | False | True |
| False, True, None | False | True |
| False, True, Both | False | True |
| False, True, None, Both | False | True |

The other functions are defined implicitly, by logical formulas:

NAND\(p, q\) = ¬\(p ∧ q\)

NOR\(p, q\) = ¬\(p ∨ q\)

XOR\(p\) = p

XOR\(p, q\) = ¬\(p ∧ q\) ∧ \(p ∨ q\)

XOR\(p, q, r\) = XOR\(XOR\(p, q\), r\)

XOR\(p, q, r, s\) = XOR\(XOR\(XOR\(p, q\), r\), s\)

XNOR\(p\) = ¬p

XNOR\(p, q\) = ¬\(p ∨ q\) ∨ \(p ∧ q\)

XNOR\(p, q, r\) = XNOR\(XNOR\(p, q\), r\)

XNOR\(p, q, r, s\) = XNOR\(XNOR\(XNOR\(p, q\), r\), s\)

EQU\(p, q, …, s\) = \(p ∧ q ∧ … ∧ s\) ∨ ¬\(p ∨ q ∨ … ∨ s\)

NEQU\(p, q, …, s\) = \(p ∨ q ∨ … ∨ s\) ∧ ¬\(p ∧ q ∧ … ∧ s\)

IMP\(p, q\) = ¬\(p ∧ ¬q\) = ¬p ∨ q

NIMP = ¬IMP\(p, q\)

CON\(p, q\) = ¬\(q ∧ ¬p\) = ¬q ∨ p

NCON\(p, q\) = ¬CON\(p, q\)

## Both/None negation

The only difference related to Classic convention is difference in NOT function definition\. This convention is fully compatible with classic binary, but not compatible with classic ternary\.

| p | NOT\(P\) = ¬p |
| --- | --- |
| False | True |
| True | False |
| None | Both |
| Both | None |

The difference of NOT function affects all implicitly defined functions, which uses the negation in definition formula\. The AND and OR functions has the same definition as in Classic convention\.

## Sobocinski ternary

This convention is fully compatible with classic binary convention, but in the multi\-argument functions, the argument other than True and False are ommited and this function computes result for binary arguments only\. If all arguments are other than True and False, the function result is None\. The Both value should not be used and is treated as None\.

## Binary with error

This convention is fully compatible with classic binary convention, but if at least one of function arguments is other than False or True, the result of function is always None, which is treated as error\. The Both value is treated as None value\.

## Lukasiewicz ternary

There is special convention, which is not compatible with any Classic convention and treats values as numbers as following:

| Value | Number |
| --- | --- |
| False | 0\.0 |
| True | 1\.0 |
| None | 0\.5 |
| Both | 0\.5 |

The Both and None values in this convention are the same value, the Both value can not be generated as result of function other than BUF and NOT\. If function generates value below than 0\.0 or above than 1\.0, the value is bounded to be within 0\.0 and 1\.0\. Each function formula can not generate value other than value from set \{0\.0, 0\.5, 1\.0\} when input values are within the set\.

There are explicit definitions of functions:

AND\(p\) = p

AND\(p, q\) = p \+ q \- 1

AND\(p, q, r\) = p \+ q \+ r \- 2

AND\(p, q, …, s\) = p \+ q \+ … \+ s \- N \+ 1, where N means the number of arguments\.

NAND\(p, q, …, s\) = 1 \- p \- q \- … \- s \+ N \- 1, where N means the number of arguments\.

OR\(p\) = p

OR\(p, q\) = p \+ q

OR\(p, q, r\) = p \+ q \+ r

OR\(p, q, …, s\) = p \+ q \+ … \+ s

NOR\(p, q, …, s\) = 1 \- p \+ q \+ … \+ s

XOR\(p\) = BUF\(p\)

XOR\(p, q\) = &#124;p \- q&#124;

XNOR\(p\) = NOT\(p\)

XNOR\(p, q\) = 1 \- &#124;p \- q&#124;

EQU\(p, q, …, s\) = ANDC\(p, q, …, s\) \+ 1 \- ORC\(p, q, …, s\), where ANDC and ORC are the AND and OR functions in Classic convention

NEQU\(p, q, …, s\) = ORC\(p, q, …, s\) \- ANDC\(p, q, …, s\), where ANDC and ORC are the AND and OR functions in Classic convention

IMP\(p, q\) = 1 \- p \+ q

NIMP\(p, q\) = p \- q

CON\(p, q\) = 1 \- q \+ p

NCON\(p, q\) = q \- p

# Interface

The TriStateLogic interface consists of three parts:


* Circuit designer\.
* Text field with functions\.
* Settings\.

## Circuit designer

There is the most important part of application\. Its allows to design any logical circuit\. This part consists of canvas, ten I/O fields and function fields\. The structure is organized as tree, at the root there is circuit, which is connected with I/O fields\. Each circuit can consist of I/O elements, truth table gates and other circuit gates\.

The I/O fields consists of \(from up to down\) output display, input display and ten **T**/**B**/**N**/**F** button sets\. The buttons sets the input value and perform the one cycle of processing\. You can process several times by clicking the same button several times\.

The values has assigned the colors:


* **True** \- Green
* **Both** \- Blue
* **None** \- Yellow
* **False** \- Red

The function fields as the following:


* **Path** \- The path of currently displaying circuit\. The **^** button jumps to circuit containing the displaying circuit, unless, the currently displayed circuit is the root circuit\. Next to the **^** button, there are the names of elements, which contains the currently displayed circuit\.
* **Mode** \- The work mode, which means the effect of the mouse clicking on the circuit\. Each mode consists of three elements separated by vertical bar\. The elements are related to:
  * Click or drag and drop inside any element, but not inside terminal area\.
  * Click inside terminal area of any element\.
  * Click or drag and drop outside any element or terminal area of any element,
* **Gate** \- The gate, which will be placed in **Replace gate &#124; \- &#124; Insert gate** mode\. There are options:
  * **Reset** \- Replace the gate to standard gate according the name and convention\. The **Reset** button resets all gates in the circuit or all selected gates\.
  * **Input/Output** \- Place the connection with input or output of the circuit\.
  * **Circuit** \- Place the gate, which consists of another circuit\.
  * **Truth table** \- Place the gate, which function is defined by truth table\.
  * **Copy** \- Copy selected gate\.
  * Other options \- Place the predefined truth table gate according the currently selected convencion\.
* **Convention** \- The logic convention, which is used to place predefined gates or reset gates\. You can mix gates of several conventions in one circuit\.
* **Default** \- The default input and output value on each terminal of placed elements\.
* **Buttons** \- The selection of displayed button set in Input/Output fields in the two option lists:
  * The first option list defines, which value buttons are visible\. For example, there is not necessary to display **B** and **N** buttons, when you define and tests the binary logic circuits, when you ure the **T** and **F** buttons only\. This option does not affect the ciscuit designing or working\.
  * The second list defines the number of input/outpu channels\. You can display all 10 channels or five channels only\. The displaying five channels is usable when you use the TriStateLogic application on small device\.

## Text field with functions

The text field is used to several functions connected with text\. The text will be rea from the field or the generatet text will bi written to the field\. There are the following action buttons:


* **Export** \- Generate the text representation of the current logic system\. There is the only way to save designed circuit and you can copy the text into favorite text editor and save it to file\.
* **Import** \- Import the text representation to the designer\. The text can be created by clicking the **Export** button\. There is the only way to load previously saved circuit\.
* **Template** \- Generate the input sequence by template\. If you click the **Template** button, you will be asked for template\. The template definition can consist of **0**\-**9** digits and **T**/**B**/**N**/**F** letters\. The number means the channel \(input pin\) and the letters means the value in this order on the channel\. Repeating the same digit in template is not allowed\. There will be created the input sequence list\. For example:
  * **0FT1FT** \- Create the 4 items, on the first two items, the 0 channel will by set to the **F**, but the second two items will have the **T** on the 0 channel\.
  * **1FT0FT** \- Like above, but order grouping will be reversed
  * **2FNBT** \- Create the sequence of all four values on the 2 channel\.
  * **0FTN1FTN2FTN** \- Create the all possible ternary input on the first three channels\.
  * **0FT1FTN2FTNB** \- Create all possible combination of binary input on 0 channel, ternary input on 1 channel and quaternary input on the 2 channel\.
* **Function** \- Create the circuit function result for the input sequence\. The input sequence can be written manually or generated using the **Template** button\. Each input sequence item is in separated line, which consists of at least one character\.
  * If item is shorter than 10 characters, the missing characters will be written by previous item or the current setting of input in designer\.
  * If item is longer than 10 characters, the further characters than tenth will be deleted\.
  * You can use the following characters, the other characters will be treated as missing:
    * False \- F, f, L, l, 0
    * True \- T, t, H, h, 1
    * None \- N, n, \-, 2
    * Both \- B, b, \#, 3
  * The input characters will be replaced to **F**/**T**/**N**/**B** when you click the **Function** button\.
  * The sequence order does not matter for the combinational circuits, but is very important for the sequential circuits\. The input itemps can be repeated\.
* **Formula \- gates** \- Creates the text representation of logical functions\. It can be used only for combinational logic\.
  * For each gate, which is a truth table, there will be represented by function, which name is related by gate name\. If the gate has more than one output, the number of output will be added to gane name in the function formula\.
  * For each gate, whis is an another circuit, the formula of this circuit will be generated recursively\.
  * If you try to generate formula for the sequential logic circuit \(with the feedback\), the input value of the feedback will be replaced with **$** character\.
  * The unconnected input will be represented by **\_** characters\.
* **Formula \- logic**, **Formula \- numeric** \- The buttons works the similar way as Formula \- gates, n exception of replacing the standard functions names with the standarized symbols for readibility\. If the gate name contains the **&#124;** character, only the part before the **&#124;** will be analyzed\.

The replacements used in the **Formula \- logic** and **Formula \- numeric** are following:

| Gate name | Logic | Numeric |
| --- | --- | --- |
| BUF\(p\) | p | p |
| NOT\(p\) | ¬p | \!p |
| AND\(p, q, …, s\) | p ∧ q ∧ … ∧ s | p & q & … & s |
| NAND\(p, q, …, s\) | ¬\(p ∧ q ∧ … ∧ s\) | \!\(p & q & … & s\) |
| OR\(p, q, …, s\) | p ∨ q ∨ … ∨ s | p &#124; q &#124; … &#124; s |
| NOR\(p, q, …, s\) | ¬\(p ∨ q ∨ … ∨ s\) | \!\(p &#124; q &#124; … &#124; s\) |
| XOR\(p, q, …, s\) | p ⊻ q ⊻ … ⊻ s | p ^ q ^ … ^ s |
| XNOR\(p, q, …, s\) | ¬\(p ⊻ q ⊻ … ⊻ s\) | \!\(p ^ q ^ … ^ s\) |
| EQU\(p, q\) | p ⇔ q | p = q |
| EQU\(p, q, …, s\) | \(p ∧ q ∧ … ∧ s\) ∨ \(¬p ∧ ¬q ∧ … ∧ ¬s\) | \(p & q & … & s\) &#124; \(\!p & \!q & … & \!s\) |
| NEQU\(p, q\) | p ⇎ q | p ≠ q |
| NEQU\(p, q, …, s\) | \(p ∨ q ∨ … ∨ s\) ∧ \(¬p ∨ ¬q ∨ … ∨ ¬s\) | \(p &#124; q &#124; … &#124; s\) & \(\!p &#124; \!q &#124; … &#124; \!s\) |
| IMP\(p, q\) | p ⇒ q | p ≤ q |
| NIMP\(p, q\) | p ⇏ q | p > q |
| CON\(p, q\) | p ⇐ q | p ≥ q |
| NCON\(p, q\) | p ⇍ q | p < q |

## Settings

The most bottom part of the interface is the settings table\. This parameters affects the TriStateLogic appearance and usability\. There are the following parameters:


* **Circuit grid** \- The element grid size, which affect the element size\.
* **Config grid** \- The grid size in the truth table and I/O configuration\.
* **Circuit font** \- The font size related to base size of the element name\.
* **Config font** \- The font size related to base size oin the truth table or I/O configuration\.
* **Element size** \- The element width between input and output size\. Its not affect the element height and text size\.
* **Config lines** \- The number of text lines in the truth table and I/O configuration\.
* **Canvas width** \- The canvas width in pixels\.
* **Canvas height** \- The canvas height in pixels\.
* **Button height** \- The I/O button height in pixels\.

Below the parameters there are two buttons:


* **Apply** \- Apply settings after change, the effect will be immediately\.
* **Reset** \- Reset settings to default values by removing saved settings data, requires application restart\.

# Creating the circuit

To create the circuit you have to create minimum actions:


* Place input and output elements, you can place one element with both input and output or place several input elements or output elements\.
* Place function gates, configure truth tables if necessary\.
* Connect terminal between elements, you can connect only output terminal of one elements to input terminal of another elements\.
* Assign value channels to input and output elements\.

The creating and editing circuit will be described by example\. The circuit will be created in Classic convention and will consists of:


* Eight input channels\.
* Eight output channels\.
* Standard AND gate with one output\.
* Standard OR gate with one output\.
* Customized gate with two outputs defined by truth table\.
* Two RS flip\-flops\.

## Placing necessary elements on the circuit canvas

You have to place the following elements:


* Two I/O without input terminals and with four output terminals\.
* Two I/O without output terminals and with four input terminals\.
* Standard AND gate with two inputs and one output\.
* Standard OR gate with two inputs and one output\.
* Custom truth table element with two inputs and two outputs\.
* Circuit with two inputs and two outputs\.

To place I/O element, you have to:


1. Set **Mode** to **Replace gate &#124; \- &#124; Insert gate**\.
2. Select **Input/Output** in the **Gate** field\.
3. Click on the canvas, where you want to place the element\.
4. In the prompts, input the number of inputs and number of the oututs terminals\. For element with output terminals only, input 0 as number of input terminals and vice versa\.
5. If you want to place one more element of the same type, just click on the canvas outside already put elements\. Answer in the prompts as you want\.

As described above put two I/O elements with 0 input terminals and 4 output terminals, followed by two I/O elements with input 4 input terminals and 0 output terminals\.

After putting four I/O elements, you have to put standard AND gate\. To put AND gate, keep **Mode** set to **Replace gate &#124; \- &#124; Insert gate**, but in the **Gate** field select the **AND** item\. After this, click on the blank place in the canvas and input two input terminals and one output terminal\. After this, change **Gate** to **OR** and click on the other blank place in the canvas, followed by input two input terminals and four output terminals\.

After placing AND and OR gate, select the **Truth table** in the **Gate** field and click on the canvas\. Input the 2 as number of input terminals and 2 as number of output terminals\. The gate will have name **TT** by default\. Analogically, place the **Circuit** gate with 2 inputs and 2 outputs\. The gate will have **IC** name as default\.

## Replacing and deleting elements

If you want to change element with the another element containing the same number of input and output connections, set **Mode** to **Replace gate &#124; \- &#124; Insert gate**\. Select desired element in the **Gate** field and click on the element on the canvas, which you want to change\. If such replacement is not possible, the appropriate message will be displayed\. All element connections will be kept while replacing\.

If you want to delete unnecessary element, set **Mode** to **Name &#124; Delete &#124; Select**\. Then, click on the one of terminals of the element, which you want to delete\. The element will disappear\.

## Renaming elements

To rename element, you have to set **Mode** to **Name &#124; Delete &#124; Select**\. Then, click on the **TT** element an input the **A/O** as name in the prompt\. If you want to input multiline name, separate the lines by vertical bar character\. Click the **IC** element and input the **RS&#124;F\-F** as name in the prompt\.

## Moving or rotating element

To move or rotate element, select the **Move &#124; Rotate &#124; Move sel** item in the **Mode** field\. To move element, click the middle of the desired element and drag it on the canvas\. To rotate element, click on any of element terminals several times\. The rotation has eight states \(all possible rotating and mirroring\) and the small marker indicates, where is the first input terminal\.

If you drag the blank place on the canvas, the all element will be moved, unless some of elements are highlighted\. In the case, the highlighted elements will be moved\.

## Configuring the truth table

To configure any element, select the **Enter &#124; Connection &#124; Propagation** in the **Mode** field\. Select this mode and click on the **A/O** element\. The blank truth table will be displayed\. On the heading line, the **\+** sign is for add table item\. At the every table line there id the **\-** sign to remove this line\. The up and down arrows are to scroll table, when is longer than number of items, which can be displayed\. Click the **\+** sign four times to add four items\.

On the each item, you can click the values to set the input \(below **I0** and **I1**\) and output \(below **O0** and **O1**\) values\. To make conjunction on O1 and disjunction on O2, configure items as following:


* **F F F F**
* **F T F T**
* **T F F T**
* **T T T T**

If input will be other than matching with any item, on the output will be produced as value as above **O0** or **O1** header\. You change the default value by clicking this\.

After configuring the truth table, click the **^** button in the **Path** field for return to the circuit\.

## Creating the circuit definition of the element

To create the circuit for the element, click the **RS&#124;F\-F** element with the **Enter &#124; Connection &#124; Propagation** in **Mode** field\. The canvas will be blank, because it will display the **RS&#124;F\-F** element\. On the canvas, put the following elements at the same way, as elements in the main circuit:


* One I/O element with 0 input terminals and 2 output terminals at the left on the canvas\.
* One I/O element with 2 input terminals and 0 output terminals at the right on the canvas\.
* Two NOR gates, each with two input terminals and one output terminal at the middle on the canvas, arranged vertically\.

## Connecting the elements

You have to propertly connect the **NOR** gates with **I/O** elements to aquire the RS flip\-flop circuit\. To make connection, set **Mode** to **Enter &#124; Connection &#124; Propagation**, then click the first output terminal of left **I/O** element and click the first input on the upper **NOR** element\. To make second connection, click the secont output terminal of right **I/O** element and click the second input terminal of the lower **NOR** element\. you can connect one output terminal with several input terminals but you can not connect one input terminal with several output terminals\. To remove connection, click one more time the same places and the connection line will disappear\. Analogically, create the following connections:


* The output of the upper **NOR** with the first input of the lower **NOR**\.
* The output of the lower **NOR** with the second input of the upper **NOR**\.
* The output of the upper **NOR** with the first input of the right **I/O**\.
* The output of the upper **NOR** with the second input of the right **I/O**\.

## Assigning the I/O elements with the channels

To finish the RS flip\-flop circuit, you have to assign the **I/O** element with value channels\. Set the **Mode** to **Enter &#124; Connection &#124; Propagation** and click the left **I/O**\. You will see the assignment table and you can assign the outputs with channels\. In the subsircuit, challels are assigned to the terminals of the circuit element\. By clicking the left and right arrows, assign the **O0** to **0** and **O1** to **1**\. The **F**/**T**/**N**/**B** value means the assignment to the constant value\.

After this, click the **^** button to return to the **RS&#124;F\-F** circuit\. Then, click the right **I/O** circuit and assign the **I0** with **0** and **I1** with **1** analogically\. followed this, click the **^** button\.

## Circuit propagation cycle

The circuit works as the cellular automation, so an the once process, the value will be flow with the nearest neighbours\. You can configure multiple computing by one process\. Set the **Enter &#124; Connection &#124; Propagation** in the **Mode** field and click outside any element\. The Propagation cycle prompt will be displayed\. Input **4** and click the **OK**, because the longest path from input to output is 3 connections and minimum propagation cycle is the longest from input to output path length \(including the feedback cycle\)\.

The longest path, consisting of three connections, is:


* Form left I/O to upper NOR\.
* From upper NOR to lower NOR\.
* from lower NOR to right I/O\.

The RS flip\-flop is finished\. Click the **^** button in the **Path** field to return to the main circuit\.

## Copying the element

In the circuit there are necessary two RS flip\-flops\. You have to select the one **RS&#124;F\-F** element\. In the **Mode** field, select the **Name &#124; Delete &#124; Select** mode\. Then, click at the blank place on the canvas and draw the rectangle around **RS&#124;F\-F** element only\. The element will be highlighted\.

After select the **RS&#124;F\-F**, set mode to **Replace gate &#124; \- &#124; Insert gate** in the **Mode** field and select the **Copy** item in the **Gate** field\. Followed this, click on the blank place on the canvas\. The second **RS&#124;F\-F** will appear and will have identical definition\.

## Making circuit connections

At this point, there are all necessary elements\. by the similar way as during the RS flip\-flop creating, set the **Mode** to **Enter &#124; Connection &#124; Propagation** and make connections the first I/O with output terminals as following:


* The first output of the **I/O** with the first input of **AND** element and with the first input of OR element\.
* The second output of the **I/O** with the second input of **AND** element and with the second input of OR element\.
* The third output of the **I/O** with the first input of **A/O** element\.
* The fourth output of the **I/O** with the second input of **A/O** element\.

Then, make the connection with the second I/O with input terminals as following:


* The output of **AND** with the first input of **I/O**\.
* The output of **OR** with the second input of **I/O**\.
* The first output of **A/O** with the third input of **I/O**\.
* The second output of **A/O** with the fourth input of **I/O**\.

After make mentioned connections, make the following connections with the second I/O consisting of the output terminals with the flip\-flops as follows:


* The first output of **I/O** with the first input of the first **RS&#124;F\-F**\.
* The second output of **I/O** with the second input of the first **RS&#124;F\-F**\.
* The third output of **I/O** with the first input of the second **RS&#124;F\-F**\.
* The fourth output of **I/O** with the second input of the second **RS&#124;F\-F**\.

After this, make the following connections with the second I/O consisting of the output terminals with the flip\-flops as follows:


* The first output of the first **RS&#124;F\-F** with the first input of **I/O**\.
* The second output of the first **RS&#124;F\-F** with the second input of **I/O**\.
* The first output of the second **RS&#124;F\-F** with the third input of **I/O**\.
* The second output of the second **RS&#124;F\-F** with the fourth input of **I/O**\.

## Assigning the I/O with the channels

To make the circuit runnable, you have to assign every **I/O** element with value channels\. To do this, set the **Mode** to **Enter &#124; Connection &#124; Propagation**\. Click the first **I/O** with output terminals and make following assignment:


* O0 \- 0
* O1 \- 1
* O2 \- 2
* O3 \- 3

For the second **I/O** with output terminals set the following assignment:


* O0 \- 4
* O1 \- 5
* O2 \- 6
* O3 \- 7

Analogically, set the assignment for the first **I/O** with input terminals:


* I0 \- 0
* I1 \- 1
* I2 \- 2
* I3 \- 3

For the second I/O with input terminals, set assignment as following:


* I0 \- 4
* I1 \- 5
* I2 \- 6
* I3 \- 7

## Circuit file

If you have trouble with making example circuit, you can import it from the **Example\.txt** file\.

## Running the circuit

At this point, the circuit is complete\. Use the I/O button set to set the input values\. For every channel from 0 to 7 \(the first eight\), click the **F** button\. After this, click the one of the **F** button three times to stabilize the state\. You can click the **F** or **T** buttons and observe the signal propagation if you click the button several times\. To achieve immediately changing state, set the propagation cycle \(set mode to **Enter &#124; Connection &#124; Propagation** and click at the blank place on the canvas\) to 3\.

# Using logic convention

In most cases, you have to use **Classic** logic convention\. You can change the logic convention in the **Convention** field\. This convention affect only in the following actions:


* Placing new standard gates\.
* Replacing existing gates with the standard gates\.
* Resetting gates, which actually means replace gace with the same standard gate\.

To place standard gate, which works according specified convention, before placing gate select desired convention in the **Convention** field\. After selecting the convention, place the gate\. If you select convention other than **Classic**, the selected convention will be indicated by name as following:


* Both/None negation \- **B/N**\.
* Sobocinski ternary \- **Sob**\.
* Binary with error \- **Err**\.
* Lukasiewicz ternary \- **Luk**\.

You can put gates, which works according several convention\. Simply, secect the convention, place the first gate, after this select the other convention and place the second gate\. Every standard gate is defined by truth table, which is generated during placing the gate\.

## Replacing or reseting gates

After placing specified standard gate, you can modify the truth table as you want\. You can reset the gate or change the gate to standard gate, which complains another logic convention\. All such actions you can do in **Replace gate &#124; \- &#124; Insert gate** mode\. To replace gate to other gate, set the desired gate in the **Gate** field and click the gate, which you want to replace\. To replace the standard gate with the same standard gate \(maybe complains the same or the other logc convention\), select **Reset** item on the list in the **Gate** field\. The gate type will be detected by the name or the first name line, where the name consists of several lines\.

You can reset several gates at once\. You can select gates by drawing rectangle in the **Name &#124; Delete &#124; Select** mode\. After this, click the **Reset** button in the **Gate** field\. The replaced or reset gates will be highlighted\. If none of elements are selected, pressing the **Reset** button will cause reset all gates in the circuit\.




