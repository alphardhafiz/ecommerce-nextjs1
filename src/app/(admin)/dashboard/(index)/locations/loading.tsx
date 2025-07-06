// app/loading.tsx
// File ini otomatis terpanggil oleh Next.js App Router saat loading

import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 bg-muted rounded animate-pulse"></div>
          <div className="flex space-x-2">
            <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
            <div className="h-4 bg-muted-foreground/20 rounded w-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-16 animate-pulse"></div>
          </div>
        </div>
        <div className="w-64 h-8 bg-input rounded animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Page Title */}
        <div className="mb-8">
          <div className="h-8 bg-muted rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-muted-foreground/30 rounded w-96 animate-pulse"></div>
        </div>

        {/* Table Container */}
        <div className="bg-card rounded-lg overflow-hidden border border-border">
          {/* Table Header */}
          <div className="flex items-center justify-between p-4 bg-secondary/50 border-b border-border">
            <div className="flex-1">
              <div className="h-4 bg-muted-foreground/30 rounded w-16 animate-pulse"></div>
            </div>
            <div className="flex-1 px-4">
              <div className="h-4 bg-muted-foreground/30 rounded w-20 animate-pulse"></div>
            </div>
            <div className="flex-1 text-right">
              <div className="h-4 bg-muted-foreground/30 rounded w-32 ml-auto animate-pulse"></div>
            </div>
          </div>

          {/* Table Rows */}
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors">
              <div className="flex-1">
                <div className="h-4 bg-muted-foreground/40 rounded w-32 mb-2 animate-pulse"></div>
                <div className="h-3 bg-muted-foreground/20 rounded w-24 animate-pulse"></div>
              </div>
              <div className="flex-1 px-4">
                <div className="h-4 bg-muted-foreground/40 rounded w-48 animate-pulse"></div>
              </div>
              <div className="flex-1 text-right">
                <div className="h-4 bg-muted-foreground/40 rounded w-16 ml-auto animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 animate-spin">
              <div className="w-full h-full border-2 border-muted border-t-primary rounded-full"></div>
            </div>
            <span className="text-muted-foreground text-sm">Loading...</span>
          </div>
        </div>
      </div>

      {/* Additional subtle loading animation */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted overflow-hidden">
        <div className="h-full bg-primary animate-pulse"></div>
      </div>
    </div>
  );
}