import { atom } from 'recoil'

export const modalState = atom({
	key: 'modalState',
	default: false,
})

export const modalStoryState = atom({
	key: 'modalStoryState',
	default: false,
})
