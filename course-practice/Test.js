let str = 'hello';

if (typeof str === 'string') {
  console.log('str is a string');
}
else {
    console.log('str is not a string');
}

const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

