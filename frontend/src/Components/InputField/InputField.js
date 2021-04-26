//
// Input Field Component
//
// Org: Team Whitespace Character
// Authors: Khai Nguyen, khainguyen@umass.edu
// Created: April 26, 2021
//
// File contains logic and renderer for Input Field Component
//

import React from 'react';
import './InputField.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const InputField = ({
	fieldTitle="Title",
	placeholder="placeholder",
	icon=null,
	iconSize="1x",
	type="text",
	value,
	onChangeValue,
	autoFocus=false,
	required=false,
}) => {

	return (
		<div className='input-field-wrapper'>
			{
				fieldTitle !== "" ? 
					<h5 className='field-title'>{fieldTitle}</h5>
				:
					<div/>
			}
			<div className='input-field-container'>
				{
					icon !== null ? 
						<FontAwesomeIcon className='icon' icon={icon} size={iconSize} />
					:
						<div/>
				}
				<input
					className='input-field'
					type={type}
					placeholder={placeholder}
					autoFocus={autoFocus}
					value={value}
					onChange={onChangeValue}
					required={required}
				/>
			</div>
		</div>
	); 
}

export default InputField;