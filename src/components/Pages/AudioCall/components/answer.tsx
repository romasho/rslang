import React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

function Answer({answerText}) {
    return (
        <label htmlFor={answerText}>
            <input type='button' value={answerText} id={answerText} name="answer" />
        </label>);
}

export default Answer;