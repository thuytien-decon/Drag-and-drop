export default function InputFieldAns(props) {
    const { field, form, object, handleClickDel, key, setListAns, listAns } = props;
    const { name, value, onChange, onBlur } = field
    console.log('draw someone out', listAns)
    const temporaryListAns = Object.entries(listAns)

    return (
        <div>
            {temporaryListAns.map(ans =>{
                return(
                    <p key={ans[1]}><span>{ans[0]}</span>:{ans[1]} <i onClick={handleClickDel} value={ans[0]} className="fas fa-minus-circle"></i></p>
                )
            })}
        </div>

    )
}