import React from 'react'
import Note from './Note'
import FaPlus from 'react-icons/lib/fa/plus'

class Board extends React.Component {


	constructor(props) {


		super(props);
		this.state = {

			notes  : [
/*
				{
					id : 0,
					note : 'Call Lisa'
				},
				{

					id : 1,
					note : "Email John"
				},
				{
					id : 2,
					note : 'forget'
				}*/
			]

		}

		this.eachNote = this.eachNote.bind(this)
		this.update = this.update.bind(this)
		this.remove = this.remove.bind(this)
		this.add = this.add.bind(this)
		this.nextId = this.nextId.bind(this)

	}


	componentWillMount() {

		var self = this
		if (this.props.count) {

			

			fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
				.then(response => response.json())
				.then(json => json[0]
					.split('. ')
					.forEach(sentence =>self.add(sentence.substring(0,25)) ))

		}


	}



	remove(id) {


		console.log("removing item at id", id)
		this.setState( prevState => ({

			notes : prevState.notes.filter(note => note.id !== id )

		}))
	}



	add(text) {


		this.setState (prevState => ({


			notes : [

				...prevState.notes,
				{
					id : this.nextId(),
					note: text
				}
			]

		}))

	}




	nextId () {


		this.uniqueId = this.uniqueId || 0
		console.log(this.uniqueId)
		return this.uniqueId++

	}


	update (newText, i ) {


		console.log('updating item at index ', i , newText);
		this.setState( prevState => ({
			notes : prevState.notes.map (

					note => (note.id !== i) ? note : {...note, note: newText}
				)
		}))

	}


	eachNote(note, i) {


		return (

				<Note key={note.id} index={note.id} onChange= {this.update}  onRemove = {this.remove}> {note.note} </Note>
			)
	}


	render() {



		return (


				<div className="board"> 


					{this.state.notes.map(this.eachNote)}
					<button id="add" 
					onClick = {this.add.bind(null, "new Note")}> 
					<FaPlus />
					</button>

				</div>

		)


	}


}


export default Board