export default function InputFieldAns(props) {
    const { field, form, object, handleClickDel, key, setListAns, listAns } = props;
    const { name, value, onChange, onBlur } = field
    const temporaryListAns = Object.entries(listAns)
    console.log('draw someone out', temporaryListAns)

    return (
        <div className="answers">
            {temporaryListAns.map(ans =>{
                return(
                    <p className="answer" key={`${ans[1].value}_${ans[1].index}`}><span>{ans[0]}</span>:{ans[1].value} <i onClick={handleClickDel} value={ans[0]} className="fas fa-minus-circle"></i></p>
                )
            })}
        </div>

    )
}