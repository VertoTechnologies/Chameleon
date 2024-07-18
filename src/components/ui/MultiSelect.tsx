import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Check } from 'lucide-react';

interface MultiSelectProps {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedOptions, setSelectedOptions }) => {
  const handleSelect = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select options">
          {selectedOptions.length ? selectedOptions.join(', ') : 'Select options'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            onClick={() => handleSelect(option)}
            className={`flex items-center justify-between ${selectedOptions.includes(option) ? 'bg-accent text-accent-foreground' : ''}`}
          >
            {option}
            {selectedOptions.includes(option) && <Check className="h-4 w-4" />}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MultiSelect;
