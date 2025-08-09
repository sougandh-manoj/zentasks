import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddTaskFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({
  value,
  onChange,
  onSubmit
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="what do you pretend to do today ?"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-12 text-base placeholder:text-muted-foreground/60"
          />
        </div>
        <Button 
          type="submit" 
          size="icon"
          className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      
      <p className="mt-2 text-xs text-muted-foreground">
        💡 Pro tip: Each task self-destructs in exactly 1 hour. Plan accordingly!
      </p>
    </form>
  );
};