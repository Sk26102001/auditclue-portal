import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Folder, 
  FolderOpen, 
  ChevronRight, 
  ChevronDown,
  FileText,
  File,
  Image,
  FileSpreadsheet
} from 'lucide-react';

interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: FolderItem[];
  fileType?: string;
  size?: number;
  uploadedAt?: string;
}

interface FolderTreeProps {
  items: FolderItem[];
  selectedId?: string;
  onSelect?: (item: FolderItem) => void;
}

const getFileIcon = (fileType?: string) => {
  if (!fileType) return <File className="h-4 w-4" />;
  if (fileType.includes('pdf')) return <FileText className="h-4 w-4 text-destructive" />;
  if (fileType.includes('image')) return <Image className="h-4 w-4 text-secondary" />;
  if (fileType.includes('sheet') || fileType.includes('excel')) 
    return <FileSpreadsheet className="h-4 w-4 text-success" />;
  return <File className="h-4 w-4" />;
};

function FolderNode({ item, level, selectedId, onSelect }: {
  item: FolderItem;
  level: number;
  selectedId?: string;
  onSelect?: (item: FolderItem) => void;
}) {
  const [isOpen, setIsOpen] = useState(level < 2);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = selectedId === item.id;

  const handleClick = () => {
    if (item.type === 'folder' && hasChildren) {
      setIsOpen(!isOpen);
    }
    onSelect?.(item);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted',
          isSelected && 'bg-primary/10 text-primary'
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {item.type === 'folder' && hasChildren && (
          isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )
        )}
        {item.type === 'folder' && !hasChildren && (
          <span className="w-4" />
        )}
        {item.type === 'folder' ? (
          isOpen ? (
            <FolderOpen className="h-4 w-4 text-warning" />
          ) : (
            <Folder className="h-4 w-4 text-warning" />
          )
        ) : (
          getFileIcon(item.fileType)
        )}
        <span className="truncate">{item.name}</span>
      </button>
      {item.type === 'folder' && isOpen && hasChildren && (
        <div>
          {item.children!.map((child) => (
            <FolderNode
              key={child.id}
              item={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FolderTree({ items, selectedId, onSelect }: FolderTreeProps) {
  return (
    <div className="space-y-0.5">
      {items.map((item) => (
        <FolderNode
          key={item.id}
          item={item}
          level={0}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

// Sample folder structure
export const sampleFolders: FolderItem[] = [
  {
    id: '1',
    name: 'Audit',
    type: 'folder',
    children: [
      { id: '1-1', name: 'Working Papers', type: 'folder', children: [] },
      { id: '1-2', name: 'Final Report', type: 'folder', children: [] },
      { id: '1-3', name: 'Management Letter', type: 'folder', children: [] },
    ],
  },
  {
    id: '2',
    name: 'VAT',
    type: 'folder',
    children: [
      { id: '2-1', name: 'Q1 2024', type: 'folder', children: [] },
      { id: '2-2', name: 'Q2 2024', type: 'folder', children: [] },
      { id: '2-3', name: 'Q3 2024', type: 'folder', children: [] },
      { id: '2-4', name: 'Q4 2024', type: 'folder', children: [] },
    ],
  },
  {
    id: '3',
    name: 'Corporate Tax',
    type: 'folder',
    children: [
      { id: '3-1', name: 'Registration', type: 'folder', children: [] },
      { id: '3-2', name: 'Returns', type: 'folder', children: [] },
    ],
  },
  {
    id: '4',
    name: 'Accounting',
    type: 'folder',
    children: [
      { id: '4-1', name: 'Trial Balance', type: 'folder', children: [] },
      { id: '4-2', name: 'Financial Statements', type: 'folder', children: [] },
    ],
  },
  {
    id: '5',
    name: 'Contracts',
    type: 'folder',
    children: [
      { id: '5-1', name: 'Engagement Letters', type: 'folder', children: [] },
      { id: '5-2', name: 'NDAs', type: 'folder', children: [] },
    ],
  },
];
