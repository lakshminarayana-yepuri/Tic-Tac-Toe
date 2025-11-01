import { useState } from "react";

export default function Player({ symbol, name, isActive, onNameChange }) {
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
    }

    function handleInputChange(event) {
        if (onNameChange) onNameChange(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{name}</span>;
    if (isEditing) {
        editablePlayerName = (
            <input
                type="text"
                required
                value={name}
                onChange={handleInputChange}
                autoFocus
            />
        );
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