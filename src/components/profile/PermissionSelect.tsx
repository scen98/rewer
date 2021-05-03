import React, { useRef } from 'react'

interface IPermissionSelect{
    defaultValue: string;
    onUpdate: (newValue: string) => void;
}

export const PermissionSelect: React.FC<IPermissionSelect> = ({defaultValue, onUpdate}: IPermissionSelect) => {
    const select = useRef<HTMLSelectElement>();
    function change(){
        onUpdate(select.current.value);
    }
    return (
        <select ref={select} value={defaultValue} onChange={change} >
            <option value="0">Banned</option>
            <option value="1">User</option>
            <option value="2">Moderator</option>
            <option value="3">Admin</option>
        </select>
    )
}

export default PermissionSelect;
