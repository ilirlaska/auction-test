'use client'
import { useEffect, useState } from 'react'

export const useServerAction = (serverAction: () => any, initialValue = []) => {
	const [data, setData] = useState(initialValue)

	useEffect(() => {
		serverAction().then(setData)
	}, [])

	return data
}
