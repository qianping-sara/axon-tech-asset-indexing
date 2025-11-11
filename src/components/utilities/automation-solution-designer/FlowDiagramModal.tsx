'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface FlowDiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  mermaidDiagram: string;
}

export default function FlowDiagramModal({
  isOpen,
  onClose,
  title,
  description,
  mermaidDiagram,
}: FlowDiagramModalProps) {
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      // Load mermaid script if not already loaded
      const mermaidWindow = window as Window & { mermaid?: { contentLoaded?: () => void } };
      if (!mermaidWindow.mermaid) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js';
        script.async = true;
        script.onload = () => {
          if (mermaidWindow.mermaid && mermaidWindow.mermaid.contentLoaded) {
            mermaidWindow.mermaid.contentLoaded();
          }
        };
        document.body.appendChild(script);
      } else if (mermaidWindow.mermaid && mermaidWindow.mermaid.contentLoaded) {
        mermaidWindow.mermaid.contentLoaded();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Diagram */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
            <div className="mermaid">{mermaidDiagram}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-700 text-white font-medium rounded hover:bg-green-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

