import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/hooks/useTaskManager';
import { Clock, Zap } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onCheckboxClick: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  timeRemaining: number;
  formatTimeRemaining: (ms: number) => string;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onCheckboxClick,
  onDelete,
  timeRemaining,
  formatTimeRemaining
}) => {
  const [isShaking, setIsShaking] = useState(false);
  const [isDisappearing, setIsDisappearing] = useState(false);

  // Handle auto-deletion animation
  useEffect(() => {
    if (timeRemaining <= 5000 && timeRemaining > 0) { // Last 5 seconds
      setIsShaking(true);
    }
    if (timeRemaining <= 1000 && timeRemaining > 0) { // Last 1 second
      setIsDisappearing(true);
      setTimeout(() => onDelete(task.id), 1000);
    }
  }, [timeRemaining, task.id, onDelete]);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCheckboxClick(task.id);
  };

  const getTimeColor = () => {
    if (timeRemaining <= 300000) return 'text-destructive'; // Last 5 minutes
    if (timeRemaining <= 900000) return 'text-warning'; // Last 15 minutes
    return 'text-muted-foreground';
  };

  return (
    <div 
      className={`
        task-item group relative p-4 bg-card rounded-lg border shadow-sm hover:shadow-md
        ${task.isEvasive ? 'task-evasive z-50' : ''}
        ${isShaking ? 'animate-pulse' : ''}
        ${isDisappearing ? 'task-disappearing' : ''}
      `}
      style={{
        transform: task.isEvasive 
          ? `translate(${task.position.x}px, ${task.position.y}px)` 
          : 'translate(0, 0)',
        transition: task.isEvasive 
          ? 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' 
          : 'all 0.3s ease'
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="relative cursor-pointer transform hover:scale-110 transition-transform duration-200"
          onClick={handleCheckboxClick}
        >
          <Checkbox 
            checked={false}
            className="h-5 w-5 border-2 hover:border-primary transition-colors duration-200"
          />
          {task.isEvasive && (
            <Zap className="absolute -top-1 -right-1 h-3 w-3 text-primary animate-pulse" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
            {task.text}
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-xs">
          <Clock className={`h-3 w-3 ${getTimeColor()}`} />
          <span className={`font-mono ${getTimeColor()}`}>
            {formatTimeRemaining(timeRemaining)}
          </span>
        </div>
      </div>
      
      {timeRemaining <= 300000 && ( // Show warning in last 5 minutes
        <div className="mt-2 text-xs text-destructive bg-destructive/10 px-2 py-1 rounded">
          ⚠️ This task will self-destruct soon!
        </div>
      )}
    </div>
  );
};