import React from 'react';
import { useTaskManager } from '@/hooks/useTaskManager';
import { TaskItem } from '@/components/TaskItem';
import { EmptyState } from '@/components/EmptyState';
import { AddTaskForm } from '@/components/AddTaskForm';

const Index = () => {
  const {
    tasks,
    newTaskText,
    setNewTaskText,
    addTask,
    makeTaskEvasive,
    deleteTask,
    getTimeRemaining,
    formatTimeRemaining
  } = useTaskManager();

  const handleAddTask = () => {
    addTask(newTaskText);
  };

  const handleCheckboxClick = (taskId: string) => {
    // This is where the magic happens - make the task evasive!
    makeTaskEvasive(taskId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold text-foreground mb-3 tracking-tight">
            ZenTasks
          </h1>
          <p className="text-muted-foreground italic">
            -the art of letting go
          </p>
        </div>

        {/* Add Task Form */}
        <AddTaskForm
          value={newTaskText}
          onChange={setNewTaskText}
          onSubmit={handleAddTask}
        />

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <EmptyState />
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onCheckboxClick={handleCheckboxClick}
                onDelete={deleteTask}
                timeRemaining={getTimeRemaining(task.createdAt)}
                formatTimeRemaining={formatTimeRemaining}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {tasks.length > 0 && (
          <div className="mt-12 text-center text-xs text-muted-foreground space-y-1">
            <p>✨ No pressure no productivity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
