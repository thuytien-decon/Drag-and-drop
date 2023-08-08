import { useState, useEffect } from "react"
import { Formik, Form, FastField, FieldArray, Field, useFormikContext } from "formik";
import InputFieldSentence from "./InputFieldSentence";
import TooltipDND from "./TooltipDND";
import InputFieldAns from "./InputFieldAns";


export default function ModalforquestionDND(props) {
    const [listAns, setListAns] = useState({});
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
    const b = props.openOrClose;
    let temporaryListAns = { ...listAns };
    const initialValuesFormik = {
        sentence: sentence,
        ans: listAns,
        others: []
    };

    const handleClick = () => {
        setShowTooltip(false)
    };

    const addWordToListAns = (key) => {
        const cloneList = { ...listAns };
        const newListAns = { ...cloneList, [key]: selectString };
        newListAns[key] = selectString;
        setListAns(newListAns);
        // console.log('hillside', newListAns)
    }

    const handleClickDel = (e) => {
        let temporaryListAns = { ...listAns };
        const key = e.target.getAttribute('value');
        const value = temporaryListAns[key];
        // delete temporaryListAns[key]
        // setListAns(temporaryListAns)
        setDelkey(key)
        const a = document.getElementsByClassName('paragraph')[0].childNodes;
        const newParagragh = [];
        for (let i = 0; i < a.length; i++) {
            console.log('11111', a)
            // console.log('2222', a[i])
            if (a[i].nodeName === "SPAN" && a[i].innerHTML === value) {
                // console.log( '88888', a[i].innerHTML === value)
                newParagragh.push(a[i].innerHTML)
            } else if (a[i].nodeName === "SPAN" && a[i].innerHTML === '') {
                console.log('88888', i, a[i].innerHTML === "")
            }
            else if (a[i].nodeName === "#text" && a[i].textContent ==='') {
                console.log('77777', i, a[i].textContent === "")
            }
            else if (a[i].nodeName === "#text" && a[i].textContent !=='') {
                newParagragh.push(a[i].textContent)
            }
            else {
                newParagragh.push(a[i]);
            };
        };
        console.log('55555', newParagragh)
        const toString = newParagragh.toString().split(',').join('')
        console.log('993333', toString)
        document.getElementsByClassName('paragraph').innerHTML = toString
        console.log('Pork', document.getElementsByClassName('paragraph').innerHTML = toString)

    }
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
                    <p className="anq" >Add New Question</p>
                    <i onClick={() => { b(false); props.setSelect('') }} className="fa-solid fa-xmark" id="closePopupbox"></i>
                </header>
                <Formik
                    initialValues={initialValuesFormik}
                    enableReinitialize
                >
                    {formikProps => {
                        const { values, errors, touched } = formikProps
                        console.log("hhh", values, errors, touched)
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
                                    delkey={delkey}
                                />
                                {/* {arrayAns1.map(ans => {
                                    return (
                                        <FastField
                                        name="ans"
                                        component={InputFieldAns}
                                        key={ans[0]}
                                        object={ans}
                                        handleClickDel={handleClickDel}
                                        />
                                        // <p key={ans[1]}><span>{ans[0]}</span>:{ans[1]} <i onClick={handleClickDel} value={ans[0]} className="fas fa-minus-circle"></i></p>
                                    )
                                })} */}
                                <FastField
                                    name="ans"
                                    component={InputFieldAns}
                                    handleClickDel={handleClickDel}
                                    setListAns={setListAns}
                                    listAns={temporaryListAns}
                                />
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}