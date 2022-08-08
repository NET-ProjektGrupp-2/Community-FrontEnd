import React, { useContext } from 'react'
import { sessionContext } from '../..';

export default function LoadingResponse() {
	const context = useContext(sessionContext);

	return (
		<div>LoadingResponse</div>
	)
}
