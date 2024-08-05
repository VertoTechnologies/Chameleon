
import { Button } from '@/components/ShadcnComponents/button';
import React from 'react'

interface ButtonProps {
    color: string;
    runFunction: () => void;
    text: string
    tColor: string;
  }
  
  const ButtonComponent: React.FC<ButtonProps> = (props) => {
    return (
      <Button
        variant="outline"
        onClick={props.runFunction}
        className={`w-[120px] rounded-full ${props.color} hover:${props.color} text-${props.tColor}`}
      >
        {props.text}
      </Button>
    );
  };

export default ButtonComponent