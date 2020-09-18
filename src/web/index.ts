import io from 'socket.io-client';
import './index.css';

const socket = io('http://localhost:3000');

enum KeyboardKey {
  Enter = 'Enter',
}

const handleKeyPress = (event: KeyboardEvent) => {
  const $input = event.target as HTMLInputElement;
  if (event.key === KeyboardKey.Enter) {
    event.preventDefault();
    socket.emit('message', $input.value);
    $input.value = '';
  }
};

const init = () => {
  const $body = document.body;

  const $replies = document.createElement('textarea');
  $replies.disabled = true;

  const $input = document.createElement('input');
  $input.type = 'text';
  $input.addEventListener('keypress', handleKeyPress);

  $body.appendChild($input);
  $body.appendChild($replies);

  socket.on('reply', (value: string) => {
    const current = $replies.textContent;
    $replies.textContent = `${value}\n${current}`;
  });
};

init();
