import {useState} from "react";

export default function Player({symbol,initialName,isActive}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
    }

    function handleInputChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    if(isEditing) {
        editablePlayerName = <input type="text" required  defaultValue={initialName} onChange={handleInputChange}/>;
    }
    return (
          <li className={isActive ? "active" : undefined}>
            <span className="player">
                {editablePlayerName}
              <span className="player-symbol">{symbol}</span>
              <button onClick={handleEditClick}>{isEditing ? "save" : "Edit"}</button>
            </span>
          </li>
    );
}