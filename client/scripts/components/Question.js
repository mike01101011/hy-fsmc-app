import React from 'react';

const Question = ( props ) => {
	return(
		<div>
            <label htmlFor={ props.id } >{ props.question }</label>
		</div>
	);
}

export default Question;