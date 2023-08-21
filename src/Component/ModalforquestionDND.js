import { useState, useEffect } from "react"
import { Formik, Form, FastField, FieldArray, Field, useFormikContext, isObject } from "formik";
import InputFieldSentence from "./InputFieldSentence";
import TooltipDND from "./TooltipDND";
import InputFieldAns from "./InputFieldAns";
import * as Yup from 'yup';

export default function ModalforquestionDND(props) {
    const { selectQuestion, setSelectQuestion, type, setShow, show} = props
    const initial = {
        sentence: '',
        ans: {},
        others: []
    }
    const initialOrSelect = type == 'add' ? initial : selectQuestion
    const [listAns, setListAns] = useState({});
    // cau truc
    //ans :
    //{
    //   A:{value:cake, index:0},
    //   B:{value:candy, index:1}
    //}
    const [otherAns, setOtherAns] = useState([]);
    const [selectString, setSelectString] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const [position, setPosition] = useState({
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
    });
    const [sentence, setSentence] = useState('');
    const [inputkey, setInputkey] = useState('');
    const [delkey, setDelkey] = useState('');
    const [counter, setCounter] = useState(0)
    const b = props.openOrClose;
    let temporaryListAns = { ...listAns };
    const initialValuesFormik = {
        id: 5,
        sentence: sentence,
        ans: listAns,
        others: otherAns
    };
    const validation_Schema = Yup.object().shape({
        sentence: Yup.string().required("This field is required"),
        ans: Yup.object().test(
            'ans',
            'Please select at least one option',
            function (value) {
                return Object.keys(value).length !== 0
            }
        ),
        others: Yup.array().min(1, "At least one item needs to be added."),
    })


    const handleClick = () => {
        setShowTooltip(false)
    };
    const handleSave = (e) => {
        const paragraphArray = []
        const objectAnstoArray = Object.entries(initialValuesFormik.ans)
        const paragraph = document.getElementsByClassName("paragraph")[0].childNodes
        for (let i = 0; i < paragraph.length; i++) {
            // console.log("Braided hair", paragraph[i])
            if (paragraph[i].nodeName == "#text") {
                const string = paragraph[i].nodeValue.toString().trim()
                // console.log("hair", string)
                if (string != "" && string != " ") {
                    paragraphArray.push(string)
                }
            } else {
                let string = paragraph[i].innerText.toString().trim()
                let span_id = paragraph[i].id
                // console.log("sore red eyes", string, span_id)
                for (let b = 0; b < objectAnstoArray.length; b++) {
                    const id_value = `${objectAnstoArray[b][1].value}_${objectAnstoArray[b][1].index}`
                    // console.log('3333333', id_value)
                    if (span_id == id_value) {
                        paragraphArray.push(`[${objectAnstoArray[b][0]}]`)
                    }
                }
            }
        }
        // console.log('acid reflux', paragraph)
        // console.log('preferably', paragraphArray)
        let textSentence = paragraphArray.join(" ")
        let show_clone = [...show]
        let numberOfIdArray = []
        for (let i = 0; i < show_clone.length; i++){
            numberOfIdArray.push(show_clone[i].id)
        }
        let maxOfNumberId =  Math.max(...numberOfIdArray)
        let addQuestion = {
            id: maxOfNumberId+1,
            sentence: textSentence,
            ans: e.ans,
            others: e.others
        }
        console.log('dispensary', addQuestion, maxOfNumberId)
        setShow([...show_clone, addQuestion])
    }

    const addWordToListAns = (key) => {
        const cloneList = { ...listAns };
        const newListAns = { ...cloneList, [key]: { value: selectString, index: counter } };
        newListAns[key] = { value: selectString, index: counter };
        setListAns(newListAns);
        // console.log('hillside', newListAns)
        // setCounter(pre => pre + 1)
    }
    const handleClickDel = (e) => {
        let temporaryListAns = { ...listAns };
        const key = e.target.getAttribute('value');
        const value = temporaryListAns[key];
        delete temporaryListAns[key]
        setListAns(temporaryListAns)
        setDelkey(key)
        // console.log('value', value)
        const chosenSpan = document.getElementById(`${value.value}_${value.index}`);
        if (chosenSpan != undefined) {
            // console.log('hhhuhu', chosenSpan);
            let normal_node = document.createTextNode(chosenSpan.innerText);
            chosenSpan.parentNode.insertBefore(normal_node, chosenSpan);
            chosenSpan.remove()
        } else return
    }
    useEffect(() => {
        if (type === "edit") {
            let listKeys = selectQuestion.ans
            let listKeysArray_original = Object.keys(selectQuestion.ans)
            let listKeysArray = Object.keys(selectQuestion.ans).map(el => `[${el}]`)
            let selectQuestion_clone = selectQuestion.sentence
            let result = selectQuestion_clone.indexOf("[A]")
            for (let i = 0; i < listKeysArray.length; i++) {
                let a = listKeysArray_original[i]
                let valueOfSpan = listKeys[a].value
                let idOfSpan = listKeys[a].value + "_" + listKeys[a].index
                selectQuestion_clone = selectQuestion_clone.replace(
                    listKeysArray[i],
                    `<span id=${idOfSpan} class="highlight">${valueOfSpan}</span>`
                )
                console.log('safsadsad', valueOfSpan, idOfSpan)
            }
            document.getElementsByClassName('paragraph')[0].innerHTML = selectQuestion_clone
            // let contentSpanElement = document.createElement('span');
            // contentSpanElement.setAttribute('class', "highlight");
            // contentSpanElement.setAttribute('id', `${string}_${counterOfField}`);
            // contentSpanElement.textContent = string;
            // contentSpanElement.style.backgroundColor = 'yellow';
            // contentSpanElement.style.color = 'darkblue';
        }
        setSentence(initialOrSelect.sentence)
        setListAns(initialOrSelect.ans)
        setOtherAns(initialOrSelect.others)
    }, [])
    return (
        <div className="popup-box-1">
            <TooltipDND
                showTooltip={showTooltip}
                setShowTooltip={setShowTooltip}
                position={position}
                setInputkey={setInputkey}
                inputkey={inputkey}
                addWordToListAns={addWordToListAns} />
            <div className='popup-1'>
                <header onClick={handleClick}>
                    <p className="anq" >{type == 'add' ? 'Add New Question' : 'Edit'}</p>
                    <i onClick={() => { b(false); setSelectQuestion('') }} className="fa-solid fa-xmark" id="closePopupbox"></i>
                </header>
                <Formik
                    initialValues={initialValuesFormik}
                    validationSchema={validation_Schema}
                    onSubmit={handleSave}
                    enableReinitialize
                >
                    {formikProps => {
                        const { values, errors, touched } = formikProps
                        // console.log("hhh", values, errors, touched)
                        return (
                            <Form>
                                <FastField
                                    name="sentence"
                                    component={InputFieldSentence}
                                    label='Paragraph'
                                    setShowTooltip={setShowTooltip}
                                    setPosition={setPosition}
                                    position={position}
                                    setSelectString={setSelectString}
                                    setSentence={setSentence}
                                    sentence={sentence}
                                    delkey={delkey}
                                    setCounter={setCounter}
                                    counter={counter}
                                    type={type}
                                />
                                <div className="ans-wrapper">
                                    <FastField
                                        name="ans"
                                        component={InputFieldAns}
                                        handleClickDel={handleClickDel}
                                        setListAns={setListAns}
                                        listAns={temporaryListAns}
                                    />
                                    {errors.ans && touched.ans && <p style={{ margin: 0, padding: 0, color: "red", fontSize: "10px", textAlign: "start", width: '100%', fontFamily: 'Poppins' }} className="text-danger">{errors.ans}</p>}
                                    <FieldArray
                                        name="others"
                                        render={(arrayHelpers) => {
                                            return (
                                                <div className="others-wrapper">
                                                    <div className="others-top">
                                                        <p className="ans-title">Other Answers:</p>
                                                        <i
                                                            style={{ color: 'green' }}
                                                            className="fa-regular fa-square-plus fa-fade addMoreAns"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                arrayHelpers.push("")
                                                                initialValuesFormik.others.push("")
                                                            }}
                                                        ></i>
                                                    </div>
                                                    <div className="others-bottom">
                                                        {values.others.map((el, index) => {
                                                            const handleChangeOfFieldArray = (e) => {
                                                                const otherAnsClone = [...otherAns]
                                                                otherAnsClone[index] = e.target.value
                                                                setOtherAns(otherAnsClone)
                                                                values.others[index] = e.target.value

                                                            }
                                                            return (
                                                                <div className="others-bottom-wrapper">
                                                                    <input
                                                                        className='a'
                                                                        name={`others${[index]}`}
                                                                        value={values.others[index]}
                                                                        onChange={handleChangeOfFieldArray}
                                                                    />

                                                                    <i
                                                                        onClick={() => {
                                                                            const otherAnsClone = [...otherAns]
                                                                            otherAnsClone.splice(index, 1)
                                                                            setOtherAns(otherAnsClone)
                                                                            arrayHelpers.remove(index)
                                                                        }} // remove a from the list of Formik
                                                                        className="fas fa-minus-circle"></i>
                                                                </div>

                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )
                                        }} />
                                </div>
                                {errors.others && touched.others && <p style={{ margin: 0, padding: 0, color: "red", fontSize: "10px", textAlign: "start", width: '100%', fontFamily: 'Poppins' }} className="text-danger">{errors.others}</p>}
                                <div className="btn">
                                    {props.type === 'add' ?
                                        <button type="submit" className="save">Save</button> :
                                        <button type="submit" className="update">Update</button>
                                    }
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}