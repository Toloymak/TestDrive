import * as React from 'react';
import { AllContextModel, InformationContext } from 'src/Components/Content';
import { SocketContext } from '../../Content';
import { Cell } from '../Cell';

interface Props extends AllContextModel {

}

export const Context: React.FC<Props> = ({links}) => {

    const [allLinks, setAllLinks] = React.useState(links)
    const {showSpinner, hideSpinner} = React.useContext(InformationContext);
    const linksContext = React.useContext(SocketContext).links;

    const delLink = (id: string): void => {
        const filteredLink = allLinks.filter(item => item.id !== id);
        setAllLinks(filteredLink);
        linksContext.delete(id);
        hideSpinner();
    };

    return (
        <div>
            {
                allLinks.map(item => <Cell {...item} key={item.id} delLink={delLink}/>)
            }
        </div>
    )
}