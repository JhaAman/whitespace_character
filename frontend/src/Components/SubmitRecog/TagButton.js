import React, { useState } from 'react';

function TagButton({ toSubmitTags, setToSubmitTagsHelper, children }) {
    const [ isClicked, setIsClicked ] = useState(false);

    return (
        <button 
            className={isClicked ? "tag-button-clicked" : ""} 
            onClick={() => {
                let index = toSubmitTags.indexOf(children);
                let tempArray = toSubmitTags;
                if (index === -1) {
                    tempArray.push(children);
                } else {
                    tempArray.splice(index, 1);
                }
                setToSubmitTagsHelper(tempArray)
                console.log(toSubmitTags);
                setIsClicked(!isClicked)}
            }
        >
            {children}
        </button>
    )
}

export default TagButton;