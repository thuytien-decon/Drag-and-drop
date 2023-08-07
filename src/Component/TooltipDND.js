import { useState } from "react"
import './TooltipDND.css';
export default function TooltipDND(props) {
    const { position, setShowTooltip, showTooltip, setInputkey, inputkey } = props
    let style = {
        left: `${position.left + position.width}px`,
        top: `${position.top + 20}px`,
        position: 'absolute',
        display: `${showTooltip === true ? "flex" : "none"}`,
        border: '2px solid #3c5599',
        padding: '5px 10px',
        borderRadius: '10px' ,
        backgroundColor: 'gray',
        zIndex: 30,
        boxShadow: '0 0 1px 1px rgba(67, 124, 209, 0.637)',
        cursor: 'pointer'
        }
    const handleClick = () => {
        setShowTooltip(false)
    }
    return (
        <div style={style} className="tooltip">
            <input type="text" onChange={(e)=>setInputkey(e.target.value)} />
            <i onClick={handleClick} className="fa-solid fa-pen-fancy" style={{ color: '#79E0EE' }}></i>
        </div>
    )
}