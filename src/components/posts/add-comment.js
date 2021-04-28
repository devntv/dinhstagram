/* eslint-disable no-sequences */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import { useState, useContext, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Picker from 'emoji-picker-react'
import OutsideClickHandler from 'react-outside-click-handler'
import composeRefs from '@seznam/compose-react-refs'
import useCombineRefs from '../../hooks/use-CombineRefs'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
import "react-twemoji-picker/dist/EmojiPicker.css"




const objEmoji = {
	smileys_people:'mặt cười và hình người',
	recently_used:'Phổ biến nhất',
	animals_nature: 'động vật & thiên nhiên',
	objects:'đồ vật',
	food_drink:'đồ ăn & nước uống',
	travel_places: 'du lịch và khám phá',
	activities: 'hoạt động',
	symbols:'biểu tượng',
	flags:'cờ',
}
const pickerStyle ={
	border: '1px solid #dbdbdb'
}

export default function Addcomment({ docId, comments, setComments, commentInput }) {
	const [comment, setComment] = useState('')
	const [chosenEmoji, setChosenEmoji] = useState(null)
	const [displayE, setDisplayE] = useState(false)
	const emojiPickerClick = useRef(null)

	const { firebase, FieldValue } = useContext(FirebaseContext)
	const {
		user: { displayName },
	} = useContext(UserContext)

	const handleSubmitComment = (event) => {
		event.preventDefault()
		setComments([{ displayName, comment }, ...comments])
		setComment('')
		return firebase.firestore().collection('photos').doc(docId).update({
			comments: FieldValue.arrayUnion({displayName,comment})
		})
	}
	// emoji
	const handleDisplayEmoji = () => {
		setDisplayE(!displayE)
		emojiPickerClick.current.focus()
		
	}

	const onEmojiClick = (event, emojiObject) => {
		const cursor = emojiPickerClick.current.selectionStart
		emojiPickerClick.current.focus()
		const text = comment.slice(0, cursor) + emojiObject.emoji + comment.slice(cursor);
		setComment(text)
		
	}
	useEffect(()=>{
		
	})

	return (
		<>
			<OutsideClickHandler
				onOutsideClick={() => setDisplayE(false)}
			>
				<div role='presentation' className='h-2 relative -top-80 left-4'>
					{displayE ? <Picker  onEmojiClick = { onEmojiClick } disableSearchBar disableAutoFocus groupNames={objEmoji} pickerStyle={pickerStyle} /> : ''}
				</div>
			</OutsideClickHandler>
			<div className='border-t border-gray-primary w-full focus:border-none' style={{}}>
				<form
					className='flex justify-between pl-0 pr-4 '
					method='POST'
					onSubmit={(event) =>
						comment.length >= 1
							? handleSubmitComment(event)
							: event.preventDefault
					}
				>
					<button type='button' className='pl-6' onClick={handleDisplayEmoji}>
						<div className='relative'>
							<svg stroke='currentColor' viewBox='0 0 48 48' className='h6 w-6'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={0}
									d='M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={0}
									d='M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z'
								/>
							</svg>
						</div>
					</button>
					<input
						aria-label='add-comments'
						autoComplete='off'
						className='text-sm text-gray-base w-full mr-3 py-4 px-4 '
						name='add-comment'
						placeholder='Thêm bình luận...'
						value={comment}
						onChange={({ target }) => setComment(target.value)}
						ref={useCombineRefs(commentInput,emojiPickerClick)}
					/>
					<button
						type='button'
						className={`text-sm font-semibold text-blue-medium ${
							!comment && 'opacity-30'
						}`}
						disabled={comment.length < 1}
						onClick={handleSubmitComment}
					>
						Đăng
					</button>
				</form>
			</div>
		</>
	)
}
Addcomment.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	setComments: PropTypes.func.isRequired,
	commentInput: PropTypes.object.isRequired,
}
