import * as React from 'react';

type ButtonProps = {
  text: string;
};

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button
      className="btn btn-primary"
      onClick={(event) => ((event.target as any).innerText = 'You clicked me!')}
    >
      {text}
    </button>
  );
};

export default Button;
