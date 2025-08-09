import React from 'react';

export const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="relative inline-block">
        <div className="bg-accent/50 p-8 rounded-2xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <div className="text-accent-foreground text-sm font-medium leading-relaxed">
            <div className="mb-2">nothing here</div>
            <div className="mb-2">because</div>
            <div>nothing stays here</div>
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 text-xs text-muted-foreground opacity-60">
          📝
        </div>
      </div>
      
      <p className="mt-8 text-muted-foreground text-sm">
        Tasks have a mysterious tendency to vanish here...
      </p>
    </div>
  );
};