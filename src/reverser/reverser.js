import React from 'react';

function Reverser({ receivedValue }) {
  const [Message, setMessage] = React.useState(receivedValue);
  console.log('this is Message', Message);
  function reverser() {
    let arrayOutOfValue = receivedValue.split('');
    console.log('this is array out of value', arrayOutOfValue);
    arrayOutOfValue.reverse();
    console.log('this is reversed array out of value', arrayOutOfValue);
    let exportValue = arrayOutOfValue.join('');
    console.log('this is value to export', exportValue);
    setMessage(exportValue);
    console.log('the Message after "setMessage"', Message);
  }
  return (
    <div>
      {Message}
      <button data-testid="reverseButton" onClick={reverser}>
        click
      </button>
    </div>
  );
}
export default Reverser;
