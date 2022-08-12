import React, { useContext, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { sessionContext } from '../..';
import * as keys from 'GlobalConst';
import { useState } from 'react';


export type TrackLocation = {
	Path: string;
	Match: (path: string, prevPath: string, splitPath: string[]) => void | string;
}
export const LocationTracker = {
	// const {pathname} = useLocation();
	locations: [] as TrackLocation[],

	addLocation: (loc: TrackLocation) => {
		LocationTracker.locations.push(loc);
	},
	removeLocation: (loc: TrackLocation) => {
		let index = LocationTracker.locations.indexOf(loc);
		LocationTracker.locations.splice(index,1);
	}
} as const;

export default function LoadingResponse() {
	const {pathname} = useLocation();
	const [state, setState] = useState([]as string[]);
	let prevPath = useRef("");
	
	useEffect(() => {
		let splitPath = pathname.split('/');
		let messages: string[] = [];
		LocationTracker.locations.forEach(element => {
			if (pathname.includes(element.Path)) {
				let result = element.Match(pathname, prevPath.current, splitPath);
				if (result) {
					messages.push(result);
				}
			}
		});
		prevPath.current = pathname;

		setState(messages);
	}, [pathname]);

	return state.length === 0 ? <></> : (
		<div>
			{state.map(message => {
				return <p>{message}</p>
			})}
			<button onClick={() => setState([])}>Clear messages</button>
		</div>
	)
}

export const eventBus = {
	on(event: string, callback: (e: CustomEvent) => void) {
		document.addEventListener(event, (e) => callback(e as CustomEvent));
	},

	dispatch(event: string, data: {}) {
		document.dispatchEvent(new CustomEvent(event, { detail: data }));
	},

	remove(event: string, callback: (e: CustomEvent) => void) {
		document.removeEventListener(event, (e) => callback(e as CustomEvent));
	}
}