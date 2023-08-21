import { useState, useEffect } from "react";
import ModalforquestionDND from "../Component/ModalforquestionDND";
import './EditDragAndDropTest.css';


export default function EditDragAndDropTest (){
    const [openModal, setOpenModal] = useState(false)
    const [type, setType] = useState('add')
    const [selectQuestion, setSelectQuestion] = useState({sentence: '',
    ans: {},
    others: []})
    const [show, setShow] = useState([])
    const handleEditQuestion = (element) =>{
        console.log('aaaa', element)
        setSelectQuestion(element)
        setOpenModal(true);
        setType('edit')
    }
    const handleDelQuestion = (id) =>{
        let afterDelArray = show.filter(el => el.id != id)
        setShow(afterDelArray)
        console.log('bbbb')
    }

    useEffect (()=>{
        const init = [
            {
                id: 0,
                sentence: "Charlie Shrem was an early [A] of cryptocurrency, earning millions of dollars trading [B]",
                ans: {
                    A: {value:'apostle', index:0},
                    B: {value:'bitcoin', index:1}
                },
                others: ['poultry', 'stroll', 'blast', 'hitherto']
            },{
                id: 1,
                sentence: "Tesla soon felt he was not being given due [A] or enough financial compensation from Edison:",
                ans: {
                    A: {value:'credit', index:0}
                },
                others: ['nightstand', 'chromosomes', 'incandescent', 'inhibitor']
            }
        ]
        setShow(init)
    },[])
    return(
        <div>
             <div className='question-list'>
                <div className='question addNew' onClick={() => {
                    setOpenModal(true); 
                    setSelectQuestion({sentence: '',
                    ans: {},
                    others: []}); 
                    setType('add')
                    }}>
                    <h2>Add New Question</h2>
                </div>
                {show.map(a => {
                    return (
                        <div key={a.sentence} className='question container'>
                            <h2 className='question-content'>{a.sentence}</h2>
                            <div className='menu'>
                                <div onClick={() => {handleEditQuestion(a); setType('edit')}} className='btn edit-btn' id={a.id} value={a.stem}><i className="fa-regular fa-pen-to-square"></i>Edit</div>
                                <div onClick={() => {handleDelQuestion(a.id)}} className='btn del-btn'><i className="fas fa-minus-circle"></i>Del</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {openModal && <ModalforquestionDND openOrClose={setOpenModal} selectQuestion={selectQuestion} setSelectQuestion={setSelectQuestion} type={type} setShow={setShow} show={show}/>} 
        </div>
    )
}