import { useFormikContext } from "formik";;

export default function InputFieldSentence(props) {
    const { field, form, type, label, setPosition, setShowTooltip, position, showTooltip } = props;
    const { name, value, onChange, onBlur } = field
    const { setFieldValue } = useFormikContext();

    const handleInput = (e) => {
        setFieldValue(name, e.currentTarget.innerText)
        setShowTooltip(false)
    }
    const handleSelect = (e) => {
        e.preventDefault();
        let getSelection = window.getSelection();
        let string = getSelection.toString();
        // console.log(getSelection);
        console.log(string);
        let getPosition = window.getSelection().getRangeAt(0).getBoundingClientRect();
        setPosition(getPosition);
        // //kiểm tra xem có highlight hay không?
        let parentNode_check = getSelection.focusNode.parentNode.closest('.highlight')
        // console.log('parentElement', parentNode_check)
        if (parentNode_check == null) {
            // tạo hightlight
            let contentSpanElement = document.createElement('span');
            contentSpanElement.setAttribute('class', "highlight");
            contentSpanElement.textContent = string;
            contentSpanElement.style.backgroundColor = 'yellow';
            contentSpanElement.style.color = 'darkblue';
            let range = getSelection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(contentSpanElement);
            setShowTooltip(true)
        } else {
            setShowTooltip(false)
            let parentNode = getSelection.focusNode.parentNode.childNodes;
            // console.log('parentElement', parentNode);
            let newChild = [];
            for (let i = 0; i < parentNode.length; i++) {
                // console.log('66666',child[i].nodeValue)
                if (parentNode[i].nodeValue !== null || parentNode[i].nodeValue !== "") {
                    newChild.push(parentNode[i].nodeValue);
                    // console.log('8888', newChild);
                }
            };
            let stringFromNewChild = newChild.toString().replace(",", "");
            // console.log('8', stringFromNewChild);
            const newtext = document.createTextNode(stringFromNewChild);
            getSelection.focusNode.parentNode.remove();
            getSelection.getRangeAt(0).insertNode(newtext);
        }
    }
    const handleClick = () => {
        if (position.x === 0 && position.y === 0){
            setShowTooltip(false)
            console.log('sadasdsadasdasdasdas', showTooltip)
        } else {
            setShowTooltip(true)
        }
    }

    return (
        <div name={name} contentEditable="true" onInput={handleInput} onMouseUp={handleSelect} onClick={handleClick}>
    
        </div>
    )
} 