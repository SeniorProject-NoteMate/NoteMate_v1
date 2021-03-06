import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

const titles = [
	{
		"id" : 1,
		"title" : "English101"
	},
	{
		"id" : 2,
		"title" : "CS156"
	},
	{
		"id" : 3,
		"title" : "Course Name"
	},
]

class Room extends Component {

	constructor(props) {
		super(props);
		this.state = { record: true };
	}

	render() {
		const { transcript, resetTranscript, browserSupportsSpeechRecognition, stopRecording } = this.props

		if (!browserSupportsSpeechRecognition) {
			return null
		}

		return (

			<div className="recordForm">
				<div className="roomTitle">
				<h4>Name</h4>
				</div>
				<div className="PageForm" >
					<div className="leftBox" >
						<h3>Recording audio</h3>
						<textarea id="rightNote" rows="15" cols="70" value={transcript}></textarea>
						<div></div>
						<button class="btnStart" onClick={resetTranscript} >Start</button>
						<button class="btnStop" onClick={stopRecording} >Stop</button>
					</div>
					<div className="rightBox">
						<h3>Writing your notes below here...</h3>
						<textarea id="leftNote" rows="15" cols="70"></textarea>
						<div></div>
						<button class="btnSave">Save</button>
						<button class="btnCancel">Cancel</button>
					</div>
				</div>

			</div>
		)
	}
}

export default SpeechRecognition(Room)