import { useState, useEffect, useCallback } from 'react';

export interface Task {
  id: string;
  text: string;
  createdAt: number;
  position: { x: number; y: number };
  isEvasive: boolean;
}

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('zentasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        // Filter out expired tasks (older than 1 hour)
        const validTasks = parsedTasks.filter((task: Task) => 
          Date.now() - task.createdAt < 3600000 // 1 hour in milliseconds
        );
        setTasks(validTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('zentasks', JSON.stringify(tasks));
  }, [tasks]);

  // Auto-delete expired tasks
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(currentTasks => {
        const now = Date.now();
        const validTasks = currentTasks.filter(task => now - task.createdAt < 3600000);
        return validTasks;
      });
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  const addTask = useCallback((text: string) => {
    if (!text.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random()}`,
      text: text.trim(),
      createdAt: Date.now(),
      position: { x: 0, y: 0 },
      isEvasive: false
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskText('');
  }, []);

  const makeTaskEvasive = useCallback((taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            isEvasive: true,
            position: {
              x: Math.random() * 300 - 150, // Random x offset
              y: Math.random() * 200 - 100  // Random y offset
            }
          }
        : task
    ));

    // Reset evasive state after animation
    setTimeout(() => {
      setTasks(prev => prev.map(task => 
        task.id === taskId 
          ? { ...task, isEvasive: false, position: { x: 0, y: 0 } }
          : task
      ));
    }, 2000);
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  const getTimeRemaining = useCallback((createdAt: number) => {
    const elapsed = Date.now() - createdAt;
    const remaining = 3600000 - elapsed; // 1 hour - elapsed time
    return Math.max(0, remaining);
  }, []);

  const formatTimeRemaining = useCallback((milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    tasks,
    newTaskText,
    setNewTaskText,
    addTask,
    makeTaskEvasive,
    deleteTask,
    getTimeRemaining,
    formatTimeRemaining
  };
};