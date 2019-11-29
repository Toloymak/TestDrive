import React from 'react';

interface Props {
    setCurrentService(value: string): void;
    currentIdBlock: string;
    blocks: {
        id: string;
        name: string;
    }[];
}

export const Services: React.FC<Props> = ({ setCurrentService, currentIdBlock, blocks }) => {
    const serviceOnChange = data => {
        setCurrentService(data.target.value);
    };

    return (
        <div className="popup_nameBlock">
            <span className="popup_nameField">{'СЕРВИС'}</span>
            <select className="popup_field popup_fieldService" onChange={serviceOnChange} defaultValue={currentIdBlock}>
                {blocks.map(item => (
                    <option value={item.id} key={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
