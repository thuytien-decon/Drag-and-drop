import './DragAndDropTest.css';
import { useEffect, useState, useRef } from "react"


export default function DragAndDropTest() {
    const [specialWords, setSpecialWords] = useState([]);
    const [newPharse, setNewPharse] = useState('');
    const [yourChoice, setYourChoice] = useState({})
    const [ans, setAns] = useState({})
    const [test, setTest] = useState({
        correct:{},
        incorrect:{}
    })
    const dragStartItemIndex = useRef('');
    const dragStartItemContent = useRef('');
    const dragEnterItemIndex = useRef('');
    const wordAnphabet = ['[A]', '[B]', '[C]'];
    const handleDragStart = (e) => {
        let contentStart = e.target.getAttribute('value');
        let indexStart = e.target.getAttribute('index');
        dragStartItemIndex.current = indexStart;
        dragStartItemContent.current = contentStart;
    };

    const handleDragEnter = (e) => {
        // let contentEnd = e.target.getAttribute('value')
        let indexEnd = e.target.getAttribute('index');
        // console.log('onDragEnter', contentEnd, indexEnd)
        dragEnterItemIndex.current = indexEnd;
        // console.log('asds', dragStartItem.current)
    }
    const handleDragEnd = (e) => {
        let cloneSepcialWords = [...specialWords];
        let draggedItemContent = cloneSepcialWords.splice(dragStartItemIndex.current, 1);
        cloneSepcialWords.splice(dragEnterItemIndex.current, 0, draggedItemContent[0]);
        // console.log('etiquette', cloneSepcialWords)
        setSpecialWords(cloneSepcialWords);
        dragStartItemIndex.current = '';
        dragEnterItemIndex.current = '';
    }
    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDragEndInBlank = (e) => {
        e.preventDefault();
        let innerHTMLOld = e.target.innerHTML.trim();
        let cloneSepcialWords = [...specialWords];
        let key = e.target.getAttribute('value')
        console.log('keys', key)
        if (innerHTMLOld === "" || innerHTMLOld === " ") {
            e.target.innerHTML = dragStartItemContent.current;
            let draggedItemContent = cloneSepcialWords.splice(dragStartItemIndex.current, 1)
            setSpecialWords(cloneSepcialWords);
            setYourChoice({...yourChoice, [key]: dragStartItemContent.current})
        } else {
            e.target.innerHTML = dragStartItemContent.current;
            let draggedItemContent = cloneSepcialWords.splice(dragStartItemIndex.current, 1);
            cloneSepcialWords.splice(dragEnterItemIndex.current, 0, innerHTMLOld);
            setSpecialWords(cloneSepcialWords);
            setYourChoice({...yourChoice, [key]: dragStartItemContent.current})
        }

        dragStartItemIndex.current = '';
        dragEnterItemIndex.current = '';

    }
    let array = newPharse.split(' ')
    const handleSubmit = () =>{
        const correct = {}
        const incorrect = {}
        console.log('hello', yourChoice)
        for (let key in ans){
            if ( yourChoice[key] === ans[key]){
                console.log('jurisdiction', ans[key])
                correct[key] = yourChoice[key]
            } else {
                console.log('prosecute',ans[key])
                incorrect[key] = yourChoice[key]
            }
        }
        console.log('correct', correct)
        console.log('incorrect', incorrect)
        setTest({...test,correct: correct, incorrect:incorrect})
    }
    console.log('plaintiff', test)
    useEffect(() => {
        const init = {
            sentence: "The animal shelter assumed [A] of the [B] dogs found roaming the streets",
            ans: {
                A: 'custody',
                B: 'abandoned'
            },
            others: ['arbitrament', 'jury', 'customer', 'judge']
        }
        setNewPharse(init.sentence);
        let arrayAns = [...init.others, ...Object.values(init.ans)];
        setSpecialWords(arrayAns);
        setAns(init.ans)
    }, [])
    return (
        <div className='dnd-wrapper'>
            <p className='sentence'>
                {array.map((el, index) => {
                    if (wordAnphabet.indexOf(el) < 0) {
                        return (
                            <span key={index}>{el}&nbsp;</span>
                        )
                    } else {
                        const value = el.slice(1,-1)
                        return (
                            <span key={index}
                                value={value}
                                onDrop={handleDragEndInBlank}
                                onDragOver={handleDragOver}
                                className='blank'></span>
                        )
                    }

                })}
            </p>
            <ul>
                {specialWords.map((word, index) => {
                    return (
                        <li
                            draggable={true}
                            onDragStart={handleDragStart}
                            onDragEnter={handleDragEnter}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            index={index}
                            value={word}
                            key={word}>{word}</li>
                    )
                })}
            </ul>
            <button onClick={handleSubmit}>
                Submit
            </button>
        </div>
    )
}
