import { useState, useEffect } from "react"
import { Formik, Form, FastField } from "formik";
import InputFieldSentence from "./InputFieldSentence";
import TooltipDND from "./TooltipDND";

export default function ModalforquestionDND(props) {
    const [listAns, setListAns] = useState({})
    const [showTooltip, setShowTooltip] = useState(false)
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
    const [inputkey, setInputkey] = useState('')
    const b = props.openOrClose
    const initialValuesFormik = {
        sentence: "",
        ans: {},
        others: []
    }

    const handleClick = () => {
        setShowTooltip(false)
        console.log('zzzzz')
    }
    console.log('position', position)
    return (
        <div className="popup-box-1">
            <TooltipDND
                showTooltip={showTooltip}
                setShowTooltip={setShowTooltip}
                position={position}
                setInputkey={setInputkey}
                inputkey={inputkey} />
            <div className='popup-1'>
                <header onClick={handleClick}>
                    <p className="anq" >Add New Question</p>
                    <i onClick={() => { b(false); props.setSelect('') }} className="fa-solid fa-xmark" id="closePopupbox"></i>
                </header>
                <Formik
                    initialValues={initialValuesFormik}>
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
                                    showTooltip={showTooltip}
                                    setPosition={setPosition}
                                    position={position}
                                />
                                {/* <FastField
                                    name="ans"
                                    component={InputFieldSentence}
                                    label='Answers'
                                    listAns={listAns}
                                /> */}
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}